<template>
  <div v-if="desktop" class="project-switcher">
    <el-popover v-model:visible="open" placement="bottom-start" :width="400" trigger="click">
      <template #reference>
        <button class="project-trigger" type="button" :aria-expanded="open" aria-label="切换项目">
          <el-icon><FolderOpened /></el-icon>
          <span>
            <small>当前项目</small>
            <strong>{{ current?.name || store.project?.name || '加载中' }}</strong>
          </span>
          <el-icon class="project-chevron"><ArrowDown /></el-icon>
        </button>
      </template>

      <div class="project-panel" v-loading="loading">
        <div class="project-panel-title">
          <strong>项目</strong>
          <button v-if="current" type="button" class="project-reveal" @click="revealCurrent">打开目录</button>
        </div>
        <div class="project-list">
          <div
            v-for="project in projects"
            :key="project.id"
            class="project-option"
            :class="{ active: project.id === current?.id }"
            role="button"
            tabindex="0"
            @click="switchProject(project)"
            @keydown.enter="switchProject(project)"
          >
            <el-icon><Folder /></el-icon>
            <span>
              <strong>{{ project.name }}</strong>
              <small>{{ project.rootPath }}</small>
            </span>
            <el-icon v-if="project.id === current?.id" class="selected-icon"><Select /></el-icon>
            <button
              v-else
              type="button"
              class="project-remove"
              aria-label="移除项目"
              @click.stop="openRemove(project)"
            >
              <el-icon><Delete /></el-icon>
            </button>
          </div>
        </div>
        <div class="project-panel-actions">
          <el-button :icon="Plus" @click="openCreate">新建项目</el-button>
          <el-button :icon="FolderAdd" @click="registerProject">打开已有项目</el-button>
          <el-button :icon="Upload" :loading="importing" @click="importProject">导入项目</el-button>
          <el-button :icon="Download" :loading="exporting" :disabled="!current" @click="exportProject">导出项目</el-button>
        </div>
      </div>
    </el-popover>

    <el-dialog v-model="createVisible" title="新建本地项目" width="540px" append-to-body>
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" maxlength="40" show-word-limit @input="refreshSuggestion" />
        </el-form-item>
        <el-form-item label="保存位置">
          <p class="create-hint">默认保存在安装目录下的 <code>projects</code> 文件夹，也可指定其它空目录。</p>
          <el-input v-model="form.rootPath" readonly :placeholder="suggestedRoot || '安装目录/projects/项目名称'">
            <template #append>
              <el-button :icon="FolderOpened" @click="chooseDirectory">指定目录</el-button>
            </template>
          </el-input>
          <el-button v-if="form.rootPath" class="clear-path" link type="primary" @click="form.rootPath = ''">改回默认位置</el-button>
        </el-form-item>
        <el-form-item label="项目说明">
          <el-input v-model="form.description" type="textarea" :rows="2" maxlength="120" show-word-limit />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="createVisible = false">取消</el-button>
        <el-button type="primary" :loading="creating" @click="createProject">创建并切换</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="removeVisible" title="移除项目" width="480px" append-to-body>
      <p>将「{{ removing?.name }}」从客户端列表移除。</p>
      <p class="remove-path">{{ removing?.rootPath }}</p>
      <el-alert
        v-if="projects.length === 1"
        title="这是当前唯一项目，请先新建或打开另一个项目后再移除。"
        type="warning"
        show-icon
        :closable="false"
      />
      <el-checkbox v-else v-model="deleteFiles">同时删除项目目录中的全部数据（不可恢复）</el-checkbox>
      <template #footer>
        <el-button @click="removeVisible = false">取消</el-button>
        <el-button
          :type="deleteFiles ? 'danger' : 'primary'"
          :loading="removingNow"
          :disabled="projects.length === 1"
          @click="confirmRemove"
        >
          {{ deleteFiles ? '删除目录并移除' : '仅从列表移除' }}
        </el-button>
      </template>
    </el-dialog>
  </div>

  <div v-else class="browser-project">
    <el-icon><FolderOpened /></el-icon>
    <span>{{ store.project?.name || '默认项目' }}</span>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { ArrowDown, Delete, Download, Folder, FolderAdd, FolderOpened, Plus, Select, Upload } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { usePlatformStore } from '../stores/platform';

const store = usePlatformStore();
const desktop = Boolean(window.autotestDesktop);
const open = ref(false);
const loading = ref(false);
const creating = ref(false);
const exporting = ref(false);
const importing = ref(false);
const removeVisible = ref(false);
const removingNow = ref(false);
const deleteFiles = ref(false);
const removing = ref(null);
const createVisible = ref(false);
const projects = ref([]);
const current = ref(null);
const suggestedRoot = ref('');
const formRef = ref();
const form = reactive({ name: '', description: '', rootPath: '' });
const rules = {
  name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }]
};

onMounted(() => {
  if (desktop) loadProjects();
});

async function loadProjects() {
  loading.value = true;
  try {
    [projects.value, current.value] = await Promise.all([
      window.autotestDesktop.listProjects(),
      window.autotestDesktop.currentProject()
    ]);
  } catch (error) {
    ElMessage.error(error.message || '项目列表加载失败');
  } finally {
    loading.value = false;
  }
}

async function switchProject(project) {
  if (project.id === current.value?.id) {
    open.value = false;
    return;
  }
  loading.value = true;
  try {
    await window.autotestDesktop.switchProject(project.id);
  } catch (error) {
    loading.value = false;
    ElMessage.error(error.message || '项目切换失败');
  }
}

async function refreshSuggestion() {
  if (!window.autotestDesktop?.suggestProjectRoot) return;
  try {
    const suggestion = await window.autotestDesktop.suggestProjectRoot({ name: form.name || '新项目' });
    suggestedRoot.value = suggestion?.rootPath || '';
  } catch {
    suggestedRoot.value = '';
  }
}

