<template>
  <div class="page scenario-page">
    <div
      v-loading="store.loading"
      class="scenario-layout directory-layout"
      element-loading-text="用例加载中..."
      :aria-busy="store.loading"
    >
      <el-card class="tree-card directory-card" shadow="never">
        <template #header>
          <div class="tree-heading">
            <strong>用例目录</strong>
            <span>{{ store.scenarios.length }}</span>
          </div>
        </template>
        <el-tree
          :data="tree"
          node-key="id"
          :current-node-key="selectedId"
          :default-expanded-keys="['all']"
          :indent="14"
          highlight-current
          @node-click="selectNode"
        >
          <template #default="{ data }">
            <span class="directory-node">
              <el-icon><FolderOpened v-if="data.id === selectedId" /><Folder v-else /></el-icon>
              <span class="directory-label">{{ data.label }}</span>
              <small>{{ data.scenarioCount }}</small>
            </span>
          </template>
        </el-tree>
      </el-card>

      <el-card class="content-card cases-card" shadow="never">
        <template #header>
          <div class="card-header compact-header">
            <div class="heading-copy">
              <div class="heading-line">
                <h2>测试用例</h2>
                <el-tag size="small" type="info" effect="plain">可执行 {{ store.readyScenarios.length }}</el-tag>
                <el-tag size="small" type="success" effect="plain">成功率 {{ passRate }}%</el-tag>
              </div>
              <span class="muted">按目录管理脚本、测试数据和执行记录</span>
            </div>
            <div class="header-actions">
              <el-upload
                :auto-upload="false"
                :show-file-list="false"
                accept=".json"
                :on-change="importCases"
              >
                <el-button :icon="Upload">导入</el-button>
              </el-upload>
              <el-button :icon="Download" @click="exportCases">导出</el-button>
              <el-button type="primary" :icon="Plus" @click="formRef.open()">新建用例</el-button>
            </div>
          </div>
        </template>

        <div class="table-toolbar compact-toolbar">
          <el-input
            v-model="keyword"
            :prefix-icon="Search"
            placeholder="搜索用例名称、目录、key"
            clearable
          />
          <el-segmented v-model="statusFilter" :options="['全部', '可执行', '需准备', '草稿']" />
          <el-button :icon="Refresh" circle aria-label="刷新用例" @click="refreshCatalog" />
        </div>

        <div class="batch-toolbar" role="toolbar" aria-label="用例批量操作">
          <el-tag size="small" :type="selectedCount ? 'primary' : 'info'" effect="plain">
            已选 {{ selectedCount }} 项
          </el-tag>
          <el-button size="small" :disabled="!filtered.length || allFilteredSelected" @click="selectAllFiltered">
            全选筛选结果
          </el-button>
          <el-button size="small" :disabled="!selectedCount" @click="clearSelection">清空</el-button>
          <el-tooltip v-if="latestBatchRun" content="查看最近批次">
            <el-button size="small" circle :icon="DataAnalysis" aria-label="查看最近批次" @click="openLatestBatch" />
          </el-tooltip>
          <span class="batch-toolbar-spacer" />
          <el-button size="small" type="primary" :icon="VideoPlay" :disabled="!selectedCount" @click="openBatchRun">
            批量执行
          </el-button>
          <el-button size="small" :icon="FolderOpened" :disabled="!selectedCount" @click="openBatchMove">
            移动目录
          </el-button>
          <el-button size="small" type="danger" plain :icon="Delete" :loading="deleting" :disabled="!selectedCount" @click="deleteSelected">
            批量删除
          </el-button>
        </div>

        <el-table
          ref="tableRef"
          :data="filtered"
          :row-key="scenarioIdentity"
          height="calc(100vh - 278px)"
          size="small"
          empty-text="当前目录暂无测试用例"
          @selection-change="handleSelectionChange"
          @row-dblclick="edit"
        >
          <el-table-column type="selection" width="42" reserve-selection />
          <el-table-column label="用例名称" min-width="270">
            <template #default="{ row }">
              <div class="case-name">
                <strong>{{ row.name }}</strong>
                <span>{{ row.key }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="目录" min-width="250" show-overflow-tooltip>
            <template #default="{ row }">{{ row.directory || row.module || '未分类' }}</template>
          </el-table-column>
          <el-table-column prop="priority" label="优先级" width="76" align="center" />
          <el-table-column label="状态" width="92" align="center">
            <template #default="{ row }">
              <el-tag size="small" :type="readinessType(row)">{{ readinessLabel(row) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="近期成功率" width="118">
            <template #default="{ row }">
              <el-progress :percentage="row.quality?.passRate || 0" :stroke-width="6" :show-text="true" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="172" fixed="right" align="right">
            <template #default="{ row }">
              <el-button type="primary" link @click="runRef.open(row)">执行</el-button>
              <el-button link @click="edit(row)">编辑</el-button>
              <el-button link @click="$emit('history', row)">历史</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <RunDialog ref="runRef" @started="handleStarted" />
    <RunDetailDrawer ref="runDetailRef" />
    <ScenarioDrawer ref="editRef" @changed="handleCatalogChanged" />
    <ScenarioFormDialog ref="formRef" @saved="handleCatalogChanged" />
    <ScenarioBatchMoveDialog ref="batchMoveRef" @moved="handleBatchMoved" />
    <ScenarioBatchRunDialog ref="batchRunRef" @started="handleBatchStarted" @updated="handleBatchUpdated" />
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { DataAnalysis, Delete, Download, Folder, FolderOpened, Plus, Refresh, Search, Upload, VideoPlay } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { api } from '../api';
import { usePlatformStore } from '../stores/platform';
import { buildScenarioDirectoryTree, filterScenariosByTree, findScenarioTreeNode } from '../scenario-menu-tree';
import RunDialog from '../components/RunDialog.vue';
import RunDetailDrawer from '../components/RunDetailDrawer.vue';
import ScenarioDrawer from '../components/ScenarioDrawer.vue';
import ScenarioFormDialog from '../components/ScenarioFormDialog.vue';
import ScenarioBatchMoveDialog from '../components/ScenarioBatchMoveDialog.vue';
import ScenarioBatchRunDialog from '../components/ScenarioBatchRunDialog.vue';

defineEmits(['history']);
const store = usePlatformStore();
const runRef = ref();
const runDetailRef = ref();
const editRef = ref();
const formRef = ref();
const tableRef = ref();
const batchMoveRef = ref();
const batchRunRef = ref();
const keyword = ref('');
const statusFilter = ref('全部');
const selectedId = ref('all');
const selectedRows = ref([]);
const deleting = ref(false);
const latestBatchRun = ref(null);

const completed = computed(() => store.runs.filter((run) => ['passed', 'failed'].includes(run.status)));
const passRate = computed(() => completed.value.length
  ? Math.round(completed.value.filter((run) => run.status === 'passed').length / completed.value.length * 100)
  : 0);
const directoryTree = computed(() => buildScenarioDirectoryTree(store.scenarios));
const tree = computed(() => [{
  id: 'all',
  label: '全部用例',
  type: 'root',
  scenarioCount: store.scenarios.length,
  scenarioIds: store.scenarios.map((scenario) => scenario.id || scenario.key),
  children: directoryTree.value
}]);
const selectedNode = computed(() => selectedId.value === 'all'
  ? null
  : findScenarioTreeNode(tree.value, selectedId.value));
const filtered = computed(() => filterScenariosByTree(store.scenarios, {
  scenarioIds: selectedNode.value?.scenarioIds,
  keyword: keyword.value
}).filter((scenario) => statusFilter.value === '全部' || readinessLabel(scenario) === statusFilter.value));
const selectedCount = computed(() => selectedRows.value.length);
const selectedIdentitySet = computed(() => new Set(selectedRows.value.map(scenarioIdentity)));
const allFilteredSelected = computed(() => filtered.value.length > 0
  && filtered.value.every((item) => selectedIdentitySet.value.has(scenarioIdentity(item))));
const projectIdentity = computed(() => JSON.stringify({
  id: store.project?.id || '',
  key: store.project?.key || '',
  rootPath: store.project?.rootPath || '',
  name: store.project?.name || ''
}));

onMounted(loadLatestBatchRun);

function scenarioIdentity(row) {
  return row.id || row.key;
}

function selectNode(node) {
  selectedId.value = node.id;
}

function readinessLabel(row) {
  return row.status === 'draft' ? '草稿' : row.readiness?.ready ? '可执行' : '需准备';
}

function readinessType(row) {
  return row.status === 'draft' ? 'warning' : row.readiness?.ready ? 'success' : 'info';
}

function edit(row) {
  editRef.value.open(row);
}

function handleSelectionChange(rows) {
  selectedRows.value = rows;
}

function selectAllFiltered() {
  for (const row of filtered.value) tableRef.value?.toggleRowSelection(row, true);
}

function clearSelection() {
  tableRef.value?.clearSelection();
  selectedRows.value = [];
}

function selectedScenarioIds() {
  return selectedRows.value.map(scenarioIdentity).filter(Boolean);
}

function openBatchMove() {
  if (!selectedCount.value) return;
  batchMoveRef.value?.open(selectedRows.value);
}

function openBatchRun() {
  if (!selectedCount.value) return;
  batchRunRef.value?.open(selectedRows.value);
}

function openLatestBatch() {
  if (latestBatchRun.value) batchRunRef.value?.openRun(latestBatchRun.value);
}

async function loadLatestBatchRun() {
  try {
    const payload = await api('/api/scenarios/batch/runs?limit=1');
    const runs = Array.isArray(payload) ? payload : payload.testPlanRuns || payload.runs || [];
    latestBatchRun.value = runs[0] || null;
  } catch {
    latestBatchRun.value = null;
  }
}

async function reloadCatalogAfterBatch() {
  await store.loadCatalog();
  if (selectedId.value !== 'all' && !findScenarioTreeNode(tree.value, selectedId.value)) selectedId.value = 'all';
  await nextTick();
  clearSelection();
}

async function handleBatchMoved(result) {
  try {
    await reloadCatalogAfterBatch();
    ElMessage.success(`已移动 ${result.moved || 0} 个用例`);
  } catch (error) {
    ElMessage.error(error.message || '用例已移动，但目录刷新失败');
  }
}

async function deleteSelected() {
  if (!selectedCount.value) return;
  const count = selectedCount.value;
  try {
    await ElMessageBox.confirm(
      `确定删除选中的 ${count} 个测试用例吗？删除后不可恢复。`,
      '批量删除用例',
      { type: 'warning', confirmButtonText: '删除', cancelButtonText: '取消' }
    );
    deleting.value = true;
    const result = await api('/api/scenarios/batch/delete', {
      method: 'POST',
      body: JSON.stringify({ scenarioIds: selectedScenarioIds() })
    });
    await reloadCatalogAfterBatch();
    const cleanupWarningCount = Array.isArray(result.cleanupWarnings) ? result.cleanupWarnings.length : 0;
    if (cleanupWarningCount) {
      ElMessage.warning(`数据库已删除 ${result.deleted || count} 个用例，但有 ${cleanupWarningCount} 个本地文件未清理，可查看项目目录或重试`);
    } else {
      ElMessage.success(`已删除 ${result.deleted || count} 个用例`);
    }
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') ElMessage.error(error.message || '批量删除失败');
  } finally {
    deleting.value = false;
  }
}

async function handleBatchStarted(run) {
  latestBatchRun.value = run;
  clearSelection();
  const runId = run?.id || run?.runId || run?.testPlanRunId;
  ElMessage.success(runId ? `批量执行已启动：${runId}` : '批量执行已启动');
}

function handleBatchUpdated(run) {
  latestBatchRun.value = run;
}

async function refreshCatalog() {
  try {
    await store.loadCatalog();
    ElMessage.success('用例目录已刷新');
  } catch (error) {
    ElMessage.error(error.message || '用例目录刷新失败');
  }
}

async function importCases(file) {
  const body = new FormData();
  body.append('file', file.raw);
  try {
    const result = await fetch('/api/scenarios/import', { method: 'POST', credentials: 'include', body });
    const payload = await result.json().catch(() => ({}));
    if (!result.ok) throw new Error(payload.message || '用例导入失败');
    await store.loadCatalog();
    ElMessage.success(`已导入 ${payload.imported || 0} 个用例`);
  } catch (error) {
    ElMessage.error(error.message);
  }
}

async function exportCases() {
  try {
    const response = await fetch('/api/scenarios/export', { credentials: 'include' });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.message || '用例导出失败');
    }
    const disposition = response.headers.get('content-disposition') || '';
    const encodedName = disposition.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
    const plainName = disposition.match(/filename="?([^";]+)"?/i)?.[1];
    const filename = encodedName ? decodeURIComponent(encodedName) : plainName || 'autotest-scenarios.json';
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    ElMessage.success('用例包已导出');
  } catch (error) {
    ElMessage.error(error.message || '用例导出失败');
  }
}

