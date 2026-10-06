import path from 'node:path';
import { normalizeExecutionMode } from './execution-mode.mjs';
import { normalizeBrowserChannel } from './system-browsers.mjs';
import { createRun, executeRun } from './runner.mjs';
import { EMPTY_DATASET, scenarioRequiresDataset } from './datasets.mjs';
import {
  collectReportItemImages,
  getActiveReportTemplate,
  renderReportContent,
  writeRenderedReport
} from './report-templates.mjs';

const GENERAL_DEFAULTS = Object.freeze({
  testingUnit: '',
  testerName: '',
  reportSignature: '',
  browserChannel: 'auto'
});

function now() {
  return new Date().toISOString();
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value || '');
  } catch {
    return fallback;
  }
}

function requiredText(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new TypeError(`请填写${label}`);
  }
  return value.trim();
}

function optionalText(value, label) {
  if (value === undefined) return undefined;
  if (typeof value !== 'string') throw new TypeError(`${label}必须是字符串`);
  return value.trim();
}

function durationMs(startedAt, finishedAt) {
  const start = Date.parse(startedAt || '');
  const finish = Date.parse(finishedAt || '');
  return Number.isFinite(start) && Number.isFinite(finish) ? Math.max(0, finish - start) : 0;
}

export function readGeneralSettings(database) {
  const row = database.getSetting('general');
  const value = row ? parseJson(row.value, {}) : {};
  return {
    testingUnit: typeof value.testingUnit === 'string' ? value.testingUnit : '',
    testerName: typeof value.testerName === 'string' ? value.testerName : '',
    reportSignature: typeof value.reportSignature === 'string' ? value.reportSignature : '',
    browserChannel: normalizeBrowserChannel(value.browserChannel, { strict: false }),
    updatedAt: row?.updated_at || ''
  };
}

export function normalizeGeneralSettings(input, current = GENERAL_DEFAULTS) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('通用设置参数无效');
  }
  return {
    testingUnit: optionalText(input.testingUnit, '测试单位') ?? current.testingUnit ?? '',
    testerName: optionalText(input.testerName, '测试人员') ?? current.testerName ?? '',
    reportSignature: optionalText(input.reportSignature, '报告落款') ?? current.reportSignature ?? '',
    browserChannel: Object.hasOwn(input, 'browserChannel')
      ? normalizeBrowserChannel(input.browserChannel)
      : normalizeBrowserChannel(current.browserChannel, { strict: false })
  };
}

export function normalizeTestPlan(database, input, current = null) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('测试计划参数无效');
  }
  const currentItems = current ? parseJson(current.items_json, []) : [];
  const name = Object.hasOwn(input, 'name')
    ? requiredText(input.name, '计划名称')
    : current?.name;
  if (!name) throw new TypeError('请填写计划名称');

  const description = Object.hasOwn(input, 'description')
    ? optionalText(input.description, '计划说明')
    : current?.description || '';
  const environment = Object.hasOwn(input, 'environment')
    ? requiredText(input.environment, '执行环境')
    : current?.environment || database.getDefaultEnvironment()?.key;
  if (!environment || !database.getEnvironmentByKey(environment)) {
    throw new TypeError(`执行环境不存在: ${environment || '-'}`);
  }

  let executionMode;
  try {
    executionMode = normalizeExecutionMode(
      Object.hasOwn(input, 'executionMode') ? input.executionMode : current?.execution_mode || 'headless'
    );
  } catch (error) {
    throw new TypeError(error.message);
  }

  const rawItems = Object.hasOwn(input, 'items') ? input.items : currentItems;
  if (!Array.isArray(rawItems) || !rawItems.length) {
    throw new TypeError('测试计划至少需要一个测试用例');
  }
  if (rawItems.length > 200) {
    throw new TypeError('单个测试计划最多包含 200 个测试用例');
  }
  const items = rawItems.map((item, index) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      throw new TypeError(`第 ${index + 1} 个计划项无效`);
    }
    const scenarioId = requiredText(item.scenarioId, `第 ${index + 1} 个计划项的测试用例`);
    const scenario = database.getScenarioById(scenarioId);
    if (!scenario) throw new TypeError(`测试用例不存在: ${scenarioId}`);
    const datasetId = item.datasetId == null || item.datasetId === ''
      ? null
      : requiredText(item.datasetId, `第 ${index + 1} 个计划项的测试数据`);
    if (datasetId) {
      const dataset = database.getDatasetById(datasetId);
      if (!dataset || dataset.scenario_id !== scenarioId) {
        throw new TypeError(`测试数据不属于对应测试用例: ${datasetId}`);
      }
      if (dataset.validation_status !== 'valid') {
        throw new TypeError(`测试数据不可用: ${datasetId}`);
      }
    }
    return { scenarioId, datasetId };
  });

  return { name, description: description || '', environment, executionMode, items };
}

