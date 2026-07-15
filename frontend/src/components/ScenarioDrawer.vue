<template>
  <el-drawer v-model="visible" size="min(860px, 96%)">
    <template #header>
      <div>
        <h2>{{ scenario?.name }}</h2>
        <span class="muted">维护测试数据、脚本与录制</span>
      </div>
    </template>

    <el-tabs v-model="tab">
      <el-tab-pane label="基本信息" name="base">
        <div class="drawer-actions">
          <el-button type="primary" @click="formRef.open(scenario)">编辑基本信息</el-button>
        </div>
        <el-descriptions border :column="1">
          <el-descriptions-item label="场景 key">{{ scenario?.key }}</el-descriptions-item>
          <el-descriptions-item label="应用 / 模块">
            {{ store.appName(scenario?.appId) }} / {{ store.moduleName(scenario?.moduleId) }}
          </el-descriptions-item>
          <el-descriptions-item label="优先级">{{ scenario?.priority }}</el-descriptions-item>
          <el-descriptions-item label="说明">{{ scenario?.description || '-' }}</el-descriptions-item>
          <el-descriptions-item label="脚本入口">
            <el-text tag="code">{{ scenario?.scriptEntry || '尚未绑定' }}</el-text>
          </el-descriptions-item>
          <el-descriptions-item label="负责人">{{ scenario?.owner || '-' }}</el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>

      <el-tab-pane label="测试数据" name="data">
        <div class="dataset-toolbar">
          <el-select v-model="selectedDatasetId" clearable placeholder="加载已保存数据" @change="loadDataset">
            <el-option v-for="item in datasets" :key="item.id" :label="`${item.name}（${item.rowCount} 行）`" :value="item.id" />
          </el-select>
          <el-input v-model="datasetName" placeholder="数据集名称" />
          <el-button :icon="Plus" @click="resetDataRows">新建空白</el-button>
        </div>

        <div class="data-entry-toolbar">
          <el-button :icon="Download" @click="downloadDataTemplate">下载 Excel 模板</el-button>
          <el-upload ref="uploadRef" :auto-upload="false" :show-file-list="false" accept=".csv,.xlsx" :on-change="previewDataFile">
            <el-button :icon="Upload" :loading="dataLoading">导入 Excel / CSV</el-button>
          </el-upload>
          <el-button :loading="dataGenerating" @click="generate(false)">自动生成</el-button>
          <el-button :loading="dataGenerating" @click="openAiGeneration">AI 生成</el-button>
          <el-button :icon="Plus" @click="addDataRow">增加一行</el-button>
        </div>

        <el-table v-loading="dataLoading" :data="dataRows" border max-height="430" class="editable-grid" empty-text="暂无数据，请增加一行、导入文件或自动生成">
          <el-table-column type="index" width="52" />
          <el-table-column v-for="column in dataColumns" :key="column" :label="column" min-width="140">
            <template #header>
              {{ column }}<span v-if="requiredColumns.has(column)" class="required"> *</span>
            </template>
            <template #default="{ row }">
              <el-input v-model="row[column]" :placeholder="requiredColumns.has(column) ? '必填' : '请输入'" @input="markDataChanged" />
            </template>
          </el-table-column>
          <el-table-column width="58" fixed="right">
            <template #default="scope">
              <el-button link type="danger" :icon="Delete" title="删除此行" aria-label="删除此行" @click="removeDataRow(scope.$index)" />
            </template>
          </el-table-column>
        </el-table>

        <div class="data-save-actions">
          <el-text type="info">{{ dataRows.length }} 行</el-text>
          <el-button type="primary" :icon="DocumentChecked" :loading="dataSaving" :disabled="!dataRows.length" @click="saveManualDataset">保存数据</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="脚本与录制" name="record">
        <section class="script-section" v-loading="scriptLoading">
          <div class="section-header">
            <div class="section-title">
              <strong>测试脚本</strong>
              <el-text class="script-entry" truncated>{{ scenario?.scriptEntry || '尚未绑定脚本' }}</el-text>
            </div>
            <div class="drawer-actions">
              <el-upload ref="scriptUploadRef" :auto-upload="false" :limit="1" accept=".js,.mjs,.cjs" :on-change="selectScriptFile" :on-remove="clearScriptFile">
                <el-button :icon="Upload">选择脚本</el-button>
              </el-upload>
              <el-button type="primary" :icon="Upload" :loading="scriptUploading" :disabled="!scriptUploadFile" @click="uploadScript">上传并绑定</el-button>
            </div>
          </div>

          <el-form label-position="top" class="script-form">
            <el-form-item label="文件名">
              <el-input v-model="scriptFileName" placeholder="scenario.spec.js" />
            </el-form-item>
            <el-form-item label="脚本源码">
              <el-input v-model="scriptSource" class="script-editor" type="textarea" :rows="18" resize="vertical" spellcheck="false" placeholder="输入 Playwright 测试脚本" />
            </el-form-item>
          </el-form>

          <div class="editor-actions">
            <el-button :icon="Refresh" :disabled="!scenario?.scriptEntry" @click="loadScript">重新加载</el-button>
            <el-button type="primary" :icon="DocumentChecked" :loading="scriptSaving" :disabled="!scriptSource.trim() || !scriptFileName.trim()" @click="saveScript">保存脚本</el-button>
          </div>
        </section>

        <el-divider content-position="left">本地录制</el-divider>
        <el-alert title="推荐使用录制快速创建脚本，再补充业务断言。" type="info" show-icon />
        <el-form label-position="top" class="record-form">
          <el-form-item label="录制环境">
            <el-select v-model="environment" class="wide">
              <el-option v-for="env in store.environments" :key="env.key" :label="env.name" :value="env.key" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" :icon="VideoCamera" :loading="recordLoading" @click="startRecord">开始录制</el-button>
        <div v-if="recording" class="record-command">
          <strong>录制状态：{{ recordStatus }}</strong>
          <div v-if="recording.recordCode">
            <el-text tag="code" size="large">{{ recording.recordCode }}</el-text>
            <p>录制码有效期：{{ formatDate(recording.recordCodeExpires) }}</p>
            <div class="drawer-actions">
              <el-button type="primary" @click="copyRecordCode">复制录制码</el-button>
              <el-button @click="downloadRecorder">下载免安装录制器</el-button>
            </div>
          </div>
          <p v-if="recording.status !== 'finished'">在免安装录制器中输入录制码；关闭 Inspector 后脚本会自动上传并绑定。</p>
          <p v-else>脚本已绑定：{{ recording.scriptEntry }}</p>
          <el-button :loading="recordLoading" @click="refresh">刷新状态</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="aiDialogVisible" title="AI 生成测试数据" width="min(560px, 92vw)" append-to-body>
      <el-form label-position="top">
        <el-form-item label="当前场景">
          <el-input :model-value="scenario?.name" disabled />
        </el-form-item>
        <el-form-item label="生成条数">
          <el-input-number v-model="aiConfig.count" :min="1" :max="20" />
        </el-form-item>
        <el-form-item label="生成规则">
          <el-input v-model="aiConfig.rules" type="textarea" :rows="5" maxlength="2000" show-word-limit placeholder="例如：客户编号以 QA- 开头，地址覆盖上海和苏州，名称不要重复" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="aiDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="dataGenerating" @click="confirmAiGeneration">生成并插入表格</el-button>
      </template>
    </el-dialog>

    <ScenarioFormDialog ref="formRef" @saved="scenarioSaved" />
  </el-drawer>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Delete, DocumentChecked, Download, Plus, Refresh, Upload, VideoCamera } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { api } from '../api';
