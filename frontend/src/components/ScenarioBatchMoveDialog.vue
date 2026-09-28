<template>
  <el-dialog
    v-model="visible"
    title="批量移动目录"
    width="620px"
    top="7vh"
    append-to-body
    destroy-on-close
    :close-on-click-modal="false"
  >
    <div v-loading="moving" class="batch-move-body">
      <div class="selection-summary">
        <strong>已选择 {{ scenarioIds.length }} 个用例</strong>
        <span>{{ scenarioNames }}</span>
      </div>

      <el-form label-position="top">
        <el-form-item label="目标目录" required>
          <el-input
            v-model="targetDirectory"
            maxlength="160"
            clearable
            placeholder="选择已有目录，或输入新目录"
            @blur="normalizeTarget"
          />
        </el-form-item>
      </el-form>

      <div class="directory-picker" aria-label="目标目录树">
        <div class="directory-picker-heading">
          <strong>已有目录</strong>
          <span>{{ directoryCount }} 个</span>
        </div>
        <el-scrollbar max-height="360px">
          <el-tree
            ref="treeRef"
            :data="directoryTree"
            node-key="id"
            :current-node-key="currentDirectoryId"
            :default-expanded-keys="directoryTree.map((node) => node.id)"
            :indent="16"
            highlight-current
            empty-text="当前项目暂无目录"
            @node-click="selectDirectory"
          >
            <template #default="{ data }">
              <span class="directory-node">
                <el-icon aria-hidden="true"><FolderOpened /></el-icon>
                <span>{{ data.label }}</span>
                <small>{{ data.scenarioCount }}</small>
              </span>
            </template>
          </el-tree>
        </el-scrollbar>
      </div>
    </div>

    <template #footer>
      <el-button :disabled="moving" @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="moving" :disabled="!targetDirectory.trim()" @click="moveScenarios">
        移动 {{ scenarioIds.length }} 个用例
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue';
import { FolderOpened } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { api } from '../api';
import { buildScenarioDirectoryTree } from '../scenario-menu-tree';
import { usePlatformStore } from '../stores/platform';

const emit = defineEmits(['moved']);
const store = usePlatformStore();
const visible = ref(false);
const moving = ref(false);
const selectedScenarios = ref([]);
const targetDirectory = ref('');
const treeRef = ref();

const scenarioIds = computed(() => selectedScenarios.value.map((item) => item.id || item.key).filter(Boolean));
const scenarioNames = computed(() => {
  const names = selectedScenarios.value.slice(0, 3).map((item) => item.name).filter(Boolean);
  return `${names.join('、')}${selectedScenarios.value.length > names.length ? ` 等 ${selectedScenarios.value.length} 个` : ''}`;
});
const directoryTree = computed(() => buildScenarioDirectoryTree(store.scenarios));
const flatDirectories = computed(() => {
  const values = [];
  const visit = (nodes) => {
    for (const node of nodes) {
      values.push(node);
      visit(node.children || []);
    }
  };
  visit(directoryTree.value);
  return values;
});
const directoryCount = computed(() => flatDirectories.value.length);
const currentDirectoryId = computed(() => flatDirectories.value.find((item) => item.directory === targetDirectory.value)?.id || '');

function normalizeDirectory(value) {
  const parts = String(value || '')
    .replaceAll('\\', '/')
    .split('/')
    .map((item) => item.trim())
    .filter(Boolean);
  if (!parts.length) throw new Error('请选择或输入目标目录');
  if (parts.some((item) => item === '.' || item === '..')) throw new Error('目录不能使用 . 或 ..');
  return parts.join(' / ');
}

function normalizeTarget() {
  if (!targetDirectory.value.trim()) return;
  try {
    targetDirectory.value = normalizeDirectory(targetDirectory.value);
  } catch (error) {
    ElMessage.warning(error.message);
  }
}

function selectDirectory(node) {
  if (node.type !== 'directory') return;
  targetDirectory.value = node.directory;
}

async function open(rows) {
  selectedScenarios.value = [...rows];
  const directories = new Set(rows.map((item) => item.directory || item.module || '未分类'));
  targetDirectory.value = directories.size === 1 ? [...directories][0] : '';
  visible.value = true;
  await nextTick();
  if (currentDirectoryId.value) treeRef.value?.setCurrentKey(currentDirectoryId.value);
}

function close() {
  visible.value = false;
  selectedScenarios.value = [];
  targetDirectory.value = '';
}

async function moveScenarios() {
  try {
    const directory = normalizeDirectory(targetDirectory.value);
    moving.value = true;
    const result = await api('/api/scenarios/batch/move', {
      method: 'POST',
      body: JSON.stringify({ scenarioIds: scenarioIds.value, directory })
    });
    visible.value = false;
    emit('moved', result);
  } catch (error) {
    ElMessage.error(error.message || '批量移动失败');
  } finally {
    moving.value = false;
  }
}

defineExpose({ open, close });
</script>

<style scoped>
.batch-move-body { display: grid; gap: 14px; }
.selection-summary { min-width: 0; display: flex; align-items: baseline; gap: 10px; }
.selection-summary strong { flex: none; font-size: 14px; }
.selection-summary span { overflow: hidden; color: var(--el-text-color-secondary); font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.batch-move-body :deep(.el-form-item) { margin-bottom: 0; }
.directory-picker { overflow: hidden; border: 1px solid var(--el-border-color); border-radius: 6px; }
.directory-picker-heading { height: 38px; padding: 0 11px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--el-border-color-lighter); }
.directory-picker-heading span { color: var(--el-text-color-secondary); font-size: 12px; }
.directory-picker :deep(.el-scrollbar__view) { padding: 6px; }
.directory-picker :deep(.el-tree-node__content) { height: 30px; }
.directory-node { min-width: 0; width: 100%; display: grid; grid-template-columns: 16px minmax(0, 1fr) auto; align-items: center; gap: 7px; }
.directory-node > span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.directory-node small { padding-right: 6px; color: var(--el-text-color-secondary); font-size: 11px; }
</style>
