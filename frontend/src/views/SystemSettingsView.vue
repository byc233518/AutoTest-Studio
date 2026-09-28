<template>
  <div class="page settings-page">
    <el-card shadow="never" class="settings-card">
      <template #header>
        <div class="card-header">
          <div>
            <h2>系统设置</h2>
            <span class="muted">配置界面主题、测试浏览器和报告落款</span>
          </div>
          <el-button type="primary" :loading="saving" @click="save">保存设置</el-button>
        </div>
      </template>

      <el-form v-loading="loading" :model="form" label-position="top" class="settings-form">
        <section class="settings-section">
          <div class="section-heading">
            <strong>外观</strong>
            <span>主题设置保存在当前电脑。</span>
          </div>
          <el-form-item label="主题模式">
            <el-segmented v-model="themeMode" :options="themeOptions" @change="setTheme" />
          </el-form-item>
        </section>

        <el-divider />

        <section class="settings-section browser-section">
          <div class="section-heading section-heading-with-action">
            <div>
              <strong>测试浏览器</strong>
              <span>执行与录制使用当前电脑安装的 Chrome 或 Edge。</span>
            </div>
            <el-tooltip content="重新检测浏览器" placement="top">
              <el-button
                circle
                :icon="Refresh"
                :loading="detectingBrowsers"
                aria-label="重新检测浏览器"
                @click="loadBrowserStatus"
              />
            </el-tooltip>
          </div>
          <el-form-item label="浏览器选择">
            <el-segmented v-model="form.browserChannel" :options="browserOptions" />
          </el-form-item>
          <div class="browser-list" role="status" aria-live="polite" aria-atomic="true">
            <div v-for="browser in browserStatus.browsers" :key="browser.channel" class="browser-row">
              <div class="browser-identity">
                <strong>{{ browser.name }}</strong>
                <el-tag
                  size="small"
                  :type="browser.channel === browserStatus.resolvedChannel ? 'success' : browser.installed ? 'info' : 'info'"
                  :effect="browser.installed ? 'light' : 'plain'"
                >
                  {{ browser.channel === browserStatus.resolvedChannel ? '当前使用' : browser.installed ? '已检测' : '未安装' }}
                </el-tag>
                <span v-if="browser.version" class="browser-version">{{ browser.version }}</span>
              </div>
              <span v-if="browser.executablePath" class="browser-path" :title="browser.executablePath">
                {{ browser.executablePath }}
              </span>
              <span v-else class="browser-path muted">未检测到安装路径</span>
            </div>
          </div>
          <el-alert
            v-if="browserStatus.message"
            :title="browserStatus.message"
            type="warning"
            :closable="false"
            show-icon
          />
        </section>

        <el-divider />

        <section class="settings-section">
          <div class="section-heading">
            <strong>报告信息</strong>
            <span>用于 AI 测试报告封面和末页落款。</span>
          </div>
          <div class="form-grid">
            <el-form-item label="测试单位">
              <el-input v-model="form.testingUnit" maxlength="80" placeholder="例如：质量保障部" />
            </el-form-item>
            <el-form-item label="测试人员">
              <el-input v-model="form.testerName" maxlength="40" placeholder="例如：张三" />
            </el-form-item>
          </div>
          <el-form-item label="报告落款">
            <el-input
              v-model="form.reportSignature"
              type="textarea"
              :rows="3"
              maxlength="240"
              show-word-limit
              placeholder="显示在测试报告结尾的说明"
            />
          </el-form-item>
        </section>

        <el-divider />

        <section class="settings-section">
          <div class="section-heading">
            <strong>本地数据</strong>
            <span>用例、数据、执行结果和报告均保存在当前项目目录。</span>
          </div>
          <el-descriptions :column="1" border size="small">
            <el-descriptions-item label="当前项目">{{ store.project?.name || '-' }}</el-descriptions-item>
            <el-descriptions-item v-if="desktopProject?.rootPath" label="项目目录">
              <div class="path-value">
                <span :title="desktopProject.rootPath">{{ desktopProject.rootPath }}</span>
                <el-button link type="primary" @click="revealProject">打开目录</el-button>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </section>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Refresh } from '@element-plus/icons-vue';
