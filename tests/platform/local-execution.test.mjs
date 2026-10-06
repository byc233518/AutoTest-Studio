import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('已取消绿色工具本机执行，创建任务时拒绝 executionLocation=local', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const dataset = await ctx.uploadCustomerDataset(cookie);

  const createdResponse = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioId: dataset.scenarioId,
      datasetId: dataset.id,
      environment: 'test',
      executionLocation: 'local',
      executionMode: 'headed'
    })
  });
  assert.equal(createdResponse.status, 400);
  assert.match((await createdResponse.json()).message, /桌面客户端/);

  const resolve = await ctx.fetch('/api/local-runs/resolve', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ code: 'ABCD-EFGH' })
  });
  assert.equal(resolve.status, 404);
});
