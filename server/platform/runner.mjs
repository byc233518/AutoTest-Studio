import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { buildPlaywrightCliArgs } from './execution-mode.mjs';

function now() {
  return new Date().toISOString();
}

export function createRun(database, input) {
  return database.createRun({
    id: database.nextId('RUN'),
    scenarioId: input.scenario.id,
    datasetId: input.dataset.id,
    environment: input.environment,
    executionMode: input.executionMode,
    status: 'queued',
    triggeredBy: input.triggeredBy,
    summary: {}
  });
}

async function writeMockReport(app, run, scenario, dataset) {
  const reportDir = path.resolve(app.locals.paths.reportsDir, run.id);
  await mkdir(reportDir, { recursive: true });
  const rows = JSON.parse(await readFile(dataset.rows_path, 'utf8'));
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
  await writeFile(path.resolve(reportDir, 'screenshot.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
  <rect width="960" height="540" fill="#f6f7f9"/>
  <rect x="56" y="56" width="848" height="428" rx="12" fill="#fff" stroke="#d9e1de"/>
  <text x="96" y="130" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#16201d">${scenario.name}</text>
  <text x="96" y="184" font-family="Arial, sans-serif" font-size="22" fill="#167c68">Mock 执行通过：${summary.passed}/${summary.total}</text>
  <text x="96" y="236" font-family="Arial, sans-serif" font-size="18" fill="#6a7671">真实执行时这里对应 Playwright 截图或关键步骤截图。</text>
</svg>
`, 'utf8');
  await writeFile(path.resolve(reportDir, 'replay.html'), `<!doctype html>
<html lang="zh-CN">
<meta charset="utf-8">
<title>${scenario.name} - 录像回放</title>
<body>
  <h1>${scenario.name} - 录像回放</h1>
  <p>Mock Runner 不产生真实视频。真实 Playwright 执行时可在这里查看 video/trace。</p>
</body>
</html>
`, 'utf8');
  return { reportDir, summary };
}

function createArtifactRecords(database, runId, reportDir) {
  for (const artifact of [
    { type: 'html-report', label: 'HTML 报告', fileName: 'index.html' },
    { type: 'screenshot', label: '过程截图', fileName: 'screenshot.svg' },
    { type: 'video', label: '录像回放', fileName: 'replay.html' }
  ]) {
    database.createRunArtifact({
      id: database.nextId('ART'),
      runId,
      type: artifact.type,
      label: artifact.label,
      fileName: artifact.fileName,
      filePath: path.resolve(reportDir, artifact.fileName),
      url: `/api/runs/${runId}/report-file/${artifact.fileName}`
    });
  }
}

async function executePlaywright(app, run, scenario, dataset) {
  const reportDir = path.resolve(app.locals.paths.reportsDir, run.id);
  await mkdir(reportDir, { recursive: true });
  const env = {
    ...process.env,
    JMOM_SCENARIO_KEY: scenario.key,
    JMOM_DATASET_PATH: dataset.rows_path,
    JMOM_RESULT_DIR: reportDir
  };
  const child = spawn(process.execPath, [
    path.resolve(app.locals.paths.workspaceRoot, 'scripts', 'run-tests.mjs'),
    ...buildPlaywrightCliArgs(run.execution_mode)
  ], {
    cwd: app.locals.paths.workspaceRoot,
    env,
    stdio: app.locals.silent ? 'ignore' : 'inherit'
  });
  const exitCode = await new Promise((resolve) => child.on('close', resolve));
  const summaryPath = path.resolve(reportDir, 'summary.json');
  const summary = JSON.parse(await readFile(summaryPath, 'utf8').catch(() => '{}'));
  return { reportDir, summary, exitCode };
}

export async function executeRun(app, runId) {
  const database = app.locals.database;
  const run = database.getRunById(runId);
  const scenario = database.getScenarioById(run.scenario_id);
  const dataset = database.getDatasetById(run.dataset_id);
  database.updateRun(runId, { status: 'running', startedAt: now() });
  try {
    const result = app.locals.runMode === 'mock'
      ? await writeMockReport(app, run, scenario, dataset)
      : await executePlaywright(app, run, scenario, dataset);
    database.updateRun(runId, {
      status: result.exitCode && result.exitCode !== 0 ? 'failed' : 'passed',
      finishedAt: now(),
      summary: result.summary,
      reportPath: result.reportDir
    });
    createArtifactRecords(database, runId, result.reportDir);
  } catch (error) {
    database.updateRun(runId, {
      status: 'failed',
      finishedAt: now(),
      summary: {},
      error: error.message
    });
  }
}
