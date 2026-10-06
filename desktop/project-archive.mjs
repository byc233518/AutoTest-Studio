import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import {
  PROJECT_ASSET_DIRECTORIES,
  ProjectRegistryError,
  assertProjectLayout,
  projectLayout,
  readProjectManifest
} from './project-registry.mjs';
import { ZipArchiveError, createZipBuffer, readZipBuffer } from './zip-archive.mjs';

export const PROJECT_ARCHIVE_KIND = 'autotest-studio-project';
export const PROJECT_ARCHIVE_VERSION = 1;
export { ZipArchiveError };

const SKIPPED_ASSET = 'tmp';

function posixJoin(...parts) {
  return parts.filter(Boolean).join('/');
}

function sqliteLiteralPath(filePath) {
  return path.resolve(filePath).replaceAll('\\', '/').replaceAll("'", "''");
}

export function archiveFileName(projectName, clock = () => new Date()) {
  const stamp = clock().toISOString().slice(0, 10).replaceAll('-', '');
  const safe = String(projectName || 'project')
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'project';
  return `${safe}-${stamp}.zip`;
}

async function listFiles(rootPath) {
  const files = [];
  async function walk(directory) {
    let entries = [];
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch (error) {
      if (error?.code === 'ENOENT') return;
      throw error;
    }
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }
  }
  await walk(rootPath);
  return files;
}

function relativePosix(rootPath, filePath) {
  return path.relative(rootPath, filePath).split(path.sep).join('/');
}

function shouldSkipRelative(relativePath) {
  const [top] = relativePath.split('/');
  if (top === SKIPPED_ASSET) return true;
  if (relativePath.endsWith('.sqlite-wal') || relativePath.endsWith('.sqlite-shm')) return true;
  if (relativePath.endsWith('/archive.json') || relativePath === 'archive.json') return true;
  return false;
}

export async function snapshotSqliteFile(sourcePath, destinationPath) {
  await mkdir(path.dirname(destinationPath), { recursive: true });
  if (existsSync(destinationPath)) await rm(destinationPath, { force: true });
  const db = new DatabaseSync(sourcePath);
  try {
    db.exec(`VACUUM INTO '${sqliteLiteralPath(destinationPath)}'`);
  } finally {
    db.close();
  }
  const details = await stat(destinationPath);
  if (!details.isFile() || details.size < 0) {
    throw new ProjectRegistryError('INVALID_PROJECT_LAYOUT', `无法导出项目数据库：${sourcePath}`);
  }
}

async function snapshotSqliteWithFallback(sourcePath, destinationPath) {
  try {
    await snapshotSqliteFile(sourcePath, destinationPath);
  } catch {
    await copyFile(sourcePath, destinationPath);
  }
}

export async function packProjectArchive(rootPath, {
  clock = () => new Date(),
  snapshotSqlite = snapshotSqliteWithFallback
} = {}) {
  const { layout, manifest } = await assertProjectLayout(rootPath);
  const metadataName = path.basename(layout.metadataDirectory);
  const sqliteRelative = posixJoin(metadataName, 'project.sqlite');
  const archiveRelative = posixJoin(metadataName, 'archive.json');
  const snapshotPath = `${layout.databaseFile}.${process.pid}.${randomUUID()}.export.sqlite`;
  const entries = [];
  try {
    await snapshotSqlite(layout.databaseFile, snapshotPath);
    entries.push({ name: sqliteRelative, data: await readFile(snapshotPath) });
    const archiveDocument = {
      kind: PROJECT_ARCHIVE_KIND,
      version: PROJECT_ARCHIVE_VERSION,
      exportedAt: clock().toISOString(),
      project: {
        id: manifest.id,
        name: manifest.name,
        description: manifest.description
      }
    };
    entries.push({
      name: archiveRelative,
      data: Buffer.from(`${JSON.stringify(archiveDocument, null, 2)}\n`, 'utf8')
    });

    for (const filePath of await listFiles(layout.root)) {
      const relativePath = relativePosix(layout.root, filePath);
      if (shouldSkipRelative(relativePath)) continue;
      if (relativePath === sqliteRelative || relativePath === archiveRelative) continue;
      if (filePath === snapshotPath) continue;
      entries.push({ name: relativePath, data: await readFile(filePath) });
    }
    return createZipBuffer(entries, { modifiedAt: clock() });
  } finally {
    await rm(snapshotPath, { force: true }).catch(() => {});
  }
}

