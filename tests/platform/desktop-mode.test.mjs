import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { createApp } from '../../server/app.mjs';
import { startServer } from '../../server/index.mjs';
import { createTestContext } from './helpers/test-context.mjs';

test('普通 Web 模式保持登录校验且健康检查标记为非桌面模式', async (t) => {
  const ctx = await createTestContext(t);

  const health = await ctx.fetch('/api/health');
  assert.equal(health.status, 200);
  assert.equal((await health.json()).desktopMode, false);

  const me = await ctx.fetch('/api/me');
  assert.equal(me.status, 401);
});

test('桌面模式自动使用本地用户并应用项目元数据', async (t) => {
  const rootDir = await mkdtemp(path.join(tmpdir(), 'autotest-desktop-mode-'));
  const projectRoot = path.resolve(rootDir, 'project-secret-path');
  const handle = await startServer({
    host: '127.0.0.1',
    port: 0,
    appOptions: {
      desktopMode: true,
      project: {
        id: 'desktop-registry-id',
        name: 'MES 回归项目',
        description: '项目本地离线工作区',
        rootPath: projectRoot
      },
      workspaceRoot: path.resolve(rootDir, 'runtime'),
      dataDir: projectRoot,
      databasePath: ':memory:',
      runMode: 'mock',
      silent: true
    }
  });
  t.after(async () => {
    await handle.close();
    await rm(rootDir, { recursive: true, force: true });
  });

  const health = await fetch(`${handle.origin}/api/health`);
  assert.equal(health.status, 200);
  assert.equal((await health.json()).desktopMode, true);

  const me = await fetch(`${handle.origin}/api/me`);
  assert.equal(me.status, 200);
  assert.deepEqual(await me.json(), {
    id: 'USR-DESKTOP',
    username: 'local',
    displayName: '本地用户',
    role: 'admin'
  });

  const catalog = await fetch(`${handle.origin}/api/scenarios`);
  assert.equal(catalog.status, 200);
  const body = await catalog.json();
  assert.deepEqual(body.project, {
    id: 'PRJ-AUTOTEST',
    name: 'MES 回归项目',
    description: '项目本地离线工作区'
  });
  assert.equal(JSON.stringify(body.project).includes(projectRoot), false);
  assert.equal(body.scenarios.length, 15);
  assert.equal(body.scenarios.some((scenario) => scenario.id.startsWith('SCN-AUTO-')), false);

  const environments = await fetch(`${handle.origin}/api/environments`);
  assert.equal(environments.status, 200);
});

test('createApp 采用桌面项目显式传入的物理目录', async (t) => {
  const rootDir = await mkdtemp(path.join(tmpdir(), 'autotest-desktop-paths-'));
  const projectRoot = path.resolve(rootDir, 'project');
  const customPaths = {
    uploadsDir: path.resolve(projectRoot, 'data'),
    reportsDir: path.resolve(projectRoot, 'reports'),
    recordingsDir: path.resolve(projectRoot, 'recordings'),
    recordingScriptsDir: path.resolve(projectRoot, 'cases'),
    scriptsDir: path.resolve(projectRoot, 'cases', 'managed'),
    temporaryDir: path.resolve(projectRoot, 'tmp')
  };
  const handle = await startServer({
    host: '127.0.0.1',
    port: 0,
    appOptions: {
      desktopMode: true,
      workspaceRoot: path.resolve(rootDir, 'runtime'),
      dataDir: projectRoot,
      databasePath: ':memory:',
      runMode: 'mock',
      silent: true,
      ...customPaths
    }
  });
  t.after(async () => {
    await handle.close();
    await rm(rootDir, { recursive: true, force: true });
  });

  for (const [name, expectedPath] of Object.entries(customPaths)) {
    assert.equal(handle.app.locals.paths[name], expectedPath);
    assert.equal((await stat(expectedPath)).isDirectory(), true);
  }
});

