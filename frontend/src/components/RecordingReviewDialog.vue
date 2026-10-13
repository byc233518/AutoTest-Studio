<template>
  <el-dialog v-model="visible" :title="t('recording.title')" width="min(1080px, 96vw)" destroy-on-close>
    <el-steps :active="step" simple finish-status="success">
      <el-step :title="t('recording.stepFields')" />
      <el-step :title="t('recording.stepAssertions')" />
      <el-step :title="t('recording.stepPreview')" />
    </el-steps>

    <div v-loading="loading || previewLoading" class="review-body">
      <el-alert v-if="analysis && !analysis.supported" :title="t('recording.analysisUnsupported')" type="warning" show-icon :closable="false" />
      <el-alert v-if="analysis?.warnings?.length" :title="analysis.warnings.join(t('common.listSeparator'))" type="warning" show-icon :closable="false" />

      <template v-if="step === 0">
        <el-form label-position="top"><el-form-item :label="t('recording.scriptTitle')"><el-input v-model="title" maxlength="120" /></el-form-item></el-form>
        <el-table :data="fields" border max-height="400" :empty-text="t('recording.fieldsEmpty')">
          <el-table-column :label="t('recording.displayName')" min-width="150"><template #default="{ row }"><el-input v-model="row.label" :disabled="row.ignored" /></template></el-table-column>
          <el-table-column :label="t('recording.dataKey')" min-width="170"><template #default="{ row }"><el-input v-model="row.key" :disabled="row.ignored || Boolean(row.mergeTo)" :placeholder="t('recording.dataKeyPlaceholder')" /></template></el-table-column>
          <el-table-column :label="t('recording.type')" width="130"><template #default="{ row }"><el-select v-model="row.type" :disabled="row.ignored"><el-option v-for="item in fieldTypes" :key="item.value" :label="item.label" :value="item.value" /></el-select></template></el-table-column>
          <el-table-column :label="t('recording.exampleValue')" min-width="150"><template #default="{ row }"><el-input v-model="row.example" :disabled="row.ignored" /></template></el-table-column>
          <el-table-column :label="t('recording.required')" width="72"><template #default="{ row }"><el-checkbox v-model="row.required" :disabled="row.ignored" /></template></el-table-column>
          <el-table-column :label="t('recording.mergeTo')" min-width="150"><template #default="{ row }"><el-select v-model="row.mergeTo" clearable :disabled="row.ignored" :placeholder="t('recording.noMerge')" @change="mergeField(row, $event)"><el-option v-for="item in mergeOptions(row)" :key="item.candidateId" :label="item.label || item.key" :value="item.candidateId" /></el-select></template></el-table-column>
          <el-table-column :label="t('common.actions')" width="118" fixed="right"><template #default="scope"><el-button link :type="scope.row.ignored ? 'primary' : 'warning'" @click="scope.row.ignored = !scope.row.ignored">{{ scope.row.ignored ? t('common.restore') : t('common.ignore') }}</el-button><el-button link type="danger" @click="removeField(scope.$index)">{{ t('common.remove') }}</el-button></template></el-table-column>
        </el-table>
        <el-alert v-if="fieldErrors.length" class="validation-alert" :title="fieldErrors.join(t('common.listSeparator'))" type="error" show-icon :closable="false" />
      </template>

      <template v-else-if="step === 1">
        <div class="assertion-toolbar"><el-text type="info">{{ t('recording.assertionHint') }}</el-text><el-button type="primary" plain @click="addAssertion">{{ t('recording.addAssertion') }}</el-button></div>
        <el-table :data="assertions" border max-height="380" :empty-text="t('recording.assertionsEmpty')">
          <el-table-column :label="t('recording.conditionType')" width="150"><template #default="{ row }"><el-select v-model="row.type"><el-option v-for="item in assertionTypes" :key="item.value" :label="item.label" :value="item.value" /></el-select></template></el-table-column>
          <el-table-column :label="t('recording.target')" min-width="190"><template #default="{ row }"><el-input v-model="row.target" :placeholder="row.type === 'url' ? t('recording.targetUrl') : t('recording.targetElement')" /></template></el-table-column>
          <el-table-column :label="t('recording.expected')" min-width="210"><template #default="{ row }"><el-input v-model="row.expected" :disabled="row.type === 'visible'" :placeholder="row.type === 'visible' ? t('recording.expectedVisible') : t('recording.expectedInput')" /></template></el-table-column>
          <el-table-column :label="t('recording.keep')" width="72"><template #default="{ row }"><el-checkbox v-model="row.enabled" /></template></el-table-column>
          <el-table-column :label="t('common.actions')" width="72" fixed="right"><template #default="scope"><el-button link type="danger" @click="assertions.splice(scope.$index, 1)">{{ t('common.remove') }}</el-button></template></el-table-column>
        </el-table>
        <el-alert v-if="assertionErrors.length" class="validation-alert" :title="assertionErrors.join(t('common.listSeparator'))" type="error" show-icon :closable="false" />
      </template>

      <template v-else>
        <div class="preview-grid">
          <section>
            <div class="preview-title"><strong>{{ t('recording.previewTitle') }}</strong><el-tag :type="previewStale ? 'warning' : 'info'" effect="plain">{{ previewStale ? t('recording.previewStale') : t('recording.previewReadonly') }}</el-tag></div>
            <el-alert v-if="previewError" class="preview-alert" :title="previewError" type="error" show-icon :closable="false"><el-button link type="primary" @click="refreshPreview">{{ t('recording.regenerate') }}</el-button></el-alert>
            <ScriptEditor :model-value="previewResult?.source || ''" readonly :errors="previewResult?.warnings || []" />
          </section>
          <section class="preview-meta">
            <strong>{{ t('recording.fieldDefinitions') }}</strong><pre>{{ JSON.stringify(testDataSchema, null, 2) }}</pre>
            <strong>{{ t('recording.sampleData') }}</strong><pre>{{ JSON.stringify(testDataSchema.example, null, 2) }}</pre>
            <strong>{{ t('recording.warnings') }}</strong><el-alert v-for="(warning, index) in previewWarnings" :key="`${index}-${warning}`" :title="warning" type="warning" show-icon :closable="false" /><el-text v-if="!previewWarnings.length" type="success">{{ t('recording.noWarnings') }}</el-text>
          </section>
        </div>
      </template>
    </div>

    <template #footer><el-button @click="visible = false">{{ t('common.cancel') }}</el-button><el-button v-if="step > 0" @click="step -= 1">{{ t('common.back') }}</el-button><el-button v-if="step < 2" type="primary" @click="next">{{ t('common.next') }}</el-button><el-button v-else type="primary" :loading="loading" :disabled="!canApply" @click="apply">{{ t('recording.apply') }}</el-button></template>
  </el-dialog>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { api } from '../api';
