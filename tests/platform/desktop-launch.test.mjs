import assert from 'node:assert/strict';
import test from 'node:test';
import { buildDesktopLaunchUrl } from '../../server/platform/desktop-launch.mjs';
import { createTestContext } from './helpers/test-context.mjs';

test('协议 URL 只携带平台地址、模式和一次性操作码', () => {
  const url = buildDesktopLaunchUrl({
    mode: 'execute',
    platformUrl: 'http://host:3050/',
    code: '7K3P-W9QM'
  });

  assert.equal(
    url,
    'autotest-recorder://execute?platform=http%3A%2F%2Fhost%3A3050&code=7K3P-W9QM'
  );
  assert.doesNotMatch(url, /password|script|dataset/i);
});

test('协议 URL 只允许录制或执行模式', () => {
  assert.throws(
    () => buildDesktopLaunchUrl({
      mode: 'invalid',
      platformUrl: 'http://host:3050/',
      code: '7K3P-W9QM'
    }),
    /record|execute/
  );
});

test('本地录制响应使用请求 origin 生成桌面启动地址', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const response = await ctx.fetch('/api/recordings/start', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      location: 'local',
      platformUrl: 'http://user:password@evil.invalid/private?script=secret&dataset=rows'
    })
  });

  assert.equal(response.status, 201);
  const recording = await response.json();
  assert.equal(
    recording.desktopLaunchUrl,
    buildDesktopLaunchUrl({ mode: 'record', platformUrl: ctx.baseURL, code: recording.recordCode })
  );
  assert.doesNotMatch(recording.desktopLaunchUrl, /password|script|dataset|evil/i);
});

test('本地执行响应保留回退信息并增加桌面启动地址', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const dataset = await ctx.uploadCustomerDataset(cookie);
  const response = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioId: dataset.scenarioId,
      datasetId: dataset.id,
      environment: 'test',
      executionLocation: 'local'
    })
  });

  assert.equal(response.status, 202);
  const created = await response.json();
  assert.match(created.localExecution.code, /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);
  assert.equal(created.localExecution.toolDownloadUrl, '/api/recorder/download');
  assert.ok(created.localExecution.expiresAt);
  assert.equal(
    created.localExecution.desktopLaunchUrl,
    buildDesktopLaunchUrl({
      mode: 'execute',
      platformUrl: ctx.baseURL,
      code: created.localExecution.code
    })
  );
});
