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
  runScenarioFilter: '',
  runDialog: {
    open: false,
    scenario: null,
    source: 'history',
    datasetId: '',
    dataName: '',
    manualCsv: '',
    executionMode: 'headless',
    message: ''
  },
  activeRunId: '',
  activeRunProcess: null,
  runRefreshTimer: null,
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
  const contentType = response.headers.get('content-type') || '';
  if (text && !contentType.includes('application/json')) {
    throw new Error(`接口返回了非 JSON 内容：${path}`);
  }
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
    skipped: ['已跳过', 'warning'],
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

function scenarioByKey(key) {
  return state.scenarios.find((item) => item.key === key);
}

function scenarioById(id) {
  return state.scenarios.find((item) => item.id === id);
}

function scenarioNameForRun(run) {
  return scenarioById(run.scenarioId)?.name || run.scenarioId || '-';
}

function filteredRuns() {
  return state.runScenarioFilter
    ? state.runs.filter((run) => run.scenarioId === state.runScenarioFilter)
    : state.runs;
}

function runScenarioFilterLabel() {
  if (!state.runScenarioFilter) return '全部场景';
  return scenarioById(state.runScenarioFilter)?.name || state.runScenarioFilter;
}

function syncActiveRunWithRunFilter() {
  const runs = filteredRuns();
  if (runs.some((run) => run.runId === state.activeRunId)) return false;
  state.activeRunId = runs[0]?.runId || '';
  state.activeRunProcess = null;
  return true;
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
  state.activeRunId ||= state.runs[0]?.runId || '';
}

async function loadRunProcess(runId = state.activeRunId) {
  if (!runId) {
    state.activeRunProcess = null;
    return null;
  }
  try {
    state.activeRunProcess = await api(`/api/runs/${runId}/process`);
    return state.activeRunProcess;
  } catch (error) {
    return failedRunProcess(error, runId);
  }
}

function failedRunProcess(error, runId = state.activeRunId) {
  const run = state.runs.find((item) => item.runId === runId);
  state.activeRunProcess = {
    runId,
    scenarioName: run?.scenarioId || '执行记录',
    datasetName: run?.datasetId || '-',
    executionMode: run?.executionMode || 'headless',
    status: run?.status || 'failed',
    canWatchLive: false,
    livePreviewUrl: null,
    latestScreenshotUrl: null,
    videoReplayUrl: null,
    videoFileUrl: null,
    currentStep: '过程信息加载失败',
    error: error.message,
    steps: [],
    summary: run?.summary || {},
    resultTests: [],
    evidence: {},
    artifacts: run?.processArtifacts || []
  };
  return state.activeRunProcess;
}

function stopRunRefreshTimer() {
  if (state.runRefreshTimer) {
    clearInterval(state.runRefreshTimer);
    state.runRefreshTimer = null;
  }
}

