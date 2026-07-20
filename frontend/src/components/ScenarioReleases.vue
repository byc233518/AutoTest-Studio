<template>
  <section class="releases-panel" v-loading="loading">
    <div class="releases-toolbar">
      <div><strong>发布版本</strong><el-text type="info">保留场景草稿，发布只生成不可变快照</el-text></div>
      <el-button type="primary" :loading="publishing" @click="publish">发布当前草稿</el-button>
    </div>
    <el-alert v-if="draftComparison" :title="`当前草稿与 ${draftComparison.version}：${draftComparison.summary}`" :type="draftComparison.changed ? 'warning' : 'success'" show-icon :closable="false" />
    <el-table :data="releases" border max-height="360" empty-text="暂无发布版本">
      <el-table-column prop="version" label="版本" width="100" />
      <el-table-column prop="versionNo" label="序号" width="80" />
      <el-table-column prop="createdAt" label="发布时间" min-width="180" />
      <el-table-column label="操作" width="260" fixed="right">
        <template #default="{ row }">
          <el-button link @click="selectCompare(row)">比较</el-button>
          <el-button link type="warning" @click="restore(row)">恢复为草稿</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="comparison" class="comparison-panel">
      <div class="comparison-header"><strong>版本比较</strong><el-button text @click="comparison = null">关闭</el-button></div>
      <el-descriptions border :column="2">
        <el-descriptions-item label="来源">{{ comparison.from?.version || `v${comparison.from?.versionNo}` }}</el-descriptions-item>
        <el-descriptions-item label="目标">{{ comparison.to?.version || `v${comparison.to?.versionNo}` }}</el-descriptions-item>
        <el-descriptions-item label="场景变更">{{ comparison.scenarioChanged ? '有' : '无' }}</el-descriptions-item>
        <el-descriptions-item label="字段变更">{{ comparison.schemaChanged ? '有' : '无' }}</el-descriptions-item>
        <el-descriptions-item label="脚本变更">{{ comparison.scriptChanged ? '有' : '无' }}</el-descriptions-item>
        <el-descriptions-item label="变更键">{{ comparison.changedKeys?.join('、') || '无' }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { api } from '../api';

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
    ElMessage.success(`已发布 ${result.version || '新版本'}`);
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
    await ElMessageBox.confirm(`恢复 ${row.version || `v${row.versionNo}`} 后场景会回到草稿，是否继续？`, '确认恢复', { type: 'warning' });
    const result = await api(`/api/scenarios/${props.scenarioKey}/releases/${row.id}/restore`, { method: 'POST', body: '{}' });
    emit('restored', { ...result, status: 'draft' });
    draftComparison.value = null;
    await load();
    ElMessage.success('版本已恢复，场景已回到草稿');
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
