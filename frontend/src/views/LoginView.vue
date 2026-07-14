<template>
  <div class="login-page">
    <section class="login-visual" aria-label="JMOM 自动化测试平台介绍">
      <div class="login-visual-brand">
        <span class="login-brand-symbol" aria-hidden="true"><i></i><i></i><i></i></span>
        <div>
          <h1>JMOM 自动化测试平台</h1>
          <p>场景、数据、执行与证据的一体化工作台</p>
        </div>
      </div>

      <div class="login-capabilities">
        <article>
          <h3>场景管理</h3>
          <small>脚本、数据、环境与依赖统一沉淀</small>
        </article>
        <article>
          <h3>执行闭环</h3>
          <small>预检、执行、过程与结果全程追踪</small>
        </article>
        <article>
          <h3>证据回放</h3>
          <small>步骤、截图、录像与报告集中查看</small>
        </article>
      </div>
    </section>

    <section class="login-panel-shell" aria-label="登录">
      <el-card class="login-card">
        <h2>欢迎回来</h2><p>登录后开始执行自动化测试</p>
        <el-form :model="form" @submit.prevent="submit">
          <el-form-item label="账号"><el-input v-model="form.username" size="large" /></el-form-item>
          <el-form-item label="密码"><el-input v-model="form.password" type="password" show-password size="large" /></el-form-item>
          <el-alert v-if="error" :title="error" type="error" show-icon :closable="false" />
          <el-button type="primary" size="large" native-type="submit" :loading="loading" class="login-button">登录平台</el-button>
        </el-form>
        <el-divider>开发测试账号</el-divider>
        <div class="test-accounts">
          <button v-for="account in accounts" :key="account.username" type="button" :class="{active:form.username===account.username}" @click="selectAccount(account)">
            <span><strong>{{account.role}}</strong><small>{{account.description}}</small></span><code>{{account.username}}</code>
          </button>
        </div>
        <p class="temporary-note">临时显示，正式部署前可通过前端配置隐藏。</p>
      </el-card>
    </section>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';import { usePlatformStore } from '../stores/platform';
const store=usePlatformStore(),loading=ref(false),error=ref('');
const accounts=[{role:'测试人员',description:'执行场景、维护测试数据',username:'tester',password:'Tester123!'},{role:'场景维护员',description:'管理场景、应用和模块',username:'maintainer',password:'Maintainer123!'},{role:'管理员',description:'管理环境和全部平台配置',username:'admin',password:'Admin123!'}];
const form=reactive({username:accounts[0].username,password:accounts[0].password});function selectAccount(account){form.username=account.username;form.password=account.password;error.value=''}async function submit(){loading.value=true;error.value='';try{await store.login(form)}catch(e){error.value=e.message}finally{loading.value=false}}
</script>
