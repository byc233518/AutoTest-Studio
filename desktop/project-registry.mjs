import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import path from 'node:path';
import {
  mkdir,
  readFile,
  readdir,
  realpath,
  rename,
  stat,
  unlink,
  rm,
  writeFile
} from 'node:fs/promises';

export const PROJECT_MANIFEST_VERSION = 1;
export const PROJECT_REGISTRY_VERSION = 1;
export const PROJECT_ASSET_DIRECTORIES = Object.freeze([
  'cases',
  'data',
  'recordings',
  'runs',
  'reports',
  'tmp'
]);

export class ProjectRegistryError extends Error {
  constructor(code, message, cause) {
    super(message, cause ? { cause } : undefined);
    this.name = 'ProjectRegistryError';
    this.code = code;
  }
}

function registryDocument() {
  return {
    version: PROJECT_REGISTRY_VERSION,
    selectedProjectId: null,
    projects: []
  };
}

function nonEmptyText(value, fieldName) {
  const text = String(value ?? '').trim();
  if (!text) {
    throw new ProjectRegistryError('INVALID_PROJECT', `${fieldName}不能为空`);
  }
  return text;
}

function isoDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new ProjectRegistryError('INVALID_DATE', '项目时间无效');
  }
  return date.toISOString();
}

function clone(value) {
  return structuredClone(value);
}

function comparablePath(value) {
  const normalized = path.normalize(value);
  return process.platform === 'win32' ? normalized.toLocaleLowerCase('en-US') : normalized;
}

function isWithin(parentPath, childPath) {
  const relative = path.relative(comparablePath(parentPath), comparablePath(childPath));
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

async function canonicalizePath(input, mustExist = false) {
  const absolute = path.resolve(nonEmptyText(input, '项目目录'));
  try {
    return path.resolve(await realpath(absolute));
  } catch (error) {
    if (error?.code !== 'ENOENT' || mustExist) {
      if (mustExist && error?.code === 'ENOENT') {
        throw new ProjectRegistryError('PROJECT_NOT_FOUND', `项目目录不存在：${absolute}`, error);
      }
      throw error;
    }
  }

  const missingSegments = [];
  let cursor = absolute;
  while (true) {
    const parent = path.dirname(cursor);
    if (parent === cursor) {
      throw new ProjectRegistryError('PROJECT_NOT_FOUND', `无法解析项目目录：${absolute}`);
    }
    missingSegments.unshift(path.basename(cursor));
    cursor = parent;
    try {
      const existingParent = await realpath(cursor);
      return path.resolve(existingParent, ...missingSegments);
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
  }
}

async function readJson(filePath, errorCode, description) {
  let source;
  try {
    source = await readFile(filePath, 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') return null;
    throw new ProjectRegistryError(errorCode, `无法读取${description}`, error);
  }
  try {
    return JSON.parse(source);
  } catch (error) {
    throw new ProjectRegistryError(errorCode, `${description}格式无效`, error);
  }
}

async function writeJsonAtomically(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.${process.pid}.${randomUUID()}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, {
    encoding: 'utf8',
    flag: 'wx'
  });
  try {
    await rename(temporaryPath, filePath);
  } catch (error) {
    await unlink(temporaryPath).catch(() => {});
    throw error;
  }
}

function validateRegistry(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new ProjectRegistryError('INVALID_REGISTRY', '项目注册表格式无效');
  }
  if (value.version !== PROJECT_REGISTRY_VERSION || !Array.isArray(value.projects)) {
    throw new ProjectRegistryError('INVALID_REGISTRY', '项目注册表版本或项目列表无效');
  }

  const ids = new Set();
  const roots = new Set();
  const projects = value.projects.map((item) => {
    const id = nonEmptyText(item?.id, '项目 ID');
    const name = nonEmptyText(item?.name, '项目名称');
    const rootPath = path.resolve(nonEmptyText(item?.rootPath, '项目目录'));
    const comparisonRoot = comparablePath(rootPath);
    if (ids.has(id) || roots.has(comparisonRoot)) {
      throw new ProjectRegistryError('INVALID_REGISTRY', '项目注册表包含重复项目');
    }
    ids.add(id);
    roots.add(comparisonRoot);
    return {
      id,
      name,
      description: String(item.description ?? '').trim(),
      rootPath,
      createdAt: isoDate(item.createdAt),
      updatedAt: isoDate(item.updatedAt || item.createdAt),
      lastOpenedAt: item.lastOpenedAt ? isoDate(item.lastOpenedAt) : null
    };
  });

  const selectedProjectId = value.selectedProjectId == null
    ? null
    : nonEmptyText(value.selectedProjectId, '当前项目 ID');
  if (selectedProjectId && !ids.has(selectedProjectId)) {
    throw new ProjectRegistryError('INVALID_REGISTRY', '当前项目不在项目注册表中');
  }
  for (let index = 0; index < projects.length; index += 1) {
    for (let candidate = index + 1; candidate < projects.length; candidate += 1) {
      if (isWithin(projects[index].rootPath, projects[candidate].rootPath)
        || isWithin(projects[candidate].rootPath, projects[index].rootPath)) {
        throw new ProjectRegistryError('INVALID_REGISTRY', '项目注册表包含互相嵌套的项目目录');
      }
    }
  }
  return { version: PROJECT_REGISTRY_VERSION, selectedProjectId, projects };
}

function validateManifest(value, manifestPath) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new ProjectRegistryError('INVALID_MANIFEST', `项目清单格式无效：${manifestPath}`);
  }
  if (value.version !== PROJECT_MANIFEST_VERSION) {
    throw new ProjectRegistryError('INVALID_MANIFEST', `不支持的项目清单版本：${value.version}`);
  }
  return {
    version: PROJECT_MANIFEST_VERSION,
    id: nonEmptyText(value.id, '项目 ID'),
    name: nonEmptyText(value.name, '项目名称'),
    description: String(value.description ?? '').trim(),
    createdAt: isoDate(value.createdAt),
    updatedAt: isoDate(value.updatedAt || value.createdAt)
  };
}

