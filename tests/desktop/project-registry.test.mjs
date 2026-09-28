import assert from 'node:assert/strict';
import { mkdtemp, readFile, realpath, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  PROJECT_ASSET_DIRECTORIES,
  ProjectRegistry,
  projectLayout,
  readProjectManifest
} from '../../desktop/project-registry.mjs';

const FIXED_TIME = new Date('2026-09-28T06:00:00.000Z');

async function temporaryWorkspace(testContext) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'autotest-project-registry-'));
  testContext.after(async () => {
    await rm(directory, { recursive: true, force: true });
  });
  return directory;
}

function createRegistry(registryDirectory, id = 'project-one') {
  return new ProjectRegistry(registryDirectory, {
    clock: () => FIXED_TIME,
    idFactory: () => id
  });
}

test('创建项目会生成独立数据库、清单和全部资产目录', async (t) => {
  const workspace = await temporaryWorkspace(t);
  const rootPath = path.join(workspace, 'projects', 'alpha');
  const registry = createRegistry(path.join(workspace, 'registry'));

  const created = await registry.createProject({
    name: 'WMS 自动化',
    description: '仓储回归项目',
    rootPath
  });

  assert.equal(created.id, 'project-one');
  assert.equal(created.name, 'WMS 自动化');
  assert.equal(created.rootPath, await realpath(rootPath));
  const layout = projectLayout(rootPath);
  assert.equal((await stat(layout.databaseFile)).isFile(), true);
  for (const directory of PROJECT_ASSET_DIRECTORIES) {
    assert.equal((await stat(path.join(rootPath, directory))).isDirectory(), true, `${directory} 应为目录`);
  }
  const manifest = await readProjectManifest(rootPath);
  assert.deepEqual(manifest, {
    version: 1,
    id: 'project-one',
    name: 'WMS 自动化',
    description: '仓储回归项目',
    createdAt: FIXED_TIME.toISOString(),
    updatedAt: FIXED_TIME.toISOString()
  });

  const projects = await registry.listProjects();
  assert.equal(projects.length, 1);
  assert.equal(projects[0].selected, true, '首个项目应自动成为当前项目');
  const registryJson = JSON.parse(await readFile(registry.registryFile, 'utf8'));
  assert.equal(registryJson.selectedProjectId, 'project-one');
});

test('同一目录以及任一方向的嵌套目录都不能注册为其他项目', async (t) => {
  const workspace = await temporaryWorkspace(t);
  const projectsRoot = path.join(workspace, 'projects');
  const firstRoot = path.join(projectsRoot, 'alpha');
  const registry = createRegistry(path.join(workspace, 'registry'));
  await registry.createProject({ name: '项目 A', rootPath: firstRoot });

  await assert.rejects(
    registry.createProject({ name: '重复项目', rootPath: firstRoot }),
    (error) => error.code === 'DUPLICATE_PROJECT'
  );
  await assert.rejects(
    registry.createProject({ name: '子项目', rootPath: path.join(firstRoot, 'child') }),
    (error) => error.code === 'NESTED_PROJECT'
  );
  await assert.rejects(
    registry.createProject({ name: '父项目', rootPath: projectsRoot }),
    (error) => error.code === 'NESTED_PROJECT'
  );
  assert.equal((await registry.listProjects()).length, 1);
});

test('现有项目可在另一注册表中登记、选择并跨实例恢复', async (t) => {
  const workspace = await temporaryWorkspace(t);
  const rootPath = path.join(workspace, 'projects', 'portable-project');
  const sourceRegistry = createRegistry(path.join(workspace, 'registry-a'), 'portable-id');
  await sourceRegistry.createProject({ name: '可迁移项目', rootPath });

  const registryDirectory = path.join(workspace, 'registry-b');
  const targetRegistry = createRegistry(registryDirectory, 'unused-id');
  const registered = await targetRegistry.registerProject(rootPath);
  assert.equal(registered.id, 'portable-id');
  assert.equal(registered.rootPath, await realpath(rootPath));
  await targetRegistry.selectProject('portable-id');

  const reloadedRegistry = createRegistry(registryDirectory, 'another-unused-id');
  const selected = await reloadedRegistry.getSelectedProject();
  assert.equal(selected.id, 'portable-id');
  assert.equal(selected.lastOpenedAt, FIXED_TIME.toISOString());
});

test('取消注册只修改注册表，不删除项目目录或其中资产', async (t) => {
  const workspace = await temporaryWorkspace(t);
  const rootPath = path.join(workspace, 'projects', 'preserved');
  const registry = createRegistry(path.join(workspace, 'registry'));
  const project = await registry.createProject({ name: '保留资产', rootPath });
  const marker = path.join(rootPath, 'cases', 'keep-me.spec.js');
  await writeFile(marker, 'export default {};\n', 'utf8');

  const removed = await registry.removeProject(project.id);

  assert.equal(removed.rootPath, await realpath(rootPath));
  assert.equal((await registry.listProjects()).length, 0);
  assert.equal(await readFile(marker, 'utf8'), 'export default {};\n');
  assert.equal((await stat(projectLayout(rootPath).databaseFile)).isFile(), true);
});

test('重新选择已登记项目时校验清单 ID', async (t) => {
  const workspace = await temporaryWorkspace(t);
  const rootPath = path.join(workspace, 'projects', 'manifest-mismatch');
  const registry = createRegistry(path.join(workspace, 'registry'));
  const project = await registry.createProject({ name: '清单校验项目', rootPath });
  const layout = projectLayout(rootPath);
  const manifest = JSON.parse(await readFile(layout.manifestFile, 'utf8'));
  await writeFile(layout.manifestFile, `${JSON.stringify({
    ...manifest,
    id: 'unexpected-project-id'
  }, null, 2)}\n`, 'utf8');

  const selected = await registry.getSelectedProject();
  assert.equal(selected.id, project.id);
  await assert.rejects(
    registry.selectProject(selected.id),
    (error) => error.code === 'PROJECT_ID_MISMATCH'
  );
});
