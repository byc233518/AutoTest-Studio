import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createApp } from '../../server/app.mjs';
import { resolveScenarioScriptPath } from '../../server/platform/scenario-scripts.mjs';
import { createTestContext } from './helpers/test-context.mjs';

async function catalog(ctx) {
  return (await (await ctx.fetch('/api/scenarios')).json()).scenarios;
}

async function createScenario(ctx, input) {
  const response = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input)
  });
  assert.equal(response.status, 201);
  return response.json();
}

async function uploadDataset(ctx, scenarioKey) {
  const form = new FormData();
  form.append('name', '批量操作数据');
  form.append('file', new Blob(['值\n样本'], { type: 'text/csv' }), 'batch-data.csv');
  const response = await ctx.fetch(`/api/scenarios/${scenarioKey}/datasets`, {
    method: 'POST',
    body: form
  });
  assert.equal(response.status, 201);
  return response.json();
}

async function uploadScript(ctx, scenarioKey, fileName = `${scenarioKey}.spec.js`) {
  const form = new FormData();
  form.append('file', new Blob(['// initial script'], { type: 'text/javascript' }), fileName);
  const response = await ctx.fetch(`/api/scenarios/${scenarioKey}/script`, {
    method: 'POST',
    body: form
  });
  assert.equal(response.status, 201);
  return response.json();
}

async function waitForBatch(ctx, batchId) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const response = await ctx.fetch(`/api/test-plan-runs/${batchId}`);
    assert.equal(response.status, 200);
    const body = await response.json();
    if (!['queued', 'running'].includes(body.status)) return body;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  throw new Error(`批量执行未完成: ${batchId}`);
}

test('批量移动目录会去重并在任一用例不存在时整体回滚', async (t) => {
  const ctx = await createTestContext(t, { desktopMode: true });
  const scenarios = await catalog(ctx);
  const customer = scenarios.find((item) => item.key === 'wms-customer-create');
  const vendor = scenarios.find((item) => item.key === 'wms-vendor-create');

  const movedResponse = await ctx.fetch('/api/scenarios/batch/move', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioIds: [customer.id, vendor.id, customer.id],
      directory: 'WMS / 核心回归'
    })
  });
  assert.equal(movedResponse.status, 200);
  const moved = await movedResponse.json();
  assert.equal(moved.moved, 2);
  assert.equal(moved.directory, 'WMS / 核心回归');
  assert.deepEqual(moved.scenarios.map((item) => item.id), [customer.id, vendor.id]);
  assert.equal(moved.scenarios.every((item) => item.module === 'WMS / 核心回归'), true);
  assert.equal(moved.scenarios[0].status, customer.status);

  const rejected = await ctx.fetch('/api/scenarios/batch/move', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioIds: [customer.id, 'SCN-NOT-FOUND'], directory: '错误目录' })
  });
  assert.equal(rejected.status, 404);
  assert.deepEqual((await rejected.json()).missingScenarioIds, ['SCN-NOT-FOUND']);
  assert.equal((await (await ctx.fetch(`/api/scenarios/${customer.key}`)).json()).module, 'WMS / 核心回归');
});

