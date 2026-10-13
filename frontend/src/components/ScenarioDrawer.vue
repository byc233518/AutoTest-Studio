<template>
  <el-drawer v-model="visible" size="min(1040px, 96%)" :before-close="beforeDrawerClose">
    <template #header>
      <div class="workspace-header">
        <div class="workspace-title"><div><h2>{{ scenario?.name }}</h2><span class="muted">{{ t('scenarioDrawer.subtitle') }}</span></div><el-tag :type="scenario?.status === 'published' ? 'success' : 'warning'">{{ scenarioStatusLabel }}</el-tag></div>
        <div class="workspace-summary">
          <div><span>{{ t('scenarioDrawer.scenarioStatus') }}</span><strong>{{ scenarioStatusLabel }}</strong></div>
          <div><span>{{ t('scenarioDrawer.currentScript') }}</span><strong :title="scenario?.scriptEntry">{{ currentScriptLabel }}</strong></div>
          <div><span>{{ t('scenarioDrawer.fieldCount') }}</span><strong>{{ dataColumns.length }}</strong></div>
          <div><span>{{ t('scenarioDrawer.recentRun') }}</span><strong>{{ recentRunLabel }}</strong></div>
        </div>
        <div class="workspace-actions">
          <el-button type="primary" :disabled="!scenario" @click="runRef.open(scenario)">{{ t('common.execute') }}</el-button>
          <el-button type="success" :disabled="!scenario?.scriptEntry" @click="publishCurrent">{{ t('scenarioDrawer.publishNow') }}</el-button>
        </div>
      </div>
    </template>

    <el-tabs v-model="tab">
      <el-tab-pane :label="t('scenarioDrawer.tabBase')" name="base">
        <div class="drawer-actions">
          <el-button type="primary" @click="formRef.open(scenario)">{{ t('scenarioDrawer.editBase') }}</el-button>
          <el-button @click="openFieldsEditor">{{ t('scenarioDrawer.maintainFields') }}</el-button>
        </div>
        <el-descriptions border :column="1">
          <el-descriptions-item :label="t('scenarioDrawer.scenarioKey')">{{ scenario?.key }}</el-descriptions-item>
          <el-descriptions-item :label="t('scenarioDrawer.belongsDirectory')">{{ scenario?.directory || scenario?.module || uncategorizedLabel() }}</el-descriptions-item>
          <el-descriptions-item :label="t('scenarioDrawer.priority')">{{ scenario?.priority }}</el-descriptions-item>
          <el-descriptions-item :label="t('scenarioDrawer.description')">{{ scenario?.description || '-' }}</el-descriptions-item>
          <el-descriptions-item :label="t('scenarioDrawer.scriptEntry')">
            <el-text tag="code">{{ scenario?.scriptEntry || t('scenarioDrawer.notBound') }}</el-text>
          </el-descriptions-item>
          <el-descriptions-item :label="t('scenarioDrawer.owner')">{{ scenario?.owner || '-' }}</el-descriptions-item>
          <el-descriptions-item :label="t('scenarioDrawer.dataFields')">
            <div v-if="dataColumns.length" class="field-tags">
              <el-tag v-for="column in dataColumns" :key="column" size="small" :type="requiredColumns.has(column) ? 'danger' : 'info'">
                {{ column }}{{ requiredColumns.has(column) ? ' *' : '' }}
              </el-tag>
            </div>
            <span v-else>{{ t('scenarioDrawer.noFieldsHint') }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>

      <el-tab-pane :label="t('scenarioDrawer.tabData')" name="data">
        <el-alert
          v-if="!dataColumns.length"
          :title="t('scenarioDrawer.noFieldsAlert')"
          type="info"
          show-icon
          :closable="false"
          class="data-optional-alert"
        />
        <div class="dataset-toolbar">
          <el-select v-model="selectedDatasetId" clearable :placeholder="t('scenarioDrawer.loadSavedData')" @change="loadDataset">
            <el-option v-for="item in datasets" :key="item.id" :label="formatDatasetLabel(item)" :value="item.id" />
          </el-select>
          <el-input v-model="datasetName" :placeholder="t('scenarioDrawer.datasetName')" />
          <el-button :icon="Plus" @click="resetDataRows">{{ t('scenarioDrawer.newBlank') }}</el-button>
        </div>

        <div class="field-schema-bar">
          <div>
            <strong>{{ t('scenarioDrawer.dataFields') }}</strong>
            <el-text type="info">{{ t('scenarioDrawer.fieldsSummary', { count: dataColumns.length }) }}</el-text>
          </div>
          <el-button type="primary" plain @click="openFieldsEditor">{{ t('scenarioDrawer.maintainFieldsShort') }}</el-button>
        </div>

        <div class="data-entry-toolbar">
          <el-button :icon="Download" @click="downloadDataTemplate">{{ t('scenarioDrawer.downloadTemplate') }}</el-button>
          <el-upload ref="uploadRef" :auto-upload="false" :show-file-list="false" accept=".json,.csv,.xlsx" :on-change="previewDataFile">
            <el-button :icon="Upload" :loading="dataLoading">{{ t('scenarioDrawer.importData') }}</el-button>
          </el-upload>
          <el-button :loading="dataGenerating" @click="generate(false)">{{ t('scenarioDrawer.autoGenerate') }}</el-button>
          <el-button :loading="dataGenerating" @click="openAiGeneration">{{ t('scenarioDrawer.aiGenerate') }}</el-button>
          <el-button :icon="Plus" @click="addDataRow">{{ t('scenarioDrawer.addRow') }}</el-button>
          <el-button @click="migrationRef?.open()">{{ t('scenarioDrawer.fieldMigration') }}</el-button>
        </div>

        <el-table v-loading="dataLoading" :data="dataRows" border max-height="430" class="editable-grid" :empty-text="t('scenarioDrawer.dataEmpty')">
          <el-table-column type="index" width="52" />
          <el-table-column v-if="!dataColumns.length" :label="t('scenarioDrawer.colField')" min-width="220">
            <template #default>
              <el-button link type="primary" @click="openFieldsEditor">{{ t('scenarioDrawer.setupFieldsFirst') }}</el-button>
            </template>
          </el-table-column>
          <el-table-column v-for="column in dataColumns" :key="column" :label="column" min-width="140">
            <template #header>
              {{ column }}<span v-if="requiredColumns.has(column)" class="required"> *</span>
            </template>
            <template #default="{ row }">
              <el-input v-model="row[column]" :placeholder="requiredColumns.has(column) ? t('common.required') : t('common.optionalInput')" @input="markDataChanged" />
            </template>
          </el-table-column>
          <el-table-column width="58" fixed="right">
            <template #default="scope">
              <el-button link type="danger" :icon="Delete" :title="t('scenarioDrawer.deleteRow')" :aria-label="t('scenarioDrawer.deleteRow')" @click="removeDataRow(scope.$index)" />
            </template>
          </el-table-column>
        </el-table>

        <div class="data-save-actions">
          <el-text type="info">{{ t('common.rowsCount', { count: dataRows.length }) }}</el-text>
          <el-button type="primary" :icon="DocumentChecked" :loading="dataSaving" :disabled="!dataRows.length" @click="saveManualDataset">{{ t('scenarioDrawer.saveData') }}</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="t('scenarioDrawer.tabScript')" name="record">
        <section class="script-section" v-loading="scriptLoading">
          <div class="section-header">
            <div class="section-title">
              <div class="script-title-line"><strong>{{ t('scenarioDrawer.testScript') }}</strong><el-tag v-if="scriptDirty" type="warning" effect="plain">{{ t('scenarioDrawer.unsaved') }}</el-tag></div>
              <el-text class="script-entry" truncated>{{ scenario?.scriptEntry || t('scenarioDrawer.notBoundScript') }}</el-text>
            </div>
            <div class="drawer-actions">
              <el-upload ref="scriptUploadRef" :auto-upload="false" :limit="1" accept=".js,.mjs,.cjs" :on-change="selectScriptFile" :on-remove="clearScriptFile">
                <el-button :icon="Upload">{{ t('scenarioDrawer.chooseScript') }}</el-button>
              </el-upload>
              <el-button type="primary" :icon="Upload" :loading="scriptUploading" :disabled="!scriptUploadFile" @click="uploadScript">{{ t('scenarioDrawer.uploadBind') }}</el-button>
            </div>
          </div>

          <el-form label-position="top" class="script-form">
            <el-form-item :label="t('scenarioDrawer.fileName')">
              <el-input v-model="scriptFileName" placeholder="scenario.spec.js" />
            </el-form-item>
            <el-form-item :label="t('scenarioDrawer.scriptSource')">
              <ScriptEditor v-model="scriptSource" :readonly="scriptLoading || scriptSaving" :errors="scriptErrors" />
            </el-form-item>
          </el-form>

          <div class="editor-actions">
            <el-button :icon="Refresh" :disabled="!scenario?.scriptEntry" @click="reloadScript">{{ t('scenarioDrawer.reloadScript') }}</el-button>
            <el-button type="primary" :icon="DocumentChecked" :loading="scriptSaving" :disabled="!scriptSource.trim() || !scriptFileName.trim()" @click="saveScript">{{ t('scenarioDrawer.saveScript') }}</el-button>
            <el-button :disabled="!scenario?.scriptEntry" @click="schemaRef?.open()">{{ t('scenarioDrawer.schemaSync') }}</el-button>
            <el-button :disabled="!scenario?.scriptEntry" @click="comparePublished">{{ t('scenarioDrawer.comparePublished') }}</el-button>
          </div>
        </section>

        <el-divider content-position="left">{{ t('scenarioDrawer.recordingSection') }}</el-divider>
        <el-alert :title="t('scenarioDrawer.recordingTip')" type="info" show-icon />
        <el-form label-position="top" class="record-form">
          <el-form-item :label="t('scenarioDrawer.recordEnvironment')">
            <el-select v-model="environment" class="wide">
              <el-option v-for="env in store.environments" :key="env.key" :label="env.name" :value="env.key" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" :icon="VideoCamera" :loading="recordLoading" @click="startRecord">{{ t('scenarioDrawer.startRecord') }}</el-button>
        <div v-if="recording" class="record-command">
          <strong>{{ t('scenarioDrawer.recordStatusLabel', { status: recordStatus }) }}</strong>
          <p v-if="recording.status === 'failed'" class="error-text">{{ recording.error || t('scenarioDrawer.recordFailed') }}</p>
          <p v-else-if="recording.status !== 'finished' && recording.status !== 'draft'">{{ t('scenarioDrawer.recordWindowOpen') }}</p>
          <p v-else>{{ t('scenarioDrawer.scriptUploaded', { entry: recording.scriptEntry || t('scenarioDrawer.awaitingReview') }) }}</p>
          <el-button :loading="recordLoading" @click="refresh">{{ t('scenarioDrawer.refreshStatus') }}</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="t('scenarioDrawer.tabReleases')" name="releases">
        <ScenarioReleases ref="releaseRef" :scenario-key="scenario?.key" :current-script="scriptSource" :current-scenario="scenario" :before-change="guardReleaseChange" @published="scenarioSaved" @restored="scenarioRestored" />
      </el-tab-pane>

      <el-tab-pane :label="t('scenarioDrawer.tabRuns')" name="runs">
        <div class="runs-toolbar"><strong>{{ t('scenarioDrawer.tabRuns') }}</strong><el-button @click="store.loadRuns">{{ t('scenarioDrawer.refreshRuns') }}</el-button></div>
        <el-table :data="scenarioRuns" border max-height="420" :empty-text="t('scenarioDrawer.runsEmpty')">
          <el-table-column prop="runId" :label="t('scenarioDrawer.colTask')" min-width="180" />
          <el-table-column prop="status" :label="t('common.status')" width="110" />
          <el-table-column prop="executionLocation" :label="t('scenarioDrawer.executionLocation')" width="130" />
          <el-table-column prop="startedAt" :label="t('scenarioDrawer.startedAt')" min-width="180" />
          <el-table-column :label="t('scenarioDrawer.reportEvidence')" width="150" fixed="right"><template #default="{ row }"><el-button link type="primary" @click="runDetailRef.open(row)">{{ t('scenarioDrawer.viewReportEvidence') }}</el-button></template></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="aiDialogVisible" :title="t('scenarioDrawer.aiDialogTitle')" width="min(560px, 92vw)" append-to-body>
      <el-form label-position="top">
        <el-form-item :label="t('scenarioDrawer.currentScenario')">
          <el-input :model-value="scenario?.name" disabled />
        </el-form-item>
        <el-form-item :label="t('scenarioDrawer.generateCount')">
          <el-input-number v-model="aiConfig.count" :min="1" :max="20" />
        </el-form-item>
        <el-form-item :label="t('scenarioDrawer.generateRules')">
          <el-input v-model="aiConfig.rules" type="textarea" :rows="5" maxlength="2000" show-word-limit :placeholder="t('scenarioDrawer.aiRulesPlaceholder')" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="aiDialogVisible = false">{{ t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="dataGenerating" @click="confirmAiGeneration">{{ t('scenarioDrawer.generateInsert') }}</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="fieldsEditorVisible" :title="t('scenarioDrawer.fieldsDialogTitle')" width="min(720px, 94vw)" append-to-body destroy-on-close>
      <el-alert
        :title="t('scenarioDrawer.fieldsDialogAlert')"
        type="info"
        :closable="false"
        show-icon
        class="fields-editor-alert"
      />
      <el-table :data="editingFields" border max-height="360" size="small" :empty-text="t('scenarioDrawer.fieldsEmpty')">
        <el-table-column :label="t('scenarioDrawer.fieldName')" min-width="180">
          <template #default="{ row }"><el-input v-model="row.name" :placeholder="t('scenarioDrawer.fieldNamePlaceholder')" /></template>
        </el-table-column>
        <el-table-column :label="t('common.required')" width="72" align="center">
          <template #default="{ row }"><el-checkbox v-model="row.required" /></template>
        </el-table-column>
        <el-table-column :label="t('scenarioDrawer.exampleValue')" min-width="220">
          <template #default="{ row }"><el-input v-model="row.example" :placeholder="t('scenarioDrawer.examplePlaceholder')" /></template>
        </el-table-column>
        <el-table-column width="64" align="center">
          <template #default="scope">
            <el-button link type="danger" @click="editingFields.splice(scope.$index, 1)">{{ t('common.remove') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="add-field" :icon="Plus" @click="editingFields.push({ name: '', previousName: '', required: false, example: '' })">
        {{ t('scenarioDrawer.addField') }}
      </el-button>
      <template #footer>
        <el-button @click="fieldsEditorVisible = false">{{ t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="fieldsSaving" @click="saveFields">{{ t('scenarioDrawer.saveFields') }}</el-button>
      </template>
    </el-dialog>

    <ScenarioFormDialog ref="formRef" @saved="scenarioSaved" />
    <RecordingReviewDialog v-model="reviewVisible" :recording="reviewRecording" @applied="reviewApplied" />
    <SchemaSyncDialog ref="schemaRef" v-model="schemaVisible" :scenario-key="scenario?.key" @synced="schemaSynced" @migration-required="schemaMigrationRequired" />
    <DatasetMigrationDialog ref="migrationRef" v-model="migrationVisible" :scenario-key="scenario?.key" :scenario-schema="scenario?.dataSchema" :datasets="datasets" @migrated="datasetsMigrated" />
    <RunDialog ref="runRef" @started="handleRunStarted" />
    <RunDetailDrawer ref="runDetailRef" />
  </el-drawer>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Delete, DocumentChecked, Download, Plus, Refresh, Upload, VideoCamera } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { api } from '../api';
import { useI18n } from '../i18n';
import { usePlatformStore } from '../stores/platform';
import ScenarioFormDialog from './ScenarioFormDialog.vue';
import ScriptEditor from './ScriptEditor.vue';
import RecordingReviewDialog from './RecordingReviewDialog.vue';
import SchemaSyncDialog from './SchemaSyncDialog.vue';
import DatasetMigrationDialog from './DatasetMigrationDialog.vue';
import ScenarioReleases from './ScenarioReleases.vue';
import RunDialog from './RunDialog.vue';
import RunDetailDrawer from './RunDetailDrawer.vue';

const { t, locale } = useI18n();
const emit = defineEmits(['changed']);
const store = usePlatformStore();
const isDesktop = Boolean(window.autotestDesktop);
const visible = ref(false);
const scenario = ref();
const tab = ref('base');
const datasets = ref([]);
const selectedDatasetId = ref('');
const dataRows = ref([]);
const recording = ref();
const environment = ref('');
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
const savedScriptSource = ref('');
const scriptErrors = ref([]);
const reviewVisible = ref(false);
const reviewRecording = ref(null);
const schemaVisible = ref(false);
const migrationVisible = ref(false);
const fieldsEditorVisible = ref(false);
const fieldsSaving = ref(false);
const editingFields = ref([]);
const reviewOpenedFor = ref('');
const schemaRef = ref();
const migrationRef = ref();
const releaseRef = ref();
const runRef = ref();
const runDetailRef = ref();
let recordTimer;
let recordRequestGeneration = 0;

const recordStatus = computed(() => {
  const status = recording.value?.status;
  if (status === 'failed') return t('scenarioDrawer.recordStatus.failed');
  if (status === 'finished' || status === 'draft') return t('scenarioDrawer.recordStatus.finished');
  if (status && status !== 'recording') return t('scenarioDrawer.recordStatus.recording');
  return t('scenarioDrawer.recordStatus.recording');
});
const dataColumns = computed(() => scenario.value?.dataSchema?.columns || []);
const requiredColumns = computed(() => new Set(scenario.value?.dataSchema?.required || []));
const scenarioRuns = computed(() => store.runs.filter((run) => run.scenarioId === scenario.value?.id || run.scenarioKey === scenario.value?.key));
const scriptDirty = computed(() => scriptSource.value !== savedScriptSource.value);
const scenarioStatusLabel = computed(() => scenario.value?.status === 'published' ? t('scenarioDrawer.published') : t('status.draft'));
const currentScriptLabel = computed(() => scenario.value?.scriptEntry?.split(/[\\/]/).pop() || t('scenarioDrawer.notBound'));
const recentRun = computed(() => scenarioRuns.value[0]);
function runStatusLabel(status) {
  if (!status) return t('scenarioDrawer.noRecentRun');
  const key = `status.${status}`;
  const label = t(key);
  return label !== key ? label : status;
}
const recentRunLabel = computed(() => runStatusLabel(recentRun.value?.status));
function formatDatasetLabel(item) {
  return t('common.datasetRowLabel', { name: item.name, count: item.rowCount || 0 });
}
function uncategorizedLabel() {
  return t('scenarios.uncategorized');
}

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

async function loadScript(showMessage = true, isCurrent = () => true) {
  const scenarioKey = scenario.value?.key;
  if (!scenario.value?.scriptEntry) {
    if (!isCurrent()) return false;
    scriptSource.value = '';
    savedScriptSource.value = '';
    scriptErrors.value = [];
    scriptFileName.value = `${scenarioKey}.spec.js`;
    return true;
  }
  scriptLoading.value = true;
  try {
    const result = await api(`/api/scenarios/${scenarioKey}/script`);
    if (!isCurrent()) return false;
    scriptSource.value = result.content;
    savedScriptSource.value = result.content;
    scriptErrors.value = [];
    scriptFileName.value = result.fileName;
    if (showMessage) ElMessage.success(t('scenarioDrawer.scriptReloaded'));
    return true;
  } catch (error) {
    if (isCurrent()) ElMessage.error(error.message);
    return false;
  } finally {
    if (isCurrent()) scriptLoading.value = false;
  }
}

async function reloadScript() {
  if (scriptDirty.value) {
    try { await ElMessageBox.confirm(t('scenarioDrawer.reloadConfirm'), t('scenarioDrawer.reloadTitle'), { type: 'warning' }); }
    catch { return; }
  }
  await loadScript(true);
}

async function open(item) {
  stopRecordPolling();
  scenario.value = item;
  tab.value = 'base';
  recording.value = null;
  reviewRecording.value = null;
  reviewVisible.value = false;
  reviewOpenedFor.value = '';
  selectedDatasetId.value = '';
  dataRows.value = [];
  scriptUploadFile.value = null;
  scriptSource.value = '';
  savedScriptSource.value = '';
  scriptErrors.value = [];
  scriptFileName.value = `${item.key}.spec.js`;
  datasetName.value = `${item.name}${t('common.datasetSuffix')}`;
  try {
    await Promise.all([loadDatasets(), loadScript(false)]);
    if (datasets.value.length) await loadDataset(datasets.value[0].id);
    else resetDataRows();
    environment.value = store.environments.find((entry) => entry.isDefault)?.key || store.environments[0]?.key || '';
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
    if (useLlm && result.source !== 'llm') ElMessage.warning(t('scenarioDrawer.llmFallback', { reason: result.fallbackReason || t('common.unknownReason') }));
    else ElMessage.success(useLlm ? t('scenarioDrawer.aiDataInserted') : t('scenarioDrawer.autoDataInserted'));
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

function openFieldsEditor() {
  const schema = scenario.value?.dataSchema || { columns: [], required: [], example: {} };
  editingFields.value = (schema.columns || []).map((name) => ({
    name,
    previousName: name,
    required: (schema.required || []).includes(name),
    example: schema.example?.[name] ?? ''
  }));
  if (!editingFields.value.length) {
    editingFields.value.push({ name: '', previousName: '', required: false, example: '' });
  }
  fieldsEditorVisible.value = true;
}

function remapDataRows(fields) {
  dataRows.value = dataRows.value.map((row) => {
    const next = {};
    for (const field of fields) {
      const previous = field.previousName || field.name;
      if (Object.hasOwn(row, previous)) next[field.name] = row[previous];
      else if (Object.hasOwn(row, field.name)) next[field.name] = row[field.name];
      else next[field.name] = field.example || '';
    }
    return next;
  });
}

async function saveFields() {
  const fields = editingFields.value
    .map((item) => ({
      name: String(item.name || '').trim(),
      previousName: String(item.previousName || '').trim(),
      required: Boolean(item.required),
      example: String(item.example ?? '')
    }))
    .filter((item) => item.name);
  if (!fields.length) {
    ElMessage.warning(t('scenarioDrawer.needOneField'));
    return;
  }
  if (new Set(fields.map((item) => item.name)).size !== fields.length) {
    ElMessage.warning(t('scenarioDrawer.duplicateField'));
    return;
  }
  fieldsSaving.value = true;
  try {
    const dataSchema = {
      columns: fields.map((item) => item.name),
      required: fields.filter((item) => item.required).map((item) => item.name),
      example: Object.fromEntries(fields.map((item) => [item.name, item.example]))
    };
    const result = await api(`/api/scenarios/${scenario.value.key}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: scenario.value.name,
        description: scenario.value.description || '',
        module: scenario.value.directory || scenario.value.module || '',
        directory: scenario.value.directory || scenario.value.module || '',
        appId: scenario.value.appId || '',
        moduleId: scenario.value.moduleId || '',
        priority: scenario.value.priority || 'P2',
        owner: scenario.value.owner || '',
        scriptEntry: scenario.value.scriptEntry || '',
        dataSchema
      })
    });
    remapDataRows(fields);
    scenario.value = { ...scenario.value, ...result, dataSchema: result.dataSchema || dataSchema };
    fieldsEditorVisible.value = false;
    emit('changed', scenario.value);
    ElMessage.success(t('scenarioDrawer.fieldsUpdated'));
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    fieldsSaving.value = false;
  }
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
  if (!dataColumns.value.length) {
    ElMessage.warning(t('scenarioDrawer.setupFieldsBeforeRow'));
    openFieldsEditor();
    return;
  }
  markDataChanged();
  dataRows.value.push(blankDataRow());
}

function removeDataRow(index) {
  if (dataRows.value.length === 1) return ElMessage.warning(t('scenarioDrawer.keepOneRow'));
  markDataChanged();
  dataRows.value.splice(index, 1);
}

function resetDataRows() {
  selectedDatasetId.value = '';
  datasetName.value = `${scenario.value.name}${t('common.datasetSuffix')}`;
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
    ElMessage.success(t('scenarioDrawer.rowsInserted', { count: result.rows?.length || 0 }));
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    uploadRef.value?.clearFiles();
    dataLoading.value = false;
  }
}

function validateDataRows() {
  if (!dataRows.value.length) throw new Error(t('scenarioDrawer.needOneDataRow'));
  for (const [index, row] of dataRows.value.entries()) {
    for (const field of requiredColumns.value) {
      if (!String(row[field] ?? '').trim()) throw new Error(t('scenarioDrawer.requiredRowField', { row: index + 1, field }));
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
    body.append('name', datasetName.value.trim() || `${scenario.value.name}${t('common.datasetSuffix')}`);
    body.append('file', new Blob([dataRowsCsv()], { type: 'text/csv' }), 'manual.csv');
    const saved = await api(`/api/scenarios/${scenario.value.key}/datasets`, { method: 'POST', body });
    await loadDatasets();
    selectedDatasetId.value = saved.id;
    emit('changed');
    ElMessage.success(t('scenarioDrawer.dataSaved'));
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
    scenario.value = { ...scenario.value, scriptEntry: result.scriptEntry, ...(result.dataSchema ? { dataSchema: result.dataSchema } : {}) };
    scriptUploadRef.value.clearFiles();
    scriptUploadFile.value = null;
    await loadScript(false);
    emit('changed');
    ElMessage.success(t('scenarioDrawer.scriptUploadSuccess'));
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    scriptUploading.value = false;
  }
}

async function saveScript() {
  scriptSaving.value = true;
  try {
    scriptErrors.value = [];
    const result = await api(`/api/scenarios/${scenario.value.key}/script`, {
      method: 'PUT',
      body: JSON.stringify({ fileName: scriptFileName.value.trim(), content: scriptSource.value })
    });
    scriptFileName.value = result.fileName;
    scenario.value = { ...scenario.value, scriptEntry: result.scriptEntry, ...(result.dataSchema ? { dataSchema: result.dataSchema } : {}) };
    savedScriptSource.value = scriptSource.value;
    emit('changed');
    ElMessage.success(t('scenarioDrawer.scriptSaveSuccess'));
  } catch (error) {
    scriptErrors.value = [error.message];
    ElMessage.error(error.message);
  } finally {
    scriptSaving.value = false;
  }
}

async function startRecord() {
  invalidateRecordingRequests();
  const request = { generation: recordRequestGeneration, scenarioKey: scenario.value?.key };
  recordLoading.value = true;
  try {
    const result = await api('/api/recordings/start', {
      method: 'POST',
      body: JSON.stringify({
        scenarioKey: request.scenarioKey,
        environmentKey: environment.value,
        location: 'server'
      })
    });
    if (!isCurrentRecordingRequest(request)) return;
    recording.value = result;
    startRecordPolling();
  } catch (error) {
    if (isCurrentRecordingRequest(request)) ElMessage.error(error.message);
  } finally {
    if (isCurrentRecordingRequest(request)) recordLoading.value = false;
  }
}

function formatDate(value) {
  return value ? new Date(value).toLocaleString(locale.value === 'en-US' ? 'en-US' : 'zh-CN', { hour12: false }) : '-';
}

function stopRecordPolling() {
  invalidateRecordingRequests();
  clearInterval(recordTimer);
  recordTimer = undefined;
}

function invalidateRecordingRequests() {
  recordRequestGeneration += 1;
  recordLoading.value = false;
}

function isCurrentRecordingRequest({ generation, recordingId, scenarioKey }) {
  return generation === recordRequestGeneration
    && (!recordingId || recording.value?.id === recordingId)
    && scenario.value?.key === scenarioKey;
}

function startRecordPolling() {
  stopRecordPolling();
  if (!['waiting', 'recording'].includes(recording.value?.status)) return;
  recordTimer = setInterval(() => refresh({ silent: true }), 2000);
}

async function refresh({ silent = false } = {}) {
  if (!recording.value?.id || recordLoading.value) return;
  const request = {
    generation: recordRequestGeneration,
    recordingId: recording.value.id,
    scenarioKey: scenario.value?.key
  };
  recordLoading.value = true;
  try {
    const result = await api(`/api/recordings/${request.recordingId}`);
    if (!isCurrentRecordingRequest(request)) return;
    recording.value = { ...recording.value, ...result };
    if (result.status === 'failed') {
      stopRecordPolling();
      if (!silent) ElMessage.error(result.error || t('scenarioDrawer.recordFailedGeneric'));
      return;
    }
    if (result.status === 'finished' || result.status === 'draft') {
      stopRecordPolling();
      const completionRequest = { ...request, generation: recordRequestGeneration };
      if (!isCurrentRecordingRequest(completionRequest)) return;
      await syncScenario(result, () => isCurrentRecordingRequest(completionRequest));
      if (!isCurrentRecordingRequest(completionRequest)) return;
      const scriptLoaded = await loadScript(false, () => isCurrentRecordingRequest(completionRequest));
      if (!scriptLoaded || !isCurrentRecordingRequest(completionRequest)) return;
      if (recording.value.analysis && reviewOpenedFor.value !== result.id) {
        reviewOpenedFor.value = result.id;
        reviewRecording.value = recording.value;
        reviewVisible.value = true;
      }
    }
    if (!silent) ElMessage.success(t('scenarioDrawer.recordRefreshed'));
  } catch (error) {
    if (!silent && isCurrentRecordingRequest(request)) ElMessage.error(error.message);
  } finally {
    if (isCurrentRecordingRequest(request)) recordLoading.value = false;
  }
}

async function syncScenario(result, isCurrent = () => true) {
  if (!isCurrent()) return;
  if (result.scenario) scenario.value = { ...scenario.value, ...result.scenario };
  else if (result.scriptEntry) scenario.value = { ...scenario.value, scriptEntry: result.scriptEntry };
  if (!isCurrent()) return;
  emit('changed');
}

function scenarioSaved(result) {
  scenario.value = { ...scenario.value, ...result };
  emit('changed', scenario.value);
}

function scenarioRestored(result) {
  scenario.value = { ...scenario.value, ...result, status: 'draft' };
  tab.value = 'base';
  loadScript(false);
  emit('changed', scenario.value);
}

function reviewApplied(result) {
  if (result?.scenario) scenario.value = { ...scenario.value, ...result.scenario, status: 'draft' };
  if (result?.script) {
    scriptSource.value = result.script;
    savedScriptSource.value = result.script;
  }
  emit('changed');
}

function schemaSynced(result) {
  if (result?.scenario) scenario.value = { ...scenario.value, ...result.scenario };
  if (result?.script) {
    scriptSource.value = result.script;
    savedScriptSource.value = result.script;
  }
  emit('changed');
}

function datasetsMigrated() {
  loadDatasets();
  emit('changed');
}

function schemaMigrationRequired(payload = {}) {
  tab.value = 'data';
  migrationRef.value?.open({
    scenarioSchema: payload.targetSchema || scenario.value?.dataSchema,
    datasets: payload.datasets || datasets.value
  });
}

function guardReleaseChange() {
  if (!scriptDirty.value) return true;
  tab.value = 'record';
  ElMessage.warning(t('scenarioDrawer.saveBeforePublish'));
  return false;
}

async function publishCurrent() {
  if (!guardReleaseChange()) return;
  tab.value = 'releases';
  await nextTick();
  releaseRef.value?.publish();
}

async function comparePublished() {
  tab.value = 'releases';
  await nextTick();
  releaseRef.value?.compareDraft();
}

async function handleRunStarted(run) {
  await store.loadRuns().catch(() => {});
  const detail = store.runs.find((item) => item.runId === run.runId) || run;
  runDetailRef.value?.open(detail);
}

function beforeDrawerClose(done) {
  const close = () => { stopRecordPolling(); done(); };
  if (!scriptDirty.value) return close();
  ElMessageBox.confirm(t('scenarioDrawer.closeUnsavedConfirm'), t('scenarioDrawer.closeUnsavedTitle'), { type: 'warning', confirmButtonText: t('scenarioDrawer.discardChanges'), cancelButtonText: t('scenarioDrawer.continueEdit') })
    .then(close)
    .catch(() => {});
}

function warnBeforeUnload(event) {
  if (!visible.value || !scriptDirty.value) return;
  event.preventDefault();
  event.returnValue = '';
}

watch(visible, (value) => { if (!value) stopRecordPolling(); });
onMounted(() => window.addEventListener('beforeunload', warnBeforeUnload));
onBeforeUnmount(() => {
  stopRecordPolling();
  window.removeEventListener('beforeunload', warnBeforeUnload);
});

defineExpose({ open });
</script>

<style scoped>
.workspace-header { display: grid; width: 100%; gap: 10px; padding-right: 6px; }
.workspace-title, .workspace-actions, .script-title-line { display: flex; align-items: center; gap: 10px; }
.workspace-title { justify-content: space-between; min-width: 0; }
.workspace-title h2 { margin: 0; }
.workspace-summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.workspace-summary > div { display: grid; min-width: 0; gap: 2px; }
.workspace-summary span { color: var(--el-text-color-secondary); font-size: 12px; }
.workspace-summary strong { overflow: hidden; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.workspace-actions { justify-content: flex-end; }
.drawer-actions { display: flex; align-items: flex-start; gap: 10px; flex-wrap: wrap; }
.dataset-toolbar { display: grid; grid-template-columns: minmax(220px, 1fr) minmax(220px, 1fr) auto; gap: 10px; margin-bottom: 12px; }
.dataset-toolbar .el-select { width: 100%; }
.data-entry-toolbar { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
.field-schema-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; padding: 10px 12px; border: 1px solid var(--el-border-color-lighter); border-radius: 8px; background: var(--el-fill-color-blank); }
.field-schema-bar > div { display: grid; gap: 2px; }
.field-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.data-optional-alert { margin-bottom: 12px; }
.fields-editor-alert { margin-bottom: 12px; }
.add-field { margin-top: 10px; }
.data-save-actions { display: flex; align-items: center; justify-content: flex-end; gap: 14px; margin-top: 14px; }
.required { color: var(--el-color-danger); }
.script-section { min-height: 430px; }
.section-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
.section-title { display: flex; min-width: 0; flex: 1; flex-direction: column; gap: 6px; }
.script-entry { display: block; max-width: 420px; }
.script-form :deep(.el-form-item:last-child) { margin-bottom: 12px; }
.script-editor { min-height: 320px; }
.editor-actions { display: flex; justify-content: flex-end; gap: 10px; }
.record-form { margin-top: 16px; max-width: 420px; }
.record-fallback { display: grid; gap: 4px; margin: 10px 0; }
.runs-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
@media (max-width: 700px) {
  .workspace-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .workspace-actions { align-items: stretch; }
  .workspace-actions .el-button { flex: 1; }
  .section-header { flex-direction: column; }
  .dataset-toolbar { grid-template-columns: 1fr; }
  .data-entry-toolbar { align-items: stretch; }
  .script-entry { max-width: 84vw; }
  .editor-actions { justify-content: stretch; }
  .editor-actions .el-button { flex: 1; }
  .runs-toolbar { align-items: stretch; flex-direction: column; }
}
</style>
