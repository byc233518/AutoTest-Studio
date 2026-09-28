<template>
  <section class="environment-page" aria-label="环境管理">
    <header class="environment-toolbar">
      <div><h2>环境管理</h2><span>维护被测系统、测试账号与环境变量</span></div>
      <el-button :icon="Plus" :disabled="busy" @click="createEnvironment">新增环境</el-button>
    </header>

    <div class="environment-layout">
      <aside class="environment-list" aria-label="环境列表">
        <div class="list-search">
          <el-input v-model="search" :prefix-icon="Search" clearable placeholder="搜索名称、标识或地址" aria-label="搜索环境" />
          <span class="list-count">{{ store.environments.length }} 个环境</span>
        </div>
        <div class="environment-items">
          <button v-for="environment in filteredEnvironments" :key="environment.id" type="button"
            :class="['environment-item', { selected: !creating && selectedId === environment.id }]"
            :aria-pressed="!creating && selectedId === environment.id" :disabled="busy" @click="selectEnvironment(environment)">
            <span class="environment-name"><strong>{{ environment.name }}</strong><el-tag v-if="environment.isDefault" size="small" effect="plain">默认</el-tag></span>
            <span class="environment-key">{{ environment.key }}</span>
            <span class="environment-url" :title="environment.baseUrl">{{ environment.baseUrl }}</span>
          </button>
          <el-empty v-if="!filteredEnvironments.length" :image-size="56" :description="search ? '没有匹配的环境' : '暂无环境'" />
        </div>
      </aside>

      <section class="environment-editor" aria-label="环境配置">
        <template v-if="selectedId || creating">
          <header class="editor-header">
            <div><h3>{{ creating ? '新增环境' : selectedEnvironment?.name || '编辑环境' }}</h3><span v-if="dirty" class="unsaved">有未保存的修改</span></div>
            <el-button v-if="!creating" type="danger" plain :disabled="busy || selectedEnvironment?.isDefault" :loading="deleting"
              :title="selectedEnvironment?.isDefault ? '请先将其他环境设为默认后再删除' : '删除当前环境'" @click="removeEnvironment">删除环境</el-button>
          </header>

          <div class="editor-content">
            <el-alert v-if="error" class="editor-alert" :title="error" type="error" show-icon :closable="false" />
            <el-form ref="formRef" :model="form" :rules="rules" :disabled="busy" label-position="top" @submit.prevent="save">
              <div class="section-heading"><h4>连接与账号</h4><span>执行测试时使用当前环境配置</span></div>
              <div class="environment-fields">
                <el-form-item label="环境名称" prop="name"><el-input v-model="form.name" placeholder="例如：集成测试环境" maxlength="100" /></el-form-item>
                <el-form-item label="环境标识" prop="key"><el-input v-model="form.key" placeholder="例如：test" /></el-form-item>
                <el-form-item label="被测系统地址" prop="baseUrl" class="full-width"><el-input v-model="form.baseUrl" placeholder="http://localhost:8080" /></el-form-item>
                <el-form-item label="测试账号" prop="username"><el-input v-model="form.username" autocomplete="username" /></el-form-item>
                <el-form-item :label="creating ? '测试密码' : '更新密码'" prop="password">
                  <el-input v-model="form.password" type="password" show-password autocomplete="new-password" :placeholder="creating ? '请输入测试账号密码' : '留空保留已保存密码'" />
                  <div v-if="!creating" class="field-help">留空不会修改已保存密码</div>
                </el-form-item>
                <el-form-item label="默认环境" prop="isDefault"><el-switch v-model="form.isDefault" active-text="新建执行时默认选用" /></el-form-item>
                <el-form-item label="显示顺序" prop="sort"><el-input-number v-model="form.sort" :min="0" :precision="0" controls-position="right" /></el-form-item>
              </div>

              <div class="section-heading variables-heading">
                <div><h4>全局变量 <span class="variable-count">{{ form.variables.length }}</span></h4><span>供当前环境的测试用例和测试计划使用</span></div>
                <el-button :icon="Plus" @click="addVariable">添加变量</el-button>
              </div>
              <el-alert v-if="variableLoadError" class="editor-alert" type="error" show-icon :closable="false">
                <template #title>{{ variableLoadError }}</template>
                <el-button link type="danger" :disabled="busy" @click="resetInvalidVariables">清空并重新维护变量</el-button>
              </el-alert>
              <el-table :data="form.variables" border size="small" class="variables-table" row-key="id" empty-text="暂无变量，点击“添加变量”开始维护">
                <el-table-column type="index" label="#" width="48" />
                <el-table-column label="变量名" min-width="180">
                  <template #default="{ row, $index }">
                    <el-form-item :error="variableErrors[row.id] || ''" class="variable-field">
                      <el-input v-model="row.key" :aria-label="`第 ${$index + 1} 行变量名`" placeholder="例如：warehouseCode" @blur="validateVariables" @input="clearVariableError(row.id)" />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="变量值" min-width="240">
                  <template #default="{ row, $index }"><el-input v-model="row.value" :aria-label="`第 ${$index + 1} 行变量值`" placeholder="输入变量值，允许留空" /></template>
                </el-table-column>
                <el-table-column label="操作" width="74" align="center">
                  <template #default="{ row, $index }"><el-button link type="danger" :aria-label="`删除第 ${$index + 1} 行变量`" @click="removeVariable(row.id)">删除</el-button></template>
                </el-table-column>
              </el-table>
            </el-form>
          </div>

          <footer class="editor-footer">
            <span class="save-hint">{{ creating ? '保存后可用于录制和执行测试' : selectedEnvironment?.isDefault ? '当前为默认执行环境' : '修改仅在保存后生效' }}</span>
            <div><el-button :disabled="busy" @click="discardChanges">{{ creating ? '取消' : '还原修改' }}</el-button><el-button type="primary" :disabled="busy || Boolean(variableLoadError)" :loading="saving" @click="save">保存环境</el-button></div>
          </footer>
        </template>
        <el-empty v-else description="选择一个环境，或新增环境" />
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Search } from '@element-plus/icons-vue';
import { api } from '../api';
import { usePlatformStore } from '../stores/platform';