test('批量删除原子清理数据、计划和依赖，活动执行中的用例禁止删除', async (t) => {
  const ctx = await createTestContext(t, { desktopMode: true });
  const first = await createScenario(ctx, {
    key: 'batch-delete-first',
    name: '待删除一',
    dataSchema: { columns: ['值'], required: ['值'], example: { 值: '样本' } }
  });
  const second = await createScenario(ctx, { key: 'batch-delete-second', name: '待删除二' });
  const dependent = await createScenario(ctx, {
    key: 'batch-delete-dependent',
    name: '依赖用例',
    dependsOn: [first.key, second.key]
  });
  const customer = (await catalog(ctx)).find((item) => item.key === 'wms-customer-create');
  const dataset = await uploadDataset(ctx, first.key);
  const storedDataset = ctx.app.locals.database.getDatasetById(dataset.id);
  assert.equal(existsSync(storedDataset.file_path), true);

  const mixedPlan = await (await ctx.fetch('/api/test-plans', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: '保留计划',
      environment: 'test',
      executionMode: 'headless',
      items: [{ scenarioId: first.id }, { scenarioId: customer.id }]
    })
  })).json();
  const emptyPlan = await (await ctx.fetch('/api/test-plans', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: '随用例删除的计划',
      environment: 'test',
      executionMode: 'headless',
      items: [{ scenarioId: second.id }]
    })
  })).json();

  ctx.app.locals.database.createRun({
    id: 'RUN-BATCH-ACTIVE',
    scenarioId: first.id,
    datasetId: dataset.id,
    environment: 'test',
    executionMode: 'headless',
    executionLocation: 'server',
    status: 'queued',
    triggeredBy: 'USR-DESKTOP'
  });
  const blocked = await ctx.fetch('/api/scenarios/batch/delete', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioIds: [first.id, second.id] })
  });
  assert.equal(blocked.status, 409);
  assert.deepEqual((await blocked.json()).activeRunIds, ['RUN-BATCH-ACTIVE']);
  assert.equal((await ctx.fetch(`/api/scenarios/${first.key}`)).status, 200);

  ctx.app.locals.database.updateRun('RUN-BATCH-ACTIVE', { status: 'failed', finishedAt: new Date().toISOString() });
  const deletedResponse = await ctx.fetch('/api/scenarios/batch/delete', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioIds: [first.id, second.id] })
  });
  assert.equal(deletedResponse.status, 200);
  const deleted = await deletedResponse.json();
  assert.equal(deleted.deleted, 2);
  assert.deepEqual(deleted.scenarioIds, [first.id, second.id]);
  assert.deepEqual(deleted.updatedTestPlanIds, [mixedPlan.id]);
  assert.deepEqual(deleted.deletedTestPlanIds, [emptyPlan.id]);
  assert.deepEqual(deleted.updatedDependencyScenarioIds, [dependent.id]);
  assert.equal(ctx.app.locals.database.getDatasetById(dataset.id), undefined);
  assert.equal(existsSync(storedDataset.file_path), false);
  assert.equal((await ctx.fetch(`/api/scenarios/${first.key}`)).status, 404);
  assert.equal((await ctx.fetch(`/api/test-plans/${emptyPlan.id}`)).status, 404);
  const remainingPlan = await (await ctx.fetch(`/api/test-plans/${mixedPlan.id}`)).json();
  assert.deepEqual(remainingPlan.items, [{ scenarioId: customer.id, datasetId: null }]);
  const remainingDependent = await (await ctx.fetch(`/api/scenarios/${dependent.key}`)).json();
  assert.deepEqual(remainingDependent.dependsOn, []);
  assert.equal(remainingDependent.status, 'draft');
});

test('批量执行复用测试计划批次并自动选择最新有效数据', async (t) => {
  const ctx = await createTestContext(t, { desktopMode: true, mockRunStepDelayMs: 20 });
  const scenarios = await catalog(ctx);
  const customer = scenarios.find((item) => item.key === 'wms-customer-create');
  const vendor = scenarios.find((item) => item.key === 'wms-vendor-create');
  const form = new FormData();
  form.append('name', '客户批量执行数据');
  form.append('file', new Blob([
    '客户编号,客户名称,联系人,客户类别,客户地址\nBATCH-CUST-001,批量客户,测试员,自动化,上海'
  ], { type: 'text/csv' }), 'customers.csv');
  assert.equal((await ctx.fetch(`/api/scenarios/${customer.key}/datasets`, { method: 'POST', body: form })).status, 201);

  const startResponse = await ctx.fetch('/api/scenarios/batch/run', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioIds: [customer.id, vendor.id, customer.id],
      environment: 'test',
      executionMode: 'headed'
    })
  });
  assert.equal(startResponse.status, 202);
  const started = await startResponse.json();
  assert.equal(started.status, 'queued');
  assert.equal(started.totalItems, 2);
  assert.equal(started.environment, 'test');
  assert.equal(started.executionMode, 'headed');
  assert.match(started.planName, /批量执行/);
  assert.equal(started.items[0].datasetId !== null, true);
  assert.equal(started.items[1].datasetId, null);

  const completed = await waitForBatch(ctx, started.id);
  assert.equal(completed.status, 'failed');
  assert.equal(completed.passedItems, 1);
  assert.equal(completed.failedItems, 1);
  assert.equal(completed.reportUrl, `/api/test-plan-runs/${started.id}/report`);
  assert.equal((await ctx.fetch(completed.reportUrl)).status, 200);
  const secondStartResponse = await ctx.fetch('/api/scenarios/batch/run', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioIds: [customer.id], environment: 'test', executionMode: 'headless' })
  });
  assert.equal(secondStartResponse.status, 202);
  const secondStarted = await secondStartResponse.json();
  await waitForBatch(ctx, secondStarted.id);
  const recentRunsResponse = await ctx.fetch('/api/scenarios/batch/runs?limit=1');
  assert.equal(recentRunsResponse.status, 200);
  const recentRuns = await recentRunsResponse.json();
  assert.deepEqual(recentRuns.testPlanRuns.map((run) => run.id), [secondStarted.id]);
  const recentTwo = await (await ctx.fetch('/api/scenarios/batch/runs?limit=2')).json();
  assert.deepEqual(recentTwo.testPlanRuns.map((run) => run.id), [secondStarted.id, started.id]);
  assert.equal((await ctx.fetch('/api/scenarios/batch/runs?limit=0')).status, 400);
  const plans = await (await ctx.fetch('/api/test-plans')).json();
  assert.equal(plans.testPlans.some((plan) => plan.id === started.testPlanId), false);

  const invalidMapping = await ctx.fetch('/api/scenarios/batch/run', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioIds: [customer.id],
      datasetIds: { [vendor.id]: 'DATASET-UNKNOWN' }
    })
  });
  assert.equal(invalidMapping.status, 400);
  assert.match((await invalidMapping.json()).message, /未选择的测试用例/);
});

