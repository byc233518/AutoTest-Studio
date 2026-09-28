<template>
  <el-dialog v-model="visible" title="测试数据字段迁移" width="min(1040px, 96vw)" destroy-on-close>
    <div v-loading="loading" class="migration-body">
      <el-alert title="迁移会创建新的数据集，源数据集保持不变。请先预览并确认每一行的校验结果。" type="info" show-icon :closable="false" />
      <el-form label-position="top" class="migration-form">
        <el-form-item label="源数据集">
          <el-select v-model="datasetIds" multiple collapse-tags class="wide" placeholder="选择要迁移的数据集"><el-option v-for="item in datasets" :key="item.id" :label="`${item.name}（${item.rowCount} 行）`" :value="item.id" /></el-select>
        </el-form-item>
        <el-form-item label="目标字段 JSON"><el-input v-model="targetSchemaText" type="textarea" :rows="5" placeholder='{"columns":["code"],"required":[],"example":{}}' /></el-form-item>
        <div class="mapping-grid">
          <el-form-item label="字段映射 JSON"><el-input v-model="mappingsText" type="textarea" :rows="4" placeholder='[{"from":"oldCode","to":"code"}]' /></el-form-item>
          <el-form-item label="默认值 JSON"><el-input v-model="defaultsText" type="textarea" :rows="4" placeholder='{"enabled":"是"}' /></el-form-item>
        </div>
      </el-form>

      <div v-if="previewed" class="preview-section">
        <div class="preview-header"><strong>迁移预览</strong><el-tag :type="previewErrors ? 'danger' : 'success'">{{ previewErrors ? '存在错误' : '可以迁移' }}</el-tag></div>
        <el-alert v-if="previewErrors" title="请修复数据集、行号和字段对应的错误后再确认。" type="error" show-icon :closable="false" />
        <section v-for="dataset in previews" :key="dataset.id || dataset.sourceDatasetId" class="dataset-preview">
          <div class="dataset-preview-title"><strong>{{ dataset.name || dataset.sourceDatasetName || dataset.sourceDatasetId }}</strong><el-text type="info">源数据集：{{ dataset.sourceDatasetName || dataset.sourceDatasetId || '-' }}</el-text></div>
          <div v-if="dataset.errors?.length" class="error-list">
            <div v-for="(error, index) in dataset.errors" :key="`${index}-${error.row}-${error.field}`" class="error-item">
              <el-tag type="danger" effect="plain">{{ error.row ? `第 ${error.row} 行` : '数据集级错误' }}</el-tag>
              <el-text>{{ error.field || (Number.isInteger(error.index) ? `字段映射 ${error.index + 1}` : '字段未指定') }}</el-text>
              <el-text type="danger">{{ error.message }}</el-text>
            </div>
          </div>
          <el-empty v-else description="该数据集没有错误" :image-size="48" />
          <el-text v-if="!dataset.errors?.length" type="success">{{ dataset.rows?.length || 0 }} 行已通过预览</el-text>
          <el-table v-if="dataset.rows?.length" :data="dataset.rows.slice(0, 5)" border size="small" max-height="220">
            <el-table-column v-for="column in Object.keys(dataset.rows[0] || {})" :key="column" :prop="column" :label="column" min-width="130" />
          </el-table>
        </section>
      </div>
    </div>
    <template #footer><el-button @click="visible = false">取消</el-button><el-button :loading="loading" @click="preview">预览迁移</el-button><el-button type="primary" :loading="saving" :disabled="!previewed || previewErrors" @click="migrate">确认迁移</el-button></template>
  </el-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { api } from '../api';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  scenarioKey: { type: String, default: '' },
  scenarioSchema: { type: Object, default: () => ({ columns: [], required: [], example: {} }) },
  datasets: { type: Array, default: () => [] }
});
const emit = defineEmits(['update:modelValue', 'migrated']);
const visible = ref(props.modelValue);
const loading = ref(false);
const saving = ref(false);
const datasetIds = ref([]);
const localDatasets = ref([]);
const targetSchemaText = ref('');
const mappingsText = ref('[]');
const defaultsText = ref('{}');
const previews = ref([]);
const previewed = ref(false);
const previewFingerprint = ref('');

