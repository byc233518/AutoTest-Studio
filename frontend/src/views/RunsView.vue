<template>
  <div class="page">
    <el-card>
      <template #header>
        <div class="card-header">
          <div>
            <h2>{{ t('runs.title') }}</h2>
            <span class="muted">{{ t('runs.subtitle') }}</span>
          </div>
          <el-button :icon="Refresh" @click="store.loadRuns">{{ t('common.refresh') }}</el-button>
        </div>
      </template>

      <div class="runs-filter-bar">
        <el-input v-model="filters.keyword" :prefix-icon="Search" :placeholder="t('runs.searchPlaceholder')" clearable />
        <el-select v-model="filters.status" :aria-label="t('runs.statusAria')" :placeholder="t('runs.allStatuses')" clearable>
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="filters.scenarioId" :aria-label="t('runs.scenarioAria')" :placeholder="t('runs.allScenarios')" clearable filterable>
          <el-option v-for="item in store.scenarios" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-date-picker
          v-model="filters.dateRange"
          type="daterange"
          value-format="YYYY-MM-DD"
          :range-separator="t('runs.rangeSeparator')"
          :start-placeholder="t('runs.startDate')"
          :end-placeholder="t('runs.endDate')"
          unlink-panels
        />
        <el-button class="reset-filters" :icon="RefreshLeft" @click="resetFilters">{{ t('common.reset') }}</el-button>
      </div>

      <el-table :data="filteredRuns" height="calc(100vh - 285px)" :empty-text="t('runs.empty')">
        <el-table-column prop="runId" :label="t('runs.colRunId')" min-width="210" />
        <el-table-column :label="t('runs.colScenario')" min-width="190">
          <template #default="{ row }">{{ scenarioName(row) }}</template>
        </el-table-column>
        <el-table-column :label="t('runs.colStatus')" width="105">
          <template #default="{ row }"><el-tag :type="statusType(row.status)">{{ statusLabel(row.status) }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="environment" :label="t('runs.colEnvironment')" width="100" />
        <el-table-column :label="t('runs.colLocation')" width="105">
          <template #default="{ row }">{{ store.desktopMode ? t('runs.locationThisPc') : row.executionLocation === 'local' ? t('runs.locationLocal') : t('runs.locationServer') }}</template>
        </el-table-column>
        <el-table-column :label="t('runs.colMode')" width="100">
          <template #default="{ row }">{{ row.executionMode === 'ui' ? t('runs.modeUi') : row.executionMode }}</template>
        </el-table-column>
        <el-table-column prop="startedAt" :label="t('runs.colStartedAt')" min-width="180" />
        <el-table-column :label="t('runs.colResult')" min-width="180">
          <template #default="{ row }"><span class="result-summary">{{ t('runs.resultSummary', { passed: row.businessSummary?.passedRows || 0, failed: row.businessSummary?.failedRows || 0 }) }}</span></template>
        </el-table-column>
        <el-table-column :label="t('runs.colActions')" width="100" fixed="right">
          <template #default="{ row }"><el-button type="primary" link @click="detailRef.open(row)">{{ t('runs.viewDetail') }}</el-button></template>
        </el-table-column>
      </el-table>
    </el-card>
    <RunDetailDrawer ref="detailRef" />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { Refresh, RefreshLeft, Search } from '@element-plus/icons-vue';
import { createRunFilters, filterRuns } from '../run-filters.mjs';
import { usePlatformStore } from '../stores/platform';
import { useI18n } from '../i18n';
import RunDetailDrawer from '../components/RunDetailDrawer.vue';
import '../run-filters.css';

const props = defineProps({ scenarioFilter: { type: String, default: '' } });
const store = usePlatformStore();
const { t } = useI18n();
const detailRef = ref();
const filters = reactive(createRunFilters(props.scenarioFilter));
const statusOptions = computed(() => [
  { label: t('status.queued'), value: 'queued' },
  { label: t('status.running'), value: 'running' },
  { label: t('status.passed'), value: 'passed' },
  { label: t('status.failed'), value: 'failed' },
  { label: t('status.skipped'), value: 'skipped' }
]);
const filteredRuns = computed(() => filterRuns(store.runs, store.scenarios, filters));
let timer;

watch(
  () => props.scenarioFilter,
  (value) => Object.assign(filters, createRunFilters(value)),
  { immediate: true }
);
onMounted(() => {
  timer = setInterval(() => {
    if (store.runs.some((run) => ['queued', 'running'].includes(run.status))) store.loadRuns();
  }, 3000);
});
onBeforeUnmount(() => clearInterval(timer));

function resetFilters() {
  Object.assign(filters, createRunFilters());
}
function scenarioName(run) {
  return run.scenarioName || store.scenarios.find((scenario) => scenario.id === run.scenarioId)?.name || run.scenarioId;
}
function statusType(status) {
  return ({ passed: 'success', failed: 'danger', running: 'warning', queued: 'info' })[status] || 'info';
}
function statusLabel(status) {
  const key = `status.${status}`;
  const label = t(key);
  return label === key ? status : label;
}
</script>
