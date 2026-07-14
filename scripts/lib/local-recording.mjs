import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';

export class RecordingError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = 'RecordingError';
    this.code = code;
    Object.assign(this, details);
  }
}

export function normalizePlatformUrl(value) {
  let url;
  try {
    url = new URL(String(value).trim());
  } catch {
    throw new RecordingError('INVALID_PLATFORM_URL', '平台地址必须是有效的 HTTP 或 HTTPS 地址');
  }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new RecordingError('INVALID_PLATFORM_URL', '平台地址必须是有效的 HTTP 或 HTTPS 地址');
  }
  return url.toString().replace(/\/+$/, '');
}

export function normalizeRecordCode(value) {
  const raw = String(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!/^[A-HJ-NP-Z2-9]{8}$/.test(raw)) {
    throw new RecordingError('INVALID_RECORD_CODE', '请输入 8 位录制码');
  }
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
}

export function resolvePortablePaths(rootDir) {
  const root = path.resolve(rootDir);
  return {
    root,
    nodeExecutable: path.resolve(root, 'runtime', 'node.exe'),
    playwrightCli: path.resolve(root, 'app', 'node_modules', 'playwright', 'cli.js'),
    browserPath: path.resolve(root, 'browsers'),
    recordingsDir: path.resolve(root, 'data', 'recordings'),
    pendingDir: path.resolve(root, 'data', 'pending')
  };
}

async function responseBody(response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

export async function resolveRecording({ platform, code, fetchImpl = fetch }) {
  const response = await fetchImpl(`${normalizePlatformUrl(platform)}/api/recordings/resolve`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ code: normalizeRecordCode(code) })
  });
  const body = await responseBody(response);
  if (!response.ok) {
    throw new RecordingError('RESOLVE_FAILED', body.message || `解析录制码失败 (${response.status})`, {
      status: response.status
    });
  }
  return body;
}

export async function runCodegen({
  nodeExecutable,
  playwrightCli,
  browserPath,
  outputPath,
  startUrl,
  cwd,
  spawnImpl = spawn,
  stdio = 'inherit'
}) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  const env = {
    ...process.env,
    JMOM_BASE_URL: startUrl.replace(/#.*$/, '').replace(/\/+$/, '')
  };
  if (browserPath) env.PLAYWRIGHT_BROWSERS_PATH = browserPath;

  const child = spawnImpl(nodeExecutable, [
    playwrightCli,
    'codegen',
    '--target',
    'javascript',
    '-o',
    outputPath,
    startUrl
  ], {
    cwd,
    stdio,
    env
  });
  const exitCode = await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('close', (code) => resolve(code ?? 1));
  });
  return { exitCode, outputExists: existsSync(outputPath) };
}

export async function uploadRecording({ platform, id, token, filePath, fetchImpl = fetch }) {
  const form = new FormData();
  form.append('token', token);
  form.append('file', new Blob([await readFile(filePath)], { type: 'text/javascript' }), path.basename(filePath));
  const response = await fetchImpl(`${normalizePlatformUrl(platform)}/api/recordings/${id}/upload`, {
    method: 'POST',
    body: form
  });
  const body = await responseBody(response);
  if (!response.ok) {
    throw new RecordingError('UPLOAD_FAILED', body.message || `上传失败 (${response.status})`, {
      status: response.status,
      filePath
    });
  }
  return body;
}

export async function runRecording({
  platform,
  code,
  recording,
  paths,
  outputPath,
  fetchImpl = fetch,
  spawnImpl = spawn,
  emit = () => {},
  codegenStdio = 'inherit',
  deleteOnSuccess = false
}) {
  const resolved = recording || await resolveRecording({ platform, code, fetchImpl });
  const scriptPath = path.resolve(outputPath || path.join(paths.recordingsDir, `${resolved.id}.spec.js`));

  emit({ type: 'status', stage: 'recording', message: 'Playwright Inspector 已启动' });
  const generated = await runCodegen({
    nodeExecutable: paths.nodeExecutable,
    playwrightCli: paths.playwrightCli,
    browserPath: paths.browserPath,
    outputPath: scriptPath,
    startUrl: resolved.startUrl,
    cwd: paths.root,
    spawnImpl,
    stdio: codegenStdio
  });
  if (!generated.outputExists) {
    throw new RecordingError('RECORDING_CANCELLED', '未生成脚本，录制已取消', {
      exitCode: generated.exitCode
    });
  }

  emit({ type: 'status', stage: 'uploading', message: '正在上传录制脚本' });
  const result = await uploadRecording({
    platform,
    id: resolved.id,
    token: resolved.token,
    filePath: scriptPath,
    fetchImpl
  });
  if (deleteOnSuccess) await rm(scriptPath, { force: true });
  emit({ type: 'completed', stage: 'finished', message: '录制脚本已上传', result });
  return result;
}