import { api } from '../api';
import { usePlatformStore } from '../stores/platform';
import { useTheme } from '../theme';

const store = usePlatformStore();
const { themeMode, setTheme } = useTheme();
const loading = ref(false);
const saving = ref(false);
const detectingBrowsers = ref(false);
const desktopProject = ref(null);
const form = reactive({ testingUnit: '', testerName: '', reportSignature: '', browserChannel: 'auto' });
const browserStatus = reactive({ browsers: [], resolvedChannel: '', ready: false, message: '' });
const themeOptions = [
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
  { label: '跟随系统', value: 'system' }
];
const browserOptions = [
  { label: '自动选择', value: 'auto' },
  { label: 'Chrome', value: 'chrome' },
  { label: 'Edge', value: 'msedge' }
];

onMounted(async () => {
  loading.value = true;
  try {
    const tasks = [api('/api/settings/general'), api('/api/settings/browser-status')];
    if (window.autotestDesktop) tasks.push(window.autotestDesktop.currentProject());
    const [settings, status, project] = await Promise.all(tasks);
    Object.assign(form, settings || {});
    Object.assign(browserStatus, status || {});
    desktopProject.value = project || null;
  } catch (error) {
    ElMessage.error(error.message || '系统设置加载失败');
  } finally {
    loading.value = false;
  }
});

async function save() {
  saving.value = true;
  try {
    const result = await api('/api/settings/general', {
      method: 'PUT',
      body: JSON.stringify(form)
    });
    Object.assign(form, result || {});
    await loadBrowserStatus();
    ElMessage.success('系统设置已保存');
  } catch (error) {
    ElMessage.error(error.message || '系统设置保存失败');
  } finally {
    saving.value = false;
  }
}

async function loadBrowserStatus() {
  detectingBrowsers.value = true;
  try {
    const result = await api('/api/settings/browser-status');
    Object.assign(browserStatus, result || {});
  } catch (error) {
    ElMessage.error(error.message || '浏览器检测失败');
  } finally {
    detectingBrowsers.value = false;
  }
}

async function revealProject() {
  try {
    await window.autotestDesktop.revealProject(desktopProject.value.id);
  } catch (error) {
    ElMessage.error(error.message || '无法打开项目目录');
  }
}
</script>

<style scoped>
.settings-page { min-width: 760px; }
.settings-card { height: 100%; min-width: 0; border-radius: 6px; }
.settings-card :deep(.el-card__body) { height: calc(100% - 64px); min-width: 0; overflow-x: hidden; overflow-y: auto; }
.settings-form { width: min(820px, 100%); min-width: 0; }
.settings-section { display: grid; min-width: 0; gap: 12px; }
.section-heading { display: grid; gap: 3px; }
.section-heading strong { font-size: 15px; }
.section-heading span { color: var(--el-text-color-secondary); font-size: 12px; }
.section-heading-with-action { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.section-heading-with-action > div { display: grid; gap: 3px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.browser-list { display: grid; overflow: hidden; border: 1px solid var(--el-border-color-lighter); border-radius: 4px; }
.browser-row { display: grid; min-width: 0; grid-template-columns: 260px minmax(0, 1fr); align-items: center; gap: 16px; padding: 9px 12px; }
.browser-row + .browser-row { border-top: 1px solid var(--el-border-color-lighter); }
.browser-identity { display: flex; min-width: 0; align-items: center; gap: 8px; }
.browser-identity strong { flex: 0 0 auto; font-size: 13px; white-space: nowrap; }
.browser-version { color: var(--el-text-color-secondary); font-family: Consolas, monospace; font-size: 12px; }
.browser-path { min-width: 0; overflow: hidden; font-family: Consolas, monospace; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.settings-section :deep(.el-descriptions__table) { width: 100%; table-layout: fixed; }
.settings-section :deep(.el-descriptions__label) { width: 110px; }
.settings-section :deep(.el-descriptions__content) { min-width: 0; overflow: hidden; }
.path-value { display: flex; width: 100%; min-width: 0; max-width: 100%; align-items: center; justify-content: space-between; gap: 16px; overflow: hidden; }
.path-value span { display: block; min-width: 0; flex: 1; overflow: hidden; font-family: Consolas, monospace; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.path-value .el-button { flex: 0 0 auto; }
</style>
