<template>
  <section class="releases-panel" v-loading="loading">
    <div class="releases-toolbar">
      <div>
        <strong>{{ t('releases.title') }}</strong>
        <el-text type="info">{{ t('releases.hint') }}</el-text>
      </div>
      <el-button type="primary" :loading="publishing" @click="publish">{{ t('releases.publish') }}</el-button>
    </div>
    <el-alert
      v-if="draftComparison"
      :title="t('releases.draftCompare', { version: draftComparison.version, summary: draftComparison.summary })"
      :type="draftComparison.changed ? 'warning' : 'success'"
      show-icon
      :closable="false"
    />
    <el-table :data="releases" border max-height="360" :empty-text="t('releases.empty')">
      <el-table-column prop="version" :label="t('releases.colVersion')" width="100" />
      <el-table-column prop="versionNo" :label="t('releases.colVersionNo')" width="80" />
      <el-table-column prop="createdAt" :label="t('releases.colCreatedAt')" min-width="180" />
      <el-table-column :label="t('common.actions')" width="260" fixed="right">
        <template #default="{ row }">
          <el-button link @click="selectCompare(row)">{{ t('releases.compare') }}</el-button>
          <el-button link type="warning" @click="restore(row)">{{ t('releases.restoreDraft') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="comparison" class="comparison-panel">
      <div class="comparison-header">
        <strong>{{ t('releases.comparisonTitle') }}</strong>
        <el-button text @click="comparison = null">{{ t('common.close') }}</el-button>
      </div>
      <el-descriptions border :column="2">
        <el-descriptions-item :label="t('releases.from')">{{ comparison.from?.version || `v${comparison.from?.versionNo}` }}</el-descriptions-item>
        <el-descriptions-item :label="t('releases.to')">{{ comparison.to?.version || `v${comparison.to?.versionNo}` }}</el-descriptions-item>
        <el-descriptions-item :label="t('releases.scenarioChanged')">{{ comparison.scenarioChanged ? t('releases.yes') : t('releases.no') }}</el-descriptions-item>
        <el-descriptions-item :label="t('releases.schemaChanged')">{{ comparison.schemaChanged ? t('releases.yes') : t('releases.no') }}</el-descriptions-item>
        <el-descriptions-item :label="t('releases.scriptChanged')">{{ comparison.scriptChanged ? t('releases.yes') : t('releases.no') }}</el-descriptions-item>
        <el-descriptions-item :label="t('releases.changedKeys')">{{ comparison.changedKeys?.join(t('common.listSeparator')) || t('releases.no') }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { api } from '../api';
import { useI18n } from '../i18n';

const { t } = useI18n();

const props = defineProps({
  scenarioKey: { type: String, default: '' },
  currentScript: { type: String, default: '' },
  currentScenario: { type: Object, default: null },
  beforeChange: { type: Function, default: null }
});
const emit = defineEmits(['published', 'restored']);
const loading = ref(false);
const publishing = ref(false);
const releases = ref([]);
const comparison = ref(null);
const draftComparison = ref(null);

async function canChange(action, release) {
  if (!props.beforeChange) return true;
  const context = release ? { action, release } : { action };
  return (await props.beforeChange(context)) !== false;
}

async function load() {
  if (!props.scenarioKey) return;
  loading.value = true;
  try { releases.value = await api(`/api/scenarios/${props.scenarioKey}/releases`); }
  catch (error) { ElMessage.error(error.message); }
  finally { loading.value = false; }
}

async function publish() {
  if (!props.scenarioKey) return;
  try {
    if (!(await canChange('publish'))) return;
    publishing.value = true;
    const result = await api(`/api/scenarios/${props.scenarioKey}/publish`, { method: 'POST', body: '{}' });
    emit('published', result);
    draftComparison.value = null;
    await load();
    ElMessage.success(t('releases.published', { version: result.version || t('releases.newVersion') }));
  } catch (error) { ElMessage.error(error.message); }
  finally { publishing.value = false; }
}

async function selectCompare(row) {
  try {
    const index = releases.value.findIndex((item) => item.id === row.id);
    const target = releases.value[index + 1] || releases.value[index - 1];
    const suffix = target ? `?to=${encodeURIComponent(target.id)}` : '';
    comparison.value = await api(`/api/scenarios/${props.scenarioKey}/releases/${row.id}/compare${suffix}`);
  } catch (error) { ElMessage.error(error.message); }
}

async function compareDraft() {
  try {
    draftComparison.value = await api(`/api/scenarios/${props.scenarioKey}/releases/draft-compare`);
  } catch (error) { ElMessage.error(error.message); }
}

async function restore(row) {
  try {
    if (!(await canChange('restore', row))) return;
    const version = row.version || `v${row.versionNo}`;
    await ElMessageBox.confirm(
      t('releases.restoreConfirm', { version }),
      t('releases.restoreTitle'),
      { type: 'warning' }
    );
    const result = await api(`/api/scenarios/${props.scenarioKey}/releases/${row.id}/restore`, { method: 'POST', body: '{}' });
    emit('restored', { ...result, status: 'draft' });
    draftComparison.value = null;
    await load();
    ElMessage.success(t('releases.restored'));
  } catch (error) {
    if (!['cancel', 'close'].includes(error)) ElMessage.error(error.message || error);
  }
}

function open() { load(); }
watch(() => props.scenarioKey, () => { comparison.value = null; draftComparison.value = null; load(); }, { immediate: true });

defineExpose({ open, load, publish, restore, compareDraft });
</script>

<style scoped>
.releases-panel { display: grid; gap: 14px; }
.releases-toolbar, .comparison-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
.releases-toolbar > div { display: grid; gap: 4px; min-width: 0; }
.comparison-panel { display: grid; gap: 10px; padding-top: 8px; }
@media (max-width: 600px) { .releases-toolbar .el-button { width: 100%; } }
</style>