function startRunRefreshTimer() {
  stopRunRefreshTimer();
  const process = state.activeRunProcess;
  if (!process || !['queued', 'running'].includes(process.status)) return;
  state.runRefreshTimer = setInterval(async () => {
    if (state.view !== 'runs' || !state.activeRunId) {
      stopRunRefreshTimer();
      return;
    }
    await loadRuns();
    await loadRunProcess();
    renderRuns();
  }, 2000);
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

function renderPageTabs() {
  const tabs = [
    ['apps', '应用管理'],
    ['modules', '模块管理'],
    ['scenarios', '测试场景'],
    ['runs', '执行与报告'],
    ['settings', 'AI 设置']
  ];
  return tabs.map(([id, label]) => `
    <button class="page-tab ${state.view === id ? 'active' : ''}" data-view="${id}">
      <span>${label}</span>
    </button>
  `).join('');
}

function renderShell(content) {
  app.innerHTML = `
    <section class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">J</div>
          <span class="brand-copy">
            <strong>JMOM</strong>
            <small>测试平台</small>
          </span>
        </div>
        <nav class="nav">
          ${navButton('apps', '应用管理')}
          ${navButton('modules', '模块管理')}
          ${navButton('scenarios', '测试场景')}
          ${navButton('runs', '执行与报告')}
          ${navButton('settings', 'AI 设置')}
        </nav>
      </aside>
      <main class="workspace">
        <header class="topbar">
          <div>
            <h1>${state.project?.name || 'JMOM'} 自动化测试</h1>
            <div class="muted">集中 Runner：Playwright / 测试环境 · ${roleName(state.user.role)}</div>
          </div>
          <div class="topbar-actions">
            <button class="user-chip" type="button">${state.user.displayName || state.user.username}</button>
            <button class="secondary" id="logoutBtn">退出</button>
          </div>
        </header>
        <section class="tabs-bar" aria-label="多页签导航">
          ${renderPageTabs()}
        </section>
        <section class="content-area">
          ${content}
        </section>
      </main>
    </section>
  `;
  document.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', async () => {
      state.view = button.dataset.view;
      state.message = '';
      if (state.view === 'runs') {
        await loadRuns();
        syncActiveRunWithRunFilter();
        await loadRunProcess();
      }
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
  stopRunRefreshTimer();
  if (!state.user) return renderLogin();
  if (state.view === 'apps') return renderApps();
  if (state.view === 'modules') return renderModules();
  if (state.view === 'runs') return renderRuns();
  if (state.view === 'settings') return renderSettings();
  return renderScenarios();
}

function table(headers, rows, options = {}) {
  return `
    <div class="table-scroll ${options.className || ''}">
      <table class="table">
        <thead><tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr></thead>
        <tbody>${rows.join('')}</tbody>
      </table>
    </div>
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
      `), { className: 'apps-table-scroll' })}
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
        `), { className: 'modules-table-scroll' })}
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
      <td>
        <div class="row-actions">
          <button class="secondary" data-select="${item.key}">选择</button>
          <button data-open-run-dialog="${item.key}">执行</button>
          <button class="secondary" data-open-history="${item.key}">历史</button>
        </div>
      </td>
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
        ${table(['场景', '应用', '模块', '优先级', '状态', '版本', '操作'], scenarioRows, { className: 'scenarios-table-scroll' })}
      </section>
      <aside class="side-stack">${scenario ? renderScenarioDetails(scenario) : '<section class="panel">请选择场景</section>'}</aside>
    </div>
    ${renderRunDialog()}
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
  document.querySelectorAll('[data-open-run-dialog]').forEach((button) => {
    button.addEventListener('click', async () => {
      const scenario = scenarioByKey(button.dataset.openRunDialog);
      if (scenario) await openRunDialog(scenario);
    });
  });
  document.querySelectorAll('[data-open-history]').forEach((button) => {
    button.addEventListener('click', async () => {
      const scenario = scenarioByKey(button.dataset.openHistory);
      if (scenario) await openScenarioHistory(scenario);
    });
  });
  wireScenarioForm();
  wireRunDialog();
}

async function openRunDialog(scenario) {
  state.selectedScenario = scenario;
  state.sampleRows = [];
  await loadDatasets(scenario.key);
  state.runDialog = {
    open: true,
    scenario,
    source: state.datasets.length ? 'history' : 'upload',
    datasetId: state.datasets[0]?.id || '',
    dataName: `${scenario.name}样本`,
    manualCsv: '',
    executionMode: state.executionMode,
    message: ''
  };
  renderScenarios();
}

async function openScenarioHistory(scenario) {
  state.runScenarioFilter = scenario.id;
  await loadRuns();
  syncActiveRunWithRunFilter();
  await loadRunProcess();
  state.view = 'runs';
  render();
}

function closeRunDialog() {
  state.runDialog.open = false;
  state.runDialog.message = '';
  renderScenarios();
}

function renderRunDialog() {
  if (!state.runDialog.open || !state.runDialog.scenario) return '';
  const scenario = state.runDialog.scenario;
  const source = state.runDialog.source;
  const datasets = state.datasets;

  return `
    <div class="modal-backdrop" role="presentation">
      <section class="modal run-dialog" role="dialog" aria-modal="true" aria-labelledby="runDialogTitle">
        <div class="section-heading">
          <div>
            <h2 id="runDialogTitle">执行场景</h2>
            <div class="muted">${scenario.name} · 选择或准备本次测试数据</div>
          </div>
          <button class="secondary icon-button" id="closeRunDialog" type="button" aria-label="关闭">×</button>
        </div>
        <form id="runDialogForm" class="run-dialog-form">
          <div class="run-source-tabs" role="tablist" aria-label="数据来源">
            ${[
              ['history', '选择历史数据'],
              ['upload', '上传文件'],
              ['manual', '填写CSV']
            ].map(([value, label]) => `
              <button type="button" class="source-tab ${source === value ? 'active' : ''}" data-run-source="${value}">
                ${label}
              </button>
            `).join('')}
          </div>
          <div class="run-source-panel">
            ${source === 'history' ? `
              <div class="field">
                <label>历史测试数据</label>
                <select name="datasetId" ${datasets.length ? '' : 'disabled'}>
                  ${datasets.length
                    ? datasets.map((dataset) => `<option value="${dataset.id}" ${state.runDialog.datasetId === dataset.id ? 'selected' : ''}>${dataset.name} · ${dataset.rowCount} 行 · ${dataset.fileName}</option>`).join('')
                    : '<option value="">暂无历史数据，请上传或填写</option>'}
                </select>
              </div>
            ` : ''}
            ${source === 'upload' ? `
              <div class="split">
                <div class="field">
                  <label>数据集名称</label>
                  <input name="dataName" value="${state.runDialog.dataName}" placeholder="例如：客户主数据回归样本" />
                </div>
                <div class="field">
                  <label>CSV / Excel 文件</label>
                  <input name="file" type="file" accept=".csv,.xlsx" />
                </div>
              </div>
            ` : ''}
            ${source === 'manual' ? `
              <div class="field">
                <label>数据集名称</label>
                <input name="dataName" value="${state.runDialog.dataName}" placeholder="例如：手工填写样本" />
              </div>
              <div class="field">
                <label>CSV 数据</label>
                <textarea name="manualCsv" placeholder="粘贴或填写 CSV，首行为字段名">${state.runDialog.manualCsv}</textarea>
              </div>
              <button class="secondary" id="fillSampleCsv" type="button">生成样例数据</button>
            ` : ''}
          </div>
          <div class="run-dialog-footer">
            <div class="field compact-field">
              <label>执行模式</label>
              <select name="executionMode">
                ${['headless', 'headed', 'ui'].map((mode) => `
                  <option value="${mode}" ${state.runDialog.executionMode === mode ? 'selected' : ''}>${executionModeLabel(mode)}</option>
                `).join('')}
              </select>
            </div>
            <div class="button-row">
              <button class="secondary" id="cancelRunDialog" type="button">取消</button>
              <button type="submit">执行</button>
            </div>
          </div>
          <p class="message">${state.runDialog.message || ''}</p>
        </form>
      </section>
    </div>
  `;
}

function preserveRunDialogForm(form) {
  if (!form) return;
  const data = new FormData(form);
  state.runDialog.datasetId = data.get('datasetId') || state.runDialog.datasetId || '';
  state.runDialog.dataName = data.get('dataName') || state.runDialog.dataName || '';
  state.runDialog.manualCsv = data.get('manualCsv') || state.runDialog.manualCsv || '';
  state.runDialog.executionMode = data.get('executionMode') || state.runDialog.executionMode;
}

async function createDatasetFromDialog(form, scenario) {
  const data = new FormData(form);
  if (state.runDialog.source === 'history') {
    const datasetId = data.get('datasetId');
    if (!datasetId) throw new Error('请选择历史测试数据');
    return datasetId;
  }

  const upload = new FormData();
  upload.append('name', data.get('dataName') || `${scenario.name}样本`);
  if (state.runDialog.source === 'upload') {
    const file = data.get('file');
    if (!file || !file.name) throw new Error('请上传 CSV 或 Excel 样本文件');
    upload.append('file', file);
  } else {
    const csv = String(data.get('manualCsv') || '').trim();
    if (!csv) throw new Error('请填写 CSV 样本数据');
    upload.append('file', new Blob([`${csv}\n`], { type: 'text/csv;charset=utf-8' }), 'manual-sample.csv');
  }

  const dataset = await api(`/api/scenarios/${scenario.key}/datasets`, { method: 'POST', body: upload });
  await loadDatasets(scenario.key);
  return dataset.id;
}

async function runScenarioWithDataset(scenario, datasetId, executionMode) {
  state.executionMode = executionMode;
  const run = await api('/api/runs', {
    method: 'POST',
    body: JSON.stringify({
      scenarioId: scenario.id,
      datasetId,
      environment: 'test',
      executionMode
    })
  });
  state.activeRunId = run.runId;
  state.runScenarioFilter = scenario.id;
  state.runDialog.open = false;
  await loadRuns();
  await loadRunProcess();
  state.view = 'runs';
  render();
}

function wireRunDialog() {
  if (!state.runDialog.open) return;
  const form = document.querySelector('#runDialogForm');
  document.querySelector('#closeRunDialog')?.addEventListener('click', closeRunDialog);
  document.querySelector('#cancelRunDialog')?.addEventListener('click', closeRunDialog);
  document.querySelectorAll('[data-run-source]').forEach((button) => {
    button.addEventListener('click', () => {
      preserveRunDialogForm(form);
      state.runDialog.source = button.dataset.runSource;
      state.runDialog.message = '';
      renderScenarios();
    });
  });
  document.querySelector('#fillSampleCsv')?.addEventListener('click', async () => {
    preserveRunDialogForm(form);
    const sample = await api(`/api/scenarios/${state.runDialog.scenario.key}/sample-data`, { method: 'POST', body: JSON.stringify({ count: 3 }) });
    state.runDialog.source = 'manual';
    state.runDialog.manualCsv = sample.csv;
    state.runDialog.message = '已生成样例 CSV，可直接调整后执行';
    renderScenarios();
  });
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    preserveRunDialogForm(form);
    const scenario = state.runDialog.scenario;
    try {
      const datasetId = await createDatasetFromDialog(form, scenario);
      await runScenarioWithDataset(scenario, datasetId, state.runDialog.executionMode);
    } catch (error) {
      state.runDialog.message = error.message;
      renderScenarios();
    }
  });
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
      ${table(['名称', '文件', '行数', '状态', '操作'], state.datasets.map((dataset) => `
        <tr>
          <td>${dataset.name}</td>
          <td>${dataset.fileName}</td>
          <td>${dataset.rowCount}</td>
          <td>${statusTag(dataset.validationStatus)}</td>
          <td>
            <div class="run-action-group">
              <select class="run-mode-select" data-run-mode="${dataset.id}" aria-label="执行模式">
                ${['headless', 'headed', 'ui'].map((mode) => `
                  <option value="${mode}" ${state.executionMode === mode ? 'selected' : ''}>${executionModeLabel(mode)}</option>
                `).join('')}
              </select>
              <button data-run="${dataset.id}">执行</button>
            </div>
          </td>
        </tr>
      `), { className: 'datasets-table-scroll' })}
    </section>
  `;
}

