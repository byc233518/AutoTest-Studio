import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
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
  assert.doesNotMatch(source, /完成并绑定脚本/);
  assert.doesNotMatch(source, /finishRecord/);
});

test('本地录制创建成功时优先唤起桌面协议，且完成分析自动打开复核', async () => {
  const source = await readFile('frontend/src/components/ScenarioDrawer.vue', 'utf8');
  assert.match(source, /recording\.value\.desktopLaunchUrl/);
  assert.match(source, /window\.location\.href\s*=\s*recording\.value\.desktopLaunchUrl/);
  assert.match(source, /recording\.value\.analysis/);
  assert.match(source, /reviewVisible|reviewDialog|RecordingReviewDialog/);
  assert.match(source, /setInterval/);
  assert.match(source, /clearInterval/);
});

test('录制复核向导覆盖候选处理、手工断言和脚本式预览', async () => {
  const source = await readFile('frontend/src/components/RecordingReviewDialog.vue', 'utf8');
  for (const type of ['select', 'checkbox', 'file']) assert.match(source, new RegExp(type));
  assert.match(source, /忽略/);
  assert.match(source, /合并/);
  assert.match(source, /删除/);
  assert.match(source, /addAssertion|新增成功条件/);
  assert.match(source, /testDataSchema/);
  assert.match(source, /expect\(/);
  assert.match(source, /示例数据/);
  assert.match(source, /警告/);
  assert.match(source, /\/api\/recordings\/\$\{[^}]+\}\/preview/);
  assert.match(source, /previewResult/);
  assert.doesNotMatch(source, /原始录制操作将在服务端安全参数化/);
});

test('场景抽屉支持上传和在线编辑脚本', async () => {
  const source = await readFile('frontend/src/components/ScenarioDrawer.vue', 'utf8');

  assert.match(source, /上传并绑定/);
  assert.match(source, /脚本源码/);
  assert.match(source, /保存脚本/);
  assert.match(source, /method: 'PUT'/);
  assert.match(source, /\/api\/scenarios\/\$\{scenario\.value\.key\}\/script/);
});

test('本地执行使用专门启动弹窗而不是 HTML alert', async () => {
  const [runDialog, launchDialog] = await Promise.all([
    readFile('frontend/src/components/RunDialog.vue', 'utf8'),
    readFile('frontend/src/components/DesktopLaunchDialog.vue', 'utf8').catch(() => '')
  ]);

  assert.match(runDialog, /DesktopLaunchDialog/);
  assert.doesNotMatch(runDialog, /ElMessageBox\.alert/);
  assert.match(launchDialog, /desktopLaunchUrl/);
  assert.match(launchDialog, /recordCode|code/);
  assert.match(launchDialog, /expiresAt|recordCodeExpires/);
  assert.match(launchDialog, /toolDownloadUrl/);
  assert.match(launchDialog, /再次打开|openDesktop/);
  assert.match(launchDialog, /复制/);
});

test('登录用户可以下载已构建的免安装录制器', async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), 'autotest-recorder-package-'));
  const packageDir = path.join(root, '.绿色录制包');
  await mkdir(packageDir, { recursive: true });
  const recorderPackagePath = path.join(packageDir, 'AutoTest-Studio本地录制器-win-x64.zip');
  await writeFile(recorderPackagePath, 'portable-recorder');
  t.after(() => rm(root, { recursive: true, force: true }));
  const ctx = await createTestContext(t, { recorderPackagePath });
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/recorder/download', { headers: { cookie } });
  assert.equal(response.status, 200);
  const disposition = response.headers.get('content-disposition') || '';
  assert.match(disposition, /filename\*=UTF-8''([^;]+)/i);
  assert.equal(
    decodeURIComponent(disposition.match(/filename\*=UTF-8''([^;]+)/i)[1]),
    'AutoTest-Studio本地录制器-win-x64.zip'
  );
  assert.equal(await response.text(), 'portable-recorder');

  const partial = await ctx.fetch('/api/recorder/download', {
    headers: { cookie, range: 'bytes=0-7' }
  });
  assert.equal(partial.status, 206);
  assert.equal(await partial.text(), 'portable');
  assert.equal(partial.headers.get('content-range'), 'bytes 0-7/17');
});

test('录制器未构建时下载接口返回明确错误', async (t) => {
  const ctx = await createTestContext(t, { recorderPackagePath: path.resolve('missing-recorder.zip') });
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/recorder/download', { headers: { cookie } });
  assert.equal(response.status, 404);
  assert.equal((await response.json()).message, '免安装录制器尚未构建');
});

test('默认录制器路径使用构建产物的正确中文文件名', async (t) => {
  const ctx = await createTestContext(t);

  assert.equal(
    path.basename(ctx.app.locals.paths.recorderPackagePath),
    'AutoTest-Studio本地录制器-win-x64.zip'
  );
});