import { usePlatformStore } from '../stores/platform';
import ScenarioFormDialog from './ScenarioFormDialog.vue';

const emit = defineEmits(['changed']);
const store = usePlatformStore();
const visible = ref(false);
const scenario = ref();
const tab = ref('base');
const datasets = ref([]);
const selectedDatasetId = ref('');
const dataRows = ref([]);
const recording = ref();
const environment = ref('test');
const datasetName = ref('');
const uploadRef = ref();
const dataLoading = ref(false);
const dataSaving = ref(false);
const dataGenerating = ref(false);
const aiDialogVisible = ref(false);
const aiConfig = ref({ count: 3, rules: '' });
const recordLoading = ref(false);
const formRef = ref();
const scriptSource = ref('');
const scriptFileName = ref('');
const scriptLoading = ref(false);
const scriptSaving = ref(false);
const scriptUploading = ref(false);
const scriptUploadFile = ref(null);
const scriptUploadRef = ref();

const recordStatus = computed(() => recording.value?.status === 'finished' ? '已完成并绑定' : '录制中');
const dataColumns = computed(() => scenario.value?.dataSchema?.columns || []);
const requiredColumns = computed(() => new Set(scenario.value?.dataSchema?.required || []));

function blankDataRow() {
  return Object.fromEntries(dataColumns.value.map((column) => [
    column,
    scenario.value?.dataSchema?.example?.[column] || ''
  ]));
}