const store = usePlatformStore();
const search = ref('');
const selectedId = ref('');
const creating = ref(false);
const saving = ref(false);
const deleting = ref(false);
const error = ref('');
const variableLoadError = ref('');
const variableErrors = ref({});
const savedSnapshot = ref('');
const formRef = ref();
const form = reactive({ name: '', key: '', baseUrl: '', username: '', password: '', isDefault: false, sort: 99, variables: [] });
let nextVariableId = 0;

const busy = computed(() => saving.value || deleting.value);
const selectedEnvironment = computed(() => store.environments.find(item => item.id === selectedId.value));
const dirty = computed(() => savedSnapshot.value !== '' && JSON.stringify(form) !== savedSnapshot.value);
const filteredEnvironments = computed(() => {
  const query = search.value.trim().toLowerCase();
  return store.environments.filter(item => !query || [item.name, item.key, item.baseUrl].some(value => String(value || '').toLowerCase().includes(query)));
});
const rules = {
  name: [{ required: true, whitespace: true, message: '请填写环境名称', trigger: 'blur' }],
  key: [{ required: true, whitespace: true, message: '请填写环境标识', trigger: 'blur' }],
  username: [{ required: true, whitespace: true, message: '请填写测试账号', trigger: 'blur' }],
  baseUrl: [{ validator: (_rule, value, callback) => {
    try {
      const url = new URL(String(value).trim());
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
      callback();
    } catch { callback(new Error('请输入完整的 HTTP 或 HTTPS 地址')); }
  }, trigger: 'blur' }],
  password: [{ validator: (_rule, value, callback) => callback(creating.value && !value ? new Error('请填写测试密码') : undefined), trigger: 'blur' }]
};

function readVariables(environment) {
  let values = environment.variables ?? environment.variablesJson ?? environment.variables_json ?? [];
  if (typeof values === 'string') values = values.trim() ? JSON.parse(values) : [];
  if (values === null) values = [];
  if (!Array.isArray(values) && typeof values === 'object') values = Object.entries(values).map(([key, value]) => ({ key, value }));
  if (!Array.isArray(values) || values.some(item => !item || typeof item !== 'object' || !Object.hasOwn(item, 'key'))) {
    throw new Error('已保存的变量格式无法读取，请检查原数据或重新维护变量');
  }
  return values.map(item => ({ id: ++nextVariableId, key: String(item.key ?? ''), value: typeof item.value === 'object' && item.value !== null ? JSON.stringify(item.value) : String(item.value ?? '') }));
}

function fillForm(environment = {}) {
  error.value = '';
  variableErrors.value = {};
  variableLoadError.value = '';
  let variables = [];
  try { variables = readVariables(environment); }
  catch { variableLoadError.value = '已保存的变量格式无法读取，请检查原数据或重新维护变量'; }
  Object.assign(form, {
    name: environment.name || '', key: environment.key || '', baseUrl: environment.baseUrl || '',
    username: environment.username || '', password: '', isDefault: Boolean(environment.isDefault),
    sort: environment.sort ?? 99, variables
  });
  savedSnapshot.value = JSON.stringify(form);
  nextTick(() => formRef.value?.clearValidate());
}