export async function writeProjectArchive(rootPath, outputPath, options = {}) {
  const buffer = await packProjectArchive(rootPath, options);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, buffer);
  return { filePath: path.resolve(outputPath), bytes: buffer.length };
}

function findProjectRootFromEntries(names) {
  const manifestNames = names.filter((name) => name.endsWith('.autotest-studio/project.json') || name.endsWith('.jmom/project.json') || name === '.autotest-studio/project.json' || name === '.jmom/project.json');
  if (manifestNames.length !== 1) {
    throw new ZipArchiveError('INVALID_PROJECT_ARCHIVE', '项目包中必须包含且仅包含一份项目清单');
  }
  const manifestName = manifestNames[0];
  const index = manifestName.lastIndexOf('/');
  const metadataDir = index === -1 ? '' : manifestName.slice(0, index);
  const prefix = metadataDir.includes('/') ? `${metadataDir.slice(0, metadataDir.lastIndexOf('/'))}/` : '';
  return { prefix, metadataDir, manifestName };
}

export async function unpackProjectArchive(archiveBuffer, destinationRoot) {
  const dest = path.resolve(destinationRoot);
  await mkdir(dest, { recursive: true });
  const existing = await readdir(dest);
  if (existing.length) {
    throw new ProjectRegistryError('PROJECT_ROOT_NOT_EMPTY', `导入目录必须为空：${dest}`);
  }

  const entries = readZipBuffer(archiveBuffer);
  const names = entries.map((entry) => entry.name);
  const { prefix } = findProjectRootFromEntries(names);
  const written = [];
  try {
    for (const entry of entries) {
      if (prefix && !entry.name.startsWith(prefix)) {
        throw new ZipArchiveError('INVALID_PROJECT_ARCHIVE', '项目包包含清单目录之外的文件');
      }
      const relativePath = prefix ? entry.name.slice(prefix.length) : entry.name;
      if (!relativePath || relativePath === 'tmp' || relativePath.startsWith('tmp/')) continue;
      const targetPath = path.resolve(dest, ...relativePath.split('/'));
      const relative = path.relative(dest, targetPath);
      if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
        throw new ZipArchiveError('INVALID_ZIP_PATH', `项目包路径越界：${entry.name}`);
      }
      await mkdir(path.dirname(targetPath), { recursive: true });
      await writeFile(targetPath, entry.data, { flag: 'wx' });
      written.push(targetPath);
    }
    for (const directory of PROJECT_ASSET_DIRECTORIES) {
      await mkdir(path.join(dest, directory), { recursive: true });
    }
    await assertProjectLayout(dest);
    const archiveMetaPath = path.join(projectLayout(dest).metadataDirectory, 'archive.json');
    if (existsSync(archiveMetaPath)) {
      const archiveMeta = JSON.parse(await readFile(archiveMetaPath, 'utf8'));
      if (archiveMeta.kind !== PROJECT_ARCHIVE_KIND || archiveMeta.version !== PROJECT_ARCHIVE_VERSION) {
        throw new ZipArchiveError('UNSUPPORTED_PROJECT_ARCHIVE', '不支持的项目包版本');
      }
    }
    return {
      rootPath: dest,
      manifest: await readProjectManifest(dest)
    };
  } catch (error) {
    await Promise.all(written.map((filePath) => rm(filePath, { force: true }).catch(() => {})));
    throw error;
  }
}

export async function unpackProjectArchiveFile(archivePath, destinationRoot) {
  const buffer = await readFile(archivePath);
  return unpackProjectArchive(buffer, destinationRoot);
}

export async function rewriteProjectIdentity(rootPath, { id, clock = () => new Date() } = {}) {
  const layout = projectLayout(rootPath);
  const manifest = await readProjectManifest(rootPath);
  const nextId = String(id || randomUUID()).trim();
  if (!nextId) throw new ProjectRegistryError('INVALID_PROJECT', '项目 ID不能为空');
  const next = {
    ...manifest,
    id: nextId,
    updatedAt: clock().toISOString()
  };
  await writeFile(layout.manifestFile, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
  return next;
}

export { PROJECT_ASSET_DIRECTORIES };
