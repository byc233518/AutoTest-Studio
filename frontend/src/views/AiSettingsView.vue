<template>
  <div class="page">
    <el-card>
      <template #header>
        <div class="card-header">
          <div>
            <h2>AI 设置</h2>
            <span class="muted">选择常用供应商，自动填充接口地址和推荐模型</span>
          </div>
        </div>
      </template>

      <el-form :model="form" label-position="top" class="settings-form">
        <el-form-item label="供应商预设">
          <el-select v-model="selectedPreset" class="wide" @change="applyPreset">
            <el-option
              v-for="preset in presets"
              :key="preset.value"
              :label="preset.label"
              :value="preset.value"
            />
          </el-select>
        </el-form-item>

        <div class="config-grid">
          <el-form-item label="供应商">
            <el-input v-model="form.provider" :disabled="selectedPreset !== 'custom'" />
          </el-form-item>
          <el-form-item label="模型">
            <div class="model-field">
              <el-select
                v-model="form.model"
                class="wide"
                filterable
                allow-create
                default-first-option
                clearable
                placeholder="选择或输入模型名称"
              >
                <el-option
                  v-for="item in modelOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-tooltip content="从供应商刷新模型列表">
                <el-button
                  :icon="Refresh"
                  circle
                  :loading="loadingModels"
                  aria-label="从供应商刷新模型列表"
                  @click="refreshModels"
                />
              </el-tooltip>
            </div>
          </el-form-item>
        </div>

        <el-form-item label="Base URL">
          <el-input v-model="form.baseUrl" placeholder="兼容 OpenAI 的接口地址" />
        </el-form-item>
        <el-form-item label="API Key">
          <el-input
            v-model="form.apiKey"
            type="password"
            show-password
            :placeholder="current.apiKeyMasked || '输入 API Key'"
          />
        </el-form-item>

        <el-switch v-model="form.enabled" active-text="启用 AI 数据生成" />

        <div class="form-actions">
          <el-button type="primary" :loading="saving" @click="save">保存设置</el-button>
          <el-button :loading="testing" @click="testConnection">测试连接</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Refresh } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { api } from '../api';

const presets = [
  {
    value: 'deepseek',
    label: 'DeepSeek',
    provider: 'deepseek',
    baseUrl: 'https://api.deepseek.com',
    model: 'deepseek-chat'
  },
  {
    value: 'openai',
    label: 'OpenAI',
    provider: 'openai',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-4.1-mini'
  },
  {
    value: 'qwen',
    label: '通义千问',
    provider: 'qwen',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    model: 'qwen-plus'
  },
  {
    value: 'zhipu',
    label: '智谱 GLM',
    provider: 'zhipu',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    model: 'glm-4-flash'
  },
  {
    value: 'kimi',
    label: '月之暗面 Kimi',
    provider: 'kimi',
    baseUrl: 'https://api.moonshot.cn/v1',
    model: 'moonshot-v1-8k'
  },
  {
    value: 'longcat',
    label: 'LongCat',
    provider: 'longcat',
    baseUrl: 'https://api.longcat.chat/openai',
    model: 'LongCat-2.0'
  },
  {
    value: 'siliconflow',
    label: '硅基流动',
    provider: 'siliconflow',
    baseUrl: 'https://api.siliconflow.cn/v1',
    model: 'deepseek-ai/DeepSeek-V3'
  },
  {
    value: 'custom',
    label: '自定义',
    provider: '',
    baseUrl: '',
    model: ''
  }
];

const current = ref({});
const selectedPreset = ref('deepseek');
const saving = ref(false);
const testing = ref(false);
const loadingModels = ref(false);
const modelOptions = ref(['deepseek-chat']);
const form = reactive({
  provider: 'deepseek',
  model: 'deepseek-chat',
  baseUrl: 'https://api.deepseek.com',
  apiKey: '',
  enabled: true
});

onMounted(async () => {
  try {
    current.value = await api('/api/settings/llm');
    if (current.value.provider) {
      Object.assign(form, { ...current.value, apiKey: '' });
    }
    selectedPreset.value = presets.find((item) =>
      item.provider === form.provider && item.baseUrl === form.baseUrl
    )?.value || 'custom';
    seedModelOptions(form.model);
  } catch (error) {
    ElMessage.error(error.message);
  }
});

function seedModelOptions(model) {
  const next = new Set(modelOptions.value);
  if (model) next.add(model);
  const preset = presets.find((item) => item.value === selectedPreset.value);
  if (preset?.model) next.add(preset.model);
  modelOptions.value = [...next].filter(Boolean);
}

function applyPreset(value) {
  const preset = presets.find((item) => item.value === value);
  if (value === 'custom') {
    Object.assign(form, { provider: '', baseUrl: '', model: '' });
    modelOptions.value = [];
    return;
  }
  Object.assign(form, {
    provider: preset.provider,
    baseUrl: preset.baseUrl,
    model: preset.model
  });
  modelOptions.value = preset.model ? [preset.model] : [];
}

async function refreshModels() {
  if (!form.baseUrl.trim()) {
    ElMessage.warning('请先填写 Base URL');
    return;
  }
  if (!form.apiKey.trim() && !current.value.apiKeyMasked) {
    ElMessage.warning('请先填写 API Key');
    return;
  }
  loadingModels.value = true;
  try {
    const result = await api('/api/settings/llm/models', {
      method: 'POST',
      body: JSON.stringify({
        baseUrl: form.baseUrl.trim(),
        apiKey: form.apiKey.trim()
      })
    });
    const models = Array.isArray(result.models) ? result.models : [];
    modelOptions.value = models;
    if (form.model && !models.includes(form.model)) {
      modelOptions.value = [form.model, ...models];
    }
    if (!form.model && models.length) {
      form.model = models[0];
    }
    ElMessage.success(`已获取 ${models.length} 个模型`);
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    loadingModels.value = false;
  }
}

async function save() {
  saving.value = true;
  try {
    current.value = await api('/api/settings/llm', {
      method: 'PUT',
      body: JSON.stringify(form)
    });
    form.apiKey = '';
    seedModelOptions(form.model);
    ElMessage.success('AI 设置已保存');
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    saving.value = false;
  }
}

async function testConnection() {
  testing.value = true;
  try {
    const result = await api('/api/settings/llm/test', {
      method: 'POST',
      body: '{}'
    });
    ElMessage.success(result.message);
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    testing.value = false;
  }
}
</script>

<style scoped>
.model-field {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.model-field .wide {
  flex: 1;
  min-width: 0;
}
</style>
