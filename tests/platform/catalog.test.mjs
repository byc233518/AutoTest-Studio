import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('平台种子数据包含 JMOM 项目和第一批发布场景', async (t) => {
  const ctx = await createTestContext(t);
  const response = await ctx.fetch('/api/scenarios', {
    headers: { cookie: await ctx.loginCookie('tester', 'Tester123!') }
  });

  assert.equal(response.status, 200);
  const body = await response.json();

  assert.equal(body.project.name, 'JMOM');
  assert.deepEqual(
    body.scenarios.map((scenario) => scenario.key),
    [
      'auth-login',
      'wms-customer-create',
      'wms-vendor-create',
      'wms-part-create',
      'wms-locator-create',
      'wms-po-create',
      'wms-so-create',
      'mes-workorder-create',
      'mes-workshop-line-create',
      'mes-barcode-pass',
      'mes-barcode-report',
      'base-excel-import'
    ]
  );
  assert.equal(body.scenarios.every((scenario) => scenario.status === 'published'), true);
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'wms-customer-create').dataSchema.required.includes('客户编号'), true);
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'mes-workorder-create').scriptEntry, 'tests/mes-production.spec.js');
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'mes-workshop-line-create').dataSchema.required.includes('线体名称'), true);
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'mes-barcode-pass').dataSchema.required.includes('条码'), true);
});

test('普通测试人员可以发布场景', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const script = await ctx.fetch('/api/scenarios/wms-customer-create/script', {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ content: 'export const testDataSchema={columns:[\'客户编号\'],required:[\'客户编号\']};', fileName: 'wms-customer-create.spec.js' })
  });
  assert.equal(script.status, 200);
  const response = await ctx.fetch('/api/scenarios/wms-customer-create/publish', {
    method: 'POST',
    headers: { cookie }
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.status, 'published');
  assert.equal(body.version, 'v1');
});
