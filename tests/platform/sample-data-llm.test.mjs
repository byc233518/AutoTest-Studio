import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('useLlm 未配置时回退规则生成并返回 fallbackReason', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/scenarios/wms-customer-create/sample-data', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ count: 2, useLlm: true, rules: '客户编号以 QA- 开头且名称不重复' })
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.source, 'rules');
  assert.equal(typeof body.fallbackReason, 'string');
  assert.match(body.fallbackReason, /LLM/);
  assert.equal(body.rows.length, 2);
  assert.equal(body.csv.includes('客户编号'), true);
});

test('生成条数限制在 1 到 20 行', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/scenarios/wms-customer-create/sample-data', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ count: 200 })
  });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).rows.length, 20);
});

test('未启用 useLlm 时直接使用规则生成', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/scenarios/wms-customer-create/sample-data', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ count: 1 })
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.source, 'rules');
  assert.equal(body.fallbackReason, null);
});

test('追加自动生成时按当前行数继续编号', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/scenarios/wms-customer-create/sample-data', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ count: 2, offset: 3 })
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.rows[0].客户编号, 'AT-CUST-004');
  assert.equal(body.rows[1].客户编号, 'AT-CUST-005');
});

test('LLM 连通性检测在缺少 apiKey 时返回 400', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('admin', 'Admin123!');

  const response = await ctx.fetch('/api/settings/llm/test', {
    method: 'POST',
    headers: { cookie }
  });
  assert.equal(response.status, 400);
});