test('桌面项目重启后保留环境、目录和项目脚本修改', async (t) => {
  const rootDir = await mkdtemp(path.join(tmpdir(), 'autotest-desktop-persistence-'));
  const projectRoot = path.resolve(rootDir, 'project');
  const runtimeRoot = path.resolve(rootDir, 'runtime');
  const databasePath = path.resolve(projectRoot, '.autotest-studio', 'project.sqlite');
  const appOptions = {
    desktopMode: true,
    workspaceRoot: runtimeRoot,
    dataDir: projectRoot,
    databasePath,
    uploadsDir: path.resolve(projectRoot, 'data'),
    reportsDir: path.resolve(projectRoot, 'reports'),
    recordingsDir: path.resolve(projectRoot, 'recordings'),
    recordingScriptsDir: path.resolve(projectRoot, 'cases'),
    scriptsDir: path.resolve(projectRoot, 'cases'),
    temporaryDir: path.resolve(projectRoot, 'tmp'),
    runMode: 'mock',
    silent: true
  };
  await Promise.all([
    mkdir(path.dirname(databasePath), { recursive: true }),
    mkdir(runtimeRoot, { recursive: true })
  ]);
  let handle = await startServer({ host: '127.0.0.1', port: 0, appOptions });
  t.after(async () => {
    await handle?.close().catch(() => {});
    await rm(rootDir, { recursive: true, force: true });
  });

  const environment = await fetch(`${handle.origin}/api/environments/ENV-TEST`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      baseUrl: 'http://127.0.0.1:49000',
      username: 'desktop-user',
      password: 'desktop-secret',
      variables: [{ key: 'warehouseCode', value: 'WH-DESKTOP' }],
      isDefault: true
    })
  });
  assert.equal(environment.status, 200);
  const scenario = await fetch(`${handle.origin}/api/scenarios/wms-customer-create`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ module: 'WMS/主数据/客户定制', name: '客户回归定制用例' })
  });
  assert.equal(scenario.status, 200);
  const scriptContent = "const { test } = require('@playwright/test');\ntest('desktop project script', async () => {});\n";
  const script = await fetch(`${handle.origin}/api/scenarios/wms-customer-create/script`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ fileName: 'customer.spec.js', content: scriptContent })
  });
  assert.equal(script.status, 200);
  assert.match((await script.json()).scriptEntry, /^platform-data\/cases\/wms-customer-create\/customer\.spec\.js$/);

  await handle.close();
  handle = null;
  handle = await startServer({ host: '127.0.0.1', port: 0, appOptions });
  const environmentPayload = await fetch(`${handle.origin}/api/environments`).then((response) => response.json());
  const environments = environmentPayload.environments || environmentPayload;
  const restoredEnvironment = environments.find((item) => item.id === 'ENV-TEST');
  assert.equal(restoredEnvironment.baseUrl, 'http://127.0.0.1:49000');
  assert.equal(restoredEnvironment.username, 'desktop-user');
  assert.deepEqual(restoredEnvironment.variables, [{ key: 'warehouseCode', value: 'WH-DESKTOP' }]);
  assert.equal(handle.app.locals.database.getEnvironmentById('ENV-TEST').password, 'desktop-secret');
  const restoredScenario = await fetch(`${handle.origin}/api/scenarios/wms-customer-create`).then((response) => response.json());
  assert.equal(restoredScenario.name, '客户回归定制用例');
  assert.equal(restoredScenario.module, 'WMS/主数据/客户定制');
  const restoredScript = await fetch(`${handle.origin}/api/scenarios/wms-customer-create/script`).then((response) => response.json());
  assert.equal(restoredScript.content, scriptContent);
});

