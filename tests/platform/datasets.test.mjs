import assert from 'node:assert/strict';
import ExcelJS from 'exceljs';
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

  const loaded = await ctx.fetch(`/api/scenarios/wms-customer-create/datasets/${dataset.id}`, {
    headers: { cookie }
  });
  assert.equal(loaded.status, 200);
  const loadedBody = await loaded.json();
  assert.equal(loadedBody.id, dataset.id);
  assert.deepEqual(loadedBody.rows, [{
    客户编号: 'AT-CUST-001',
    客户名称: '自动化客户001',
    联系人: '测试员',
    客户类别: '自动化',
    客户地址: '上海'
  }]);

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

test('Excel 或 CSV 导入先解析到统一表格且不会直接创建数据集', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const form = new FormData();
  const csv = '客户编号,客户名称,联系人,客户类别,客户地址\nAT-CUST-002,预览客户,李四,经销商,苏州\n';
  form.append('file', new Blob([csv], { type: 'text/csv' }), 'preview.csv');

  const preview = await ctx.fetch('/api/scenarios/wms-customer-create/datasets/preview', {
    method: 'POST',
    headers: { cookie },
    body: form
  });
  assert.equal(preview.status, 200);
  const body = await preview.json();
  assert.equal(body.fileName, 'preview.csv');
  assert.equal(body.rows.length, 1);
  assert.equal(body.rows[0].客户编号, 'AT-CUST-002');

  const datasets = await ctx.fetch('/api/scenarios/wms-customer-create/datasets', { headers: { cookie } });
  assert.equal(datasets.status, 200);
  assert.equal((await datasets.json()).length, 0);
});

test('可以下载包含当前场景字段和示例行的 Excel 模板', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/scenarios/wms-customer-create/template.xlsx', {
    headers: { cookie }
  });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') || '', /spreadsheetml/);
  assert.match(response.headers.get('content-disposition') || '', /wms-customer-create-template\.xlsx/);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(Buffer.from(await response.arrayBuffer()));
  const worksheet = workbook.getWorksheet('测试数据');
  assert.deepEqual(worksheet.getRow(1).values.slice(1), ['客户编号', '客户名称', '联系人', '客户类别', '客户地址']);
  assert.equal(worksheet.getCell('A2').value, 'AT-CUST-001');
  assert.equal(worksheet.getCell('A1').note, '必填字段');
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
