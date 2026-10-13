<template>
  <div class="page">
    <el-card class="management-card">
      <template #header>
        <div class="card-header">
          <div>
            <h2>{{ title }}</h2>
            <span class="muted">{{ description }}</span>
          </div>
          <div>
            <el-tag v-if="readonly" type="info" effect="plain">{{ t('managementTable.readonly') }}</el-tag>
            <el-button v-else type="primary" :icon="Plus" @click="openCreate">{{ t('managementTable.create') }}</el-button>
          </div>
        </div>
      </template>
      <el-table :data="rows" height="calc(100vh - 210px)" :empty-text="t('managementTable.empty')">
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :min-width="column.minWidth"
          :width="column.width"
        >
          <template v-if="column.format" #default="{ row }">{{ column.format(row) }}</template>
        </el-table-column>
        <el-table-column v-if="!readonly" :label="t('common.actions')" width="150" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="openEdit(row)">{{ t('common.edit') }}</el-button>
            <el-button link type="danger" @click="remove(row)">{{ t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="editingId ? t('managementTable.editTitle', { name: itemName }) : t('managementTable.createTitle', { name: itemName })"
      width="min(560px, 92vw)"
      destroy-on-close
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item v-for="field in fields" :key="field.prop" :label="field.label" :prop="field.prop">
          <el-select v-if="field.type === 'select'" v-model="form[field.prop]" class="wide">
            <el-option
              v-for="option in field.options || []"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <el-input-number v-else-if="field.type === 'number'" v-model="form[field.prop]" :min="0" class="wide" />
          <el-input
            v-else
            v-model="form[field.prop]"
            :type="field.type === 'textarea' ? 'textarea' : 'text'"
            :rows="3"
            :placeholder="field.placeholder"
          />
        </el-form-item>
      </el-form>
      <el-alert v-if="error" :title="error" type="error" show-icon :closable="false" />
      <template #footer>
        <el-button @click="dialogVisible = false">{{ t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="saving" @click="submit">{{ t('common.savePlain') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { useI18n } from '../i18n';

const { t } = useI18n();

const props = defineProps({
  title: String,
  description: String,
  itemName: String,
  rows: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  fields: { type: Array, default: () => [] },
  readonly: Boolean,
  onSave: { type: Function, required: true },
  onDelete: { type: Function, required: true }
});

const dialogVisible = ref(false);
const editingId = ref('');
const saving = ref(false);
const formRef = ref();
const form = reactive({});
const rules = reactive({});
const error = ref('');

function reset(row = {}) {
  for (const key of Object.keys(form)) delete form[key];
  for (const key of Object.keys(rules)) delete rules[key];
  for (const field of props.fields) {
    form[field.prop] = row[field.prop] ?? field.default ?? '';
    if (field.required) {
      rules[field.prop] = [{
        required: true,
        message: t('managementTable.fieldRequired', { label: field.label }),
        trigger: field.type === 'select' ? 'change' : 'blur'
      }];
    }
  }
}

function openCreate() {
  editingId.value = '';
  error.value = '';
  reset();
  dialogVisible.value = true;
}

function openEdit(row) {
  editingId.value = row.id;
  error.value = '';
  reset(row);
  dialogVisible.value = true;
}

async function submit() {
  try {
    await formRef.value.validate();
    saving.value = true;
    await props.onSave({ ...form }, editingId.value);
    dialogVisible.value = false;
    ElMessage.success(t('managementTable.saved', { name: props.itemName }));
  } catch (e) {
    if (e instanceof Error) error.value = e.message;
  } finally {
    saving.value = false;
  }
}

async function remove(row) {
  try {
    await ElMessageBox.confirm(
      t('managementTable.deleteConfirm', { name: row.name }),
      t('managementTable.deleteTitle', { name: props.itemName }),
      {
        type: 'warning',
        confirmButtonText: t('common.delete'),
        cancelButtonText: t('common.cancel')
      }
    );
    await props.onDelete(row);
    ElMessage.success(t('managementTable.deleted', { name: props.itemName }));
  } catch (e) {
    if (e instanceof Error) ElMessage.error(e.message);
  }
}
</script>
