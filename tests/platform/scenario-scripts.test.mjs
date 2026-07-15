import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';
import { resolveScenarioScriptPath } from '../../server/platform/scenario-scripts.mjs';

test('脚本路径解析拒绝越过工作区和平台数据目录', () => {
  const options = { workspaceRoot: 'D:/workspace', dataDir: 'D:/workspace/platform-data' };

  assert.equal(resolveScenarioScriptPath({
    ...options,
    scriptEntry: 'platform-data/../../server/app.mjs'
  }), null);
  assert.equal(resolveScenarioScriptPath({
    ...options,
    scriptEntry: '../../outside.spec.js'
  }), null);
});

test('测试人员可以上传脚本并绑定到已有场景', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key: 'script-upload-demo', name: '脚本上传演示' })
  });
  assert.equal(created.status, 201);

  const form = new FormData();
  const script = `const { test, expect } = require('@playwright/test');
test('uploaded script', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/.+/);
});
`;
  form.append('file', new Blob([script], { type: 'text/javascript' }), 'demo.spec.js');

  const upload = await ctx.fetch('/api/scenarios/script-upload-demo/script', {
    method: 'POST',
    headers: { cookie },
    body: form
  });
  assert.equal(upload.status, 201);
  const body = await upload.json();
  assert.match(body.scriptEntry, /platform-data\/scripts\/script-upload-demo\/demo\.spec\.js$/);

  const detail = await ctx.fetch('/api/scenarios/script-upload-demo', { headers: { cookie } });
  assert.equal(detail.status, 200);
  assert.equal((await detail.json()).scriptEntry, body.scriptEntry);

  const source = await ctx.fetch('/api/scenarios/script-upload-demo/script', { headers: { cookie } });
  assert.equal(source.status, 200);
  const sourceBody = await source.json();
  assert.equal(sourceBody.fileName, 'demo.spec.js');
  assert.equal(sourceBody.content, script);
});

test('测试人员可以在线编辑已上传脚本并保留脚本入口', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key: 'script-online-demo', name: '脚本在线编辑演示' })
  });
  assert.equal(created.status, 201);

  const uploadForm = new FormData();
  uploadForm.append('file', new Blob(['// initial'], { type: 'text/javascript' }), 'online.spec.js');
  const uploaded = await ctx.fetch('/api/scenarios/script-online-demo/script', {
    method: 'POST',
    headers: { cookie },
    body: uploadForm
  });
  assert.equal(uploaded.status, 201);
  const uploadedBody = await uploaded.json();
  const content = `import { test, expect } from '@playwright/test';
test('edited online', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/JMOM/);
});
`;

  const saved = await ctx.fetch('/api/scenarios/script-online-demo/script', {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ fileName: 'online.spec.js', content })
  });
  assert.equal(saved.status, 200);
  const savedBody = await saved.json();
  assert.equal(savedBody.scriptEntry, uploadedBody.scriptEntry);
  assert.equal(savedBody.content, content);

  const source = await ctx.fetch('/api/scenarios/script-online-demo/script', { headers: { cookie } });
  assert.equal(source.status, 200);
  assert.deepEqual(await source.json(), {
    scenarioKey: 'script-online-demo',
    scriptEntry: savedBody.scriptEntry,
    fileName: 'online.spec.js',
    content
  });
});

test('在线编辑拒绝空脚本和非法扩展名', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const empty = await ctx.fetch('/api/scenarios/wms-customer-create/script', {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ fileName: 'empty.spec.js', content: '   ' })
  });
  assert.equal(empty.status, 400);
  assert.equal((await empty.json()).message, '脚本内容不能为空');

  const invalid = await ctx.fetch('/api/scenarios/wms-customer-create/script', {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ fileName: 'notes.txt', content: 'not a script' })
  });
  assert.equal(invalid.status, 400);
  assert.equal((await invalid.json()).message, '仅支持 .js / .spec.js / .mjs 脚本文件');
});

test('本地录制上传后可以绑定脚本到指定场景', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key: 'script-record-demo', name: '脚本录制演示' })
  });
  assert.equal(created.status, 201);

  const started = await ctx.fetch('/api/recordings/start', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioKey: 'script-record-demo',
      environmentKey: 'test',
      location: 'local',
      platformUrl: 'http://127.0.0.1:3050'
    })
  });
  assert.equal(started.status, 201);
  const recording = await started.json();
  assert.equal(recording.location, 'local');
  assert.equal(recording.scenarioKey, 'script-record-demo');
  assert.match(recording.localCommand, /npm run record:local --/);
  assert.match(recording.recordCode, /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);
  assert.ok(recording.recordCodeExpires);
  assert.equal(recording.recorderDownloadUrl, '/api/recorder/download');

  const resolved = await ctx.fetch('/api/recordings/resolve', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ code: recording.recordCode.toLowerCase().replace('-', ' ') })
  });
  assert.equal(resolved.status, 200);
  const resolvedBody = await resolved.json();
  assert.equal(resolvedBody.id, recording.id);
  assert.equal(resolvedBody.token, recording.uploadToken);
  assert.equal(resolvedBody.startUrl, recording.startUrl);

  const repeated = await ctx.fetch('/api/recordings/resolve', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ code: recording.recordCode })
  });
  assert.equal(repeated.status, 401);

  const form = new FormData();
  const script = `const { test, expect } = require('@playwright/test');
test('local recorded script', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/.+/);
});
`;
  form.append('token', resolvedBody.token);
  form.append('file', new Blob([script], { type: 'text/javascript' }), `${recording.id}.spec.js`);

  const uploaded = await ctx.fetch(`/api/recordings/${recording.id}/upload`, {
    method: 'POST',
    body: form
  });
  assert.equal(uploaded.status, 200);
  const body = await uploaded.json();
  assert.match(body.scriptEntry, /platform-data\/recordings\/REC-/);
  assert.equal(body.scenario.key, 'script-record-demo');
  assert.equal(body.scenario.scriptEntry, body.scriptEntry);
});

test('上传非法脚本扩展名会被拒绝', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const form = new FormData();
  form.append('file', new Blob(['not-a-script'], { type: 'text/plain' }), 'notes.txt');
  const response = await ctx.fetch('/api/scenarios/wms-customer-create/script', {
    method: 'POST',
    headers: { cookie },
    body: form
  });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).message, '仅支持 .js / .spec.js / .mjs 脚本文件');
});
