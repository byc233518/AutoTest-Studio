<template>
  <div
    v-loading="initialLoading"
    class="test-plans-page"
    element-loading-text="测试计划加载中..."
    :aria-busy="initialLoading"
  >
    <aside class="plan-browser" aria-label="测试计划列表">
      <div class="plan-browser-header">
        <div>
          <strong>测试计划</strong>
          <span>{{ plans.length }}</span>
        </div>
        <el-button type="primary" :icon="Plus" size="small" @click="openCreatePlan">
          新建
        </el-button>
      </div>

      <div class="plan-search">
        <el-input
          v-model="planKeyword"
          :prefix-icon="Search"
          placeholder="搜索计划"
          clearable
          aria-label="搜索测试计划"
        />
        <el-button
          :icon="Refresh"
          circle
          aria-label="刷新测试计划"
          :loading="refreshing"
          @click="refreshAll"
        />
      </div>

      <div v-if="loadError" class="load-error" role="alert">
        <span>{{ loadError }}</span>
        <el-button link type="primary" @click="refreshAll">重试</el-button>
      </div>

      <nav v-if="filteredPlans.length" class="plan-list" aria-label="计划">
        <button
          v-for="plan in filteredPlans"
          :key="plan.id"
          type="button"
          class="plan-list-item"
          :class="{ active: plan.id === selectedPlanId }"
          :aria-current="plan.id === selectedPlanId ? 'page' : undefined"
          @click="selectPlan(plan.id)"
        >
          <span class="plan-list-main">
            <strong :title="plan.name">{{ plan.name }}</strong>
            <small>{{ plan.items.length }} 个用例 · {{ executionModeLabel(plan.executionMode) }}</small>
          </span>
          <el-tag
            v-if="latestRunByPlan[plan.id]"
            size="small"
            effect="plain"
            :type="statusType(latestRunByPlan[plan.id].status)"
          >
            {{ statusLabel(latestRunByPlan[plan.id].status) }}
          </el-tag>
        </button>
      </nav>
      <el-empty v-else :description="plans.length ? '没有匹配的计划' : '暂无测试计划'" :image-size="72">
        <el-button v-if="!plans.length" type="primary" :icon="Plus" @click="openCreatePlan">
          新建计划
        </el-button>
      </el-empty>
    </aside>

    <main class="plan-detail" aria-live="polite">
      <template v-if="selectedPlan">
        <header class="plan-detail-header">
          <div class="plan-title">
            <div class="plan-title-line">
              <h2>{{ selectedPlan.name }}</h2>
              <el-tag size="small" effect="plain">{{ selectedPlan.items.length }} 个用例</el-tag>
            </div>
            <p>{{ selectedPlan.description || '暂无说明' }}</p>
          </div>
          <div class="plan-actions">
            <el-button :icon="Edit" @click="openEditPlan(selectedPlan)">编辑</el-button>
            <el-button :icon="Delete" type="danger" plain @click="deleteSelectedPlan">删除</el-button>
          </div>
        </header>

        <div class="plan-detail-body">
          <section class="run-config" aria-labelledby="run-config-title">
            <div class="section-label">
              <strong id="run-config-title">批次执行</strong>
              <span>按当前顺序执行计划内全部用例</span>
            </div>
            <el-select
              v-model="runConfig.environment"
              class="environment-select"
              aria-label="执行环境"
              placeholder="选择环境"
              filterable
            >
              <el-option
                v-for="environment in environments"
                :key="environmentValue(environment)"
                :label="environment.name"
                :value="environmentValue(environment)"
              />
            </el-select>
            <el-segmented
              v-model="runConfig.executionMode"
              :options="executionModeOptions"
              aria-label="执行模式"
            />
            <el-button
              type="primary"
              :icon="VideoPlay"
              :loading="startingRun"
              :disabled="!selectedPlan.items.length || !runConfig.environment || isActiveStatus(currentRun?.status)"
              @click="startBatch"
            >
              启动批次
            </el-button>
          </section>

          <section class="case-order-section" aria-labelledby="case-order-title">
            <div class="section-heading">
              <div>
                <strong id="case-order-title">用例执行顺序</strong>
                <span>批次按表格顺序串行执行</span>
              </div>
              <el-button link type="primary" :icon="Edit" @click="openEditPlan(selectedPlan)">
                调整计划
              </el-button>
            </div>
            <el-table
              :data="selectedPlan.items"
              size="small"
              height="100%"
              empty-text="计划中尚未添加测试用例"
              row-key="scenarioId"
            >
              <el-table-column type="index" label="#" width="48" align="center" />
              <el-table-column label="测试用例" min-width="230">
                <template #default="{ row }">
                  <div class="case-cell">
                    <strong>{{ scenarioName(row.scenarioId) }}</strong>
                    <span>{{ scenarioKey(row.scenarioId) }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="目录" min-width="220" show-overflow-tooltip>
                <template #default="{ row }">{{ scenarioDirectory(row.scenarioId) }}</template>
              </el-table-column>
              <el-table-column label="数据集" min-width="160" show-overflow-tooltip>
                <template #default="{ row }">{{ datasetLabel(row) }}</template>
              </el-table-column>
              <el-table-column label="状态" width="92" align="center">
                <template #default="{ row }">
                  <el-tag v-if="batchItem(row.scenarioId)" size="small" :type="statusType(batchItem(row.scenarioId).status)">
                    {{ statusLabel(batchItem(row.scenarioId).status) }}
                  </el-tag>
                  <span v-else class="muted-status">等待执行</span>
                </template>
              </el-table-column>
            </el-table>
          </section>

          <div class="batch-report-grid">
            <section class="recent-batch" aria-labelledby="recent-batch-title">
              <div class="section-heading">
                <div>
                  <strong id="recent-batch-title">最近批次</strong>
                  <span>{{ currentRun ? formatTime(currentRun.startedAt || currentRun.createdAt) : '暂无执行记录' }}</span>
                </div>
                <el-button
                  v-if="currentRun"
                  :icon="Refresh"
                  circle
                  size="small"
                  aria-label="刷新批次状态"
                  :loading="runRefreshing"
                  @click="refreshCurrentRun"
                />
              </div>

              <template v-if="currentRun">
                <div class="batch-identity">
                  <div>
                    <span>批次编号</span>
                    <strong :title="batchId(currentRun)">{{ batchId(currentRun) }}</strong>
                  </div>
                  <el-tag :type="statusType(currentRun.status)" effect="light">
                    {{ statusLabel(currentRun.status) }}
                  </el-tag>
                </div>
                <div class="batch-metrics">
                  <div><span>总数</span><strong>{{ runSummary.total }}</strong></div>
                  <div><span>通过</span><strong class="success-text">{{ runSummary.passed }}</strong></div>
                  <div><span>失败</span><strong class="danger-text">{{ runSummary.failed }}</strong></div>
                </div>
                <el-progress
                  :percentage="runProgress"
                  :status="currentRun.status === 'failed' ? 'exception' : currentRun.status === 'passed' ? 'success' : undefined"
                  :stroke-width="8"
                />
                <dl class="batch-meta">
                  <div><dt>环境</dt><dd>{{ environmentName(currentRun.environment) }}</dd></div>
                  <div><dt>模式</dt><dd>{{ executionModeLabel(currentRun.executionMode) }}</dd></div>
                  <div><dt>耗时</dt><dd>{{ durationLabel(currentRun) }}</dd></div>
                </dl>
              </template>
              <el-empty v-else description="执行计划后在此查看批次状态" :image-size="64" />
            </section>

            <section class="ai-report" aria-labelledby="ai-report-title">
              <div class="section-heading">
                <div>
                  <strong id="ai-report-title">测试报告</strong>
                  <span>{{ reportFormatLabel }}</span>
                </div>
                <div class="report-heading-actions">
                  <el-tag v-if="reportSource" size="small" effect="plain" type="info">
                    {{ reportSource }}
                  </el-tag>
                  <el-button
                    v-if="currentRun?.reportUrl"
                    size="small"
                    link
                    type="primary"
                    @click="downloadReport"
                  >
                    下载
                  </el-button>
                </div>
              </div>
              <el-scrollbar class="report-scroll">
                <div v-if="reportLoading" class="report-loading" aria-live="polite">
                  <el-icon class="is-loading"><Loading /></el-icon>
                  <span>报告加载中...</span>
                </div>
                <iframe
                  v-else-if="reportHtml"
                  class="report-iframe"
                  title="测试报告预览"
                  sandbox=""
                  :srcdoc="reportHtml"
                />
                <article v-else-if="reportBlocks.length" class="markdown-report">
                  <template v-for="(block, index) in reportBlocks" :key="`${block.type}-${index}`">
                    <component :is="`h${block.level}`" v-if="block.type === 'heading'">{{ block.text }}</component>
                    <p v-else-if="block.type === 'paragraph'">{{ block.text }}</p>
                    <blockquote v-else-if="block.type === 'quote'">{{ block.text }}</blockquote>
                    <pre v-else-if="block.type === 'code'"><code>{{ block.text }}</code></pre>
                    <hr v-else-if="block.type === 'rule'">
                    <ul v-else-if="block.type === 'list'">
                      <li v-for="(item, itemIndex) in block.items" :key="itemIndex">{{ item }}</li>
                    </ul>
                    <ol v-else-if="block.type === 'ordered-list'">
                      <li v-for="(item, itemIndex) in block.items" :key="itemIndex">{{ item }}</li>
                    </ol>
                    <div v-else-if="block.type === 'table'" class="markdown-table-wrap">
                      <table>
                        <thead><tr><th v-for="header in block.headers" :key="header">{{ header }}</th></tr></thead>
                        <tbody>
                          <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
                            <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </template>
                </article>
                <el-empty
                  v-else
                  :description="reportEmptyText"
                  :image-size="64"
                />
              </el-scrollbar>
            </section>
          </div>
        </div>
      </template>

      <el-empty v-else description="选择或新建测试计划">
        <el-button type="primary" :icon="Plus" @click="openCreatePlan">新建计划</el-button>
      </el-empty>
    </main>

    <el-dialog
      v-model="editorVisible"
      :title="editingPlanId ? '编辑测试计划' : '新建测试计划'"
      width="880px"
      top="5vh"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <el-form
        ref="editorFormRef"
        :model="editorForm"
        :rules="editorRules"
        label-position="top"
        class="plan-editor-form"
      >
        <div class="editor-fields">
          <el-form-item label="计划名称" prop="name">
            <el-input v-model="editorForm.name" maxlength="80" show-word-limit placeholder="例如：冒烟回归" />
          </el-form-item>
          <el-form-item label="默认环境" prop="environment">
            <el-select v-model="editorForm.environment" class="wide" placeholder="选择环境" filterable>
              <el-option
                v-for="environment in environments"
                :key="environmentValue(environment)"
                :label="environment.name"
                :value="environmentValue(environment)"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="默认执行模式" prop="executionMode">
            <el-segmented v-model="editorForm.executionMode" :options="executionModeOptions" />
          </el-form-item>
        </div>
        <el-form-item label="计划说明">
          <el-input
            v-model="editorForm.description"
            type="textarea"
            :rows="2"
            maxlength="300"
            show-word-limit
            placeholder="说明本计划覆盖的业务范围"
          />
        </el-form-item>
      </el-form>

      <div class="editor-case-heading">
        <div>
          <strong>测试用例</strong>
          <span>仅可添加「可执行」用例；共 {{ editorItems.length }} 个，按下列顺序执行</span>
        </div>
        <el-button type="primary" plain :icon="Plus" @click="openCasePicker">
          添加可执行用例
        </el-button>
      </div>
      <el-table :data="editorItems" size="small" max-height="330" empty-text="请添加可执行测试用例" row-key="scenarioId">
        <el-table-column type="index" label="#" width="46" align="center" />
        <el-table-column label="测试用例" min-width="210">
          <template #default="{ row }">
            <div class="case-cell compact">
              <strong>{{ scenarioName(row.scenarioId) }}</strong>
              <span>{{ scenarioDirectory(row.scenarioId) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="就绪" width="88" align="center">
          <template #default="{ row }">
            <el-tag size="small" :type="scenarioReady(row.scenarioId) ? 'success' : 'warning'">
              {{ scenarioReady(row.scenarioId) ? '可执行' : '未就绪' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="测试数据" min-width="220">
          <template #default="{ row }">
            <el-select
              v-model="row.datasetId"
              class="wide"
              clearable
              filterable
              placeholder="自动使用最近有效数据"
              :loading="datasetsLoading"
            >
              <el-option
                v-for="item in datasetsForScenario(row.scenarioId)"
                :key="item.id"
                :label="`${item.name}（${item.rowCount || 0} 行）`"
                :value="item.id"
              />
            </el-select>
            <el-text v-if="!datasetsForScenario(row.scenarioId).length" type="warning" size="small">
              暂无可用数据集
            </el-text>
          </template>
        </el-table-column>
        <el-table-column label="顺序" width="92" align="center">
          <template #default="{ $index }">
            <div class="order-actions">
              <el-button
                :icon="ArrowUp"
                link
                :disabled="$index === 0"
                :aria-label="`上移第 ${$index + 1} 个用例`"
                @click="moveEditorItem($index, -1)"
              />
              <el-button
                :icon="ArrowDown"
                link
                :disabled="$index === editorItems.length - 1"
                :aria-label="`下移第 ${$index + 1} 个用例`"
                @click="moveEditorItem($index, 1)"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="68" align="center">
          <template #default="{ $index }">
            <el-button
              :icon="Delete"
              link
              type="danger"
              :aria-label="`移除第 ${$index + 1} 个用例`"
              @click="editorItems.splice($index, 1)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-alert
        v-if="editorError"
        class="editor-error"
        :title="editorError"
        type="error"
        show-icon
        :closable="false"
      />
      <template #footer>
        <el-button @click="editorVisible = false">取消</el-button>
        <el-button type="primary" :loading="savingPlan" @click="savePlan">保存计划</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="casePickerVisible"
      title="添加可执行测试用例"
      width="680px"
      top="7vh"
      append-to-body
      destroy-on-close
      :close-on-click-modal="false"
    >
      <el-alert
        class="case-picker-alert"
        title="仅列出状态为「可执行」的用例（已发布且脚本、数据、环境等就绪）。"
        type="info"
        show-icon
        :closable="false"
      />
      <div class="case-picker-toolbar">
        <el-input
          v-model="caseKeyword"
          :prefix-icon="Search"
          placeholder="搜索目录、用例名称或 key"
          clearable
          aria-label="搜索可添加的测试用例"
        />
      </div>
      <div class="case-tree-frame">
        <el-tree
          ref="caseTreeRef"
          :data="caseTree"
          node-key="id"
          show-checkbox
          check-on-click-node
          :default-expanded-keys="caseTree.map((node) => node.id)"
          :indent="16"
          :filter-node-method="filterCaseNode"
          empty-text="暂无可执行测试用例"
          @check="updateCheckedCaseCount"
        >
          <template #default="{ data }">
            <span class="case-tree-node">
              <el-icon aria-hidden="true"><Folder v-if="data.type === 'directory'" /><Document v-else /></el-icon>
              <span>{{ data.label }}</span>
              <small v-if="data.type === 'directory'">{{ data.scenarioCount }}</small>
              <small v-else>{{ data.key }}</small>
            </span>
          </template>
        </el-tree>
      </div>
      <template #footer>
        <el-button @click="casePickerVisible = false">取消</el-button>
        <el-button type="primary" :disabled="!checkedCaseCount" @click="confirmCaseSelection">
          添加 {{ checkedCaseCount }} 个用例
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  ArrowDown,
  ArrowUp,
  Delete,
  Document,
  Edit,
  Folder,
  Loading,
  Plus,
  Refresh,
  Search,
  VideoPlay
} from '@element-plus/icons-vue';
import { api } from '../api';

const plans = ref([]);
const scenarios = ref([]);
const environments = ref([]);
const selectedPlanId = ref('');
const planKeyword = ref('');
const initialLoading = ref(true);
const refreshing = ref(false);
const loadError = ref('');
const latestRunByPlan = reactive({});
const currentRun = ref(null);
const runRefreshing = ref(false);
const startingRun = ref(false);
const reportMarkdown = ref('');
const reportHtml = ref('');
const reportFormat = ref('markdown');
const reportLoading = ref(false);
const reportSource = ref('');
const runConfig = reactive({ environment: '', executionMode: 'headless' });

const editorVisible = ref(false);
const editingPlanId = ref('');
const editorFormRef = ref();
const savingPlan = ref(false);
const editorError = ref('');
const editorForm = reactive({ name: '', description: '', environment: '', executionMode: 'headless' });
const editorItems = ref([]);
const editorRules = {
  name: [{ required: true, message: '请填写计划名称', trigger: 'blur' }],
  environment: [{ required: true, message: '请选择默认环境', trigger: 'change' }],
  executionMode: [{ required: true, message: '请选择默认执行模式', trigger: 'change' }]
};

const casePickerVisible = ref(false);
const caseTreeRef = ref();
const caseKeyword = ref('');
const checkedCaseCount = ref(0);
const datasetsLoading = ref(false);
const datasetsByScenarioId = reactive({});
let runPollTimer;

const executionModeOptions = [
  { label: '无头', value: 'headless' },
  { label: '有头', value: 'headed' }
];

const selectedPlan = computed(() => plans.value.find((plan) => plan.id === selectedPlanId.value) || null);
const filteredPlans = computed(() => {
  const keyword = planKeyword.value.trim().toLowerCase();
  return keyword
    ? plans.value.filter((plan) => `${plan.name} ${plan.description}`.toLowerCase().includes(keyword))
    : plans.value;
});
const scenarioLookup = computed(() => {
  const values = new Map();
  for (const scenario of scenarios.value) {
    if (scenario.id) values.set(scenario.id, scenario);
    if (scenario.key) values.set(scenario.key, scenario);
  }
  return values;
});
const caseTree = computed(() => buildCaseTree(scenarios.value.filter(isExecutableScenario)));
const runSummary = computed(() => ({
  total: Number(currentRun.value?.summary?.total ?? currentRun.value?.totalItems ?? currentRun.value?.items?.length ?? 0),
  passed: Number(currentRun.value?.summary?.passed ?? currentRun.value?.passedItems ?? 0),
  failed: Number(currentRun.value?.summary?.failed ?? currentRun.value?.failedItems ?? 0)
}));
const runProgress = computed(() => {
  if (!runSummary.value.total) return 0;
  return Math.min(100, Math.round((runSummary.value.passed + runSummary.value.failed) / runSummary.value.total * 100));
});
const reportBlocks = computed(() => (reportHtml.value ? [] : parseMarkdown(reportMarkdown.value)));
const reportEmptyText = computed(() => {
  if (!currentRun.value) return '执行批次后生成测试报告';
  if (['queued', 'running'].includes(currentRun.value.status)) return '批次完成后生成测试报告';
  return '当前批次暂无测试报告';
});
const reportFormatLabel = computed(() => {
  if (reportFormat.value === 'html') return 'HTML';
  if (reportFormat.value === 'word') return 'Word';
  return 'Markdown';
});

watch(caseKeyword, (value) => caseTreeRef.value?.filter(value));

onMounted(loadInitialData);
onBeforeUnmount(stopRunPolling);

function unwrapList(payload, keys) {
  if (Array.isArray(payload)) return payload;
  for (const key of keys) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }
  return [];
}

function normalizePlan(raw) {
  return {
    ...raw,
    id: raw.id || raw.testPlanId,
    name: raw.name || '未命名计划',
    description: raw.description || '',
    environment: raw.environment || raw.environmentKey || '',
    executionMode: raw.executionMode === 'headed' ? 'headed' : 'headless',
    items: (raw.items || []).map((item) => ({
      scenarioId: item.scenarioId || item.scenario_id,
      datasetId: item.datasetId || item.dataset_id || ''
    })).filter((item) => item.scenarioId)
  };
}

async function loadInitialData() {
  initialLoading.value = true;
  loadError.value = '';
  try {
    const [planPayload, scenarioPayload, environmentPayload, runPayload] = await Promise.all([
      api('/api/test-plans'),
      api('/api/scenarios'),
      api('/api/environments'),
      api('/api/test-plan-runs').catch(() => [])
    ]);
    plans.value = unwrapList(planPayload, ['plans', 'testPlans']).map(normalizePlan);
    scenarios.value = unwrapList(scenarioPayload, ['scenarios']);
    environments.value = unwrapList(environmentPayload, ['environments']);
    for (const key of Object.keys(latestRunByPlan)) delete latestRunByPlan[key];
    for (const run of unwrapList(runPayload, ['runs', 'testPlanRuns'])) {
      if (run.testPlanId && !latestRunByPlan[run.testPlanId]) latestRunByPlan[run.testPlanId] = run;
    }
    const retainedId = plans.value.some((plan) => plan.id === selectedPlanId.value)
      ? selectedPlanId.value
      : plans.value[0]?.id || '';
    await selectPlan(retainedId);
    return true;
  } catch (error) {
    loadError.value = error.message || '测试计划加载失败';
    return false;
  } finally {
    initialLoading.value = false;
  }
}

async function refreshAll() {
  refreshing.value = true;
  try {
    if (await loadInitialData()) ElMessage.success('测试计划已刷新');
  } finally {
    refreshing.value = false;
  }
}

async function selectPlan(planId) {
  stopRunPolling();
  selectedPlanId.value = planId || '';
  currentRun.value = null;
  reportMarkdown.value = '';
  reportHtml.value = '';
  reportFormat.value = 'markdown';
  reportSource.value = '';
  const plan = plans.value.find((item) => item.id === planId);
  if (!plan) return;
  runConfig.environment = plan.environment || defaultEnvironment();
  runConfig.executionMode = plan.executionMode || 'headless';
  await ensureDatasetsLoaded(plan.items.map((item) => item.scenarioId));
  await loadLatestPlanRun(plan).catch((error) => {
    if (error?.status !== 404) ElMessage.error(error.message || '最近批次加载失败');
  });
}

async function loadLatestPlanRun(plan) {
  const payload = await api(`/api/test-plans/${encodeURIComponent(plan.id)}/runs`);
  if (selectedPlanId.value !== plan.id) return;
  const runs = unwrapList(payload, ['runs', 'testPlanRuns']);
  if (!runs.length) return;
  const latest = runs[0];
  latestRunByPlan[plan.id] = latest;
  currentRun.value = latest;
  await loadRunReport(latest);
  if (isActiveStatus(latest.status)) startRunPolling();
}

function environmentValue(environment) {
  return environment.key || environment.id;
}

function defaultEnvironment() {
  const environment = environments.value.find((item) => item.isDefault) || environments.value[0];
  return environment ? environmentValue(environment) : '';
}

function environmentName(value) {
  return environments.value.find((item) => environmentValue(item) === value)?.name || value || '-';
}

function executionModeLabel(mode) {
  return mode === 'headed' ? '有头' : '无头';
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

function scenarioFor(id) {
  return scenarioLookup.value.get(id);
}

function isExecutableScenario(scenario) {
  return Boolean(scenario) && scenario.status !== 'draft' && scenario.readiness?.ready;
}

function scenarioReady(scenarioId) {
  return isExecutableScenario(scenarioFor(scenarioId));
}

function scenarioName(id) {
  return scenarioFor(id)?.name || `已移除用例（${id}）`;
}

function scenarioKey(id) {
  return scenarioFor(id)?.key || id;
}

function scenarioDirectory(id) {
  const scenario = scenarioFor(id);
  return scenario?.directory || scenario?.module || '未分类';
}

function preferredDatasetId(datasets = []) {
  return datasets.find((item) => item.validationStatus === 'valid' || item.validation_status === 'valid')?.id
    || datasets[0]?.id
    || '';
}

function datasetsForScenario(scenarioId) {
  return datasetsByScenarioId[scenarioId] || [];
}

function datasetLabel(row) {
  if (!row?.datasetId) return '执行时使用默认数据';
  const matched = datasetsForScenario(row.scenarioId).find((item) => item.id === row.datasetId);
  return matched ? `${matched.name}（${matched.rowCount || 0} 行）` : row.datasetId;
}

async function ensureDatasetsLoaded(scenarioIds = []) {
  const pending = [...new Set(scenarioIds.filter(Boolean))]
    .filter((scenarioId) => !Object.prototype.hasOwnProperty.call(datasetsByScenarioId, scenarioId));
  if (!pending.length) return;
  datasetsLoading.value = true;
  try {
    await Promise.all(pending.map(async (scenarioId) => {
      const scenario = scenarioFor(scenarioId);
      const key = scenario?.key;
      if (!key) {
        datasetsByScenarioId[scenarioId] = [];
        return;
      }
      try {
        const payload = await api(`/api/scenarios/${encodeURIComponent(key)}/datasets`);
        datasetsByScenarioId[scenarioId] = Array.isArray(payload) ? payload : (payload?.datasets || []);
      } catch {
        datasetsByScenarioId[scenarioId] = [];
      }
    }));
  } finally {
    datasetsLoading.value = false;
  }
}

async function refreshEditorDatasets() {
  await ensureDatasetsLoaded(editorItems.value.map((item) => item.scenarioId));
  for (const item of editorItems.value) {
    const datasets = datasetsForScenario(item.scenarioId);
    if (!item.datasetId) item.datasetId = preferredDatasetId(datasets);
    else if (datasets.length && !datasets.some((dataset) => dataset.id === item.datasetId)) {
      item.datasetId = preferredDatasetId(datasets);
    }
  }
}

function batchItem(scenarioId) {
  return currentRun.value?.items?.find((item) => item.scenarioId === scenarioId) || null;
}

function batchId(run) {
  return run?.id || run?.runId || run?.testPlanRunId || '-';
}

function formatTime(value) {
  if (!value) return '-';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(date);
}

function durationLabel(run) {
  const duration = Number(run?.summary?.durationMs || 0);
  if (duration > 0) return duration < 1000 ? `${duration} ms` : `${(duration / 1000).toFixed(1)} 秒`;
  if (!run?.startedAt) return '-';
  const end = run.finishedAt ? new Date(run.finishedAt).getTime() : Date.now();
  const start = new Date(run.startedAt).getTime();
  if (!Number.isFinite(start) || !Number.isFinite(end)) return '-';
  return `${Math.max(0, Math.round((end - start) / 1000))} 秒`;
}

async function openCreatePlan() {
  editingPlanId.value = '';
  Object.assign(editorForm, {
    name: '',
    description: '',
    environment: defaultEnvironment(),
    executionMode: 'headless'
  });
  editorItems.value = [];
  editorError.value = '';
  editorVisible.value = true;
}

async function openEditPlan(plan) {
  editingPlanId.value = plan.id;
  Object.assign(editorForm, {
    name: plan.name,
    description: plan.description,
    environment: plan.environment || defaultEnvironment(),
    executionMode: plan.executionMode || 'headless'
  });
  editorItems.value = plan.items.map((item) => ({ ...item }));
  editorError.value = '';
  editorVisible.value = true;
  await refreshEditorDatasets();
}

async function savePlan() {
  editorError.value = '';
  try {
    await editorFormRef.value?.validate();
    if (!editorItems.value.length) throw new Error('请至少添加一个可执行测试用例');
    const notReady = editorItems.value.filter((item) => !scenarioReady(item.scenarioId));
    if (notReady.length) {
      throw new Error(`有 ${notReady.length} 个用例尚未可执行，请移除后再保存`);
    }
    savingPlan.value = true;
    const body = {
      name: editorForm.name.trim(),
      description: editorForm.description.trim(),
      environment: editorForm.environment,
      executionMode: editorForm.executionMode,
      items: editorItems.value.map((item) => ({
        scenarioId: item.scenarioId,
        ...(String(item.datasetId || '').trim() ? { datasetId: String(item.datasetId).trim() } : {})
      }))
    };
    const path = editingPlanId.value
      ? `/api/test-plans/${encodeURIComponent(editingPlanId.value)}`
      : '/api/test-plans';
    const saved = normalizePlan(await api(path, {
      method: editingPlanId.value ? 'PUT' : 'POST',
      body: JSON.stringify(body)
    }));
    editorVisible.value = false;
    await reloadPlans(saved.id);
    ElMessage.success(editingPlanId.value ? '测试计划已更新' : '测试计划已创建');
  } catch (error) {
    if (error instanceof Error) editorError.value = error.message;
  } finally {
    savingPlan.value = false;
  }
}

async function reloadPlans(preferredId = selectedPlanId.value) {
  const payload = await api('/api/test-plans');
  plans.value = unwrapList(payload, ['plans', 'testPlans']).map(normalizePlan);
  const nextId = plans.value.some((plan) => plan.id === preferredId) ? preferredId : plans.value[0]?.id || '';
  await selectPlan(nextId);
}

async function deleteSelectedPlan() {
  if (!selectedPlan.value) return;
  try {
    await ElMessageBox.confirm(
      `确定删除“${selectedPlan.value.name}”吗？历史批次不会随计划一起删除。`,
      '删除测试计划',
      { type: 'warning', confirmButtonText: '删除', cancelButtonText: '取消' }
    );
    await api(`/api/test-plans/${encodeURIComponent(selectedPlan.value.id)}`, { method: 'DELETE' });
    delete latestRunByPlan[selectedPlan.value.id];
    await reloadPlans('');
    ElMessage.success('测试计划已删除');
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') ElMessage.error(error.message || '删除测试计划失败');
  }
}

async function openCasePicker() {
  caseKeyword.value = '';
  casePickerVisible.value = true;
  await nextTick();
  caseTreeRef.value?.setCheckedKeys(editorItems.value.map((item) => `case:${item.scenarioId}`));
  updateCheckedCaseCount();
}

function updateCheckedCaseCount() {
  checkedCaseCount.value = caseTreeRef.value
    ? caseTreeRef.value.getCheckedNodes(true).filter((node) => node.type === 'scenario').length
    : 0;
}

async function confirmCaseSelection() {
  const selectedNodes = caseTreeRef.value?.getCheckedNodes(true).filter((node) => node.type === 'scenario') || [];
  const selectedIds = new Set(selectedNodes.map((node) => node.scenarioId));
  const executableIds = new Set(
    scenarios.value.filter(isExecutableScenario).map((scenario) => scenario.id || scenario.key)
  );
  const existing = new Map(editorItems.value.map((item) => [item.scenarioId, item]));
  // 选择器里看不到的未就绪用例先保留，保存时再统一校验
  const retained = editorItems.value.filter((item) =>
    !executableIds.has(item.scenarioId) || selectedIds.has(item.scenarioId)
  );
  for (const node of selectedNodes) {
    if (!existing.has(node.scenarioId)) retained.push({ scenarioId: node.scenarioId, datasetId: '' });
  }
  editorItems.value = retained;
  casePickerVisible.value = false;
  await refreshEditorDatasets();
}

function moveEditorItem(index, offset) {
  const target = index + offset;
  if (target < 0 || target >= editorItems.value.length) return;
  const next = [...editorItems.value];
  [next[index], next[target]] = [next[target], next[index]];
  editorItems.value = next;
}

function filterCaseNode(keyword, node) {
  if (!keyword) return true;
  return String(node.searchText || `${node.label} ${node.key || ''} ${node.directory || ''}`)
    .toLowerCase()
    .includes(keyword.trim().toLowerCase());
}

function buildCaseTree(source) {
  const roots = [];
  const ordered = [...source].sort((left, right) => {
    const leftPath = left.directory || left.module || '未分类';
    const rightPath = right.directory || right.module || '未分类';
    return leftPath.localeCompare(rightPath, 'zh-CN') || String(left.name).localeCompare(String(right.name), 'zh-CN');
  });
  for (const scenario of ordered) {
    const scenarioId = scenario.id || scenario.key;
    const parts = String(scenario.directory || scenario.module || '未分类')
      .split(/\s*\/\s*/)
      .map((item) => item.trim())
      .filter(Boolean);
    let children = roots;
    const pathParts = [];
    for (const label of parts.length ? parts : ['未分类']) {
      pathParts.push(label);
      const id = `directory:${pathParts.map(encodeURIComponent).join('/')}`;
      let directory = children.find((item) => item.id === id);
      if (!directory) {
        directory = { id, label, type: 'directory', children: [], scenarioCount: 0 };
        children.push(directory);
      }
      children = directory.children;
    }
    children.push({
      id: `case:${scenarioId}`,
      label: scenario.name,
      key: scenario.key || scenarioId,
      directory: scenario.directory || scenario.module || '未分类',
      type: 'scenario',
      scenarioId,
      children: []
    });
  }
  const countCases = (node) => {
    if (node.type === 'scenario') {
      node.searchText = `${node.label} ${node.key || ''} ${node.directory || ''}`;
      return 1;
    }
    node.scenarioCount = node.children.reduce((sum, child) => sum + countCases(child), 0);
    node.searchText = [node.label, ...node.children.map((child) => child.searchText || '')].join(' ');
    return node.scenarioCount;
  };
  roots.forEach(countCases);
  return roots;
}

async function startBatch() {
  if (!selectedPlan.value) return;
  const notReady = selectedPlan.value.items.filter((item) => !scenarioReady(item.scenarioId));
  if (notReady.length) {
    ElMessage.warning(`计划中有 ${notReady.length} 个用例尚未可执行，请先调整计划`);
    return;
  }
  startingRun.value = true;
  try {
    const result = await api(`/api/test-plans/${encodeURIComponent(selectedPlan.value.id)}/run`, {
      method: 'POST',
      body: JSON.stringify({
        environment: runConfig.environment,
        executionMode: runConfig.executionMode
      })
    });
    currentRun.value = result.run || result.testPlanRun || result;
    latestRunByPlan[selectedPlan.value.id] = currentRun.value;
    reportMarkdown.value = '';
    reportHtml.value = '';
    reportFormat.value = 'markdown';
    reportSource.value = '';
    startRunPolling();
    ElMessage.success('测试批次已启动');
  } catch (error) {
    ElMessage.error(error.message || '测试批次启动失败');
  } finally {
    startingRun.value = false;
  }
}

function startRunPolling() {
  stopRunPolling();
  if (!currentRun.value || !isActiveStatus(currentRun.value.status)) return;
  runPollTimer = setInterval(refreshCurrentRun, 2500);
}

function stopRunPolling() {
  if (runPollTimer) clearInterval(runPollTimer);
  runPollTimer = undefined;
}

async function refreshCurrentRun() {
  if (runRefreshing.value) return;
  const id = batchId(currentRun.value);
  if (!id || id === '-') return;
  runRefreshing.value = true;
  try {
    const payload = await api(`/api/test-plan-runs/${encodeURIComponent(id)}`);
    if (batchId(currentRun.value) !== id) return;
    currentRun.value = payload.run || payload.testPlanRun || payload;
    if (selectedPlan.value) latestRunByPlan[selectedPlan.value.id] = currentRun.value;
    if (!isActiveStatus(currentRun.value.status)) {
      stopRunPolling();
      await loadRunReport(currentRun.value);
    }
  } catch (error) {
    stopRunPolling();
    ElMessage.error(error.message || '批次状态刷新失败');
  } finally {
    runRefreshing.value = false;
  }
}

async function loadRunReport(run) {
  const id = batchId(run);
  reportMarkdown.value = '';
  reportHtml.value = '';
  reportFormat.value = run?.reportFormat || run?.summary?.reportFormat || 'markdown';
  reportSource.value = '';
  if (!id || id === '-') return;
  reportLoading.value = true;
  try {
    const result = await api(`/api/test-plan-runs/${encodeURIComponent(id)}/report`);
    if (typeof result === 'string' && result.trim()) {
      const format = run?.reportFormat || run?.summary?.reportFormat
        || (result.trimStart().startsWith('<') ? 'html' : 'markdown');
      reportFormat.value = format;
      if (format === 'html' || format === 'word') {
        reportHtml.value = result;
        reportMarkdown.value = '';
      } else {
        reportMarkdown.value = result;
        reportHtml.value = '';
      }
      reportSource.value = ['ai', 'llm'].includes(run?.summary?.source) ? 'AI 生成' : '';
      return;
    }
  } catch (error) {
    if (error?.status !== 404 && !isActiveStatus(run.status)) {
      ElMessage.error(error.message || '测试报告加载失败');
    }
  } finally {
    reportLoading.value = false;
  }
  const narrative = run?.summary?.narrative;
  if (typeof narrative === 'string' && narrative.trim()) {
    reportMarkdown.value = narrative;
    reportHtml.value = '';
    reportFormat.value = 'markdown';
    reportSource.value = ['ai', 'llm'].includes(run.summary?.source) ? 'AI 生成' : '';
  }
}

function downloadReport() {
  const id = batchId(currentRun.value);
  if (!id || id === '-') return;
  window.open(`/api/test-plan-runs/${encodeURIComponent(id)}/report?download=1`, '_blank');
}

function cleanInlineMarkdown(value) {
  return String(value || '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    .replace(/(`{1,2}|\*\*|__|\*|_)(.*?)\1/g, '$2')
    .trim();
}

function tableCells(line) {
  return line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cleanInlineMarkdown(cell));
}

function parseMarkdown(source) {
  const lines = String(source || '').replace(/\r\n?/g, '\n').split('\n');
  const blocks = [];
  for (let index = 0; index < lines.length;) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }
    if (/^```/.test(line.trim())) {
      const code = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index].trim())) code.push(lines[index++]);
      if (index < lines.length) index += 1;
      blocks.push({ type: 'code', text: code.join('\n') });
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length + 1, text: cleanInlineMarkdown(heading[2]) });
      index += 1;
      continue;
    }
    if (/^\s*[-*_]{3,}\s*$/.test(line)) {
      blocks.push({ type: 'rule' });
      index += 1;
      continue;
    }
    if (line.includes('|') && /^\s*\|?\s*:?-{3,}/.test(lines[index + 1] || '')) {
      const headers = tableCells(line);
      const rows = [];
      index += 2;
      while (index < lines.length && lines[index].includes('|') && lines[index].trim()) rows.push(tableCells(lines[index++]));
      blocks.push({ type: 'table', headers, rows });
      continue;
    }
    if (/^\s*[-*+]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*[-*+]\s+/.test(lines[index])) {
        items.push(cleanInlineMarkdown(lines[index++].replace(/^\s*[-*+]\s+/, '')));
      }
      blocks.push({ type: 'list', items });
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*\d+[.)]\s+/.test(lines[index])) {
        items.push(cleanInlineMarkdown(lines[index++].replace(/^\s*\d+[.)]\s+/, '')));
      }
      blocks.push({ type: 'ordered-list', items });
      continue;
    }
    if (/^\s*>\s?/.test(line)) {
      blocks.push({ type: 'quote', text: cleanInlineMarkdown(line.replace(/^\s*>\s?/, '')) });
      index += 1;
      continue;
    }
    const paragraph = [cleanInlineMarkdown(line)];
    index += 1;
    while (index < lines.length && lines[index].trim()
      && !/^(#{1,4})\s+/.test(lines[index])
      && !/^\s*([-*+]\s+|\d+[.)]\s+|>\s?|```)/.test(lines[index])) {
      paragraph.push(cleanInlineMarkdown(lines[index++]));
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }
  return blocks;
}
</script>

<style scoped>
.test-plans-page {
  --plan-border: var(--el-border-color-light);
  --plan-surface: var(--el-bg-color);
  --plan-muted: var(--el-text-color-secondary);
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  gap: 12px;
  min-width: 800px;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.plan-browser,
.plan-detail {
  min-width: 0;
  min-height: 0;
  background: var(--plan-surface);
  border: 1px solid var(--plan-border);
  border-radius: 8px;
}

.plan-browser {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.plan-browser-header,
.plan-detail-header,
.section-heading,
.editor-case-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.plan-browser-header {
  min-height: 58px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--plan-border);
}

.plan-browser-header > div {
  display: flex;
  align-items: baseline;
  gap: 7px;
}

.plan-browser-header strong,
.section-heading strong,
.editor-case-heading strong,
.section-label strong {
  font-size: 14px;
  font-weight: 650;
}

.plan-browser-header span,
.section-heading span,
.editor-case-heading span,
.section-label span {
  color: var(--plan-muted);
  font-size: 12px;
}

.plan-search {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 32px;
  gap: 8px;
  padding: 9px 10px;
  border-bottom: 1px solid var(--plan-border);
}

.plan-list {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 6px;
}

.plan-list-item {
  width: 100%;
  min-height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 8px 7px 10px;
  color: var(--el-text-color-primary);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
}

.plan-list-item:hover {
  background: var(--el-fill-color-light);
}

.plan-list-item:focus-visible {
  outline: 2px solid var(--el-color-primary);
  outline-offset: -2px;
}

.plan-list-item.active {
  background: var(--el-color-primary-light-9);
  border-color: var(--el-color-primary-light-7);
}

.plan-list-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.plan-list-main strong,
.plan-list-main small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.plan-list-main strong {
  font-size: 13px;
}

.plan-list-main small {
  color: var(--plan-muted);
  font-size: 11px;
}

.load-error {
  margin: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: var(--el-color-danger);
  background: var(--el-color-danger-light-9);
  border-radius: 6px;
  font-size: 12px;
}

.plan-detail {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.plan-detail-header {
  min-height: 70px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--plan-border);
}

.plan-title {
  min-width: 0;
}

.plan-title-line {
  display: flex;
  align-items: center;
  gap: 8px;
}

.plan-title h2 {
  margin: 0;
  overflow: hidden;
  font-size: 18px;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.plan-title p {
  margin: 3px 0 0;
  overflow: hidden;
  color: var(--plan-muted);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.plan-actions {
  flex: none;
  display: flex;
  gap: 8px;
}

.plan-detail-body {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(205px, 42%) minmax(220px, 1fr);
  gap: 10px;
  padding: 10px;
  overflow: hidden;
}

.run-config {
  min-height: 54px;
  display: grid;
  grid-template-columns: minmax(160px, 1fr) minmax(180px, 240px) auto auto;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: var(--el-fill-color-lighter);
  border: 1px solid var(--plan-border);
  border-radius: 6px;
}

.section-label,
.section-heading > div,
.editor-case-heading > div {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.environment-select {
  width: 100%;
}

.case-order-section,
.recent-batch,
.ai-report {
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--plan-border);
  border-radius: 6px;
  overflow: hidden;
}

.section-heading {
  min-height: 44px;
  flex: none;
  padding: 7px 10px;
  border-bottom: 1px solid var(--plan-border);
}

.report-heading-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.report-iframe {
  width: 100%;
  min-height: 360px;
  height: 100%;
  border: 0;
  background: #fff;
}

.case-order-section :deep(.el-table) {
  flex: 1;
}

.case-cell {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  line-height: 1.25;
}

.case-cell strong {
  overflow: hidden;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.case-cell span,
.muted-status {
  color: var(--plan-muted);
  font-size: 11px;
}

.batch-report-grid {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(300px, 0.8fr) minmax(420px, 1.2fr);
  gap: 10px;
}

.batch-identity {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 12px 8px;
}

.batch-identity > div {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.batch-identity span,
.batch-metrics span,
.batch-meta dt {
  color: var(--plan-muted);
  font-size: 11px;
}

.batch-identity strong {
  overflow: hidden;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.batch-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--plan-border);
  border-bottom: 1px solid var(--plan-border);
}

.batch-metrics > div {
  padding: 8px 10px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 6px;
}

.batch-metrics > div + div {
  border-left: 1px solid var(--plan-border);
}

.batch-metrics strong {
  font-size: 18px;
  font-variant-numeric: tabular-nums;
}

.success-text { color: var(--el-color-success); }
.danger-text { color: var(--el-color-danger); }

.recent-batch > :deep(.el-progress) {
  margin: 12px 12px 6px;
}

.batch-meta {
  margin: 4px 12px 10px;
}

.batch-meta > div {
  min-height: 25px;
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr);
  align-items: center;
  border-bottom: 1px dashed var(--plan-border);
}

.batch-meta dt,
.batch-meta dd {
  margin: 0;
}

.batch-meta dd {
  overflow: hidden;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.report-scroll {
  flex: 1;
  min-height: 0;
}

.report-loading {
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--plan-muted);
  font-size: 13px;
}

.markdown-report {
  padding: 10px 14px 16px;
  color: var(--el-text-color-primary);
  font-size: 13px;
  line-height: 1.65;
  overflow-wrap: anywhere;
}

.markdown-report h2,
.markdown-report h3,
.markdown-report h4,
.markdown-report h5 {
  margin: 12px 0 6px;
  letter-spacing: 0;
}

.markdown-report h2 { font-size: 17px; }
.markdown-report h3 { font-size: 15px; }
.markdown-report h4,
.markdown-report h5 { font-size: 14px; }
.markdown-report p { margin: 5px 0; }
.markdown-report ul,
.markdown-report ol { margin: 5px 0; padding-left: 22px; }
.markdown-report blockquote {
  margin: 8px 0;
  padding: 5px 10px;
  color: var(--plan-muted);
  background: var(--el-fill-color-lighter);
  border-left: 3px solid var(--el-color-primary-light-5);
}
.markdown-report pre {
  margin: 8px 0;
  padding: 9px 10px;
  overflow: auto;
  background: var(--el-fill-color-dark);
  border-radius: 4px;
  font-size: 12px;
}
.markdown-report hr { border: 0; border-top: 1px solid var(--plan-border); }

.markdown-table-wrap { max-width: 100%; overflow: auto; }
.markdown-table-wrap table { width: 100%; border-collapse: collapse; }
.markdown-table-wrap th,
.markdown-table-wrap td {
  padding: 5px 7px;
  border: 1px solid var(--plan-border);
  text-align: left;
}
.markdown-table-wrap th { background: var(--el-fill-color-light); }

.editor-fields {
  display: grid;
  grid-template-columns: minmax(260px, 1.4fr) minmax(180px, 1fr) auto;
  gap: 12px;
}

.plan-editor-form :deep(.el-form-item) {
  margin-bottom: 12px;
}

.wide { width: 100%; }

.editor-case-heading {
  margin: 4px 0 8px;
  padding-top: 10px;
  border-top: 1px solid var(--plan-border);
}

.case-cell.compact span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.order-actions {
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-actions :deep(.el-button + .el-button) {
  margin-left: 2px;
}

.editor-error { margin-top: 10px; }

.case-picker-alert { margin-bottom: 10px; }

.case-picker-toolbar { margin-bottom: 8px; }

.case-tree-frame {
  height: min(520px, 62vh);
  padding: 6px 8px;
  overflow: auto;
  border: 1px solid var(--plan-border);
  border-radius: 6px;
}

.case-tree-node {
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.case-tree-node > span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.case-tree-node small {
  margin-left: auto;
  padding-right: 5px;
  color: var(--plan-muted);
  font-size: 11px;
}

:deep(.el-table .el-table__cell) {
  padding: 5px 0;
}

:deep(.el-tree-node__content) {
  height: 30px;
}

:deep(.el-empty) {
  padding: 24px 0;
}

@media (prefers-reduced-motion: reduce) {
  .plan-list-item { transition: none; }
}
</style>
