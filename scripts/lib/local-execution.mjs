import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { RecordingError, normalizePlatformUrl, normalizeRecordCode } from './local-recording.mjs';

async function responseBody(response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

export function resolvePortableExecutionPaths(rootDir) {
  const root = path.resolve(rootDir);
  return {
    root,
    nodeExecutable: path.resolve(root, 'runtime', 'node.exe'),
    playwrightCli: path.resolve(root, 'app', 'node_modules', 'playwright', 'cli.js'),
    browserPath: path.resolve(root, 'browsers'),
    workspacesDir: path.resolve(root, 'app', '.local-runs'),
    resultsDir: path.resolve(root, 'data', 'runs')
  };
}

export async function resolveLocalExecution({ platform, code, fetchImpl = fetch }) {
  const response = await fetchImpl(`${normalizePlatformUrl(platform)}/api/local-runs/resolve`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ code: normalizeRecordCode(code) })
  });
  const body = await responseBody(response);
  if (!response.ok) {
    throw new RecordingError('EXECUTION_RESOLVE_FAILED', body.message || `解析执行码失败 (${response.status})`, {
      status: response.status
    });
  }
  return body;
}

function safeBundlePath(workspaceDir, relativePath) {
  const normalized = String(relativePath || '').replaceAll('\\', '/').replace(/^\/+/, '');
  if (!normalized || normalized.split('/').includes('..')) {
    throw new RecordingError('INVALID_EXECUTION_BUNDLE', '执行包包含无效文件路径');
  }
  const target = path.resolve(workspaceDir, ...normalized.split('/'));
  const relative = path.relative(workspaceDir, target);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new RecordingError('INVALID_EXECUTION_BUNDLE', '执行包包含无效文件路径');
  }
  return target;
}

function playwrightConfigSource(resultDir) {
  return `const { defineConfig, devices } = require('@playwright/test');
const path = require('node:path');

module.exports = defineConfig({
  testDir: path.resolve(__dirname),
  timeout: 90000,
  expect: { timeout: 20000 },
  fullyParallel: false,
  workers: 1,
  outputDir: ${JSON.stringify(path.resolve(resultDir, 'artifacts'))},
  reporter: [
    ['list'],
    ['json', { outputFile: ${JSON.stringify(path.resolve(resultDir, 'results.json'))} }],
    ['html', { outputFolder: ${JSON.stringify(path.resolve(resultDir, 'html'))}, open: 'never' }]
  ],
  use: {
    baseURL: process.env.JMOM_BASE_URL,
    actionTimeout: 20000,
    navigationTimeout: 45000,
    screenshot: 'on',
    trace: 'retain-on-failure',
    video: 'on',
    viewport: { width: 1920, height: 1080 }
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});
`;
}

export async function prepareExecutionWorkspace(task, paths) {
  const workspaceDir = path.resolve(paths.workspacesDir, task.runId);
  const resultDir = path.resolve(paths.resultsDir, task.runId);
  await rm(workspaceDir, { recursive: true, force: true });
  await rm(resultDir, { recursive: true, force: true });
  await Promise.all([mkdir(workspaceDir, { recursive: true }), mkdir(resultDir, { recursive: true })]);

  for (const file of task.files || []) {
    const target = safeBundlePath(workspaceDir, file.path);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, file.content || '', 'utf8');
  }
  const datasetPath = path.resolve(workspaceDir, 'dataset.json');
  const configPath = path.resolve(workspaceDir, 'playwright.config.cjs');
  await writeFile(datasetPath, `${JSON.stringify(task.rows || [], null, 2)}\n`, 'utf8');
  await writeFile(configPath, playwrightConfigSource(resultDir), 'utf8');

  const scriptPath = safeBundlePath(workspaceDir, task.scriptEntry);
  if (!existsSync(scriptPath)) {
    throw new RecordingError('INVALID_EXECUTION_BUNDLE', '执行脚本未包含在执行包中');
  }
  return { workspaceDir, resultDir, datasetPath, configPath, scriptPath };
}

export async function runPlaywrightTask({ task, paths, workspace, spawnImpl = spawn }) {
  const scriptArgument = path.relative(workspace.workspaceDir, workspace.scriptPath).replaceAll('\\', '/');
  const env = {
    ...process.env,
    PLAYWRIGHT_BROWSERS_PATH: paths.browserPath,
    JMOM_RUN_ID: task.runId,
    JMOM_SCENARIO_KEY: task.scenarioKey,
    JMOM_DATASET_PATH: workspace.datasetPath,
    JMOM_RESULT_DIR: workspace.resultDir,
    JMOM_BASE_URL: task.environment.baseUrl,
    JMOM_USERNAME: task.environment.username,
    JMOM_PASSWORD: task.environment.password,
    JMOM_DATA_TAG: new Date().toISOString().replace(/\D/g, '').slice(2, 14)
  };
  const args = [
    paths.playwrightCli,
    'test',
    scriptArgument,
    '--config',
    workspace.configPath
  ];
  if (task.executionMode !== 'headless') args.push('--headed');
  const child = spawnImpl(paths.nodeExecutable, args, {
    cwd: workspace.workspaceDir,
    env,
    stdio: 'inherit'
  });
  return new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('close', (code) => resolve(code ?? 1));
  });
}

