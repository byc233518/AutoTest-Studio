import { spawn } from 'node:child_process';
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { buildPlaywrightCliArgs } from './execution-mode.mjs';

function now() {
  return new Date().toISOString();
}

function artifactUrl(runId, fileName) {
  return `/api/runs/${runId}/report-file/${encodeURIComponent(fileName)}`;
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function escapeXml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function isSkippedOnly(summary = {}) {
  return Number(summary.total || 0) > 0 && Number(summary.skipped || 0) === Number(summary.total || 0);
}

function finalRunStatus(exitCode, summary = {}) {
  if (exitCode && exitCode !== 0) return 'failed';
  if (isSkippedOnly(summary)) return 'skipped';
  return 'passed';
}

function finalStepMessage(status) {
  if (status === 'failed') return '执行失败，请查看报告和 Trace';
  if (status === 'skipped') return '本次用例全部跳过，未产生浏览器画面';
  return '执行完成，报告已生成';
}

function finishStepsByStatus(steps = [], status) {
  if (status === 'failed') return finishRunningSteps(steps, 'failed');
  return completeAllSteps(markStepRunning(steps, 'report'), status);
}

function initialProcessState(run, scenario, dataset) {
  return {
    runId: run.id,
    scenarioName: scenario.name,
    datasetName: dataset.name,
    executionMode: run.execution_mode || 'headless',
    status: 'running',
    canWatchLive: run.execution_mode === 'ui',
    livePreviewUrl: run.execution_mode === 'ui' ? `/api/runs/${run.id}/live` : null,
    latestScreenshotUrl: null,
    videoReplayUrl: null,
    videoFileUrl: null,
    currentStep: '准备执行',
    startedAt: now(),
    updatedAt: now(),
    steps: [
      { id: 'prepare', title: '读取样本数据', status: 'running', startedAt: now() },
      { id: 'browser', title: '启动浏览器并打开测试环境', status: 'pending' },
      { id: 'scenario', title: `执行场景：${scenario.name}`, status: 'pending' },
      { id: 'report', title: '整理截图、录像和报告', status: 'pending' }
    ]
  };
}

async function writeRunProcess(reportDir, state) {
  await mkdir(reportDir, { recursive: true });
  await writeFile(
    path.resolve(reportDir, 'process.json'),
    `${JSON.stringify({ ...state, updatedAt: now() }, null, 2)}\n`,
    'utf8'
  );
}

async function updateRunProcess(reportDir, patch) {
  const current = await readJson(path.resolve(reportDir, 'process.json'), {});
  await writeRunProcess(reportDir, { ...current, ...patch });
}

function markStepRunning(steps, id) {
  return steps.map((step) => {
    if (step.id === id) return { ...step, status: 'running', startedAt: step.startedAt || now() };
    if (step.status === 'running') return { ...step, status: 'passed', finishedAt: now() };
    return step;
  });
}

function finishRunningSteps(steps, status) {
  return steps.map((step) => {
    if (step.status === 'running') return { ...step, status, finishedAt: now() };
    return step;
  });
}

function completeAllSteps(steps, status = 'passed') {
  return steps.map((step) => ({
    ...step,
    status: step.status === 'pending' || step.status === 'running' ? status : step.status,
    finishedAt: step.finishedAt || now()
  }));
}

function delay(ms) {
  return ms ? new Promise((resolve) => setTimeout(resolve, ms)) : Promise.resolve();
}

export function createRun(database, input) {
  return database.createRun({
    id: database.nextId('RUN'),
    scenarioId: input.scenario.id,
    datasetId: input.dataset.id,
    environment: input.environment,
    executionMode: input.executionMode,
    executionLocation: input.executionLocation || 'server',
    status: 'queued',
    triggeredBy: input.triggeredBy,
    summary: {}
  });
}

async function writeMockScreenshot(reportDir, scenario, text) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
  <rect width="960" height="540" fill="#f6f8ff"/>
  <rect x="56" y="56" width="848" height="428" rx="16" fill="#fff" stroke="#d9e1de"/>
  <rect x="96" y="104" width="220" height="42" rx="10" fill="#7c3aed"/>
  <text x="116" y="132" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#fff">JMOM UI Runner</text>
  <text x="96" y="198" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#16201d">${scenario.name}</text>
  <text x="96" y="252" font-family="Arial, sans-serif" font-size="22" fill="#167c68">${text}</text>
  <text x="96" y="306" font-family="Arial, sans-serif" font-size="18" fill="#667085">这里模拟实时浏览器画面；真实 Playwright 执行会显示运行中截图。</text>
</svg>
`;
  await writeFile(path.resolve(reportDir, 'live-latest.svg'), svg, 'utf8');
  await writeFile(path.resolve(reportDir, 'screenshot.svg'), svg, 'utf8');
}

async function writeMockReport(app, run, scenario, dataset, reportDir) {
  await mkdir(reportDir, { recursive: true });
  const rows = JSON.parse(await readFile(dataset.rows_path, 'utf8'));
  const stepDelay = app.locals.mockRunStepDelayMs || 0;
  let processState = await readJson(path.resolve(reportDir, 'process.json'), initialProcessState(run, scenario, dataset));

  for (const [stepId, label] of [
    ['prepare', `读取样本数据：${rows.length} 行`],
    ['browser', '启动浏览器并打开测试环境'],
    ['scenario', `执行场景：${scenario.name}`]
  ]) {
    processState = { ...processState, steps: markStepRunning(processState.steps, stepId), currentStep: label };
    await writeMockScreenshot(reportDir, scenario, label);
    await writeRunProcess(reportDir, {
      ...processState,
      latestScreenshotUrl: artifactUrl(run.id, 'live-latest.svg')
    });
    await delay(stepDelay);
  }

  const summary = {
    total: rows.length,
    passed: rows.length,
    failed: 0,
    skipped: 0,
    scenario: scenario.name,
    generatedAt: now()
  };
  await writeFile(path.resolve(reportDir, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  await writeFile(path.resolve(reportDir, 'index.html'), `<!doctype html>
<html lang="zh-CN">
<meta charset="utf-8">
<title>${scenario.name} - 执行报告</title>
<body>
  <h1>${scenario.name}</h1>
  <p>样本数据：${dataset.name}</p>
  <p>通过：${summary.passed} / ${summary.total}</p>
  <p>过程资产：截图、录像回放、HTML 报告。</p>
</body>
</html>
`, 'utf8');
  await writeFile(path.resolve(reportDir, 'replay.html'), `<!doctype html>
<html lang="zh-CN">
<meta charset="utf-8">
<title>${scenario.name} - 录像回放</title>
<body>
  <h1>${scenario.name} - 录像回放</h1>
  <p>Mock Runner 使用过程截图模拟回放；真实 Playwright 执行会在这里播放 video.webm。</p>
  <img src="./screenshot.svg" alt="过程截图" style="max-width:100%;border:1px solid #ddd;border-radius:8px" />
</body>
</html>
`, 'utf8');

  processState = await readJson(path.resolve(reportDir, 'process.json'), processState);
  await writeRunProcess(reportDir, {
    ...processState,
    status: 'passed',
    currentStep: '执行完成，报告已生成',
    finishedAt: now(),
    latestScreenshotUrl: artifactUrl(run.id, 'screenshot.svg'),
    videoReplayUrl: artifactUrl(run.id, 'replay.html'),
    steps: completeAllSteps(markStepRunning(processState.steps, 'report'), 'passed')
  });

  return { reportDir, summary, exitCode: 0, status: 'passed' };
}

async function listFilesRecursive(rootDir, dir = rootDir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const filePath = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      await listFilesRecursive(rootDir, filePath, files);
    } else {
      files.push(filePath);
    }
  }
  return files;
}

async function copyIfExists(source, target) {
  if (source && existsSync(source) && path.resolve(source) !== path.resolve(target)) {
    await copyFile(source, target);
  }
}

async function writeFallbackScreenshot(reportDir, summary = {}, processState = {}) {
  const title = processState.scenarioName || summary.scenario || 'JMOM 自动化测试';
  const reason = isSkippedOnly(summary) ? '未产生浏览器画面' : '未采集到截图，展示执行摘要';
  const tests = Array.isArray(summary.tests) ? summary.tests.slice(0, 5) : [];
  const rows = tests.length
    ? tests.map((item, index) => `
      <text x="96" y="${330 + index * 32}" font-family="Arial,'Microsoft YaHei',sans-serif" font-size="17" fill="#344054">${escapeXml(item.status || '-')} · ${escapeXml(item.title || '')}</text>`).join('')
    : '<text x="96" y="330" font-family="Arial,\'Microsoft YaHei\',sans-serif" font-size="17" fill="#667085">暂无测试明细</text>';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
  <rect width="960" height="540" fill="#f6f8ff"/>
  <rect x="56" y="56" width="848" height="428" rx="16" fill="#fff" stroke="#d9e1de"/>
  <rect x="96" y="104" width="210" height="42" rx="10" fill="#7c3aed"/>
  <text x="116" y="132" font-family="Arial,'Microsoft YaHei',sans-serif" font-size="18" font-weight="700" fill="#fff">JMOM Runner</text>
  <text x="96" y="198" font-family="Arial,'Microsoft YaHei',sans-serif" font-size="32" font-weight="700" fill="#16201d">${escapeXml(title)}</text>
  <text x="96" y="248" font-family="Arial,'Microsoft YaHei',sans-serif" font-size="22" font-weight="700" fill="#b54708">${escapeXml(reason)}</text>
  <text x="96" y="292" font-family="Arial,'Microsoft YaHei',sans-serif" font-size="18" fill="#667085">总数 ${summary.total ?? 0} · 通过 ${summary.passed ?? 0} · 失败 ${summary.failed ?? 0} · 跳过 ${summary.skipped ?? 0}</text>
  ${rows}
</svg>
`;
  await writeFile(path.resolve(reportDir, 'screenshot.svg'), svg, 'utf8');
}

