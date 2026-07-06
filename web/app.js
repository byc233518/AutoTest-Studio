import { buildScenarioTree, filterScenariosByTree } from './scenario-tree.mjs';

const state = {
  user: null,
  project: null,
  apps: [],
  modules: [],
  scenarios: [],
  selectedScenario: null,
  datasets: [],
  runs: [],
  llm: null,
  view: 'scenarios',
  filter: '',
  appFilter: '',
  moduleFilter: '',
  executionMode: 'headless',
  message: '',
  sampleRows: []
};

const app = document.querySelector('#app');

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'content-type': 'application/json' }),
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  const body = text ? JSON.parse(text) : {};
  if (!response.ok) throw new Error(body.message || '请求失败');
  return body;
}

function statusTag(status) {
  const map = {
    published: ['已发布', 'success'],
    draft: ['草稿', 'warning'],
    queued: ['排队中', 'warning'],
    running: ['执行中', 'warning'],
    passed: ['通过', 'success'],
    failed: ['失败', 'danger'],
    valid: ['有效', 'success']
  };
  const [text, cls] = map[status] || [status || '-', ''];
  return `<span class="tag ${cls}">${text}</span>`;
}

function roleName(role) {
  return { admin: '管理员', maintainer: '场景维护员', tester: '测试人员' }[role] || role;
}

function appName(appId) {
  return state.apps.find((item) => item.id === appId)?.name || appId || '-';
}

function moduleName(moduleId) {
  return state.modules.find((item) => item.id === moduleId)?.name || moduleId || '-';
}

function executionModeLabel(mode) {
  return {
    headless: '无头模式',
    headed: '有头模式',
    ui: 'UI 模式'
  }[mode] || mode || '无头模式';
}

async function bootstrap() {
  try {
    state.user = await api('/api/me');
    await Promise.all([loadCatalog(), loadRuns()]);
    render();
  } catch {
    renderLogin();
  }
}

async function loadCatalog() {
  const [catalog, apps, modules] = await Promise.all([
    api('/api/scenarios'),
    api('/api/apps'),
    api('/api/modules')
  ]);
  state.project = catalog.project;
  state.scenarios = catalog.scenarios;
  state.apps = apps.apps;
  state.modules = modules.modules;
  state.selectedScenario ||= state.scenarios.find((scenario) => scenario.key === 'wms-customer-create') || state.scenarios[0] || null;
  if (state.selectedScenario) await loadDatasets(state.selectedScenario.key);
}

async function loadDatasets(key) {
  state.datasets = await api(`/api/scenarios/${key}/datasets`);
}

async function loadRuns() {
  state.runs = await api('/api/runs');
}

function renderLogin() {
  app.innerHTML = `
    <section class="login-shell">
      <form class="login-panel" id="loginForm">
        <h1>JMOM 自动化测试平台</h1>
        <p class="muted">选择应用、模块和测试场景，上传或生成样本数据，执行回归并查看过程资产。</p>
        <div class="field"><label>账号</label><input name="username" value="tester" autocomplete="username" /></div>
        <div class="field"><label>密码</label><input name="password" type="password" value="Tester123!" autocomplete="current-password" /></div>
        <button type="submit">登录平台</button>
        <p class="message" id="loginMessage"></p>
      </form>
      <aside class="login-visual">
        <div>
          <h1>把自动化脚本变成测试资产</h1>
          <p>应用、模块、场景、数据、报告和 AI 能力集中管理。</p>
        </div>
      </aside>
    </section>
  `;
  document.querySelector('#loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      state.user = await api('/api/auth/login', { method: 'POST', body: JSON.stringify(Object.fromEntries(form)) });
      await Promise.all([loadCatalog(), loadRuns()]);
      render();
    } catch (error) {
      document.querySelector('#loginMessage').textContent = error.message;
    }
  });
}

function navButton(id, label) {
  return `<button class="${state.view === id ? 'active' : ''}" data-view="${id}">${label}</button>`;
}

function renderShell(content) {
  app.innerHTML = `
    <section class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">J</div>
          <div><strong>JMOM 测试平台</strong><div class="muted">${roleName(state.user.role)}</div></div>
        </div>
        <nav class="nav">
          ${navButton('apps', '应用管理')}
          ${navButton('modules', '模块管理')}
          ${navButton('scenarios', '测试场景')}
          ${navButton('runs', '执行与报告')}
          ${navButton('settings', 'AI 设置')}
        </nav>
      </aside>
      <section class="content">
        <header class="topbar">
          <div><h1>${state.project?.name || 'JMOM'} 自动化测试</h1><div class="muted">集中 Runner：Playwright / 测试环境</div></div>
          <button class="secondary" id="logoutBtn">退出</button>
        </header>
        ${content}
      </section>
    </section>
  `;
  document.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', async () => {
      state.view = button.dataset.view;
      state.message = '';
      if (state.view === 'runs') await loadRuns();
      if (state.view === 'settings') await loadLlmSetting();
      render();
    });
  });
  document.querySelector('#logoutBtn').addEventListener('click', async () => {
    await api('/api/auth/logout', { method: 'POST', body: '{}' });
    state.user = null;
    renderLogin();
  });
}

