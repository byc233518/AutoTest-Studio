import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import { startServer } from '../server/index.mjs';
import { ProjectRegistry, projectLayout, readProjectManifest } from './project-registry.mjs';

const moduleDirectory = path.dirname(fileURLToPath(import.meta.url));

export const DESKTOP_CHANNELS = Object.freeze({
  listProjects: 'autotest:projects:list',
  createProject: 'autotest:projects:create',
  registerProject: 'autotest:projects:register',
  selectProject: 'autotest:projects:select',
  currentProject: 'autotest:projects:current',
  removeProject: 'autotest:projects:remove',
  revealProject: 'autotest:projects:reveal',
  chooseProjectDirectory: 'autotest:dialog:choose-project-directory',
  openExternal: 'autotest:shell:open-external',
  getTheme: 'autotest:preferences:get-theme',
  setTheme: 'autotest:preferences:set-theme'
});

export function resolveDesktopPaths(options = {}) {
  const isPackaged = options.isPackaged ?? app.isPackaged;
  const appPath = path.resolve(options.appPath || app.getAppPath());
  const resourcesPath = path.resolve(options.resourcesPath || process.resourcesPath || appPath);
  const developmentRoot = path.resolve(moduleDirectory, '..');
  const packagedRuntimeRoot = path.resolve(resourcesPath, 'app-runtime');
  return {
    appPath,
    resourcesPath,
    workspaceRoot: isPackaged && existsSync(packagedRuntimeRoot)
      ? packagedRuntimeRoot
      : isPackaged
        ? appPath
        : developmentRoot,
    preloadPath: path.resolve(moduleDirectory, 'preload.cjs')
  };
}

function publicProject(project, selected = project?.selected) {
  return project ? {
    id: project.id,
    name: project.name,
    description: project.description || '',
    rootPath: project.rootPath,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    lastOpenedAt: project.lastOpenedAt || null,
    selected: Boolean(selected)
  } : null;
}

function validExternalUrl(value) {
  let url;
  try {
    url = new URL(String(value || ''));
  } catch {
    throw new TypeError('外部地址无效');
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new TypeError('只允许打开 HTTP 或 HTTPS 地址');
  }
  return url.href;
}

export class DesktopHost {
  constructor(options = {}) {
    this.registryDirectory = path.resolve(options.registryDirectory || path.join(app.getPath('userData'), 'projects'));
    this.preferencesFile = path.resolve(this.registryDirectory, 'preferences.json');
    this.registry = options.registry || new ProjectRegistry(this.registryDirectory);
    this.resources = options.resources || resolveDesktopPaths();
    this.window = null;
    this.localServer = null;
    this.activeProject = null;
    this.switchOperation = Promise.resolve();
    this.disposed = false;
    this.allowClose = false;
    this.closePromptOpen = false;
  }

  async initialize() {
    this.registerIpcHandlers();
    const initialProject = await this.ensureInitialProject();
    await this.startProjectServer(initialProject);
    this.createWindow();
    await this.loadActiveProject();
  }

  async ensureInitialProject() {
    const selected = await this.registry.getSelectedProject();
    if (selected) return this.registry.selectProject(selected.id);
    const registered = await this.registry.listProjects();
    if (registered.length) return this.registry.selectProject(registered[0].id);

    const defaultRoot = path.resolve(this.registryDirectory, 'default-project');
    if (
      existsSync(path.join(defaultRoot, '.autotest-studio', 'project.json'))
      || existsSync(path.join(defaultRoot, '.jmom', 'project.json'))
    ) {
      const existing = await this.registry.registerProject(defaultRoot);
      return this.registry.selectProject(existing.id);
    }
    const created = await this.registry.createProject({
      name: '默认项目',
      description: '本地自动化测试项目',
      rootPath: defaultRoot
    });
    return this.registry.selectProject(created.id);
  }