async function openCreate() {
  Object.assign(form, { name: '', description: '', rootPath: '' });
  open.value = false;
  createVisible.value = true;
  await refreshSuggestion();
}

async function chooseDirectory() {
  const rootPath = await window.autotestDesktop.chooseProjectDirectory({
    title: '选择新项目目录',
    buttonLabel: '选择目录',
    defaultPath: form.rootPath || suggestedRoot.value
  });
  if (rootPath) form.rootPath = rootPath;
}

async function createProject() {
  if (!await formRef.value.validate().catch(() => false)) return;
  creating.value = true;
  try {
    await window.autotestDesktop.createProject({
      name: form.name,
      description: form.description,
      rootPath: form.rootPath.trim(),
      activate: true
    });
  } catch (error) {
    creating.value = false;
    ElMessage.error(error.message || '项目创建失败');
  }
}

async function registerProject() {
  open.value = false;
  try {
    await window.autotestDesktop.registerProject({ activate: true });
  } catch (error) {
    ElMessage.error(error.message || '项目打开失败');
  }
}

async function revealCurrent() {
  try {
    await window.autotestDesktop.revealProject(current.value.id);
  } catch (error) {
    ElMessage.error(error.message || '无法打开项目目录');
  }
}

async function exportProject() {
  open.value = false;
  exporting.value = true;
  try {
    const result = await window.autotestDesktop.exportProject();
    if (result?.filePath) ElMessage.success(`项目已导出：${result.filePath}`);
  } catch (error) {
    ElMessage.error(error.message || '项目导出失败');
  } finally {
    exporting.value = false;
  }
}

async function importProject() {
  open.value = false;
  importing.value = true;
  try {
    const result = await window.autotestDesktop.importProject({ activate: true });
    if (result?.name) ElMessage.success(`已导入并打开项目：${result.name}`);
  } catch (error) {
    ElMessage.error(error.message || '项目导入失败');
  } finally {
    importing.value = false;
  }
}

function openRemove(project) {
  removing.value = project;
  deleteFiles.value = false;
  open.value = false;
  removeVisible.value = true;
}

async function confirmRemove() {
  if (!removing.value || projects.value.length === 1) return;
  removingNow.value = true;
  try {
    const result = await window.autotestDesktop.removeProject({
      projectId: removing.value.id,
      deleteFiles: deleteFiles.value
    });
    removeVisible.value = false;
    ElMessage.success(result?.filesDeleted ? '项目目录已删除，并已从列表移除' : '已从列表移除，项目目录仍保留');
    await loadProjects();
  } catch (error) {
    ElMessage.error(error.message || '移除项目失败');
  } finally {
    removingNow.value = false;
  }
}
</script>

<style scoped>
.project-switcher { min-width: 0; }
.project-trigger, .project-option {
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--el-text-color-primary);
  font: inherit;
  text-align: left;
  background: transparent;
  border: 0;
  cursor: pointer;
}
.project-trigger {
  width: 230px;
  height: 40px;
  padding: 4px 9px;
  gap: 9px;
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
}
.project-trigger:hover { border-color: var(--el-color-primary-light-5); background: var(--el-fill-color-light); }
.project-trigger > span { display: grid; min-width: 0; flex: 1; gap: 1px; }
.project-trigger small { color: var(--el-text-color-secondary); font-size: 10px; line-height: 1.1; }
.project-trigger strong { overflow: hidden; font-size: 13px; line-height: 1.35; text-overflow: ellipsis; white-space: nowrap; }
.project-chevron { color: var(--el-text-color-secondary); }
.project-panel { min-height: 120px; }
.project-panel-title { display: flex; align-items: baseline; justify-content: space-between; padding: 2px 4px 9px; border-bottom: 1px solid var(--el-border-color-lighter); }
.project-reveal {
  padding: 0;
  color: var(--el-color-primary);
  font: inherit;
  font-size: 12px;
  background: transparent;
  border: 0;
  cursor: pointer;
}
.project-list { display: grid; max-height: 260px; padding: 6px 0; gap: 2px; overflow: auto; }
.project-option { position: relative; min-height: 48px; padding: 6px 8px; gap: 9px; border-radius: 5px; }
.project-remove {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--el-text-color-secondary);
  background: transparent;
  border: 0;
  border-radius: 4px;
  opacity: 0.65;
  cursor: pointer;
}
.project-option:hover .project-remove, .project-remove:focus-visible { opacity: 1; }
.project-remove:hover { color: var(--el-color-danger); background: var(--el-color-danger-light-9); }
.remove-path { margin: 8px 0 14px; color: var(--el-text-color-secondary); font-size: 12px; word-break: break-all; }
.create-hint { margin: 0 0 8px; color: var(--el-text-color-secondary); font-size: 12px; line-height: 1.5; }
.create-hint code { font-size: 12px; }
.clear-path { margin-top: 6px; }
.project-option:hover, .project-option.active { background: var(--el-fill-color-light); }
.project-option.active { color: var(--el-color-primary); }
.project-option > span { display: grid; min-width: 0; flex: 1; gap: 2px; }
.project-option strong, .project-option small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.project-option strong { font-size: 13px; }
.project-option small { color: var(--el-text-color-secondary); font-size: 10px; }
.selected-icon { flex: 0 0 auto; }
.project-panel-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 9px;
  gap: 8px;
  border-top: 1px solid var(--el-border-color-lighter);
}
.project-panel-actions :deep(.el-button) {
  margin-left: 0;
  width: 100%;
}
.browser-project { display: flex; align-items: center; max-width: 220px; gap: 7px; color: var(--el-text-color-regular); font-size: 13px; }
.browser-project span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
