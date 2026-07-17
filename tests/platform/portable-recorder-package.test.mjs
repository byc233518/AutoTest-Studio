import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {
  parseInstallLocations,
  portableLayout,
  readLockedPlaywrightVersion,
  resolveNpmInvocation
} from '../../scripts/build-portable-recorder.mjs';

test('打包器使用 lockfile 中固定的 Playwright 版本', async () => {
  const lock = JSON.parse(await readFile('package-lock.json', 'utf8'));
  assert.equal(readLockedPlaywrightVersion(lock), lock.packages['node_modules/playwright'].version);
  assert.match(readLockedPlaywrightVersion(lock), /^\d+\.\d+\.\d+$/);
});

test('绿色包布局包含 EXE、Node、Playwright、浏览器和数据目录', () => {
  const layout = portableLayout('D:/dist/JMOM录制器');
  assert.equal(layout.root, path.resolve('D:/dist/JMOM录制器'));
  assert.match(layout.executable, /JMOM录制器\.exe$/);
  assert.match(layout.nodeExecutable, /runtime[\\/]node\.exe$/);
  assert.match(layout.runner, /app[\\/]portable-record-runner\.mjs$/);
  assert.match(layout.executionRunner, /app[\\/]portable-execution-runner\.mjs$/);
  assert.match(layout.executionLibrary, /app[\\/]lib[\\/]local-execution\.mjs$/);
  assert.match(layout.playwrightCli, /app[\\/]node_modules[\\/]playwright[\\/]cli\.js$/);
  assert.match(layout.browsersDir, /browsers$/);
  assert.match(layout.logsDir, /data[\\/]logs$/);
  assert.match(layout.versionFile, /VERSION$/);
});

test('构建产物和临时目录不会进入 Git', async () => {
  const ignore = await readFile('.gitignore', 'utf8');
  assert.match(ignore, /^dist\/$/m);
});

test('Windows 打包通过 node 运行 npm CLI，避免直接 spawn cmd 文件', () => {
  const invocation = resolveNpmInvocation({
    execPath: 'C:/node/node.exe',
    npmExecPath: 'C:/node/node_modules/npm/bin/npm-cli.js'
  });
  assert.equal(invocation.command, 'C:/node/node.exe');
  assert.deepEqual(invocation.argsPrefix, ['C:/node/node_modules/npm/bin/npm-cli.js']);
});

test('打包器可以解析 Playwright 已安装浏览器缓存目录', () => {
  const output = [
    'Chrome for Testing 149.0.7827.55 (playwright chromium v1228)',
    '  Install location:    C:\\Users\\tester\\AppData\\Local\\ms-playwright\\chromium-1228',
    'FFmpeg (playwright ffmpeg v1011)',
    '  Install location:    C:\\Users\\tester\\AppData\\Local\\ms-playwright\\ffmpeg-1011'
  ].join('\n');

  assert.deepEqual(parseInstallLocations(output), [
    'C:\\Users\\tester\\AppData\\Local\\ms-playwright\\chromium-1228',
    'C:\\Users\\tester\\AppData\\Local\\ms-playwright\\ffmpeg-1011'
  ]);
});