async function handleCatalogChanged(nextScenario) {
  if (store.mergeScenario(nextScenario)) return;
  try {
    await store.loadCatalog();
  } catch (error) {
    ElMessage.error(error.message || '用例目录刷新失败');
  }
}

async function handleStarted(run) {
  let detailRun = run;
  try {
    await store.loadRuns();
    detailRun = store.runs.find((item) => item.runId === run.runId) || run;
  } catch {}
  runDetailRef.value.open(detailRun);
}

watch(projectIdentity, (next, previous) => {
  if (!previous || next === previous) return;
  selectedId.value = 'all';
  keyword.value = '';
  statusFilter.value = '全部';
  latestBatchRun.value = null;
  clearSelection();
  batchMoveRef.value?.close();
  batchRunRef.value?.close();
  loadLatestBatchRun();
});
</script>

<style scoped>
.scenario-page { min-width: 800px; }
.directory-layout { grid-template-columns: 220px minmax(0, 1fr); height: 100%; gap: 12px; }
.directory-card, .cases-card { height: 100%; border-radius: 6px; }
.directory-card :deep(.el-card__header) { padding: 12px 14px; }
.directory-card :deep(.el-card__body) { height: calc(100% - 48px); padding: 8px; overflow: auto; }
.tree-heading, .heading-line, .header-actions { display: flex; align-items: center; }
.tree-heading { justify-content: space-between; }
.tree-heading span { color: var(--el-text-color-secondary); font-size: 12px; }
.directory-node { display: grid; width: 100%; min-width: 0; grid-template-columns: 16px minmax(0, 1fr) auto; align-items: center; gap: 6px; }
.directory-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.directory-node small { color: var(--el-text-color-secondary); font-size: 11px; }
.cases-card :deep(.el-card__header) { padding: 11px 14px; }
.cases-card :deep(.el-card__body) { padding: 0 14px 12px; }
.compact-header { min-height: 48px; gap: 16px; }
.heading-copy { min-width: 0; }
.heading-line { gap: 8px; }
.heading-line h2 { margin: 0; font-size: 17px; }
.header-actions { gap: 8px; }
.compact-toolbar { justify-content: flex-start; padding: 10px 0; }
.compact-toolbar .el-input { width: min(360px, 38%); }
.compact-toolbar > .el-button { margin-left: auto; }
.batch-toolbar { min-height: 40px; display: flex; align-items: center; gap: 7px; padding: 5px 0; border-top: 1px solid var(--el-border-color-lighter); }
.batch-toolbar-spacer { min-width: 8px; flex: 1; }
.batch-toolbar :deep(.el-button + .el-button) { margin-left: 0; }
.case-name { display: grid; min-width: 0; gap: 2px; line-height: 1.3; }
.case-name strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.case-name span { overflow: hidden; color: var(--el-text-color-secondary); font-family: Consolas, monospace; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
</style>