function activate(environment) {
  creating.value = false;
  selectedId.value = environment?.id || '';
  fillForm(environment);
}

watch(() => store.environments, environments => {
  if (!creating.value && !selectedId.value && environments.length) activate(environments.find(item => item.isDefault) || environments[0]);
}, { immediate: true });

async function canDiscard() {
  if (!dirty.value) return true;
  try {
    await ElMessageBox.confirm('当前环境有未保存的修改，确定放弃这些修改吗？', '未保存的修改', { confirmButtonText: '放弃修改', cancelButtonText: '继续编辑', type: 'warning' });
    return true;
  } catch { return false; }
}

async function selectEnvironment(environment) {
  if (busy.value || (!creating.value && environment.id === selectedId.value) || !await canDiscard()) return;
  activate(environment);
}

async function createEnvironment() {
  if (busy.value || !await canDiscard()) return;
  creating.value = true;
  selectedId.value = '';
  fillForm({ isDefault: store.environments.length === 0 });
}

async function discardChanges() {
  if (busy.value || !await canDiscard()) return;
  if (creating.value) activate(store.environments.find(item => item.isDefault) || store.environments[0]);
  else fillForm(selectedEnvironment.value);
}

function addVariable() {
  form.variables.push({ id: ++nextVariableId, key: '', value: '' });
}

function removeVariable(id) {
  form.variables = form.variables.filter(item => item.id !== id);
  validateVariables();
}

function clearVariableError(id) {
  delete variableErrors.value[id];
}

function validateVariables() {
  const errors = {};
  const keys = new Map();
  for (const item of form.variables) {
    const key = item.key.trim();
    if (!key) errors[item.id] = '请填写变量名';
    else if (keys.has(key)) {
      errors[item.id] = '变量名重复';
      errors[keys.get(key)] = '变量名重复';
    } else keys.set(key, item.id);
  }
  variableErrors.value = errors;
  return Object.keys(errors).length === 0;
}

async function resetInvalidVariables() {
  try {
    await ElMessageBox.confirm('保存环境后将覆盖原有变量，确定清空并重新维护吗？', '重新维护变量', { confirmButtonText: '清空变量', cancelButtonText: '取消', type: 'warning' });
    form.variables = [];
    variableLoadError.value = '';
    savedSnapshot.value = 'invalid-variables';
  } catch { /* 保留原始变量配置。 */ }
}

async function save() {
  if (busy.value || variableLoadError.value) return;
  saving.value = true;
  const variablesValid = validateVariables();
  const formValid = await formRef.value?.validate().catch(() => false);
  if (!variablesValid || !formValid) {
    error.value = '请检查标记的字段后再保存';
    saving.value = false;
    return;
  }
  error.value = '';
  const payload = {
    name: form.name.trim(), key: form.key.trim(), baseUrl: form.baseUrl.trim(), username: form.username.trim(),
    isDefault: form.isDefault, sort: form.sort ?? 99,
    variables: form.variables.map(({ key, value }) => ({ key: key.trim(), value }))
  };
  if (creating.value || form.password !== '') payload.password = form.password;
  try {
    const saved = await api(`/api/environments${creating.value ? '' : `/${encodeURIComponent(selectedId.value)}`}`, { method: creating.value ? 'POST' : 'PUT', body: JSON.stringify(payload) });
    const index = store.environments.findIndex(item => item.id === saved.id);
    if (index < 0) store.environments = [...store.environments, saved];
    else store.environments = store.environments.map(item => item.id === saved.id ? saved : item);
    activate(saved);
    ElMessage.success('环境已保存');
    await refreshEnvironments('环境已保存，但刷新列表失败');
  } catch (cause) { error.value = cause.message || '保存失败，请重试'; }
  finally { saving.value = false; }
}

async function refreshEnvironments(message) {
  try {
    const result = await api('/api/environments');
    store.environments = result.environments;
  } catch (cause) { error.value = `${message}：${cause.message || '请稍后重新进入页面'}`; }
}

