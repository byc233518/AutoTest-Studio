<template>
  <el-dialog
    v-model="visible"
    :title="editing ? '编辑测试用例' : '新建测试用例'"
    class="scenario-form-dialog"
    width="760px"
    top="24px"
    destroy-on-close
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" v-loading="saving">
      <el-form-item label="所属目录" prop="directory">
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
          placeholder="从目录树选择，或输入新目录"
          no-data-text="暂无目录，可直接输入新目录"
          clearable
        >
          <template #default="{ data }">
            <span class="directory-option">
              <el-icon aria-hidden="true"><Folder /></el-icon>
              <span>{{ data.label }}</span>
            </span>
          </template>
        </el-tree-select>
        <div class="field-help">可从树中选择任意层级；新目录使用“/”分隔，输入后按 Enter 确认，保存后自动加入目录树。</div>
      </el-form-item>

      <div class="config-grid compact-grid">
        <el-form-item label="用例名称" prop="name">
          <el-input v-model="form.name" maxlength="80" show-word-limit />
        </el-form-item>
        <el-form-item label="用例 key" prop="key">
          <el-input v-model="form.key" :disabled="editing" placeholder="如 sample-form-submit" />
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-select v-model="form.priority" class="wide">
            <el-option v-for="item in ['P0', 'P1', 'P2', 'P3']" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form.owner" />
        </el-form-item>
      </div>

      <el-form-item label="描述">
        <el-input v-model="form.description" type="textarea" :rows="2" />
      </el-form-item>

      <el-form-item label="数据字段">
        <div class="wide schema-editor">
          <el-table :data="form.fields" border max-height="250" size="small">
            <el-table-column label="字段名称" min-width="180">
              <template #default="{ row }"><el-input v-model="row.name" placeholder="字段名" /></template>
            </el-table-column>
            <el-table-column label="必填" width="72" align="center">
              <template #default="{ row }"><el-checkbox v-model="row.required" /></template>
            </el-table-column>
            <el-table-column label="示例值" min-width="220">
              <template #default="{ row }"><el-input v-model="row.example" placeholder="用于生成样例数据" /></template>
            </el-table-column>
            <el-table-column width="64" align="center">
              <template #default="scope">
                <el-button link type="danger" @click="form.fields.splice(scope.$index, 1)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button class="add-field" :icon="Plus" @click="form.fields.push({ name: '', required: false, example: '' })">
            增加字段
          </el-button>
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="saving" @click="save">保存</el-button>
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

const emit = defineEmits(['saved']);
const store = usePlatformStore();
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
const rules = {
  directory: [
    { required: true, message: '请选择或输入所属目录', trigger: ['change', 'blur'] },
    { validator: validateDirectory, trigger: ['change', 'blur'] }
  ],
  name: [{ required: true, message: '请输入用例名称', trigger: 'blur' }],
  key: [
    { required: true, message: '请输入用例 key', trigger: 'blur' },
    { pattern: /^[a-z0-9]+(?:-+[a-z0-9]+)*$/, message: '仅支持小写字母、数字和连字符，且不能以连字符开头或结尾', trigger: 'blur' }
  ],
  priority: [{ required: true, message: '请选择优先级', trigger: 'change' }]
};

function normalizeDirectory(value) {
  return String(value || '')
    .split('/')
    .map((item) => item.trim())
    .filter(Boolean)
    .join(' / ');
}

function validateDirectory(_rule, value, callback) {
  const parts = String(value || '').split('/').map((item) => item.trim());
  if (parts.some((item) => !item || item === '.' || item === '..')) callback(new Error('目录层级不能为空，且不能使用 . 或 ..'));
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
    ElMessage.warning('字段名称不能重复');
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
    ElMessage.success(editing.value ? '用例信息已更新' : '用例已创建');
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
