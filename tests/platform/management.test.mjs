import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('平台提供应用管理和模块管理列表', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const apps = await ctx.fetch('/api/apps', { headers: { cookie } });
  assert.equal(apps.status, 200);
  const appsBody = await apps.json();
  assert.equal(appsBody.apps.length, 6);
  assert.deepEqual(appsBody.apps.map((app) => app.key), [
    'autotest-base',
    'autotest-wms',
    'autotest-mes',
    'autotest-qms',
    'autotest-tpm',
    'autotest-legacy-mes'
  ]);
  assert.equal(appsBody.apps.find((app) => app.id === 'APP-MES').name, '制造执行');
  assert.equal(appsBody.apps.find((app) => app.id === 'APP-WMS').name, '仓储管理');

  const modules = await ctx.fetch('/api/modules?appId=APP-WMS', { headers: { cookie } });
  assert.equal(modules.status, 200);
  const modulesBody = await modules.json();
  assert.equal(modulesBody.modules.some((module) => module.name === '客户管理'), true);
  assert.equal(modulesBody.modules.every((module) => module.appId === 'APP-WMS'), true);
  assert.equal(modulesBody.modules.every((module) => /[\u3400-\u9fff]/u.test(module.name)), true);

  const mesModules = await ctx.fetch('/api/modules?appId=APP-MES', { headers: { cookie } });
  const mesModulesBody = await mesModules.json();
  assert.equal(mesModulesBody.modules.every((module) => /[\u3400-\u9fff]/u.test(module.name)), true);
});

test('平台可以按场景字段快速生成样例数据', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/scenarios/wms-customer-create/sample-data', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ count: 3 })
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.rows.length, 3);
  assert.equal(body.rows[0].客户编号.startsWith('AT-CUST-'), true);
  assert.equal(body.rows.every((row) => row.客户名称 && row.联系人 && row.客户地址), true);
});

test('代码仓库生成场景可以返回非空且符合字段含义的样例数据', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const response = await ctx.fetch('/api/scenarios/mes-page-i-mes6-production-plan-daily-equipment-plan-index-920662/sample-data', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ count: 2 })
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.columns.includes('PlanDate'), true);
  assert.equal(body.columns.includes('DatePlanQty'), true);
  assert.equal(body.rows.length, 2);
  assert.match(body.rows[0].PlanDate, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(body.rows[0].DatePlanQty, '1');
  assert.equal(body.rows.every((row) => body.columns.every((column) => String(row[column]).trim())), true);
});

test('MES 场景可以生成匹配脚本字段的样例数据', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const workorder = await ctx.fetch('/api/scenarios/mes-workorder-create/sample-data', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ count: 2 })
  });
  assert.equal(workorder.status, 200);
  const workorderBody = await workorder.json();
  assert.equal(workorderBody.rows.length, 2);
  assert.equal(workorderBody.rows[0].物料编码.startsWith('AT-PART-'), true);
  assert.equal(workorderBody.rows[0].目标量, '10');
  assert.match(workorderBody.rows[0].开始日期, /^\d{4}-\d{2}-\d{2}$/);

  const workshopLine = await ctx.fetch('/api/scenarios/mes-workshop-line-create/sample-data', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ count: 1 })
  });
  assert.equal(workshopLine.status, 200);
  const workshopLineBody = await workshopLine.json();
  assert.equal(workshopLineBody.rows[0].车间编码.startsWith('AT-WS-'), true);
  assert.equal(workshopLineBody.rows[0].线体编码.startsWith('AT-LINE-'), true);
  assert.equal(workshopLineBody.rows[0].所属工序, '总装');

  const barcodePass = await ctx.fetch('/api/scenarios/mes-barcode-pass/sample-data', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ count: 1 })
  });
  assert.equal(barcodePass.status, 200);
  const barcodePassBody = await barcodePass.json();
  assert.equal(barcodePassBody.rows[0].工单号.startsWith('AT-WO-'), true);
  assert.equal(barcodePassBody.rows[0].条码.startsWith('AT-SN-'), true);
  assert.equal(barcodePassBody.rows[0].是否扫码提交, '是');

  const barcodeReport = await ctx.fetch('/api/scenarios/mes-barcode-report/sample-data', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ count: 1 })
  });
  assert.equal(barcodeReport.status, 200);
  const barcodeReportBody = await barcodeReport.json();
  assert.equal(barcodeReportBody.rows[0].条码数量, '10');
  assert.equal(barcodeReportBody.rows[0].作业看板编码, 'S20250032');
  assert.equal(barcodeReportBody.rows[0].工序名称, '总装');
});

