<template>
  <el-dialog
    v-model="visible"
    :title="currentRun ? '批量执行进度' : '批量执行测试用例'"
    class="scenario-batch-run-dialog"
    width="820px"
    top="20px"
    append-to-body
    destroy-on-close
    :close-on-click-modal="false"
    @closed="handleClosed"
  >
    <div v-loading="starting || loadingDatasets" class="batch-run-body">
      <div v-if="!currentRun" class="selection-summary">
        <strong>已选择 {{ scenarioIds.length }} 个用例</strong>
        <span>{{ scenarioNames }}</span>
      </div>

      <el-form v-if="!currentRun" label-position="top" class="run-config-grid">
        <el-form-item label="执行环境" required>
          <el-select v-model="environment" class="wide" filterable placeholder="选择当前项目环境">
            <el-option
              v-for="item in store.environments"
              :key="item.key || item.id"
              :label="item.name"
              :value="item.key || item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="执行模式" required>
          <el-segmented v-model="executionMode" :options="executionModeOptions" />
        </el-form-item>
      </el-form>

      <section v-if="!currentRun" class="dataset-picker">
        <div class="dataset-picker-header">
          <strong>为每个用例选择测试数据</strong>
          <el-text type="info">未选择时，有数据字段的用例使用最近有效数据集；无字段的用例可直接执行。</el-text>
        </div>
        <el-table :data="datasetRows" size="small" max-height="280" empty-text="请先勾选要执行的用例">
          <el-table-column type="index" label="#" width="46" align="center" />
          <el-table-column label="测试用例" min-width="220" show-overflow-tooltip>
            <template #default="{ row }">
              <div class="case-cell">
                <strong>{{ row.name }}</strong>
                <span>{{ row.key }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="测试数据" min-width="260">
            <template #default="{ row }">
              <el-text v-if="!row.requiresDataset" type="success" size="small">本用例不需要测试数据</el-text>
              <template v-else>
                <el-select
                  v-model="datasetIds[row.id]"
                  class="wide"
                  clearable
                  filterable
                  placeholder="自动使用最近有效数据"
                >
                  <el-option
                    v-for="item in row.datasets"
                    :key="item.id"
                    :label="`${item.name}（${item.rowCount ?? item.row_count ?? 0} 行）`"
                    :value="item.id"
                  />
                </el-select>
                <el-text v-if="!row.datasets.length" type="warning" size="small">暂无可用数据集</el-text>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </section>

      <el-alert
        v-if="!currentRun"
        title="有数据字段的用例请先准备数据集。没有数据字段的用例可以直接批量执行。"
        type="info"
        show-icon
        :closable="false"
      />

      <template v-else>
        <section class="run-overview" aria-live="polite">
          <div class="run-identity">
            <div>
              <span>批次编号</span>
              <strong :title="currentRun.id">{{ currentRun.id }}</strong>
            </div>
            <el-tag :type="statusType(currentRun.status)" effect="light">{{ statusLabel(currentRun.status) }}</el-tag>
          </div>
          <div class="run-metrics">
            <div><span>总数</span><strong>{{ runSummary.total }}</strong></div>
            <div><span>通过</span><strong class="success-text">{{ runSummary.passed }}</strong></div>
            <div><span>失败</span><strong class="danger-text">{{ runSummary.failed }}</strong></div>
          </div>
          <el-progress
            :percentage="runProgress"
            :status="currentRun.status === 'failed' ? 'exception' : currentRun.status === 'passed' ? 'success' : undefined"
            :stroke-width="8"
          />
          <div class="run-meta">
            <span>环境：{{ environmentName(currentRun.environment) }}</span>
            <span>模式：{{ executionModeLabel(currentRun.executionMode) }}</span>
            <span>耗时：{{ durationLabel(currentRun) }}</span>
          </div>
        </section>

        <el-tabs v-model="monitorTab" class="monitor-tabs">
          <el-tab-pane label="执行明细" name="items">
            <el-table :data="currentRun.items || []" size="small" max-height="260" empty-text="暂无执行明细">
              <el-table-column type="index" label="#" width="46" align="center" />
              <el-table-column label="测试用例" min-width="230" show-overflow-tooltip>
                <template #default="{ row }">{{ row.scenarioName || row.scenarioId }}</template>
              </el-table-column>
              <el-table-column label="测试数据" min-width="170" show-overflow-tooltip>
                <template #default="{ row }">{{ row.datasetName || row.datasetId || '未配置' }}</template>
              </el-table-column>
              <el-table-column label="状态" width="92" align="center">
                <template #default="{ row }"><el-tag size="small" :type="statusType(row.status)">{{ statusLabel(row.status) }}</el-tag></template>
              </el-table-column>
              <el-table-column label="说明" min-width="180" show-overflow-tooltip>
                <template #default="{ row }">{{ row.error || '-' }}</template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane name="report">
            <template #label>
              <span>测试报告 <el-tag v-if="reportSource" size="small" type="info" effect="plain">{{ reportSource }}</el-tag></span>
            </template>
            <div v-loading="reportLoading" class="report-panel">
              <div v-if="currentRun?.reportUrl" class="report-toolbar">
                <el-button size="small" link type="primary" @click="downloadReport">下载报告</el-button>
              </div>
              <iframe
                v-if="reportHtml"
                class="report-iframe"
                title="测试报告预览"
                sandbox=""
                :srcdoc="reportHtml"
              />
              <pre v-else-if="reportMarkdown" class="report-markdown">{{ reportMarkdown }}</pre>
              <el-empty v-else :description="reportEmptyText" :image-size="56" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>

    <template #footer>
      <template v-if="!currentRun">
        <el-button :disabled="starting" @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="starting" :disabled="!environment || !scenarioIds.length" @click="startBatch">
          开始执行
        </el-button>
      </template>
      <template v-else>
        <el-button :icon="Refresh" :loading="refreshing" @click="refreshCurrentRun">刷新状态</el-button>
        <el-button v-if="!isActiveStatus(currentRun.status)" type="primary" @click="monitorTab = 'report'">查看报告</el-button>
        <el-button @click="visible = false">关闭</el-button>
      </template>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { Refresh } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { api } from '../api';
import { usePlatformStore } from '../stores/platform';

const emit = defineEmits(['started', 'updated']);
const store = usePlatformStore();
const visible = ref(false);
const starting = ref(false);
const loadingDatasets = ref(false);
const selectedScenarios = ref([]);
const datasetRows = ref([]);
const datasetIds = ref({});
const environment = ref('');
const executionMode = ref('headless');
const currentRun = ref(null);
const refreshing = ref(false);
const reportLoading = ref(false);
const reportMarkdown = ref('');
const reportHtml = ref('');
const reportSource = ref('');
const monitorTab = ref('items');
let pollTimer;
const executionModeOptions = [
  { label: '无头', value: 'headless' },
  { label: '有头', value: 'headed' }
];

const scenarioIds = computed(() => selectedScenarios.value.map((item) => item.id || item.key).filter(Boolean));
const scenarioNames = computed(() => {
  const names = selectedScenarios.value.slice(0, 3).map((item) => item.name).filter(Boolean);
  return `${names.join('、')}${selectedScenarios.value.length > names.length ? ` 等 ${selectedScenarios.value.length} 个` : ''}`;
});
const runSummary = computed(() => {
  const items = currentRun.value?.items || [];
  const itemPassed = items.filter((item) => item.status === 'passed').length;
  const itemFailed = items.filter((item) => item.status === 'failed').length;
  const itemSkipped = items.filter((item) => item.status === 'skipped').length;
  const active = isActiveStatus(currentRun.value?.status);
  const passed = active ? itemPassed : Number(currentRun.value?.summary?.passed ?? currentRun.value?.passedItems ?? itemPassed);
  const failed = active ? itemFailed : Number(currentRun.value?.summary?.failed ?? currentRun.value?.failedItems ?? itemFailed);
  return {
    total: Number(currentRun.value?.summary?.total ?? currentRun.value?.totalItems ?? items.length),
    passed,
    failed,
    completed: active ? itemPassed + itemFailed + itemSkipped : Math.max(passed + failed + itemSkipped, itemPassed + itemFailed + itemSkipped)
  };
});
const runProgress = computed(() => {
  if (!runSummary.value.total) return 0;
  return Math.min(100, Math.round(runSummary.value.completed / runSummary.value.total * 100));
});
const reportEmptyText = computed(() => isActiveStatus(currentRun.value?.status)
  ? '批次完成后生成测试报告'
  : '当前批次暂无测试报告');

onBeforeUnmount(stopPolling);

function defaultEnvironment() {
  return store.environments.find((item) => item.isDefault)?.key
    || store.environments.find((item) => item.isDefault)?.id
    || store.environments[0]?.key
    || store.environments[0]?.id
    || '';
}

function environmentName(value) {
  return store.environments.find((item) => (item.key || item.id) === value)?.name || value || '-';
}

function executionModeLabel(value) {
  return value === 'headed' ? '有头' : '无头';
}

function statusLabel(status) {
  return ({ queued: '排队中', running: '执行中', passed: '通过', failed: '失败', skipped: '已跳过' })[status] || status || '未知';
}

function statusType(status) {
  return ({ queued: 'info', running: 'warning', passed: 'success', failed: 'danger', skipped: 'info' })[status] || 'info';
}

function isActiveStatus(status) {
  return ['queued', 'running'].includes(status);
}

function durationLabel(run) {
  const duration = Number(run?.durationMs || 0);
  if (!duration) return isActiveStatus(run?.status) ? '执行中' : '-';
  if (duration < 1000) return `${duration} ms`;
  if (duration < 60000) return `${(duration / 1000).toFixed(1)} 秒`;
  return `${Math.floor(duration / 60000)} 分 ${Math.round(duration % 60000 / 1000)} 秒`;
}

function scenarioNeedsDataset(scenario) {
  if (scenario?.requiresDataset != null) return Boolean(scenario.requiresDataset);
  const schema = scenario?.dataSchema || {};
  return Boolean((schema.columns || []).length || (schema.required || []).length);
}

function preferredDatasetId(datasets = []) {
  return datasets.find((item) => item.validationStatus === 'valid' || item.validation_status === 'valid')?.id
    || datasets[0]?.id
    || '';
}

async function loadDatasetOptions(rows) {
  loadingDatasets.value = true;
  try {
    const loaded = await Promise.all(rows.map(async (scenario) => {
      const key = scenario.key;
      const id = scenario.id || scenario.key;
      let datasets = [];
      try {
        datasets = key ? await api(`/api/scenarios/${encodeURIComponent(key)}/datasets`) : [];
      } catch {
        datasets = [];
      }
      return {
        id,
        key,
        name: scenario.name || key || id,
        requiresDataset: scenarioNeedsDataset(scenario),
        datasets: Array.isArray(datasets) ? datasets : (datasets?.datasets || [])
      };
    }));
    datasetRows.value = loaded;
    const next = {};
    for (const row of loaded) {
      next[row.id] = row.requiresDataset ? preferredDatasetId(row.datasets) : '';
    }
    datasetIds.value = next;
  } finally {
    loadingDatasets.value = false;
  }
}

function isExecutableScenario(scenario) {
  return Boolean(scenario) && scenario.status !== 'draft' && scenario.readiness?.ready;
}

async function open(rows) {
  stopPolling();
  selectedScenarios.value = rows.filter(isExecutableScenario);
  environment.value = defaultEnvironment();
  executionMode.value = 'headless';
  currentRun.value = null;
  reportMarkdown.value = '';
  reportHtml.value = '';
  reportSource.value = '';
  monitorTab.value = 'items';
  datasetRows.value = [];
  datasetIds.value = {};
  visible.value = true;
  await loadDatasetOptions(selectedScenarios.value);
}

function close() {
  stopPolling();
  visible.value = false;
  selectedScenarios.value = [];
  datasetRows.value = [];
  datasetIds.value = {};
  environment.value = '';
  currentRun.value = null;
  reportMarkdown.value = '';
  reportHtml.value = '';
  reportSource.value = '';
}

function handleClosed() {
  stopPolling();
}

async function openRun(run) {
  stopPolling();
  selectedScenarios.value = [];
  datasetRows.value = [];
  datasetIds.value = {};
  currentRun.value = run;
  reportMarkdown.value = '';
  reportHtml.value = '';
  reportSource.value = '';
  monitorTab.value = 'items';
  visible.value = true;
  await refreshCurrentRun();
  if (isActiveStatus(currentRun.value?.status)) startPolling();
}

function selectedDatasetMapping() {
  const mapping = {};
  for (const row of datasetRows.value) {
    const datasetId = datasetIds.value[row.id];
    if (datasetId) mapping[row.id] = datasetId;
  }
  return mapping;
}

async function startBatch() {
  starting.value = true;
  try {
    const result = await api('/api/scenarios/batch/run', {
      method: 'POST',
      body: JSON.stringify({
        scenarioIds: scenarioIds.value,
        datasetIds: selectedDatasetMapping(),
        environment: environment.value,
        executionMode: executionMode.value
      })
    });
    currentRun.value = result;
    monitorTab.value = 'items';
    emit('started', result);
    startPolling();
  } catch (error) {
    ElMessage.error(error.message || '批量执行启动失败');
  } finally {
    starting.value = false;
  }
}

function startPolling() {
  stopPolling();
  if (!isActiveStatus(currentRun.value?.status)) {
    loadReport(currentRun.value);
    return;
  }
  pollTimer = setInterval(refreshCurrentRun, 2500);
}

function stopPolling() {
  if (pollTimer) clearInterval(pollTimer);
  pollTimer = undefined;
}

async function refreshCurrentRun() {
  if (refreshing.value || !currentRun.value?.id) return;
  const id = currentRun.value.id;
  refreshing.value = true;
  try {
    const payload = await api(`/api/test-plan-runs/${encodeURIComponent(id)}`);
    if (currentRun.value?.id !== id) return;
    currentRun.value = payload.run || payload.testPlanRun || payload;
    emit('updated', currentRun.value);
    if (!isActiveStatus(currentRun.value.status)) {
      stopPolling();
      await loadReport(currentRun.value);
    }
  } catch (error) {
    stopPolling();
    ElMessage.error(error.message || '批次状态刷新失败');
  } finally {
    refreshing.value = false;
  }
}

async function loadReport(run) {
  reportMarkdown.value = '';
  reportHtml.value = '';
  reportSource.value = '';
  if (!run?.id) return;
  reportLoading.value = true;
  try {
    const result = await api(`/api/test-plan-runs/${encodeURIComponent(run.id)}/report`);
    if (typeof result === 'string' && result.trim()) {
      const format = run?.reportFormat || run?.summary?.reportFormat
        || (result.trimStart().startsWith('<') ? 'html' : 'markdown');
      if (format === 'html' || format === 'word') {
        reportHtml.value = result;
        reportMarkdown.value = '';
      } else {
        reportMarkdown.value = result;
        reportHtml.value = '';
      }
      reportSource.value = ['ai', 'llm'].includes(run?.summary?.source) ? 'AI 生成' : '';
    }
  } catch (error) {
    if (error?.status !== 404 && error?.status !== 409) ElMessage.error(error.message || '测试报告加载失败');
  } finally {
    reportLoading.value = false;
  }
  if (!reportMarkdown.value && !reportHtml.value && typeof run?.summary?.narrative === 'string') {
    reportMarkdown.value = run.summary.narrative;
    reportSource.value = ['ai', 'llm'].includes(run.summary?.source) ? 'AI 生成' : '';
  }
}

function downloadReport() {
  if (!currentRun.value?.id) return;
  window.open(`/api/test-plan-runs/${encodeURIComponent(currentRun.value.id)}/report?download=1`, '_blank');
}

defineExpose({ open, openRun, close });
</script>

<style scoped>
.batch-run-body { display: grid; gap: 16px; }
.selection-summary { min-width: 0; display: flex; align-items: baseline; gap: 10px; }
.selection-summary strong { flex: none; font-size: 14px; }
.selection-summary span { overflow: hidden; color: var(--el-text-color-secondary); font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.run-config-grid { display: grid; grid-template-columns: minmax(220px, 1fr) minmax(220px, 1fr); gap: 14px; }
.run-config-grid :deep(.el-form-item) { margin-bottom: 0; }
.run-config-grid :deep(.el-segmented) { width: 100%; }
.run-config-grid :deep(.el-segmented__item) { flex: 1; }
.wide { width: 100%; }
.dataset-picker { display: grid; gap: 8px; }
.dataset-picker-header { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.case-cell { display: grid; min-width: 0; gap: 2px; }
.case-cell strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.case-cell span { color: var(--el-text-color-secondary); font-size: 12px; }
.run-overview { display: grid; gap: 10px; padding: 11px 12px; background: var(--el-fill-color-lighter); border: 1px solid var(--el-border-color-lighter); border-radius: 6px; }
.run-identity, .run-meta { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.run-identity > div { min-width: 0; display: grid; gap: 2px; }
.run-identity span, .run-meta { color: var(--el-text-color-secondary); font-size: 12px; }
.run-identity strong { overflow: hidden; font-size: 13px; font-variant-numeric: tabular-nums; text-overflow: ellipsis; white-space: nowrap; }
.run-metrics { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--el-border-color-lighter); border-bottom: 1px solid var(--el-border-color-lighter); }
.run-metrics > div { padding: 7px 10px; display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.run-metrics > div + div { border-left: 1px solid var(--el-border-color-lighter); }
.run-metrics span { color: var(--el-text-color-secondary); font-size: 12px; }
.run-metrics strong { font-size: 18px; font-variant-numeric: tabular-nums; }
.success-text { color: var(--el-color-success); }
.danger-text { color: var(--el-color-danger); }
.monitor-tabs { min-height: 0; }
.monitor-tabs :deep(.el-tabs__content) { min-height: 170px; }
.report-panel { min-height: 180px; }
.report-toolbar { display: flex; justify-content: flex-end; margin-bottom: 8px; }
.report-iframe { width: 100%; min-height: 280px; border: 0; border-radius: 5px; background: #fff; }
.report-markdown { max-height: 300px; margin: 0; padding: 12px 14px; overflow: auto; color: var(--el-text-color-primary); background: var(--el-fill-color-lighter); border-radius: 5px; font: 12px/1.65 "Microsoft YaHei", sans-serif; white-space: pre-wrap; overflow-wrap: anywhere; }
:global(.scenario-batch-run-dialog) { display: flex; max-height: calc(100vh - 40px); margin-bottom: 20px; flex-direction: column; overflow: hidden; }
:global(.scenario-batch-run-dialog .el-dialog__header),
:global(.scenario-batch-run-dialog .el-dialog__footer) { flex: 0 0 auto; }
:global(.scenario-batch-run-dialog .el-dialog__body) { min-height: 0; flex: 1 1 auto; overflow-y: auto; }
</style>