export async function ensureProcessFallbackScreenshot(reportDir, summary = {}, processState = {}) {
  if (!existsSync(path.resolve(reportDir, 'screenshot.png')) && !existsSync(path.resolve(reportDir, 'screenshot.svg'))) {
    await writeFallbackScreenshot(reportDir, summary, processState);
  }
}

function replayFallbackHtml(summary = {}) {
  const tests = Array.isArray(summary.tests) ? summary.tests.slice(0, 8) : [];
  const list = tests.length
    ? `<ol>${tests.map((item) => `<li><strong>${escapeXml(item.status || '-')}</strong> ${escapeXml(item.title || '')}</li>`).join('')}</ol>`
    : '<p>暂无测试明细。</p>';
  return `<div style="display:grid;gap:16px">
      <p>本次执行未生成浏览器录像，可以查看下方执行摘要、截图占位图和 HTML 报告。</p>
      <img src="./screenshot.svg" alt="执行摘要截图" style="width:100%;max-height:62vh;object-fit:contain;background:#fff;border-radius:8px" />
      <section style="background:#fff;color:#101828;border-radius:8px;padding:14px">
        <h2 style="font-size:16px;margin:0 0 8px">测试步骤</h2>
        ${list}
      </section>
    </div>`;
}

async function preparePlayableArtifacts(reportDir) {
  const files = await listFilesRecursive(reportDir);
  const htmlReport = path.resolve(reportDir, 'html', 'index.html');
  if (existsSync(htmlReport)) {
    await copyIfExists(htmlReport, path.resolve(reportDir, 'index.html'));
  }

  const screenshots = files.filter((file) => /\.(png|jpe?g|svg)$/i.test(file) && !file.endsWith('live-latest.svg'));
  const livePng = path.resolve(reportDir, 'live-latest.png');
  const screenshotSource = existsSync(livePng) ? livePng : screenshots[0];
  if (screenshotSource) {
    await copyIfExists(screenshotSource, path.resolve(reportDir, `screenshot${path.extname(screenshotSource)}`));
  }
  const summary = await readJson(path.resolve(reportDir, 'summary.json'), {});
  const processState = await readJson(path.resolve(reportDir, 'process.json'), {});
  await ensureProcessFallbackScreenshot(reportDir, summary, processState);

  const videoSource = files.find((file) => /\.webm$/i.test(file));
  if (videoSource) {
    await copyIfExists(videoSource, path.resolve(reportDir, 'video.webm'));
  }

  const traceSource = files.find((file) => /\.zip$/i.test(file));
  if (traceSource) {
    await copyIfExists(traceSource, path.resolve(reportDir, 'trace.zip'));
  }

  const hasVideo = existsSync(path.resolve(reportDir, 'video.webm'));
  await writeFile(path.resolve(reportDir, 'replay.html'), `<!doctype html>
<html lang="zh-CN">
<meta charset="utf-8">
<title>录像回放</title>
<body style="margin:0;background:#101828;color:#fff;font-family:Arial,'Microsoft YaHei',sans-serif">
  <main style="padding:20px">
    <h1 style="font-size:20px">录像回放</h1>
    ${hasVideo
      ? '<video src="./video.webm" controls autoplay muted style="width:100%;max-height:78vh;background:#000;border-radius:8px"></video>'
      : replayFallbackHtml(summary)}
  </main>
</body>
</html>
`, 'utf8');
}