export function publicTestPlan(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    environment: row.environment,
    executionMode: row.execution_mode,
    items: parseJson(row.items_json, []),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function publicTestPlanRunItem(database, row) {
  const scenario = database.getScenarioById(row.scenario_id);
  const dataset = row.dataset_id ? database.getDatasetById(row.dataset_id) : null;
  return {
    id: row.id,
    position: row.position,
    scenarioId: row.scenario_id,
    scenarioName: scenario?.name || row.scenario_name || row.scenario_id,
    datasetId: row.dataset_id || null,
    datasetName: dataset?.name || row.dataset_name || '',
    runId: row.run_id || null,
    status: row.status,
    error: row.error || '',
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    durationMs: durationMs(row.started_at, row.finished_at)
  };
}

export function publicTestPlanRun(database, row) {
  const snapshot = parseJson(row.plan_snapshot_json, {});
  return {
    id: row.id,
    testPlanId: row.test_plan_id,
    planName: snapshot.name || row.test_plan_id,
    environment: row.environment,
    executionMode: row.execution_mode,
    status: row.status,
    totalItems: row.total_items,
    passedItems: row.passed_items,
    failedItems: row.failed_items,
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    durationMs: durationMs(row.started_at, row.finished_at),
    summary: parseJson(row.summary_json, {}),
    reportUrl: row.report_path ? `/api/test-plan-runs/${row.id}/report` : null,
    reportDownloadUrl: row.report_path ? `/api/test-plan-runs/${row.id}/report?download=1` : null,
    reportFormat: parseJson(row.summary_json, {}).reportFormat || '',
    items: database.listTestPlanRunItems(row.id).map((item) => publicTestPlanRunItem(database, item))
  };
}

function latestValidDataset(database, scenarioId) {
  return database.listDatasets(scenarioId).find((dataset) => dataset.validation_status === 'valid') || null;
}

export function createTestPlanBatch(database, plan, triggeredBy, overrides = {}) {
  const publicPlan = publicTestPlan(plan);
  const general = readGeneralSettings(database);
  const reportTemplate = getActiveReportTemplate(database, overrides.reportTemplateId);
  const environment = Object.hasOwn(overrides, 'environment')
    ? requiredText(overrides.environment, '执行环境')
    : plan.environment;
  if (!database.getEnvironmentByKey(environment)) {
    throw new TypeError(`执行环境不存在: ${environment}`);
  }
  let executionMode;
  try {
    executionMode = normalizeExecutionMode(
      Object.hasOwn(overrides, 'executionMode') ? overrides.executionMode : plan.execution_mode
    );
  } catch (error) {
    throw new TypeError(error.message);
  }
  const items = publicPlan.items.map((item, position) => {
    const scenario = database.getScenarioById(item.scenarioId);
    const dataset = item.datasetId
      ? database.getDatasetById(item.datasetId)
      : latestValidDataset(database, item.scenarioId);
    return {
      id: database.nextId('TPI'),
      position,
      scenarioId: item.scenarioId,
      scenarioName: scenario?.name || item.scenarioId,
      datasetId: dataset?.id || null,
      datasetName: dataset?.name || ''
    };
  });
  const id = database.nextId('TPR');
  return database.createTestPlanRun({
    id,
    testPlanId: plan.id,
    environment,
    executionMode,
    triggeredBy,
    status: 'queued',
    planSnapshot: {
      ...publicPlan,
      general,
      reportTemplateId: reportTemplate.id,
      reportTemplate,
      triggeredAt: now(),
      runConfiguration: { environment, executionMode }
    }
  }, items);
}

export function createScenarioSelectionBatch(database, input, triggeredBy) {
  const scenarioIds = input?.scenarioIds;
  const datasetIds = input?.datasetIds || {};
  const name = `批量执行（${scenarioIds.length} 个用例）`;
  const normalized = normalizeTestPlan(database, {
    name,
    description: '来自用例列表的临时批量执行',
    ...(Object.hasOwn(input, 'environment') ? { environment: input.environment } : {}),
    ...(Object.hasOwn(input, 'executionMode') ? { executionMode: input.executionMode } : {}),
    items: scenarioIds.map((scenarioId) => ({
      scenarioId,
      ...(datasetIds[scenarioId] ? { datasetId: datasetIds[scenarioId] } : {})
    }))
  });
  const timestamp = now();
  return createTestPlanBatch(database, {
    id: database.nextId('BLK'),
    name: normalized.name,
    description: normalized.description,
    environment: normalized.environment,
    execution_mode: normalized.executionMode,
    items_json: JSON.stringify(normalized.items),
    created_by: triggeredBy,
    created_at: timestamp,
    updated_at: timestamp
  }, triggeredBy);
}

function ruleNarrative(context) {
  if (!context.failed) {
    return `本次共执行 ${context.total} 个测试用例，全部通过，建议按计划继续开展后续回归。`;
  }
  return `本次共执行 ${context.total} 个测试用例，通过 ${context.passed} 个，失败 ${context.failed} 个。建议优先处理失败项并结合对应执行记录、截图和 Trace 定位原因。`;
}

export async function generateTestPlanNarrative(database, context, options = {}) {
  const fallback = ruleNarrative(context);
  try {
    const row = database.getSetting('llm');
    const setting = row ? parseJson(row.value, null) : null;
    if (!setting?.enabled || !setting.apiKey || !setting.baseUrl || !setting.model) {
      throw new Error('LLM 未配置或未启用');
    }
    const fetchImpl = options.fetchImpl || globalThis.fetch;
    const response = await fetchImpl(`${setting.baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${setting.apiKey}`
      },
      body: JSON.stringify({
        model: setting.model,
        messages: [
          { role: 'system', content: '你是软件测试负责人。请用简洁中文总结测试计划执行结果，只输出总结正文。' },
          { role: 'user', content: JSON.stringify(context) }
        ],
        temperature: 0.2
      }),
      signal: AbortSignal.timeout(15_000)
    });
    if (!response.ok) throw new Error(`LLM 请求失败: ${response.status}`);
    const body = await response.json();
    const narrative = String(body.choices?.[0]?.message?.content || '').trim();
    if (!narrative) throw new Error('LLM 未返回总结');
    return { narrative, source: 'ai', fallbackReason: null };
  } catch (error) {
    return { narrative: fallback, source: 'rules', fallbackReason: error.message };
  }
}

