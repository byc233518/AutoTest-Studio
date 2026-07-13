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
import { rowsToCsv } from './platform/sample-data.mjs';
import { generateSampleRowsSmart } from './platform/llm.mjs';
import { publicLlmSetting } from './platform/settings.mjs';
import { normalizeExecutionMode } from './platform/execution-mode.mjs';
import { checkScenarioDependencies, assertDependenciesReady } from './platform/dependencies.mjs';
import { isAllowedScriptFile, saveScenarioScript } from './platform/scenario-scripts.mjs';
import {
  buildLocalRecordCommand,
  createRecordingUploadToken,
  resolveRecordingScriptEntry,
  startRecordingProcess,
  stopRecordingProcess,
  writeRecordingStub
} from './platform/recordings.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '..');
const legacyPublicDir = path.resolve(workspaceRoot, 'web');
const builtPublicDir = path.resolve(workspaceRoot, 'web-dist');
const publicDir = existsSync(builtPublicDir) ? builtPublicDir : legacyPublicDir;

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
    dataSchema: JSON.parse(row.data_schema),
    dependsOn: JSON.parse(row.depends_on || '[]')
  };
}

function toPublicEnvironment(row) {
  return {
    id: row.id,
    key: row.key,
    name: row.name,
    baseUrl: row.base_url,
    username: row.username,
    passwordMasked: row.password ? '********' : '',
    isDefault: Boolean(row.is_default),
    sort: row.sort,
    createdAt: row.created_at,
    updatedAt: row.updated_at
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

function scenarioReadiness(database, scenario, environmentKey = 'test') {
  const dependencies = checkScenarioDependencies(database, scenario);
  const checks = [
    { type: 'status', label: '场景已发布', ready: scenario.status === 'published', action: '发布场景' },
    { type: 'script', label: '已绑定自动化脚本', ready: Boolean(scenario.script_entry), action: '上传脚本' },
    { type: 'dataset', label: '已有有效样本数据', ready: database.listDatasets(scenario.id).some((item) => item.validation_status === 'valid'), action: '上传数据' },
    { type: 'environment', label: '执行环境可用', ready: Boolean(database.getEnvironmentByKey(environmentKey)), action: '配置环境' },
    { type: 'dependencies', label: '前置依赖已完成', ready: dependencies.every((item) => item.status === 'ready'), action: '执行依赖链', detail: dependencies }
  ];
  const blockers = checks.filter((item) => !item.ready).map((item) => item.type);
  return { ready: blockers.length === 0, state: scenario.status === 'draft' ? 'draft' : blockers.length ? 'needs-preparation' : 'ready', blockers, checks };
}

function scenarioQuality(database, scenario) {
  const runs = database.listRunsForScenario(scenario.id, 10);
  const completed = runs.filter((run) => !['queued', 'running'].includes(run.status));
  const passed = completed.filter((run) => run.status === 'passed').length;
  return { recentRuns: completed.length, passRate: completed.length ? Math.round(passed / completed.length * 100) : 0 };
}

function toPublicRun(row) {
  const summary = JSON.parse(row.summary || '{}');
  const passedRows = Number(summary.passed ?? 0);
  const failedRows = Number(summary.failed ?? summary.failedRows?.length ?? 0);
  const skippedRows = Number(summary.skipped ?? 0);
  const totalRows = Number(summary.totalRows ?? summary.total ?? summary.tests?.length ?? (passedRows + failedRows + skippedRows));
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
    businessSummary: { totalRows, passedRows, failedRows, skippedRows, failures: summary.failedRows || [] },
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
  const recordingsDir = path.resolve(dataDir, 'recordings');
  const scriptsDir = path.resolve(dataDir, 'scripts');
  await mkdir(uploadsDir, { recursive: true });
  await mkdir(reportsDir, { recursive: true });
  await mkdir(recordingsDir, { recursive: true });
  await mkdir(scriptsDir, { recursive: true });

  const database = createPlatformDatabase(options.databasePath || path.resolve(dataDir, 'platform.sqlite'));
  seedPlatform(database);

  const app = express();
  const upload = multer({ dest: path.resolve(dataDir, 'tmp') });

  app.locals.database = database;
  app.locals.paths = { dataDir, uploadsDir, reportsDir, recordingsDir, scriptsDir, workspaceRoot };
  app.locals.runMode = options.runMode || process.env.JMOM_RUN_MODE || 'playwright';
  app.locals.recordMode = options.recordMode || process.env.JMOM_RECORD_MODE || 'codegen';
  app.locals.silent = options.silent || false;
  app.locals.mockRunStepDelayMs = options.mockRunStepDelayMs || 0;

  app.use(express.json({ limit: '2mb' }));
  app.use('/reports', express.static(reportsDir));

  app.get('/api/health', (request, response) => {
    response.json({ ok: true, service: 'jmom-test-platform', runMode: app.locals.runMode });
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
    const scenarios = database.listScenarios().map((row) => ({ ...toPublicScenario(row), readiness: scenarioReadiness(database, row), quality: scenarioQuality(database, row) }));
    response.json({ project, scenarios, recommendations: [] });
  });

  app.get('/api/scenarios/:key', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) {
      return jsonError(response, 404, '测试场景不存在');
    }
    return response.json(toPublicScenario(scenario));
  });

  // 创建场景对所有登录角色开放；发布/下架仍需 maintainer/admin
  app.post('/api/scenarios', requireAuth, (request, response) => {
    const body = request.body || {};
    if (!body.key || !body.name) {
      return jsonError(response, 400, '请填写场景 key 和名称');
    }
    if (database.getScenarioByKey(body.key)) {
      return jsonError(response, 409, '场景 key 已存在');
    }
    const scenario = database.createScenario({
      key: body.key,
      name: body.name,
      description: body.description || '',
      module: body.module || '',
      appId: body.appId || '',
      moduleId: body.moduleId || '',
      priority: body.priority || 'P2',
      status: 'draft',
      version: body.version || '0.1.0',
      owner: body.owner || request.user.display_name || request.user.username,
      scriptEntry: body.scriptEntry || '',
      dataSchema: body.dataSchema || { columns: [], required: [], example: {} },
      dependsOn: body.dependsOn || []
    });
    return response.status(201).json(toPublicScenario(scenario));
  });

  app.put('/api/scenarios/:key', requireAuth, requireRole('maintainer', 'admin'), (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) {
      return jsonError(response, 404, '测试场景不存在');
    }
    const updated = database.updateScenario(request.params.key, request.body || {});
    return response.json(toPublicScenario(updated));
  });

  app.get('/api/apps', requireAuth, (request, response) => {
    response.json({ apps: database.listApps().map(toPublicApp) });
  });

  app.post('/api/apps', requireAuth, requireRole('maintainer', 'admin'), (request, response) => {
    const body = request.body || {};
    if (!body.key || !body.name) {
      return jsonError(response, 400, '请填写应用 key 和名称');
    }
    if (database.getAppByKey(body.key)) {
      return jsonError(response, 409, '应用 key 已存在');
    }
    const created = database.createApp({
      key: body.key,
      name: body.name,
      description: body.description || '',
      sort: body.sort ?? 99
    });
    return response.status(201).json(toPublicApp(created));
  });

  app.put('/api/apps/:id', requireAuth, requireRole('maintainer', 'admin'), (request, response) => {
    const existing = database.getAppById(request.params.id);
    if (!existing) {
      return jsonError(response, 404, '应用不存在');
    }
    const duplicate = request.body?.key ? database.getAppByKey(request.body.key) : null;
    if (duplicate && duplicate.id !== existing.id) {
      return jsonError(response, 409, '应用 key 已存在');
    }
    return response.json(toPublicApp(database.updateApp(existing.id, request.body || {})));
  });

  app.delete('/api/apps/:id', requireAuth, requireRole('maintainer', 'admin'), (request, response) => {
    const existing = database.getAppById(request.params.id);
    if (!existing) {
      return jsonError(response, 404, '应用不存在');
    }
    const references = database.getAppReferences(existing.id);
    if (references.modules || references.scenarios) {
      return jsonError(
        response,
        409,
        `应用仍关联 ${references.modules} 个模块和 ${references.scenarios} 个场景，无法删除`,
        { references }
      );
    }
    database.deleteApp(existing.id);
    return response.status(204).end();
  });

  app.get('/api/modules', requireAuth, (request, response) => {
    response.json({ modules: database.listModules(request.query.appId).map(toPublicModule) });
  });

  app.post('/api/modules', requireAuth, requireRole('maintainer', 'admin'), (request, response) => {
    const body = request.body || {};
    if (!body.appId || !body.name || !body.prefix) {
      return jsonError(response, 400, '请填写所属应用、模块名称和前缀');
    }
    if (!database.getAppById(body.appId)) {
      return jsonError(response, 400, '所属应用不存在');
    }
    const created = database.createModule({
      appId: body.appId,
      name: body.name,
      prefix: body.prefix,
      sort: body.sort ?? 99
    });
    return response.status(201).json(toPublicModule(created));
  });

  app.put('/api/modules/:id', requireAuth, requireRole('maintainer', 'admin'), (request, response) => {
    const existing = database.getModuleById(request.params.id);
    if (!existing) {
      return jsonError(response, 404, '模块不存在');
    }
    if (request.body?.appId && !database.getAppById(request.body.appId)) {
      return jsonError(response, 400, '所属应用不存在');
    }
    return response.json(toPublicModule(database.updateModule(existing.id, request.body || {})));
  });

  app.delete('/api/modules/:id', requireAuth, requireRole('maintainer', 'admin'), (request, response) => {
    const existing = database.getModuleById(request.params.id);
    if (!existing) {
      return jsonError(response, 404, '模块不存在');
    }
    const scenarioCount = database.countScenariosForModule(existing.id);
    if (scenarioCount) {
      return jsonError(response, 409, `模块仍关联 ${scenarioCount} 个场景，无法删除`, { scenarioCount });
    }
    database.deleteModule(existing.id);
    return response.status(204).end();
  });

  app.get('/api/environments', requireAuth, (request, response) => {
    response.json({ environments: database.listEnvironments().map(toPublicEnvironment) });
  });

  app.post('/api/environments', requireAuth, requireRole('admin'), (request, response) => {
    const body = request.body || {};
    if (!body.key || !body.name || !body.baseUrl || !body.username || !body.password) {
      return jsonError(response, 400, '请填写环境 key、名称、地址、账号和密码');
    }
    if (database.getEnvironmentByKey(body.key)) {
      return jsonError(response, 409, '环境 key 已存在');
    }
    const env = database.createEnvironment({
      key: body.key,
      name: body.name,
      baseUrl: body.baseUrl,
      username: body.username,
      password: body.password,
      isDefault: Boolean(body.isDefault),
      sort: body.sort ?? 99
    });
    return response.status(201).json(toPublicEnvironment(env));
  });

  app.put('/api/environments/:id', requireAuth, requireRole('admin'), (request, response) => {
    const existing = database.getEnvironmentById(request.params.id);
    if (!existing) {
      return jsonError(response, 404, '环境不存在');
    }
    const duplicate = request.body?.key ? database.getEnvironmentByKey(request.body.key) : null;
    if (duplicate && duplicate.id !== existing.id) {
      return jsonError(response, 409, '环境 key 已存在');
    }
    const updated = database.updateEnvironment(request.params.id, request.body || {});
    return response.json(toPublicEnvironment(updated));
  });

  app.delete('/api/environments/:id', requireAuth, requireRole('admin'), (request, response) => {
    const existing = database.getEnvironmentById(request.params.id);
    if (!existing) {
      return jsonError(response, 404, '环境不存在');
    }
    if (existing.is_default) {
      return jsonError(response, 409, '默认环境不能删除，请先设置其他默认环境');
    }
    database.deleteEnvironment(existing.id);
    return response.status(204).end();
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

  app.post('/api/scenarios/:key/sample-data', requireAuth, async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) {
        return jsonError(response, 404, '测试场景不存在');
      }
      const schema = JSON.parse(scenario.data_schema);
      const result = await generateSampleRowsSmart(database, scenario, {
        count: request.body?.count || 3,
        useLlm: Boolean(request.body?.useLlm)
      });
      return response.json({
        scenarioId: scenario.id,
        scenarioKey: scenario.key,
        columns: schema.columns,
        rows: result.rows,
        csv: rowsToCsv(result.rows, schema.columns),
        source: result.source,
        fallbackReason: result.fallbackReason
      });
    } catch (error) {
      return next(error);
    }
  });

  app.get('/api/scenarios/:key/dependency-check', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) {
      return jsonError(response, 404, '测试场景不存在');
    }
    const checks = checkScenarioDependencies(database, scenario);
    const ready = checks.every((check) => check.status === 'ready');
    return response.json({
      scenarioKey: scenario.key,
      dependsOn: JSON.parse(scenario.depends_on || '[]'),
      ready,
      checks
    });
  });

  app.get('/api/scenarios/:key/preflight', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) return jsonError(response, 404, '测试场景不存在');
    response.json(scenarioReadiness(database, scenario, request.query.environment || 'test'));
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

  app.post('/api/scenarios/:key/script', requireAuth, upload.single('file'), async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) {
        return jsonError(response, 404, '测试场景不存在');
      }
      if (!request.file) {
        return jsonError(response, 400, '请上传测试脚本文件');
      }
      if (!isAllowedScriptFile(request.file.originalname)) {
        return jsonError(response, 400, '仅支持 .js / .spec.js / .mjs 脚本文件');
      }
      const saved = await saveScenarioScript({
        workspaceRoot: app.locals.paths.workspaceRoot,
        scriptsDir: app.locals.paths.scriptsDir,
        dataDir: app.locals.paths.dataDir,
        scenarioKey: scenario.key,
        sourcePath: request.file.path,
        originalName: request.file.originalname
      });
      const updated = database.updateScenario(scenario.key, { scriptEntry: saved.scriptEntry });
      return response.status(201).json({
        scenarioId: updated.id,
        scenarioKey: updated.key,
        scriptEntry: saved.scriptEntry,
        fileName: saved.fileName
      });
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

  app.post('/api/scenarios/:key/unpublish', requireAuth, requireRole('maintainer', 'admin'), (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) {
      return jsonError(response, 404, '测试场景不存在');
    }
    response.json(toPublicScenario(database.updateScenarioStatus(scenario.id, 'draft')));
  });

  app.post('/api/runs', requireAuth, async (request, response, next) => {
    try {
      const {
        scenarioId,
        datasetId,
        environment = 'test',
        enforceDependencies = false,
        skipDependencyCheck = false
      } = request.body || {};
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
      if (scenario.status !== 'published') {
        return jsonError(response, 400, '仅已发布场景可以执行');
      }
      const envRow = database.getEnvironmentByKey(environment);
      if (!envRow) {
        return jsonError(response, 400, `执行环境不存在: ${environment}`);
      }
      const dependsOn = JSON.parse(scenario.depends_on || '[]');
      const shouldEnforce = Boolean(enforceDependencies) && !skipDependencyCheck && dependsOn.length > 0;
      if (shouldEnforce) {
        try {
          assertDependenciesReady(checkScenarioDependencies(database, scenario));
        } catch (error) {
          return jsonError(response, 400, error.message, { missing: error.missing || [] });
        }
      }
      const run = createRun(database, {
        scenario,
        dataset,
        environment: envRow.key,
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

  app.get('/api/runs/:runId/failed-rows.csv', requireAuth, (request, response) => {
    const run = database.getRunById(request.params.runId);
    if (!run) return jsonError(response, 404, '执行记录不存在');
    const summary = JSON.parse(run.summary || '{}');
    response.type('text/csv; charset=utf-8');
    response.send(Array.isArray(summary.failedRows) && summary.failedRows.length ? rowsToCsv(summary.failedRows) : '状态,说明\\n无失败数据,本次执行没有失败行');
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

  for (const [route, type] of Object.entries({ suites: 'suite', schedules: 'schedule', notifications: 'notification' })) {
    app.get('/api/' + route, requireAuth, (request, response) => response.json(database.listEntities(type).map((row) => ({ id: row.id, name: row.name, enabled: Boolean(row.enabled), ...JSON.parse(row.payload) }))));
  }
  app.get('/api/audit-logs', requireAuth, (request, response) => response.json(database.listAuditLogs()));

  app.get('/api/settings/llm', requireAuth, (request, response) => {
    response.json(publicLlmSetting(database.getSetting('llm')));
  });

  app.put('/api/settings/llm', requireAuth, (request, response) => {
    const { provider = '', model = '', baseUrl = '', apiKey = '', enabled = true } = request.body || {};
    if (!provider || !model || !apiKey) {
      return jsonError(response, 400, '请填写供应商、模型和 API Key');
    }
    const row = database.setSetting('llm', { provider, model, baseUrl, apiKey, enabled }, request.user.user_id);
    response.json(publicLlmSetting(row));
  });

  app.post('/api/settings/llm/test', requireAuth, (request, response) => {
    const setting = database.getSetting('llm');
    const value = setting ? JSON.parse(setting.value) : null;
    if (!value?.apiKey) {
      return jsonError(response, 400, '请先配置 LLM API Key');
    }
    if (!value.enabled) {
      return jsonError(response, 400, 'LLM 未启用');
    }
    return response.json({ ok: true, message: '配置可用（未实际调用）' });
  });

  app.post('/api/recordings/start', requireAuth, async (request, response, next) => {
    try {
      const scenarioKey = request.body?.scenarioKey || '';
      const environmentKey = request.body?.environmentKey || 'test';
      const location = request.body?.location === 'server' ? 'server' : 'local';
      const platformUrl = request.body?.platformUrl
        || `${request.protocol}://${request.get('host')}`;
      const environment = database.getEnvironmentByKey(environmentKey) || database.getDefaultEnvironment();
      if (!environment) {
        return jsonError(response, 400, '执行环境不存在');
      }
      if (scenarioKey && !database.getScenarioByKey(scenarioKey)) {
        return jsonError(response, 404, '测试场景不存在');
      }
      const id = database.nextId('REC');
      const outputPath = path.resolve(app.locals.paths.recordingsDir, `${id}.spec.js`);
      const baseUrl = environment.base_url.replace(/\/+$/, '');
      const startUrl = `${baseUrl}/#/login`;
      const uploadToken = createRecordingUploadToken();
      const uploadTokenExpires = new Date(Date.now() + 30 * 60 * 1000).toISOString();
      let processInfo = { pid: null, mode: location, startUrl };

      if (location === 'server') {
        const recordMode = app.locals.recordMode || 'codegen';
        if (recordMode === 'stub') {
          await writeRecordingStub(outputPath, id, environment);
        }
        processInfo = startRecordingProcess({
          workspaceRoot: app.locals.paths.workspaceRoot,
          outputPath,
          environment,
          recordMode
        });
      }

      await writeFile(
        path.resolve(app.locals.paths.recordingsDir, `${id}.meta.json`),
        `${JSON.stringify({
          id,
          status: 'recording',
          location,
          scenarioKey: scenarioKey || null,
          environmentKey: environment.key,
          outputPath,
          pid: processInfo.pid,
          mode: processInfo.mode,
          startUrl,
          uploadToken,
          uploadTokenExpires,
          createdBy: request.user.user_id,
          createdAt: new Date().toISOString()
        }, null, 2)}\n`,
        'utf8'
      );
      return response.status(201).json({
        id,
        status: 'recording',
        location,
        scenarioKey: scenarioKey || null,
        startUrl,
        mode: processInfo.mode,
        localCommand: location === 'local'
          ? buildLocalRecordCommand({ recordingId: id, uploadToken, startUrl, platformUrl })
          : null,
        uploadToken: location === 'local' ? uploadToken : null
      });
    } catch (error) {
      return next(error);
    }
  });

  app.get('/api/recordings/:id', requireAuth, async (request, response, next) => {
    try {
      const metaPath = path.resolve(app.locals.paths.recordingsDir, `${request.params.id}.meta.json`);
      if (!existsSync(metaPath)) {
        return jsonError(response, 404, '录制记录不存在');
      }
      const meta = JSON.parse(await readFile(metaPath, 'utf8'));
      return response.json({
        id: meta.id,
        status: meta.status,
        location: meta.location || 'server',
        scenarioKey: meta.scenarioKey || null,
        scriptEntry: meta.scriptEntry || null,
        startUrl: meta.startUrl || null,
        finishedAt: meta.finishedAt || null
      });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/recordings/:id/upload', upload.single('file'), async (request, response, next) => {
    try {
      const id = request.params.id;
      const metaPath = path.resolve(app.locals.paths.recordingsDir, `${id}.meta.json`);
      if (!existsSync(metaPath)) {
        return jsonError(response, 404, '录制记录不存在');
      }
      const meta = JSON.parse(await readFile(metaPath, 'utf8'));
      const token = request.body?.token || '';
      const session = sessionCookie(request)
        ? request.app.locals.database.getSession(sessionCookie(request))
        : null;
      const tokenValid = token
        && token === meta.uploadToken
        && (!meta.uploadTokenExpires || meta.uploadTokenExpires >= new Date().toISOString());
      const sessionValid = session && session.user_id === meta.createdBy;
      if (!tokenValid && !sessionValid) {
        return jsonError(response, 401, '录制上传凭证无效或已过期');
      }
      if (!request.file) {
        return jsonError(response, 400, '请上传录制脚本文件');
      }
      const outputPath = path.resolve(app.locals.paths.recordingsDir, `${id}.spec.js`);
      await rename(request.file.path, outputPath);
      const scriptEntry = resolveRecordingScriptEntry(
        app.locals.paths.workspaceRoot,
        outputPath,
        app.locals.paths.dataDir
      );
      if (!scriptEntry) {
        return jsonError(response, 400, '录制脚本无效');
      }
      let scenario = null;
      const scenarioKey = meta.scenarioKey || request.body?.scenarioKey || '';
      if (scenarioKey) {
        scenario = database.getScenarioByKey(scenarioKey);
        if (!scenario) {
          return jsonError(response, 404, '测试场景不存在');
        }
        scenario = database.updateScenario(scenarioKey, { scriptEntry });
      }
      meta.status = 'finished';
      meta.finishedAt = new Date().toISOString();
      meta.scriptEntry = scriptEntry;
      meta.uploadToken = null;
      await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
      return response.json({
        id,
        status: 'finished',
        scriptEntry,
        scenario: scenario ? toPublicScenario(scenario) : null
      });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/recordings/:id/finish', requireAuth, async (request, response, next) => {
    try {
      const id = request.params.id;
      const metaPath = path.resolve(app.locals.paths.recordingsDir, `${id}.meta.json`);
      const outputPath = path.resolve(app.locals.paths.recordingsDir, `${id}.spec.js`);
      if (!existsSync(metaPath)) {
        return jsonError(response, 404, '录制记录不存在');
      }
      const meta = JSON.parse(await readFile(metaPath, 'utf8'));
      if (meta.location === 'local' && meta.status !== 'finished') {
        return jsonError(response, 400, '本地录制尚未上传脚本，请在本机终端执行录制命令');
      }
      stopRecordingProcess(meta.pid);
      if (!existsSync(outputPath) && app.locals.recordMode === 'stub') {
        const environment = database.getEnvironmentByKey(meta.environmentKey) || database.getDefaultEnvironment();
        await writeRecordingStub(outputPath, id, environment);
      }
      const scriptEntry = resolveRecordingScriptEntry(
        app.locals.paths.workspaceRoot,
        outputPath,
        app.locals.paths.dataDir
      );
      if (!scriptEntry) {
        return jsonError(response, 400, '录制脚本尚未生成，请先在 Playwright Inspector 中保存步骤');
      }
      const scenarioKey = request.body?.scenarioKey || meta.scenarioKey || '';
      if (scenarioKey) {
        const scenario = database.getScenarioByKey(scenarioKey);
        if (!scenario) {
          return jsonError(response, 404, '测试场景不存在');
        }
        const updated = database.updateScenario(scenarioKey, { scriptEntry });
        meta.status = 'finished';
        meta.finishedAt = new Date().toISOString();
        meta.scenarioKey = scenarioKey;
        meta.scriptEntry = scriptEntry;
        await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
        return response.json({
          id,
          status: 'finished',
          scriptEntry,
          scenario: toPublicScenario(updated)
        });
      }
      const key = `draft-recording-${id}`;
      const scenario = database.createScenario({
        key,
        name: `录制草稿 ${id}`,
        description: `由录制 ${id} 生成的草稿场景`,
        module: '录制 / Recording',
        appId: '',
        moduleId: '',
        priority: 'P2',
        status: 'draft',
        version: '0.1.0',
        owner: request.user.display_name || request.user.username,
        scriptEntry,
        dataSchema: { columns: [], required: [], example: {} },
        dependsOn: []
      });
      meta.status = 'finished';
      meta.finishedAt = new Date().toISOString();
      meta.scenarioKey = scenario.key;
      meta.scriptEntry = scriptEntry;
      await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
      return response.json({
        id,
        status: 'finished',
        scriptEntry,
        scenario: toPublicScenario(scenario)
      });
    } catch (error) {
      return next(error);
    }
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