function createArtifactRecords(database, runId, reportDir) {
  const candidates = [
    { type: 'html-report', label: 'HTML 报告', fileName: 'index.html' },
    { type: 'screenshot', label: '过程截图', fileName: 'screenshot.png' },
    { type: 'screenshot', label: '过程截图', fileName: 'screenshot.svg' },
    { type: 'video', label: '录像回放', fileName: 'replay.html' },
    { type: 'video-file', label: '录像文件', fileName: 'video.webm' },
    { type: 'trace', label: 'Trace 调试包', fileName: 'trace.zip' }
  ];
  const created = new Set();
  for (const artifact of candidates) {
    if (created.has(artifact.type) || !existsSync(path.resolve(reportDir, artifact.fileName))) continue;
    created.add(artifact.type);
    database.createRunArtifact({
      id: database.nextId('ART'),
      runId,
      type: artifact.type,
      label: artifact.label,
      fileName: artifact.fileName,
      filePath: path.resolve(reportDir, artifact.fileName),
      url: artifactUrl(runId, artifact.fileName)
    });
  }
}

async function executePlaywright(app, run, scenario, dataset, reportDir) {
  await mkdir(reportDir, { recursive: true });
  const environment = app.locals.database.getEnvironmentByKey(run.environment)
    || app.locals.database.getDefaultEnvironment();
  const env = {
    ...process.env,
    JMOM_RUN_ID: run.id,
    JMOM_SCENARIO_KEY: scenario.key,
    JMOM_DATASET_PATH: dataset.rows_path,
    JMOM_RESULT_DIR: reportDir,
    JMOM_PROCESS_FILE: path.resolve(reportDir, 'process.json'),
    JMOM_EXECUTION_MODE: run.execution_mode || 'headless',
    JMOM_RECORD_EVIDENCE: '1',
    ...(environment ? {
      JMOM_BASE_URL: environment.base_url,
      JMOM_USERNAME: environment.username,
      JMOM_PASSWORD: environment.password
    } : {})
  };
  const child = spawn(process.execPath, [
    path.resolve(app.locals.paths.workspaceRoot, 'scripts', 'run-tests.mjs'),
    scenario.script_entry,
    ...buildPlaywrightCliArgs(run.execution_mode)
  ], {
    cwd: app.locals.paths.workspaceRoot,
    env,
    stdio: app.locals.silent ? 'ignore' : 'inherit'
  });
  const exitCode = await new Promise((resolve) => child.on('close', resolve));
  await preparePlayableArtifacts(reportDir);
  const summaryPath = path.resolve(reportDir, 'summary.json');
  const summary = JSON.parse(await readFile(summaryPath, 'utf8').catch(() => '{}'));
  const processState = await readJson(path.resolve(reportDir, 'process.json'), initialProcessState(run, scenario, dataset));
  const screenshotFile = existsSync(path.resolve(reportDir, 'screenshot.png')) ? 'screenshot.png' : 'screenshot.svg';
  const status = finalRunStatus(exitCode, summary);

  await writeRunProcess(reportDir, {
    ...processState,
    status,
    currentStep: finalStepMessage(status),
    finishedAt: now(),
    latestScreenshotUrl: existsSync(path.resolve(reportDir, screenshotFile)) ? artifactUrl(run.id, screenshotFile) : processState.latestScreenshotUrl,
    videoReplayUrl: existsSync(path.resolve(reportDir, 'replay.html')) ? artifactUrl(run.id, 'replay.html') : null,
    videoFileUrl: existsSync(path.resolve(reportDir, 'video.webm')) ? artifactUrl(run.id, 'video.webm') : null,
    steps: finishStepsByStatus(processState.steps || [], status)
  });

  return { reportDir, summary, exitCode, status };
}

