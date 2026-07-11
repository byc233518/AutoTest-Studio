import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('所有角色都可创建草稿场景，发布仍需维护员', async (t) => {
  const ctx = await createTestContext(t);
  const maintainerCookie = await ctx.loginCookie('maintainer', 'Maintainer123!');
  const testerCookie = await ctx.loginCookie('tester', 'Tester123!');

  const testerCreated = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie: testerCookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key: 'draft-from-tester', name: '测试员草稿' })
  });
  assert.equal(testerCreated.status, 201);
  assert.equal((await testerCreated.json()).status, 'draft');

  const testerPublish = await ctx.fetch('/api/scenarios/draft-from-tester/publish', {
    method: 'POST',
    headers: { cookie: testerCookie }
  });
  assert.equal(testerPublish.status, 403);

  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie: maintainerCookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      key: 'draft-customer-extra',
      name: '客户扩展草稿',
      description: 'P2 CRUD 测试',
      module: 'WMS / ImsCustomer',
      appId: 'APP-WMS',
      moduleId: 'MOD-WMS-CUSTOMER',
      dependsOn: ['auth-login'],
      dataSchema: {
        columns: ['客户编号', '客户名称'],
        required: ['客户编号', '客户名称'],
        example: { 客户编号: 'AT-CUST-X', 客户名称: '扩展客户' }
      }
    })
  });
  assert.equal(created.status, 201);
  const draft = await created.json();
  assert.equal(draft.status, 'draft');
  assert.deepEqual(draft.dependsOn, ['auth-login']);

  const byKey = await ctx.fetch('/api/scenarios/draft-customer-extra', {
    headers: { cookie: maintainerCookie }
  });
  assert.equal(byKey.status, 200);
  const detail = await byKey.json();
  assert.equal(detail.key, 'draft-customer-extra');
  assert.deepEqual(detail.dependsOn, ['auth-login']);

  const published = await ctx.fetch('/api/scenarios/draft-customer-extra/publish', {
    method: 'POST',
    headers: { cookie: maintainerCookie }
  });
  assert.equal(published.status, 200);
  assert.equal((await published.json()).status, 'published');

  const unpublished = await ctx.fetch('/api/scenarios/draft-customer-extra/unpublish', {
    method: 'POST',
    headers: { cookie: maintainerCookie }
  });
  assert.equal(unpublished.status, 200);
  assert.equal((await unpublished.json()).status, 'draft');
});

test('已发布场景详情包含 dependsOn 字段', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const response = await ctx.fetch('/api/scenarios/wms-customer-create', { headers: { cookie } });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(Array.isArray(body.dependsOn), true);
});
