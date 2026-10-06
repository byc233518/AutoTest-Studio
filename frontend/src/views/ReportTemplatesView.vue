<template>
  <div class="page report-templates-page">
    <el-card shadow="never" class="templates-card">
      <template #header>
        <div class="card-header">
          <div>
            <h2>报告模板</h2>
            <span class="muted">维护报告模块、是否附带截图与输出格式，并可预览效果</span>
          </div>
          <div class="header-actions">
            <el-button :icon="Plus" @click="createTemplate">新建模板</el-button>
            <el-button type="primary" :loading="saving" @click="save">保存设置</el-button>
          </div>
        </div>
      </template>

      <div v-loading="loading" class="templates-layout">
        <aside class="template-list" aria-label="报告模板列表">
          <button
            v-for="item in templates"
            :key="item.id"
            type="button"
            class="template-item"
            :class="{ active: item.id === selectedId }"
            @click="selectTemplate(item.id)"
          >
            <div class="template-item-main">
              <strong>{{ item.name }}</strong>
              <span>{{ formatLabel(item.outputFormat) }} · {{ moduleSummary(item) }}</span>
            </div>
            <el-tag v-if="item.id === activeTemplateId" size="small" type="success" effect="plain">当前启用</el-tag>
          </button>
        </aside>

        <section v-if="selected" class="template-editor" aria-label="模板编辑">
          <el-form :model="selected" label-position="top" class="editor-form">
            <div class="form-grid">
              <el-form-item label="模板名称" required>
                <el-input v-model="selected.name" maxlength="40" placeholder="例如：标准报告" />
              </el-form-item>
              <el-form-item label="输出格式" required>
                <el-segmented v-model="selected.outputFormat" :options="formatSegmentOptions" />
              </el-form-item>
            </div>

            <el-form-item label="模板说明">
              <el-input
                v-model="selected.description"
                type="textarea"
                :rows="2"
                maxlength="160"
                show-word-limit
                placeholder="说明该模板适用的场景"
              />
            </el-form-item>

            <el-form-item label="包含模块">
              <el-checkbox-group v-model="selected.modules" class="module-group">
                <el-checkbox
                  v-for="option in moduleOptions"
                  :key="option.key"
                  :label="option.key"
                >
                  {{ option.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="截图附件">
              <el-switch v-model="selected.includeImages" active-text="报告中包含执行截图" />
            </el-form-item>

            <div class="editor-actions">
              <el-button type="primary" plain :loading="previewing" @click="previewSelected">预览模板</el-button>
              <el-button type="success" plain :disabled="selected.id === activeTemplateId" @click="activateSelected">
                设为当前启用
              </el-button>
              <el-button
                type="danger"
                plain
                :disabled="templates.length <= 1"
                @click="removeSelected"
              >
                删除模板
              </el-button>
            </div>
          </el-form>

          <div class="preview-panel">
            <div class="preview-heading">
              <strong>预览</strong>
              <span>{{ previewMeta }}</span>
            </div>
            <div v-loading="previewing" class="preview-frame">
              <iframe
                v-if="previewHtml"
                class="preview-iframe"
                title="报告模板预览"
                sandbox=""
                :srcdoc="previewHtml"
              />
              <pre v-else-if="previewText" class="preview-markdown">{{ previewText }}</pre>
              <el-empty v-else description="点击“预览模板”查看效果" :image-size="72" />
            </div>
          </div>
        </section>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { api } from '../api';

const loading = ref(false);
const saving = ref(false);
const previewing = ref(false);
const selectedId = ref('');
const activeTemplateId = ref('');
const templates = ref([]);
const moduleOptions = ref([]);
const formatOptions = ref([]);
const previewHtml = ref('');
const previewText = ref('');
const previewFormat = ref('');

const selected = computed(() => templates.value.find((item) => item.id === selectedId.value) || null);
const formatSegmentOptions = computed(() => formatOptions.value.map((item) => ({
  label: item.label,
  value: item.value
})));
const previewMeta = computed(() => {
  if (!previewFormat.value) return '使用示例数据渲染';
  const label = formatLabel(previewFormat.value);
  return `示例数据 · ${label}`;
});

onMounted(load);

async function load() {
  loading.value = true;
  try {
    const payload = await api('/api/settings/report-templates');
    applyPayload(payload);
    await previewSelected();
  } catch (error) {
    ElMessage.error(error.message || '报告模板加载失败');
  } finally {
    loading.value = false;
  }
}

function applyPayload(payload) {
  templates.value = (payload.templates || []).map((item) => reactive({
    ...item,
    modules: [...(item.modules || [])]
  }));
  activeTemplateId.value = payload.activeTemplateId || templates.value[0]?.id || '';
  selectedId.value = templates.value.some((item) => item.id === selectedId.value)
    ? selectedId.value
    : (activeTemplateId.value || templates.value[0]?.id || '');
  moduleOptions.value = payload.moduleOptions || [];
  formatOptions.value = payload.formatOptions || [];
}

function formatLabel(format) {
  return formatOptions.value.find((item) => item.value === format)?.label || format || '-';
}

function moduleSummary(item) {
  const count = (item.modules || []).length + (item.includeImages && !(item.modules || []).includes('images') ? 1 : 0);
  return `${count} 个模块`;
}

function selectTemplate(id) {
  selectedId.value = id;
  previewHtml.value = '';
  previewText.value = '';
  previewFormat.value = '';
}

function createTemplate() {
  const id = `tpl-${Date.now().toString(36)}`;
  const created = reactive({
    id,
    name: '新建报告模板',
    description: '',
    outputFormat: 'html',
    includeImages: false,
    modules: ['cover', 'result', 'details', 'signature']
  });
  templates.value.push(created);
  selectedId.value = id;
  previewHtml.value = '';
  previewText.value = '';
}

function activateSelected() {
  if (!selected.value) return;
  activeTemplateId.value = selected.value.id;
  ElMessage.success(`已切换为「${selected.value.name}」，保存后生效`);
}

async function removeSelected() {
  if (!selected.value || templates.value.length <= 1) return;
  try {
    await ElMessageBox.confirm(`确定删除模板“${selected.value.name}”吗？`, '删除报告模板', {
      type: 'warning',
      confirmButtonText: '删除',
      cancelButtonText: '取消'
    });
    const removingId = selected.value.id;
    templates.value = templates.value.filter((item) => item.id !== removingId);
    if (activeTemplateId.value === removingId) {
      activeTemplateId.value = templates.value[0].id;
    }
    selectedId.value = activeTemplateId.value;
    previewHtml.value = '';
    previewText.value = '';
  } catch {
    // cancelled
  }
}

async function previewSelected() {
  if (!selected.value) return;
  previewing.value = true;
  try {
    const result = await api('/api/settings/report-templates/preview', {
      method: 'POST',
      body: JSON.stringify({ template: selected.value })
    });
    previewFormat.value = result.format || selected.value.outputFormat;
    if (previewFormat.value === 'markdown') {
      previewHtml.value = '';
      previewText.value = result.content || '';
    } else {
      previewText.value = '';
      previewHtml.value = result.content || '';
    }
  } catch (error) {
    ElMessage.error(error.message || '预览失败');
  } finally {
    previewing.value = false;
  }
}

async function save() {
  if (!templates.value.length) {
    ElMessage.warning('至少保留一个报告模板');
    return;
  }
  saving.value = true;
  try {
    const payload = await api('/api/settings/report-templates', {
      method: 'PUT',
      body: JSON.stringify({
        activeTemplateId: activeTemplateId.value,
        templates: templates.value
      })
    });
    applyPayload(payload);
    ElMessage.success('报告模板已保存');
    await previewSelected();
  } catch (error) {
    ElMessage.error(error.message || '报告模板保存失败');
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.report-templates-page { min-width: 960px; }
.templates-card { height: 100%; border-radius: 6px; }
.templates-card :deep(.el-card__body) {
  height: calc(100% - 64px);
  overflow: hidden;
}
.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.card-header h2 { margin: 0; font-size: 18px; }
.header-actions { display: flex; gap: 8px; }
.templates-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 16px;
  height: 100%;
  min-height: 0;
}
.template-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
  overflow: auto;
  padding-right: 4px;
}
.template-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 12px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 6px;
  background: var(--el-bg-color);
  text-align: left;
  cursor: pointer;
}
.template-item.active {
  border-color: var(--el-color-primary-light-5);
  background: var(--el-color-primary-light-9);
}
.template-item-main {
  display: grid;
  gap: 4px;
  min-width: 0;
}
.template-item-main strong {
  font-size: 14px;
}
.template-item-main span,
.preview-heading span,
.muted {
  color: var(--el-text-color-secondary);
  font-size: 12px;
}
.template-editor {
  display: grid;
  grid-template-columns: minmax(320px, 420px) minmax(0, 1fr);
  gap: 16px;
  min-width: 0;
  min-height: 0;
  height: 100%;
}
.editor-form {
  min-width: 0;
  overflow: auto;
  padding-right: 4px;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}
.module-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 12px;
}
.editor-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}
.preview-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 8px;
  min-width: 0;
  min-height: 0;
}
.preview-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.preview-frame {
  min-height: 0;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 6px;
  background: #fff;
}
.preview-iframe {
  width: 100%;
  height: 100%;
  border: 0;
  background: #fff;
}
.preview-markdown {
  margin: 0;
  height: 100%;
  overflow: auto;
  padding: 14px 16px;
  white-space: pre-wrap;
  font-family: Consolas, "Courier New", monospace;
  font-size: 13px;
  color: #303133;
}
</style>