function render() {
  if (!state.user) return renderLogin();
  if (state.view === 'apps') return renderApps();
  if (state.view === 'modules') return renderModules();
  if (state.view === 'runs') return renderRuns();
  if (state.view === 'settings') return renderSettings();
  return renderScenarios();
}

function table(headers, rows) {
  return `
    <table class="table">
      <thead><tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr></thead>
      <tbody>${rows.join('')}</tbody>
    </table>
  `;
}

function renderApps() {
  renderShell(`
    <section class="panel">
      <h2>应用管理</h2>
      ${table(['应用', '标识', '说明', '模块数', '场景数'], state.apps.map((item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.key}</td>
          <td>${item.description}</td>
          <td>${state.modules.filter((module) => module.appId === item.id).length}</td>
          <td>${state.scenarios.filter((scenario) => scenario.appId === item.id).length}</td>
        </tr>
      `))}
    </section>
  `);
}

function renderModules() {
  renderShell(`
    <section class="panel">
      <h2>模块管理</h2>
      <div class="toolbar">
        <select id="appFilterForModules">
          <option value="">全部应用</option>
          ${state.apps.map((item) => `<option value="${item.id}" ${state.appFilter === item.id ? 'selected' : ''}>${item.name}</option>`).join('')}
        </select>
      </div>
      ${table(['模块', '所属应用', '前缀/控制器', '场景数'], state.modules
        .filter((item) => !state.appFilter || item.appId === state.appFilter)
        .map((item) => `
          <tr>
            <td>${item.name}</td>
            <td>${appName(item.appId)}</td>
            <td>${item.prefix}</td>
            <td>${state.scenarios.filter((scenario) => scenario.moduleId === item.id).length}</td>
          </tr>
        `))}
    </section>
  `);
  document.querySelector('#appFilterForModules').addEventListener('change', (event) => {
    state.appFilter = event.target.value;
    renderModules();
  });
}

function filteredScenarios() {
  return filterScenariosByTree(state.scenarios, {
    appId: state.appFilter,
    moduleId: state.moduleFilter,
    keyword: state.filter
  });
}

function scenarioFilterLabel() {
  if (state.moduleFilter) return moduleName(state.moduleFilter);
  if (state.appFilter) return appName(state.appFilter);
  return '全部场景';
}

async function syncSelectedScenarioWithVisibleList() {
  const visibleScenarios = filteredScenarios();
  if (!visibleScenarios.length) {
    state.selectedScenario = null;
    state.datasets = [];
    state.sampleRows = [];
    return;
  }

  if (visibleScenarios.some((scenario) => scenario.key === state.selectedScenario?.key)) return;

  state.selectedScenario = visibleScenarios[0];
  state.sampleRows = [];
  await loadDatasets(state.selectedScenario.key);
}

function renderScenarioTree() {
  const tree = buildScenarioTree(state.apps, state.modules, state.scenarios);
  const allActive = !state.appFilter && !state.moduleFilter;

  return `
    <section class="panel scenario-tree-panel">
      <h2>场景分类</h2>
      <button class="tree-node tree-root ${allActive ? 'active' : ''}" data-tree-all aria-current="${allActive ? 'true' : 'false'}">
        <span>全部场景</span><strong>${tree.total}</strong>
      </button>
      <div class="tree-groups">
        ${tree.apps.map((appItem) => `
          <div class="tree-group">
            <button class="tree-node app-node ${state.appFilter === appItem.id && !state.moduleFilter ? 'active' : ''}" data-tree-app-id="${appItem.id}">
              <span>${appItem.name}</span><strong>${appItem.scenarioCount}</strong>
            </button>
            <div class="tree-children">
              ${appItem.modules.map((moduleItem) => `
                <button class="tree-node module-node ${state.moduleFilter === moduleItem.id ? 'active' : ''}" data-tree-module-id="${moduleItem.id}" data-tree-parent-app-id="${appItem.id}">
                  <span>${moduleItem.name}</span><strong>${moduleItem.scenarioCount}</strong>
                </button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderScenarios() {
  const scenario = state.selectedScenario;
  const visibleScenarios = filteredScenarios();
  const scenarioRows = visibleScenarios.length ? visibleScenarios.map((item) => `
    <tr data-scenario="${item.key}">
      <td><strong>${item.name}</strong><div class="muted">${item.description}</div></td>
      <td>${appName(item.appId)}</td>
      <td>${moduleName(item.moduleId)}</td>
      <td>${item.priority}</td>
      <td>${statusTag(item.status)}</td>
      <td>${item.version}</td>
      <td><button class="secondary" data-select="${item.key}">选择</button></td>
    </tr>
  `) : ['<tr><td colspan="7"><span class="muted">当前分类下暂无测试场景</span></td></tr>'];
  renderShell(`
    <div class="grid dashboard-grid">
      <div class="panel stat"><span class="muted">应用</span><strong>${state.apps.length}</strong></div>
      <div class="panel stat"><span class="muted">模块</span><strong>${state.modules.length}</strong></div>
      <div class="panel stat"><span class="muted">场景</span><strong>${state.scenarios.length}</strong></div>
      <div class="panel stat"><span class="muted">最近执行</span><strong>${state.runs.length}</strong></div>
    </div>
    <div class="grid scenario-workspace" style="margin-top:16px">
      ${renderScenarioTree()}
      <section class="panel scenario-table-panel">
        <div class="section-heading">
          <div>
            <h2>测试场景列表</h2>
            <div class="muted">${scenarioFilterLabel()} · ${visibleScenarios.length} 个场景</div>
          </div>
        </div>
        <div class="toolbar">
          <input id="filterInput" placeholder="搜索场景、模块、编号" value="${state.filter}" />
        </div>
        ${table(['场景', '应用', '模块', '优先级', '状态', '版本', '操作'], scenarioRows)}
      </section>
      <aside class="side-stack">${scenario ? renderScenarioDetails(scenario) : '<section class="panel">请选择场景</section>'}</aside>
    </div>
  `);
  document.querySelector('#filterInput').addEventListener('input', async (event) => {
    state.filter = event.target.value;
    await syncSelectedScenarioWithVisibleList();
    renderScenarios();
  });
  document.querySelector('[data-tree-all]').addEventListener('click', async () => {
    state.appFilter = '';
    state.moduleFilter = '';
    await syncSelectedScenarioWithVisibleList();
    renderScenarios();
  });
  document.querySelectorAll('[data-tree-app-id]').forEach((button) => {
    button.addEventListener('click', async () => {
      state.appFilter = button.dataset.treeAppId;
      state.moduleFilter = '';
      await syncSelectedScenarioWithVisibleList();
      renderScenarios();
    });
  });
  document.querySelectorAll('[data-tree-module-id]').forEach((button) => {
    button.addEventListener('click', async () => {
      state.appFilter = button.dataset.treeParentAppId;
      state.moduleFilter = button.dataset.treeModuleId;
      await syncSelectedScenarioWithVisibleList();
      renderScenarios();
    });
  });
  document.querySelectorAll('[data-select]').forEach((button) => {
    button.addEventListener('click', async () => {
      state.selectedScenario = state.scenarios.find((item) => item.key === button.dataset.select);
      state.sampleRows = [];
      await loadDatasets(state.selectedScenario.key);
      renderScenarios();
    });
  });
  wireScenarioForm();
}

function renderScenarioDetails(scenario) {
  return `
    <section class="panel details">
      <h2>${scenario.name}</h2>
      <p class="muted">${scenario.description}</p>
      <div class="schema-list">${scenario.dataSchema.columns.map((column) => `<span>${column}${scenario.dataSchema.required.includes(column) ? ' *' : ''}</span>`).join('')}</div>
      <div class="button-row">
        <a href="/api/scenarios/${scenario.key}/template.csv"><button class="secondary">下载CSV模板</button></a>
        <button id="generateSample">生成样例数据</button>
      </div>
    </section>
    <section class="panel">
      <h2>上传样本数据</h2>
      <form id="datasetForm" class="grid">
        <input name="name" placeholder="数据集名称，例如：客户回归样本-本周" required />
        <input name="file" type="file" accept=".csv,.xlsx" required />
        <button type="submit">上传并校验</button>
        <p class="message">${state.message}</p>
      </form>
      ${state.sampleRows.length ? `<div class="sample-box"><strong>样例数据预览</strong><pre>${JSON.stringify(state.sampleRows, null, 2)}</pre></div>` : ''}
    </section>
    <section class="panel">
      <h2>数据集列表</h2>
      <div class="execution-mode-picker" role="group" aria-label="执行模式">
        ${['headless', 'headed', 'ui'].map((mode) => `
          <button class="mode-button ${state.executionMode === mode ? 'active' : ''}" data-execution-mode="${mode}" type="button">
            ${executionModeLabel(mode)}
          </button>
        `).join('')}
      </div>
      ${table(['名称', '文件', '行数', '状态', '操作'], state.datasets.map((dataset) => `
        <tr>
          <td>${dataset.name}</td>
          <td>${dataset.fileName}</td>
          <td>${dataset.rowCount}</td>
          <td>${statusTag(dataset.validationStatus)}</td>
          <td><button data-run="${dataset.id}">执行</button></td>
        </tr>
      `))}
    </section>
  `;
}

function wireScenarioForm() {
  document.querySelector('#generateSample')?.addEventListener('click', async () => {
    const sample = await api(`/api/scenarios/${state.selectedScenario.key}/sample-data`, { method: 'POST', body: JSON.stringify({ count: 3 }) });
    state.sampleRows = sample.rows;
    state.message = '已生成样例数据，可复制后保存为 CSV 上传。';
    renderScenarios();
  });
  const form = document.querySelector('#datasetForm');
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      state.message = '';
      try {
        await api(`/api/scenarios/${state.selectedScenario.key}/datasets`, { method: 'POST', body: new FormData(form) });
        await loadDatasets(state.selectedScenario.key);
      } catch (error) {
        state.message = error.message;
      }
      renderScenarios();
    });
  }
  document.querySelectorAll('[data-execution-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      state.executionMode = button.dataset.executionMode;
      renderScenarios();
    });
  });
  document.querySelectorAll('[data-run]').forEach((button) => {
    button.addEventListener('click', async () => {
      await api('/api/runs', {
        method: 'POST',
        body: JSON.stringify({
          scenarioId: state.selectedScenario.id,
          datasetId: button.dataset.run,
          environment: 'test',
          executionMode: state.executionMode
        })
      });
      await loadRuns();
      state.view = 'runs';
      render();
    });
  });
}

