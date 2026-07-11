import test from 'node:test';
import assert from 'node:assert/strict';
import { createTestContext } from './helpers/test-context.mjs';

test('普通测试人员可以读取和保存 AI 设置', async (t) => {
  const context = await createTestContext(t);
  const cookie = await context.loginCookie('tester', 'Tester123!');
  const getResponse = await context.fetch('/api/settings/llm', { headers: { cookie } });
  assert.equal(getResponse.status, 200);
  const putResponse = await context.fetch('/api/settings/llm', {
    method: 'PUT', headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ provider: 'openai', model: 'gpt-test', baseUrl: '', apiKey: 'test-key', enabled: true })
  });
  assert.equal(putResponse.status, 200);
});