test('删除用例后保留执行名称快照和历史报告，并只清理独占脚本资产', async (t) => {
  const ctx = await createTestContext(t, { desktopMode: true, mockRunStepDelayMs: 5 });
  const scenario = await createScenario(ctx, {
    key: 'batch-history-case',
    name: '历史快照用例',
    dataSchema: { columns: ['值'], required: ['值'], example: { 值: '样本' } }
  });
  const script = await uploadScript(ctx, scenario.key, 'history.spec.js');
  const scriptPath = resolveScenarioScriptPath({
    workspaceRoot: ctx.app.locals.paths.workspaceRoot,
    dataDir: ctx.app.locals.paths.dataDir,
    scriptEntry: script.scriptEntry
  });
  assert.equal(existsSync(scriptPath), true);
  assert.equal((await ctx.fetch(`/api/scenarios/${scenario.key}/script`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ fileName: 'history.spec.js', content: '// changed script' })
  })).status, 200);
  const versionDirectory = path.resolve(ctx.app.locals.paths.scriptsDir, '_versions', scenario.key);
  assert.equal(existsSync(versionDirectory), true);
  const dataset = await uploadDataset(ctx, scenario.key);

  const ordinaryStart = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioId: scenario.id,
      datasetId: dataset.id,
      environment: 'test',
      executionMode: 'headless'
    })
  });
  assert.equal(ordinaryStart.status, 202);
  const ordinaryRun = await ordinaryStart.json();
  await ctx.waitForRun(ordinaryRun.runId);

  const plan = await (await ctx.fetch('/api/test-plans', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: '待删除用例计划',
      environment: 'test',
      executionMode: 'headless',
      items: [{ scenarioId: scenario.id, datasetId: dataset.id }]
    })
  })).json();
  const planStart = await ctx.fetch(`/api/test-plans/${plan.id}/run`, { method: 'POST' });
  assert.equal(planStart.status, 202);
  const planRun = await waitForBatch(ctx, (await planStart.json()).id);
  assert.equal(planRun.status, 'passed');

  const deletedResponse = await ctx.fetch('/api/scenarios/batch/delete', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioIds: [scenario.id] })
  });
  assert.equal(deletedResponse.status, 200);
  const deleted = await deletedResponse.json();
  assert.deepEqual(deleted.deletedTestPlanIds, [plan.id]);
  assert.deepEqual(deleted.cleanupWarnings, []);
  assert.equal(deleted.removedScriptAssets >= 2, true);
  assert.equal(existsSync(scriptPath), false);
  assert.equal(existsSync(versionDirectory), false);

  const historicalRun = await (await ctx.fetch(`/api/runs/${ordinaryRun.runId}`)).json();
  assert.equal(historicalRun.scenarioName, '历史快照用例');
  assert.equal(historicalRun.datasetName, '批量操作数据');
  const historicalProcess = await (await ctx.fetch(`/api/runs/${ordinaryRun.runId}/process`)).json();
  assert.equal(historicalProcess.scenarioName, '历史快照用例');
  assert.equal(historicalProcess.datasetName, '批量操作数据');
  assert.equal((await ctx.fetch(`/api/test-plans/${plan.id}`)).status, 404);
  const historicalPlanRun = await (await ctx.fetch(`/api/test-plan-runs/${planRun.id}`)).json();
  assert.equal(historicalPlanRun.items[0].scenarioName, '历史快照用例');
  assert.equal(historicalPlanRun.items[0].datasetName, '批量操作数据');
  assert.equal((await ctx.fetch(historicalPlanRun.reportUrl)).status, 200);

  const owner = await createScenario(ctx, { key: 'batch-shared-owner', name: '共享脚本所有者' });
  const sharedScript = await uploadScript(ctx, owner.key, 'shared.spec.js');
  const sharedPath = resolveScenarioScriptPath({
    workspaceRoot: ctx.app.locals.paths.workspaceRoot,
    dataDir: ctx.app.locals.paths.dataDir,
    scriptEntry: sharedScript.scriptEntry
  });
  const consumer = await createScenario(ctx, {
    key: 'batch-shared-consumer',
    name: '共享脚本使用者',
    scriptEntry: sharedScript.scriptEntry
  });
  assert.equal((await ctx.fetch('/api/scenarios/batch/delete', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioIds: [owner.id] })
  })).status, 200);
  assert.equal(existsSync(sharedPath), true);
  assert.equal((await ctx.fetch('/api/scenarios/batch/delete', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioIds: [consumer.id] })
  })).status, 200);
  assert.equal(existsSync(sharedPath), false);
});