  async startProjectServer(project) {
    const layout = projectLayout(project.rootPath);
    const manifest = await readProjectManifest(project.rootPath);
    this.localServer = await startServer({
      host: '127.0.0.1',
      port: 0,
      appOptions: {
        desktopMode: true,
        project: {
          name: manifest.name,
          description: manifest.description
        },
        workspaceRoot: this.resources.workspaceRoot,
        dataDir: layout.root,
        databasePath: layout.databaseFile,
        uploadsDir: layout.dataDirectory,
        reportsDir: layout.reportsDirectory,
        recordingsDir: layout.recordingsDirectory,
        recordingScriptsDir: layout.casesDirectory,
        scriptsDir: layout.casesDirectory,
        temporaryDir: layout.temporaryDirectory
      }
    });
    this.activeProject = { ...project, name: manifest.name };
    return this.localServer;
  }

  async stopProjectServer() {
    const current = this.localServer;
    this.localServer = null;
    if (current) await current.close();
  }

  createWindow() {
    this.window = new BrowserWindow({
      width: 1440,
      height: 900,
      minWidth: 1100,
      minHeight: 700,
      show: false,
      backgroundColor: '#f4f6f8',
      autoHideMenuBar: true,
      webPreferences: {
        preload: this.resources.preloadPath,
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true
      }
    });
    this.window.once('ready-to-show', () => this.window?.show());
    this.window.on('close', (event) => {
      if (this.allowClose) return;
      event.preventDefault();
      void this.confirmClose();
    });
    this.window.on('closed', () => {
      this.window = null;
    });
    this.window.webContents.setWindowOpenHandler(({ url }) => {
      try {
        void shell.openExternal(validExternalUrl(url));
      } catch {
        // 非 HTTP(S) 导航直接拒绝。
      }
      return { action: 'deny' };
    });
    this.window.webContents.on('will-navigate', (event, url) => {
      if (!this.localServer) return;
      try {
        if (new URL(url).origin === this.localServer.origin) return;
      } catch {
        // 无效导航由下面统一阻止。
      }
      event.preventDefault();
    });
  }

  async confirmClose() {
    if (this.closePromptOpen || !this.window || this.window.isDestroyed()) return;
    this.closePromptOpen = true;
    try {
      const detail = await this.describeActiveWork();
      const { response } = await dialog.showMessageBox(this.window, {
        type: 'question',
        buttons: ['取消', '退出'],
        defaultId: 0,
        cancelId: 0,
        title: '退出确认',
        message: '确定要退出 AutoTest Studio 吗？',
        detail: detail || '退出后正在进行的本地执行与录制会中断。'
      });
      if (response !== 1 || !this.window || this.window.isDestroyed()) return;
      this.allowClose = true;
      this.window.close();
    } finally {
      this.closePromptOpen = false;
    }
  }

  async describeActiveWork() {
    try {
      const database = this.localServer?.app?.locals?.database;
      if (!database?.raw) return '';
      const activeRuns = Number(database.raw.prepare(`
        SELECT COUNT(*) AS count FROM runs WHERE status IN ('queued', 'running')
      `).get()?.count || 0);
      const activePlanRuns = Number(database.raw.prepare(`
        SELECT COUNT(*) AS count FROM test_plan_runs WHERE status IN ('queued', 'running')
      `).get()?.count || 0);
      const activeRecordings = await this.localServer.app.locals.getActiveRecordingCount?.() || 0;
      const tasks = [
        activeRuns ? `${activeRuns} 个用例执行` : '',
        activePlanRuns ? `${activePlanRuns} 个测试计划` : '',
        activeRecordings ? `${activeRecordings} 个录制任务` : ''
      ].filter(Boolean);
      return tasks.length ? `当前仍有${tasks.join('、')}未结束，退出将中断这些任务。` : '';
    } catch {
      return '';
    }
  }

  async loadActiveProject() {
    if (!this.window || !this.localServer) return;
    await this.window.loadURL(this.localServer.origin);
  }

