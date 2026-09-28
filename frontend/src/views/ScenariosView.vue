<template>
  <div class="page">
    <div class="metric-grid">
      <el-card><span>今日执行</span><strong>{{ todayRuns }}</strong></el-card>
      <el-card><span>近期成功率</span><strong>{{ passRate }}%</strong></el-card>
      <el-card><span>待处理失败</span><strong>{{ failed }}</strong></el-card>
      <el-card><span>可执行场景</span><strong>{{ store.readyScenarios.length }}/{{ store.scenarios.length }}</strong></el-card>
    </div>

    <div
      v-loading="store.loading"
      class="scenario-layout"
      element-loading-text="场景加载中..."
      :aria-busy="store.loading"
    >
      <el-card class="tree-card">
        <template #header><strong>场景分类</strong></template>
        <el-tree
          :data="tree"
          node-key="id"
          :current-node-key="selectedId"
          :indent="16"
          default-expand-all
          highlight-current
          @node-click="selectNode"
        >
          <template #default="{ data }">
            <span class="category-node">
              <span>{{ data.label }}</span>
              <small>{{ data.scenarioCount }}</small>
            </span>
          </template>
        </el-tree>
      </el-card>

      <el-card class="content-card">
        <template #header>
          <div class="card-header">
            <div><h2>测试场景</h2><span class="muted">集中管理脚本、数据、执行和结果</span></div>
            <el-button type="primary" :icon="Plus" @click="formRef.open()">新建场景</el-button>
          </div>
        </template>
        <div class="table-toolbar">
          <el-select v-model="selectedId" class="mobile-category-select" filterable placeholder="选择菜单分类">
            <el-option v-for="option in categoryOptions" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
          <el-input v-model="keyword" :prefix-icon="Search" placeholder="搜索场景、菜单或说明" clearable />
          <el-segmented v-model="statusFilter" :options="['全部', '可执行', '需准备', '草稿']" />
        </div>
        <el-table :data="filtered" height="calc(100vh - 315px)" empty-text="暂无测试场景" @row-dblclick="edit">
          <el-table-column label="场景" min-width="300">
            <template #default="{ row }"><div class="scenario-name"><strong>{{ row.name }}</strong><span>{{ row.description }}</span></div></template>
          </el-table-column>
          <el-table-column label="业务系统 / 菜单路径" min-width="240">
            <template #default="{ row }">{{ store.appName(row.appId) }}<br><span class="muted">{{ row.module || store.moduleName(row.moduleId) }}</span></template>
          </el-table-column>
          <el-table-column prop="priority" label="优先级" width="85" />
          <el-table-column label="状态" width="150"><template #default="{ row }"><el-tag :type="readinessType(row)">{{ readinessLabel(row) }}</el-tag></template></el-table-column>
          <el-table-column label="近期成功率" width="120"><template #default="{ row }"><el-progress :percentage="row.quality?.passRate || 0" :stroke-width="7" /></template></el-table-column>
          <el-table-column label="操作" width="230" fixed="right">
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
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Plus, Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { usePlatformStore } from '../stores/platform';
import { buildScenarioTree, filterScenariosByTree, findScenarioTreeNode } from '../scenario-menu-tree';
import RunDialog from '../components/RunDialog.vue';
import RunDetailDrawer from '../components/RunDetailDrawer.vue';
import ScenarioDrawer from '../components/ScenarioDrawer.vue';
import ScenarioFormDialog from '../components/ScenarioFormDialog.vue';

defineEmits(['history']);
const store = usePlatformStore();
const runRef = ref();
const runDetailRef = ref();
const editRef = ref();
const formRef = ref();
const keyword = ref('');
const statusFilter = ref('全部');
const selectedId = ref('all');

const todayRuns = computed(() => store.runs.filter((run) => (run.startedAt || '').startsWith(new Date().toISOString().slice(0, 10))).length);
const completed = computed(() => store.runs.filter((run) => ['passed', 'failed'].includes(run.status)));
const passRate = computed(() => completed.value.length ? Math.round(completed.value.filter((run) => run.status === 'passed').length / completed.value.length * 100) : 0);
const failed = computed(() => store.runs.filter((run) => run.status === 'failed').length);
const categoryTree = computed(() => buildScenarioTree(store.apps, store.modules, store.scenarios));
const tree = computed(() => [{
  id: 'all',
  label: '全部场景',
  type: 'root',
  scenarioCount: store.scenarios.length,
  scenarioIds: store.scenarios.map((scenario) => scenario.id || scenario.key),
  children: categoryTree.value.apps
}]);
const categoryOptions = computed(() => flattenCategoryOptions(tree.value));
const selectedNode = computed(() => selectedId.value === 'all' ? null : findScenarioTreeNode(tree.value, selectedId.value));
const moduleNames = computed(() => new Map(store.modules.map((module) => [module.id, module.name])));
const filtered = computed(() => filterScenariosByTree(store.scenarios, {
  scenarioIds: selectedNode.value?.scenarioIds,
  keyword: keyword.value,
  moduleNames: moduleNames.value
}).filter((scenario) => statusFilter.value === '全部' || readinessLabel(scenario) === statusFilter.value));

function selectNode(node) {
  selectedId.value = node.id;
}

function flattenCategoryOptions(nodes, parentLabels = []) {
  return nodes.flatMap((node) => {
    const labels = [...parentLabels, node.label];
    return [
      { value: node.id, label: labels.join(' / ') },
      ...flattenCategoryOptions(node.children || [], labels)
    ];
  });
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

async function handleCatalogChanged(nextScenario) {
  if (store.mergeScenario(nextScenario)) return;
  try {
    await store.loadCatalog();
  } catch (error) {
    ElMessage.error(error.message || '场景目录刷新失败');
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
</script>

<style scoped>
.scenario-layout {
  grid-template-columns: 300px minmax(0, 1fr);
}

.tree-card :deep(.el-card__body) {
  height: calc(100% - 57px);
  padding: 10px 12px;
  overflow: auto;
}

.category-node {
  display: grid;
  width: 100%;
  min-width: 0;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
}

.category-node > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-node small {
  color: var(--muted);
  font-size: 11px;
}

.mobile-category-select {
  display: none;
}

@media (max-width: 900px) {
  .scenario-layout {
    grid-template-columns: 1fr;
  }

  .table-toolbar {
    flex-wrap: wrap;
  }

  .mobile-category-select {
    display: block;
    width: 100%;
  }

  .content-card :deep(.el-table-fixed-column--right) {
    position: static !important;
  }
}
</style>