async function removeEnvironment() {
  const environment = selectedEnvironment.value;
  if (busy.value || !environment || environment.isDefault) return;
  try {
    await ElMessageBox.confirm(`确定删除环境“${environment.name}”吗？`, '删除环境', { confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning' });
  } catch { return; }
  deleting.value = true;
  error.value = '';
  try {
    await api(`/api/environments/${encodeURIComponent(environment.id)}`, { method: 'DELETE' });
    store.environments = store.environments.filter(item => item.id !== environment.id);
    activate(store.environments.find(item => item.isDefault) || store.environments[0]);
    ElMessage.success('环境已删除');
    await refreshEnvironments('环境已删除，但刷新列表失败');
  } catch (cause) { error.value = cause.message || '删除失败，请重试'; }
  finally { deleting.value = false; }
}
</script>

<style scoped>
.environment-page { height: 100%; min-height: 0; display: flex; flex-direction: column; gap: 12px; }
.environment-toolbar, .editor-header, .editor-footer, .section-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.environment-toolbar { flex: none; }
.environment-toolbar h2 { margin: 0 0 3px; font-size: 17px; line-height: 24px; }
.environment-toolbar span, .section-heading span, .field-help, .save-hint, .list-count { color: var(--el-text-color-regular); font-size: 12px; }
.environment-layout { flex: 1; min-height: 0; display: grid; grid-template-columns: minmax(220px, 26%) minmax(0, 1fr); gap: 12px; }
.environment-list, .environment-editor { min-height: 0; min-width: 0; border: 1px solid var(--el-border-color-light); border-radius: 8px; background: var(--el-bg-color); display: flex; flex-direction: column; overflow: hidden; }
.list-search { padding: 12px; border-bottom: 1px solid var(--el-border-color-lighter); }
.list-count { display: block; margin-top: 9px; }
.environment-items { overflow: auto; padding: 6px; flex: 1; min-height: 0; }
.environment-item { display: flex; flex-direction: column; gap: 5px; width: 100%; margin-bottom: 4px; padding: 11px 10px; border: 1px solid transparent; border-radius: 6px; background: transparent; color: var(--el-text-color-primary); text-align: left; cursor: pointer; font: inherit; }
.environment-item:hover { background: var(--el-fill-color-light); }
.environment-item.selected { border-color: var(--el-color-primary-light-5); background: var(--el-color-primary-light-9); }
.environment-item:focus-visible { outline: 2px solid var(--el-color-primary); outline-offset: -2px; }
.environment-item:disabled { cursor: wait; }
.environment-name { display: flex; align-items: center; justify-content: space-between; gap: 6px; font-size: 14px; }
.environment-name strong { min-width: 0; overflow-wrap: anywhere; }
.environment-key { font-family: Consolas, monospace; font-size: 12px; color: var(--el-text-color-regular); overflow-wrap: anywhere; }
.environment-url { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--el-text-color-regular); font-size: 12px; line-height: 18px; }
.editor-header { flex: none; padding: 12px 16px; border-bottom: 1px solid var(--el-border-color-lighter); min-height: 58px; }
.editor-header > div { display: flex; align-items: center; min-width: 0; gap: 10px; }
.editor-header h3 { margin: 0; font-size: 15px; overflow-wrap: anywhere; }
.unsaved { color: var(--el-text-color-regular); font-size: 12px; white-space: nowrap; }
.editor-content { flex: 1; min-height: 0; overflow: auto; padding: 16px; }
.editor-alert { margin-bottom: 12px; }
.section-heading { margin-bottom: 12px; }
.section-heading h4 { margin: 0; font-size: 13px; line-height: 22px; }
.environment-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 16px; }
.environment-fields :deep(.el-form-item) { margin-bottom: 16px; }
.environment-fields :deep(.el-form-item__label) { padding-bottom: 5px; line-height: 18px; font-size: 13px; }
.full-width { grid-column: 1 / -1; }
.field-help { margin-top: 4px; line-height: 18px; }
.variables-heading { margin-top: 4px; padding-top: 14px; border-top: 1px solid var(--el-border-color-lighter); }
.variable-count { margin-left: 5px; font-weight: normal; }
.variables-table { width: 100%; }
.variables-table :deep(.cell) { padding: 0 8px; }
.variables-table :deep(.el-table__cell) { vertical-align: top; padding: 8px 0; }
.variable-field { margin: 0; }
.variable-field :deep(.el-form-item__error) { position: static; padding-top: 4px; }
.editor-footer { flex: none; padding: 12px 16px; border-top: 1px solid var(--el-border-color-light); background: var(--el-bg-color); }
.editor-footer > div { display: flex; flex: none; gap: 8px; }
.editor-footer :deep(.el-button + .el-button) { margin-left: 0; }
.save-hint { overflow-wrap: anywhere; }
</style>