  async assertCanSwitchProjects() {
    const database = this.localServer?.app?.locals?.database;
    if (!database?.listRuns) return;
    const activeRuns = Number(database.raw.prepare(`
      SELECT COUNT(*) AS count FROM runs WHERE status IN ('queued', 'running')
    `).get()?.count || 0);
    const activePlanRuns = Number(database.raw.prepare(`
      SELECT COUNT(*) AS count FROM test_plan_runs WHERE status IN ('queued', 'running')
    `).get()?.count || 0);
    const activeRecordings = await this.localServer.app.locals.getActiveRecordingCount?.() || 0;
    const tasks = [
      activeRuns ? `${activeRuns} 个用例执行` : '',
      activePlanRuns ? `${activePlanRuns} 个测试计划` : '',
      activeRecordings ? `${activeRecordings} 个录制任务` : ''
    ].filter(Boolean);
    if (tasks.length) {
      throw new Error(`当前项目仍有${tasks.join('、')}未结束，暂时不能切换项目`);
    }
  }

  isTrustedSender(event) {
    return Boolean(this.window && !this.window.isDestroyed() && event.sender.id === this.window.webContents.id);
  }

  assertTrustedSender(event) {
    if (!this.isTrustedSender(event)) throw new Error('拒绝未知窗口调用桌面接口');
  }

  handle(channel, listener) {
    ipcMain.removeHandler(channel);
    ipcMain.handle(channel, async (event, ...args) => {
      this.assertTrustedSender(event);
      return listener(...args);
    });
  }

  registerIpcHandlers() {
    this.handle(DESKTOP_CHANNELS.listProjects, async () => {
      const projects = await this.registry.listProjects();
      return projects.map(publicProject);
    });
    this.handle(DESKTOP_CHANNELS.currentProject, async () => publicProject(this.activeProject, true));
    this.handle(DESKTOP_CHANNELS.chooseProjectDirectory, (options) => this.chooseProjectDirectory(options));
    this.handle(DESKTOP_CHANNELS.createProject, async (input = {}) => {
      const rootPath = input.rootPath || await this.chooseProjectDirectory({
        title: '选择新项目目录',
        buttonLabel: '选择目录'
      });
      if (!rootPath) return null;
      const project = await this.registry.createProject({ ...input, rootPath });
      if (input.activate !== false) await this.selectProject(project.id);
      const saved = await this.registry.getProject(project.id);
      return publicProject(saved, this.activeProject?.id === saved?.id);
    });
    this.handle(DESKTOP_CHANNELS.registerProject, async (input = {}) => {
      const requestedRoot = typeof input === 'string' ? input : input.rootPath;
      const rootPath = requestedRoot || await this.chooseProjectDirectory({
        title: '选择已有项目目录',
        buttonLabel: '注册项目'
      });
      if (!rootPath) return null;
      const project = await this.registry.registerProject(rootPath);
      if (typeof input === 'string' || input.activate !== false) await this.selectProject(project.id);
      const saved = await this.registry.getProject(project.id);
      return publicProject(saved, this.activeProject?.id === saved?.id);
    });
    this.handle(DESKTOP_CHANNELS.selectProject, async (projectId) => {
      await this.selectProject(projectId);
      return publicProject(this.activeProject, true);
    });
    this.handle(DESKTOP_CHANNELS.removeProject, (projectId) => this.removeProject(projectId));
    this.handle(DESKTOP_CHANNELS.revealProject, async (projectId) => {
      const project = await this.registry.getProject(projectId);
      if (!project) throw new Error(`项目未注册：${projectId}`);
      const errorMessage = await shell.openPath(project.rootPath);
      if (errorMessage) throw new Error(errorMessage);
      return true;
    });
    this.handle(DESKTOP_CHANNELS.openExternal, async (url) => {
      await shell.openExternal(validExternalUrl(url));
      return true;
    });
    this.handle(DESKTOP_CHANNELS.getTheme, async () => {
      try {
        const preferences = JSON.parse(await readFile(this.preferencesFile, 'utf8'));
        return ['light', 'dark', 'system'].includes(preferences.theme) ? preferences.theme : 'system';
      } catch {
        return 'system';
      }
    });
    this.handle(DESKTOP_CHANNELS.setTheme, async (theme) => {
      if (!['light', 'dark', 'system'].includes(theme)) throw new Error('主题设置无效');
      await mkdir(path.dirname(this.preferencesFile), { recursive: true });
      let preferences = {};
      try { preferences = JSON.parse(await readFile(this.preferencesFile, 'utf8')); } catch {}
      await writeFile(this.preferencesFile, `${JSON.stringify({ ...preferences, theme }, null, 2)}\n`, 'utf8');
      return theme;
    });
  }

