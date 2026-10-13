<template>
  <el-dialog
    v-model="visible"
    :title="editing ? t('scenarioForm.editTitle') : t('scenarioForm.createTitle')"
    class="scenario-form-dialog"
    width="760px"
    top="24px"
    destroy-on-close
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" v-loading="saving">
      <el-form-item :label="t('scenarioForm.directory')" prop="directory">
        <el-tree-select
          v-model="form.directory"
          class="wide"
          :data="directoryTree"
          :props="directoryTreeProps"
          node-key="directory"
          check-strictly
          filterable
          allow-create
          default-first-option
          :placeholder="t('scenarioForm.directoryPlaceholder')"
          :no-data-text="t('scenarioForm.directoryEmpty')"
          clearable
        >
          <template #default="{ data }">
            <span class="directory-option">
              <el-icon aria-hidden="true"><Folder /></el-icon>
              <span>{{ data.label }}</span>
            </span>
          </template>
        </el-tree-select>
        <div class="field-help">{{ t('scenarioForm.directoryHelp') }}</div>
      </el-form-item>

      <div class="config-grid compact-grid">
        <el-form-item :label="t('scenarioForm.name')" prop="name">
          <el-input v-model="form.name" maxlength="80" show-word-limit />
        </el-form-item>
        <el-form-item :label="t('scenarioForm.key')" prop="key">
          <el-input v-model="form.key" :disabled="editing" :placeholder="t('scenarioForm.keyPlaceholder')" />
        </el-form-item>
        <el-form-item :label="t('scenarioForm.priority')" prop="priority">
          <el-select v-model="form.priority" class="wide">
            <el-option v-for="item in ['P0', 'P1', 'P2', 'P3']" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('scenarioForm.owner')">
          <el-input v-model="form.owner" />
        </el-form-item>
      </div>

      <el-form-item :label="t('scenarioForm.description')">
        <el-input v-model="form.description" type="textarea" :rows="2" />
      </el-form-item>

      <el-form-item :label="t('scenarioForm.dataFields')">
        <div class="wide schema-editor">
          <el-table :data="form.fields" border max-height="250" size="small">
            <el-table-column :label="t('scenarioForm.fieldName')" min-width="180">
              <template #default="{ row }"><el-input v-model="row.name" :placeholder="t('scenarioForm.fieldNamePlaceholder')" /></template>
            </el-table-column>
            <el-table-column :label="t('scenarioForm.required')" width="72" align="center">
              <template #default="{ row }"><el-checkbox v-model="row.required" /></template>
            </el-table-column>
            <el-table-column :label="t('scenarioForm.exampleValue')" min-width="220">
              <template #default="{ row }"><el-input v-model="row.example" :placeholder="t('scenarioForm.examplePlaceholder')" /></template>
            </el-table-column>
            <el-table-column width="64" align="center">
              <template #default="scope">
                <el-button link type="danger" @click="form.fields.splice(scope.$index, 1)">{{ t('common.remove') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button class="add-field" :icon="Plus" @click="form.fields.push({ name: '', required: false, example: '' })">
            {{ t('scenarioForm.addField') }}
          </el-button>
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">{{ t('common.cancel') }}</el-button>
      <el-button type="primary" :loading="saving" @click="save">{{ t('common.savePlain') }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { Folder, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { api } from '../api';
import { buildScenarioDirectoryTree } from '../scenario-menu-tree';
import { usePlatformStore } from '../stores/platform';
import { useI18n } from '../i18n';

const emit = defineEmits(['saved']);
const store = usePlatformStore();
const { t } = useI18n();
const visible = ref(false);
const editing = ref(false);
const saving = ref(false);
const formRef = ref();
const sourceScenario = ref(null);
const form = reactive({
  directory: '',
  name: '',
  key: '',
  priority: 'P2',
  owner: '',
  description: '',
  fields: []
});
const directoryTree = computed(() => buildScenarioDirectoryTree(store.scenarios));
const directoryTreeProps = { value: 'directory', label: 'directory', children: 'children' };
const rules = computed(() => ({
  directory: [
    { required: true, message: t('scenarioForm.validationDirectory'), trigger: ['change', 'blur'] },
    { validator: validateDirectory, trigger: ['change', 'blur'] }
  ],
  name: [{ required: true, message: t('scenarioForm.validationName'), trigger: 'blur' }],
  key: [
    { required: true, message: t('scenarioForm.validationKey'), trigger: 'blur' },
    { pattern: /^[a-z0-9]+(?:-+[a-z0-9]+)*$/, message: t('scenarioForm.validationKeyPattern'), trigger: 'blur' }
  ],
  priority: [{ required: true, message: t('scenarioForm.validationPriority'), trigger: 'change' }]
}));

function normalizeDirectory(value) {
  return String(value || '')
    .split('/')
    .map((item) => item.trim())
    .filter(Boolean)
    .join(' / ');
}

function validateDirectory(_rule, value, callback) {
  const parts = String(value || '').split('/').map((item) => item.trim());
  if (parts.some((item) => !item || item === '.' || item === '..')) callback(new Error(t('scenarioForm.invalidDirectoryParts')));
  else callback();
}

function open(item = null) {
  sourceScenario.value = item;
  editing.value = Boolean(item);
  Object.assign(form, {
    directory: item?.directory || item?.module || '',
    name: item?.name || '',
    key: item?.key || '',
    priority: item?.priority || 'P2',
    owner: item?.owner || store.user?.displayName || '',
    description: item?.description || '',
    fields: (item?.dataSchema?.columns || []).map((name) => ({
      name,
      required: (item.dataSchema.required || []).includes(name),
      example: item.dataSchema.example?.[name] ?? ''
    }))
  });
  visible.value = true;
}

async function save() {
  if (!await formRef.value.validate().catch(() => false)) return;
  const fields = form.fields
    .map((item) => ({ ...item, name: item.name.trim() }))
    .filter((item) => item.name);
  if (new Set(fields.map((item) => item.name)).size !== fields.length) {
    ElMessage.warning(t('scenarioForm.duplicateField'));
    return;
  }
  const directory = normalizeDirectory(form.directory);
  const body = {
    appId: sourceScenario.value?.appId || '',
    moduleId: sourceScenario.value?.moduleId || '',
    module: directory,
    directory,
    name: form.name.trim(),
    key: form.key.trim(),
    priority: form.priority,
    owner: form.owner.trim(),
    description: form.description.trim(),
    dataSchema: {
      columns: fields.map((item) => item.name),
      required: fields.filter((item) => item.required).map((item) => item.name),
      example: Object.fromEntries(fields.map((item) => [item.name, item.example]))
    }
  };
  saving.value = true;
  try {
    const result = await api(editing.value ? `/api/scenarios/${form.key}` : '/api/scenarios', {
      method: editing.value ? 'PUT' : 'POST',
      body: JSON.stringify(body)
    });
    visible.value = false;
    emit('saved', result);
    ElMessage.success(editing.value ? t('scenarioForm.updated') : t('scenarioForm.created'));
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    saving.value = false;
  }
}

defineExpose({ open });
</script>

<style scoped>
.compact-grid { gap: 0 16px; }
.field-help { margin-top: 5px; color: var(--el-text-color-secondary); font-size: 12px; line-height: 1.4; }
.directory-option { display: flex; min-width: 0; align-items: center; gap: 7px; }
.directory-option > span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.schema-editor { min-width: 0; }
.add-field { margin-top: 8px; }
:global(.scenario-form-dialog) { display: flex; max-height: calc(100vh - 48px); margin-bottom: 24px; flex-direction: column; overflow: hidden; }
:global(.scenario-form-dialog .el-dialog__header),
:global(.scenario-form-dialog .el-dialog__footer) { flex: 0 0 auto; }
:global(.scenario-form-dialog .el-dialog__body) { min-height: 0; padding-top: 12px; padding-bottom: 8px; flex: 1 1 auto; overflow-y: auto; }
</style>
