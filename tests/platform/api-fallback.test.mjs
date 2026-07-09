import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('unknown API paths return JSON 404 instead of the frontend shell', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/runs/not-exists/process/extra', { headers: { cookie } });
  assert.equal(response.status, 404);
  assert.match(response.headers.get('content-type'), /application\/json/);

  const body = await response.json();
  assert.equal(body.message, '接口不存在');
});
