<template>
  <el-dialog v-model="visible" title="字段合约同步" width="min(980px, 96vw)" destroy-on-close>
    <div v-loading="loading" class="sync-body">
      <el-alert v-if="loadError" :title="loadError" type="error" show-icon :closable="false" />
      <el-form label-position="top" class="sync-form">
        <el-form-item label="解决方式">
          <el-radio-group v-model="resolution">
            <el-radio-button value="platform">以平台字段为准</el-radio-button>
            <el-radio-button value="script">以脚本字段为准</el-radio-button>
            <el-radio-button value="merge">合并字段</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div class="schema-columns">
        <section><strong>平台字段</strong><el-tag v-for="field in platformFields" :key="field.key" effect="plain">{{ field.label || field.key }}</el-tag><el-empty v-if="!platformFields.length" description="暂无字段" /></section>
        <section><strong>脚本字段</strong><el-tag v-for="field in scriptFields" :key="field.key" effect="plain" type="info">{{ field.label || field.key }}</el-tag><el-empty v-if="!scriptFields.length" description="暂无字段" /></section>
      </div>

      <el-form v-if="resolution === 'merge'" label-position="top" class="merge-form">
        <el-form-item label="合并字段 JSON"><el-input v-model="targetSchemaText" type="textarea" :rows="6" placeholder='{"columns":["code"],"required":[],"example":{}}' /></el-form-item>
      </el-form>

      <el-table :data="mappings" border max-height="280" empty-text="没有需要映射的字段">
        <el-table-column prop="from" label="脚本字段" min-width="180" />
        <el-table-column label="平台字段" min-width="220"><template #default="{ row }"><el-select v-model="row.to" clearable placeholder="选择目标字段"><el-option v-for="field in platformFields" :key="field.key" :label="field.label || field.key" :value="field.key" /></el-select></template></el-table-column>
      </el-table>

      <div v-if="conflicts.length" class="conflict-list">
        <strong>冲突位置</strong>
        <el-alert v-for="(conflict, index) in conflicts" :key="`${index}-${conflict.line}-${conflict.column}`" :title="formatConflict(conflict)" type="warning" show-icon :closable="false" />
      </div>
    </div>
    <template #footer><el-button @click="visible = false">取消</el-button><el-button type="primary" :loading="saving" @click="save">同步字段</el-button></template>
  </el-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { api } from '../api';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  scenarioKey: { type: String, default: '' }
});
const emit = defineEmits(['update:modelValue', 'synced', 'migrationRequired']);
const visible = ref(props.modelValue);
const loading = ref(false);
const saving = ref(false);
const loadError = ref('');
const resolution = ref('platform');
const contract = ref({ platformSchema: {}, scriptSchema: {}, diff: {}, conflicts: [] });
const mappings = ref([]);
const targetSchemaText = ref('');

const platformFields = computed(() => contract.value.platformSchema?.fields || fieldsFromSchema(contract.value.platformSchema));
const scriptFields = computed(() => contract.value.scriptSchema?.fields || fieldsFromSchema(contract.value.scriptSchema));
const conflicts = computed(() => [...(contract.value.conflicts || []), ...(contract.value.diff?.conflicts || [])]);

function fieldsFromSchema(schema) {
  return (schema?.columns || []).map((key) => ({ key, label: schema?.fields?.find((item) => item.key === key)?.label || key }));
}

function makeMappings() {
  const platform = new Set(platformFields.value.map((item) => item.key));
  mappings.value = scriptFields.value
    .filter((field) => !platform.has(field.key))
    .map((field) => ({ from: field.key, to: '' }));
}

async function load(key = props.scenarioKey) {
  if (!key) return;
  loading.value = true;
  loadError.value = '';
  try {
    contract.value = await api(`/api/scenarios/${key}/contract`);
    targetSchemaText.value = JSON.stringify(contract.value.platformSchema || {}, null, 2);
    makeMappings();
  } catch (error) {
    loadError.value = error.message;
  } finally {
    loading.value = false;
  }
}

function open(key = props.scenarioKey) {
  visible.value = true;
  resolution.value = 'platform';
  load(key);
}

function parseTargetSchema() {
  if (resolution.value !== 'merge') return contract.value.platformSchema;
  try { return JSON.parse(targetSchemaText.value); } catch { throw new Error('合并字段 JSON 无效'); }
}

function formatConflict(conflict = {}) {
  return `${conflict.kind || 'unknown'} | 第 ${conflict.line ?? '-'} 行 | 第 ${conflict.column ?? '-'} 列 | ${conflict.message || '脚本冲突'}`;
}

async function save() {
  const key = props.scenarioKey;
  if (!key) return ElMessage.error('场景 key 不存在');
  saving.value = true;
  try {
    const result = await api(`/api/scenarios/${key}/contract`, {
      method: 'PUT',
      body: JSON.stringify({ resolution: resolution.value, targetSchema: parseTargetSchema(), mappings: mappings.value.filter((item) => item.to) })
    });
    emit('synced', result);
    visible.value = false;
    ElMessage.success('字段合约已同步');
  } catch (error) {
    if (error.status === 409 && error.data?.code === 'MIGRATION_REQUIRED') {
      emit('migrationRequired', error.data);
      visible.value = false;
      ElMessage.warning(error.message);
      return;
    }
    if (error.status === 409 && Array.isArray(error.data?.conflicts)) {
      contract.value = { ...contract.value, conflicts: error.data.conflicts };
    }
    ElMessage.error(error.message);
  } finally {
    saving.value = false;
  }
}

watch(() => props.modelValue, (value) => {
  if (visible.value === value) return;
  visible.value = value;
  if (value) load();
});
watch(visible, (value) => emit('update:modelValue', value));

defineExpose({ open, load });
</script>

<style scoped>
.sync-body { min-height: 300px; }
.sync-form { margin-top: 14px; }
.schema-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 14px 0; }
.schema-columns section { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; min-width: 0; padding: 10px; border: 1px solid var(--el-border-color-lighter); border-radius: 4px; }
.schema-columns strong { width: 100%; }
.schema-columns :deep(.el-empty) { width: 100%; padding: 10px 0; }
.merge-form { margin-top: 12px; }
.conflict-list { display: grid; gap: 8px; margin-top: 14px; }
@media (max-width: 620px) { .schema-columns { grid-template-columns: 1fr; } .sync-form :deep(.el-radio-group) { display: grid; grid-template-columns: 1fr; gap: 6px; } }
</style>
