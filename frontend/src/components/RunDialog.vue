<template>
  <el-dialog v-model="visible" width="min(920px, 94vw)" destroy-on-close>
    <template #header>
      <div>
        <h2>{{ t('runDialog.title') }}</h2>
        <span class="muted">{{ scenario?.name }} · {{ requiresDataset ? t('runDialog.subtitleWithData') : t('runDialog.subtitle') }}</span>
      </div>
    </template>
      <el-steps :active="requiresDataset ? step : Math.min(step, 1)" finish-status="success" simple>
      <el-step :title="t('runDialog.stepConfig')" />
      <el-step v-if="requiresDataset" :title="t('runDialog.stepData')" />
      <el-step :title="t('runDialog.stepConfirm')" />
    </el-steps>
    <div class="dialog-body" v-loading="loading">
      <template v-if="step === 0">
        <el-form label-position="top" class="config-grid">
          <el-form-item :label="t('runDialog.executionEnvironment')">
            <el-select v-model="form.environment" @change="loadPreflight">
              <el-option v-for="env in store.environments" :key="env.key" :label="env.name" :value="env.key" />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('runDialog.executionMode')">
            <el-radio-group v-model="form.executionMode">
              <el-radio-button value="ui">{{ t('executionMode.ui') }}</el-radio-button>
              <el-radio-button value="headed">{{ t('executionMode.headedFull') }}</el-radio-button>
              <el-radio-button value="headless">{{ t('executionMode.headlessFull') }}</el-radio-button>
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
              <span>{{ check.ready ? t('runDialog.ready') : check.action }}</span>
            </div>
          </div>
        </div>
        <el-alert
          v-if="blockingChecks.length"
          :title="t('runDialog.fixFirst', { actions: blockingChecks.map((item) => item.action).join(t('common.listSeparator')) })"
          type="warning"
          show-icon
          :closable="false"
        />
      </template>
      <template v-else-if="step === 1 && requiresDataset">
        <el-tabs v-model="source">
          <el-tab-pane :label="t('runDialog.tabHistory')" name="history">
            <el-select v-model="form.datasetId" class="wide" :placeholder="t('runDialog.selectHistoryData')">
              <el-option
                v-for="item in datasets"
                :key="item.id"
                :label="formatDatasetLabel(item)"
                :value="item.id"
              />
            </el-select>
            <el-empty v-if="!datasets.length" :description="t('runDialog.historyEmpty')" />
          </el-tab-pane>
          <el-tab-pane :label="t('runDialog.tabUpload')" name="upload">
            <el-input v-model="form.dataName" :placeholder="t('scenarioDrawer.datasetName')" />
            <el-upload drag :auto-upload="false" :limit="1" accept=".json,.csv,.xlsx" :on-change="(file) => (uploadFile = file.raw)">
              <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
              <div>{{ t('runDialog.uploadHint') }}</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane :label="t('runDialog.tabManual')" name="manual">
            <div class="data-toolbar">
              <el-input v-model="form.dataName" :placeholder="t('scenarioDrawer.datasetName')" />
              <el-button @click="addRow">{{ t('scenarioDrawer.addRow') }}</el-button>
              <el-button @click="generate(false)">{{ t('runDialog.generateSample') }}</el-button>
              <el-button @click="generate(true)">{{ t('scenarioDrawer.aiGenerate') }}</el-button>
            </div>
            <el-table :data="rows" border max-height="350" class="editable-grid">
              <el-table-column type="index" width="52" />
              <el-table-column v-for="column in columns" :key="column" :label="column" min-width="150">
                <template #header>
                  {{ column }}<span v-if="required.has(column)" class="required"> *</span>
                </template>
                <template #default="scope">
                  <el-input v-model="scope.row[column]" :placeholder="required.has(column) ? t('common.required') : t('common.optionalInput')" />
                </template>
              </el-table-column>
              <el-table-column width="70" fixed="right">
                <template #default="scope">
                  <el-button link type="danger" @click="removeRow(scope.$index)">{{ t('common.remove') }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>
      <template v-else>
        <el-descriptions :column="2" border>
          <el-descriptions-item :label="t('runDialog.scenario')">{{ scenario.name }}</el-descriptions-item>
          <el-descriptions-item :label="t('common.environment')">{{ environmentName }}</el-descriptions-item>
          <el-descriptions-item :label="t('runDialog.executionLocation')">{{ t('runDialog.localMachine') }}</el-descriptions-item>
          <el-descriptions-item :label="t('common.mode')">{{ modeLabel }}</el-descriptions-item>
          <el-descriptions-item :label="t('runDialog.dataSource')">{{ requiresDataset ? sourceLabel : t('runDialog.noTestData') }}</el-descriptions-item>
        </el-descriptions>
        <el-alert
          :title="t('runDialog.afterRunHint')"
          type="info"
          show-icon
          :closable="false"
        />
      </template>
    </div>
    <template #footer>
      <el-button @click="visible = false">{{ t('common.cancel') }}</el-button>
      <el-button v-if="step" @click="back">{{ t('common.back') }}</el-button>
      <el-button v-if="step < confirmStep" type="primary" :disabled="step === 0 && blockingChecks.length > 0" @click="next">{{ t('common.next') }}</el-button>
      <el-button v-else type="primary" :loading="loading" @click="run">{{ t('runDialog.startRun') }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { CircleCheck, Warning, UploadFilled } from '@element-plus/icons-vue';
import { api } from '../api';
import { usePlatformStore } from '../stores/platform';
import { useI18n } from '../i18n';

const emit = defineEmits(['started']);
const store = usePlatformStore();
const { t } = useI18n();
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
const sourceLabel = computed(() => ({
  history: t('runDialog.sourceHistory'),
  upload: t('runDialog.sourceUpload'),
  manual: t('runDialog.sourceManual')
})[source.value]);
const modeLabel = computed(() => ({
  ui: t('executionMode.ui'),
  headed: t('executionMode.headedFull'),
  headless: t('executionMode.headlessFull')
})[form.value.executionMode]);
const blockingChecks = computed(() =>
  (preflight.value.checks || []).filter((item) => !item.ready && !['dataset', 'dependencies'].includes(item.type))
);

function formatDatasetLabel(item) {
  return t('common.datasetRowLabel', { name: item.name, count: item.rowCount || 0 });
}

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
  if (rows.value.length === 1) return ElMessage.warning(t('runDialog.keepOneRow'));
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
    dataName: `${item.name}${t('common.sampleSuffix')}`
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
    ElMessage.success(useLlm ? t('runDialog.aiFilled') : t('runDialog.sampleFilled'));
  } catch (error) {
    ElMessage.error(error.message);
  }
}
function validateData() {
  if (!requiresDataset.value) return;
  if (source.value === 'history' && !form.value.datasetId) throw new Error(t('runDialog.selectHistoryDataset'));
  if (source.value === 'upload' && !uploadFile.value) throw new Error(t('runDialog.selectUploadFile'));
  if (source.value === 'manual') {
    if (!rows.value.length) throw new Error(t('runDialog.needOneRow'));
    for (const [index, row] of rows.value.entries()) {
      for (const field of required.value) {
        if (!String(row[field] ?? '').trim()) throw new Error(t('runDialog.requiredRowField', { row: index + 1, field }));
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
  body.append('name', form.value.dataName || `${scenario.value.name}${t('common.sampleSuffix')}`);
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
    ElMessage.success(t('runDialog.runCreated'));
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') ElMessage.error(error.message || error);
  } finally {
    loading.value = false;
  }
}
defineExpose({ open });
</script>