import { analyzeFieldMerges, buildAssertionPayload, redirectMergeDependents } from '../recording-review.mjs';
import ScriptEditor from './ScriptEditor.vue';
import { useI18n } from '../i18n';

const props = defineProps({ modelValue: { type: Boolean, default: false }, recording: { type: Object, default: null } });
const emit = defineEmits(['update:modelValue', 'applied']);
const { t } = useI18n();
const visible = ref(props.modelValue), step = ref(0), loading = ref(false), title = ref(''), analysis = ref(null), fields = ref([]), assertions = ref([]);
const previewLoading = ref(false), previewResult = ref(null), previewError = ref(''), previewStale = ref(true);
let previewTimer = null;
let previewRequestId = 0;
const fieldTypes = computed(() => [
  { value: 'text', label: t('recording.fieldType.text') },
  { value: 'number', label: t('recording.fieldType.number') },
  { value: 'date', label: t('recording.fieldType.date') },
  { value: 'checkbox', label: t('recording.fieldType.checkbox') },
  { value: 'select', label: t('recording.fieldType.select') },
  { value: 'file', label: t('recording.fieldType.file') }
]);
const assertionTypes = computed(() => [
  { value: 'visible', label: t('recording.assertionType.visible') },
  { value: 'text', label: t('recording.assertionType.text') },
  { value: 'url', label: t('recording.assertionType.url') },
  { value: 'value', label: t('recording.assertionType.value') }
]);

