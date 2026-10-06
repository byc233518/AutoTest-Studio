import { randomBytes } from 'node:crypto';
import { spawn, spawnSync } from 'node:child_process';
import { copyFile, rename, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { toWorkspaceScriptEntry } from './scenario-scripts.mjs';
import { analyzeRecordedScript, buildDataDrivenScript } from './recording-analysis.mjs';
import { resolveRuntimePaths } from './runtime-paths.mjs';
import { resolveBrowserChannel } from './system-browsers.mjs';

function trimTrailingSlash(value = '') {
  return value.replace(/\/+$/, '');
}

export function createRecordingUploadToken() {
  return randomBytes(16).toString('hex');
}

export async function moveRecordingUpload(sourcePath, targetPath, {
  renameImpl = rename,
  copyImpl = copyFile,
  removeImpl = rm
} = {}) {
  try {
    await renameImpl(sourcePath, targetPath);
  } catch (error) {
    if (error?.code !== 'EXDEV') throw error;
    await copyImpl(sourcePath, targetPath);
    await removeImpl(sourcePath, { force: true });
  }
}

export function buildLocalRecordCommand({ recordingId, uploadToken, startUrl, platformUrl }) {
  const platform = trimTrailingSlash(platformUrl);
  return [
    'npm run record:local --',
    `--id ${recordingId}`,
    `--token ${uploadToken}`,
    `--url ${JSON.stringify(startUrl)}`,
    `--platform ${JSON.stringify(platform)}`
  ].join(' ');
}

export function buildRecordingStub(id, environment) {
  const baseUrl = trimTrailingSlash(environment.base_url);
  return `// Auto-generated recording for ${id}
// Environment: ${environment.key} (${baseUrl})
import { test, expect } from '@playwright/test';

test('recorded flow ${id}', async ({ page }) => {
  await page.goto(process.env.AUTOTEST_BASE_URL || '${baseUrl}');
  // TODO: replace with recorded steps
  await expect(page).toHaveURL(/.+/);
});
`;
}

export async function writeRecordingStub(outputPath, id, environment) {
  await writeFile(outputPath, buildRecordingStub(id, environment), 'utf8');
}

export function startRecordingProcess({
  workspaceRoot,
  outputPath,
  environment,
  recordMode = 'codegen',
  spawnImpl = spawn,
  runtimeOptions,
  browserChannel = 'auto',
  browserOptions
}) {
  const baseUrl = trimTrailingSlash(environment.base_url);
  const startUrl = baseUrl;

  if (recordMode === 'stub') {
    return { pid: null, mode: 'stub', startUrl };
  }

  const cli = path.resolve(workspaceRoot, 'node_modules', 'playwright', 'cli.js');
  const browser = resolveBrowserChannel(browserChannel, browserOptions);
  const { nodeExecutable, browsersPath, electronRunAsNode } = resolveRuntimePaths(workspaceRoot, runtimeOptions);
  const child = spawnImpl(nodeExecutable, [
    cli,
    'codegen',
    '--channel',
    browser.channel,
    '--target',
    'playwright-test',
    '-o',
    outputPath,
    startUrl
  ], {
    cwd: workspaceRoot,
    env: {
      ...process.env,
      AUTOTEST_BASE_URL: baseUrl,
      AUTOTEST_BROWSER_CHANNEL: browser.channel,
      PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH: browser.executablePath,
      ...(browsersPath ? { PLAYWRIGHT_BROWSERS_PATH: browsersPath } : {}),
      ...(electronRunAsNode ? { ELECTRON_RUN_AS_NODE: '1' } : {})
    },
    detached: true,
    stdio: 'ignore'
  });
  const completion = typeof child.once === 'function'
    ? new Promise((resolve) => {
      child.once('error', (error) => resolve({ exitCode: null, signal: null, error }));
      child.once('close', (exitCode, signal) => resolve({ exitCode, signal, error: null }));
    })
    : Promise.resolve({ exitCode: 0, signal: null, error: null });
  child.unref();
  // 保留 child 引用，桌面端退出时可以停止整个录制任务；pid 仍写入元数据，
  // 便于服务重启后发现遗留任务。
  return { pid: child.pid, child, mode: 'codegen', startUrl, completion, browser };
}

export function stopRecordingProcess(pid, child = null) {
  if (pid && process.platform === 'win32') {
    try {
      // 直接按父 PID 结束整棵进程树，避免先结束父进程后浏览器脱离进程树。
      spawnSync('taskkill.exe', ['/PID', String(pid), '/T', '/F'], {
        stdio: 'ignore',
        windowsHide: true
      });
    } catch {
      // Inspector may already be closed by the user.
    }
    return;
  }
  if (child && typeof child.kill === 'function') {
    try {
      child.kill();
    } catch {
      // 子进程可能已经退出。
    }
  }
  if (!pid) return;
  try {
    process.kill(pid);
  } catch {
    // Inspector may already be closed by the user.
  }
}

export function resolveRecordingScriptEntry(workspaceRoot, outputPath, dataDir) {
  if (!existsSync(outputPath)) return '';
  return toWorkspaceScriptEntry(workspaceRoot, outputPath, dataDir);
}

export function isManagedScriptEntry(entry) {
  if (typeof entry !== 'string' || !entry.trim()) return false;
  const normalized = entry.replaceAll('\\', '/');
  if (normalized.startsWith('/') || /^[A-Za-z]:\//.test(normalized)) return false;
  const parts = normalized.split('/');
  if (parts.includes('..')) return false;
  return normalized.startsWith('tests/')
    || normalized.startsWith('platform-data/scripts/')
    || normalized.startsWith('platform-data/cases/');
}

export function analyzeRecordingScript(source) {
  return analyzeRecordedScript(source);
}

export function buildRecordingReviewScript(input) {
  return buildDataDrivenScript(input);
}
