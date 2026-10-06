<template>
  <el-dialog v-model="visible" width="min(920px, 94vw)" destroy-on-close>
    <template #header>
      <div>
        <h2>执行场景</h2>
        <span class="muted">{{ scenario?.name }} · 配置环境和观察方式{{ requiresDataset ? '、测试数据' : '' }}</span>
      </div>
    </template>
      <el-steps :active="requiresDataset ? step : Math.min(step, 1)" finish-status="success" simple>
      <el-step title="运行配置" />
      <el-step v-if="requiresDataset" title="测试数据" />
      <el-step title="确认执行" />
    </el-steps>
    <div class="dialog-body" v-loading="loading">
      <template v-if="step === 0">
        <el-form label-position="top" class="config-grid">
          <el-form-item label="执行环境">
            <el-select v-model="form.environment" @change="loadPreflight">
              <el-option v-for="env in store.environments" :key="env.key" :label="env.name" :value="env.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="执行模式">
            <el-radio-group v-model="form.executionMode">
              <el-radio-button value="ui">UI 模式</el-radio-button>
              <el-radio-button value="headed">有头模式</el-radio-button>
              <el-radio-button value="headless">无头模式</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="preflight">
          <div
            v-for="check in preflight.checks"
            :key="check.type"
            :class="['check', check.ready ? 'ok' : 'warn']"
          >
            <el-icon><CircleCheck v-if="check.ready" /><Warning v-else /></el-icon>
            <div>
              <strong>{{ check.label }}</strong>
              <span>{{ check.ready ? '已就绪' : check.action }}</span>
            </div>
          </div>
        </div>
        <el-alert
          v-if="blockingChecks.length"
          :title="`请先处理：${blockingChecks.map((item) => item.action).join('、')}`"
          type="warning"
          show-icon
          :closable="false"
        />
      </template>
      <template v-else-if="step === 1 && requiresDataset">
        <el-tabs v-model="source">
          <el-tab-pane label="历史数据集" name="history">
            <el-select v-model="form.datasetId" class="wide" placeholder="选择已经准备好的数据">
              <el-option
                v-for="item in datasets"
                :key="item.id"
                :label="`${item.name}（${item.rowCount} 行）`"
                :value="item.id"
              />
            </el-select>
            <el-empty v-if="!datasets.length" description="暂无历史数据，请上传或在线填写" />
          </el-tab-pane>
          <el-tab-pane label="上传 JSON / Excel" name="upload">
            <el-input v-model="form.dataName" placeholder="数据集名称" />
            <el-upload drag :auto-upload="false" :limit="1" accept=".json,.csv,.xlsx" :on-change="(file) => (uploadFile = file.raw)">
              <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
              <div>拖拽 JSON、Excel 或 CSV 文件到这里，或点击选择</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="在线填写" name="manual">
            <div class="data-toolbar">
              <el-input v-model="form.dataName" placeholder="数据集名称" />
              <el-button @click="addRow">增加一行</el-button>
              <el-button @click="generate(false)">生成样例</el-button>
              <el-button @click="generate(true)">AI 生成</el-button>
            </div>
            <el-table :data="rows" border max-height="350" class="editable-grid">
              <el-table-column type="index" width="52" />
              <el-table-column v-for="column in columns" :key="column" :label="column" min-width="150">
                <template #header>
                  {{ column }}<span v-if="required.has(column)" class="required"> *</span>
                </template>
                <template #default="scope">
                  <el-input v-model="scope.row[column]" :placeholder="required.has(column) ? '必填' : '请输入'" />
                </template>
              </el-table-column>
              <el-table-column width="70" fixed="right">
                <template #default="scope">
                  <el-button link type="danger" @click="removeRow(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>
      <template v-else>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="场景">{{ scenario.name }}</el-descriptions-item>
          <el-descriptions-item label="环境">{{ environmentName }}</el-descriptions-item>
          <el-descriptions-item label="执行位置">当前电脑</el-descriptions-item>
          <el-descriptions-item label="模式">{{ modeLabel }}</el-descriptions-item>
          <el-descriptions-item label="数据来源">{{ requiresDataset ? sourceLabel : '无需测试数据' }}</el-descriptions-item>
        </el-descriptions>
        <el-alert
          title="执行后将自动进入执行详情，可实时查看步骤、截图和录像。"
          type="info"
          show-icon
          :closable="false"
        />
      </template>
    </div>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button v-if="step" @click="back">上一步</el-button>
      <el-button v-if="step < confirmStep" type="primary" :disabled="step === 0 && blockingChecks.length > 0" @click="next">下一步</el-button>
      <el-button v-else type="primary" :loading="loading" @click="run">开始执行</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { CircleCheck, Warning, UploadFilled } from '@element-plus/icons-vue';
import { api } from '../api';
import { usePlatformStore } from '../stores/platform';

