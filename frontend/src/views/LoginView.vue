<template>
  <div class="login-page">
    <div class="login-preference-bar">
      <PreferenceControls />
    </div>

    <section class="login-visual" :aria-label="t('login.visualAria')">
      <div class="login-visual-brand">
        <span class="login-brand-symbol" aria-hidden="true"><i></i><i></i><i></i></span>
        <div>
          <h1>AutoTest Studio</h1>
          <p>{{ t('login.tagline') }}</p>
        </div>
      </div>

      <div class="login-capabilities">
        <article>
          <span class="capability-tag">{{ t('login.capabilities.caseTag') }}</span>
          <h3>{{ t('login.capabilities.caseTitle') }}</h3>
          <small>{{ t('login.capabilities.caseDesc') }}</small>
        </article>
        <article>
          <span class="capability-tag">{{ t('login.capabilities.runTag') }}</span>
          <h3>{{ t('login.capabilities.runTitle') }}</h3>
          <small>{{ t('login.capabilities.runDesc') }}</small>
        </article>
        <article>
          <span class="capability-tag">{{ t('login.capabilities.processTag') }}</span>
          <h3>{{ t('login.capabilities.processTitle') }}</h3>
          <small>{{ t('login.capabilities.processDesc') }}</small>
        </article>
        <article>
          <span class="capability-tag">{{ t('login.capabilities.reportTag') }}</span>
          <h3>{{ t('login.capabilities.reportTitle') }}</h3>
          <small>{{ t('login.capabilities.reportDesc') }}</small>
        </article>
      </div>
    </section>

    <section class="login-panel-shell" :aria-label="t('login.panelAria')">
      <el-card class="login-card">
        <h2>{{ t('login.welcome') }}</h2>
        <p>{{ t('login.subtitle') }}</p>
        <el-form :model="form" @submit.prevent="submit">
          <el-form-item :label="t('login.username')"><el-input v-model="form.username" size="large" /></el-form-item>
          <el-form-item :label="t('login.password')"><el-input v-model="form.password" type="password" show-password size="large" /></el-form-item>
          <el-alert v-if="error" :title="error" type="error" show-icon :closable="false" />
          <el-button type="primary" size="large" native-type="submit" :loading="loading" class="login-button">{{ t('login.submit') }}</el-button>
        </el-form>
        <el-divider>{{ t('login.demoAccounts') }}</el-divider>
        <div class="test-accounts">
          <button
            v-for="account in accounts"
            :key="account.username"
            type="button"
            :class="{ active: form.username === account.username }"
            @click="selectAccount(account)"
          >
            <span>
              <strong>{{ t('login.demoRole') }}</strong>
              <small>{{ t('login.demoDescription') }}</small>
            </span>
            <code>{{ account.username }}</code>
          </button>
        </div>
        <p class="temporary-note">{{ t('login.temporaryNote') }}</p>
      </el-card>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { usePlatformStore } from '../stores/platform';
import { useI18n } from '../i18n';
import PreferenceControls from '../components/PreferenceControls.vue';

const store = usePlatformStore();
const { t } = useI18n();
const loading = ref(false);
const error = ref('');
const accounts = [
  { username: 'tester', password: 'Tester123!' },
  { username: 'maintainer', password: 'Maintainer123!' },
  { username: 'admin', password: 'Admin123!' }
];
const form = reactive({
  username: accounts[0].username,
  password: accounts[0].password
});

function selectAccount(account) {
  form.username = account.username;
  form.password = account.password;
  error.value = '';
}

async function submit() {
  loading.value = true;
  error.value = '';
  try {
    await store.login(form);
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}
</script>
