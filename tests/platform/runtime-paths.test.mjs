import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { startRecordingProcess } from '../../server/platform/recordings.mjs';
import {
  configuredBrowserChannel,
  resolveExecutionBrowser
} from '../../server/platform/runner.mjs';
import { resolveRuntimePaths } from '../../server/platform/runtime-paths.mjs';

test('打包运行时优先使用内置 Node 和 Playwright 运行组件目录', () => {
  const workspaceRoot = path.resolve('C:/app/resources/app-runtime');
  const bundledNode = path.resolve(workspaceRoot, 'runtime', 'node.exe');
  const bundledBrowsers = path.resolve(workspaceRoot, 'browsers');
  const exists = (candidate) => candidate === bundledNode || candidate === bundledBrowsers;

  assert.deepEqual(resolveRuntimePaths(workspaceRoot, {
    exists,
    execPath: 'C:/app/AutoTest-Studio.exe'
  }), {
    nodeExecutable: bundledNode,
    browsersPath: bundledBrowsers,
    electronRunAsNode: false
  });
});

test('桌面录制使用系统 Chrome，并保留 Playwright 运行组件路径', () => {
  const workspaceRoot = path.resolve('C:/app/resources/app-runtime');
  const bundledNode = path.resolve(workspaceRoot, 'runtime', 'node.exe');
  const bundledBrowsers = path.resolve(workspaceRoot, 'browsers');
  const chromeExecutable = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const calls = [];

  const result = startRecordingProcess({
    workspaceRoot,
    outputPath: path.resolve(workspaceRoot, 'recordings', 'case.spec.js'),
    environment: { key: 'test', base_url: 'http://127.0.0.1:46069/' },
    runtimeOptions: {
      exists: (candidate) => candidate === bundledNode || candidate === bundledBrowsers,
      execPath: 'C:/app/AutoTest-Studio.exe'
    },
    browserOptions: {
      platform: 'win32',
      env: { ProgramFiles: 'C:\\Program Files', PATH: '' },
      exists: (candidate) => candidate === chromeExecutable
    },
    spawnImpl(command, args, options) {
      calls.push({ command, args, options });
      return { pid: 1234, unref() {} };
    }
  });

  assert.equal(result.pid, 1234);
  assert.equal(result.browser.channel, 'chrome');
  assert.equal(calls[0].command, bundledNode);
  assert.deepEqual(calls[0].args.slice(1, 5), ['codegen', '--channel', 'chrome', '--target']);
  assert.equal(calls[0].options.env.PLAYWRIGHT_BROWSERS_PATH, bundledBrowsers);
  assert.equal(calls[0].options.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, chromeExecutable);
  assert.equal(calls[0].options.env.AUTOTEST_BROWSER_CHANNEL, 'chrome');
  assert.equal(calls[0].options.env.AUTOTEST_BASE_URL, 'http://127.0.0.1:46069');
  assert.equal(calls[0].options.env.ELECTRON_RUN_AS_NODE, undefined);

  assert.deepEqual(resolveRuntimePaths(workspaceRoot, {
    exists: () => false,
    execPath: 'C:/node/node.exe',
    isElectron: false
  }), {
    nodeExecutable: 'C:/node/node.exe',
    browsersPath: null,
    electronRunAsNode: false
  });
});

test('Electron 开发态回退自身可执行文件时启用 Node 模式', () => {
  const calls = [];
  const edgeExecutable = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  startRecordingProcess({
    workspaceRoot: path.resolve('C:/workspace/jmom'),
    outputPath: path.resolve('C:/workspace/jmom/recordings/case.spec.js'),
    environment: { key: 'test', base_url: 'http://127.0.0.1:46069' },
    runtimeOptions: {
      exists: () => false,
      execPath: 'C:/workspace/jmom/node_modules/electron/dist/electron.exe',
      isElectron: true
    },
    browserChannel: 'msedge',
    browserOptions: {
      platform: 'win32',
      env: { 'ProgramFiles(x86)': 'C:\\Program Files (x86)', PATH: '' },
      exists: (candidate) => candidate === edgeExecutable
    },
    spawnImpl(command, args, options) {
      calls.push({ command, args, options });
      return { pid: 5678, unref() {} };
    }
  });

  assert.match(calls[0].command, /electron\.exe$/i);
  assert.equal(calls[0].args[calls[0].args.indexOf('--channel') + 1], 'msedge');
  assert.equal(calls[0].options.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, edgeExecutable);
  assert.equal(calls[0].options.env.ELECTRON_RUN_AS_NODE, '1');
});

test('执行浏览器遵循项目设置，自动模式优先 Chrome', () => {
  const chromeExecutable = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const edgeExecutable = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const options = {
    platform: 'win32',
    env: {
      ProgramFiles: 'C:\\Program Files',
      'ProgramFiles(x86)': 'C:\\Program Files (x86)',
      PATH: ''
    },
    exists: (candidate) => candidate === chromeExecutable || candidate === edgeExecutable
  };
  const database = {
    getSetting: () => ({ value: JSON.stringify({ browserChannel: 'msedge' }) })
  };

  assert.equal(configuredBrowserChannel(database), 'msedge');
  assert.equal(resolveExecutionBrowser(database, options).channel, 'msedge');
  database.getSetting = () => ({ value: JSON.stringify({ browserChannel: 'auto' }) });
  assert.equal(resolveExecutionBrowser(database, options).channel, 'chrome');
});

test('执行和录制在未安装 Chrome/Edge 时给出中文错误', () => {
  const browserOptions = {
    platform: 'win32',
    env: { PATH: '' },
    exists: () => false
  };
  const database = { getSetting: () => null };

  assert.throws(
    () => resolveExecutionBrowser(database, browserOptions),
    /未检测到可用的 Chrome 或 Edge/
  );
  assert.throws(() => startRecordingProcess({
    workspaceRoot: path.resolve('C:/workspace/jmom'),
    outputPath: path.resolve('C:/workspace/jmom/recordings/case.spec.js'),
    environment: { key: 'test', base_url: 'http://127.0.0.1:46069' },
    browserOptions,
    spawnImpl() {
      throw new Error('不应启动进程');
    }
  }), /未检测到可用的 Chrome 或 Edge/);
});
