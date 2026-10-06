import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { startServer } from '../../server/index.mjs';

function projectOptions(projectRoot, runtimeRoot, name) {
  return {
    desktopMode: true,
    project: { name, description: `${name} 的本地资产` },
    workspaceRoot: runtimeRoot,
    dataDir: projectRoot,
    databasePath: path.resolve(projectRoot, '.autotest-studio', 'project.sqlite'),
    uploadsDir: path.resolve(projectRoot, 'data'),
    reportsDir: path.resolve(projectRoot, 'reports'),
    recordingsDir: path.resolve(projectRoot, 'recordings'),
    recordingScriptsDir: path.resolve(projectRoot, 'cases'),
    scriptsDir: path.resolve(projectRoot, 'cases'),
    temporaryDir: path.resolve(projectRoot, 'tmp'),
    runMode: 'mock',
    silent: true
  };
}

async function openProject(appOptions) {
  return startServer({ host: '127.0.0.1', port: 0, appOptions });
}

async function requestJson(handle, pathname, options = {}) {
  const response = await fetch(`${handle.origin}${pathname}`, options);
  const body = response.status === 204 ? null : await response.json();
  assert.equal(response.ok, true, body?.message || `${options.method || 'GET'} ${pathname} 请求失败`);
  return body;
}

test('不同桌面项目的用例、脚本和环境配置物理隔离并可独立恢复', async (t) => {
  const workspace = await mkdtemp(path.join(tmpdir(), 'autotest-project-assets-'));
  const runtimeRoot = path.resolve(workspace, 'runtime');
  const projectARoot = path.resolve(workspace, 'project-a');
  const projectBRoot = path.resolve(workspace, 'project-b');
  const projectA = projectOptions(projectARoot, runtimeRoot, '项目 A');
  const projectB = projectOptions(projectBRoot, runtimeRoot, '项目 B');
  await Promise.all([
    mkdir(runtimeRoot, { recursive: true }),
    mkdir(path.dirname(projectA.databasePath), { recursive: true }),
    mkdir(path.dirname(projectB.databasePath), { recursive: true })
  ]);

  let handle = null;
  t.after(async () => {
    await handle?.close().catch(() => {});
    await rm(workspace, { recursive: true, force: true });
  });

  handle = await openProject(projectA);
  const jsonHeaders = { 'content-type': 'application/json' };
  await requestJson(handle, '/api/environments/ENV-TEST', {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify({
      baseUrl: 'http://project-a.example.test',
      username: 'project-a-user',
      password: 'project-a-secret',
      variables: [{ key: 'tenantCode', value: 'TENANT-A' }],
      isDefault: true
    })
  });
  await requestJson(handle, '/api/scenarios/sample-form-submit', {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify({ name: '项目 A 客户用例', module: '项目 A/客户目录' })
  });
  const projectAScript = "const { test } = require('@playwright/test');\ntest('project a only', async () => {});\n";
  await requestJson(handle, '/api/scenarios/sample-form-submit/script', {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify({ fileName: 'project-a.spec.js', content: projectAScript })
  });
  await handle.close();
  handle = null;

  handle = await openProject(projectB);
  const projectBEnvironments = (await requestJson(handle, '/api/environments')).environments;
  const projectBEnvironment = projectBEnvironments.find((item) => item.id === 'ENV-TEST');
  const projectBScenario = await requestJson(handle, '/api/scenarios/sample-form-submit');
  assert.notEqual(projectBEnvironment.baseUrl, 'http://project-a.example.test');
  assert.notEqual(projectBEnvironment.username, 'project-a-user');
  assert.deepEqual(projectBEnvironment.variables, []);
  assert.notEqual(projectBScenario.name, '项目 A 客户用例');
  assert.notEqual(projectBScenario.module, '项目 A/客户目录');
  await assert.rejects(
    stat(path.resolve(projectBRoot, 'cases', 'sample-form-submit', 'project-a.spec.js')),
    (error) => error.code === 'ENOENT'
  );

  await requestJson(handle, '/api/environments/ENV-TEST', {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify({
      baseUrl: 'http://project-b.example.test',
      username: 'project-b-user',
      password: 'project-b-secret',
      variables: [{ key: 'tenantCode', value: 'TENANT-B' }],
      isDefault: true
    })
  });
  await requestJson(handle, '/api/scenarios/sample-form-submit', {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify({ name: '项目 B 客户用例', module: '项目 B/客户目录' })
  });
  const projectBScript = "const { test } = require('@playwright/test');\ntest('project b only', async () => {});\n";
  await requestJson(handle, '/api/scenarios/sample-form-submit/script', {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify({ fileName: 'project-b.spec.js', content: projectBScript })
  });
  await handle.close();
  handle = null;

  handle = await openProject(projectA);
  const restoredEnvironments = (await requestJson(handle, '/api/environments')).environments;
  const restoredEnvironment = restoredEnvironments.find((item) => item.id === 'ENV-TEST');
  const restoredScenario = await requestJson(handle, '/api/scenarios/sample-form-submit');
  const restoredScript = await requestJson(handle, '/api/scenarios/sample-form-submit/script');
  assert.equal(restoredEnvironment.baseUrl, 'http://project-a.example.test');
  assert.equal(restoredEnvironment.username, 'project-a-user');
  assert.deepEqual(restoredEnvironment.variables, [{ key: 'tenantCode', value: 'TENANT-A' }]);
  assert.equal(restoredScenario.name, '项目 A 客户用例');
  assert.equal(restoredScenario.module, '项目 A/客户目录');
  assert.equal(restoredScript.content, projectAScript);
  assert.equal(await readFile(path.resolve(projectARoot, 'cases', 'sample-form-submit', 'project-a.spec.js'), 'utf8'), projectAScript);
  assert.equal(await readFile(path.resolve(projectBRoot, 'cases', 'sample-form-submit', 'project-b.spec.js'), 'utf8'), projectBScript);
  await assert.rejects(
    stat(path.resolve(projectARoot, 'cases', 'sample-form-submit', 'project-b.spec.js')),
    (error) => error.code === 'ENOENT'
  );
  assert.equal((await stat(projectA.databasePath)).isFile(), true);
  assert.equal((await stat(projectB.databasePath)).isFile(), true);
  assert.notEqual(projectA.databasePath, projectB.databasePath);
});