export function projectLayout(rootPath) {
  const root = path.resolve(rootPath);
  const preferredMetadata = path.join(root, '.autotest-studio');
  const legacyMetadata = path.join(root, '.jmom');
  const metadataDirectory = existsSync(preferredMetadata) || !existsSync(legacyMetadata)
    ? preferredMetadata
    : legacyMetadata;
  return {
    root,
    metadataDirectory,
    manifestFile: path.join(metadataDirectory, 'project.json'),
    databaseFile: path.join(metadataDirectory, 'project.sqlite'),
    casesDirectory: path.join(root, 'cases'),
    dataDirectory: path.join(root, 'data'),
    recordingsDirectory: path.join(root, 'recordings'),
    runsDirectory: path.join(root, 'runs'),
    reportsDirectory: path.join(root, 'reports'),
    temporaryDirectory: path.join(root, 'tmp')
  };
}

async function assertDirectory(directory, label) {
  let details;
  try {
    details = await stat(directory);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new ProjectRegistryError('INVALID_PROJECT_LAYOUT', `${label}不存在：${directory}`, error);
    }
    throw error;
  }
  if (!details.isDirectory()) {
    throw new ProjectRegistryError('INVALID_PROJECT_LAYOUT', `${label}不是目录：${directory}`);
  }
}

export async function readProjectManifest(rootPath) {
  const layout = projectLayout(rootPath);
  const value = await readJson(layout.manifestFile, 'INVALID_MANIFEST', '项目清单');
  if (!value) {
    throw new ProjectRegistryError('INVALID_MANIFEST', `项目清单不存在：${layout.manifestFile}`);
  }
  return validateManifest(value, layout.manifestFile);
}

