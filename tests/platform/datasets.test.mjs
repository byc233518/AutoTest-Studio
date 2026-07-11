import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('测试人员可以上传 CSV 样本数据并创建执行任务', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const form = new FormData();
  const csv = '\uFEFF客户编号,客户名称,联系人,客户类别,客户地址\nAT-CUST-001,自动化客户001,测试员,自动化,上海\n';
  form.append('file', new Blob([csv], { type: 'text/csv' }), 'customers.csv');
  form.append('name', '客户回归样本');

  const upload = await ctx.fetch('/api/scenarios/wms-customer-create/datasets', {
    method: 'POST',
    headers: { cookie },
    body: form
  });

  assert.equal(upload.status, 201);
  const dataset = await upload.json();
  assert.equal(dataset.name, '客户回归样本');
  assert.equal(dataset.rowCount, 1);
  assert.equal(dataset.validationStatus, 'valid');

  const run = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioId: dataset.scenarioId, datasetId: dataset.id, environment: 'test' })
  });

  assert.equal(run.status, 202);
  const runBody = await run.json();
  assert.match(runBody.runId, /^RUN-/);
  assert.equal(runBody.status, 'queued');
  assert.equal(runBody.executionMode, 'ui');

  await ctx.waitForRun(runBody.runId);
});

test('创建执行任务时可以选择有头模式和 UI 模式', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const dataset = await ctx.uploadCustomerDataset(cookie);

  const headed = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioId: dataset.scenarioId, datasetId: dataset.id, environment: 'test', executionMode: 'headed' })
  });
  assert.equal(headed.status, 202);
  const headedBody = await headed.json();
  assert.equal(headedBody.executionMode, 'headed');

  const ui = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioId: dataset.scenarioId, datasetId: dataset.id, environment: 'test', executionMode: 'ui' })
  });
  assert.equal(ui.status, 202);
  const uiBody = await ui.json();
  assert.equal(uiBody.executionMode, 'ui');

  await ctx.waitForRun(headedBody.runId);
  await ctx.waitForRun(uiBody.runId);
});

test('创建执行任务时拒绝未知执行模式', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const dataset = await ctx.uploadCustomerDataset(cookie);

  const response = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioId: dataset.scenarioId, datasetId: dataset.id, environment: 'test', executionMode: 'debugger' })
  });

  assert.equal(response.status, 400);
  assert.equal((await response.json()).message, '执行模式无效');
});

test('上传缺少必填列的样本数据会返回校验错误', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const form = new FormData();
  const csv = '客户编号,客户名称\nAT-CUST-001,自动化客户001\n';
  form.append('file', new Blob([csv], { type: 'text/csv' }), 'bad-customers.csv');
  form.append('name', '错误样本');

  const response = await ctx.fetch('/api/scenarios/wms-customer-create/datasets', {
    method: 'POST',
    headers: { cookie },
    body: form
  });

  assert.equal(response.status, 422);
  const body = await response.json();
  assert.equal(body.message, '样本数据校验失败');
  assert.deepEqual(body.errors, ['缺少必填列: 联系人', '缺少必填列: 客户类别', '缺少必填列: 客户地址']);
});
