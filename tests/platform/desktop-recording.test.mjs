import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('桌面内置录制进程结束后自动绑定脚本并进入完成态', async (t) => {
  const ctx = await createTestContext(t, {
    desktopMode: true,
    recordMode: 'stub'
  });
  const startedResponse = await ctx.fetch('/api/recordings/start', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioKey: 'sample-form-submit',
      environmentKey: 'test',
      location: 'server'
    })
  });
  assert.equal(startedResponse.status, 201);
  const started = await startedResponse.json();
  assert.equal(started.status, 'recording');

  let completed;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const response = await ctx.fetch(`/api/recordings/${started.id}`);
    assert.equal(response.status, 200);
    completed = await response.json();
    if (completed.status !== 'recording') break;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  assert.equal(completed.status, 'finished');
  assert.match(completed.scriptEntry, /REC-.*\.spec\.js$/);
  assert.equal(completed.scenarioKey, 'sample-form-submit');
  const scenario = await ctx.fetch('/api/scenarios/sample-form-submit').then((response) => response.json());
  assert.equal(scenario.scriptEntry, completed.scriptEntry);
});

test('桌面录制在未检测到系统浏览器时返回明确错误', async (t) => {
  const ctx = await createTestContext(t, {
    desktopMode: true,
    recordMode: 'codegen',
    browserDetectorOptions: {
      platform: 'win32',
      env: { PATH: '' },
      exists: () => false
    }
  });
  const response = await ctx.fetch('/api/recordings/start', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioKey: 'sample-form-submit',
      environmentKey: 'test',
      location: 'server'
    })
  });

  assert.equal(response.status, 400);
  assert.match((await response.json()).message, /未检测到可用的 Chrome 或 Edge/);
});
