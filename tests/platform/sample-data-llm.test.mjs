import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

async function configureLlm(ctx, cookie) {
  const response = await ctx.fetch('/api/settings/llm', {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      provider: 'openai-compatible',
      model: 'model-a',
      baseUrl: 'http://127.0.0.1:18080/v1',
      apiKey: 'secret-key',
      enabled: true
    })
  });
  assert.equal(response.status, 200);
}

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

test('AI 设置更新可保留密钥且连通性检测会真实调用服务', async (t) => {
  const calls = [];
  const ctx = await createTestContext(t, {
    llmFetch: async (url, options) => {
      calls.push({ url, options });
      return new Response(JSON.stringify({
        id: 'chatcmpl-test',
        choices: [{ message: { content: 'OK' } }]
      }), { status: 200, headers: { 'content-type': 'application/json' } });
    }
  });
  const cookie = await ctx.loginCookie('admin', 'Admin123!');
  const headers = { cookie, 'content-type': 'application/json' };
  const first = await ctx.fetch('/api/settings/llm', {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      provider: 'openai-compatible',
      model: 'model-a',
      baseUrl: 'http://127.0.0.1:18080/v1',
      apiKey: 'secret-key',
      enabled: true
    })
  });
  assert.equal(first.status, 200);
  const updated = await ctx.fetch('/api/settings/llm', {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      provider: 'openai-compatible',
      model: 'model-b',
      baseUrl: 'http://127.0.0.1:18080/v1',
      apiKey: '',
      enabled: true
    })
  });
  assert.equal(updated.status, 200);
  const stored = JSON.parse(ctx.app.locals.database.getSetting('llm').value);
  assert.equal(stored.apiKey, 'secret-key');
  assert.equal(stored.model, 'model-b');

  const checked = await ctx.fetch('/api/settings/llm/test', { method: 'POST', headers: { cookie } });
  assert.equal(checked.status, 200);
  assert.equal((await checked.json()).message, 'AI 服务连接成功');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'http://127.0.0.1:18080/v1/chat/completions');
  assert.equal(calls[0].options.headers.authorization, 'Bearer secret-key');
});

test('测试连接可使用未保存的表单内容', async (t) => {
  const calls = [];
  const ctx = await createTestContext(t, {
    llmFetch: async (url, options) => {
      calls.push({ url, method: options?.method, body: options?.body, authorization: options?.headers?.authorization });
      return new Response(JSON.stringify({
        id: 'chatcmpl-draft',
        choices: [{ message: { content: 'OK' } }]
      }), { status: 200, headers: { 'content-type': 'application/json' } });
    }
  });
  const cookie = await ctx.loginCookie('admin', 'Admin123!');
  const response = await ctx.fetch('/api/settings/llm/test', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      provider: 'siliconflow',
      model: 'draft-model',
      baseUrl: 'http://127.0.0.1:18081/v1',
      apiKey: 'draft-key'
    })
  });
  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'http://127.0.0.1:18081/v1/chat/completions');
  assert.equal(calls[0].authorization, 'Bearer draft-key');
  assert.match(String(calls[0].body), /draft-model/);
  assert.equal(ctx.app.locals.database.getSetting('llm'), undefined);
});

test('可从供应商拉取模型列表，并支持请求体覆盖 Base URL / API Key', async (t) => {
  const calls = [];
  const ctx = await createTestContext(t, {
    llmFetch: async (url, options) => {
      calls.push({ url, options });
      return new Response(JSON.stringify({
        data: [
          { id: 'model-b' },
          { id: 'model-a' },
          { id: 'model-a' }
        ]
      }), { status: 200, headers: { 'content-type': 'application/json' } });
    }
  });
  const cookie = await ctx.loginCookie('admin', 'Admin123!');
  await configureLlm(ctx, cookie);

  const response = await ctx.fetch('/api/settings/llm/models', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      baseUrl: 'http://127.0.0.1:18080/v1',
      apiKey: ''
    })
  });
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).models, ['model-a', 'model-b']);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'http://127.0.0.1:18080/v1/models');
  assert.equal(calls[0].options.method, 'GET');
  assert.equal(calls[0].options.headers.authorization, 'Bearer secret-key');
});

test('缺少 Base URL 或 API Key 时拉取模型列表返回 400', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('admin', 'Admin123!');
  const response = await ctx.fetch('/api/settings/llm/models', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({})
  });
  assert.equal(response.status, 400);
});

test('测试数据生成使用注入的 fetch 并传递 AbortSignal', async (t) => {
  const calls = [];
  const ctx = await createTestContext(t, {
    llmFetch: async (url, options) => {
      calls.push({ url, options });
      return new Response(JSON.stringify({
        choices: [{
          message: {
            content: JSON.stringify([{
              客户编号: 'AI-CUST-001',
              客户名称: 'AI 客户001',
              联系人: 'AI 测试员',
              客户类别: '自动化',
              客户地址: '上海'
            }])
          }
        }]
      }), { status: 200, headers: { 'content-type': 'application/json' } });
    }
  });
  const cookie = await ctx.loginCookie('admin', 'Admin123!');
  await configureLlm(ctx, cookie);

  const response = await ctx.fetch('/api/scenarios/wms-customer-create/sample-data', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ count: 1, useLlm: true })
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.source, 'llm');
  assert.equal(body.fallbackReason, null);
  assert.equal(body.rows[0].客户编号, 'AI-CUST-001');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'http://127.0.0.1:18080/v1/chat/completions');
  assert.equal(calls[0].options.headers.authorization, 'Bearer secret-key');
  assert.ok(calls[0].options.signal instanceof AbortSignal);
  assert.equal(calls[0].options.signal.aborted, false);
});

test('测试数据生成网络失败时降级为规则数据并保留原因', async (t) => {
  const ctx = await createTestContext(t, {
    llmFetch: async () => {
      throw new Error('网络不可达');
    }
  });
  const cookie = await ctx.loginCookie('admin', 'Admin123!');
  await configureLlm(ctx, cookie);

  const response = await ctx.fetch('/api/scenarios/wms-customer-create/sample-data', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ count: 1, useLlm: true })
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.source, 'rules');
  assert.match(body.fallbackReason, /网络不可达/);
  assert.equal(body.rows.length, 1);
});

test('测试数据生成超时会中止请求并降级为规则数据', async (t) => {
  let abortObserved = false;
  const ctx = await createTestContext(t, {
    llmRequestTimeoutMs: 20,
    llmFetch: async (_url, { signal }) => new Promise((resolve, reject) => {
      const abort = () => {
        abortObserved = true;
        const error = new Error('aborted');
        error.name = 'AbortError';
        reject(error);
      };
      if (signal.aborted) {
        abort();
      } else {
        signal.addEventListener('abort', abort, { once: true });
      }
    })
  });
  const cookie = await ctx.loginCookie('admin', 'Admin123!');
  await configureLlm(ctx, cookie);

  const startedAt = Date.now();
  const response = await ctx.fetch('/api/scenarios/wms-customer-create/sample-data', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ count: 1, useLlm: true })
  });
  const elapsedMs = Date.now() - startedAt;
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.source, 'rules');
  assert.match(body.fallbackReason, /超时/);
  assert.equal(body.rows.length, 1);
  assert.equal(abortObserved, true);
  assert.ok(elapsedMs < 1000);
});