function selectedRunMode(datasetId) {
  const modeSelect = document.querySelector(`[data-run-mode="${datasetId}"]`);
  return modeSelect?.value || state.executionMode;
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
  document.querySelectorAll('[data-run]').forEach((button) => {
    button.addEventListener('click', async () => {
      state.executionMode = selectedRunMode(button.dataset.run);
      const run = await api('/api/runs', {
        method: 'POST',
        body: JSON.stringify({
          scenarioId: state.selectedScenario.id,
          datasetId: button.dataset.run,
          environment: 'test',
          executionMode: state.executionMode
        })
      });
      state.activeRunId = run.runId;
      state.runScenarioFilter = state.selectedScenario.id;
      await loadRuns();
      await loadRunProcess();
      state.view = 'runs';
      render();
    });
  });
}

function artifactLinks(run) {
  if (!run.processArtifacts?.length) return '-';
  return run.processArtifacts.map((artifact) => `<a href="${artifact.url}" target="_blank">${artifact.label}</a>`).join(' / ');
}

function runRow(run) {
  return `
    <tr class="${state.activeRunId === run.runId ? 'active-row' : ''}">
      <td><button class="text-button" data-open-run="${run.runId}">${run.runId}</button></td>
      <td>${scenarioNameForRun(run)}</td>
      <td>${statusTag(run.status)}</td>
      <td>${run.environment}</td>
      <td>${executionModeLabel(run.executionMode)}</td>
      <td>${run.startedAt || '-'}</td>
      <td>${run.finishedAt || '-'}</td>
      <td>${run.summary?.passed ?? 0}/${run.summary?.total ?? 0}</td>
      <td>${artifactLinks(run)}</td>
    </tr>
  `;
}