const activeFields = computed(() => fields.value.filter((field) => !field.ignored && !field.mergeTo));
const enabledAssertions = computed(() => assertions.value.filter((item) => item.enabled !== false));
const mergeAnalysis = computed(() => analyzeFieldMerges(fields.value));
const fieldErrors = computed(() => {
  const errors = [...mergeAnalysis.value.errors], seen = new Set();
  for (const [index, field] of activeFields.value.entries()) {
    const key = String(field.key || '').trim();
    if (!key) errors.push(t('recording.fieldKeyEmpty', { index: index + 1 }));
    else if (seen.has(key)) errors.push(t('recording.fieldKeyDuplicate', { key }));
    else seen.add(key);
  }
  return errors;
});
const assertionErrors = computed(() => enabledAssertions.value.map((item, index) => {
  if (item.type === 'url') return String(item.expected || '').trim() ? '' : t('recording.urlNeedExpected', { index: index + 1 });
  if (!String(item.target || '').trim()) return t('recording.assertionNeedTarget', { index: index + 1 });
  if (item.type !== 'visible' && !String(item.expected ?? '').trim()) return t('recording.assertionNeedExpected', { index: index + 1 });
  return '';
}).filter(Boolean));
const fieldsForApply = computed(() => activeFields.value.map(({ ignored, mergeTo, candidateIds, ...field }) => ({
  ...field,
  candidateIds: mergeAnalysis.value.candidateIdsByTarget.get(field.candidateId) || []
})));
const assertionsForApply = computed(() => enabledAssertions.value.map(buildAssertionPayload));
const previewPayload = computed(() => ({ title: title.value.trim(), fields: fieldsForApply.value, assertions: assertionsForApply.value }));
const previewSignature = computed(() => JSON.stringify(previewPayload.value));
const testDataSchema = computed(() => previewResult.value?.schema || { columns: [], required: [], example: {}, fields: [] });
const previewWarnings = computed(() => [
  ...(previewResult.value?.warnings || []),
  ...(analysis.value?.warnings || []),
  ...fields.value.filter((field) => field.ignored).map((field) => t('recording.fixedValueWarning', { label: field.label })),
  ...fields.value.filter((field) => field.mergeTo).map((field) => t('recording.mergedWarning', { label: field.label })),
  ...(enabledAssertions.value.length ? [] : [t('recording.noAssertionWarning')])
]);
const canApply = computed(() => Boolean(previewResult.value) && !previewLoading.value && !previewStale.value
  && !previewError.value && !(previewResult.value?.warnings || []).length);

function mergeOptions(field) { return fields.value.filter((item) => item !== field && !item.ignored && !item.mergeTo && item.key); }
function mergeField(field, targetId) {
  if (targetId) fields.value = redirectMergeDependents(fields.value, field.candidateId, targetId);
}
function removeField(index) {
  const [removed] = fields.value.splice(index, 1);
  if (removed?.candidateId) fields.value.forEach((field) => { if (field.mergeTo === removed.candidateId) field.mergeTo = ''; });
}
function addAssertion() { assertions.value.push({ type: 'visible', target: '', expected: '', enabled: true }); }
function cloneAnalysis(value) {
  const source = value || {}; analysis.value = source;
  fields.value = (source.fields || []).map((item) => ({ ...item, key: item.key || '', label: item.label || '', type: item.type || 'text', example: item.example ?? item.value ?? '', required: true, ignored: false, mergeTo: '' }));
  assertions.value = (source.assertions || []).map((item) => {
    const target = item.label || item.locator?.value || '';
    return { ...item, target, originalTarget: target, expected: item.expected ?? item.value ?? '', enabled: true };
  });
}
function cancelPreview() {
  previewRequestId += 1;
  if (previewTimer) clearTimeout(previewTimer);
  previewTimer = null;
  previewLoading.value = false;
}
function open(value = props.recording) {
  cancelPreview();
  step.value = 0;
  title.value = value?.scenarioKey || t('recording.defaultTitle');
  previewResult.value = null;
  previewError.value = '';
  previewStale.value = true;
  cloneAnalysis(value?.analysis);
  visible.value = true;
}