const datasets = computed(() => props.datasets.length ? props.datasets : localDatasets.value);
const previewErrors = computed(() => previews.value.some((item) => (item.errors || []).length));

function invalidatePreview() {
  previews.value = [];
  previewed.value = false;
  previewFingerprint.value = '';
}

function reset(value = {}) {
  const schema = value.scenarioSchema || props.scenarioSchema || { columns: [], required: [], example: {} };
  targetSchemaText.value = JSON.stringify(schema, null, 2);
  datasetIds.value = (value.datasets || props.datasets || []).slice(0, 1).map((item) => item.id);
  mappingsText.value = '[]';
  defaultsText.value = '{}';
  invalidatePreview();
}

async function loadDatasets() {
  if (props.datasets.length || !props.scenarioKey) return;
  try { localDatasets.value = await api(`/api/scenarios/${props.scenarioKey}/datasets`); } catch (error) { ElMessage.error(error.message); }
}

function parseJson(value, message) {
  try { return JSON.parse(value); } catch { throw new Error(message); }
}

function payload() {
  if (!datasetIds.value.length) throw new Error('请选择源数据集');
  return {
    datasetIds: datasetIds.value,
    targetSchema: parseJson(targetSchemaText.value, '目标字段 JSON 无效'),
    mappings: parseJson(mappingsText.value, '字段映射 JSON 无效'),
    defaults: parseJson(defaultsText.value, '默认值 JSON 无效')
  };
}

async function preview() {
  try {
    const body = payload();
    loading.value = true;
    const result = await api(`/api/scenarios/${props.scenarioKey}/datasets/migration-preview`, { method: 'POST', body: JSON.stringify(body) });
    previews.value = result.datasets || [];
    previewFingerprint.value = JSON.stringify(body);
    previewed.value = true;
  } catch (error) {
    previewed.value = false;
    ElMessage.error(error.message);
  } finally { loading.value = false; }
}

async function migrate() {
  if (!previewed.value || previewErrors.value) return ElMessage.warning('请先完成无错误的迁移预览');
  try {
    const body = payload();
    if (JSON.stringify(body) !== previewFingerprint.value) return ElMessage.warning('迁移参数已变化，请重新预览');
    saving.value = true;
    const result = await api(`/api/scenarios/${props.scenarioKey}/datasets/migrate`, { method: 'POST', body: JSON.stringify(body) });
    emit('migrated', result);
    visible.value = false;
    ElMessage.success('数据集迁移完成');
  } catch (error) { ElMessage.error(error.message); }
  finally { saving.value = false; }
}

function open(value = {}) {
  reset(value);
  visible.value = true;
  loadDatasets();
}

watch(() => props.modelValue, (value) => {
  if (visible.value === value) return;
  visible.value = value;
  if (value) open();
});
watch(visible, (value) => emit('update:modelValue', value));
watch([datasetIds, targetSchemaText, mappingsText, defaultsText], invalidatePreview, { deep: true });

defineExpose({ open, preview, migrate, invalidatePreview });
</script>

<style scoped>
.migration-body { min-height: 360px; }
.migration-form { margin-top: 14px; }
.mapping-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.preview-section { display: grid; gap: 12px; margin-top: 18px; }
.preview-header, .dataset-preview-title { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.dataset-preview { display: grid; gap: 8px; padding: 10px; border: 1px solid var(--el-border-color-lighter); border-radius: 4px; }
.error-list { display: grid; gap: 6px; }
.error-item { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
@media (max-width: 620px) { .mapping-grid { grid-template-columns: 1fr; } }
</style>
