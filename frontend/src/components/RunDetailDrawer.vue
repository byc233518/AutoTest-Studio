<template>
  <el-drawer v-model="visible" size="min(1100px, 96%)" class="result-drawer">
    <template #header>
      <div><h2>执行结果 · {{ process?.scenarioName }}</h2><span class="muted">{{ run?.runId }} · {{ process?.currentStep }}</span></div>
    </template>
    <div v-loading="loading">
      <el-alert v-if="error" :title="error" type="error" show-icon :closable="false" />
      <div class="result-metrics">
        <el-statistic title="数据总数" :value="run?.businessSummary?.totalRows || 0" />
        <el-statistic title="成功" :value="run?.businessSummary?.passedRows || 0" />
        <el-statistic title="失败" :value="run?.businessSummary?.failedRows || 0" />
        <el-statistic title="执行状态" :value="statusText" />
      </div>
      <el-tag effect="plain">{{ run?.executionLocation === 'local' ? '测试人员本机执行' : '平台服务器执行' }}</el-tag>
      <div class="evidence-layout">
        <el-card>
          <template #header><strong>执行步骤</strong></template>
          <el-timeline v-if="process?.steps?.length">
            <el-timeline-item v-for="item in process.steps" :key="item.id" :type="stepType(item.status)" :timestamp="item.finishedAt || item.startedAt">
              <strong>{{ item.title }}</strong><p>{{ stepStatus(item.status) }}</p>
            </el-timeline-item>
          </el-timeline>
          <el-empty v-else description="暂无执行步骤" />
        </el-card>
        <el-card>
          <template #header>
            <div class="card-header"><strong>截图与录像</strong><div><el-button v-if="process?.videoReplayUrl" link type="primary" @click="asset=process.videoReplayUrl">录像回放</el-button><el-button v-if="reportUrl" link type="primary" @click="openReport">HTML 报告</el-button></div></div>
          </template>
          <div class="evidence-stage"><iframe v-if="asset?.includes('replay')" :src="asset" /><el-image v-else-if="asset" :src="asset" fit="contain" :preview-src-list="[asset]" /><el-empty v-else description="本次执行暂无截图或录像" /></div>
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

const visible=ref(false), run=ref(), process=ref(), loading=ref(false), asset=ref(''), error=ref('');
let timer;
const statusText=computed(()=>({passed:'通过',failed:'失败',running:'执行中',queued:'排队中',skipped:'已跳过'})[process.value?.status || run.value?.status] || '-');
const reportUrl=computed(()=>process.value?.artifacts?.find(item=>item.type==='html-report')?.url);
const previewArtifacts=computed(()=>(process.value?.artifacts || []).filter(item=>['screenshot','video'].includes(item.type)));
const stepType=status=>({passed:'success',failed:'danger',running:'primary',pending:'info'})[status] || 'info';
const stepStatus=status=>({passed:'已完成',failed:'失败',running:'执行中',pending:'等待执行'})[status] || status;
function openReport(){ window.open(reportUrl.value, '_blank', 'noopener'); }
async function refresh(){
  try { process.value=await api(`/api/runs/${run.value.runId}/process`); asset.value ||= process.value.latestScreenshotUrl || process.value.videoReplayUrl || ''; if(!['queued','running'].includes(process.value.status)) clearInterval(timer); }
  catch(e){ error.value=e.message; clearInterval(timer); }
}
async function open(item){ run.value=item; visible.value=true; loading.value=true; error.value=''; asset.value=''; clearInterval(timer); try{ await refresh(); if(['queued','running'].includes(process.value?.status)) timer=setInterval(refresh,2000); } finally { loading.value=false; } }
onBeforeUnmount(()=>clearInterval(timer));
defineExpose({open});
</script>