export async function executeRun(app, runId) {
  const database = app.locals.database;
  const run = database.getRunById(runId);
  const scenario = database.getScenarioById(run.scenario_id);
  const dataset = database.getDatasetById(run.dataset_id);
  const reportDir = path.resolve(app.locals.paths.reportsDir, run.id);
  await mkdir(reportDir, { recursive: true });
  await writeRunProcess(reportDir, initialProcessState(run, scenario, dataset));
  database.updateRun(runId, { status: 'running', startedAt: now(), reportPath: reportDir });

  try {
    const result = app.locals.runMode === 'mock'
      ? await writeMockReport(app, run, scenario, dataset, reportDir)
      : await executePlaywright(app, run, scenario, dataset, reportDir);
    database.updateRun(runId, {
      status: result.status || finalRunStatus(result.exitCode, result.summary),
      finishedAt: now(),
      summary: result.summary,
      reportPath: result.reportDir
    });
    createArtifactRecords(database, runId, result.reportDir);
  } catch (error) {
    await updateRunProcess(reportDir, {
      status: 'failed',
      currentStep: '执行异常',
      finishedAt: now(),
      error: error.message
    });
    database.updateRun(runId, {
      status: 'failed',
      finishedAt: now(),
      summary: {},
      reportPath: reportDir,
      error: error.message
    });
  }
}