async function loadDatasets() {
  datasets.value = await api(`/api/scenarios/${scenario.value.key}/datasets`);
}

async function loadDataset(datasetId) {
  if (!datasetId) return resetDataRows();
  dataLoading.value = true;
  try {
    const result = await api(`/api/scenarios/${scenario.value.key}/datasets/${datasetId}`);
    selectedDatasetId.value = result.id;
    datasetName.value = result.name;
    dataRows.value = result.rows || [];
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    dataLoading.value = false;
  }
}

async function loadScript(showMessage = true) {
  if (!scenario.value?.scriptEntry) {
    scriptSource.value = '';
    scriptFileName.value = `${scenario.value.key}.spec.js`;
    return;
  }
  scriptLoading.value = true;
  try {
    const result = await api(`/api/scenarios/${scenario.value.key}/script`);
    scriptSource.value = result.content;
    scriptFileName.value = result.fileName;
    if (showMessage) ElMessage.success('脚本已重新加载');
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    scriptLoading.value = false;
  }
}

async function open(item) {
  scenario.value = item;
  tab.value = 'base';
  recording.value = null;
  selectedDatasetId.value = '';
  dataRows.value = [];
  scriptUploadFile.value = null;
  scriptSource.value = '';
  scriptFileName.value = `${item.key}.spec.js`;
  datasetName.value = `${item.name}数据`;
  try {
    await Promise.all([loadDatasets(), loadScript(false)]);
    if (datasets.value.length) await loadDataset(datasets.value[0].id);
    else resetDataRows();
    environment.value = store.environments.find((entry) => entry.isDefault)?.key || 'test';
    visible.value = true;
  } catch (error) {
    ElMessage.error(error.message);
  }
}

async function generate(useLlm, options = {}) {
  dataGenerating.value = true;
  try {
    const result = await api(`/api/scenarios/${scenario.value.key}/sample-data`, {
      method: 'POST',
      body: JSON.stringify({ count: options.count || 3, offset: dataRows.value.length, rules: options.rules || '', useLlm })
    });
    selectedDatasetId.value = '';
    dataRows.value.push(...(result.rows || []));
    if (useLlm && result.source !== 'llm') ElMessage.warning(`大模型不可用，已降级自动生成：${result.fallbackReason || '未知原因'}`);
    else ElMessage.success(useLlm ? 'AI 数据已插入表格' : '自动生成数据已插入表格');
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    dataGenerating.value = false;
  }
}

function openAiGeneration() {
  aiConfig.value = { count: 3, rules: '' };
  aiDialogVisible.value = true;
}

async function confirmAiGeneration() {
  await generate(true, aiConfig.value);
  aiDialogVisible.value = false;
}

function downloadDataTemplate() {
  window.open(`/api/scenarios/${scenario.value.key}/template.xlsx`, '_blank', 'noopener');
}

function markDataChanged() {
  selectedDatasetId.value = '';
}

function addDataRow() {
  markDataChanged();
  dataRows.value.push(blankDataRow());
}

function removeDataRow(index) {
  if (dataRows.value.length === 1) return ElMessage.warning('至少保留一行数据');
  markDataChanged();
  dataRows.value.splice(index, 1);
}

function resetDataRows() {
  selectedDatasetId.value = '';
  datasetName.value = `${scenario.value.name}数据`;
  dataRows.value = [blankDataRow()];
}

async function previewDataFile(file) {
  const body = new FormData();
  body.append('file', file.raw);
  dataLoading.value = true;
  try {
    const result = await api(`/api/scenarios/${scenario.value.key}/datasets/preview`, { method: 'POST', body });
    selectedDatasetId.value = '';
    dataRows.value.push(...(result.rows || []));
    ElMessage.success(`已向表格插入 ${result.rows?.length || 0} 行数据`);
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    uploadRef.value?.clearFiles();
    dataLoading.value = false;
  }
}

function validateDataRows() {
  if (!dataRows.value.length) throw new Error('请至少填写一行数据');
  for (const [index, row] of dataRows.value.entries()) {
    for (const field of requiredColumns.value) {
      if (!String(row[field] ?? '').trim()) throw new Error(`第 ${index + 1} 行的“${field}”为必填项`);
    }
  }
}

function dataRowsCsv() {
  const escapeCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  return `${dataColumns.value.map(escapeCell).join(',')}\n${dataRows.value.map((row) => dataColumns.value.map((column) => escapeCell(row[column])).join(',')).join('\n')}`;
}