test('桌面切换项目后整页加载新服务并由新 Pinia 实例重新获取项目资产', async () => {
  const [desktopHost, store, environmentsView, scenariosView] = await Promise.all([
    readFile(path.resolve('desktop/main.mjs'), 'utf8'),
    readFile(path.resolve('frontend/src/stores/platform.js'), 'utf8'),
    readFile(path.resolve('frontend/src/views/EnvironmentsView.vue'), 'utf8'),
    readFile(path.resolve('frontend/src/views/ScenariosView.vue'), 'utf8')
  ]);

  const section = (source, start, end) => {
    const startIndex = source.indexOf(start);
    const endIndex = source.indexOf(end, startIndex + start.length);
    return startIndex >= 0 && endIndex > startIndex ? source.slice(startIndex, endIndex) : '';
  };
  const startProjectServer = section(desktopHost, 'async startProjectServer(project)', 'async stopProjectServer()');
  const loadActiveProject = section(desktopHost, 'async loadActiveProject()', 'async assertCanSwitchProjects()');
  const selectProject = section(desktopHost, 'selectProject(projectId)', 'async removeProject(projectId)');
  const bootstrap = store.match(/async function bootstrap\(\)\s*\{[^}]*\}/)?.[0] || '';
  const loadCatalog = section(store, 'async function loadCatalog()', 'async function loadRuns()');

  assert.match(startProjectServer, /databasePath:\s*layout\.databaseFile/);
  assert.match(startProjectServer, /scriptsDir:\s*layout\.casesDirectory/);
  assert.match(startProjectServer, /recordingScriptsDir:\s*layout\.casesDirectory/);
  assert.match(loadActiveProject, /await this\.window\.loadURL\(this\.localServer\.origin\)/);
  assert.match(selectProject, /await this\.stopProjectServer\(\)/);
  assert.match(selectProject, /await this\.startProjectServer\(nextProject\)/);
  assert.match(selectProject, /await this\.loadActiveProject\(\)/);
  assert.ok(selectProject.indexOf('startProjectServer(nextProject)') < selectProject.indexOf('loadActiveProject()'));
  assert.match(bootstrap, /await Promise\.all\(\[loadCatalog\(\), loadRuns\(\)\]\)/);
  assert.match(loadCatalog, /api\('\/api\/scenarios'\)/);
  assert.match(loadCatalog, /api\('\/api\/environments'\)/);
  assert.match(environmentsView, /watch\(\(\) => store\.environments,[\s\S]*?\{ immediate: true \}\)/);
  assert.match(scenariosView, /buildScenarioDirectoryTree\(store\.scenarios\)/);
});