async function loadPreview(requestId) {
  if (!props.recording?.id) {
    previewError.value = t('recording.notFound');
    previewStale.value = true;
    return;
  }
  const signature = previewSignature.value;
  previewLoading.value = true;
  previewError.value = '';
  try {
    const result = await api(`/api/recordings/${props.recording.id}/preview`, {
      method: 'POST',
      body: JSON.stringify(previewPayload.value)
    });
    if (requestId !== previewRequestId || signature !== previewSignature.value || step.value !== 2 || !visible.value) return;
    previewResult.value = result;
    previewStale.value = false;
  } catch (error) {
    if (requestId !== previewRequestId) return;
    previewError.value = error.message;
    previewStale.value = true;
  } finally {
    if (requestId === previewRequestId) previewLoading.value = false;
  }
}
function refreshPreview() {
  if (previewTimer) clearTimeout(previewTimer);
  previewTimer = null;
  previewStale.value = true;
  const requestId = ++previewRequestId;
  return loadPreview(requestId);
}
function invalidatePreview() {
  previewStale.value = true;
  previewError.value = '';
  if (previewTimer) clearTimeout(previewTimer);
  const requestId = ++previewRequestId;
  previewTimer = setTimeout(() => {
    previewTimer = null;
    loadPreview(requestId);
  }, 200);
}
async function next() {
  if (step.value === 0 && fieldErrors.value.length) return ElMessage.warning(fieldErrors.value.join(t('common.listSeparator')));
  if (step.value === 1 && assertionErrors.value.length) return ElMessage.warning(assertionErrors.value.join(t('common.listSeparator')));
  step.value += 1;
  if (step.value === 2) await refreshPreview();
}
async function apply() {
  if (fieldErrors.value.length || assertionErrors.value.length) return ElMessage.warning([...fieldErrors.value, ...assertionErrors.value].join(t('common.listSeparator')));
  if (!props.recording?.id) return ElMessage.error(t('recording.notFound'));
  if (!canApply.value) return ElMessage.warning(t('recording.waitPreview'));
  loading.value = true;
  try {
    const result = await api(`/api/recordings/${props.recording.id}/apply`, { method: 'POST', body: JSON.stringify(previewPayload.value) });
    emit('applied', result); visible.value = false; ElMessage.success(t('recording.applied'));
  } catch (error) { ElMessage.error(error.message); }
  finally { loading.value = false; }
}

watch(() => props.modelValue, (value) => { if (visible.value === value) return; visible.value = value; if (value) open(); });
watch(visible, (value) => { emit('update:modelValue', value); if (!value) cancelPreview(); });
watch(() => props.recording, (value) => { if (value && visible.value) open(value); });
watch(previewSignature, () => { if (visible.value && step.value === 2) invalidatePreview(); });
watch(step, (value) => { if (value !== 2) cancelPreview(); });
onBeforeUnmount(cancelPreview);
defineExpose({ open, addAssertion, refreshPreview });
</script>

<style scoped>
.review-body { min-height: 320px; padding-top: 18px; }
.validation-alert { margin-top: 12px; }
.assertion-toolbar, .preview-title { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
.preview-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(260px, .65fr); gap: 14px; }
.preview-meta { display: grid; align-content: start; gap: 8px; min-width: 0; }
.preview-meta pre { max-height: 180px; overflow: auto; margin: 0; padding: 10px; border: 1px solid var(--el-border-color); border-radius: 4px; background: var(--el-fill-color-light); font: 12px/1.5 Consolas, "Courier New", monospace; white-space: pre-wrap; overflow-wrap: anywhere; }
@media (max-width: 720px) { .preview-grid { grid-template-columns: 1fr; } .assertion-toolbar { align-items: stretch; flex-direction: column; } }
</style>
