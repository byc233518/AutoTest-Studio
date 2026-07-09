import express from 'express';
import multer from 'multer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { createReadStream, existsSync } from 'node:fs';
import { createPlatformDatabase } from './platform/database.mjs';
import { seedPlatform } from './platform/seed.mjs';
import { parseDatasetFile, validateRows } from './platform/datasets.mjs';
import { createRun, ensureProcessFallbackScreenshot, executeRun, isSkippedOnly } from './platform/runner.mjs';
import { generateSampleRows, rowsToCsv } from './platform/sample-data.mjs';
import { publicLlmSetting } from './platform/settings.mjs';
import { normalizeExecutionMode } from './platform/execution-mode.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '..');
const publicDir = path.resolve(workspaceRoot, 'web');

function jsonError(response, status, message, extra = {}) {
  return response.status(status).json({ message, ...extra });
}

function sessionCookie(request) {
  const cookie = request.headers.cookie || '';
  const found = cookie.split(';').map((item) => item.trim()).find((item) => item.startsWith('jmom_session='));
  return found ? decodeURIComponent(found.split('=').slice(1).join('=')) : '';
}

function requireAuth(request, response, next) {
  const token = sessionCookie(request);
  const session = token ? request.app.locals.database.getSession(token) : null;
  if (!session) {
    return jsonError(response, 401, '请先登录');
  }
  request.user = session;
  return next();
}

function requireRole(...roles) {
  return (request, response, next) => {
    if (!roles.includes(request.user.role)) {
      return jsonError(response, 403, '当前账号没有权限执行该操作');
    }
    return next();
  };
}

function toPublicScenario(row) {
  return {
    id: row.id,
    key: row.key,
    name: row.name,
    projectId: row.project_id,
    appId: row.app_id,
    moduleId: row.module_id,
    module: row.module,
    priority: row.priority,
    status: row.status,
    version: row.version,
    owner: row.owner,
    description: row.description,
    scriptEntry: row.script_entry,
    dataSchema: JSON.parse(row.data_schema)
  };
}

function toPublicDataset(row) {
  return {
    id: row.id,
    scenarioId: row.scenario_id,
    name: row.name,
    fileName: row.file_name,
    rowCount: row.row_count,
    validationStatus: row.validation_status,
    uploadedBy: row.uploaded_by,
    createdAt: row.created_at,
    errors: JSON.parse(row.errors || '[]')
  };
}

function toPublicRun(row) {
  const summary = JSON.parse(row.summary || '{}');
  return {
    runId: row.id,
    scenarioId: row.scenario_id,
    datasetId: row.dataset_id,
    environment: row.environment,
    executionMode: row.execution_mode || 'headless',
    status: isSkippedOnly(summary) ? 'skipped' : row.status,
    triggeredBy: row.triggered_by,
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    summary,
    reportPath: row.report_path,
    error: row.error,
    processArtifacts: row.processArtifacts || []
  };
}

function toPublicApp(row) {
  return {
    id: row.id,
    key: row.key,
    name: row.name,
    description: row.description,
    sort: row.sort
  };
}

function toPublicModule(row) {
  return {
    id: row.id,
    appId: row.app_id,
    name: row.name,
    prefix: row.prefix,
    sort: row.sort
  };
}

function runWithArtifacts(database, run) {
  return {
    ...run,
    processArtifacts: database.listRunArtifacts(run.id).map((artifact) => ({
      id: artifact.id,
      type: artifact.type,
      label: artifact.label,
      fileName: artifact.file_name,
      url: artifact.url,
      previewUrl: artifact.url,
      createdAt: artifact.created_at
    }))
  };
}

function reportFileUrl(runId, fileName) {
  return `/api/runs/${runId}/report-file/${encodeURIComponent(fileName)}`;
}

async function readReportSummary(reportPath, run) {
  const fileSummary = await readFile(path.resolve(reportPath, 'summary.json'), 'utf8')
    .then((body) => JSON.parse(body))
    .catch(() => null);
  if (fileSummary) return fileSummary;
  try {
    return JSON.parse(run.summary || '{}');
  } catch {
    return {};
  }
}

function fileArtifact(runId, reportPath, artifact) {
  return {
    id: `${runId}:${artifact.type}`,
    type: artifact.type,
    label: artifact.label,
    fileName: artifact.fileName,
    url: reportFileUrl(runId, artifact.fileName),
    previewUrl: reportFileUrl(runId, artifact.fileName),
    createdAt: null
  };
}

