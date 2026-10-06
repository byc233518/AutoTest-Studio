import test from 'node:test';
import assert from 'node:assert/strict';
import { createTestContext } from './helpers/test-context.mjs';

test('场景列表返回就绪度、质量指标和建议动作', async (t) => {
  const context = await createTestContext(t);
  const cookie = await context.loginCookie('tester', 'Tester123!');
  const response = await context.fetch('/api/scenarios', { headers: { cookie } });
  assert.equal(response.status, 200);
  const body = await response.json();
  const customer = body.scenarios.find((item) => item.key === 'sample-form-submit');
  assert.ok(customer.readiness);
  assert.equal(typeof customer.readiness.ready, 'boolean');
  assert.ok(Array.isArray(customer.readiness.checks));
  assert.ok(customer.quality);
  assert.equal(typeof customer.quality.passRate, 'number');
  assert.ok(Array.isArray(body.recommendations));
});

test('执行预检返回脚本、数据、环境和依赖检查', async (t) => {
  const context = await createTestContext(t);
  const cookie = await context.loginCookie('tester', 'Tester123!');
  const response = await context.fetch('/api/scenarios/sample-form-submit/preflight?environment=test', { headers: { cookie } });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.deepEqual(body.checks.map((item) => item.type), ['status', 'script', 'dataset', 'environment', 'dependencies']);
  assert.deepEqual(body.checks.map((item) => item.label), ['场景已发布', '已绑定自动化脚本', '已有有效样本数据', '执行环境可用', '前置依赖已完成']);
  assert.deepEqual(body.checks.map((item) => item.action), ['发布场景', '上传脚本', '上传数据', '配置环境', '执行依赖链']);
  assert.equal(body.ready, false);
  assert.equal(body.blockers.includes('dataset'), true);
});

test('平台提供测试套件、调度计划、通知和审计接口', async (t) => {
  const context = await createTestContext(t);
  const admin = await context.loginCookie('admin', 'Admin123!');
  for (const endpoint of ['/api/suites', '/api/schedules', '/api/notifications', '/api/audit-logs']) {
    const response = await context.fetch(endpoint, { headers: { cookie: admin } });
    assert.equal(response.status, 200, endpoint);
    assert.ok(Array.isArray(await response.json()), endpoint);
  }
});

test('运行详情提供业务摘要并支持失败行 CSV 下载', async (t) => {
  const context = await createTestContext(t);
  const cookie = await context.loginCookie('tester', 'Tester123!');
  const dataset = await context.uploadCustomerDataset(cookie);
  const catalog = await (await context.fetch('/api/scenarios', { headers: { cookie } })).json();
  const scenario = catalog.scenarios.find((item) => item.key === 'sample-form-submit');
  const run = await context.createRun(cookie, scenario.id, dataset.id);
  const finished = await context.waitForRun(run.runId);
  assert.ok(finished.businessSummary);
  assert.equal(typeof finished.businessSummary.totalRows, 'number');
  assert.equal(finished.businessSummary.totalRows, finished.businessSummary.passedRows + finished.businessSummary.failedRows + finished.businessSummary.skippedRows);
  const csv = await context.fetch(`/api/runs/${run.runId}/failed-rows.csv`, { headers: { cookie } });
  assert.equal(csv.status, 200);
  assert.match(csv.headers.get('content-type'), /text\/csv/);
});
