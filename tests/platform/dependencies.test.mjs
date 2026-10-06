import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('dependency-check 对有依赖且无成功执行的场景返回 pending', async (t) => {
  const ctx = await createTestContext(t);
  const maintainerCookie = await ctx.loginCookie('maintainer', 'Maintainer123!');
  const testerCookie = await ctx.loginCookie('tester', 'Tester123!');

  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie: maintainerCookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      key: 'dep-check-demo',
      name: '依赖检查演示',
      dependsOn: ['sample-open-page', 'sample-form-submit'],
      dataSchema: { columns: ['字段'], required: ['字段'], example: { 字段: '1' } }
    })
  });
  assert.equal(created.status, 201);

  const response = await ctx.fetch('/api/scenarios/dep-check-demo/dependency-check', {
    headers: { cookie: testerCookie }
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.ready, false);
  assert.equal(body.checks.length, 2);
  assert.equal(body.checks.every((check) => check.status === 'pending'), true);
  assert.equal(body.checks[0].key, 'sample-open-page');
  assert.match(body.checks[0].message, /尚无成功执行记录|请先执行/);
});

test('无依赖场景 dependency-check 视为就绪', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/scenarios/sample-form-submit/dependency-check', {
    headers: { cookie }
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.ready, true);
  assert.deepEqual(body.checks, []);
});

test('enforceDependencies 为 true 时依赖未就绪会拒绝执行', async (t) => {
  const ctx = await createTestContext(t);
  const maintainerCookie = await ctx.loginCookie('maintainer', 'Maintainer123!');
  const testerCookie = await ctx.loginCookie('tester', 'Tester123!');

  await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie: maintainerCookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      key: 'dep-enforce-demo',
      name: '强制依赖演示',
      dependsOn: ['sample-open-page'],
      dataSchema: {
        columns: ['客户编号', '客户名称', '联系人', '客户类别', '客户地址'],
        required: ['客户编号', '客户名称', '联系人', '客户类别', '客户地址'],
        example: {
          客户编号: 'AT-CUST-001',
          客户名称: '自动化客户001',
          联系人: '测试员',
          客户类别: '自动化',
          客户地址: '上海'
        }
      }
    })
  });
  await ctx.fetch('/api/scenarios/dep-enforce-demo/publish', {
    method: 'POST',
    headers: { cookie: maintainerCookie }
  });

  const form = new FormData();
  const csv = [
    '客户编号,客户名称,联系人,客户类别,客户地址',
    'AT-CUST-DEP,依赖客户,测试员,自动化,上海'
  ].join('\n');
  form.append('file', new Blob([csv], { type: 'text/csv' }), 'dep.csv');
  form.append('name', '依赖样本');
  const upload = await ctx.fetch('/api/scenarios/dep-enforce-demo/datasets', {
    method: 'POST',
    headers: { cookie: testerCookie },
    body: form
  });
  assert.equal(upload.status, 201);
  const dataset = await upload.json();
  const scenario = await (await ctx.fetch('/api/scenarios/dep-enforce-demo', {
    headers: { cookie: testerCookie }
  })).json();

  const rejected = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie: testerCookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioId: scenario.id,
      datasetId: dataset.id,
      environment: 'test',
      enforceDependencies: true
    })
  });
  assert.equal(rejected.status, 400);
  assert.match((await rejected.json()).message, /依赖未就绪/);
});
