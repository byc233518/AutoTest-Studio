import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';
import { SAMPLE_SCENARIO_KEYS } from '../../server/platform/seed.mjs';

test('平台种子只包含通用操作示例用例', async (t) => {
  const ctx = await createTestContext(t);
  const response = await ctx.fetch('/api/scenarios', {
    headers: { cookie: await ctx.loginCookie('tester', 'Tester123!') }
  });

  assert.equal(response.status, 200);
  const body = await response.json();

  assert.equal(body.project.name, 'AutoTest Studio');
  assert.deepEqual(body.scenarios.map((scenario) => scenario.key), SAMPLE_SCENARIO_KEYS);
  assert.equal(body.scenarios.every((scenario) => scenario.status === 'published'), true);
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'sample-form-submit').dataSchema.required.includes('记录编码'), true);
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'sample-form-submit').module, '示例 / 表单');
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'sample-data-driven').dependsOn.includes('sample-form-submit'), true);
  assert.equal(body.scenarios.some((scenario) => scenario.key.startsWith('wms-') || scenario.key.startsWith('mes-')), false);
});

test('普通测试人员可以发布场景', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const script = await ctx.fetch('/api/scenarios/sample-form-submit/script', {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ content: 'export const testDataSchema={columns:[\'记录编码\'],required:[\'记录编码\']};', fileName: 'sample-form-submit.spec.js' })
  });
  assert.equal(script.status, 200);
  const response = await ctx.fetch('/api/scenarios/sample-form-submit/publish', {
    method: 'POST',
    headers: { cookie }
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.status, 'published');
  assert.equal(body.version, 'v1');
});
