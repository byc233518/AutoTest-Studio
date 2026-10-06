<template>
  <div v-if="desktop" class="project-switcher">
    <el-popover v-model:visible="open" placement="bottom-start" :width="360" trigger="click">
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
          <span>数据和文件按目录隔离</span>
        </div>
        <div class="project-list">
          <button
            v-for="project in projects"
            :key="project.id"
            type="button"
            class="project-option"
            :class="{ active: project.id === current?.id }"
            @click="switchProject(project)"
          >
            <el-icon><Folder /></el-icon>
            <span>
              <strong>{{ project.name }}</strong>
              <small>{{ project.rootPath }}</small>
            </span>
            <el-icon v-if="project.id === current?.id" class="selected-icon"><Select /></el-icon>
          </button>
        </div>
        <div class="project-panel-actions">
          <el-button :icon="Plus" @click="openCreate">新建项目</el-button>
          <el-button :icon="FolderAdd" @click="registerProject">打开已有项目</el-button>
          <el-button v-if="current" :icon="FolderOpened" circle aria-label="在资源管理器中显示" @click="revealCurrent" />
        </div>
        <div class="project-panel-actions">
          <el-button :icon="Download" :loading="exporting" :disabled="!current" @click="exportProject">导出项目</el-button>
          <el-button :icon="Upload" :loading="importing" @click="importProject">导入项目</el-button>
        </div>
      </div>
    </el-popover>

    <el-dialog v-model="createVisible" title="新建本地项目" width="540px" append-to-body>
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" maxlength="40" show-word-limit />
        </el-form-item>
        <el-form-item label="项目目录" prop="rootPath">
          <el-input v-model="form.rootPath" readonly placeholder="选择一个空目录">
            <template #append><el-button :icon="FolderOpened" @click="chooseDirectory">选择</el-button></template>
          </el-input>
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
  </div>

  <div v-else class="browser-project">
    <el-icon><FolderOpened /></el-icon>
    <span>{{ store.project?.name || '默认项目' }}</span>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { ArrowDown, Download, Folder, FolderAdd, FolderOpened, Plus, Select, Upload } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { usePlatformStore } from '../stores/platform';

const store = usePlatformStore();
const desktop = Boolean(window.autotestDesktop);
const open = ref(false);
const loading = ref(false);
const creating = ref(false);
const exporting = ref(false);
const importing = ref(false);
const createVisible = ref(false);
const projects = ref([]);
const current = ref(null);
const formRef = ref();
const form = reactive({ name: '', description: '', rootPath: '' });
const rules = {
  name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  rootPath: [{ required: true, message: '请选择项目目录', trigger: 'change' }]
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

function openCreate() {
  Object.assign(form, { name: '', description: '', rootPath: '' });
  open.value = false;
  createVisible.value = true;
}

async function chooseDirectory() {
  const rootPath = await window.autotestDesktop.chooseProjectDirectory({
    title: '选择新项目目录',
    buttonLabel: '选择目录'
  });
  if (rootPath) form.rootPath = rootPath;
}

async function createProject() {
  if (!await formRef.value.validate().catch(() => false)) return;
  creating.value = true;
  try {
    await window.autotestDesktop.createProject({ ...form, activate: true });
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
.project-panel-title span { color: var(--el-text-color-secondary); font-size: 11px; }
.project-list { display: grid; max-height: 260px; padding: 6px 0; gap: 2px; overflow: auto; }
.project-option { min-height: 48px; padding: 6px 8px; gap: 9px; border-radius: 5px; }
.project-option:hover, .project-option.active { background: var(--el-fill-color-light); }
.project-option.active { color: var(--el-color-primary); }
.project-option > span { display: grid; min-width: 0; flex: 1; gap: 2px; }
.project-option strong, .project-option small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.project-option strong { font-size: 13px; }
.project-option small { color: var(--el-text-color-secondary); font-size: 10px; }
.selected-icon { flex: 0 0 auto; }
.project-panel-actions { display: flex; flex-wrap: wrap; padding-top: 9px; gap: 8px; border-top: 1px solid var(--el-border-color-lighter); }
.project-panel-actions + .project-panel-actions { margin-top: 8px; }
.project-panel-actions .el-button:last-child { margin-left: auto; }
.project-panel-actions + .project-panel-actions .el-button:last-child { margin-left: 0; }
.browser-project { display: flex; align-items: center; max-width: 220px; gap: 7px; color: var(--el-text-color-regular); font-size: 13px; }
.browser-project span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