const emit = defineEmits(['started']);
const store = usePlatformStore();
const visible = ref(false);
const scenario = ref(null);
const step = ref(0);
const source = ref('history');
const datasets = ref([]);
const rows = ref([]);
const preflight = ref({ checks: [] });
const loading = ref(false);
const uploadFile = ref(null);
const form = ref({
  environment: '',
  executionLocation: 'server',
  executionMode: 'ui',
  datasetId: '',
  dataName: ''
});
const columns = computed(() => scenario.value?.dataSchema?.columns || []);
const required = computed(() => new Set(scenario.value?.dataSchema?.required || []));
const requiresDataset = computed(() => Boolean(columns.value.length || required.value.size));
const confirmStep = computed(() => requiresDataset.value ? 2 : 1);
const environmentName = computed(
  () => store.environments.find((item) => item.key === form.value.environment)?.name || form.value.environment
);
const sourceLabel = computed(() => ({ history: '历史数据集', upload: '上传文件', manual: '在线填写' })[source.value]);
const modeLabel = computed(() => ({ ui: 'UI 模式', headed: '有头模式', headless: '无头模式' })[form.value.executionMode]);
const blockingChecks = computed(() =>
  (preflight.value.checks || []).filter((item) => !item.ready && !['dataset', 'dependencies'].includes(item.type))
);

function blank() {
  return Object.fromEntries(columns.value.map((column) => [column, scenario.value?.dataSchema?.example?.[column] || '']));
}
function projectDefaultEnvironment() {
  return store.environments.find((item) => item.isDefault)?.key || store.environments[0]?.key || '';
}
function addRow() {
  rows.value.push(blank());
}
function removeRow(index) {
  if (rows.value.length === 1) return ElMessage.warning('至少保留一行数据');
  rows.value.splice(index, 1);
}
async function loadPreflight() {
  preflight.value = await api(`/api/scenarios/${scenario.value.key}/preflight?environment=${encodeURIComponent(form.value.environment)}`);
}
async function open(item) {
  scenario.value = item;
  step.value = 0;
  uploadFile.value = null;
  form.value = {
    environment: projectDefaultEnvironment(),
    executionLocation: 'server',
    executionMode: 'ui',
    datasetId: '',
    dataName: `${item.name}样本`
  };
  loading.value = true;
  try {
    [datasets.value, preflight.value] = await Promise.all([
      api(`/api/scenarios/${item.key}/datasets`),
      api(`/api/scenarios/${item.key}/preflight?environment=${encodeURIComponent(form.value.environment)}`)
    ]);
    form.value.datasetId = datasets.value[0]?.id || '';
    source.value = datasets.value.length ? 'history' : 'manual';
    rows.value = [blank()];
    visible.value = true;
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    loading.value = false;
  }
}
async function generate(useLlm) {
  try {
    const result = await api(`/api/scenarios/${scenario.value.key}/sample-data`, {
      method: 'POST',
      body: JSON.stringify({ count: 3, useLlm })
    });
    rows.value = result.rows || rows.value;
    ElMessage.success(useLlm ? 'AI 数据已填入表格' : '样例数据已填入表格');
  } catch (error) {
    ElMessage.error(error.message);
  }
}
function validateData() {
  if (!requiresDataset.value) return;
  if (source.value === 'history' && !form.value.datasetId) throw new Error('请选择历史数据集');
  if (source.value === 'upload' && !uploadFile.value) throw new Error('请选择 JSON、Excel 或 CSV 文件');
  if (source.value === 'manual') {
    if (!rows.value.length) throw new Error('请至少填写一行数据');
    for (const [index, row] of rows.value.entries()) {
      for (const field of required.value) {
        if (!String(row[field] ?? '').trim()) throw new Error(`第 ${index + 1} 行的“${field}”为必填项`);
      }
    }
  }
}
function next() {
  try {
    if (step.value === 1) validateData();
    step.value += 1;
  } catch (error) {
    ElMessage.warning(error.message);
  }
}
function back() {
  step.value -= 1;
}
function csv() {
  const esc = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  return `${columns.value.map(esc).join(',')}\n${rows.value.map((row) => columns.value.map((column) => esc(row[column])).join(',')).join('\n')}`;
}
async function createDataset() {
  if (source.value === 'history') return form.value.datasetId;
  const body = new FormData();
  body.append('name', form.value.dataName || `${scenario.value.name}样本`);
  body.append(
    'file',
    source.value === 'upload' ? uploadFile.value : new Blob([csv()], { type: 'text/csv' }),
    source.value === 'upload' ? uploadFile.value.name : 'manual.csv'
  );
  return (await api(`/api/scenarios/${scenario.value.key}/datasets`, { method: 'POST', body })).id;
}
async function run() {
  loading.value = true;
  try {
    validateData();
    const id = requiresDataset.value ? await createDataset() : '';
    const result = await api('/api/runs', {
      method: 'POST',
      body: JSON.stringify({
        scenarioId: scenario.value.id,
        ...(id ? { datasetId: id } : {}),
        environment: form.value.environment,
        executionLocation: 'server',
        executionMode: form.value.executionMode
      })
    });
    visible.value = false;
    emit('started', result);
    ElMessage.success('执行任务已创建');
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') ElMessage.error(error.message || error);
  } finally {
    loading.value = false;
  }
}
defineExpose({ open });
</script>