async function processArtifacts(database, run, reportPath, summary, processState) {
  if (existsSync(reportPath)) {
    await ensureProcessFallbackScreenshot(reportPath, summary, processState);
  }

  const artifacts = runWithArtifacts(database, run).processArtifacts;
  const created = new Set(artifacts.map((artifact) => artifact.type));
  const candidates = [
    { type: 'html-report', label: 'HTML 报告', fileName: 'index.html' },
    { type: 'screenshot', label: '过程截图', fileName: 'screenshot.png' },
    { type: 'screenshot', label: '过程截图', fileName: 'screenshot.svg' },
    { type: 'video', label: '录像回放', fileName: 'replay.html' },
    { type: 'video-file', label: '录像文件', fileName: 'video.webm' },
    { type: 'trace', label: 'Trace 调试包', fileName: 'trace.zip' }
  ];

  for (const candidate of candidates) {
    if (created.has(candidate.type) || !existsSync(path.resolve(reportPath, candidate.fileName))) continue;
    created.add(candidate.type);
    artifacts.push(fileArtifact(run.id, reportPath, candidate));
  }

  return artifacts;
}

function evidenceStatus(summary, artifacts) {
  return {
    hasScreenshot: artifacts.some((artifact) => artifact.type === 'screenshot'),
    hasVideoReplay: artifacts.some((artifact) => artifact.type === 'video'),
    hasVideoFile: artifacts.some((artifact) => artifact.type === 'video-file'),
    hasTrace: artifacts.some((artifact) => artifact.type === 'trace'),
    hasHtmlReport: artifacts.some((artifact) => artifact.type === 'html-report'),
    skippedOnly: isSkippedOnly(summary)
  };
}

async function runProcessPayload(app, run) {
  const database = app.locals.database;
  const scenario = database.getScenarioById(run.scenario_id);
  const dataset = database.getDatasetById(run.dataset_id);
  const reportPath = run.report_path || path.resolve(app.locals.paths.reportsDir, run.id);
  const processPath = path.resolve(reportPath, 'process.json');
  let processState = {};
  try {
    processState = JSON.parse(await readFile(processPath, 'utf8'));
  } catch {
    processState = {};
  }

  const summary = await readReportSummary(reportPath, run);
  const artifacts = await processArtifacts(database, run, reportPath, summary, processState);
  const screenshot = artifacts.find((artifact) => artifact.type === 'screenshot');
  const replay = artifacts.find((artifact) => artifact.type === 'video');
  const videoFile = artifacts.find((artifact) => artifact.type === 'video-file');
  const evidence = evidenceStatus(summary, artifacts);
  const skippedOnly = evidence.skippedOnly;

  return {
    runId: run.id,
    scenarioId: run.scenario_id,
    datasetId: run.dataset_id,
    scenarioName: processState.scenarioName || scenario?.name || run.scenario_id,
    datasetName: processState.datasetName || dataset?.name || run.dataset_id,
    executionMode: run.execution_mode || 'headless',
    status: skippedOnly ? 'skipped' : processState.status || run.status,
    canWatchLive: (run.execution_mode || 'headless') === 'ui',
    livePreviewUrl: (run.execution_mode || 'headless') === 'ui' ? `/api/runs/${run.id}/live` : null,
    latestScreenshotUrl: processState.latestScreenshotUrl || screenshot?.previewUrl || null,
    videoReplayUrl: processState.videoReplayUrl || replay?.previewUrl || null,
    videoFileUrl: processState.videoFileUrl || videoFile?.previewUrl || null,
    currentStep: skippedOnly ? '本次用例全部跳过，未产生浏览器画面' : processState.currentStep || (run.status === 'queued' ? '等待 Runner 调度' : ''),
    startedAt: processState.startedAt || run.started_at,
    finishedAt: processState.finishedAt || run.finished_at,
    updatedAt: processState.updatedAt || run.finished_at || run.started_at || run.created_at,
    error: processState.error || run.error,
    steps: processState.steps || [],
    summary,
    resultTests: Array.isArray(summary.tests) ? summary.tests : [],
    evidence,
    artifacts
  };
}

