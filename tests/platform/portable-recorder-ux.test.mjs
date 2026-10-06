import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('场景抽屉不再展示免安装录制码与下载入口', async () => {
  const source = await readFile('frontend/src/components/ScenarioDrawer.vue', 'utf8');
  assert.doesNotMatch(source, /recording\.recordCode/);
  assert.doesNotMatch(source, /复制录制码/);
  assert.doesNotMatch(source, /下载免安装录制器/);
  assert.doesNotMatch(source, /desktopLaunchUrl/);
  assert.doesNotMatch(source, /DesktopLaunchDialog/);
  assert.match(source, /location:\s*'server'/);
  assert.match(source, /RecordingReviewDialog/);
});

test('执行对话框不再依赖绿色工具启动弹窗', async () => {
  const runDialog = await readFile('frontend/src/components/RunDialog.vue', 'utf8');
  assert.doesNotMatch(runDialog, /DesktopLaunchDialog/);
  assert.doesNotMatch(runDialog, /toolDownloadUrl/);
  assert.doesNotMatch(runDialog, /desktopLaunchUrl/);
  assert.match(runDialog, /executionLocation:\s*'server'/);
});

test('免安装录制器下载接口已移除', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const response = await ctx.fetch('/api/recorder/download', { headers: { cookie } });
  assert.equal(response.status, 404);
});