function collectSpecs(suite, items = []) {
  for (const spec of suite.specs || []) {
    for (const item of spec.tests || []) {
      const result = item.results?.at(-1) || {};
      items.push({
        title: [...(suite.title ? [suite.title] : []), spec.title].join(' / '),
        project: item.projectName,
        expectedStatus: item.expectedStatus,
        status: result.status || item.status || 'unknown',
        durationMs: result.duration || 0,
        error: result.error?.message || result.errors?.[0]?.message || ''
      });
    }
  }
  for (const child of suite.suites || []) collectSpecs(child, items);
  return items;
}

export async function summarizeLocalResults(resultDir) {
  const raw = await readFile(path.resolve(resultDir, 'results.json'), 'utf8').catch(() => null);
  const tests = raw ? collectSpecs(JSON.parse(raw)) : [];
  const summary = {
    generatedAt: new Date().toISOString(),
    resultDir,
    total: tests.length,
    passed: tests.filter((item) => item.status === 'passed').length,
    failed: tests.filter((item) => ['failed', 'timedOut', 'interrupted'].includes(item.status)).length,
    skipped: tests.filter((item) => item.status === 'skipped').length,
    tests
  };
  await writeFile(path.resolve(resultDir, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  return summary;
}

async function listFiles(root, current = root, files = []) {
  for (const entry of await readdir(current, { withFileTypes: true })) {
    const target = path.resolve(current, entry.name);
    if (entry.isDirectory()) await listFiles(root, target, files);
    else files.push({ absolutePath: target, relativePath: path.relative(root, target).replaceAll('\\', '/') });
  }
  return files;
}

export async function uploadExecutionArtifact({ platform, runId, token, file, fetchImpl = fetch }) {
  const form = new FormData();
  form.append('token', token);
  form.append('path', file.relativePath);
  form.append('file', new Blob([await readFile(file.absolutePath)]), path.basename(file.absolutePath));
  const response = await fetchImpl(`${normalizePlatformUrl(platform)}/api/local-runs/${runId}/artifacts`, {
    method: 'POST',
    body: form
  });
  const body = await responseBody(response);
  if (!response.ok) {
    throw new RecordingError('EXECUTION_UPLOAD_FAILED', body.message || `上传执行结果失败 (${response.status})`, {
      status: response.status,
      filePath: file.absolutePath
    });
  }
  return body;
}

export async function finishLocalExecution({ platform, runId, token, exitCode, error = '', fetchImpl = fetch }) {
  const response = await fetchImpl(`${normalizePlatformUrl(platform)}/api/local-runs/${runId}/finish`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ token, exitCode, error })
  });
  const body = await responseBody(response);
  if (!response.ok) {
    throw new RecordingError('EXECUTION_FINISH_FAILED', body.message || `提交执行状态失败 (${response.status})`);
  }
  return body;
}

export async function runLocalExecution({
  platform,
  code,
  paths,
  fetchImpl = fetch,
  spawnImpl = spawn,
  emit = () => {}
}) {
  emit({ type: 'status', stage: 'resolving', message: '正在领取本地执行任务' });
  let task;
  let completed = false;
  try {
    task = await resolveLocalExecution({ platform, code, fetchImpl });
    emit({ type: 'status', stage: 'preparing', message: `正在准备场景：${task.scenarioName}` });
    const workspace = await prepareExecutionWorkspace(task, paths);
    emit({ type: 'status', stage: 'running', message: '正在本机运行 Playwright 场景' });
    const exitCode = await runPlaywrightTask({ task, paths, workspace, spawnImpl });
    await summarizeLocalResults(workspace.resultDir);
    emit({ type: 'status', stage: 'uploading', message: '正在上传执行报告、截图和录像' });
    const files = await listFiles(workspace.resultDir);
    for (const file of files) {
      await uploadExecutionArtifact({ platform, runId: task.runId, token: task.token, file, fetchImpl });
    }
    const result = await finishLocalExecution({ platform, runId: task.runId, token: task.token, exitCode, fetchImpl });
    completed = true;
    emit({
      type: 'completed',
      stage: 'finished',
      message: exitCode === 0 ? '本地场景执行完成，结果已上传' : '本地场景执行失败，报告已上传',
      result
    });
    return result;
  } catch (error) {
    if (task && !completed) {
      await finishLocalExecution({
        platform,
        runId: task.runId,
        token: task.token,
        exitCode: 1,
        error: error.message || '本地执行异常',
        fetchImpl
      }).catch(() => {});
    }
    throw error;
  }
}
