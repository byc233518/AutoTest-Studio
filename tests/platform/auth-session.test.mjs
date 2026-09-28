import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createTestContext } from './helpers/test-context.mjs';

test('未登录访问 /api/me 返回可读的请先登录提示', async (t) => {
  const ctx = await createTestContext(t);
  const response = await ctx.fetch('/api/me');
  assert.equal(response.status, 401);
  const body = await response.json();
  assert.equal(body.message, '请先登录');
});

test('前端启动时会忽略请先登录错误，避免登录页误报', async () => {
  const source = await readFile('frontend/src/App.vue', 'utf8');
  assert.match(source, /error\.message !== '请先登录'/);
});
