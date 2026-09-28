import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import {
  createBrowserStatus,
  detectInstalledBrowsers,
  normalizeBrowserChannel,
  resolveBrowserChannel
} from '../../server/platform/system-browsers.mjs';
import { createTestContext } from './helpers/test-context.mjs';

function windowsDetectionOptions({ installed = ['chrome', 'msedge'] } = {}) {
  const env = {
    LOCALAPPDATA: 'C:\\Users\\tester\\AppData\\Local',
    ProgramFiles: 'C:\\Program Files',
    'ProgramFiles(x86)': 'C:\\Program Files (x86)',
    PATH: ''
  };
  const paths = {
    chrome: path.win32.join(env.ProgramFiles, 'Google', 'Chrome', 'Application', 'chrome.exe'),
    msedge: path.win32.join(env['ProgramFiles(x86)'], 'Microsoft', 'Edge', 'Application', 'msedge.exe')
  };
  const existing = new Set(installed.map((channel) => paths[channel]));
  return {
    platform: 'win32',
    env,
    exists: (candidate) => existing.has(candidate),
    versionReader: (candidate) => candidate === paths.chrome ? '153.0.8010.48' : '154.0.4258.37',
    paths
  };
}

test('系统浏览器检测返回 Chrome、Edge 路径和版本', () => {
  const options = windowsDetectionOptions();
  const detected = detectInstalledBrowsers({ ...options, includeVersion: true });

  assert.deepEqual(detected.chrome, {
    key: 'chrome',
    channel: 'chrome',
    name: 'Google Chrome',
    executablePath: options.paths.chrome,
    version: '153.0.8010.48'
  });
  assert.equal(detected.msedge.executablePath, options.paths.msedge);
  assert.equal(detected.msedge.version, '154.0.4258.37');
  assert.equal(resolveBrowserChannel('auto', detected).channel, 'chrome');
  assert.equal(resolveBrowserChannel('msedge', detected).channel, 'msedge');
});

test('浏览器选择校验严格，自动模式在 Chrome 缺失时回退 Edge', () => {
  const detected = detectInstalledBrowsers(windowsDetectionOptions({ installed: ['msedge'] }));
  assert.equal(normalizeBrowserChannel(undefined), 'auto');
  assert.equal(normalizeBrowserChannel('MSEDGE'), 'msedge');
  assert.throws(() => normalizeBrowserChannel('firefox'), /auto、chrome 或 msedge/);
  assert.equal(resolveBrowserChannel('auto', detected).channel, 'msedge');
  assert.throws(() => resolveBrowserChannel('chrome', detected), /未检测到 Google Chrome/);
});

test('PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH 可覆盖默认安装位置', () => {
  const executablePath = 'D:\\Browser\\msedge.exe';
  const detected = detectInstalledBrowsers({
    platform: 'win32',
    env: { PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH: executablePath, PATH: '' },
    exists: (candidate) => candidate === executablePath
  });
  assert.equal(detected.msedge.executablePath, executablePath);
  assert.equal(detected.chrome, null);
});

test('浏览器状态包含固定顺序和当前解析结果', () => {
  const status = createBrowserStatus('auto', windowsDetectionOptions({ installed: ['msedge'] }));
  assert.equal(status.ready, true);
  assert.equal(status.resolvedChannel, 'msedge');
  assert.deepEqual(status.browsers.map((item) => item.channel), ['chrome', 'msedge']);
  assert.equal(status.browsers[0].installed, false);
  assert.equal(status.browsers[1].installed, true);
});

test('通用设置 API 保存浏览器选择并返回实时检测状态', async (t) => {
  const browserDetectorOptions = windowsDetectionOptions();
  const ctx = await createTestContext(t, { desktopMode: true, browserDetectorOptions });

  const savedResponse = await ctx.fetch('/api/settings/general', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ browserChannel: 'msedge' })
  });
  assert.equal(savedResponse.status, 200);
  assert.equal((await savedResponse.json()).browserChannel, 'msedge');

  const settings = await (await ctx.fetch('/api/settings/general')).json();
  assert.equal(settings.browserChannel, 'msedge');

  const statusResponse = await ctx.fetch('/api/settings/browser-status');
  assert.equal(statusResponse.status, 200);
  const status = await statusResponse.json();
  assert.equal(status.browserChannel, 'msedge');
  assert.equal(status.resolvedChannel, 'msedge');
  assert.equal(status.ready, true);
  assert.equal(status.browsers[1].executablePath, browserDetectorOptions.paths.msedge);

  const invalidResponse = await ctx.fetch('/api/settings/general', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ browserChannel: 'firefox' })
  });
  assert.equal(invalidResponse.status, 400);
  assert.match((await invalidResponse.json()).message, /auto、chrome 或 msedge/);
});
