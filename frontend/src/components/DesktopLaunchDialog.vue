<template>
  <el-dialog v-model="visible" title="本机执行任务已创建" width="min(640px, 94vw)" destroy-on-close>
    <div class="launch-body">
      <el-alert title="优先使用一键打开；如果浏览器没有唤起工具，就复制操作码在绿色本地测试工具中执行。" type="info" show-icon :closable="false" />
      <section class="code-panel">
        <span>操作码</span>
        <strong>{{ recordCode }}</strong>
        <el-text type="info">有效期至 {{ expiresText }}</el-text>
      </section>
      <div class="launch-actions">
        <el-button type="primary" :icon="Link" :disabled="!desktopLaunchUrl" @click="openDesktop">再次打开本地工具</el-button>
        <el-button :icon="CopyDocument" @click="copyCode">复制操作码</el-button>
        <el-button :icon="Download" :disabled="!toolDownloadUrl" @click="downloadTool">下载绿色工具</el-button>
      </div>
    </div>
    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { CopyDocument, Download, Link } from '@element-plus/icons-vue';

const visible = ref(false);
const launch = ref({});
const recordCode = computed(() => launch.value?.recordCode || launch.value?.code || '');
const desktopLaunchUrl = computed(() => launch.value?.desktopLaunchUrl || '');
const toolDownloadUrl = computed(() => launch.value?.toolDownloadUrl || '');
const expiresText = computed(() => {
  const value = launch.value?.expiresAt || launch.value?.recordCodeExpires;
  return value ? new Date(value).toLocaleString('zh-CN', { hour12: false }) : '30 分钟内';
});

async function copyText(value) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {}
  const input = document.createElement('textarea');
  input.value = value;
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand('copy');
  input.remove();
  return copied;
}

function open(value = {}) {
  launch.value = value;
  visible.value = true;
  openDesktop();
}

function openDesktop() {
  if (desktopLaunchUrl.value) window.location.href = desktopLaunchUrl.value;
}

async function copyCode() {
  if (!recordCode.value) return ElMessage.warning('暂无操作码');
  const copied = await copyText(recordCode.value);
  ElMessage[copied ? 'success' : 'warning'](copied ? '操作码已复制' : '请手工复制操作码');
}

function downloadTool() {
  if (toolDownloadUrl.value) window.open(toolDownloadUrl.value, '_blank', 'noopener');
}

defineExpose({ open, openDesktop, copyCode });
</script>

<style scoped>
.launch-body { display: grid; gap: 16px; }
.code-panel { display: grid; gap: 6px; padding: 14px; border: 1px solid var(--el-border-color-lighter); border-radius: 6px; text-align: center; }
.code-panel strong { font-size: 30px; letter-spacing: 2px; }
.launch-actions { display: flex; gap: 10px; flex-wrap: wrap; }
@media (max-width: 620px) { .launch-actions .el-button { width: 100%; margin-left: 0; } }
</style>