function artifactLinks(run) {
  if (!run.processArtifacts?.length) return '-';
  return run.processArtifacts.map((artifact) => `<a href="${artifact.url}" target="_blank">${artifact.label}</a>`).join(' / ');
}

function renderRuns() {
  renderShell(`
    <section class="panel">
      <h2>执行与报告</h2>
      <div class="toolbar"><button id="refreshRuns">刷新执行记录</button></div>
      ${table(['执行编号', '状态', '环境', '执行模式', '开始时间', '结束时间', '结果', '过程查看'], state.runs.map((run) => `
        <tr>
          <td>${run.runId}</td>
          <td>${statusTag(run.status)}</td>
          <td>${run.environment}</td>
          <td>${executionModeLabel(run.executionMode)}</td>
          <td>${run.startedAt || '-'}</td>
          <td>${run.finishedAt || '-'}</td>
          <td>${run.summary?.passed ?? 0}/${run.summary?.total ?? 0}</td>
          <td>${artifactLinks(run)}</td>
        </tr>
      `))}
    </section>
  `);
  document.querySelector('#refreshRuns').addEventListener('click', async () => { await loadRuns(); renderRuns(); });
}

async function loadLlmSetting() {
  if (!['admin', 'maintainer'].includes(state.user.role)) {
    state.llm = null;
    return;
  }
  state.llm = await api('/api/settings/llm');
}

