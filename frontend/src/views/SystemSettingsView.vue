<template>
  <div class="page settings-page">
    <el-card shadow="never" class="settings-card">
      <template #header>
        <div class="card-header">
          <div>
            <h2>{{ t('settings.title') }}</h2>
            <span class="muted">{{ t('settings.subtitle') }}</span>
          </div>
          <el-button type="primary" :loading="saving" @click="save">{{ t('common.save') }}</el-button>
        </div>
      </template>

      <el-form v-loading="loading" :model="form" label-position="top" class="settings-form">
        <section class="settings-section">
          <div class="section-heading">
            <strong>{{ t('settings.appearance') }}</strong>
            <span>{{ t('settings.appearanceHint') }}</span>
          </div>
          <el-form-item :label="t('settings.themeMode')">
            <el-segmented :model-value="themeMode" :options="themeOptions" @change="setTheme" />
          </el-form-item>
          <el-form-item :label="t('settings.language')">
            <el-segmented :model-value="locale" :options="languageOptions" @change="setLocale" />
            <p class="field-hint">{{ t('settings.languageHint') }}</p>
          </el-form-item>
        </section>

        <el-divider />

        <section class="settings-section browser-section">
          <div class="section-heading section-heading-with-action">
            <div>
              <strong>{{ t('settings.browser') }}</strong>
              <span>{{ t('settings.browserHint') }}</span>
            </div>
            <el-tooltip :content="t('settings.detectBrowsers')" placement="top">
              <el-button
                circle
                :icon="Refresh"
                :loading="detectingBrowsers"
                :aria-label="t('settings.detectBrowsers')"
                @click="loadBrowserStatus"
              />
            </el-tooltip>
          </div>
          <el-form-item :label="t('settings.browserSelect')">
            <el-segmented v-model="form.browserChannel" :options="browserOptions" />
          </el-form-item>
          <div class="browser-list" role="status" aria-live="polite" aria-atomic="true">
            <div v-for="browser in browserStatus.browsers" :key="browser.channel" class="browser-row">
              <div class="browser-identity">
                <strong>{{ browser.name }}</strong>
                <el-tag
                  size="small"
                  :type="browser.channel === browserStatus.resolvedChannel ? 'success' : 'info'"
                  :effect="browser.installed ? 'light' : 'plain'"
                >
                  {{
                    browser.channel === browserStatus.resolvedChannel
                      ? t('settings.browserInUse')
                      : browser.installed
                        ? t('settings.browserDetected')
                        : t('settings.browserMissing')
                  }}
                </el-tag>
                <span v-if="browser.version" class="browser-version">{{ browser.version }}</span>
              </div>
              <span v-if="browser.executablePath" class="browser-path" :title="browser.executablePath">
                {{ browser.executablePath }}
              </span>
              <span v-else class="browser-path muted">{{ t('settings.browserPathMissing') }}</span>
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
            <strong>{{ t('settings.reportInfo') }}</strong>
            <span>{{ t('settings.reportInfoHint') }}</span>
          </div>
          <div class="form-grid">
            <el-form-item :label="t('settings.testingUnit')">
              <el-input v-model="form.testingUnit" maxlength="80" :placeholder="t('settings.testingUnitPlaceholder')" />
            </el-form-item>
            <el-form-item :label="t('settings.testerName')">
              <el-input v-model="form.testerName" maxlength="40" :placeholder="t('settings.testerNamePlaceholder')" />
            </el-form-item>
          </div>
          <el-form-item :label="t('settings.reportSignature')">
            <el-input
              v-model="form.reportSignature"
              type="textarea"
              :rows="3"
              maxlength="240"
              show-word-limit
              :placeholder="t('settings.reportSignaturePlaceholder')"
            />
          </el-form-item>
        </section>

        <el-divider />

        <section class="settings-section">
          <div class="section-heading">
            <strong>{{ t('settings.localData') }}</strong>
            <span>{{ t('settings.localDataHint') }}</span>
          </div>
          <el-descriptions :column="1" border size="small">
            <el-descriptions-item :label="t('settings.currentProject')">{{ store.project?.name || '-' }}</el-descriptions-item>
            <el-descriptions-item v-if="desktopProject?.rootPath" :label="t('settings.projectDirectory')">
              <div class="path-value">
                <span :title="desktopProject.rootPath">{{ desktopProject.rootPath }}</span>
                <el-button link type="primary" @click="revealProject">{{ t('settings.openDirectory') }}</el-button>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </section>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Refresh } from '@element-plus/icons-vue';
import { api } from '../api';
import { usePlatformStore } from '../stores/platform';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';

const store = usePlatformStore();
const { themeMode, setTheme } = useTheme();
const { locale, setLocale, t } = useI18n();
const loading = ref(false);
const saving = ref(false);
const detectingBrowsers = ref(false);
const desktopProject = ref(null);
const form = reactive({ testingUnit: '', testerName: '', reportSignature: '', browserChannel: 'auto' });
const browserStatus = reactive({ browsers: [], resolvedChannel: '', ready: false, message: '' });

const themeOptions = computed(() => [
  { label: t('theme.light'), value: 'light' },
  { label: t('theme.dark'), value: 'dark' },
  { label: t('theme.system'), value: 'system' }
]);

const languageOptions = computed(() => [
  { label: t('locale.zhCN'), value: 'zh-CN' },
  { label: t('locale.enUS'), value: 'en-US' }
]);

const browserOptions = computed(() => [
  { label: t('settings.browserAuto'), value: 'auto' },
  { label: 'Chrome', value: 'chrome' },
  { label: 'Edge', value: 'msedge' }
]);

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
    ElMessage.error(error.message || t('settings.loadFailed'));
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
    ElMessage.success(t('settings.saveSuccess'));
  } catch (error) {
    ElMessage.error(error.message || t('settings.saveFailed'));
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
    ElMessage.error(error.message || t('settings.detectFailed'));
  } finally {
    detectingBrowsers.value = false;
  }
}

async function revealProject() {
  try {
    await window.autotestDesktop.revealProject(desktopProject.value.id);
  } catch (error) {
    ElMessage.error(error.message || t('settings.openDirFailed'));
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
.field-hint { margin: 8px 0 0; color: var(--el-text-color-secondary); font-size: 12px; line-height: 1.5; }
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