export async function executeTestPlanBatch(app, batchId) {
  const database = app.locals.database;
  let batch = database.getTestPlanRunById(batchId);
  if (!batch) throw new Error('测试计划执行批次不存在');
  const startedAt = now();
  batch = database.updateTestPlanRun(batchId, { status: 'running', startedAt });
  const snapshot = parseJson(batch.plan_snapshot_json, {});
  const environment = database.getEnvironmentByKey(batch.environment);

  for (const item of database.listTestPlanRunItems(batchId)) {
    if (app.locals.shuttingDown) {
      database.updateTestPlanRunItem(item.id, {
        status: 'failed',
        error: '客户端正在退出，已取消测试计划执行',
        finishedAt: now()
      });
      continue;
    }
    const itemStartedAt = now();
    database.updateTestPlanRunItem(item.id, { status: 'running', startedAt: itemStartedAt });
    try {
      const scenario = database.getScenarioById(item.scenario_id);
      const dataset = item.dataset_id ? database.getDatasetById(item.dataset_id) : null;
      if (!scenario) throw new Error('测试用例不存在');
      if (!environment) throw new Error(`执行环境不存在: ${batch.environment}`);
      if (!dataset && scenarioRequiresDataset(scenario)) {
        throw new Error('没有可用的测试数据');
      }
      if (dataset && (dataset.scenario_id !== scenario.id || dataset.validation_status !== 'valid')) {
        throw new Error('没有可用的测试数据');
      }
      const run = createRun(database, {
        scenario,
        dataset: dataset || EMPTY_DATASET,
        environment: environment.key,
        executionMode: batch.execution_mode,
        executionLocation: 'server',
        triggeredBy: batch.triggered_by
      });
      database.updateTestPlanRunItem(item.id, { runId: run.id });
      await executeRun(app, run.id);
      const completed = database.getRunById(run.id);
      if (completed.status !== 'passed') {
        throw new Error(completed.error || `执行状态: ${completed.status}`);
      }
      database.updateTestPlanRunItem(item.id, {
        status: 'passed',
        finishedAt: now()
      });
    } catch (error) {
      database.updateTestPlanRunItem(item.id, {
        status: 'failed',
        error: error.message,
        finishedAt: now()
      });
    }
  }

  const finishedAt = now();
  const itemRows = database.listTestPlanRunItems(batchId);
  const passed = itemRows.filter((item) => item.status === 'passed').length;
  const failed = itemRows.length - passed;
  const context = {
    planName: snapshot.name || batch.test_plan_id,
    environment: environment?.name || batch.environment,
    total: itemRows.length,
    passed,
    failed,
    durationMs: durationMs(startedAt, finishedAt),
    failures: itemRows.filter((item) => item.status !== 'passed').map((item) => ({
      scenario: database.getScenarioById(item.scenario_id)?.name || item.scenario_id,
      error: item.error || '执行失败'
    }))
  };
  const generated = app.locals.shuttingDown
    ? {
      narrative: ruleNarrative(context),
      source: 'rules',
      fallbackReason: '客户端正在退出'
    }
    : await generateTestPlanNarrative(database, context, {
      fetchImpl: app.locals.llmFetch
    });
  const reportTemplate = getActiveReportTemplate(database, snapshot.reportTemplateId);
  const summary = {
    ...context,
    ...generated,
    reportTemplate: {
      id: reportTemplate.id,
      name: reportTemplate.name,
      outputFormat: reportTemplate.outputFormat,
      includeImages: reportTemplate.includeImages,
      modules: reportTemplate.modules
    }
  };
  const finalStatus = failed ? 'failed' : 'passed';
  batch = database.updateTestPlanRun(batchId, {
    passedItems: passed,
    failedItems: failed,
    summary
  });
  const publicItems = database.listTestPlanRunItems(batchId).map((item) => publicTestPlanRunItem(database, item));
  const reportDir = path.resolve(app.locals.paths.reportsDir, 'plan-runs', batchId);
  try {
    const itemsWithImages = reportTemplate.includeImages || reportTemplate.modules.includes('images')
      ? await collectReportItemImages(database, publicItems, reportDir)
      : publicItems.map((item) => ({ ...item, images: [] }));
    const rendered = renderReportContent({
      batch: { ...batch, status: finalStatus, finished_at: finishedAt },
      snapshot,
      environment,
      general: snapshot.general || GENERAL_DEFAULTS,
      items: itemsWithImages,
      summary
    }, reportTemplate);
    const { reportPath } = await writeRenderedReport(
      reportDir,
      rendered,
      app.locals.testPlanReportWriter
    );
    database.updateTestPlanRun(batchId, {
      status: finalStatus,
      reportPath,
      finishedAt,
      summary: {
        ...summary,
        reportFormat: rendered.format,
        reportFileName: path.basename(reportPath)
      }
    });
  } catch (error) {
    database.updateTestPlanRun(batchId, {
      status: 'failed',
      summary: { ...summary, reportError: error.message },
      finishedAt
    });
  }
  return database.getTestPlanRunById(batchId);
}
