<template>
  <div class="page">
    <el-card>
      <template #header>
        <div class="card-header">
          <div>
            <h2>执行与报告</h2>
            <span class="muted">按业务结果定位失败，再查看步骤、截图和录像证据</span>
          </div>
          <el-button :icon="Refresh" @click="store.loadRuns">刷新</el-button>
        </div>
      </template>

      <div class="runs-filter-bar">
        <el-input v-model="filters.keyword" :prefix-icon="Search" placeholder="搜索执行编号或场景" clearable />
        <el-select v-model="filters.status" aria-label="执行状态" placeholder="全部状态" clearable>
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="filters.scenarioId" aria-label="测试场景" placeholder="全部场景" clearable filterable>
          <el-option v-for="item in store.scenarios" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-date-picker
          v-model="filters.dateRange"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
        />
        <el-button class="reset-filters" :icon="RefreshLeft" @click="resetFilters">重置</el-button>
      </div>

      <el-table :data="filteredRuns" height="calc(100vh - 285px)" empty-text="暂无符合条件的执行记录">
        <el-table-column prop="runId" label="执行编号" min-width="210" />
        <el-table-column label="场景" min-width="190">
          <template #default="{ row }">{{ scenarioName(row.scenarioId) }}</template>
        </el-table-column>
        <el-table-column label="状态" width="105">
          <template #default="{ row }"><el-tag :type="statusType(row.status)">{{ statusLabel(row.status) }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="environment" label="环境" width="100" />
        <el-table-column label="模式" width="100">
          <template #default="{ row }">{{ row.executionMode === 'ui' ? 'UI 模式' : row.executionMode }}</template>
        </el-table-column>
        <el-table-column prop="startedAt" label="开始时间" min-width="180" />
        <el-table-column label="业务结果" min-width="180">
          <template #default="{ row }"><span class="result-summary">成功 {{ row.businessSummary?.passedRows || 0 }} / 失败 {{ row.businessSummary?.failedRows || 0 }}</span></template>
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }"><el-button type="primary" link @click="detailRef.open(row)">查看详情</el-button></template>
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
import RunDetailDrawer from '../components/RunDetailDrawer.vue';
import '../run-filters.css';

const props = defineProps({ scenarioFilter: { type: String, default: '' } });
const store = usePlatformStore();
const detailRef = ref();
const filters = reactive(createRunFilters(props.scenarioFilter));
const statusOptions = [
  { label: '排队中', value: 'queued' },
  { label: '执行中', value: 'running' },
  { label: '通过', value: 'passed' },
  { label: '失败', value: 'failed' },
  { label: '已跳过', value: 'skipped' }
];
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
function scenarioName(id) {
  return store.scenarios.find((scenario) => scenario.id === id)?.name || id;
}
function statusType(status) {
  return ({ passed: 'success', failed: 'danger', running: 'warning', queued: 'info' })[status] || 'info';
}
function statusLabel(status) {
  return ({ passed: '通过', failed: '失败', running: '执行中', queued: '排队中', skipped: '已跳过' })[status] || status;
}
</script>
