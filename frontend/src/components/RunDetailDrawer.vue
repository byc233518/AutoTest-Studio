<template>
  <el-drawer v-model="visible" size="min(1100px, 96%)" class="result-drawer">
    <template #header>
      <div><h2>{{ t('runDetail.title', { name: process?.scenarioName }) }}</h2><span class="muted">{{ run?.runId }} · {{ process?.currentStep }}</span></div>
    </template>
    <div v-loading="loading">
      <el-alert v-if="failureDetail" :title="failureDetail" type="error" show-icon :closable="false" />
      <div class="result-metrics">
        <el-statistic :title="t('runDetail.totalRows')" :value="run?.businessSummary?.totalRows || 0" />
        <el-statistic :title="t('runDetail.passed')" :value="run?.businessSummary?.passedRows || 0" />
        <el-statistic :title="t('runDetail.failed')" :value="run?.businessSummary?.failedRows || 0" />
        <el-statistic :title="t('runDetail.execStatus')" :value="statusText" />
      </div>
      <el-tag effect="plain">{{ run?.executionLocation === 'local' ? t('runDetail.locationLocal') : t('runDetail.locationLocalShort') }}</el-tag>
      <div class="evidence-layout">
        <el-card>
          <template #header><strong>{{ t('runDetail.steps') }}</strong></template>
          <el-timeline v-if="process?.steps?.length">
            <el-timeline-item v-for="item in process.steps" :key="item.id" :type="stepType(item.status)" :timestamp="item.finishedAt || item.startedAt">
              <strong>{{ item.title }}</strong><p>{{ stepStatus(item.status) }}</p>
            </el-timeline-item>
          </el-timeline>
          <el-empty v-else :description="t('runDetail.noSteps')" />
        </el-card>
        <el-card>
          <template #header>
            <div class="card-header"><strong>{{ t('runDetail.evidence') }}</strong><div><el-button v-if="process?.videoReplayUrl" link type="primary" @click="asset=process.videoReplayUrl">{{ t('runDetail.videoReplay') }}</el-button><el-button v-if="reportUrl" link type="primary" @click="openReport">{{ t('runDetail.htmlReport') }}</el-button></div></div>
          </template>
          <div class="evidence-stage"><iframe v-if="asset?.includes('replay')" :src="asset" /><el-image v-else-if="asset" :src="asset" fit="contain" :preview-src-list="[asset]" /><el-empty v-else :description="t('runDetail.noEvidence')" /></div>
          <div class="asset-strip"><button v-for="item in previewArtifacts" :key="item.url" @click="asset=item.previewUrl || item.url"><el-image v-if="item.type==='screenshot'" :src="item.previewUrl || item.url" fit="cover" /><el-icon v-else><VideoPlay /></el-icon><span>{{ item.label }}</span></button></div>
        </el-card>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { VideoPlay } from '@element-plus/icons-vue';
import { api } from '../api';
import { useI18n } from '../i18n';

const { t } = useI18n();
const visible=ref(false), run=ref(), process=ref(), loading=ref(false), asset=ref(''), error=ref('');
let timer;
const statusText=computed(()=>{
  const status = process.value?.status || run.value?.status;
  if (!status) return '-';
  const key = `status.${status}`;
  const label = t(key);
  return label === key ? status : label;
});
const failureDetail=computed(()=>{
  const fromApi = error.value || process.value?.error || '';
  const fromTest = (process.value?.resultTests || []).find((item) => item.error)?.error || '';
  return String(fromApi || fromTest).replace(/\u001B\[[0-9;]*[A-Za-z]/g, '').trim();
});
const reportUrl=computed(()=>process.value?.artifacts?.find(item=>item.type==='html-report')?.url);
const previewArtifacts=computed(()=>(process.value?.artifacts || []).filter(item=>['screenshot','video'].includes(item.type)));
const stepType=status=>({passed:'success',failed:'danger',running:'primary',pending:'info'})[status] || 'info';
function stepStatus(status) {
  if (status === 'passed') return t('status.completed');
  if (status === 'pending') return t('status.pending');
  const key = `status.${status}`;
  const label = t(key);
  return label === key ? status : label;
}
function openReport(){ window.open(reportUrl.value, '_blank', 'noopener'); }
async function refresh(){
  try { process.value=await api(`/api/runs/${run.value.runId}/process`); asset.value ||= process.value.latestScreenshotUrl || process.value.videoReplayUrl || ''; if(!['queued','running'].includes(process.value.status)) clearInterval(timer); }
  catch(e){ error.value=e.message; clearInterval(timer); }
}
async function open(item){ run.value=item; visible.value=true; loading.value=true; error.value=''; asset.value=''; clearInterval(timer); try{ await refresh(); if(['queued','running'].includes(process.value?.status)) timer=setInterval(refresh,2000); } finally { loading.value=false; } }
onBeforeUnmount(()=>clearInterval(timer));
defineExpose({open});
</script>