  async chooseProjectDirectory(options = {}) {
    const result = await dialog.showOpenDialog(this.window, {
      title: String(options.title || '选择项目目录'),
      buttonLabel: String(options.buttonLabel || '选择'),
      defaultPath: options.defaultPath ? path.resolve(String(options.defaultPath)) : undefined,
      properties: ['openDirectory', 'createDirectory', 'dontAddToRecent']
    });
    return result.canceled ? null : result.filePaths[0] || null;
  }

  selectProject(projectId) {
    const operation = this.switchOperation.then(async () => {
      if (this.activeProject?.id === projectId && this.localServer) {
        const selected = await this.registry.selectProject(projectId);
        this.activeProject = selected;
        return selected;
      }

      const nextProject = await this.registry.getProject(projectId);
      if (!nextProject) throw new Error(`项目未注册：${projectId}`);
      await this.assertCanSwitchProjects();
      const previousProject = this.activeProject;
      await this.stopProjectServer();
      try {
        await this.startProjectServer(nextProject);
        const selected = await this.registry.selectProject(projectId);
        this.activeProject = selected;
        await this.loadActiveProject();
        return selected;
      } catch (error) {
        await this.stopProjectServer().catch(() => {});
        if (previousProject) {
          await this.startProjectServer(previousProject).catch(() => {});
          await this.loadActiveProject().catch(() => {});
        }
        throw error;
      }
    });
    this.switchOperation = operation.catch(() => {});
    return operation;
  }

  async removeProject(projectId) {
    const projects = await this.registry.listProjects();
    if (this.activeProject?.id === projectId && projects.length === 1) {
      throw new Error('不能移除当前唯一项目，请先新建或注册另一个项目');
    }
    if (this.activeProject?.id === projectId) await this.assertCanSwitchProjects();
    const removed = await this.registry.removeProject(projectId);
    if (this.activeProject?.id === projectId) {
      const nextProject = (await this.registry.listProjects())[0];
      await this.selectProject(nextProject.id);
    }
    return publicProject(removed);
  }

  focusWindow() {
    if (!this.window) return;
    if (this.window.isMinimized()) this.window.restore();
    this.window.show();
    this.window.focus();
  }

  async dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.allowClose = true;
    for (const channel of Object.values(DESKTOP_CHANNELS)) ipcMain.removeHandler(channel);
    await this.switchOperation.catch(() => {});
    await this.stopProjectServer();
  }
}

let desktopHost;
let quitInProgress = false;
const ownsSingleInstance = app.requestSingleInstanceLock();

if (!ownsSingleInstance) {
  app.quit();
} else {
  app.on('second-instance', () => desktopHost?.focusWindow());
  app.whenReady()
    .then(async () => {
      desktopHost = new DesktopHost();
      await desktopHost.initialize();
    })
    .catch((error) => {
      dialog.showErrorBox('AutoTest Studio 启动失败', error?.message || String(error));
      app.quit();
    });

  app.on('activate', () => desktopHost?.focusWindow());
  app.on('window-all-closed', () => app.quit());
  app.on('before-quit', (event) => {
    if (quitInProgress || !desktopHost) return;
    if (!desktopHost.allowClose) {
      event.preventDefault();
      void desktopHost.confirmClose();
      return;
    }
    event.preventDefault();
    quitInProgress = true;
    desktopHost.dispose()
      .catch(() => {})
      .finally(() => app.quit());
  });
}