function renderSettings() {
  if (!['admin', 'maintainer'].includes(state.user.role)) {
    renderShell('<section class="panel"><h2>AI 设置</h2><p class="muted">当前账号无权查看 LLM 配置。</p></section>');
    return;
  }
  const llm = state.llm || {};
  renderShell(`
    <section class="panel settings-panel">
      <h2>LLM Key 配置</h2>
      <p class="muted">用于后续 AI 生成测试场景和自动创建测试数据。API Key 只保存，不在页面回显原文。</p>
      <form id="llmForm" class="grid">
        <div class="split">
          <div class="field"><label>供应商</label><input name="provider" value="${llm.provider || 'openai'}" /></div>
          <div class="field"><label>模型</label><input name="model" value="${llm.model || 'gpt-4.1-mini'}" /></div>
        </div>
        <div class="field"><label>Base URL</label><input name="baseUrl" value="${llm.baseUrl || ''}" placeholder="可选，例如兼容 OpenAI 的代理地址" /></div>
        <div class="field"><label>API Key</label><input name="apiKey" type="password" placeholder="${llm.apiKeyMasked || '请输入 API Key'}" /></div>
        <button type="submit" ${state.user.role !== 'admin' ? 'disabled' : ''}>保存配置</button>
        <p class="muted">当前密钥：${llm.apiKeyMasked || '未配置'}</p>
        <p class="message">${state.message}</p>
      </form>
    </section>
  `);
  document.querySelector('#llmForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    try {
      state.llm = await api('/api/settings/llm', { method: 'PUT', body: JSON.stringify({ ...payload, enabled: true }) });
      state.message = 'LLM 配置已保存。';
    } catch (error) {
      state.message = error.message;
    }
    renderSettings();
  });
}

bootstrap();