function renderProcessSteps(process) {
  if (!process?.steps?.length) {
    return '<div class="muted">暂无步骤状态</div>';
  }
  return `
    <ol class="process-steps">
      ${process.steps.map((step) => `
        <li class="${step.status}">
          <span class="step-dot"></span>
          <div>
            <strong>${step.title}</strong>
            <small>${step.status}</small>
          </div>
        </li>
      `).join('')}
    </ol>
  `;
}

function renderResultSummaryPreview(process) {
  const summary = process?.summary || {};
  const tests = process?.resultTests || [];
  return `
    <div class="result-summary-preview">
      <strong>执行结果摘要</strong>
      <div class="result-metrics">
        <span>总数 <b>${summary.total ?? 0}</b></span>
        <span>通过 <b>${summary.passed ?? 0}</b></span>
        <span>失败 <b>${summary.failed ?? 0}</b></span>
        <span>跳过 <b>${summary.skipped ?? 0}</b></span>
      </div>
      ${tests.length ? `<ol>${tests.slice(0, 6).map((item) => `<li><span>${item.status || '-'}</span>${item.title || '-'}</li>`).join('')}</ol>` : '<p>暂无测试明细</p>'}
    </div>
  `;
}

function renderEvidenceNotice(process) {
  if (!process) return '';
  const evidence = process.evidence || {};
  const messages = [];
  if (evidence.skippedOnly) messages.push('本次用例全部跳过，所以不会产生真实浏览器录像。');
  if (!evidence.hasVideoFile) messages.push('未生成 video.webm，可查看截图、步骤和 HTML 报告。');
  if (!evidence.hasScreenshot) messages.push('未采集到真实截图，平台已生成执行摘要占位图。');
  if (!messages.length) return '';
  return `<div class="evidence-notice">${messages.join(' ')}</div>`;
}

