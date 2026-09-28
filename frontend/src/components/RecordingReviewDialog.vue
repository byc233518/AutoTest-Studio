<template>
  <el-dialog v-model="visible" title="复核录制脚本" width="min(1080px, 96vw)" destroy-on-close>
    <el-steps :active="step" simple finish-status="success">
      <el-step title="字段" />
      <el-step title="成功条件" />
      <el-step title="脚本预览" />
    </el-steps>

    <div v-loading="loading || previewLoading" class="review-body">
      <el-alert v-if="analysis && !analysis.supported" title="录制分析无法完整识别，请检查脚本后再应用" type="warning" show-icon :closable="false" />
      <el-alert v-if="analysis?.warnings?.length" :title="analysis.warnings.join('；')" type="warning" show-icon :closable="false" />

      <template v-if="step === 0">
        <el-form label-position="top"><el-form-item label="脚本标题"><el-input v-model="title" maxlength="120" /></el-form-item></el-form>
        <el-table :data="fields" border max-height="400" empty-text="未识别到可替换字段">
          <el-table-column label="显示名称" min-width="150"><template #default="{ row }"><el-input v-model="row.label" :disabled="row.ignored" /></template></el-table-column>
          <el-table-column label="数据 key" min-width="170"><template #default="{ row }"><el-input v-model="row.key" :disabled="row.ignored || Boolean(row.mergeTo)" placeholder="例如 customerCode" /></template></el-table-column>
          <el-table-column label="类型" width="130"><template #default="{ row }"><el-select v-model="row.type" :disabled="row.ignored"><el-option v-for="item in fieldTypes" :key="item.value" :label="item.label" :value="item.value" /></el-select></template></el-table-column>
          <el-table-column label="示例值" min-width="150"><template #default="{ row }"><el-input v-model="row.example" :disabled="row.ignored" /></template></el-table-column>
          <el-table-column label="必填" width="72"><template #default="{ row }"><el-checkbox v-model="row.required" :disabled="row.ignored" /></template></el-table-column>
          <el-table-column label="合并到" min-width="150"><template #default="{ row }"><el-select v-model="row.mergeTo" clearable :disabled="row.ignored" placeholder="不合并" @change="mergeField(row, $event)"><el-option v-for="item in mergeOptions(row)" :key="item.candidateId" :label="item.label || item.key" :value="item.candidateId" /></el-select></template></el-table-column>
          <el-table-column label="操作" width="118" fixed="right"><template #default="scope"><el-button link :type="scope.row.ignored ? 'primary' : 'warning'" @click="scope.row.ignored = !scope.row.ignored">{{ scope.row.ignored ? '恢复' : '忽略' }}</el-button><el-button link type="danger" @click="removeField(scope.$index)">删除</el-button></template></el-table-column>
        </el-table>
        <el-alert v-if="fieldErrors.length" class="validation-alert" :title="fieldErrors.join('；')" type="error" show-icon :closable="false" />
      </template>

      <template v-else-if="step === 1">
        <div class="assertion-toolbar"><el-text type="info">把常用成功条件转换为标准 Playwright expect 断言</el-text><el-button type="primary" plain @click="addAssertion">新增成功条件</el-button></div>
        <el-table :data="assertions" border max-height="380" empty-text="暂无成功条件，请点击新增成功条件">
          <el-table-column label="条件类型" width="150"><template #default="{ row }"><el-select v-model="row.type"><el-option v-for="item in assertionTypes" :key="item.value" :label="item.label" :value="item.value" /></el-select></template></el-table-column>
          <el-table-column label="目标" min-width="190"><template #default="{ row }"><el-input v-model="row.target" :placeholder="row.type === 'url' ? '页面 URL' : '元素文字或标签'" /></template></el-table-column>
          <el-table-column label="期望值" min-width="210"><template #default="{ row }"><el-input v-model="row.expected" :disabled="row.type === 'visible'" :placeholder="row.type === 'visible' ? '无需填写' : '输入期望内容'" /></template></el-table-column>
          <el-table-column label="保留" width="72"><template #default="{ row }"><el-checkbox v-model="row.enabled" /></template></el-table-column>
          <el-table-column label="操作" width="72" fixed="right"><template #default="scope"><el-button link type="danger" @click="assertions.splice(scope.$index, 1)">删除</el-button></template></el-table-column>
        </el-table>
        <el-alert v-if="assertionErrors.length" class="validation-alert" :title="assertionErrors.join('；')" type="error" show-icon :closable="false" />
      </template>

      <template v-else>
        <div class="preview-grid">
          <section>
            <div class="preview-title"><strong>参数化 Playwright 脚本</strong><el-tag :type="previewStale ? 'warning' : 'info'" effect="plain">{{ previewStale ? '预览已过期' : '只读预览' }}</el-tag></div>
            <el-alert v-if="previewError" class="preview-alert" :title="previewError" type="error" show-icon :closable="false"><el-button link type="primary" @click="refreshPreview">重新生成</el-button></el-alert>
            <ScriptEditor :model-value="previewResult?.source || ''" readonly :errors="previewResult?.warnings || []" />
          </section>
          <section class="preview-meta">
            <strong>字段定义</strong><pre>{{ JSON.stringify(testDataSchema, null, 2) }}</pre>
            <strong>示例数据</strong><pre>{{ JSON.stringify(testDataSchema.example, null, 2) }}</pre>
            <strong>警告</strong><el-alert v-for="(warning, index) in previewWarnings" :key="`${index}-${warning}`" :title="warning" type="warning" show-icon :closable="false" /><el-text v-if="!previewWarnings.length" type="success">没有未处理警告</el-text>
          </section>
        </div>
      </template>
    </div>

    <template #footer><el-button @click="visible = false">取消</el-button><el-button v-if="step > 0" @click="step -= 1">上一步</el-button><el-button v-if="step < 2" type="primary" @click="next">下一步</el-button><el-button v-else type="primary" :loading="loading" :disabled="!canApply" @click="apply">确认应用</el-button></template>
  </el-dialog>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { api } from '../api';