export async function assertProjectLayout(rootPath) {
  const layout = projectLayout(rootPath);
  await assertDirectory(layout.root, '项目目录');
  await assertDirectory(layout.metadataDirectory, '项目元数据目录');
  const manifest = await readProjectManifest(layout.root);
  let databaseDetails;
  try {
    databaseDetails = await stat(layout.databaseFile);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new ProjectRegistryError('INVALID_PROJECT_LAYOUT', `项目数据库不存在：${layout.databaseFile}`, error);
    }
    throw error;
  }
  if (!databaseDetails.isFile()) {
    throw new ProjectRegistryError('INVALID_PROJECT_LAYOUT', `项目数据库不是文件：${layout.databaseFile}`);
  }
  await Promise.all(PROJECT_ASSET_DIRECTORIES.map((name) => assertDirectory(path.join(layout.root, name), `项目 ${name} 目录`)));
  return { layout, manifest };
}

export class ProjectRegistry {
  constructor(registryDirectory, options = {}) {
    this.registryDirectory = path.resolve(nonEmptyText(registryDirectory, '注册表目录'));
    this.registryFile = path.join(this.registryDirectory, 'projects.json');
    this.clock = options.clock || (() => new Date());
    this.idFactory = options.idFactory || randomUUID;
    this.operation = Promise.resolve();
  }

  runExclusive(action) {
    const result = this.operation.then(action, action);
    this.operation = result.catch(() => {});
    return result;
  }

  async load() {
    await mkdir(this.registryDirectory, { recursive: true });
    const value = await readJson(this.registryFile, 'INVALID_REGISTRY', '项目注册表');
    return value ? validateRegistry(value) : registryDocument();
  }

  async save(value) {
    const validated = validateRegistry(value);
    await writeJsonAtomically(this.registryFile, validated);
    return validated;
  }

  now() {
    return isoDate(this.clock());
  }

  assertPathAvailable(projects, rootPath, ignoredProjectId = null) {
    for (const project of projects) {
      if (project.id === ignoredProjectId) continue;
      if (comparablePath(project.rootPath) === comparablePath(rootPath)) {
        throw new ProjectRegistryError('DUPLICATE_PROJECT', `项目目录已经注册：${rootPath}`);
      }
      if (isWithin(project.rootPath, rootPath) || isWithin(rootPath, project.rootPath)) {
        throw new ProjectRegistryError(
          'NESTED_PROJECT',
          `项目目录不能互相嵌套：${rootPath} 与 ${project.rootPath}`
        );
      }
    }
  }

  async listProjects() {
    await this.operation;
    const value = await this.load();
    return value.projects.map((project) => ({
      ...clone(project),
      selected: project.id === value.selectedProjectId
    }));
  }

  async getProject(projectId) {
    await this.operation;
    const value = await this.load();
    const project = value.projects.find((item) => item.id === projectId);
    return project ? clone(project) : null;
  }

  async getSelectedProject() {
    await this.operation;
    const value = await this.load();
    const project = value.projects.find((item) => item.id === value.selectedProjectId);
    return project ? clone(project) : null;
  }

  createProject(input) {
    return this.runExclusive(async () => {
      const name = nonEmptyText(input?.name, '项目名称');
      const description = String(input?.description ?? '').trim();
      const rootPath = await canonicalizePath(input?.rootPath);
      const registry = await this.load();
      this.assertPathAvailable(registry.projects, rootPath);

      let rootExists = false;
      try {
        const details = await stat(rootPath);
        if (!details.isDirectory()) {
          throw new ProjectRegistryError('INVALID_PROJECT_ROOT', `项目路径不是目录：${rootPath}`);
        }
        rootExists = true;
      } catch (error) {
        if (error?.code !== 'ENOENT') throw error;
      }
      if (rootExists && (await readdir(rootPath)).length > 0) {
        throw new ProjectRegistryError('PROJECT_ROOT_NOT_EMPTY', `新项目目录必须为空：${rootPath}`);
      }

      const id = nonEmptyText(this.idFactory(), '项目 ID');
      if (registry.projects.some((project) => project.id === id)) {
        throw new ProjectRegistryError('DUPLICATE_PROJECT', `项目 ID 已存在：${id}`);
      }
      const timestamp = this.now();
      const layout = projectLayout(rootPath);
      await Promise.all([
        mkdir(layout.metadataDirectory, { recursive: true }),
        ...PROJECT_ASSET_DIRECTORIES.map((directory) => mkdir(path.join(rootPath, directory), { recursive: true }))
      ]);
      await writeFile(layout.databaseFile, '', { flag: 'wx' });
      await writeJsonAtomically(layout.manifestFile, {
        version: PROJECT_MANIFEST_VERSION,
        id,
        name,
        description,
        createdAt: timestamp,
        updatedAt: timestamp
      });

      const project = {
        id,
        name,
        description,
        rootPath,
        createdAt: timestamp,
        updatedAt: timestamp,
        lastOpenedAt: null
      };
      registry.projects.push(project);
      registry.selectedProjectId ||= project.id;
      await this.save(registry);
      return clone(project);
    });
  }

