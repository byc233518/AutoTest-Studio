const { contextBridge, ipcRenderer } = require('electron');

const channels = Object.freeze({
  listProjects: 'autotest:projects:list',
  createProject: 'autotest:projects:create',
  suggestProjectRoot: 'autotest:projects:suggest-root',
  registerProject: 'autotest:projects:register',
  selectProject: 'autotest:projects:select',
  currentProject: 'autotest:projects:current',
  removeProject: 'autotest:projects:remove',
  revealProject: 'autotest:projects:reveal',
  chooseProjectDirectory: 'autotest:dialog:choose-project-directory',
  exportProject: 'autotest:projects:export',
  importProject: 'autotest:projects:import',
  openExternal: 'autotest:shell:open-external',
  getTheme: 'autotest:preferences:get-theme',
  setTheme: 'autotest:preferences:set-theme',
  getLocale: 'autotest:preferences:get-locale',
  setLocale: 'autotest:preferences:set-locale'
});

const desktopApi = Object.freeze({
  listProjects: () => ipcRenderer.invoke(channels.listProjects),
  createProject: (input) => ipcRenderer.invoke(channels.createProject, input),
  suggestProjectRoot: (input) => ipcRenderer.invoke(channels.suggestProjectRoot, input),
  registerProject: (input) => ipcRenderer.invoke(channels.registerProject, input),
  selectProject: (projectId) => ipcRenderer.invoke(channels.selectProject, projectId),
  switchProject: (projectId) => ipcRenderer.invoke(channels.selectProject, projectId),
  currentProject: () => ipcRenderer.invoke(channels.currentProject),
  removeProject: (input) => ipcRenderer.invoke(channels.removeProject, input),
  revealProject: (projectId) => ipcRenderer.invoke(channels.revealProject, projectId),
  chooseProjectDirectory: (options) => ipcRenderer.invoke(channels.chooseProjectDirectory, options),
  exportProject: () => ipcRenderer.invoke(channels.exportProject),
  importProject: (input) => ipcRenderer.invoke(channels.importProject, input),
  openExternal: (url) => ipcRenderer.invoke(channels.openExternal, url),
  getTheme: () => ipcRenderer.invoke(channels.getTheme),
  setTheme: (theme) => ipcRenderer.invoke(channels.setTheme, theme),
  getLocale: () => ipcRenderer.invoke(channels.getLocale),
  setLocale: (locale) => ipcRenderer.invoke(channels.setLocale, locale)
});

contextBridge.exposeInMainWorld('autotestDesktop', desktopApi);