test('桌面模式启动时恢复异常退出遗留任务并作废本地凭证', async () => {
  const rootDir = await mkdtemp(path.join(tmpdir(), 'autotest-desktop-recovery-'));
  const projectRoot = path.resolve(rootDir, 'project');
  const runtimeRoot = path.resolve(rootDir, 'runtime');
  const reportsDir = path.resolve(projectRoot, 'reports');
  const recordingsDir = path.resolve(projectRoot, 'recordings');
  const databasePath = path.resolve(projectRoot, '.autotest-studio', 'project.sqlite');
  const appOptions = {
    desktopMode: true,
    workspaceRoot: runtimeRoot,
    dataDir: projectRoot,
    databasePath,
    uploadsDir: path.resolve(projectRoot, 'data'),
    reportsDir,
    recordingsDir,
    recordingScriptsDir: path.resolve(projectRoot, 'cases'),
    scriptsDir: path.resolve(projectRoot, 'cases'),
    temporaryDir: path.resolve(projectRoot, 'tmp'),
    runMode: 'mock',
    silent: true
  };
  await Promise.all([
    mkdir(path.dirname(databasePath), { recursive: true }),
    mkdir(runtimeRoot, { recursive: true })
  ]);

  let crashedApp;
  let recoveredServer;
  try {
    crashedApp = await createApp(appOptions);
    const database = crashedApp.locals.database;
    const scenario = database.getScenarioByKey('wms-customer-create');
    const environment = database.getDefaultEnvironment();
    const localRunId = 'RUN-RECOVERY-LOCAL';

    for (let index = 0; index < 101; index += 1) {
      const id = index === 100 ? localRunId : `RUN-RECOVERY-${String(index).padStart(3, '0')}`;
      database.createRun({
        id,
        scenarioId: scenario.id,
        datasetId: 'DAT-RECOVERY',
        environment: environment.key,
        executionMode: 'headless',
        executionLocation: index === 100 ? 'local' : 'server',
        status: index % 2 ? 'running' : 'queued',
        triggeredBy: 'USR-DESKTOP',
        summary: {}
      });
    }

    const localReportDir = path.resolve(reportsDir, localRunId);
    await mkdir(localReportDir, { recursive: true });
    await writeFile(path.resolve(localReportDir, 'local-execution.json'), `${JSON.stringify({
      runId: localRunId,
      status: 'waiting',
      token: 'stale-local-token',
      tokenExpires: '2099-01-01T00:00:00.000Z',
      recordCodeHash: 'stale-code-hash',
      recordCodeExpires: '2099-01-01T00:00:00.000Z'
    }, null, 2)}\n`, 'utf8');

    const plan = database.createTestPlan({
      id: 'TPL-RECOVERY',
      name: '异常恢复计划',
      description: '',
      environment: environment.key,
      executionMode: 'headless',
      items: [{ scenarioId: scenario.id, datasetId: 'DAT-RECOVERY' }],
      createdBy: 'USR-DESKTOP'
    });
    database.createTestPlanRun({
      id: 'TPR-RECOVERY',
      testPlanId: plan.id,
      environment: environment.key,
      executionMode: 'headless',
      triggeredBy: 'USR-DESKTOP',
      status: 'running',
      planSnapshot: {}
    }, [{
      id: 'TPI-RECOVERY',
      position: 0,
      scenarioId: scenario.id,
      datasetId: 'DAT-RECOVERY'
    }]);
    database.updateTestPlanRunItem('TPI-RECOVERY', {
      status: 'running',
      startedAt: new Date().toISOString()
    });

    await writeFile(path.resolve(recordingsDir, 'REC-RECOVERY.meta.json'), `${JSON.stringify({
      id: 'REC-RECOVERY',
      status: 'recording',
      location: 'local',
      uploadToken: 'stale-recording-token',
      uploadTokenExpires: '2099-01-01T00:00:00.000Z',
      recordCodeHash: 'stale-recording-code',
      recordCodeExpires: '2099-01-01T00:00:00.000Z'
    }, null, 2)}\n`, 'utf8');

    database.close();
    crashedApp = null;

    recoveredServer = await startServer({ host: '127.0.0.1', port: 0, appOptions });
    const recoveredDatabase = recoveredServer.app.locals.database;
    const activeRuns = recoveredDatabase.raw.prepare(`
      SELECT COUNT(*) AS count FROM runs WHERE status IN ('queued', 'running')
    `).get().count;
    assert.equal(activeRuns, 0);
    assert.equal(recoveredDatabase.raw.prepare(`
      SELECT COUNT(*) AS count FROM runs WHERE id LIKE 'RUN-RECOVERY-%' AND status = 'failed'
    `).get().count, 101);
    assert.match(recoveredDatabase.getRunById(localRunId).error, /上次异常退出/);

    const recoveredPlanRun = recoveredDatabase.getTestPlanRunById('TPR-RECOVERY');
    assert.equal(recoveredPlanRun.status, 'failed');
    assert.equal(recoveredDatabase.getTestPlanRunItemById('TPI-RECOVERY').status, 'failed');
    assert.equal(JSON.parse(recoveredPlanRun.summary_json).recoveredFromInterruptedSession, true);

    const localMeta = JSON.parse(await readFile(path.resolve(localReportDir, 'local-execution.json'), 'utf8'));
    assert.equal(localMeta.status, 'failed');
    assert.equal(localMeta.token, null);
    assert.equal(localMeta.recordCodeHash, null);

    const recordingMeta = JSON.parse(await readFile(path.resolve(recordingsDir, 'REC-RECOVERY.meta.json'), 'utf8'));
    assert.equal(recordingMeta.status, 'failed');
    assert.equal(recordingMeta.uploadToken, null);
    assert.equal(recordingMeta.recordCodeHash, null);

    const nextPlanRun = await fetch(`${recoveredServer.origin}/api/test-plans/${plan.id}/run`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{}'
    });
    assert.equal(nextPlanRun.status, 202);
  } finally {
    await recoveredServer?.close().catch(() => {});
    crashedApp?.locals.database.close();
    await rm(rootDir, { recursive: true, force: true });
  }
});
