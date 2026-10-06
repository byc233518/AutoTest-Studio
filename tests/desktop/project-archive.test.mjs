import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { DatabaseSync } from 'node:sqlite';
import {
  ProjectRegistry,
  projectLayout
} from '../../desktop/project-registry.mjs';
import {
  archiveFileName,
  packProjectArchive,
  rewriteProjectIdentity,
  unpackProjectArchive,
  writeProjectArchive
} from '../../desktop/project-archive.mjs';
import { ZipArchiveError, createZipBuffer, readZipBuffer } from '../../desktop/zip-archive.mjs';

const FIXED_TIME = new Date('2026-10-06T06:00:00.000Z');

async function workspace(testContext) {
  const directory = await mkdtemp(path.join(tmpdir(), 'autotest-project-archive-'));
  testContext.after(async () => rm(directory, { recursive: true, force: true }));
  return directory;
}

async function seedProject(rootPath, { id = 'project-one', name = '导出项目' } = {}) {
  const registry = new ProjectRegistry(path.join(path.dirname(rootPath), 'registry'), {
    clock: () => FIXED_TIME,
    idFactory: () => id
  });
  await registry.createProject({ name, description: '整包导出', rootPath });
  const layout = projectLayout(rootPath);
  const db = new DatabaseSync(layout.databaseFile);
  db.exec('CREATE TABLE IF NOT EXISTS demo (id TEXT PRIMARY KEY, note TEXT NOT NULL);');
  db.prepare('INSERT INTO demo (id, note) VALUES (?, ?)').run('row-1', 'keep-me');
  db.close();
  await writeFile(path.join(layout.dataDirectory, 'sample.json'), `${JSON.stringify({ ok: true }, null, 2)}\n`, 'utf8');
  await mkdir(path.join(layout.temporaryDirectory, 'scratch'), { recursive: true });
  await writeFile(path.join(layout.temporaryDirectory, 'scratch', 'secret.txt'), 'do-not-export', 'utf8');
  return { registry, layout };
}

test('zip 往返保留文件内容并拒绝越界路径', () => {
  const buffer = createZipBuffer([
    { name: 'cases/open.spec.js', data: 'export const ok = 1;\n' },
    { name: '.autotest-studio/project.json', data: '{"id":"p1"}\n' }
  ], { modifiedAt: FIXED_TIME });
  const entries = Object.fromEntries(readZipBuffer(buffer).map((entry) => [entry.name, entry.data.toString('utf8')]));
  assert.equal(entries['cases/open.spec.js'], 'export const ok = 1;\n');
  assert.throws(() => createZipBuffer([{ name: '../evil.txt', data: 'x' }]), (error) => error.code === 'INVALID_ZIP_PATH');
});

test('项目整包导出包含数据与数据库，并跳过 tmp', async (t) => {
  const root = path.join(await workspace(t), 'source');
  await seedProject(root);
  const buffer = await packProjectArchive(root, { clock: () => FIXED_TIME });
  const names = readZipBuffer(buffer).map((entry) => entry.name).sort();
  assert.equal(names.includes('.autotest-studio/project.json'), true);
  assert.equal(names.includes('.autotest-studio/project.sqlite'), true);
  assert.equal(names.includes('.autotest-studio/archive.json'), true);
  assert.equal(names.includes('data/sample.json'), true);
  assert.equal(names.some((name) => name.startsWith('tmp/')), false);

  const dest = path.join(path.dirname(root), 'imported');
  const unpacked = await unpackProjectArchive(buffer, dest);
  assert.equal(unpacked.manifest.id, 'project-one');
  assert.equal(unpacked.manifest.name, '导出项目');
  assert.equal(JSON.parse(await readFile(path.join(dest, 'data', 'sample.json'), 'utf8')).ok, true);
  const db = new DatabaseSync(projectLayout(dest).databaseFile);
  assert.equal(db.prepare('SELECT note FROM demo WHERE id = ?').get('row-1').note, 'keep-me');
  db.close();
});

test('导入到空目录后可注册；同 ID 冲突时改写清单再注册', async (t) => {
  const dir = await workspace(t);
  const source = path.join(dir, 'source');
  const { registry } = await seedProject(source);
  const archivePath = path.join(dir, archiveFileName('导出项目', () => FIXED_TIME));
  await writeProjectArchive(source, archivePath, { clock: () => FIXED_TIME });

  const firstDest = path.join(dir, 'copy-a');
  await unpackProjectArchive(await readFile(archivePath), firstDest);
  await assert.rejects(registry.registerProject(firstDest), (error) => error.code === 'DUPLICATE_PROJECT');

  const rewritten = await rewriteProjectIdentity(firstDest, { id: 'project-imported', clock: () => FIXED_TIME });
  assert.equal(rewritten.id, 'project-imported');
  const registered = await registry.registerProject(firstDest);
  assert.equal(registered.id, 'project-imported');
  assert.equal(registered.name, '导出项目');
});

test('带包装目录的项目包会解压到目标根目录', async (t) => {
  const dir = await workspace(t);
  const source = path.join(dir, 'source');
  await seedProject(source);
  const inner = readZipBuffer(await packProjectArchive(source, { clock: () => FIXED_TIME }));
  const wrapped = createZipBuffer(inner.map((entry) => ({
    name: `bundle/${entry.name}`,
    data: entry.data
  })), { modifiedAt: FIXED_TIME });
  const dest = path.join(dir, 'from-bundle');
  const unpacked = await unpackProjectArchive(wrapped, dest);
  assert.equal(unpacked.manifest.id, 'project-one');
  assert.equal(JSON.parse(await readFile(path.join(dest, '.autotest-studio', 'archive.json'), 'utf8')).kind, 'autotest-studio-project');
});
