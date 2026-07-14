import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('场景抽屉优先展示短录制码和免安装录制器下载入口', async () => {
  const source = await readFile('frontend/src/components/ScenarioDrawer.vue', 'utf8');
  assert.match(source, /recording\.recordCode/);
  assert.match(source, /复制录制码/);
  assert.match(source, /下载免安装录制器/);
  assert.match(source, /recordCodeExpires/);
  assert.doesNotMatch(source, /recording\.localCommand/);
});

test('登录用户可以下载已构建的免安装录制器', async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), 'jmom-recorder-package-'));
  const recorderPackagePath = path.join(root, 'JMOM本地录制器-win-x64.zip');
  await writeFile(recorderPackagePath, 'portable-recorder');
  t.after(() => rm(root, { recursive: true, force: true }));
  const ctx = await createTestContext(t, { recorderPackagePath });
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/recorder/download', { headers: { cookie } });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-disposition') || '', /JMOM/);
  assert.equal(await response.text(), 'portable-recorder');
});

test('录制器未构建时下载接口返回明确错误', async (t) => {
  const ctx = await createTestContext(t, { recorderPackagePath: path.resolve('missing-recorder.zip') });
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/recorder/download', { headers: { cookie } });
  assert.equal(response.status, 404);
  assert.equal((await response.json()).message, '免安装录制器尚未构建');
});