function renderResultTests(process) {
  const tests = process?.resultTests || [];
  if (!tests.length) return '';
  return `
    <div class="result-tests">
      <strong>测试步骤明细</strong>
      ${tests.slice(0, 8).map((item) => `
        <div class="result-test ${item.status || ''}">
          <span>${item.status || '-'}</span>
          <p>${item.title || '-'}</p>
          ${item.error ? `<small>${item.error}</small>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function renderMediaPreview(process) {
  if (!process) {
    return '<div class="empty-preview">请选择一条执行记录</div>';
  }
  if (process.status === 'running' && process.livePreviewUrl) {
    return `<iframe class="live-preview-frame" title="实时执行过程" src="${process.livePreviewUrl}"></iframe>`;
  }
  if (process.videoFileUrl) {
    return `<video class="video-preview" controls src="${process.videoFileUrl}"></video>`;
  }
  if (process.latestScreenshotUrl) {
    return `<img class="screenshot-preview" src="${process.latestScreenshotUrl}" alt="过程截图" />`;
  }
  if (process.videoReplayUrl) {
    return `<iframe class="live-preview-frame" title="录像回放" src="${process.videoReplayUrl}"></iframe>`;
  }
  if (process.summary || process.resultTests?.length) {
    return renderResultSummaryPreview(process);
  }
  return '<div class="empty-preview">暂无截图或录像</div>';
}

function renderProcessPanel() {
  const process = state.activeRunProcess;
  return `
    <section class="panel run-process-panel">
      <div class="section-heading">
        <div>
          <h2>过程查看</h2>
          <div class="muted">${process ? `${process.scenarioName} · ${executionModeLabel(process.executionMode)}` : '选择执行记录查看过程'}</div>
        </div>
        ${process?.canWatchLive && ['queued', 'running'].includes(process.status) ? `<a href="${process.livePreviewUrl}" target="_blank"><button>实时查看</button></a>` : ''}
      </div>
      <div class="run-process-layout">
        <div class="process-main">
          ${renderMediaPreview(process)}
        </div>
        <aside class="process-side">
          <div class="process-status-card">
            <span class="muted">当前状态</span>
            <strong>${process ? statusTag(process.status) : '-'}</strong>
            <p>${process?.currentStep || '暂无过程信息'}</p>
          </div>
          ${renderEvidenceNotice(process)}
          ${renderProcessSteps(process)}
          ${renderResultTests(process)}
          <div class="button-row">
            ${process?.latestScreenshotUrl ? `<a href="${process.latestScreenshotUrl}" target="_blank"><button class="secondary">查看截图</button></a>` : ''}
            ${process?.videoReplayUrl ? `<a href="${process.videoReplayUrl}" target="_blank"><button class="secondary">录像回放</button></a>` : ''}
            ${process?.artifacts?.find((artifact) => artifact.type === 'html-report') ? `<a href="${process.artifacts.find((artifact) => artifact.type === 'html-report').url}" target="_blank"><button class="secondary">HTML 报告</button></a>` : ''}
          </div>
        </aside>
      </div>
    </section>
  `;
}

function renderRuns() {
  syncActiveRunWithRunFilter();
  renderShell(`
    <div class="grid runs-workspace">
      <section class="panel runs-list-panel">
        <div class="section-heading">
          <div>
            <h2>执行与报告</h2>
            <div class="muted">${runScenarioFilterLabel()} · 运行中可看实时过程，完成后可回看截图和录像。</div>
          </div>
          <button id="refreshRuns">刷新</button>
        </div>
        <div class="toolbar">
          <select id="runScenarioFilter">
            <option value="">全部场景</option>
            ${state.scenarios.map((scenario) => `<option value="${scenario.id}" ${state.runScenarioFilter === scenario.id ? 'selected' : ''}>${scenario.name}</option>`).join('')}
          </select>
        </div>
        ${table(['执行编号', '场景', '状态', '环境', '执行模式', '开始时间', '结束时间', '结果', '过程查看'], filteredRuns().map(runRow), { className: 'runs-table-scroll' })}
      </section>
      ${renderProcessPanel()}
    </div>
  `);
  document.querySelector('#refreshRuns').addEventListener('click', async () => {
    await loadRuns();
    syncActiveRunWithRunFilter();
    await loadRunProcess();
    renderRuns();
  });
  document.querySelector('#runScenarioFilter').addEventListener('change', async (event) => {
    state.runScenarioFilter = event.target.value;
    syncActiveRunWithRunFilter();
    await loadRunProcess();
    renderRuns();
  });
  document.querySelectorAll('[data-open-run]').forEach((button) => {
    button.addEventListener('click', async () => {
      state.activeRunId = button.dataset.openRun;
      await loadRunProcess();
      renderRuns();
    });
  });
  startRunRefreshTimer();
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
