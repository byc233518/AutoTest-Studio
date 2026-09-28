import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';
import { generateTestPlanNarrative } from '../../server/platform/test-plans.mjs';

async function uploadDataset(ctx, scenarioKey) {
  const form = new FormData();
  form.append('name', '计划执行数据');
  form.append('file', new Blob([
    '客户编号,客户名称,联系人,客户类别,客户地址\nPLAN-CUST-001,计划客户,测试员,自动化,上海'
  ], { type: 'text/csv' }), 'plan-customers.csv');
  const response = await ctx.fetch(`/api/scenarios/${scenarioKey}/datasets`, {
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
  throw new Error(`测试计划执行未完成: ${batchId}`);
}

test('桌面模式支持测试计划 CRUD、顺序执行、失败继续和 Markdown 报告', async (t) => {
  const ctx = await createTestContext(t, { desktopMode: true, mockRunStepDelayMs: 50 });
  const catalog = await (await ctx.fetch('/api/scenarios')).json();
  const customer = catalog.scenarios.find((item) => item.key === 'wms-customer-create');
  const vendor = catalog.scenarios.find((item) => item.key === 'wms-vendor-create');
  const dataset = await uploadDataset(ctx, customer.key);

  const settingsResponse = await ctx.fetch('/api/settings/general', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      testingUnit: '质量保障部',
      testerName: '张三',
      reportSignature: 'AutoTest Studio 测试组'
    })
  });
  assert.equal(settingsResponse.status, 200);
  assert.deepEqual(
    Object.fromEntries(Object.entries(await settingsResponse.json()).filter(([key]) => key !== 'updatedAt')),
    { testingUnit: '质量保障部', testerName: '张三', reportSignature: 'AutoTest Studio 测试组', browserChannel: 'auto' }
  );

  const createdResponse = await ctx.fetch('/api/test-plans', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: 'WMS 计划回归',
      description: '验证计划批次串行执行',
      environment: 'test',
      executionMode: 'headless',
      items: [
        { scenarioId: customer.id },
        { scenarioId: vendor.id },
        { scenarioId: customer.id, datasetId: dataset.id }
      ]
    })
  });
  assert.equal(createdResponse.status, 201);
  const created = await createdResponse.json();
  assert.equal(created.items.length, 3);

  const list = await (await ctx.fetch('/api/test-plans')).json();
  assert.equal(list.testPlans.some((item) => item.id === created.id), true);

  const updatedResponse = await ctx.fetch(`/api/test-plans/${created.id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ description: '更新后的计划说明' })
  });
  assert.equal(updatedResponse.status, 200);
  assert.equal((await updatedResponse.json()).description, '更新后的计划说明');

  const startedResponse = await ctx.fetch(`/api/test-plans/${created.id}/run`, { method: 'POST' });
  assert.equal(startedResponse.status, 202);
  const started = await startedResponse.json();
  assert.equal(started.status, 'queued');
  assert.equal(started.items[0].datasetId, dataset.id);
  assert.equal(started.items[1].datasetId, null);
  const duplicateStart = await ctx.fetch(`/api/test-plans/${created.id}/run`, { method: 'POST' });
  assert.equal(duplicateStart.status, 409);

  const completed = await waitForBatch(ctx, started.id);
  assert.equal(completed.status, 'failed');
  assert.equal(completed.totalItems, 3);
  assert.equal(completed.passedItems, 2);
  assert.equal(completed.failedItems, 1);
  assert.deepEqual(completed.items.map((item) => item.status), ['passed', 'failed', 'passed']);
  assert.equal(completed.items[0].runId !== null, true);
  assert.equal(completed.items[1].runId, null);
  assert.equal(completed.items[2].runId !== null, true);
  assert.equal(completed.summary.source, 'rules');
  assert.match(completed.summary.narrative, /失败 1 个/);
  assert.equal(completed.reportUrl, `/api/test-plan-runs/${started.id}/report`);

  const itemResponse = await ctx.fetch(`/api/test-plan-runs/${started.id}/items/${completed.items[2].id}`);
  assert.equal(itemResponse.status, 200);
  assert.equal((await itemResponse.json()).status, 'passed');

  const reportResponse = await ctx.fetch(completed.reportUrl);
  assert.equal(reportResponse.status, 200);
  const report = await reportResponse.text();
  assert.match(report, /# WMS 计划回归执行报告/);
  assert.match(report, /测试单位：质量保障部/);
  assert.match(report, /测试人员：张三/);
  assert.match(report, /执行环境：测试环境（test）/);
  assert.match(report, /通过：2/);
  assert.match(report, /失败：1/);
  assert.match(report, /AutoTest Studio 测试组/);

  const history = await (await ctx.fetch(`/api/test-plans/${created.id}/runs`)).json();
  assert.equal(history.testPlanRuns[0].id, started.id);

  const removed = await ctx.fetch(`/api/test-plans/${created.id}`, { method: 'DELETE' });
  assert.equal(removed.status, 204);
  assert.equal((await ctx.fetch(`/api/test-plans/${created.id}`)).status, 404);
  assert.equal((await ctx.fetch(`/api/test-plan-runs/${started.id}`)).status, 200);
});

test('测试计划拒绝错配数据集且通用设置拒绝非字符串字段', async (t) => {
  const ctx = await createTestContext(t, { desktopMode: true });
  const catalog = await (await ctx.fetch('/api/scenarios')).json();
  const customer = catalog.scenarios.find((item) => item.key === 'wms-customer-create');
  const vendor = catalog.scenarios.find((item) => item.key === 'wms-vendor-create');
  const dataset = await uploadDataset(ctx, customer.key);

  const invalidPlan = await ctx.fetch('/api/test-plans', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: '错误计划',
      environment: 'test',
      executionMode: 'headless',
      items: [{ scenarioId: vendor.id, datasetId: dataset.id }]
    })
  });
  assert.equal(invalidPlan.status, 400);

  const invalidSettings = await ctx.fetch('/api/settings/general', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ testerName: 42 })
  });
  assert.equal(invalidSettings.status, 400);
});

test('测试计划总结在 LLM 可用时使用现有 AI 设置', async () => {
  const database = {
    getSetting(key) {
      assert.equal(key, 'llm');
      return {
        value: JSON.stringify({
          enabled: true,
          apiKey: 'test-key',
          baseUrl: 'http://llm.local/v1',
          model: 'test-model'
        })
      };
    }
  };
  let requestedUrl = '';
  const result = await generateTestPlanNarrative(database, {
    planName: '核心回归', total: 2, passed: 2, failed: 0, failures: []
  }, {
    fetchImpl: async (url) => {
      requestedUrl = url;
      return new Response(JSON.stringify({
        choices: [{ message: { content: '核心回归全部通过，关键业务链路运行稳定。' } }]
      }), { status: 200, headers: { 'content-type': 'application/json' } });
    }
  });

  assert.equal(requestedUrl, 'http://llm.local/v1/chat/completions');
  assert.equal(result.source, 'ai');
  assert.match(result.narrative, /全部通过/);
  assert.equal(result.fallbackReason, null);
});

test('启动批次可临时覆盖环境和执行模式且不修改计划默认值', async (t) => {
  const ctx = await createTestContext(t, { desktopMode: true });
  const catalog = await (await ctx.fetch('/api/scenarios')).json();
  const customer = catalog.scenarios.find((item) => item.key === 'wms-customer-create');
  const dataset = await uploadDataset(ctx, customer.key);
  const environmentResponse = await ctx.fetch('/api/environments', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      key: 'uat-override',
      name: 'UAT 临时环境',
      baseUrl: 'http://127.0.0.1:46070',
      username: 'staging-user',
      password: 'staging-password'
    })
  });
  assert.equal(environmentResponse.status, 201);

  const planResponse = await ctx.fetch('/api/test-plans', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: '临时覆盖验证',
      environment: 'test',
      executionMode: 'headless',
      items: [{ scenarioId: customer.id, datasetId: dataset.id }]
    })
  });
  const plan = await planResponse.json();
  const startedResponse = await ctx.fetch(`/api/test-plans/${plan.id}/run`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ environment: 'uat-override', executionMode: 'headed' })
  });
  assert.equal(startedResponse.status, 202);
  const started = await startedResponse.json();
  assert.equal(started.environment, 'uat-override');
  assert.equal(started.executionMode, 'headed');

  const completed = await waitForBatch(ctx, started.id);
  assert.equal(completed.status, 'passed');
  const ordinaryRun = ctx.app.locals.database.getRunById(completed.items[0].runId);
  assert.equal(ordinaryRun.environment, 'uat-override');
  assert.equal(ordinaryRun.execution_mode, 'headed');

  const unchanged = await (await ctx.fetch(`/api/test-plans/${plan.id}`)).json();
  assert.equal(unchanged.environment, 'test');
  assert.equal(unchanged.executionMode, 'headless');

  assert.equal((await ctx.fetch(`/api/test-plans/${plan.id}/run`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ environment: 'missing' })
  })).status, 400);
  assert.equal((await ctx.fetch(`/api/test-plans/${plan.id}/run`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ executionMode: 'invalid' })
  })).status, 400);
});

test('报告写入失败时保留批次统计和规则总结', async (t) => {
  const ctx = await createTestContext(t, {
    desktopMode: true,
    testPlanReportWriter: async () => {
      throw new Error('磁盘只读');
    }
  });
  const catalog = await (await ctx.fetch('/api/scenarios')).json();
  const customer = catalog.scenarios.find((item) => item.key === 'wms-customer-create');
  const dataset = await uploadDataset(ctx, customer.key);
  const plan = await (await ctx.fetch('/api/test-plans', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: '报告失败验证',
      environment: 'test',
      executionMode: 'headless',
      items: [{ scenarioId: customer.id, datasetId: dataset.id }]
    })
  })).json();
  const started = await (await ctx.fetch(`/api/test-plans/${plan.id}/run`, { method: 'POST' })).json();
  const completed = await waitForBatch(ctx, started.id);

  assert.equal(completed.status, 'failed');
  assert.equal(completed.passedItems, 1);
  assert.equal(completed.failedItems, 0);
  assert.equal(completed.summary.total, 1);
  assert.equal(completed.summary.passed, 1);
  assert.equal(completed.summary.reportError, '磁盘只读');
  assert.equal(completed.reportUrl, null);
});