export async function initializeLocalRun(app, runId) {
  const database = app.locals.database;
  const run = database.getRunById(runId);
  const scenario = database.getScenarioById(run.scenario_id);
  const dataset = database.getDatasetById(run.dataset_id);
  const reportDir = path.resolve(app.locals.paths.reportsDir, run.id);
  const state = initialProcessState(run, scenario, dataset);
  await writeRunProcess(reportDir, {
    ...state,
    executionLocation: 'local',
    status: 'queued',
    currentStep: '等待测试人员在本地测试工具中输入执行码',
    steps: state.steps.map((step) => ({ ...step, status: 'pending', startedAt: undefined }))
  });
  database.updateRun(runId, { reportPath: reportDir });
  return reportDir;
}

export async function markLocalRunStarted(app, runId) {
  const database = app.locals.database;
  const run = database.getRunById(runId);
  if (!run) throw new Error('执行任务不存在');
  const reportDir = run.report_path || path.resolve(app.locals.paths.reportsDir, run.id);
  const processState = await readJson(path.resolve(reportDir, 'process.json'), {});
  await writeRunProcess(reportDir, {
    ...processState,
    executionLocation: 'local',
    status: 'running',
    currentStep: '本地测试工具已领取任务，正在准备执行',
    startedAt: processState.startedAt || now(),
    steps: markStepRunning(processState.steps || [], 'prepare')
  });
  database.updateRun(runId, { status: 'running', startedAt: now(), reportPath: reportDir });
  return reportDir;
}

export async function completeLocalRun(app, runId, { exitCode = 1, error = '' } = {}) {
  const database = app.locals.database;
  const run = database.getRunById(runId);
  if (!run) throw new Error('执行任务不存在');
  const reportDir = run.report_path || path.resolve(app.locals.paths.reportsDir, run.id);
  await preparePlayableArtifacts(reportDir);
  const summary = await readJson(path.resolve(reportDir, 'summary.json'), {});
  const processState = await readJson(path.resolve(reportDir, 'process.json'), {});
  const status = error ? 'failed' : finalRunStatus(Number(exitCode), summary);
  const screenshotFile = existsSync(path.resolve(reportDir, 'screenshot.png')) ? 'screenshot.png' : 'screenshot.svg';
  await writeRunProcess(reportDir, {
    ...processState,
    executionLocation: 'local',
    status,
    currentStep: error ? '本地执行异常' : finalStepMessage(status),
    finishedAt: now(),
    error: error || null,
    latestScreenshotUrl: existsSync(path.resolve(reportDir, screenshotFile)) ? artifactUrl(run.id, screenshotFile) : null,
    videoReplayUrl: existsSync(path.resolve(reportDir, 'replay.html')) ? artifactUrl(run.id, 'replay.html') : null,
    videoFileUrl: existsSync(path.resolve(reportDir, 'video.webm')) ? artifactUrl(run.id, 'video.webm') : null,
    steps: finishStepsByStatus(processState.steps || [], status)
  });
  database.updateRun(runId, {
    status,
    finishedAt: now(),
    summary,
    reportPath: reportDir,
    error: error || null
  });
  createArtifactRecords(database, runId, reportDir);
  return database.getRunById(runId);
}
