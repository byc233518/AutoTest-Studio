import path from 'node:path';

export class ProjectPathError extends Error {
  constructor(message, candidate) {
    super(message);
    this.name = 'ProjectPathError';
    this.code = 'PROJECT_PATH_OUTSIDE_ROOT';
    this.candidate = candidate;
  }
}

function comparable(value) {
  const normalized = path.normalize(value);
  return process.platform === 'win32' ? normalized.toLocaleLowerCase('en-US') : normalized;
}

export function isWithinProjectRoot(rootDir, candidate) {
  const root = comparable(path.resolve(rootDir));
  const target = comparable(path.resolve(candidate));
  const relative = path.relative(root, target);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function assertWithinProjectRoot(rootDir, candidate) {
  if (!isWithinProjectRoot(rootDir, candidate)) {
    throw new ProjectPathError(`文件路径超出当前项目目录：${candidate}`, candidate);
  }
}

function portableRelativePath(rootDir, candidate) {
  return path.relative(path.resolve(rootDir), path.resolve(candidate)).split(path.sep).join('/');
}

export function createProjectPathStore(rootDir) {
  const root = path.resolve(rootDir);
  return Object.freeze({
    root,
    store(candidate) {
      if (candidate == null || candidate === '') return null;
      const absolute = path.isAbsolute(candidate) ? path.resolve(candidate) : path.resolve(root, candidate);
      assertWithinProjectRoot(root, absolute);
      const relative = portableRelativePath(root, absolute);
      if (!relative) {
        throw new ProjectPathError('文件路径不能指向项目根目录', candidate);
      }
      return relative;
    },
    resolve(storedPath) {
      if (storedPath == null || storedPath === '') return null;
      const absolute = path.isAbsolute(storedPath)
        ? path.resolve(storedPath)
        : path.resolve(root, storedPath);
      assertWithinProjectRoot(root, absolute);
      return absolute;
    }
  });
}