async function saveManualDataset() {
  dataSaving.value = true;
  try {
    validateDataRows();
    const body = new FormData();
    body.append('name', datasetName.value.trim() || `${scenario.value.name}数据`);
    body.append('file', new Blob([dataRowsCsv()], { type: 'text/csv' }), 'manual.csv');
    const saved = await api(`/api/scenarios/${scenario.value.key}/datasets`, { method: 'POST', body });
    await loadDatasets();
    selectedDatasetId.value = saved.id;
    emit('changed');
    ElMessage.success('测试数据已保存');
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    dataSaving.value = false;
  }
}

function selectScriptFile(file) {
  scriptUploadFile.value = file.raw;
}

function clearScriptFile() {
  scriptUploadFile.value = null;
}

async function uploadScript() {
  const body = new FormData();
  body.append('file', scriptUploadFile.value);
  scriptUploading.value = true;
  try {
    const result = await api(`/api/scenarios/${scenario.value.key}/script`, { method: 'POST', body });
    scenario.value = { ...scenario.value, scriptEntry: result.scriptEntry };
    scriptUploadRef.value.clearFiles();
    scriptUploadFile.value = null;
    await loadScript(false);
    emit('changed');
    ElMessage.success('脚本上传并绑定成功');
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    scriptUploading.value = false;
  }
}

async function saveScript() {
  scriptSaving.value = true;
  try {
    const result = await api(`/api/scenarios/${scenario.value.key}/script`, {
      method: 'PUT',
      body: JSON.stringify({ fileName: scriptFileName.value.trim(), content: scriptSource.value })
    });
    scriptFileName.value = result.fileName;
    scenario.value = { ...scenario.value, scriptEntry: result.scriptEntry };
    emit('changed');
    ElMessage.success('脚本保存成功');
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    scriptSaving.value = false;
  }
}

async function startRecord() {
  recordLoading.value = true;
  try {
    recording.value = await api('/api/recordings/start', { method: 'POST', body: JSON.stringify({ scenarioKey: scenario.value.key, environmentKey: environment.value }) });
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    recordLoading.value = false;
  }
}

async function copyRecordCode() {
  await navigator.clipboard.writeText(recording.value.recordCode);
  ElMessage.success('录制码已复制');
}

function downloadRecorder() {
  window.open(recording.value.recorderDownloadUrl, '_blank', 'noopener');
}

function formatDate(value) {
  return value ? new Date(value).toLocaleString('zh-CN', { hour12: false }) : '-';
}

async function refresh() {
  recordLoading.value = true;
  try {
    const result = await api(`/api/recordings/${recording.value.id}`);
    recording.value = { ...recording.value, ...result };
    if (result.status === 'finished') {
      await syncScenario(result);
      await loadScript(false);
    }
    ElMessage.success('录制状态已刷新');
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    recordLoading.value = false;
  }
}

async function syncScenario(result) {
  if (result.scenario) scenario.value = { ...scenario.value, ...result.scenario };
  else if (result.scriptEntry) scenario.value = { ...scenario.value, scriptEntry: result.scriptEntry };
  emit('changed');
}

function scenarioSaved(result) {
  scenario.value = { ...scenario.value, ...result };
  emit('changed');
}

defineExpose({ open });
</script>

<style scoped>
.drawer-actions { display: flex; align-items: flex-start; gap: 10px; flex-wrap: wrap; }
.dataset-toolbar { display: grid; grid-template-columns: minmax(220px, 1fr) minmax(220px, 1fr) auto; gap: 10px; margin-bottom: 12px; }
.dataset-toolbar .el-select { width: 100%; }
.data-entry-toolbar { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
.data-save-actions { display: flex; align-items: center; justify-content: flex-end; gap: 14px; margin-top: 14px; }
.required { color: var(--el-color-danger); }
.script-section { min-height: 430px; }
.section-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
.section-title { display: flex; min-width: 0; flex: 1; flex-direction: column; gap: 6px; }
.script-entry { display: block; max-width: 420px; }
.script-form :deep(.el-form-item:last-child) { margin-bottom: 12px; }
.script-editor :deep(textarea) { min-height: 320px; font-family: Consolas, "Courier New", monospace; font-size: 13px; line-height: 1.55; tab-size: 2; }
.editor-actions { display: flex; justify-content: flex-end; gap: 10px; }
.record-form { margin-top: 16px; max-width: 420px; }
@media (max-width: 700px) {
  .section-header { flex-direction: column; }
  .dataset-toolbar { grid-template-columns: 1fr; }
  .data-entry-toolbar { align-items: stretch; }
  .script-entry { max-width: 84vw; }
  .editor-actions { justify-content: stretch; }
  .editor-actions .el-button { flex: 1; }
}
</style>
