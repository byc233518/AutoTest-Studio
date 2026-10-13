<template>
  <div class="page">
    <el-card>
      <template #header>
        <div class="card-header">
          <div>
            <h2>{{ t('ai.title') }}</h2>
            <span class="muted">{{ t('ai.subtitle') }}</span>
          </div>
        </div>
      </template>

      <el-form :model="form" label-position="top" class="settings-form">
        <el-form-item :label="t('ai.preset')">
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
          <el-form-item :label="t('ai.provider')">
            <el-input v-model="form.provider" :disabled="selectedPreset !== 'custom'" />
          </el-form-item>
          <el-form-item :label="t('ai.model')">
            <div class="model-field">
              <el-select
                v-model="form.model"
                class="wide"
                filterable
                allow-create
                default-first-option
                clearable
                :placeholder="t('ai.modelPlaceholder')"
              >
                <el-option
                  v-for="item in modelOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-tooltip :content="t('ai.refreshModels')">
                <el-button
                  :icon="Refresh"
                  circle
                  :loading="loadingModels"
                  :aria-label="t('ai.refreshModels')"
                  @click="refreshModels"
                />
              </el-tooltip>
            </div>
          </el-form-item>
        </div>

        <el-form-item label="Base URL">
          <el-input v-model="form.baseUrl" :placeholder="t('ai.baseUrlPlaceholder')" />
        </el-form-item>
        <el-form-item label="API Key">
          <el-input
            v-model="form.apiKey"
            type="password"
            show-password
            :placeholder="current.apiKeyMasked || t('ai.apiKeyPlaceholder')"
          />
        </el-form-item>

        <el-switch v-model="form.enabled" :active-text="t('ai.enable')" />

        <div class="form-actions">
          <el-button type="primary" :loading="saving" @click="save">{{ t('common.save') }}</el-button>
          <el-button :loading="testing" @click="testConnection">{{ t('ai.test') }}</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { Refresh } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { api } from '../api';
import { useI18n } from '../i18n';

const { t } = useI18n();

const presetDefs = [
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
    labelKey: 'ai.qwen',
    provider: 'qwen',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    model: 'qwen-plus'
  },
  {
    value: 'zhipu',
    labelKey: 'ai.zhipu',
    provider: 'zhipu',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    model: 'glm-4-flash'
  },
  {
    value: 'kimi',
    labelKey: 'ai.kimi',
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
    labelKey: 'ai.siliconflow',
    provider: 'siliconflow',
    baseUrl: 'https://api.siliconflow.cn/v1',
    model: 'deepseek-ai/DeepSeek-V3'
  },
  {
    value: 'custom',
    labelKey: 'ai.custom',
    provider: '',
    baseUrl: '',
    model: ''
  }
];

const presets = computed(() => presetDefs.map((item) => ({
  ...item,
  label: item.labelKey ? t(item.labelKey) : item.label
})));

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
    selectedPreset.value = presetDefs.find((item) =>
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
  const preset = presetDefs.find((item) => item.value === selectedPreset.value);
  if (preset?.model) next.add(preset.model);
  modelOptions.value = [...next].filter(Boolean);
}

function applyPreset(value) {
  const preset = presetDefs.find((item) => item.value === value);
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
    ElMessage.warning(t('ai.needBaseUrl'));
    return;
  }
  if (!form.apiKey.trim() && !current.value.apiKeyMasked) {
    ElMessage.warning(t('ai.needApiKey'));
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
    ElMessage.success(t('ai.modelsFetched', { count: models.length }));
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
    ElMessage.success(t('ai.saved'));
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    saving.value = false;
  }
}

async function testConnection() {
  if (!form.baseUrl.trim() || !form.model.trim()) {
    ElMessage.warning(t('ai.needBaseUrlAndModel'));
    return;
  }
  if (!form.apiKey.trim() && !current.value.apiKeyMasked) {
    ElMessage.warning(t('ai.needApiKey'));
    return;
  }
  testing.value = true;
  try {
    const result = await api('/api/settings/llm/test', {
      method: 'POST',
      body: JSON.stringify({
        provider: form.provider,
        model: form.model,
        baseUrl: form.baseUrl,
        apiKey: form.apiKey
      })
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
