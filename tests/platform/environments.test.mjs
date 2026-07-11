import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('环境列表包含两个种子环境且密码脱敏', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/environments', { headers: { cookie } });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.environments.length >= 2, true);
  assert.deepEqual(
    body.environments.map((env) => env.key).slice(0, 2),
    ['test', 'staging']
  );
  assert.equal(body.environments.every((env) => env.password === undefined), true);
  assert.equal(body.environments.every((env) => env.passwordMasked === '********'), true);
  assert.equal(body.environments.find((env) => env.key === 'test').isDefault, true);
});

test('管理员可以创建新环境，测试员不能', async (t) => {
  const ctx = await createTestContext(t);
  const adminCookie = await ctx.loginCookie('admin', 'Admin123!');
  const testerCookie = await ctx.loginCookie('tester', 'Tester123!');

  const forbidden = await ctx.fetch('/api/environments', {
    method: 'POST',
    headers: { cookie: testerCookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      key: 'dev',
      name: '开发环境',
      baseUrl: 'http://127.0.0.1:3000',
      username: 'byc',
      password: 'Abcd1234'
    })
  });
  assert.equal(forbidden.status, 403);

  const created = await ctx.fetch('/api/environments', {
    method: 'POST',
    headers: { cookie: adminCookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      key: 'dev',
      name: '开发环境',
      baseUrl: 'http://127.0.0.1:3000',
      username: 'byc',
      password: 'Abcd1234',
      sort: 3
    })
  });
  assert.equal(created.status, 201);
  const env = await created.json();
  assert.equal(env.key, 'dev');
  assert.equal(env.passwordMasked, '********');
  assert.equal(env.password, undefined);
});