  registerProject(input) {
    return this.runExclusive(async () => {
      const requestedRoot = typeof input === 'string' ? input : input?.rootPath;
      const rootPath = await canonicalizePath(requestedRoot, true);
      const registry = await this.load();
      this.assertPathAvailable(registry.projects, rootPath);
      const { manifest } = await assertProjectLayout(rootPath);
      if (registry.projects.some((project) => project.id === manifest.id)) {
        throw new ProjectRegistryError('DUPLICATE_PROJECT', `项目 ID 已经注册：${manifest.id}`);
      }

      const project = {
        id: manifest.id,
        name: manifest.name,
        description: manifest.description,
        rootPath,
        createdAt: manifest.createdAt,
        updatedAt: manifest.updatedAt,
        lastOpenedAt: null
      };
      registry.projects.push(project);
      registry.selectedProjectId ||= project.id;
      await this.save(registry);
      return clone(project);
    });
  }

  selectProject(projectId) {
    return this.runExclusive(async () => {
      const registry = await this.load();
      const project = registry.projects.find((item) => item.id === projectId);
      if (!project) {
        throw new ProjectRegistryError('PROJECT_NOT_REGISTERED', `项目未注册：${projectId}`);
      }
      const rootPath = await canonicalizePath(project.rootPath, true);
      const { manifest } = await assertProjectLayout(rootPath);
      if (manifest.id !== project.id) {
        throw new ProjectRegistryError(
          'PROJECT_ID_MISMATCH',
          `项目清单 ID 与注册信息不一致：${project.rootPath}`
        );
      }
      const timestamp = this.now();
      project.rootPath = rootPath;
      project.name = manifest.name;
      project.description = manifest.description;
      project.updatedAt = manifest.updatedAt;
      project.lastOpenedAt = timestamp;
      registry.selectedProjectId = project.id;
      await this.save(registry);
      return clone(project);
    });
  }

  removeProject(projectId) {
    return this.runExclusive(async () => {
      const registry = await this.load();
      const index = registry.projects.findIndex((item) => item.id === projectId);
      if (index < 0) {
        throw new ProjectRegistryError('PROJECT_NOT_REGISTERED', `项目未注册：${projectId}`);
      }
      const [removed] = registry.projects.splice(index, 1);
      if (registry.selectedProjectId === projectId) registry.selectedProjectId = null;
      await this.save(registry);
      return clone(removed);
    });
  }
}

export async function deleteProjectDirectory(rootPath) {
  const { layout } = await assertProjectLayout(rootPath);
  await rm(layout.root, { recursive: true, force: true });
  return layout.root;
}

export function projectFolderName(name) {
  const safe = String(name ?? '')
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[. ]+|[. ]+$/g, '')
    .slice(0, 40);
  return safe || 'project';
}

export async function allocateEmptyDirectory(parentDirectory, baseName) {
  const parent = path.resolve(nonEmptyText(parentDirectory, '项目父目录'));
  await mkdir(parent, { recursive: true });
  const folder = projectFolderName(baseName);
  for (let index = 1; index < 1000; index += 1) {
    const candidate = path.join(parent, index === 1 ? folder : `${folder}-${index}`);
    if (!existsSync(candidate)) return candidate;
    if ((await readdir(candidate)).length === 0) return candidate;
  }
  throw new ProjectRegistryError('PROJECT_ROOT_NOT_EMPTY', `无法在 ${parent} 下分配空的项目目录`);
}
