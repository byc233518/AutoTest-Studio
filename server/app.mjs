import express from 'express';
import ExcelJS from 'exceljs';
import multer from 'multer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { createReadStream, existsSync } from 'node:fs';
import { createPlatformDatabase } from './platform/database.mjs';
import { seedPlatform } from './platform/seed.mjs';
import { parseDatasetFile, validateRows } from './platform/datasets.mjs';
import { migrateRows } from './platform/dataset-migration.mjs';
import { diffSchemas, normalizeSchema, synchronizeScriptSchema } from './platform/schema-sync.mjs';
import {
  completeLocalRun,
  createRun,
  ensureProcessFallbackScreenshot,
  executeRun,
  initializeLocalRun,
  isSkippedOnly,
  markLocalRunStarted
} from './platform/runner.mjs';
import { rowsToCsv } from './platform/sample-data.mjs';
import { generateSampleRowsSmart, listLlmModels, testLlmConnection } from './platform/llm.mjs';
import { publicLlmSetting } from './platform/settings.mjs';
import { normalizeExecutionMode } from './platform/execution-mode.mjs';
import { createBrowserStatus } from './platform/system-browsers.mjs';
import { checkScenarioDependencies, assertDependenciesReady } from './platform/dependencies.mjs';
import {
  archiveScenarioScriptVersion,
  extractScriptDataSchema,
  isAllowedScriptFile,
  listScenarioScriptVersions,
  readScenarioScript,
  removeScenarioScriptAssets,
  restoreScenarioScriptVersion,
  saveScenarioScript,
  saveScenarioScriptContent
} from './platform/scenario-scripts.mjs';
import {
  createScenarioRelease,
  buildScenarioReleaseInput,
  getScenarioRelease,
  listScenarioReleases,
  compareScenarioDraft,
  compareScenarioRelease,
  restoreScenarioRelease,
  validateScenarioReleaseScript
} from './platform/scenario-releases.mjs';
import {
  buildLocalRecordCommand,
  createRecordingUploadToken,
  resolveRecordingScriptEntry,
  startRecordingProcess,
  stopRecordingProcess,
  writeRecordingStub,
  analyzeRecordingScript,
  buildRecordingReviewScript,
  isManagedScriptEntry,
  moveRecordingUpload
} from './platform/recordings.mjs';
import {
  createRecordingCode,
  createRecordingCodeLimiter,
  verifyRecordingCode
} from './platform/recording-codes.mjs';
import {
  buildLocalExecutionBundle,
  createLocalExecutionTicket,
  hasValidLocalExecutionToken,
  readLocalExecutionMeta,
  resolveLocalArtifactPath,
  resolveLocalExecutionTicket,
  writeLocalExecutionMeta
} from './platform/local-executions.mjs';
import { buildDesktopLaunchUrl } from './platform/desktop-launch.mjs';
import {
  createScenarioSelectionBatch,
  createTestPlanBatch,
  executeTestPlanBatch,
  normalizeGeneralSettings,
  normalizeTestPlan,
  publicTestPlan,
  publicTestPlanRun,
  publicTestPlanRunItem,
  readGeneralSettings
} from './platform/test-plans.mjs';
import {
  REPORT_FORMAT_OPTIONS,
  REPORT_MODULE_OPTIONS,
  normalizeReportTemplatesSetting,
  previewReportTemplate,
  readReportTemplatesSetting,
  reportFormatMeta
} from './platform/report-templates.mjs';
import {
  createScenarioPackage,
  parseScenarioPackage,
  ScenarioPackageError
} from './platform/scenario-packages.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '..');
const RECORDER_ARCHIVE_NAME = 'AutoTest-Studio\u672c\u5730\u5f55\u5236\u5668-win-x64.zip';
const SCENARIO_KEY_PATTERN = /^[a-z0-9]+(?:-+[a-z0-9]+)*$/;
const LEGACY_SCENARIO_KEY_PATTERN = /^legacyMes(?:-+[a-z0-9]+)+$/;
const ENVIRONMENT_VARIABLE_KEY_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;
const DANGEROUS_VARIABLE_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
const MIGRATION_FILE_ATTEMPTS = 8;
const DESKTOP_USER = Object.freeze({
  token: 'desktop-local',
  user_id: 'USR-DESKTOP',
  username: 'local',
  display_name: '本地用户',
  role: 'admin'
});

function jsonError(response, status, message, extra = {}) {
  return response.status(status).json({ message, ...extra });
}

function isValidScenarioKey(value) {
  return typeof value === 'string'
    && (SCENARIO_KEY_PATTERN.test(value) || LEGACY_SCENARIO_KEY_PATTERN.test(value));
}

function normalizeBatchScenarioIds(value) {
  if (!Array.isArray(value) || !value.length) {
    throw new TypeError('请至少选择一个测试用例');
  }
  const ids = value.map((id, index) => {
    if (typeof id !== 'string' || !id.trim()) {
      throw new TypeError(`第 ${index + 1} 个测试用例 ID 无效`);
    }
    return id.trim();
  });
  const uniqueIds = [...new Set(ids)];
  if (uniqueIds.length > 200) {
    throw new TypeError('单次最多操作 200 个测试用例');
  }
  return uniqueIds;
}

function normalizeScenarioDirectory(value) {
  if (typeof value !== 'string') throw new TypeError('目标目录必须是字符串');
  const directory = value.trim();
  if (directory.length > 500) throw new TypeError('目标目录不能超过 500 个字符');
  return directory;
}

function normalizeBatchDatasetIds(value, scenarioIds) {
  if (value == null) return {};
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError('测试数据映射必须是对象');
  }
  const selected = new Set(scenarioIds);
  const normalized = {};
  for (const [scenarioId, datasetId] of Object.entries(value)) {
    if (!selected.has(scenarioId)) {
      throw new TypeError(`测试数据映射包含未选择的测试用例: ${scenarioId}`);
    }
    if (datasetId == null || datasetId === '') continue;
    if (typeof datasetId !== 'string' || !datasetId.trim()) {
      throw new TypeError(`测试数据 ID 无效: ${scenarioId}`);
    }
    normalized[scenarioId] = datasetId.trim();
  }
  return normalized;
}

function normalizeEnvironmentVariables(value) {
  if (!Array.isArray(value)) {
    throw new TypeError('环境全局变量必须是 key/value 对象数组');
  }
  const keys = new Set();
  return value.map((item, index) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      throw new TypeError(`第 ${index + 1} 个环境变量必须是对象`);
    }
    const key = typeof item.key === 'string' ? item.key.trim() : '';
    if (!ENVIRONMENT_VARIABLE_KEY_PATTERN.test(key) || DANGEROUS_VARIABLE_KEYS.has(key)) {
      throw new TypeError(`环境变量名无效: ${key || `第 ${index + 1} 项`}`);
    }
    if (keys.has(key)) {
      throw new TypeError(`环境变量名重复: ${key}`);
    }
    if (!Object.hasOwn(item, 'value')) {
      throw new TypeError(`环境变量 ${key} 缺少 value`);
    }
    const variableValue = item.value;
    if ((typeof variableValue === 'object' && variableValue !== null)
      || !['string', 'number', 'boolean', 'object'].includes(typeof variableValue)
      || (typeof variableValue === 'number' && !Number.isFinite(variableValue))) {
      throw new TypeError(`环境变量 ${key} 的值必须是字符串、数字、布尔值或 null`);
    }
    keys.add(key);
    return { key, value: variableValue };
  });
}

function publicEnvironmentVariables(value) {
  try {
    return normalizeEnvironmentVariables(JSON.parse(value || '[]'));
  } catch {
    return [];
  }
}

function applyProjectMetadata(database, metadata) {
  const current = database.getDefaultProject();
  if (!current || !metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    return current;
  }
  const name = typeof metadata.name === 'string' && metadata.name.trim()
    ? metadata.name.trim()
    : current.name;
  const description = typeof metadata.description === 'string'
    ? metadata.description.trim()
    : current.description;
  return database.updateProject(current.id, { name, description });
}

function resolveWithinUploads(uploadsDir, ...segments) {
  const target = path.resolve(uploadsDir, ...segments);
  const relative = path.relative(uploadsDir, target);
  if (!relative || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error('迁移文件路径超出上传目录');
  }
  return target;
}

function isDatasetIdConflict(error) {
  return error?.code === 'DATASET_ID_CONFLICT'
    || String(error?.message || '').includes('UNIQUE constraint failed: datasets.id');
}

function sessionCookie(request) {
  const cookie = request.headers.cookie || '';
  const found = cookie.split(';').map((item) => item.trim()).find((item) => item.startsWith('autotest_session='));
  return found ? decodeURIComponent(found.split('=').slice(1).join('=')) : '';
}

function requireAuth(request, response, next) {
  if (request.app.locals.desktopMode) {
    request.user = request.app.locals.desktopUser;
    return next();
  }
  const token = sessionCookie(request);
  const session = token ? request.app.locals.database.getSession(token) : null;
  if (!session) {
    return jsonError(response, 401, '\u8bf7\u5148\u767b\u5f55');
  }
  request.user = session;
  return next();
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
    variables: publicEnvironmentVariables(row.variables_json),
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
    errors: JSON.parse(row.errors || '[]'),
    dataSchema: JSON.parse(row.schema_snapshot || '{}'),
    sourceDatasetId: row.source_dataset_id || null,
    migration: JSON.parse(row.migration_json || '{}')
  };
}

function migrationPayload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const { datasetIds, targetSchema, mappings, defaults } = body;
  if (!Array.isArray(datasetIds) || !datasetIds.length) return null;
  if (datasetIds.some((id) => typeof id !== 'string' || !id.trim())) return null;
  if (new Set(datasetIds).size !== datasetIds.length) return null;
  return { datasetIds, targetSchema, mappings, defaults };
}

async function loadDatasetMigrationPreviews(database, scenario, payload) {
  const sources = [];
  for (const datasetId of payload.datasetIds) {
    const dataset = database.getDatasetById(datasetId);
    if (!dataset || dataset.scenario_id !== scenario.id) return null;
    const rows = JSON.parse(await readFile(dataset.rows_path, 'utf8'));
    const result = migrateRows({
      rows,
      targetSchema: payload.targetSchema,
      mappings: payload.mappings,
      defaults: payload.defaults
    });
    sources.push({ dataset, rows: result.rows, errors: result.errors });
  }
  return sources;
}

function publicMigrationPreviews(sources) {
  return sources.map(({ dataset, rows, errors }) => ({
    sourceDatasetId: dataset.id,
    sourceDatasetName: dataset.name,
    rowCount: rows.length,
    rows,
    errors
  }));
}