test('管理员可以配置 LLM Key 且普通响应不会回显密钥原文', async (t) => {
  const ctx = await createTestContext(t);
  const adminCookie = await ctx.loginCookie('admin', 'Admin123!');
  const testerCookie = await ctx.loginCookie('tester', 'Tester123!');

  const forbidden = await ctx.fetch('/api/settings/llm', {
    method: 'PUT',
    headers: { cookie: testerCookie, 'content-type': 'application/json' },
    body: JSON.stringify({ provider: 'openai', model: 'gpt-4.1-mini', apiKey: 'sk-test-secret' })
  });
  assert.equal(forbidden.status, 200);

  const saved = await ctx.fetch('/api/settings/llm', {
    method: 'PUT',
    headers: { cookie: adminCookie, 'content-type': 'application/json' },
    body: JSON.stringify({ provider: 'openai', model: 'gpt-4.1-mini', apiKey: 'sk-test-secret' })
  });
  assert.equal(saved.status, 200);
  assert.equal((await saved.json()).apiKeyMasked, 'sk-t********cret');

  const get = await ctx.fetch('/api/settings/llm', { headers: { cookie: adminCookie } });
  const body = await get.json();
  assert.equal(body.apiKey, undefined);
  assert.equal(body.apiKeyMasked, 'sk-t********cret');
});

test('执行详情包含过程查看资产入口', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const dataset = await ctx.uploadCustomerDataset(cookie);
  const run = await ctx.createRun(cookie, dataset.scenarioId, dataset.id);
  const finished = await ctx.waitForRun(run.runId);

  const detail = await ctx.fetch(`/api/runs/${finished.runId}`, { headers: { cookie } });
  const body = await detail.json();
  assert.equal(body.processArtifacts.length >= 3, true);
  assert.equal(body.processArtifacts.some((artifact) => artifact.type === 'html-report'), true);
  assert.equal(body.processArtifacts.some((artifact) => artifact.type === 'screenshot'), true);
  assert.equal(body.processArtifacts.some((artifact) => artifact.type === 'video'), true);
});

test('UI 模式执行中提供实时过程预览', async (t) => {
  const ctx = await createTestContext(t, { mockRunStepDelayMs: 120 });
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const dataset = await ctx.uploadCustomerDataset(cookie);

  const response = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioId: dataset.scenarioId,
      datasetId: dataset.id,
      environment: 'test',
      executionMode: 'ui'
    })
  });

  assert.equal(response.status, 202);
  const run = await response.json();
  const process = await ctx.waitForRunProcess(run.runId, (body) => body.status === 'running' && body.livePreviewUrl);

  assert.equal(process.executionMode, 'ui');
  assert.equal(process.canWatchLive, true);
  assert.match(process.livePreviewUrl, new RegExp(`/api/runs/${run.runId}/live$`));
  assert.equal(process.steps.some((step) => ['running', 'passed'].includes(step.status)), true);

  const live = await ctx.fetch(process.livePreviewUrl, { headers: { cookie } });
  assert.equal(live.status, 200);
  const html = await live.text();
  assert.match(html, /实时执行过程/);
  assert.match(html, /客户主数据录入/);

  await ctx.waitForRun(run.runId);
});

test('执行完成后可以通过过程接口回看截图和录像', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const dataset = await ctx.uploadCustomerDataset(cookie);
  const run = await ctx.createRun(cookie, dataset.scenarioId, dataset.id);
  const finished = await ctx.waitForRun(run.runId);

  const response = await ctx.fetch(`/api/runs/${finished.runId}/process`, { headers: { cookie } });
  assert.equal(response.status, 200);
  const process = await response.json();

  assert.equal(process.status, 'passed');
  assert.ok(process.latestScreenshotUrl);
  assert.ok(process.videoReplayUrl);
  assert.equal(process.artifacts.some((artifact) => artifact.type === 'screenshot' && artifact.previewUrl), true);
  assert.equal(process.artifacts.some((artifact) => artifact.type === 'video' && artifact.previewUrl), true);

  const screenshot = await ctx.fetch(process.latestScreenshotUrl, { headers: { cookie } });
  assert.equal(screenshot.status, 200);
  assert.match(screenshot.headers.get('content-type'), /image|svg/);

  const replay = await ctx.fetch(process.videoReplayUrl, { headers: { cookie } });
  assert.equal(replay.status, 200);
  assert.match(await replay.text(), /录像回放/);
});