import { analyzeFieldMerges, buildAssertionPayload, redirectMergeDependents } from '../recording-review.mjs';
import ScriptEditor from './ScriptEditor.vue';

const props = defineProps({ modelValue: { type: Boolean, default: false }, recording: { type: Object, default: null } });
const emit = defineEmits(['update:modelValue', 'applied']);
const visible = ref(props.modelValue), step = ref(0), loading = ref(false), title = ref(''), analysis = ref(null), fields = ref([]), assertions = ref([]);
const previewLoading = ref(false), previewResult = ref(null), previewError = ref(''), previewStale = ref(true);
let previewTimer = null;
let previewRequestId = 0;
const fieldTypes = [
  { value: 'text', label: '文本' }, { value: 'number', label: '数字' }, { value: 'date', label: '日期' },
  { value: 'checkbox', label: '布尔' }, { value: 'select', label: '选项' }, { value: 'file', label: '文件' }
];
const assertionTypes = [
  { value: 'visible', label: '元素可见' }, { value: 'text', label: '文本可见' },
  { value: 'url', label: 'URL 包含' }, { value: 'value', label: '输入值等于' }
];

const activeFields = computed(() => fields.value.filter((field) => !field.ignored && !field.mergeTo));
const enabledAssertions = computed(() => assertions.value.filter((item) => item.enabled !== false));
const mergeAnalysis = computed(() => analyzeFieldMerges(fields.value));
const fieldErrors = computed(() => {
  const errors = [...mergeAnalysis.value.errors], seen = new Set();
  for (const [index, field] of activeFields.value.entries()) {
    const key = String(field.key || '').trim();
    if (!key) errors.push(`第 ${index + 1} 个字段 key 不能为空`);
    else if (seen.has(key)) errors.push(`字段 key 不能重复：${key}`);
    else seen.add(key);
  }
  return errors;
});
const assertionErrors = computed(() => enabledAssertions.value.map((item, index) => {
  if (item.type === 'url') return String(item.expected || '').trim() ? '' : `第 ${index + 1} 个 URL 成功条件需要期望值`;
  if (!String(item.target || '').trim()) return `第 ${index + 1} 个成功条件需要目标`;
  if (item.type !== 'visible' && !String(item.expected ?? '').trim()) return `第 ${index + 1} 个成功条件需要期望值`;
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
  ...fields.value.filter((field) => field.ignored).map((field) => `固定值“${field.label}”将保持原样，不进入测试数据。`),
  ...fields.value.filter((field) => field.mergeTo).map((field) => `候选“${field.label}”已合并到其他字段。`),
  ...(enabledAssertions.value.length ? [] : ['当前脚本没有成功条件，建议返回上一步新增断言。'])
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
  title.value = value?.scenarioKey || '录制场景';
  previewResult.value = null;
  previewError.value = '';
  previewStale.value = true;
  cloneAnalysis(value?.analysis);
  visible.value = true;
}

// The server response is authoritative for generated testDataSchema and expect(...) statements.
async function loadPreview(requestId) {
  if (!props.recording?.id) {
    previewError.value = '录制记录不存在';
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
  if (step.value === 0 && fieldErrors.value.length) return ElMessage.warning(fieldErrors.value.join('；'));
  if (step.value === 1 && assertionErrors.value.length) return ElMessage.warning(assertionErrors.value.join('；'));
  step.value += 1;
  if (step.value === 2) await refreshPreview();
}
async function apply() {
  if (fieldErrors.value.length || assertionErrors.value.length) return ElMessage.warning([...fieldErrors.value, ...assertionErrors.value].join('；'));
  if (!props.recording?.id) return ElMessage.error('录制记录不存在');
  if (!canApply.value) return ElMessage.warning('请等待脚本预览生成完成');
  loading.value = true;
  try {
    const result = await api(`/api/recordings/${props.recording.id}/apply`, { method: 'POST', body: JSON.stringify(previewPayload.value) });
    emit('applied', result); visible.value = false; ElMessage.success('录制脚本已应用');
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