test('用例和环境删除墓碑按项目隔离，显式重建同 key 后解除墓碑', async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), 'autotest-tombstones-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const projectA = path.resolve(root, 'project-a');
  const projectB = path.resolve(root, 'project-b');

  const openProject = (dataDir) => createApp({
    dataDir,
    databasePath: path.resolve(dataDir, 'platform.sqlite'),
    scriptsDir: path.resolve(dataDir, 'cases'),
    recordingScriptsDir: path.resolve(dataDir, 'recordings', 'scripts'),
    desktopMode: true,
    runMode: 'mock',
    silent: true
  });
  const closeProject = async (app) => {
    await app.locals.shutdown();
    app.locals.database.close();
  };

  let appA = await openProject(projectA);
  const originalScenario = appA.locals.database.getScenarioByKey('wms-customer-create');
  const originalEnvironment = appA.locals.database.getEnvironmentByKey('staging');
  appA.locals.database.deleteScenarios([originalScenario.id]);
  assert.equal(appA.locals.database.deleteEnvironment(originalEnvironment.id), true);
  appA.locals.database.createTestPlanRun({
    id: 'TPR-PROJECT-A',
    testPlanId: 'BLK-PROJECT-A',
    planSnapshot: { name: '项目 A 批量执行' },
    environment: 'test',
    executionMode: 'headless',
    status: 'passed',
    triggeredBy: 'USR-DESKTOP'
  }, []);
  assert.equal(appA.locals.database.hasAssetTombstone('scenario', originalScenario.key), true);
  assert.equal(appA.locals.database.hasAssetTombstone('environment', originalEnvironment.key), true);
  await closeProject(appA);

  appA = await openProject(projectA);
  assert.equal(appA.locals.database.getScenarioByKey(originalScenario.key), undefined);
  assert.equal(appA.locals.database.getEnvironmentByKey(originalEnvironment.key), undefined);
  assert.deepEqual(appA.locals.database.listScenarioSelectionRuns(1).map((run) => run.id), ['TPR-PROJECT-A']);

  const appB = await openProject(projectB);
  assert.ok(appB.locals.database.getScenarioByKey(originalScenario.key));
  assert.ok(appB.locals.database.getEnvironmentByKey(originalEnvironment.key));
  assert.equal(appB.locals.database.listAssetTombstones().length, 0);
  assert.deepEqual(appB.locals.database.listScenarioSelectionRuns(), []);
  await closeProject(appB);

  appA.locals.database.createScenario({
    id: originalScenario.id,
    key: originalScenario.key,
    name: '显式恢复客户用例',
    module: originalScenario.module,
    scriptEntry: originalScenario.script_entry
  });
  appA.locals.database.createEnvironment({
    id: originalEnvironment.id,
    key: originalEnvironment.key,
    name: '显式恢复预发环境',
    baseUrl: originalEnvironment.base_url,
    username: originalEnvironment.username,
    password: originalEnvironment.password,
    isDefault: false,
    sort: originalEnvironment.sort
  });
  assert.equal(appA.locals.database.hasAssetTombstone('scenario', originalScenario.key), false);
  assert.equal(appA.locals.database.hasAssetTombstone('environment', originalEnvironment.key), false);
  await closeProject(appA);

  appA = await openProject(projectA);
  assert.equal(appA.locals.database.getScenarioByKey(originalScenario.key).name, '显式恢复客户用例');
  assert.equal(appA.locals.database.getEnvironmentByKey(originalEnvironment.key).name, '显式恢复预发环境');
  await closeProject(appA);
});