export async function createApp(options = {}) {
  const dataDir = options.dataDir || path.resolve(workspaceRoot, 'platform-data');
  const uploadsDir = path.resolve(dataDir, 'uploads');
  const reportsDir = path.resolve(dataDir, 'reports');
  await mkdir(uploadsDir, { recursive: true });
  await mkdir(reportsDir, { recursive: true });

  const database = createPlatformDatabase(options.databasePath || path.resolve(dataDir, 'platform.sqlite'));
  seedPlatform(database);

  const app = express();
  const upload = multer({ dest: path.resolve(dataDir, 'tmp') });

  app.locals.database = database;
  app.locals.paths = { dataDir, uploadsDir, reportsDir, workspaceRoot };
  app.locals.runMode = options.runMode || process.env.JMOM_RUN_MODE || 'playwright';
  app.locals.silent = options.silent || false;
  app.locals.mockRunStepDelayMs = options.mockRunStepDelayMs || 0;

  app.use(express.json({ limit: '2mb' }));
  app.use('/reports', express.static(reportsDir));

  app.get('/api/health', (request, response) => {
    response.json({ ok: true, service: 'jmom-test-platform' });
  });

  app.post('/api/auth/login', (request, response) => {
    const { username, password } = request.body || {};
    const user = database.verifyUser(username, password);
    if (!user) {
      return jsonError(response, 401, '账号或密码错误');
    }
    const token = database.createSession(user.id);
    response.setHeader('set-cookie', `jmom_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax`);
    return response.json({ id: user.id, username: user.username, displayName: user.display_name, role: user.role });
  });

  app.post('/api/auth/logout', requireAuth, (request, response) => {
    database.deleteSession(sessionCookie(request));
    response.setHeader('set-cookie', 'jmom_session=; Path=/; Max-Age=0');
    response.json({ ok: true });
  });

  app.get('/api/me', requireAuth, (request, response) => {
    response.json({
      id: request.user.user_id,
      username: request.user.username,
      displayName: request.user.display_name,
      role: request.user.role
    });
  });

  app.get('/api/scenarios', requireAuth, (request, response) => {
    const project = database.getDefaultProject();
    const scenarios = database.listScenarios().map(toPublicScenario);
    response.json({ project, scenarios });
  });

  app.get('/api/apps', requireAuth, (request, response) => {
    response.json({ apps: database.listApps().map(toPublicApp) });
  });

  app.get('/api/modules', requireAuth, (request, response) => {
    response.json({ modules: database.listModules(request.query.appId).map(toPublicModule) });
  });

  app.get('/api/scenarios/:key/template.csv', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) {
      return jsonError(response, 404, '测试场景不存在');
    }
    const schema = JSON.parse(scenario.data_schema);
    const headers = schema.columns.join(',');
    const example = schema.example ? `\n${schema.columns.map((column) => schema.example[column] || '').join(',')}` : '';
    response.setHeader('content-type', 'text/csv; charset=utf-8');
    response.setHeader('content-disposition', `attachment; filename="${scenario.key}-template.csv"`);
    return response.send(`\uFEFF${headers}${example}\n`);
  });

  app.post('/api/scenarios/:key/sample-data', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) {
      return jsonError(response, 404, '测试场景不存在');
    }
    const schema = JSON.parse(scenario.data_schema);
    const rows = generateSampleRows(scenario, request.body?.count || 3);
    response.json({
      scenarioId: scenario.id,
      scenarioKey: scenario.key,
      columns: schema.columns,
      rows,
      csv: rowsToCsv(rows, schema.columns)
    });
  });

  app.get('/api/scenarios/:key/datasets', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) {
      return jsonError(response, 404, '测试场景不存在');
    }
    response.json(database.listDatasets(scenario.id).map(toPublicDataset));
  });

  app.post('/api/scenarios/:key/datasets', requireAuth, upload.single('file'), async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) {
        return jsonError(response, 404, '测试场景不存在');
      }
      if (!request.file) {
        return jsonError(response, 400, '请上传样本数据文件');
      }
      const schema = JSON.parse(scenario.data_schema);
      const parsed = await parseDatasetFile(request.file.path, request.file.originalname);
      const errors = validateRows(parsed.rows, schema);
      if (errors.length) {
        return jsonError(response, 422, '样本数据校验失败', { errors });
      }

      const datasetId = database.nextId('DS');
      const targetDir = path.resolve(app.locals.paths.uploadsDir, scenario.key);
      await mkdir(targetDir, { recursive: true });
      const storedName = `${datasetId}-${request.file.originalname}`;
      const storedPath = path.resolve(targetDir, storedName);
      await rename(request.file.path, storedPath);
      const rowsPath = path.resolve(targetDir, `${datasetId}.json`);
      await writeFile(rowsPath, `${JSON.stringify(parsed.rows, null, 2)}\n`, 'utf8');

      const dataset = database.createDataset({
        id: datasetId,
        scenarioId: scenario.id,
        name: request.body.name || request.file.originalname,
        fileName: request.file.originalname,
        filePath: storedPath,
        rowsPath,
        rowCount: parsed.rows.length,
        validationStatus: 'valid',
        uploadedBy: request.user.user_id,
        errors: []
      });
      return response.status(201).json(toPublicDataset(dataset));
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/scenarios/:key/publish', requireAuth, requireRole('maintainer', 'admin'), (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) {
      return jsonError(response, 404, '测试场景不存在');
    }
    response.json(toPublicScenario(database.updateScenarioStatus(scenario.id, 'published')));
  });

  app.post('/api/runs', requireAuth, async (request, response, next) => {
    try {
      const { scenarioId, datasetId, environment = 'test' } = request.body || {};
      let executionMode;
      try {
        executionMode = normalizeExecutionMode(request.body?.executionMode);
      } catch (error) {
        return jsonError(response, 400, error.message);
      }
      const scenario = database.getScenarioById(scenarioId);
      const dataset = database.getDatasetById(datasetId);
      if (!scenario || !dataset || dataset.scenario_id !== scenario.id) {
        return jsonError(response, 400, '场景或样本数据无效');
      }
      const run = createRun(database, {
        scenario,
        dataset,
        environment,
        executionMode,
        triggeredBy: request.user.user_id
      });
      response.status(202).json(toPublicRun(run));
      setImmediate(() => {
        executeRun(app, run.id).catch((error) => {
          if (!app.locals.silent) {
            console.error(error);
          }
        });
      });
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/runs', requireAuth, (request, response) => {
    response.json(database.listRuns().map((run) => toPublicRun(runWithArtifacts(database, run))));
  });

  app.get('/api/runs/:runId', requireAuth, (request, response) => {
    const run = database.getRunById(request.params.runId);
    if (!run) {
      return jsonError(response, 404, '执行记录不存在');
    }
    response.json(toPublicRun(runWithArtifacts(database, run)));
  });

  app.get('/api/runs/:runId/process', requireAuth, async (request, response, next) => {
    try {
      const run = database.getRunById(request.params.runId);
      if (!run) {
        return jsonError(response, 404, '执行记录不存在');
      }
      response.json(await runProcessPayload(app, run));
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/settings/llm', requireAuth, requireRole('admin', 'maintainer'), (request, response) => {
    response.json(publicLlmSetting(database.getSetting('llm')));
  });

  app.put('/api/settings/llm', requireAuth, requireRole('admin'), (request, response) => {
    const { provider = '', model = '', baseUrl = '', apiKey = '', enabled = true } = request.body || {};
    if (!provider || !model || !apiKey) {
      return jsonError(response, 400, '请填写供应商、模型和 API Key');
    }
    const row = database.setSetting('llm', { provider, model, baseUrl, apiKey, enabled }, request.user.user_id);
    response.json(publicLlmSetting(row));
  });

  app.get('/api/runs/:runId/report-file/:file', requireAuth, (request, response) => {
    const run = database.getRunById(request.params.runId);
    if (!run?.report_path) {
      return jsonError(response, 404, '报告文件不存在');
    }
    const filePath = path.resolve(run.report_path, request.params.file);
    if (!filePath.startsWith(path.resolve(run.report_path)) || !existsSync(filePath)) {
      return jsonError(response, 404, '报告文件不存在');
    }
    response.type(path.extname(filePath));
    createReadStream(filePath).pipe(response);
  });

  app.get('/api/runs/:runId/live', requireAuth, async (request, response, next) => {
    try {
      const run = database.getRunById(request.params.runId);
      if (!run) {
        return jsonError(response, 404, '执行记录不存在');
      }
      const process = await runProcessPayload(app, run);
      response.type('html').send(`<!doctype html>
<html lang="zh-CN">
<meta charset="utf-8">
<meta http-equiv="refresh" content="2">
<title>${process.scenarioName} - 实时执行过程</title>
<body style="margin:0;background:#101828;color:#fff;font-family:Arial,'Microsoft YaHei',sans-serif">
  <main style="padding:18px">
    <h1 style="margin:0 0 8px;font-size:20px">实时执行过程</h1>
    <p style="margin:0 0 16px;color:#d0d5dd">${process.scenarioName} · ${process.currentStep || process.status}</p>
    ${process.latestScreenshotUrl
      ? `<img src="${process.latestScreenshotUrl}" alt="实时执行截图" style="width:100%;max-height:72vh;object-fit:contain;border-radius:10px;background:#fff" />`
      : '<div style="display:grid;min-height:320px;place-items:center;border:1px solid #344054;border-radius:10px;color:#98a2b3">等待浏览器画面...</div>'}
  </main>
</body>
</html>`);
    } catch (error) {
      next(error);
    }
  });

  app.use('/api', (request, response) => {
    return jsonError(response, 404, '接口不存在');
  });

  app.use(express.static(publicDir));
  app.get('*splat', async (request, response, next) => {
    try {
      response.type('html').send(await readFile(path.resolve(publicDir, 'index.html'), 'utf8'));
    } catch (error) {
      next(error);
    }
  });

  app.use((error, request, response, next) => {
    if (!app.locals.silent) {
      console.error(error);
    }
    response.status(500).json({ message: '平台服务异常', detail: error.message });
  });

  return app;
}
