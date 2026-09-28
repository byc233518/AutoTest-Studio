import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const CHANNELS = new Set(['auto', 'chrome', 'msedge']);
const BROWSER_META = Object.freeze({
  chrome: Object.freeze({ key: 'chrome', channel: 'chrome', name: 'Google Chrome' }),
  msedge: Object.freeze({ key: 'msedge', channel: 'msedge', name: 'Microsoft Edge' })
});

export class SystemBrowserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SystemBrowserError';
    this.code = 'SYSTEM_BROWSER_NOT_FOUND';
  }
}

export function normalizeBrowserChannel(value, { strict = true } = {}) {
  if (value === undefined || value === null || value === '') return 'auto';
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (CHANNELS.has(normalized)) return normalized;
  }
  if (!strict) return 'auto';
  throw new TypeError('浏览器选项必须是 auto、chrome 或 msedge');
}

function inferBrowserChannel(executablePath) {
  return /(?:^|[\\/])(?:msedge|microsoft-edge)(?:\.exe)?$/i.test(executablePath)
    ? 'msedge'
    : 'chrome';
}

function environmentValue(environment, ...keys) {
  for (const key of keys) {
    const value = environment?.[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function executableCandidates(channel, { platform, env }) {
  if (platform === 'win32') {
    const pathApi = path.win32;
    const localAppData = environmentValue(env, 'LOCALAPPDATA', 'LocalAppData');
    const programFiles = environmentValue(env, 'ProgramFiles', 'PROGRAMFILES');
    const programFilesX86 = environmentValue(env, 'ProgramFiles(x86)', 'PROGRAMFILES(X86)', 'PROGRAMFILES_X86');
    const suffix = channel === 'chrome'
      ? ['Google', 'Chrome', 'Application', 'chrome.exe']
      : ['Microsoft', 'Edge', 'Application', 'msedge.exe'];
    const pathNames = channel === 'chrome' ? ['chrome.exe'] : ['msedge.exe'];
    const fromPath = environmentValue(env, 'PATH', 'Path')
      .split(';')
      .filter(Boolean)
      .flatMap((directory) => pathNames.map((name) => pathApi.join(directory, name)));
    return unique([
      localAppData && pathApi.join(localAppData, ...suffix),
      programFiles && pathApi.join(programFiles, ...suffix),
      programFilesX86 && pathApi.join(programFilesX86, ...suffix),
      ...fromPath
    ]);
  }

  if (platform === 'darwin') {
    return channel === 'chrome'
      ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
      : ['/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'];
  }

  return channel === 'chrome'
    ? ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser']
    : ['/usr/bin/microsoft-edge', '/usr/bin/microsoft-edge-stable'];
}

function safeExists(executablePath, exists) {
  try {
    return Boolean(executablePath && exists(executablePath));
  } catch {
    return false;
  }
}

function defaultVersionReader(executablePath, { platform, env, execute }) {
  let result;
  if (platform === 'win32') {
    result = execute('powershell.exe', [
      '-NoProfile',
      '-NonInteractive',
      '-Command',
      '[System.Diagnostics.FileVersionInfo]::GetVersionInfo($env:AUTOTEST_BROWSER_VERSION_PATH).ProductVersion'
    ], {
      encoding: 'utf8',
      windowsHide: true,
      timeout: 3000,
      env: { ...env, AUTOTEST_BROWSER_VERSION_PATH: executablePath }
    });
  } else {
    result = execute(executablePath, ['--version'], {
      encoding: 'utf8',
      timeout: 3000,
      env
    });
  }
  const output = `${result?.stdout || ''}\n${result?.stderr || ''}`;
  return output.match(/\d+(?:\.\d+){1,3}/)?.[0] || '';
}

function browserInfo(channel, executablePath, options) {
  const meta = BROWSER_META[channel];
  let version = '';
  if (options.includeVersion) {
    try {
      version = String(options.versionReader(executablePath, {
        channel,
        platform: options.platform,
        env: options.env,
        execute: options.execute
      }) || '').trim();
    } catch {}
  }
  return { ...meta, executablePath, version };
}

export function detectInstalledBrowsers(options = {}) {
  const platform = options.platform || process.platform;
  const env = options.env || process.env;
  const exists = options.exists || existsSync;
  const execute = options.execute || spawnSync;
  const versionReader = options.versionReader || defaultVersionReader;
  const detectionOptions = {
    platform,
    env,
    exists,
    execute,
    versionReader,
    includeVersion: Boolean(options.includeVersion)
  };
  const detected = { chrome: null, msedge: null };

  const override = environmentValue(env, 'PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH');
  if (safeExists(override, exists)) {
    const channel = inferBrowserChannel(override);
    detected[channel] = browserInfo(channel, override, detectionOptions);
  }

  for (const channel of ['chrome', 'msedge']) {
    if (detected[channel]) continue;
    const executablePath = executableCandidates(channel, { platform, env })
      .find((candidate) => safeExists(candidate, exists));
    if (executablePath) detected[channel] = browserInfo(channel, executablePath, detectionOptions);
  }

  return detected;
}

function isDetectionResult(value) {
  return Boolean(value && typeof value === 'object'
    && (Object.hasOwn(value, 'chrome') || Object.hasOwn(value, 'msedge')));
}

export function resolveBrowserChannel(browserChannel = 'auto', detectedOrOptions = {}) {
  const channel = normalizeBrowserChannel(browserChannel);
  const detected = isDetectionResult(detectedOrOptions)
    ? detectedOrOptions
    : detectInstalledBrowsers(detectedOrOptions);
  const selected = channel === 'auto'
    ? detected.chrome || detected.msedge
    : detected[channel];
  if (selected) return selected;
  if (channel === 'chrome') {
    throw new SystemBrowserError('未检测到 Google Chrome，请先安装或改为自动选择');
  }
  if (channel === 'msedge') {
    throw new SystemBrowserError('未检测到 Microsoft Edge，请先安装或改为自动选择');
  }
  throw new SystemBrowserError('未检测到可用的 Chrome 或 Edge，请先安装浏览器');
}

export function createBrowserStatus(browserChannel = 'auto', options = {}) {
  const channel = normalizeBrowserChannel(browserChannel, { strict: false });
  const detected = detectInstalledBrowsers({ ...options, includeVersion: true });
  let selected = null;
  let message = '';
  try {
    selected = resolveBrowserChannel(channel, detected);
  } catch (error) {
    message = error.message;
  }
  return {
    browserChannel: channel,
    resolvedChannel: selected?.channel || '',
    ready: Boolean(selected),
    message,
    selected,
    browsers: ['chrome', 'msedge'].map((item) => ({
      ...BROWSER_META[item],
      installed: Boolean(detected[item]),
      executablePath: detected[item]?.executablePath || '',
      version: detected[item]?.version || ''
    }))
  };
}
