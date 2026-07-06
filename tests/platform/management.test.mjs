import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('平台提供应用管理和模块管理列表', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const apps = await ctx.fetch('/api/apps', { headers: { cookie } });
  assert.equal(apps.status, 200);
  const appsBody = await apps.json();
  assert.equal(appsBody.apps.length, 3);
  assert.deepEqual(appsBody.apps.map((app) => app.key), ['jmom-base', 'jmom-wms', 'jmom-mes']);

  const modules = await ctx.fetch('/api/modules?appId=APP-WMS', { headers: { cookie } });
  assert.equal(modules.status, 200);
  const modulesBody = await modules.json();
  assert.equal(modulesBody.modules.some((module) => module.name === '客户管理'), true);
  assert.equal(modulesBody.modules.every((module) => module.appId === 'APP-WMS'), true);
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

test('管理员可以配置 LLM Key 且普通响应不会回显密钥原文', async (t) => {
  const ctx = await createTestContext(t);
  const adminCookie = await ctx.loginCookie('admin', 'Admin123!');
  const testerCookie = await ctx.loginCookie('tester', 'Tester123!');

  const forbidden = await ctx.fetch('/api/settings/llm', {
    method: 'PUT',
    headers: { cookie: testerCookie, 'content-type': 'application/json' },
    body: JSON.stringify({ provider: 'openai', model: 'gpt-4.1-mini', apiKey: 'sk-test-secret' })
  });
  assert.equal(forbidden.status, 403);

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
