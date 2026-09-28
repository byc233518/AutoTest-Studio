import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { recordProcessStep } = require('../support/autotest-ui.js');

test('Playwright 支持函数会写入实时过程截图和步骤状态', async (t) => {
  const rootDir = await mkdtemp(path.join(tmpdir(), 'autotest-process-'));
  t.after(async () => {
    delete process.env.AUTOTEST_PROCESS_FILE;
    delete process.env.AUTOTEST_RESULT_DIR;
    delete process.env.AUTOTEST_RUN_ID;
    await rm(rootDir, { recursive: true, force: true });
  });

  const processFile = path.resolve(rootDir, 'process.json');
  process.env.AUTOTEST_PROCESS_FILE = processFile;
  process.env.AUTOTEST_RESULT_DIR = rootDir;
  process.env.AUTOTEST_RUN_ID = 'RUN-TEST';
  await writeFile(processFile, JSON.stringify({
    status: 'running',
    steps: [
      { id: 'browser', title: '启动浏览器并打开测试环境', status: 'pending' }
    ]
  }), 'utf8');

  const page = {
    screenshot: async (options) => {
      await writeFile(options.path, 'fake-png', 'utf8');
    }
  };

  await recordProcessStep(page, '打开测试环境', { stepId: 'browser' });

  const body = JSON.parse(await readFile(processFile, 'utf8'));
  assert.equal(body.currentStep, '打开测试环境');
  assert.equal(body.latestScreenshotUrl, '/api/runs/RUN-TEST/report-file/live-latest.png');
  assert.equal(body.steps[0].status, 'running');
  assert.equal(existsSync(path.resolve(rootDir, 'live-latest.png')), true);
});

test('Playwright 配置会为成功和失败执行都保留截图和录像', () => {
  const config = require('../../playwright.config.js');

  assert.equal(config.use.screenshot, 'on');
  assert.equal(config.use.video, 'on');
});

test('容器可以通过环境变量指定系统 Chromium', () => {
  const output = execFileSync(process.execPath, ['-e', `
    const config = require('./playwright.config.js');
    process.stdout.write(config.projects[0].use.launchOptions?.executablePath || '');
  `], {
    cwd: path.resolve(import.meta.dirname, '../..'),
    env: {
      ...process.env,
      PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH: '/usr/bin/chromium-browser'
    },
    encoding: 'utf8'
  });

  assert.equal(output, '/usr/bin/chromium-browser');
});

test('Playwright 配置使用桌面端检测到的系统浏览器路径', () => {
  const output = execFileSync(process.execPath, ['-e', `
    const config = require('./playwright.config.js');
    process.stdout.write(JSON.stringify(config.projects[0].use.launchOptions || {}));
  `], {
    cwd: path.resolve(import.meta.dirname, '../..'),
    env: {
      ...process.env,
      AUTOTEST_BROWSER_CHANNEL: 'msedge',
      PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH: 'C:\\Browser\\msedge.exe'
    },
    encoding: 'utf8'
  });

  assert.deepEqual(JSON.parse(output), { executablePath: 'C:\\Browser\\msedge.exe' });
});