async function writeExclusiveMigrationFile({ database, uploadsDir, scenarioId, rows, writer }) {
  const targetDir = resolveWithinUploads(uploadsDir, scenarioId);
  await mkdir(targetDir, { recursive: true });
  for (let attempt = 0; attempt < MIGRATION_FILE_ATTEMPTS; attempt += 1) {
    const datasetId = database.nextId('DS');
    if (database.getDatasetById(datasetId)) continue;
    const fileName = `${datasetId}.json`;
    const rowsPath = resolveWithinUploads(uploadsDir, scenarioId, fileName);
    try {
      await writer(rowsPath, `${JSON.stringify(rows, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' });
      return { datasetId, fileName, rowsPath };
    } catch (error) {
      if (error?.code === 'EEXIST') continue;
      await rm(rowsPath, { force: true });
      throw error;
    }
  }
  const error = new Error('无法生成唯一的数据集迁移文件');
  error.code = 'DATASET_ID_CONFLICT';
  throw error;
}

function scenarioReadiness(database, scenario, environmentKey = '') {
  const resolvedEnvironmentKey = environmentKey || database.getDefaultEnvironment()?.key || '';
  const dependencies = checkScenarioDependencies(database, scenario);
  const checks = [
    { type: 'status', label: '场景已发布', ready: scenario.status === 'published', action: '发布场景' },
    { type: 'script', label: '已绑定自动化脚本', ready: Boolean(scenario.script_entry), action: '上传脚本' },
    { type: 'dataset', label: '已有有效样本数据', ready: database.listDatasets(scenario.id).some((item) => item.validation_status === 'valid'), action: '上传数据' },
    { type: 'environment', label: '执行环境可用', ready: Boolean(database.getEnvironmentByKey(resolvedEnvironmentKey)), action: '配置环境' },
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

function scriptSchemaPatch(content) {
  const dataSchema = extractScriptDataSchema(content);
  return dataSchema ? { dataSchema } : {};
}

function isProcessRunning(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

async function markRecordingFailed(app, id, error) {
  const metaPath = path.resolve(app.locals.paths.recordingsDir, `${id}.meta.json`);
  if (!existsSync(metaPath)) return null;
  const meta = JSON.parse(await readFile(metaPath, 'utf8'));
  if (['finished', 'draft'].includes(meta.status)) return meta;
  meta.status = 'failed';
  meta.error = error?.message || String(error || '录制失败');
  meta.finishedAt = new Date().toISOString();
  meta.uploadToken = null;
  meta.uploadTokenExpires = null;
  meta.recordCodeHash = null;
  meta.recordCodeExpires = null;
  await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
  return meta;
}

function listActiveRuns(database) {
  return database.raw.prepare(`
    SELECT * FROM runs
    WHERE status IN ('queued', 'running')
    ORDER BY created_at DESC
  `).all();
}

function listActiveTestPlanRuns(database) {
  return database.raw.prepare(`
    SELECT * FROM test_plan_runs
    WHERE status IN ('queued', 'running')
    ORDER BY created_at DESC
  `).all();
}

async function invalidateLocalExecution(app, runId, message, finishedAt) {
  const reportDir = path.resolve(app.locals.paths.reportsDir, runId);
  const meta = await readLocalExecutionMeta(reportDir).catch(() => null);
  if (!meta) return;
  await writeLocalExecutionMeta(reportDir, {
    ...meta,
    status: 'failed',
    token: null,
    tokenExpires: null,
    recordCodeHash: null,
    recordCodeExpires: null,
    error: message,
    finishedAt
  });
}

async function failActiveDesktopTasks(app, { message, summaryFlag }) {
  const database = app.locals.database;
  const finishedAt = new Date().toISOString();

  for (const run of listActiveRuns(database)) {
    database.updateRun(run.id, {
      status: 'failed',
      finishedAt,
      error: message
    });
    if (run.execution_location === 'local') {
      await invalidateLocalExecution(app, run.id, message, finishedAt);
    }
  }

  for (const batch of listActiveTestPlanRuns(database)) {
    for (const item of database.listTestPlanRunItems(batch.id).filter((entry) => ['queued', 'running'].includes(entry.status))) {
      database.updateTestPlanRunItem(item.id, {
        status: 'failed',
        error: message,
        finishedAt
      });
    }
    database.updateTestPlanRun(batch.id, {
      status: 'failed',
      finishedAt,
      summary: {
        ...JSON.parse(batch.summary_json || '{}'),
        [summaryFlag]: true,
        error: message
      }
    });
  }

  const recordingFiles = (await readdir(app.locals.paths.recordingsDir).catch(() => []))
    .filter((name) => name.endsWith('.meta.json'));
  for (const name of recordingFiles) {
    const id = name.slice(0, -'.meta.json'.length);
    try {
      const metaPath = path.resolve(app.locals.paths.recordingsDir, name);
      const meta = JSON.parse(await readFile(metaPath, 'utf8'));
      if (['waiting', 'recording'].includes(meta.status)) {
        await markRecordingFailed(app, id, new Error(message));
      }
    } catch {}
  }
}

async function finalizeRecording(app, { id, scenarioKey: requestedScenarioKey = '', actor = '', stopProcess = false }) {
  const database = app.locals.database;
  const metaPath = path.resolve(app.locals.paths.recordingsDir, `${id}.meta.json`);
  if (!existsSync(metaPath)) return null;
  const meta = JSON.parse(await readFile(metaPath, 'utf8'));
  if (meta.status === 'finished') {
    const scenario = meta.scenarioKey ? database.getScenarioByKey(meta.scenarioKey) : null;
    return { id, status: 'finished', scriptEntry: meta.scriptEntry || null, scenario: scenario ? toPublicScenario(scenario) : null };
  }
  const outputPath = meta.outputPath
    ? path.resolve(meta.outputPath)
    : path.resolve(app.locals.paths.recordingScriptsDir, `${id}.spec.js`);
  if (stopProcess) stopRecordingProcess(meta.pid);
  if (!existsSync(outputPath) && app.locals.recordMode === 'stub') {
    const environment = database.getEnvironmentByKey(meta.environmentKey) || database.getDefaultEnvironment();
    await writeRecordingStub(outputPath, id, environment);
  }
  const scriptEntry = resolveRecordingScriptEntry(
    app.locals.paths.workspaceRoot,
    outputPath,
    app.locals.paths.dataDir
  );
  if (!scriptEntry || !isManagedScriptEntry(scriptEntry)) {
    throw new Error('录制脚本不存在或不在当前项目目录');
  }
  const content = await readFile(outputPath, 'utf8');
  const scenarioKey = requestedScenarioKey || meta.scenarioKey || '';
  let scenario;
  if (scenarioKey) {
    scenario = database.getScenarioByKey(scenarioKey);
    if (!scenario) throw new Error('录制关联的测试用例不存在');
    if (scenario.script_entry && scenario.script_entry !== scriptEntry) {
      await archiveScenarioScriptVersion({
        workspaceRoot: app.locals.paths.workspaceRoot,
        scriptsDir: app.locals.paths.scriptsDir,
        dataDir: app.locals.paths.dataDir,
        scenarioKey: scenario.key,
        scriptEntry: scenario.script_entry,
        actor: actor || meta.createdBy || '',
        reason: 'recording'
      });
    }
    scenario = database.updateScenario(scenarioKey, { scriptEntry, ...scriptSchemaPatch(content) });
  } else {
    const key = `draft-recording-${id.toLowerCase()}`;
    scenario = database.getScenarioByKey(key) || database.createScenario({
      key,
      name: `录制用例 ${id}`,
      description: `由录制任务 ${id} 自动创建`,
      module: '录制用例',
      appId: '',
      moduleId: '',
      priority: 'P2',
      status: 'draft',
      version: '0.1.0',
      owner: actor || meta.createdBy || '本地用户',
      scriptEntry,
      dataSchema: extractScriptDataSchema(content) || { columns: [], required: [], example: {} },
      dependsOn: []
    });
  }
  meta.status = 'finished';
  meta.error = null;
  meta.finishedAt = new Date().toISOString();
  meta.scenarioKey = scenario.key;
  meta.scriptEntry = scriptEntry;
  await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
  return { id, status: 'finished', scriptEntry, scenario: toPublicScenario(scenario) };
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
    scenarioName: row.scenario_name || row.scenario_id,
    datasetId: row.dataset_id,
    datasetName: row.dataset_name || row.dataset_id,
    environment: row.environment,
    executionMode: row.execution_mode || 'headless',
    executionLocation: row.execution_location || 'server',
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
    { type: 'html-report', label: 'HTML 鎶ュ憡', fileName: 'index.html' },
    { type: 'screenshot', label: '杩囩▼鎴浘', fileName: 'screenshot.png' },
    { type: 'screenshot', label: '杩囩▼鎴浘', fileName: 'screenshot.svg' },
    { type: 'video', label: '褰曞儚鍥炴斁', fileName: 'replay.html' },
    { type: 'video-file', label: '褰曞儚鏂囦欢', fileName: 'video.webm' },
    { type: 'trace', label: 'Trace ???', fileName: 'trace.zip' }
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
    scenarioName: processState.scenarioName || scenario?.name || run.scenario_name || run.scenario_id,
    datasetName: processState.datasetName || dataset?.name || run.dataset_name || run.dataset_id,
    executionMode: run.execution_mode || 'headless',
    executionLocation: run.execution_location || processState.executionLocation || 'server',
    status: skippedOnly ? 'skipped' : processState.status || run.status,
    canWatchLive: (run.execution_mode || 'headless') === 'ui',
    livePreviewUrl: (run.execution_mode || 'headless') === 'ui' ? `/api/runs/${run.id}/live` : null,
    latestScreenshotUrl: processState.latestScreenshotUrl || screenshot?.previewUrl || null,
    videoReplayUrl: processState.videoReplayUrl || replay?.previewUrl || null,
    videoFileUrl: processState.videoFileUrl || videoFile?.previewUrl || null,
    currentStep: skippedOnly ? '\u672c\u6b21\u7528\u4f8b\u5168\u90e8\u8df3\u8fc7\uff0c\u672a\u4ea7\u751f\u6d4f\u89c8\u5668\u753b\u9762' : processState.currentStep || (run.status === 'queued' ? '?? Runner ??' : ''),
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
  const appWorkspaceRoot = options.workspaceRoot || workspaceRoot;
  const legacyPublicDir = path.resolve(appWorkspaceRoot, 'web');
  const builtPublicDir = path.resolve(appWorkspaceRoot, 'web-dist');
  const publicDir = options.publicDir || (existsSync(builtPublicDir) ? builtPublicDir : legacyPublicDir);
  const dataDir = options.dataDir || path.resolve(appWorkspaceRoot, 'platform-data');
  const uploadsDir = path.resolve(options.uploadsDir || path.resolve(dataDir, 'uploads'));
  const reportsDir = path.resolve(options.reportsDir || path.resolve(dataDir, 'reports'));
  const recordingsDir = path.resolve(options.recordingsDir || path.resolve(dataDir, 'recordings'));
  const recordingScriptsDir = options.recordingScriptsDir || path.resolve(appWorkspaceRoot, 'tests', 'recordings');
  const scriptsDir = path.resolve(options.scriptsDir || path.resolve(dataDir, 'scripts'));
  const temporaryDir = path.resolve(options.temporaryDir || path.resolve(dataDir, 'tmp'));
  const migrationWriteFile = options.migrationWriteFile || writeFile;
  const recorderPackagePath = options.recorderPackagePath
    || process.env.AUTOTEST_RECORDER_PACKAGE
    || path.resolve(appWorkspaceRoot, 'dist', RECORDER_ARCHIVE_NAME);
  await mkdir(uploadsDir, { recursive: true });
  await mkdir(reportsDir, { recursive: true });
  await mkdir(recordingsDir, { recursive: true });
  await mkdir(recordingScriptsDir, { recursive: true });
  await mkdir(scriptsDir, { recursive: true });
  await mkdir(temporaryDir, { recursive: true });

  const database = createPlatformDatabase(options.databasePath || path.resolve(dataDir, 'platform.sqlite'), {
    rootDir: dataDir,
    uploadsDir,
    reportsDir
  });
  seedPlatform(database, {
    preserveExisting: Boolean(options.desktopMode),
    includeRepositoryCatalog: !options.desktopMode
  });
  applyProjectMetadata(database, options.project);

  const app = express();
  const upload = multer({ dest: temporaryDir });
  const recordingFiles = multer({ dest: temporaryDir, limits: { fileSize: 1024 * 1024 } });
  const recordingUpload = (request, response, next) => recordingFiles.single('file')(request, response, (error) => {
    if (!error) return next();
    const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    return jsonError(response, status, error.code === 'LIMIT_FILE_SIZE' ? '录制脚本不能超过 1 MB' : '上传文件无效');
  });

  app.locals.database = database;
  app.locals.paths = {
    dataDir,
    uploadsDir,
    reportsDir,
    recordingsDir,
    recordingScriptsDir,
    scriptsDir,
    temporaryDir,
    recorderPackagePath,
    workspaceRoot: appWorkspaceRoot
  };
  app.locals.runMode = options.runMode || process.env.AUTOTEST_RUN_MODE || 'playwright';
  app.locals.recordMode = options.recordMode || process.env.AUTOTEST_RECORD_MODE || 'codegen';
  app.locals.desktopMode = Boolean(options.desktopMode);
  app.locals.desktopUser = DESKTOP_USER;
  app.locals.llmFetch = options.llmFetch || globalThis.fetch;
  app.locals.llmRequestTimeoutMs = options.llmRequestTimeoutMs;
  app.locals.browserDetectorOptions = options.browserDetectorOptions || {};
  app.locals.testPlanReportWriter = options.testPlanReportWriter || writeFile;
  app.locals.scenarioPackageScriptWriter = options.scenarioPackageScriptWriter || saveScenarioScriptContent;
  app.locals.silent = options.silent || false;
  app.locals.mockRunStepDelayMs = options.mockRunStepDelayMs || 0;
  app.locals.recordingCodeLimiter = createRecordingCodeLimiter();
  app.locals.localExecutionCodeLimiter = createRecordingCodeLimiter();
  app.locals.activeRecordingTasks = new Map();
  app.locals.activeRecordingProcesses = new Map();
  app.locals.activeExecutionTasks = new Set();
  app.locals.activePlanTasks = new Set();
  app.locals.activeChildProcesses = new Set();
  app.locals.shuttingDown = false;
  app.locals.shutdownPromise = null;
  const trackTask = (collection, promise) => {
    const task = Promise.resolve(promise);
    collection.add(task);
    task.then(
      () => collection.delete(task),
      () => collection.delete(task)
    );
    return task;
  };
  app.locals.trackExecutionTask = (promise) => trackTask(app.locals.activeExecutionTasks, promise);
  app.locals.trackPlanTask = (promise) => trackTask(app.locals.activePlanTasks, promise);
  app.locals.getActiveRecordingCount = async () => {
    const files = (await readdir(recordingsDir).catch(() => []))
      .filter((name) => name.endsWith('.meta.json'));
    let count = 0;
    for (const name of files) {
      try {
        const meta = JSON.parse(await readFile(path.resolve(recordingsDir, name), 'utf8'));
        if (['waiting', 'recording'].includes(meta.status)) count += 1;
      } catch {}
    }
    return count;
  };
  app.locals.shutdown = async () => {
    if (app.locals.shutdownPromise) return app.locals.shutdownPromise;
    app.locals.shutdownPromise = (async () => {
      app.locals.shuttingDown = true;

      // 先停止录制和 Playwright 子进程，让它们有机会写出最终状态，再关闭数据库。
      for (const processInfo of app.locals.activeRecordingProcesses.values()) {
        stopRecordingProcess(processInfo.pid, processInfo.child);
      }
      for (const child of app.locals.activeChildProcesses) {
        try {
          if (process.platform === 'win32' && child.pid) {
            stopRecordingProcess(child.pid, child);
          } else {
            child.kill();
          }
        } catch {}
      }

      await Promise.allSettled([...app.locals.activeRecordingTasks.values()]);
      await Promise.allSettled([
        ...app.locals.activeExecutionTasks,
        ...app.locals.activePlanTasks
      ]);
      await failActiveDesktopTasks(app, {
        message: '客户端已退出，执行任务已取消',
        summaryFlag: 'shutdown'
      });
    })();
    return app.locals.shutdownPromise;
  };

  if (app.locals.desktopMode) {
    await failActiveDesktopTasks(app, {
      message: '客户端上次异常退出，执行任务已取消',
      summaryFlag: 'recoveredFromInterruptedSession'
    });
  }

  app.use(express.json({ limit: '2mb' }));
  app.use('/reports', express.static(reportsDir));

  app.get('/api/health', (request, response) => {
    response.json({ ok: true, service: 'autotest-studio', runMode: app.locals.runMode, desktopMode: app.locals.desktopMode });
  });

  app.get('/api/recorder/download', requireAuth, (request, response) => {
    if (!existsSync(app.locals.paths.recorderPackagePath)) {
      return jsonError(response, 404, '\u514d\u5b89\u88c5\u5f55\u5236\u5668\u5c1a\u672a\u6784\u5efa');
    }
    return response.download(
      app.locals.paths.recorderPackagePath,
      RECORDER_ARCHIVE_NAME,
      { dotfiles: 'allow' }
    );
  });

  app.post('/api/auth/login', (request, response) => {
    const { username, password } = request.body || {};
    const user = database.verifyUser(username, password);
    if (!user) {
      return jsonError(response, 401, '\u8bf7\u6c42\u5931\u8d25');
    }
    const token = database.createSession(user.id);
    response.setHeader('set-cookie', `autotest_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax`);
    return response.json({ id: user.id, username: user.username, displayName: user.display_name, role: user.role });
  });

  app.post('/api/auth/logout', requireAuth, (request, response) => {
    database.deleteSession(sessionCookie(request));
    response.setHeader('set-cookie', 'autotest_session=; Path=/; Max-Age=0');
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
    const environmentKey = database.getDefaultEnvironment()?.key || '';
    const scenarios = database.listScenarios().map((row) => ({
      ...toPublicScenario(row),
      readiness: scenarioReadiness(database, row, environmentKey),
      quality: scenarioQuality(database, row)
    }));
    response.json({ project, scenarios, recommendations: [] });
  });

  app.get('/api/scenarios/export', requireAuth, async (request, response, next) => {
    try {
      const entries = [];
      for (const scenario of database.listScenarios()) {
        entries.push({
          scenario,
          script: scenario.script_entry
            ? await readScenarioScript({
              workspaceRoot: app.locals.paths.workspaceRoot,
              dataDir: app.locals.paths.dataDir,
              scriptEntry: scenario.script_entry
            }).catch(() => null)
            : null
        });
      }
      const scenarioPackage = createScenarioPackage(entries);
      const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
      response.setHeader('content-type', 'application/json; charset=utf-8');
      response.setHeader('content-disposition', `attachment; filename="autotest-scenarios-${date}.json"`);
      return response.send(`${JSON.stringify(scenarioPackage, null, 2)}\n`);
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/scenarios/import', requireAuth, upload.single('file'), async (request, response, next) => {
    const created = [];
    const storedPaths = [];
    let tombstonesToRestore = [];
    try {
      if (!request.file) return jsonError(response, 400, '请选择要导入的 JSON 用例包');
      const scenarioPackage = parseScenarioPackage(await readFile(request.file.path), {
        existingKeys: database.listScenarios().map((scenario) => scenario.key)
      });
      const importedKeys = new Set(scenarioPackage.scenarios.map((scenario) => scenario.key));
      tombstonesToRestore = database.listAssetTombstones('scenario')
        .filter((row) => importedKeys.has(row.asset_key));
      for (const item of scenarioPackage.scenarios) {
        let scenario = database.createScenario({
          key: item.key,
          name: item.name,
          description: item.description,
          module: item.directory,
          appId: '',
          moduleId: '',
          priority: item.priority,
          status: 'draft',
          version: '0.1.0',
          owner: item.owner || request.user.display_name || request.user.username,
          scriptEntry: '',
          dataSchema: item.dataSchema,
          dependsOn: item.dependsOn
        });
        created.push(scenario);
        if (item.script) {
          const saved = await app.locals.scenarioPackageScriptWriter({
            workspaceRoot: app.locals.paths.workspaceRoot,
            scriptsDir: app.locals.paths.scriptsDir,
            dataDir: app.locals.paths.dataDir,
            scenarioKey: item.key,
            existingScriptEntry: '',
            fileName: item.script.fileName,
            content: item.script.content
          });
          storedPaths.push(saved.storedPath);
          scenario = database.updateScenario(item.key, { scriptEntry: saved.scriptEntry });
          created[created.length - 1] = scenario;
        }
      }
      return response.status(201).json({
        imported: created.length,
        scenarios: created.map(toPublicScenario)
      });
    } catch (error) {
      await Promise.all(storedPaths.map((storedPath) => rm(storedPath, { force: true }).catch(() => {})));
      for (const scenario of [...created].reverse()) {
        try {
          database.deleteScenario(scenario.id);
        } catch {}
      }
      database.restoreAssetTombstones(tombstonesToRestore);
      if (error instanceof ScenarioPackageError) {
        return jsonError(response, error.status || 400, error.message, {
          code: error.code,
          ...(error.conflictingKeys ? { conflictingKeys: error.conflictingKeys } : {})
        });
      }
      return next(error);
    } finally {
      if (request.file?.path) await rm(request.file.path, { force: true }).catch(() => {});
    }
  });

  app.get('/api/scenarios/:key', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) {
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    }
    return response.json(toPublicScenario(scenario));
  });

  // 平台不再区分测试人员、维护员和管理员；所有登录用户能力一致。
  app.post('/api/scenarios', requireAuth, (request, response) => {
    const body = request.body || {};
    if (!body.key || !body.name) {
      return jsonError(response, 400, '\u8bf7\u6c42\u53c2\u6570\u65e0\u6548');
    }
    if (!isValidScenarioKey(body.key)) {
      return jsonError(response, 400, '场景 key 只能包含小写字母、数字和连字符，且不能以连字符开头或结尾');
    }
    if (body.scriptEntry && !isManagedScriptEntry(body.scriptEntry)) {
      return jsonError(response, 400, '脚本入口必须位于受管目录');
    }
    if (database.getScenarioByKey(body.key)) {
      return jsonError(response, 409, '\u6570\u636e\u51b2\u7a81');
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

  app.put('/api/scenarios/:key', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) {
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    }
    const body = request.body || {};
    if (Object.hasOwn(body, 'scriptEntry') && body.scriptEntry !== '' && !isManagedScriptEntry(body.scriptEntry)) {
      return jsonError(response, 400, '脚本入口必须位于受管目录');
    }
    const updated = database.updateScenario(request.params.key, body);
    return response.json(toPublicScenario(updated));
  });

  app.post('/api/scenarios/batch/move', requireAuth, (request, response) => {
    try {
      const scenarioIds = normalizeBatchScenarioIds(request.body?.scenarioIds);
      const directory = normalizeScenarioDirectory(request.body?.directory);
      const scenarios = database.moveScenarios(scenarioIds, directory);
      return response.json({
        moved: scenarios.length,
        directory,
        scenarios: scenarios.map(toPublicScenario)
      });
    } catch (error) {
      const status = error.code === 'SCENARIOS_NOT_FOUND' ? 404 : 400;
      return jsonError(response, status, error.message, {
        ...(error.missingScenarioIds ? { missingScenarioIds: error.missingScenarioIds } : {})
      });
    }
  });

  app.post('/api/scenarios/batch/delete', requireAuth, async (request, response) => {
    try {
      const scenarioIds = normalizeBatchScenarioIds(request.body?.scenarioIds);
      const result = database.deleteScenarios(scenarioIds);
      const datasetPaths = new Set(result.datasets.flatMap((dataset) => [dataset.file_path, dataset.rows_path]).filter(Boolean));
      const datasetCleanup = await Promise.allSettled([...datasetPaths].map((filePath) => rm(filePath, { force: true })));
      const cleanupWarnings = datasetCleanup.flatMap((entry, index) => entry.status === 'rejected'
        ? [{ path: [...datasetPaths][index], message: entry.reason?.message || String(entry.reason) }]
        : []);
      const scriptCleanup = await removeScenarioScriptAssets({
        workspaceRoot: app.locals.paths.workspaceRoot,
        dataDir: app.locals.paths.dataDir,
        scriptsDir: app.locals.paths.scriptsDir,
        scenarios: result.scenarios,
        remainingScenarios: database.listScenarios()
      });
      cleanupWarnings.push(...scriptCleanup.failed);
      return response.json({
        deleted: result.scenarios.length,
        scenarioIds,
        updatedTestPlanIds: result.updatedTestPlanIds,
        deletedTestPlanIds: result.deletedTestPlanIds,
        updatedDependencyScenarioIds: result.updatedDependencyScenarioIds,
        removedScriptAssets: scriptCleanup.removed.length,
        cleanupWarnings
      });
    } catch (error) {
      const status = error.code === 'SCENARIOS_NOT_FOUND'
        ? 404
        : error.code === 'SCENARIOS_IN_ACTIVE_RUN' ? 409 : 400;
      return jsonError(response, status, error.message, {
        ...(error.missingScenarioIds ? { missingScenarioIds: error.missingScenarioIds } : {}),
        ...(error.activeRunIds ? { activeRunIds: error.activeRunIds } : {}),
        ...(error.activePlanItemIds ? { activePlanItemIds: error.activePlanItemIds } : {})
      });
    }
  });

  app.post('/api/scenarios/batch/run', requireAuth, (request, response) => {
    let batch;
    try {
      const scenarioIds = normalizeBatchScenarioIds(request.body?.scenarioIds);
      const datasetIds = normalizeBatchDatasetIds(request.body?.datasetIds, scenarioIds);
      const activeBatch = database.listTestPlanRuns().find((run) => ['queued', 'running'].includes(run.status));
      if (activeBatch) {
        return jsonError(response, 409, '当前项目已有测试计划正在执行，请等待完成后再启动');
      }
      if (app.locals.shuttingDown) {
        return jsonError(response, 503, '客户端正在退出，不能启动批量执行');
      }
      batch = createScenarioSelectionBatch(database, {
        scenarioIds,
        datasetIds,
        ...(Object.hasOwn(request.body || {}, 'environment') ? { environment: request.body.environment } : {}),
        ...(Object.hasOwn(request.body || {}, 'executionMode') ? { executionMode: request.body.executionMode } : {})
      }, request.user.user_id);
    } catch (error) {
      return jsonError(response, 400, error.message);
    }

    response.status(202).json(publicTestPlanRun(database, batch));
    const task = executeTestPlanBatch(app, batch.id);
    app.locals.trackPlanTask(task);
    task.catch((error) => {
      database.updateTestPlanRun(batch.id, {
        status: 'failed',
        finishedAt: new Date().toISOString(),
        summary: { error: error.message }
      });
      if (!app.locals.silent) console.error(error);
    });
  });

  app.get('/api/scenarios/batch/runs', requireAuth, (request, response) => {
    const limit = request.query.limit === undefined ? 20 : Number(request.query.limit);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      return jsonError(response, 400, 'limit 必须是 1 到 100 之间的整数');
    }
    return response.json({
      testPlanRuns: database.listScenarioSelectionRuns(limit)
        .map((run) => publicTestPlanRun(database, run))
    });
  });

  app.get('/api/apps', requireAuth, (request, response) => {
    response.json({ apps: database.listApps().map(toPublicApp) });
  });

  app.post('/api/apps', requireAuth, (request, response) => {
    const body = request.body || {};
    if (!body.key || !body.name) {
      return jsonError(response, 400, '\u8bf7\u6c42\u53c2\u6570\u65e0\u6548');
    }
    if (database.getAppByKey(body.key)) {
      return jsonError(response, 409, '\u6570\u636e\u51b2\u7a81');
    }
    const created = database.createApp({
      key: body.key,
      name: body.name,
      description: body.description || '',
      sort: body.sort ?? 99
    });
    return response.status(201).json(toPublicApp(created));
  });

  app.put('/api/apps/:id', requireAuth, (request, response) => {
    const existing = database.getAppById(request.params.id);
    if (!existing) {
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    }
    const duplicate = request.body?.key ? database.getAppByKey(request.body.key) : null;
    if (duplicate && duplicate.id !== existing.id) {
      return jsonError(response, 409, '\u6570\u636e\u51b2\u7a81');
    }
    return response.json(toPublicApp(database.updateApp(existing.id, request.body || {})));
  });

  app.delete('/api/apps/:id', requireAuth, (request, response) => {
    const existing = database.getAppById(request.params.id);
    if (!existing) {
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    }
    const references = database.getAppReferences(existing.id);
    if (references.modules || references.scenarios) {
      return jsonError(
        response,
        409,
        `\u5e94\u7528\u4ecd\u5173\u8054 ${references.modules} \u4e2a\u6a21\u5757\u548c ${references.scenarios} \u4e2a\u573a\u666f\uff0c\u65e0\u6cd5\u5220\u9664`,
        { references }
      );
    }
    database.deleteApp(existing.id);
    return response.status(204).end();
  });

  app.get('/api/modules', requireAuth, (request, response) => {
    response.json({ modules: database.listModules(request.query.appId).map(toPublicModule) });
  });

  app.post('/api/modules', requireAuth, (request, response) => {
    const body = request.body || {};
    if (!body.appId || !body.name || !body.prefix) {
      return jsonError(response, 400, '璇峰～鍐欐墍灞炲簲鐢ㄣ€佹ā鍧楀悕绉板拰鍓嶇紑');
    }
    if (!database.getAppById(body.appId)) {
      return jsonError(response, 400, '鎵€灞炲簲鐢ㄤ笉瀛樺湪');
    }
    const created = database.createModule({
      appId: body.appId,
      name: body.name,
      prefix: body.prefix,
      sort: body.sort ?? 99
    });
    return response.status(201).json(toPublicModule(created));
  });

  app.put('/api/modules/:id', requireAuth, (request, response) => {
    const existing = database.getModuleById(request.params.id);
    if (!existing) {
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    }
    if (request.body?.appId && !database.getAppById(request.body.appId)) {
      return jsonError(response, 400, '鎵€灞炲簲鐢ㄤ笉瀛樺湪');
    }
    return response.json(toPublicModule(database.updateModule(existing.id, request.body || {})));
  });

  app.delete('/api/modules/:id', requireAuth, (request, response) => {
    const existing = database.getModuleById(request.params.id);
    if (!existing) {
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    }
    const scenarioCount = database.countScenariosForModule(existing.id);
    if (scenarioCount) {
      return jsonError(response, 409, `\u6a21\u5757\u4ecd\u5173\u8054 ${scenarioCount} \u4e2a\u573a\u666f\uff0c\u65e0\u6cd5\u5220\u9664`, { scenarioCount });
    }
    database.deleteModule(existing.id);
    return response.status(204).end();
  });

  app.get('/api/environments', requireAuth, (request, response) => {
    response.json({ environments: database.listEnvironments().map(toPublicEnvironment) });
  });

  app.post('/api/environments', requireAuth, (request, response) => {
    const body = request.body || {};
    if (!body.key || !body.name || !body.baseUrl || !body.username || !body.password) {
      return jsonError(response, 400, '请填写环境标识、名称、地址、账号和密码');
    }
    if (database.getEnvironmentByKey(body.key)) {
      return jsonError(response, 409, '\u6570\u636e\u51b2\u7a81');
    }
    let variables;
    try {
      variables = normalizeEnvironmentVariables(Object.hasOwn(body, 'variables') ? body.variables : []);
    } catch (error) {
      return jsonError(response, 400, error.message);
    }
    const env = database.createEnvironment({
      key: body.key,
      name: body.name,
      baseUrl: body.baseUrl,
      username: body.username,
      password: body.password,
      variables,
      isDefault: Boolean(body.isDefault),
      sort: body.sort ?? 99
    });
    return response.status(201).json(toPublicEnvironment(env));
  });

  app.put('/api/environments/:id', requireAuth, (request, response) => {
    const existing = database.getEnvironmentById(request.params.id);
    if (!existing) {
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    }
    if (existing.is_default && request.body?.isDefault === false) {
      return jsonError(response, 409, '至少需要保留一个默认环境，请先设置其他环境为默认环境');
    }
    const duplicate = request.body?.key ? database.getEnvironmentByKey(request.body.key) : null;
    if (duplicate && duplicate.id !== existing.id) {
      return jsonError(response, 409, '\u6570\u636e\u51b2\u7a81');
    }
    const patch = { ...(request.body || {}) };
    if (Object.hasOwn(patch, 'variables')) {
      try {
        patch.variables = normalizeEnvironmentVariables(patch.variables);
      } catch (error) {
        return jsonError(response, 400, error.message);
      }
    }
    try {
      const updated = database.updateEnvironment(request.params.id, patch);
      return response.json(toPublicEnvironment(updated));
    } catch (error) {
      if (error.code === 'DEFAULT_ENVIRONMENT_REQUIRED') {
        return jsonError(response, 409, error.message);
      }
      throw error;
    }
  });

  app.delete('/api/environments/:id', requireAuth, (request, response) => {
    const existing = database.getEnvironmentById(request.params.id);
    if (!existing) {
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    }
    if (existing.is_default) {
      return jsonError(response, 409, '\u9ed8\u8ba4\u73af\u5883\u4e0d\u80fd\u5220\u9664\uff0c\u8bf7\u5148\u8bbe\u7f6e\u5176\u4ed6\u9ed8\u8ba4\u73af\u5883');
    }
    try {
      database.deleteEnvironment(existing.id);
      return response.status(204).end();
    } catch (error) {
      if (error.code === 'DEFAULT_ENVIRONMENT_REQUIRED' || error.code === 'ENVIRONMENT_IN_USE') {
        const details = error.code === 'ENVIRONMENT_IN_USE'
          ? {
              testPlanCount: error.testPlanCount || 0,
              activeRunCount: error.activeRunCount || 0,
              activePlanRunCount: error.activePlanRunCount || 0
            }
          : {};
        return jsonError(response, 409, error.message, details);
      }
      throw error;
    }
  });

  app.get('/api/scenarios/:key/template.csv', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) {
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    }
    const schema = JSON.parse(scenario.data_schema);
    const headers = schema.columns.join(',');
    const example = schema.example ? `\n${schema.columns.map((column) => schema.example[column] || '').join(',')}` : '';
    response.setHeader('content-type', 'text/csv; charset=utf-8');
    response.setHeader('content-disposition', `attachment; filename="${scenario.key}-template.csv"`);
    return response.send(`\uFEFF${headers}${example}\n`);
  });

  app.get('/api/scenarios/:key/template.xlsx', requireAuth, async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      }
      const schema = JSON.parse(scenario.data_schema);
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('\u6d4b\u8bd5\u6570\u636e');
      worksheet.views = [{ state: 'frozen', ySplit: 1 }];
      worksheet.columns = schema.columns.map((column) => ({
        header: column,
        key: column,
        width: Math.max(16, Math.min(32, column.length * 2 + 8))
      }));
      const header = worksheet.getRow(1);
      header.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF5B52A3' } };
      header.alignment = { vertical: 'middle', horizontal: 'center' };
      header.height = 24;
      for (const column of schema.required || []) {
        const index = schema.columns.indexOf(column) + 1;
        if (index > 0) worksheet.getCell(1, index).note = '\u5fc5\u586b\u5b57\u6bb5';
      }
      if (schema.example) worksheet.addRow(schema.columns.map((column) => schema.example[column] || ''));
      const buffer = await workbook.xlsx.writeBuffer();
      response.setHeader('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      response.setHeader('content-disposition', `attachment; filename="${scenario.key}-template.xlsx"`);
      return response.send(Buffer.from(buffer));
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/scenarios/:key/sample-data', requireAuth, async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      }
      const schema = JSON.parse(scenario.data_schema);
      const result = await generateSampleRowsSmart(database, scenario, {
        count: request.body?.count || 3,
        offset: request.body?.offset || 0,
        useLlm: Boolean(request.body?.useLlm),
        rules: String(request.body?.rules || '').slice(0, 2000),
        fetchImpl: app.locals.llmFetch,
        timeoutMs: app.locals.llmRequestTimeoutMs
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
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
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
    if (!scenario) return jsonError(response, 404, '\u6d4b\u8bd5\u573a\u666f\u4e0d\u5b58\u5728');
    response.json(scenarioReadiness(database, scenario, request.query.environment || ''));
  });

  app.get('/api/scenarios/:key/datasets', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) {
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    }
    response.json(database.listDatasets(scenario.id).map(toPublicDataset));
  });

  app.post('/api/scenarios/:key/datasets/migration-preview', requireAuth, async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) return jsonError(response, 404, '测试场景不存在');
      const payload = migrationPayload(request.body);
      if (!payload) return jsonError(response, 400, '迁移参数无效');
      const sources = await loadDatasetMigrationPreviews(database, scenario, payload);
      if (!sources) return jsonError(response, 404, '测试数据集不属于当前场景');
      return response.json({ datasets: publicMigrationPreviews(sources) });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/scenarios/:key/datasets/migrate', requireAuth, async (request, response, next) => {
    const ownedPaths = [];
    let committed = false;
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) return jsonError(response, 404, '测试场景不存在');
      const payload = migrationPayload(request.body);
      if (!payload) return jsonError(response, 400, '迁移参数无效');
      const sources = await loadDatasetMigrationPreviews(database, scenario, payload);
      if (!sources) return jsonError(response, 404, '测试数据集不属于当前场景');
      const previews = publicMigrationPreviews(sources);
      if (previews.some((preview) => preview.errors.length)) {
        return jsonError(response, 422, '测试数据迁移校验失败', { datasets: previews });
      }

      const targetSchema = normalizeSchema(payload.targetSchema);
      const migration = {
        targetSchema,
        mappings: payload.mappings,
        defaults: payload.defaults
      };
      const pendingDatasets = [];
      for (const source of sources) {
        const { datasetId, fileName, rowsPath } = await writeExclusiveMigrationFile({
          database,
          uploadsDir: app.locals.paths.uploadsDir,
          scenarioId: scenario.id,
          rows: source.rows,
          writer: migrationWriteFile
        });
        ownedPaths.push(rowsPath);
        pendingDatasets.push({
          id: datasetId,
          scenarioId: scenario.id,
          name: `${source.dataset.name}（字段迁移）`,
          fileName,
          filePath: rowsPath,
          rowsPath,
          rowCount: source.rows.length,
          validationStatus: 'valid',
          uploadedBy: request.user.user_id,
          errors: [],
          schemaSnapshot: targetSchema,
          sourceDatasetId: source.dataset.id,
          migration
        });
      }
      const createdDatasets = database.createDatasetsAtomically(pendingDatasets);
      committed = true;
      return response.status(201).json({ datasets: createdDatasets.map(toPublicDataset) });
    } catch (error) {
      if (!committed) {
        await Promise.all(ownedPaths.map((filePath) => rm(filePath, { force: true }).catch(() => {})));
      }
      if (isDatasetIdConflict(error)) {
        return jsonError(response, 409, '数据集 ID 冲突，请重试');
      }
      return next(error);
    }
  });

  app.get('/api/scenarios/:key/datasets/:datasetId', requireAuth, async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      }
      const dataset = database.getDatasetById(request.params.datasetId);
      if (!dataset || dataset.scenario_id !== scenario.id) {
        return jsonError(response, 404, '娴嬭瘯鏁版嵁闆嗕笉瀛樺湪');
      }
      const rows = JSON.parse(await readFile(dataset.rows_path, 'utf8'));
      return response.json({ ...toPublicDataset(dataset), rows });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/scenarios/:key/datasets/preview', requireAuth, upload.single('file'), async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      }
      if (!request.file) {
        return jsonError(response, 400, '璇烽€夋嫨 Excel 鎴?CSV 鏂囦欢');
      }
      const schema = JSON.parse(scenario.data_schema);
      const parsed = await parseDatasetFile(request.file.path, request.file.originalname);
      const errors = validateRows(parsed.rows, schema);
      if (errors.length) {
        return jsonError(response, 422, '\u6837\u672c\u6570\u636e\u6821\u9a8c\u5931\u8d25', { errors });
      }
      return response.json({
        scenarioKey: scenario.key,
        fileName: request.file.originalname,
        columns: schema.columns,
        rows: parsed.rows
      });
    } catch (error) {
      return next(error);
    } finally {
      if (request.file?.path) await rm(request.file.path, { force: true }).catch(() => {});
    }
  });

  app.post('/api/scenarios/:key/datasets', requireAuth, upload.single('file'), async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      }
      if (!request.file) {
        return jsonError(response, 400, '\u8bf7\u6c42\u53c2\u6570\u65e0\u6548');
      }
      const schema = JSON.parse(scenario.data_schema);
      const parsed = await parseDatasetFile(request.file.path, request.file.originalname);
      const errors = validateRows(parsed.rows, schema);
      if (errors.length) {
        return jsonError(response, 422, '\u6837\u672c\u6570\u636e\u6821\u9a8c\u5931\u8d25', { errors });
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
        errors: [],
        schemaSnapshot: schema,
        sourceDatasetId: null,
        migration: {}
      });
      return response.status(201).json(toPublicDataset(dataset));
    } catch (error) {
      return next(error);
    }
  });

  app.get('/api/scenarios/:key/script', requireAuth, async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      }
      if (!scenario.script_entry) {
        return jsonError(response, 404, '鍦烘櫙灏氭湭缁戝畾鑴氭湰');
      }
      if (!isManagedScriptEntry(scenario.script_entry)) {
        return jsonError(response, 400, '脚本入口必须位于受管目录');
      }
      const script = await readScenarioScript({
        workspaceRoot: app.locals.paths.workspaceRoot,
        dataDir: app.locals.paths.dataDir,
        scriptEntry: scenario.script_entry
      });
      if (!script) {
        return jsonError(response, 400, '鑴氭湰璺緞鏃犳晥');
      }
      return response.json({
        scenarioKey: scenario.key,
        scriptEntry: scenario.script_entry,
        fileName: script.fileName,
        content: script.content
      });
    } catch (error) {
      if (error?.code === 'ENOENT') {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      }
      return next(error);
    }
  });

  app.post('/api/scenarios/:key/script', requireAuth, upload.single('file'), async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      }
      if (scenario.script_entry && !isManagedScriptEntry(scenario.script_entry)) {
        return jsonError(response, 400, '脚本入口必须位于受管目录');
      }
      if (!request.file) {
        return jsonError(response, 400, '\u8bf7\u6c42\u53c2\u6570\u65e0\u6548');
      }
      if (!isAllowedScriptFile(request.file.originalname)) {
        return jsonError(response, 400, '\u4ec5\u652f\u6301 .js / .spec.js / .mjs \u811a\u672c\u6587\u4ef6');
      }
      await archiveScenarioScriptVersion({
        workspaceRoot: app.locals.paths.workspaceRoot,
        scriptsDir: app.locals.paths.scriptsDir,
        dataDir: app.locals.paths.dataDir,
        scenarioKey: scenario.key,
        scriptEntry: scenario.script_entry,
        actor: request.user.user_id,
        reason: 'upload'
      });
      const saved = await saveScenarioScript({
        workspaceRoot: app.locals.paths.workspaceRoot,
        scriptsDir: app.locals.paths.scriptsDir,
        dataDir: app.locals.paths.dataDir,
        scenarioKey: scenario.key,
        sourcePath: request.file.path,
        originalName: request.file.originalname
      });
      const content = await readFile(saved.storedPath, 'utf8');
      const updated = database.updateScenario(scenario.key, { scriptEntry: saved.scriptEntry, ...scriptSchemaPatch(content) });
      return response.status(201).json({
        scenarioId: updated.id,
        scenarioKey: updated.key,
        scriptEntry: saved.scriptEntry,
        fileName: saved.fileName,
        dataSchema: toPublicScenario(updated).dataSchema
      });
    } catch (error) {
      return next(error);
    }
  });

  app.put('/api/scenarios/:key/script', requireAuth, async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      }
      if (scenario.script_entry && !isManagedScriptEntry(scenario.script_entry)) {
        return jsonError(response, 400, '脚本入口必须位于受管目录');
      }
      const content = typeof request.body.content === 'string' ? request.body.content : '';
      if (!content.trim()) {
        return jsonError(response, 400, '\u811a\u672c\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a');
      }
      if (Buffer.byteLength(content, 'utf8') > 1024 * 1024) {
        return jsonError(response, 413, '\u811a\u672c\u5185\u5bb9\u4e0d\u80fd\u8d85\u8fc7 1 MB');
      }
      const fileName = request.body.fileName
        || (scenario.script_entry ? path.basename(scenario.script_entry) : `${scenario.key}.spec.js`);
      if (!isAllowedScriptFile(fileName)) {
        return jsonError(response, 400, '\u4ec5\u652f\u6301 .js / .spec.js / .mjs \u811a\u672c\u6587\u4ef6');
      }
      await archiveScenarioScriptVersion({
        workspaceRoot: app.locals.paths.workspaceRoot,
        scriptsDir: app.locals.paths.scriptsDir,
        dataDir: app.locals.paths.dataDir,
        scenarioKey: scenario.key,
        scriptEntry: scenario.script_entry,
        actor: request.user.user_id,
        reason: 'edit'
      });
      const saved = await saveScenarioScriptContent({
        workspaceRoot: app.locals.paths.workspaceRoot,
        scriptsDir: app.locals.paths.scriptsDir,
        dataDir: app.locals.paths.dataDir,
        scenarioKey: scenario.key,
        existingScriptEntry: scenario.script_entry,
        fileName,
        content
      });
      const updated = database.updateScenario(scenario.key, { scriptEntry: saved.scriptEntry, ...scriptSchemaPatch(content) });
      return response.json({
        scenarioId: updated.id,
        scenarioKey: updated.key,
        scriptEntry: saved.scriptEntry,
        fileName: saved.fileName,
        content,
        dataSchema: toPublicScenario(updated).dataSchema
      });
    } catch (error) {
      return next(error);
    }
  });

  app.get('/api/scenarios/:key/script/versions', requireAuth, async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) {
        return jsonError(response, 404, '测试场景不存在');
      }
      const versions = await listScenarioScriptVersions({
        scriptsDir: app.locals.paths.scriptsDir,
        scenarioKey: scenario.key
      });
      return response.json({ scenarioKey: scenario.key, versions });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/scenarios/:key/script/versions/:versionId/restore', requireAuth, async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) {
        return jsonError(response, 404, '测试场景不存在');
      }
      await archiveScenarioScriptVersion({
        workspaceRoot: app.locals.paths.workspaceRoot,
        scriptsDir: app.locals.paths.scriptsDir,
        dataDir: app.locals.paths.dataDir,
        scenarioKey: scenario.key,
        scriptEntry: scenario.script_entry,
        actor: request.user.user_id,
        reason: 'restore'
      });
      const restored = await restoreScenarioScriptVersion({
        workspaceRoot: app.locals.paths.workspaceRoot,
        scriptsDir: app.locals.paths.scriptsDir,
        dataDir: app.locals.paths.dataDir,
        scenarioKey: scenario.key,
        versionId: request.params.versionId
      });
      if (!restored) {
        return jsonError(response, 404, '脚本版本不存在');
      }
      const updated = database.updateScenario(scenario.key, { scriptEntry: restored.scriptEntry });
      return response.json({
        scenarioId: updated.id,
        scenarioKey: updated.key,
        scriptEntry: restored.scriptEntry,
        fileName: restored.fileName
      });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/scenarios/:key/publish', requireAuth, async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      if (!scenario.script_entry) return jsonError(response, 400, '\u573a\u666f\u5c1a\u672a\u7ed1\u5b9a\u811a\u672c');
      const script = await readScenarioScript({
        workspaceRoot: app.locals.paths.workspaceRoot,
        dataDir: app.locals.paths.dataDir,
        scriptEntry: scenario.script_entry
      }).catch(() => null);
      if (!script?.content) return jsonError(response, 400, '\u573a\u666f\u811a\u672c\u65e0\u6cd5\u8bfb\u53d6');
      const validation = validateScenarioReleaseScript(script.content);
      if (!validation.valid) return jsonError(response, 400, `\u811a\u672c\u8bed\u6cd5\u65e0\u6548: ${validation.error}`);
      const input = buildScenarioReleaseInput({
        scenario,
        scriptEntry: scenario.script_entry,
        scriptContent: script.content,
        createdBy: request.user.user_id
      });
      const result = database.createScenarioReleaseAndPublish(input);
      return response.json(toPublicScenario(result.scenario));
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/scenarios/:key/unpublish', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    response.json(toPublicScenario(database.updateScenarioStatus(scenario.id, 'draft')));
  });

  app.get('/api/scenarios/:key/releases', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    return response.json(listScenarioReleases(database, scenario.id));
  });

  app.get('/api/scenarios/:key/releases/draft-compare', requireAuth, async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      if (!scenario.script_entry) return jsonError(response, 404, '\u573a\u666f\u5c1a\u672a\u7ed1\u5b9a\u811a\u672c');
      const script = await readScenarioScript({
        workspaceRoot: app.locals.paths.workspaceRoot,
        dataDir: app.locals.paths.dataDir,
        scriptEntry: scenario.script_entry
      }).catch(() => null);
      if (!script) return jsonError(response, 404, '\u811a\u672c\u4e0d\u5b58\u5728');
      const comparison = compareScenarioDraft({
        database,
        scenario,
        scriptContent: script.content,
        releaseId: request.query.releaseId
      });
      return comparison ? response.json(comparison) : jsonError(response, 404, '\u53d1\u5e03\u7248\u672c\u4e0d\u5b58\u5728');
    } catch (error) {
      return next(error);
    }
  });

  app.get('/api/scenarios/:key/releases/:releaseId', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    const release = getScenarioRelease(database, scenario.id, request.params.releaseId);
    return release ? response.json(release) : jsonError(response, 404, '\u53d1\u5e03\u7248\u672c\u4e0d\u5b58\u5728');
  });

  app.get('/api/scenarios/:key/releases/:releaseId/compare', requireAuth, (request, response) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    const comparison = compareScenarioRelease(database, scenario.id, request.params.releaseId, request.query.to || request.query.toReleaseId);
    return comparison ? response.json(comparison) : jsonError(response, 404, '\u53d1\u5e03\u7248\u672c\u4e0d\u5b58\u5728');
  });

  app.post('/api/scenarios/:key/releases/:releaseId/restore', requireAuth, async (request, response, next) => {
    const scenario = database.getScenarioByKey(request.params.key);
    if (!scenario) return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    const release = getScenarioRelease(database, scenario.id, request.params.releaseId);
    if (!release) return jsonError(response, 404, '\u53d1\u5e03\u7248\u672c\u4e0d\u5b58\u5728');
    const releaseRow = database.getScenarioReleaseById(request.params.releaseId);
    const scriptEntry = release.snapshot.scriptEntry || scenario.script_entry;
    const fileName = path.basename(scriptEntry || `${scenario.key}.spec.js`);
    const beforeScript = scenario.script_entry
      ? await readScenarioScript({ workspaceRoot: app.locals.paths.workspaceRoot, dataDir: app.locals.paths.dataDir, scriptEntry: scenario.script_entry }).catch(() => null)
      : null;
    let saved = null;
    try {
      saved = await saveScenarioScriptContent({
        workspaceRoot: app.locals.paths.workspaceRoot,
        scriptsDir: app.locals.paths.scriptsDir,
        dataDir: app.locals.paths.dataDir,
        scenarioKey: scenario.key,
        existingScriptEntry: scenario.script_entry,
        fileName,
        content: releaseRow.script_content
      });
      const restored = restoreScenarioRelease({ database, scenarioId: scenario.id, releaseId: request.params.releaseId, scriptEntry: saved.scriptEntry });
      return restored ? response.json(toPublicScenario(restored.scenario)) : jsonError(response, 404, '\u53d1\u5e03\u7248\u672c\u4e0d\u5b58\u5728');
    } catch (error) {
      try {
        if (saved?.storedPath && saved.storedPath !== beforeScript?.storedPath) {
          await rm(saved.storedPath, { force: true });
        }
        if (beforeScript) {
          await saveScenarioScriptContent({
            workspaceRoot: app.locals.paths.workspaceRoot,
            scriptsDir: app.locals.paths.scriptsDir,
            dataDir: app.locals.paths.dataDir,
            scenarioKey: scenario.key,
            existingScriptEntry: beforeScript.scriptEntry || scenario.script_entry,
            fileName: beforeScript.fileName,
            content: beforeScript.content
          });
        } else if (saved?.storedPath) {
          await rm(saved.storedPath, { force: true });
        }
      } catch {}
      return next(error);
    }
  });

  app.get('/api/test-plans', requireAuth, (request, response) => {
    response.json({ testPlans: database.listTestPlans().map(publicTestPlan) });
  });

  app.post('/api/test-plans', requireAuth, (request, response) => {
    try {
      const input = normalizeTestPlan(database, request.body || {});
      const created = database.createTestPlan({
        ...input,
        createdBy: request.user.user_id
      });
      return response.status(201).json(publicTestPlan(created));
    } catch (error) {
      return jsonError(response, 400, error.message);
    }
  });

  app.get('/api/test-plans/:id', requireAuth, (request, response) => {
    const plan = database.getTestPlanById(request.params.id);
    return plan
      ? response.json(publicTestPlan(plan))
      : jsonError(response, 404, '测试计划不存在');
  });

  app.put('/api/test-plans/:id', requireAuth, (request, response) => {
    const current = database.getTestPlanById(request.params.id);
    if (!current) return jsonError(response, 404, '测试计划不存在');
    try {
      const input = normalizeTestPlan(database, request.body || {}, current);
      return response.json(publicTestPlan(database.updateTestPlan(current.id, input)));
    } catch (error) {
      return jsonError(response, 400, error.message);
    }
  });

  app.delete('/api/test-plans/:id', requireAuth, (request, response) => {
    if (!database.getTestPlanById(request.params.id)) {
      return jsonError(response, 404, '测试计划不存在');
    }
    database.deleteTestPlan(request.params.id);
    return response.status(204).end();
  });

  app.get('/api/test-plans/:id/runs', requireAuth, (request, response) => {
    const plan = database.getTestPlanById(request.params.id);
    if (!plan) return jsonError(response, 404, '测试计划不存在');
    return response.json({
      testPlanRuns: database.listTestPlanRuns(plan.id).map((run) => publicTestPlanRun(database, run))
    });
  });

  app.post('/api/test-plans/:id/run', requireAuth, (request, response) => {
    const plan = database.getTestPlanById(request.params.id);
    if (!plan) return jsonError(response, 404, '测试计划不存在');
    const activeBatch = database.listTestPlanRuns().find((run) => ['queued', 'running'].includes(run.status));
    if (activeBatch) {
      return jsonError(response, 409, '当前项目已有测试计划正在执行，请等待完成后再启动');
    }
    if (app.locals.shuttingDown) {
      return jsonError(response, 503, '客户端正在退出，不能启动测试计划');
    }
    let batch;
    try {
      batch = createTestPlanBatch(database, plan, request.user.user_id, request.body || {});
    } catch (error) {
      return jsonError(response, 400, error.message);
    }
    response.status(202).json(publicTestPlanRun(database, batch));
    if (app.locals.shuttingDown) {
      database.updateTestPlanRun(batch.id, {
        status: 'failed',
        finishedAt: new Date().toISOString(),
        summary: { error: '客户端已退出，执行任务已取消' }
      });
    } else {
      const task = executeTestPlanBatch(app, batch.id);
      app.locals.trackPlanTask(task);
      task.catch((error) => {
          database.updateTestPlanRun(batch.id, {
            status: 'failed',
            finishedAt: new Date().toISOString(),
            summary: { error: error.message }
          });
          if (!app.locals.silent) console.error(error);
        });
    }
  });

  app.get('/api/test-plan-runs', requireAuth, (request, response) => {
    response.json({
      testPlanRuns: database.listTestPlanRuns(request.query.testPlanId || '').map((run) => publicTestPlanRun(database, run))
    });
  });

  app.get('/api/test-plan-runs/:id/items/:itemId', requireAuth, (request, response) => {
    const batch = database.getTestPlanRunById(request.params.id);
    const item = database.getTestPlanRunItemById(request.params.itemId);
    if (!batch || !item || item.test_plan_run_id !== batch.id) {
      return jsonError(response, 404, '测试计划执行项不存在');
    }
    return response.json(publicTestPlanRunItem(database, item));
  });

  app.get('/api/test-plan-runs/:id/report', requireAuth, async (request, response, next) => {
    try {
      const batch = database.getTestPlanRunById(request.params.id);
      if (!batch) return jsonError(response, 404, '测试计划执行批次不存在');
      if (!batch.report_path) return jsonError(response, 409, '测试报告尚未生成');
      const reportPath = path.resolve(batch.report_path);
      const relative = path.relative(app.locals.paths.reportsDir, reportPath);
      if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
        return jsonError(response, 404, '测试报告不存在');
      }
      if (!existsSync(reportPath)) return jsonError(response, 404, '测试报告不存在');
      const summary = (() => {
        try { return JSON.parse(batch.summary_json || '{}'); } catch { return {}; }
      })();
      const format = summary.reportFormat
        || (reportPath.endsWith('.html') ? 'html' : reportPath.endsWith('.doc') ? 'word' : 'markdown');
      const meta = reportFormatMeta(format);
      const download = String(request.query.download || '') === '1';
      if (download) {
        return response.download(reportPath, path.basename(reportPath), {
          headers: { 'content-type': meta.contentType }
        });
      }
      let content = await readFile(reportPath, 'utf8');
      if (format === 'html' || format === 'word') {
        const baseHref = `/api/test-plan-runs/${encodeURIComponent(batch.id)}/report-asset/`;
        if (/<base\s/i.test(content)) {
          content = content.replace(/<base\s[^>]*>/i, `<base href="${baseHref}" />`);
        } else {
          content = content.replace(/<head([^>]*)>/i, `<head$1><base href="${baseHref}" />`);
        }
      }
      return response.type(meta.contentType).send(content);
    } catch (error) {
      return next(error);
    }
  });

  app.get('/api/test-plan-runs/:id/report-asset/*file', requireAuth, (request, response) => {
    const batch = database.getTestPlanRunById(request.params.id);
    if (!batch?.report_path) return jsonError(response, 404, '测试报告不存在');
    const reportDir = path.dirname(path.resolve(batch.report_path));
    const requestedFile = Array.isArray(request.params.file)
      ? request.params.file.join('/')
      : request.params.file;
    const target = path.resolve(reportDir, requestedFile || '');
    const relative = path.relative(reportDir, target);
    if (!requestedFile || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative) || !existsSync(target)) {
      return jsonError(response, 404, '报告资源不存在');
    }
    return response.sendFile(target);
  });

  app.get('/api/test-plan-runs/:id', requireAuth, (request, response) => {
    const batch = database.getTestPlanRunById(request.params.id);
    return batch
      ? response.json(publicTestPlanRun(database, batch))
      : jsonError(response, 404, '测试计划执行批次不存在');
  });

  app.post('/api/runs', requireAuth, async (request, response, next) => {
    try {
      if (app.locals.shuttingDown) {
        return jsonError(response, 503, '客户端正在退出，不能启动测试执行');
      }
      const {
        scenarioId,
        datasetId,
        environment,
        executionLocation = 'server',
        enforceDependencies = false,
        skipDependencyCheck = false
      } = request.body || {};
      let executionMode;
      try {
        executionMode = normalizeExecutionMode(request.body?.executionMode);
      } catch (error) {
        return jsonError(response, 400, error.message);
      }
      if (!['server', 'local'].includes(executionLocation)) {
        return jsonError(response, 400, '执行位置无效');
      }
      const scenario = database.getScenarioById(scenarioId);
      const dataset = database.getDatasetById(datasetId);
      if (!scenario || !dataset || dataset.scenario_id !== scenario.id) {
        return jsonError(response, 400, '\u8bf7\u6c42\u53c2\u6570\u65e0\u6548');
      }
      const envRow = database.getEnvironmentByKey(environment || database.getDefaultEnvironment()?.key || '');
      if (!envRow) {
        return jsonError(response, 400, `鎵ц鐜涓嶅瓨鍦? ${environment}`);
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
        executionLocation,
        triggeredBy: request.user.user_id
      });
      if (executionLocation === 'local') {
        const reportDir = await initializeLocalRun(app, run.id);
        const ticket = await createLocalExecutionTicket({
          reportDir,
          runId: run.id,
          createdBy: request.user.user_id
        });
        return response.status(202).json({
          ...toPublicRun(database.getRunById(run.id)),
          localExecution: {
            code: ticket.code,
            expiresAt: ticket.expiresAt,
            toolDownloadUrl: '/api/recorder/download',
            desktopLaunchUrl: buildDesktopLaunchUrl({
              mode: 'execute',
              platformUrl: `${request.protocol}://${request.get('host')}`,
              code: ticket.code
            })
          }
        });
      }
      response.status(202).json(toPublicRun(run));
      if (app.locals.shuttingDown) {
        database.updateRun(run.id, {
          status: 'failed',
          finishedAt: new Date().toISOString(),
          error: '客户端已退出，执行任务已取消'
        });
      } else {
        const task = executeRun(app, run.id);
        app.locals.trackExecutionTask(task);
        task.catch((error) => {
          if (!app.locals.silent) console.error(error);
        });
      }
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/local-runs/resolve', async (request, response, next) => {
    try {
      const clientKey = request.ip || request.socket.remoteAddress || 'unknown';
      const limit = app.locals.localExecutionCodeLimiter.check(clientKey);
      if (!limit.allowed) {
        response.setHeader('retry-after', String(Math.max(1, Math.ceil(limit.retryAfterMs / 1000))));
        return jsonError(response, 429, '尝试次数过多，请稍后再试');
      }
      const resolved = await resolveLocalExecutionTicket({
        reportsDir: app.locals.paths.reportsDir,
        code: request.body?.code || ''
      });
      if (!resolved) {
        app.locals.localExecutionCodeLimiter.fail(clientKey);
        return jsonError(response, 401, '执行码无效、已使用或已过期');
      }
      const run = database.getRunById(resolved.meta.runId);
      if (!run || run.execution_location !== 'local' || run.status !== 'queued') {
        return jsonError(response, 409, '本地执行任务当前不可领取');
      }
      const scenario = database.getScenarioById(run.scenario_id);
      const dataset = database.getDatasetById(run.dataset_id);
      const environment = database.getEnvironmentByKey(run.environment);
      if (!scenario || !dataset || !environment) {
        return jsonError(response, 409, '执行任务关联的场景、数据集或环境不存在');
      }
      const bundle = await buildLocalExecutionBundle({
        workspaceRoot: app.locals.paths.workspaceRoot,
        dataDir: app.locals.paths.dataDir,
        scenario,
        dataset,
        environment
      });
      const claimedAt = new Date().toISOString();
      await writeLocalExecutionMeta(resolved.reportDir, {
        ...resolved.meta,
        status: 'running',
        recordCodeHash: null,
        recordCodeUsedAt: claimedAt,
        claimedAt
      });
      await markLocalRunStarted(app, run.id);
      app.locals.localExecutionCodeLimiter.clear(clientKey);
      return response.json({
        ...bundle,
        runId: run.id,
        token: resolved.meta.token,
        executionMode: run.execution_mode || 'headed'
      });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/local-runs/:runId/artifacts', upload.single('file'), async (request, response, next) => {
    try {
      const run = database.getRunById(request.params.runId);
      const reportDir = path.resolve(app.locals.paths.reportsDir, request.params.runId);
      const meta = await readLocalExecutionMeta(reportDir);
      if (!run || run.execution_location !== 'local' || !hasValidLocalExecutionToken(meta, request.body?.token)) {
        if (request.file) await rm(request.file.path, { force: true });
        return jsonError(response, 401, '本地执行上传凭证无效或已过期');
      }
      if (!request.file) return jsonError(response, 400, '请选择要上传的执行结果文件');
      const target = resolveLocalArtifactPath(reportDir, request.body?.path);
      if (!target || path.basename(target) === 'local-execution.json') {
        await rm(request.file.path, { force: true });
        return jsonError(response, 400, '执行结果文件路径无效');
      }
      await mkdir(path.dirname(target), { recursive: true });
      await rm(target, { force: true });
      await rename(request.file.path, target);
      return response.status(201).json({ ok: true, path: request.body.path });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/local-runs/:runId/finish', async (request, response, next) => {
    try {
      const run = database.getRunById(request.params.runId);
      const reportDir = path.resolve(app.locals.paths.reportsDir, request.params.runId);
      const meta = await readLocalExecutionMeta(reportDir);
      if (!run || run.execution_location !== 'local' || !hasValidLocalExecutionToken(meta, request.body?.token)) {
        return jsonError(response, 401, '本地执行上传凭证无效或已过期');
      }
      if (meta.status === 'finished') return jsonError(response, 409, '本地执行结果已经提交');
      const completed = await completeLocalRun(app, run.id, {
        exitCode: Number(request.body?.exitCode ?? 1),
        error: String(request.body?.error || '')
      });
      await writeLocalExecutionMeta(reportDir, {
        ...meta,
        status: 'finished',
        token: null,
        finishedAt: new Date().toISOString()
      });
      return response.json(toPublicRun(runWithArtifacts(database, completed)));
    } catch (error) {
      return next(error);
    }
  });

  app.get('/api/runs', requireAuth, (request, response) => {
    response.json(database.listRuns().map((run) => toPublicRun(runWithArtifacts(database, run))));
  });

  app.get('/api/runs/:runId', requireAuth, (request, response) => {
    const run = database.getRunById(request.params.runId);
    if (!run) {
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    }
    response.json(toPublicRun(runWithArtifacts(database, run)));
  });

  app.get('/api/runs/:runId/failed-rows.csv', requireAuth, (request, response) => {
    const run = database.getRunById(request.params.runId);
    if (!run) return jsonError(response, 404, '\u6267\u884c\u8bb0\u5f55\u4e0d\u5b58\u5728');
    const summary = JSON.parse(run.summary || '{}');
    response.type('text/csv; charset=utf-8');
    response.send(Array.isArray(summary.failedRows) && summary.failedRows.length ? rowsToCsv(summary.failedRows) : '\u72b6\u6001,\u8bf4\u660e\n\u65e0\u5931\u8d25\u6570\u636e,\u672c\u6b21\u6267\u884c\u6ca1\u6709\u5931\u8d25\u884c');
  });

  app.get('/api/runs/:runId/process', requireAuth, async (request, response, next) => {
    try {
      const run = database.getRunById(request.params.runId);
      if (!run) {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
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

  app.get('/api/settings/general', requireAuth, (request, response) => {
    response.json(readGeneralSettings(database));
  });

  app.get('/api/settings/browser-status', requireAuth, (request, response) => {
    const settings = readGeneralSettings(database);
    response.json(createBrowserStatus(settings.browserChannel, app.locals.browserDetectorOptions));
  });

  app.put('/api/settings/general', requireAuth, (request, response) => {
    try {
      const value = normalizeGeneralSettings(request.body || {}, readGeneralSettings(database));
      const row = database.setSetting('general', value, request.user.user_id);
      return response.json({ ...value, updatedAt: row.updated_at });
    } catch (error) {
      return jsonError(response, 400, error.message);
    }
  });

  app.get('/api/settings/report-templates', requireAuth, (request, response) => {
    const setting = readReportTemplatesSetting(database);
    response.json({
      ...setting,
      moduleOptions: REPORT_MODULE_OPTIONS,
      formatOptions: REPORT_FORMAT_OPTIONS.map(({ value, label }) => ({ value, label }))
    });
  });

  app.put('/api/settings/report-templates', requireAuth, (request, response) => {
    try {
      const current = readReportTemplatesSetting(database);
      const value = normalizeReportTemplatesSetting(request.body || {}, current);
      const row = database.setSetting('reportTemplates', value, request.user.user_id);
      return response.json({
        ...value,
        updatedAt: row.updated_at,
        moduleOptions: REPORT_MODULE_OPTIONS,
        formatOptions: REPORT_FORMAT_OPTIONS.map(({ value: format, label }) => ({ value: format, label }))
      });
    } catch (error) {
      return jsonError(response, 400, error.message);
    }
  });

  app.post('/api/settings/report-templates/preview', requireAuth, (request, response) => {
    try {
      const template = request.body?.template || request.body || {};
      const preview = previewReportTemplate(template);
      return response.json(preview);
    } catch (error) {
      return jsonError(response, 400, error.message);
    }
  });

  app.put('/api/settings/llm', requireAuth, (request, response) => {
    const current = database.getSetting('llm');
    const currentValue = current ? JSON.parse(current.value) : {};
    const { provider = '', model = '', baseUrl = '', enabled = true } = request.body || {};
    const apiKey = String(request.body?.apiKey || '').trim() || currentValue.apiKey || '';
    if (!provider || !model || !apiKey) {
      return jsonError(response, 400, '请填写供应商、模型和 API Key');
    }
    const row = database.setSetting('llm', { provider, model, baseUrl, apiKey, enabled }, request.user.user_id);
    response.json(publicLlmSetting(row));
  });

  app.post('/api/settings/llm/test', requireAuth, async (request, response) => {
    const current = database.getSetting('llm');
    const currentValue = current ? JSON.parse(current.value) : {};
    const body = request.body || {};
    const value = {
      provider: String(body.provider ?? currentValue.provider ?? '').trim(),
      model: String(body.model ?? currentValue.model ?? '').trim(),
      baseUrl: String(body.baseUrl ?? currentValue.baseUrl ?? '').trim(),
      apiKey: String(body.apiKey || '').trim() || currentValue.apiKey || ''
    };
    if (!value.apiKey) {
      return jsonError(response, 400, '请先填写 API Key');
    }
    if (!value.baseUrl || !value.model) {
      return jsonError(response, 400, '请先填写 Base URL 和模型');
    }
    try {
      await testLlmConnection(value, { fetchImpl: app.locals.llmFetch });
      return response.json({ ok: true, message: 'AI 服务连接成功' });
    } catch (error) {
      return jsonError(response, 502, `AI 服务连接失败：${error.message}`);
    }
  });

  app.post('/api/settings/llm/models', requireAuth, async (request, response) => {
    const current = database.getSetting('llm');
    const currentValue = current ? JSON.parse(current.value) : {};
    const baseUrl = String(request.body?.baseUrl || currentValue.baseUrl || '').trim();
    const apiKey = String(request.body?.apiKey || '').trim() || currentValue.apiKey || '';
    if (!baseUrl) {
      return jsonError(response, 400, '请先填写 Base URL');
    }
    if (!apiKey) {
      return jsonError(response, 400, '请先填写 API Key');
    }
    try {
      const models = await listLlmModels(
        { baseUrl, apiKey },
        { fetchImpl: app.locals.llmFetch }
      );
      return response.json({ models });
    } catch (error) {
      return jsonError(response, 502, `获取模型列表失败：${error.message}`);
    }
  });

  app.post('/api/recordings/start', requireAuth, async (request, response, next) => {
    try {
      if (app.locals.shuttingDown) {
        return jsonError(response, 503, '客户端正在退出，不能启动录制');
      }
      const scenarioKey = request.body?.scenarioKey || '';
      const environmentKey = request.body?.environmentKey || database.getDefaultEnvironment()?.key || '';
      const location = request.body?.location === 'server' ? 'server' : 'local';
      const platformUrl = `${request.protocol}://${request.get('host')}`;
      const environment = database.getEnvironmentByKey(environmentKey) || database.getDefaultEnvironment();
      if (!environment) {
        return jsonError(response, 400, '\u8bf7\u6c42\u53c2\u6570\u65e0\u6548');
      }
      if (scenarioKey && !database.getScenarioByKey(scenarioKey)) {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      }
      const id = database.nextId('REC');
      const outputPath = path.resolve(app.locals.paths.recordingScriptsDir, `${id}.spec.js`);
      const baseUrl = environment.base_url.replace(/\/+$/, '');
      const startUrl = `${baseUrl}/#/login`;
      const uploadToken = createRecordingUploadToken();
      const uploadTokenExpires = new Date(Date.now() + 30 * 60 * 1000).toISOString();
      const recordCode = location === 'local' ? createRecordingCode() : null;
      let processInfo = { pid: null, mode: location, startUrl };
      const recordMode = app.locals.recordMode || 'codegen';

      if (location === 'server') {
        if (recordMode === 'stub') {
          await writeRecordingStub(outputPath, id, environment);
        }
        processInfo = startRecordingProcess({
          workspaceRoot: app.locals.paths.workspaceRoot,
          outputPath,
          environment,
          recordMode,
          browserChannel: readGeneralSettings(database).browserChannel,
          browserOptions: app.locals.browserDetectorOptions
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
          recordCodeHash: recordCode?.hash || null,
          recordCodeExpires: recordCode?.expiresAt || null,
          recordCodeUsedAt: null,
          createdBy: request.user.user_id,
          createdAt: new Date().toISOString()
        }, null, 2)}\n`,
        'utf8'
      );
      if (location === 'server') {
        app.locals.activeRecordingProcesses.set(id, {
          pid: processInfo.pid,
          child: processInfo.child || null
        });
        const completion = processInfo.completion || Promise.resolve({ exitCode: 0, signal: null, error: null });
        const task = completion
          .then(async ({ exitCode, error }) => {
            if (app.locals.shuttingDown) throw new Error('客户端正在退出，录制任务已取消');
            if (error) throw error;
            if (exitCode && !existsSync(outputPath)) throw new Error(`录制进程异常退出：${exitCode}`);
            return finalizeRecording(app, { id, scenarioKey, actor: request.user.user_id });
          })
          .catch((error) => markRecordingFailed(app, id, error))
          .finally(() => {
            app.locals.activeRecordingTasks.delete(id);
            app.locals.activeRecordingProcesses.delete(id);
          });
        app.locals.activeRecordingTasks.set(id, task);
      }
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
        uploadToken: location === 'local' ? uploadToken : null,
        recordCode: recordCode?.code || null,
        recordCodeExpires: recordCode?.expiresAt || null,
        recorderDownloadUrl: location === 'local' ? '/api/recorder/download' : null,
        desktopLaunchUrl: location === 'local'
          ? buildDesktopLaunchUrl({ mode: 'record', platformUrl, code: recordCode.code })
          : null
      });
    } catch (error) {
      if (error?.code === 'SYSTEM_BROWSER_NOT_FOUND') {
        return jsonError(response, 400, error.message);
      }
      return next(error);
    }
  });

  app.post('/api/recordings/resolve', async (request, response, next) => {
    try {
      const clientKey = request.ip || request.socket.remoteAddress || 'unknown';
      const limit = app.locals.recordingCodeLimiter.check(clientKey);
      if (!limit.allowed) {
        response.setHeader('retry-after', String(Math.max(1, Math.ceil(limit.retryAfterMs / 1000))));
        return jsonError(response, 429, '\u8bf7\u6c42\u53c2\u6570\u65e0\u6548');
      }

      const code = request.body?.code || '';
      const files = (await readdir(app.locals.paths.recordingsDir))
        .filter((name) => name.endsWith('.meta.json'))
        .sort()
        .reverse();

      for (const name of files) {
        const metaPath = path.resolve(app.locals.paths.recordingsDir, name);
        const meta = JSON.parse(await readFile(metaPath, 'utf8'));
        if (meta.location !== 'local' || !verifyRecordingCode(meta, code).ok) continue;

        meta.recordCodeUsedAt = new Date().toISOString();
        meta.recordCodeHash = null;
        await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
        app.locals.recordingCodeLimiter.clear(clientKey);
        return response.json({
          id: meta.id,
          token: meta.uploadToken,
          startUrl: meta.startUrl,
          expiresAt: meta.uploadTokenExpires
        });
      }

      app.locals.recordingCodeLimiter.fail(clientKey);
      return jsonError(response, 401, '\u8bf7\u6c42\u5931\u8d25');
    } catch (error) {
      return next(error);
    }
  });

  app.get('/api/recordings/:id', requireAuth, async (request, response, next) => {
    try {
      const metaPath = path.resolve(app.locals.paths.recordingsDir, `${request.params.id}.meta.json`);
      if (!existsSync(metaPath)) {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      }
      let meta = JSON.parse(await readFile(metaPath, 'utf8'));
      if (meta.location === 'server'
        && meta.status === 'recording'
        && !app.locals.activeRecordingTasks.has(meta.id)
        && !isProcessRunning(meta.pid)) {
        try {
          await finalizeRecording(app, { id: meta.id, scenarioKey: meta.scenarioKey, actor: meta.createdBy });
        } catch (error) {
          await markRecordingFailed(app, meta.id, error);
        }
        meta = JSON.parse(await readFile(metaPath, 'utf8'));
      }
      return response.json({
        id: meta.id,
        status: meta.status,
        location: meta.location || 'server',
        scenarioKey: meta.scenarioKey || null,
        scriptEntry: meta.scriptEntry || null,
        analysis: meta.analysis || null,
        error: meta.error || null,
        startUrl: meta.startUrl || null,
        finishedAt: meta.finishedAt || null
      });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/recordings/:id/upload', recordingUpload, async (request, response, next) => {
    let temporaryUploadPath = request.file?.path || '';
    try {
      const id = request.params.id;
      const metaPath = path.resolve(app.locals.paths.recordingsDir, `${id}.meta.json`);
      if (!existsSync(metaPath)) {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
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
        if (request.file?.path) await rm(request.file.path, { force: true });
        temporaryUploadPath = '';
        return jsonError(response, 401, '褰曞埗涓婁紶鍑瘉鏃犳晥鎴栧凡杩囨湡');
      }
      if (!request.file) {
        return jsonError(response, 400, '\u8bf7\u6c42\u53c2\u6570\u65e0\u6548');
      }
      temporaryUploadPath = request.file.path;
      const outputPath = meta.outputPath
        ? path.resolve(meta.outputPath)
        : path.resolve(app.locals.paths.recordingScriptsDir, `${id}.spec.js`);
      const incomingContent = await readFile(request.file.path, 'utf8');
      const existingContent = existsSync(outputPath) ? await readFile(outputPath, 'utf8').catch(() => null) : null;
      const scenarioKey = meta.scenarioKey || request.body?.scenarioKey || '';
      let archivedBeforeReplace = false;
      if (scenarioKey && existingContent !== null && existingContent !== incomingContent) {
        const existingRawEntry = resolveRecordingScriptEntry(app.locals.paths.workspaceRoot, outputPath, app.locals.paths.dataDir);
        const currentScenario = database.getScenarioByKey(scenarioKey);
        if (existingRawEntry && currentScenario?.script_entry === existingRawEntry) {
          await archiveScenarioScriptVersion({
            workspaceRoot: app.locals.paths.workspaceRoot,
            scriptsDir: app.locals.paths.scriptsDir,
            dataDir: app.locals.paths.dataDir,
            scenarioKey: currentScenario.key,
            scriptEntry: existingRawEntry,
            actor: meta.createdBy || '',
            reason: 'recording'
          });
          archivedBeforeReplace = true;
        }
      }
      if (existingContent !== incomingContent) {
        await moveRecordingUpload(request.file.path, outputPath);
        temporaryUploadPath = '';
      } else {
        await rm(request.file.path, { force: true });
        temporaryUploadPath = '';
      }
      const content = existingContent === incomingContent ? existingContent : incomingContent;
      const analysis = analyzeRecordingScript(content);
      const uploadScriptEntry = resolveRecordingScriptEntry(
        app.locals.paths.workspaceRoot,
        outputPath,
        app.locals.paths.dataDir
      );
      if (!uploadScriptEntry) {
        return jsonError(response, 400, '褰曞埗鑴氭湰鏃犳晥');
      }
      let scriptEntry = uploadScriptEntry;
      let scenario = null;
      if (scenarioKey) {
        scenario = database.getScenarioByKey(scenarioKey);
        if (!scenario) {
          return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
        }
        const preserveApplied = Boolean(meta.applied?.scriptEntry)
          && scenario.script_entry === meta.applied.scriptEntry
          && existingContent === incomingContent;
        const preserveRawBinding = scenario.script_entry === uploadScriptEntry && existingContent === incomingContent;
        const preserveBinding = preserveApplied || preserveRawBinding;
        if (!archivedBeforeReplace && !preserveBinding && scenario.script_entry && (scenario.script_entry !== uploadScriptEntry || existingContent !== incomingContent)) {
          await archiveScenarioScriptVersion({
            workspaceRoot: app.locals.paths.workspaceRoot,
            scriptsDir: app.locals.paths.scriptsDir,
            dataDir: app.locals.paths.dataDir,
            scenarioKey: scenario.key,
            scriptEntry: scenario.script_entry,
            actor: meta.createdBy || '',
            reason: 'recording'
          });
        }
        if (!preserveBinding) {
          scenario = database.updateScenario(scenarioKey, { scriptEntry: uploadScriptEntry, ...scriptSchemaPatch(content) });
        } else {
          scriptEntry = scenario.script_entry;
        }
      }
      meta.status = 'draft';
      meta.finishedAt = meta.finishedAt || new Date().toISOString();
      meta.scriptEntry = scriptEntry;
      meta.rawScriptEntry = uploadScriptEntry;
      meta.analysis = analysis;
      await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
      return response.json({
        id,
        status: 'draft',
        scriptEntry,
        scenario: scenario ? toPublicScenario(scenario) : null,
        analysis
      });
    } catch (error) {
      return next(error);
    } finally {
      if (temporaryUploadPath) await rm(temporaryUploadPath, { force: true }).catch(() => {});
    }
  });

  async function prepareRecordingReview(request, response) {
    const metaPath = path.resolve(app.locals.paths.recordingsDir, `${request.params.id}.meta.json`);
    if (!existsSync(metaPath)) {
      jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      return null;
    }
    const meta = JSON.parse(await readFile(metaPath, 'utf8'));
    if (meta.createdBy && meta.createdBy !== request.user.user_id) {
      jsonError(response, 403, '无权处理其他用户的录制');
      return null;
    }
    const scenarioKey = meta.scenarioKey || request.body?.scenarioKey || '';
    const scenario = scenarioKey ? database.getScenarioByKey(scenarioKey) : null;
    if (!scenario) {
      jsonError(response, 404, '\u573a\u666f\u4e0d\u5b58\u5728');
      return null;
    }
    if (!meta.scriptEntry || !meta.outputPath || !existsSync(meta.outputPath)) {
      jsonError(response, 404, '\u5f55\u5236\u811a\u672c\u5c1a\u672a\u4e0a\u4f20');
      return null;
    }
    const body = request.body || {};
    if (!Array.isArray(body.fields) || !Array.isArray(body.assertions)) {
      jsonError(response, 422, '\u5b57\u6bb5\u548c\u65ad\u8a00\u914d\u7f6e\u5fc5\u987b\u662f\u6570\u7ec4');
      return null;
    }
    const source = await readFile(meta.outputPath, 'utf8');
    const built = buildRecordingReviewScript({ source, title: body.title, fields: body.fields, assertions: body.assertions });
    if (!built.supported) {
      jsonError(response, 422, '\u5f55\u5236\u811a\u672c\u53c2\u6570\u65e0\u6548', { warnings: built.warnings });
      return null;
    }
    return { metaPath, meta, scenario, source, built };
  }

  app.post('/api/recordings/:id/preview', requireAuth, async (request, response, next) => {
    try {
      const review = await prepareRecordingReview(request, response);
      if (!review) return;
      return response.json({ source: review.built.source, schema: review.built.schema, warnings: review.built.warnings });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/recordings/:id/apply', requireAuth, async (request, response, next) => {
    try {
      const review = await prepareRecordingReview(request, response);
      if (!review) return;
      const { metaPath, meta, scenario, source, built } = review;
      if (built.warnings.length) return jsonError(response, 422, '\u5f55\u5236\u811a\u672c\u53c2\u6570\u65e0\u6548', { warnings: built.warnings });
      const existingScriptEntry = meta.applied?.scriptEntry || '';
      const previousScript = existingScriptEntry
        ? await readScenarioScript({ workspaceRoot: app.locals.paths.workspaceRoot, dataDir: app.locals.paths.dataDir, scriptEntry: existingScriptEntry }).catch(() => null)
        : null;
      if (previousScript?.content === built.script && scenario.script_entry === existingScriptEntry) {
        return response.json({ scenario: toPublicScenario(scenario), script: built.script, analysis: meta.analysis || analyzeRecordingScript(source) });
      }
      if (existingScriptEntry && !isManagedScriptEntry(existingScriptEntry)) return jsonError(response, 400, '脚本入口必须位于受管目录');
      if (scenario.script_entry && existingScriptEntry && scenario.script_entry === existingScriptEntry) {
        await archiveScenarioScriptVersion({
          workspaceRoot: app.locals.paths.workspaceRoot,
          scriptsDir: app.locals.paths.scriptsDir,
          dataDir: app.locals.paths.dataDir,
          scenarioKey: scenario.key,
          scriptEntry: scenario.script_entry,
          actor: request.user.user_id,
          reason: 'recording-apply'
        });
      }
      const saved = await saveScenarioScriptContent({
        workspaceRoot: app.locals.paths.workspaceRoot,
        scriptsDir: app.locals.paths.scriptsDir,
        dataDir: app.locals.paths.dataDir,
        scenarioKey: scenario.key,
        existingScriptEntry,
        fileName: `${scenario.key}.spec.js`,
        content: built.script
      });
      const updated = database.updateScenario(scenario.key, { scriptEntry: saved.scriptEntry, dataSchema: built.schema });
      meta.applied = { at: new Date().toISOString(), by: request.user.user_id, scriptEntry: saved.scriptEntry };
      meta.status = 'draft';
      await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
      return response.json({ scenario: toPublicScenario(updated), script: built.script, analysis: meta.analysis || analyzeRecordingScript(source) });
    } catch (error) {
      return next(error);
    }
  });

  app.get('/api/scenarios/:key/contract', requireAuth, async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      if (!scenario.script_entry) return jsonError(response, 404, '\u573a\u666f\u5c1a\u672a\u7ed1\u5b9a\u811a\u672c');
      if (!isManagedScriptEntry(scenario.script_entry)) return jsonError(response, 400, '脚本入口必须位于受管目录');
      const script = await readScenarioScript({ workspaceRoot: app.locals.paths.workspaceRoot, dataDir: app.locals.paths.dataDir, scriptEntry: scenario.script_entry }).catch(() => null);
      if (!script) return jsonError(response, 404, '\u811a\u672c\u4e0d\u5b58\u5728');
      const platformSchema = normalizeSchema(JSON.parse(scenario.data_schema));
      const scriptSchema = normalizeSchema(extractScriptDataSchema(script.content) || {});
      const diff = diffSchemas(platformSchema, scriptSchema);
      const probe = scriptSchema.fields.length ? synchronizeScriptSchema({ source: script.content, targetSchema: platformSchema }) : { conflicts: [] };
      return response.json({ platformSchema, scriptSchema, diff, conflicts: probe.conflicts || [] });
    } catch (error) {
      return next(error);
    }
  });

  app.put('/api/scenarios/:key/contract', requireAuth, async (request, response, next) => {
    try {
      const scenario = database.getScenarioByKey(request.params.key);
      if (!scenario) return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      if (!scenario.script_entry) return jsonError(response, 404, '\u573a\u666f\u5c1a\u672a\u7ed1\u5b9a\u811a\u672c');
      if (!isManagedScriptEntry(scenario.script_entry)) return jsonError(response, 400, '脚本入口必须位于受管目录');
      const script = await readScenarioScript({ workspaceRoot: app.locals.paths.workspaceRoot, dataDir: app.locals.paths.dataDir, scriptEntry: scenario.script_entry }).catch(() => null);
      if (!script) return jsonError(response, 404, '\u811a\u672c\u4e0d\u5b58\u5728');
      const { resolution, targetSchema, mappings = [] } = request.body || {};
      if (!['platform', 'script', 'merge'].includes(resolution) || !Array.isArray(mappings)) return jsonError(response, 422, '\u5408\u540c\u53c2\u6570\u65e0\u6548');
      if (resolution === 'merge' && (!targetSchema || typeof targetSchema !== 'object' || Array.isArray(targetSchema)
        || (!Array.isArray(targetSchema.columns) && !Array.isArray(targetSchema.fields)))) {
        return jsonError(response, 422, '\u76ee\u6807 schema \u65e0\u6548');
      }
      const platformSchema = normalizeSchema(JSON.parse(scenario.data_schema));
      const scriptSchema = normalizeSchema(extractScriptDataSchema(script.content) || {});
      const requireMigrationWhenDataExists = (target) => {
        if (!diffSchemas(platformSchema, target).hasChanges) return null;
        const datasets = database.listDatasets(scenario.id);
        if (!datasets.length) return null;
        return jsonError(response, 409, '字段已变化，请先通过数据迁移向导生成新数据集', {
          code: 'MIGRATION_REQUIRED',
          targetSchema: target,
          datasetCount: datasets.length,
          datasets: datasets.map(toPublicDataset)
        });
      };
      if (resolution === 'script') {
        if (!scriptSchema.fields.length) return jsonError(response, 422, '\u811a\u672c schema \u65e0\u6548');
        if (!diffSchemas(platformSchema, scriptSchema).hasChanges) {
          return response.json({ scenario: toPublicScenario(scenario), script: script.content, analysis: analyzeRecordingScript(script.content) });
        }
        const migrationRequired = requireMigrationWhenDataExists(scriptSchema);
        if (migrationRequired) return migrationRequired;
        const updated = database.updateScenario(scenario.key, { dataSchema: scriptSchema });
        return response.json({ scenario: toPublicScenario(updated), script: script.content, analysis: analyzeRecordingScript(script.content) });
      }
      const target = resolution === 'platform' ? platformSchema : normalizeSchema(targetSchema);
      const scriptMatchesTarget = !diffSchemas(target, scriptSchema).hasChanges;
      if (scriptMatchesTarget) {
        const platformMatchesTarget = !diffSchemas(target, platformSchema).hasChanges;
        if (resolution === 'merge' && !platformMatchesTarget) {
          const migrationRequired = requireMigrationWhenDataExists(target);
          if (migrationRequired) return migrationRequired;
        }
        const updated = resolution === 'merge' && !platformMatchesTarget
          ? database.updateScenario(scenario.key, { dataSchema: target })
          : scenario;
        return response.json({ scenario: toPublicScenario(updated), script: script.content, analysis: analyzeRecordingScript(script.content) });
      }
      const synced = synchronizeScriptSchema({ source: script.content, targetSchema: target, mappings });
      if (!synced.ok) return jsonError(response, 409, '\u811a\u672c schema \u5b58\u5728\u51b2\u7a81', { conflicts: synced.conflicts || [] });
      if (synced.source === script.content) {
        return response.json({ scenario: toPublicScenario(scenario), script: script.content, analysis: analyzeRecordingScript(script.content) });
      }
      if (resolution !== 'platform') {
        const migrationRequired = requireMigrationWhenDataExists(target);
        if (migrationRequired) return migrationRequired;
      }
      await archiveScenarioScriptVersion({
        workspaceRoot: app.locals.paths.workspaceRoot,
        scriptsDir: app.locals.paths.scriptsDir,
        dataDir: app.locals.paths.dataDir,
        scenarioKey: scenario.key,
        scriptEntry: scenario.script_entry,
        actor: request.user.user_id,
        reason: `contract-${resolution}`
      });
      const saved = await saveScenarioScriptContent({
        workspaceRoot: app.locals.paths.workspaceRoot,
        scriptsDir: app.locals.paths.scriptsDir,
        dataDir: app.locals.paths.dataDir,
        scenarioKey: scenario.key,
        existingScriptEntry: scenario.script_entry,
        fileName: script.fileName,
        content: synced.source
      });
      const updated = database.updateScenario(scenario.key, resolution === 'platform'
        ? { scriptEntry: saved.scriptEntry }
        : { scriptEntry: saved.scriptEntry, dataSchema: target });
      return response.json({ scenario: toPublicScenario(updated), script: synced.source, analysis: analyzeRecordingScript(synced.source) });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/api/recordings/:id/finish', requireAuth, async (request, response, next) => {
    try {
      const result = await finalizeRecording(app, {
        id: request.params.id,
        scenarioKey: request.body?.scenarioKey || '',
        actor: request.user.user_id,
        stopProcess: true
      });
      return result ? response.json(result) : jsonError(response, 404, '录制任务不存在');
    } catch (error) {
      return next(error);
    }
  });

  app.get('/api/runs/:runId/report-file/*file', requireAuth, (request, response) => {
    const run = database.getRunById(request.params.runId);
    if (!run?.report_path) {
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    }

    const reportRoot = path.resolve(run.report_path);
    const requestedFile = Array.isArray(request.params.file)
      ? request.params.file.join('/')
      : request.params.file;
    const filePath = [
      path.resolve(reportRoot, requestedFile),
      path.resolve(reportRoot, 'html', requestedFile)
    ].find((candidate) => {
      const relative = path.relative(reportRoot, candidate);
      return relative && !relative.startsWith('..') && !path.isAbsolute(relative) && existsSync(candidate);
    });

    if (!filePath) {
      return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
    }
    response.type(path.extname(filePath));
    createReadStream(filePath).pipe(response);
  });

  app.get('/api/runs/:runId/live', requireAuth, async (request, response, next) => {
    try {
      const run = database.getRunById(request.params.runId);
      if (!run) {
        return jsonError(response, 404, '\u8d44\u6e90\u4e0d\u5b58\u5728');
      }
      const process = await runProcessPayload(app, run);
      response.type('html').send(`<!doctype html>
<html lang="zh-CN">
<meta charset="utf-8">
<meta http-equiv="refresh" content="2">
<title>${process.scenarioName} - \u5b9e\u65f6\u6267\u884c\u8fc7\u7a0b</title>
<body style="margin:0;background:#101828;color:#fff;font-family:Arial,'Microsoft YaHei',sans-serif">
  <main style="padding:18px">
    <h1 style="margin:0 0 8px;font-size:20px">\u5b9e\u65f6\u6267\u884c\u8fc7\u7a0b</h1>
    <p style="margin:0 0 16px;color:#d0d5dd">${process.scenarioName} 路 ${process.currentStep || process.status}</p>
    ${process.latestScreenshotUrl
      ? `<img src="${process.latestScreenshotUrl}" alt="\u5b9e\u65f6\u6267\u884c\u622a\u56fe" style="width:100%;max-height:72vh;object-fit:contain;border-radius:10px;background:#fff" />`
      : '<div style="display:grid;min-height:320px;place-items:center;border:1px solid #344054;border-radius:10px;color:#98a2b3">\u7b49\u5f85\u6d4f\u89c8\u5668\u753b\u9762...</div>'}
  </main>
</body>
</html>`);
    } catch (error) {
      next(error);
    }
  });

  app.use('/api', (request, response) => {
    return jsonError(response, 404, '\u63a5\u53e3\u4e0d\u5b58\u5728');
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
    response.status(500).json({ message: '\u5e73\u53f0\u670d\u52a1\u5f02\u5e38', detail: error.message });
  });

  return app;
}
