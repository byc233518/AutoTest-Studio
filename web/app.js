import { buildScenarioTree, filterScenariosByTree, findScenarioTreeNode } from './scenario-tree.mjs';

const state = {
  user: null,
  project: null,
  apps: [],
  modules: [],
  scenarios: [],
  recommendations: [],
  environments: [],
  selectedEnvironment: 'test',
  selectedScenario: null,
  dependencyChecks: [],
  datasets: [],
  datasetsByScenario: {},
  rowSelections: {},
  runs: [],
  llm: null,
  view: 'scenarios',
  settingsMenuOpen: false,
  settingsMenuCollapsed: false,
  filter: '',
  appFilter: '',
  moduleFilter: '',
  categoryFilter: '',
  executionMode: 'ui',
  runScenarioFilter: '',
  editDialog: {
    open: false,
    scenario: null,
    message: '',
    sampleRows: [],
    dataSource: 'upload',
    dataName: '',
    manualRows: [],
    scriptSource: 'upload',
    activeRecordingId: '',
    localRecordCommand: ''
  },
  createDialog: {
    open: false,
    message: '',
    scriptSource: 'path'
  },
  runDialog: {
    open: false,
    scenario: null,
    source: 'history',
    datasetId: '',
    dataName: '',
    manualCsv: '',
    manualRows: [],
    executionMode: 'ui',
    environment: '',
    enforceDependencies: false,
    message: ''
  },
  activeRunId: '',
  runDetailOpen: false,
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

function readinessTag(readiness) {
  if (!readiness) return '';
  const map = { ready: ['可执行', 'success'], 'needs-preparation': ['需准备', 'warning'], draft: ['草稿', 'warning'] };
  const [text, cls] = map[readiness.state] || ['不可执行', 'danger'];
  return '<span class="tag ' + cls + '">' + text + '</span>';
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

function canMaintain() {
  return ['admin', 'maintainer'].includes(state.user?.role);
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
  const [catalog, apps, modules, envs] = await Promise.all([
    api('/api/scenarios'),
    api('/api/apps'),
    api('/api/modules'),
    api('/api/environments')
  ]);
  state.project = catalog.project;
  state.scenarios = catalog.scenarios;
  state.recommendations = catalog.recommendations || [];
  state.apps = apps.apps;
  state.modules = modules.modules;
  state.environments = envs.environments || [];
  state.selectedEnvironment = state.environments.find((e) => e.isDefault)?.key
    || state.environments[0]?.key
    || 'test';
  state.selectedScenario ||= state.scenarios.find((scenario) => scenario.key === 'wms-customer-create') || state.scenarios[0] || null;
  await loadDatasetsForScenarios(filteredScenarios());
  if (state.selectedScenario) {
    state.datasets = state.datasetsByScenario[state.selectedScenario.key] || [];
    await loadDependencyChecks(state.selectedScenario.key);
  }
  if (canMaintain() && !state.llm) {
    await loadLlmSetting().catch(() => {
      state.llm = null;
    });
  }
}

async function loadDatasets(key) {
  const datasets = await api(`/api/scenarios/${key}/datasets`);
  state.datasetsByScenario[key] = datasets;
  if (state.selectedScenario?.key === key || state.editDialog.scenario?.key === key) {
    state.datasets = datasets;
  }
  ensureRowSelection(key, datasets);
  return datasets;
}

async function loadDatasetsForScenarios(scenarios) {
  const keys = [...new Set(scenarios.map((item) => item.key))];
  await Promise.all(keys.map(async (key) => {
    if (state.datasetsByScenario[key]) {
      ensureRowSelection(key, state.datasetsByScenario[key]);
      return;
    }
    try {
      await loadDatasets(key);
    } catch {
      state.datasetsByScenario[key] = [];
      ensureRowSelection(key, []);
    }
  }));
}

function ensureRowSelection(scenarioKey, datasets = state.datasetsByScenario[scenarioKey] || []) {
  const current = state.rowSelections[scenarioKey] || {};
  const datasetIds = new Set(datasets.map((item) => item.id));
  const datasetId = datasetIds.has(current.datasetId)
    ? current.datasetId
    : (datasets[0]?.id || '');
  state.rowSelections[scenarioKey] = {
    environment: current.environment || state.selectedEnvironment || 'test',
    datasetId,
    executionMode: current.executionMode || state.executionMode || 'ui'
  };
  return state.rowSelections[scenarioKey];
}

function getRowSelection(scenarioKey) {
  return ensureRowSelection(scenarioKey, state.datasetsByScenario[scenarioKey] || []);
}

function environmentOptions(selectedKey) {
  const envs = state.environments.length ? state.environments : [{ key: 'test', name: '测试环境' }];
  return envs.map((env) => `
    <option value="${env.key}" ${selectedKey === env.key ? 'selected' : ''}>${env.name || env.key}</option>
  `).join('');
}

function datasetOptions(scenarioKey, selectedId) {
  const datasets = state.datasetsByScenario[scenarioKey] || [];
  if (!datasets.length) {
    return '<option value="">暂无样本，请先编辑上传</option>';
  }
  return datasets.map((dataset) => `
    <option value="${dataset.id}" ${selectedId === dataset.id ? 'selected' : ''}>${dataset.name}（${dataset.rowCount}行）</option>
  `).join('');
}

function escapeAttr(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;');
}

function blankDataRow(scenario) {
  const columns = scenario?.dataSchema?.columns || [];
  const example = scenario?.dataSchema?.example || {};
  return Object.fromEntries(columns.map((column) => [column, example[column] ?? '']));
}

function rowsToCsvText(rows, columns) {
  const escape = (value) => {
    const text = String(value ?? '');
    return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };
  return `\uFEFF${columns.map(escape).join(',')}\n${rows.map((row) => columns.map((column) => escape(row[column])).join(',')).join('\n')}\n`;
}

function renderManualDataTable(scenario, rows) {
  const columns = scenario.dataSchema?.columns || [];
  const required = new Set(scenario.dataSchema?.required || []);
  if (!columns.length) {
    return '<p class="muted">该场景尚未定义字段结构，无法界面录入。</p>';
  }
  return `
    <div class="table-scroll manual-data-table-scroll">
      <table class="table manual-data-table">
        <thead>
          <tr>
            <th>#</th>
            ${columns.map((column) => `<th>${column}${required.has(column) ? ' *' : ''}</th>`).join('')}
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row, index) => `
            <tr>
              <td>${index + 1}</td>
              ${columns.map((column) => `
                <td>
                  <input
                    type="text"
                    value="${escapeAttr(row[column] ?? '')}"
                    data-manual-index="${index}"
                    data-manual-field="${escapeAttr(column)}"
                    placeholder="${required.has(column) ? '必填' : ''}"
                  />
                </td>
              `).join('')}
              <td>
                <button type="button" class="secondary text-button" data-remove-manual-row="${index}" ${rows.length <= 1 ? 'disabled' : ''}>删除</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

async function uploadDatasetRows(scenario, name, rows) {
  const columns = scenario.dataSchema?.columns || [];
  const nonEmptyRows = rows.filter((row) => columns.some((column) => String(row[column] ?? '').trim()));
  if (!nonEmptyRows.length) {
    throw new Error('请至少填写一行测试数据');
  }
  const upload = new FormData();
  upload.append('name', name || `${scenario.name}样本`);
  upload.append('file', new Blob([rowsToCsvText(nonEmptyRows, columns)], { type: 'text/csv;charset=utf-8' }), 'manual-entry.csv');
  const dataset = await api(`/api/scenarios/${scenario.key}/datasets`, { method: 'POST', body: upload });
  await loadDatasets(scenario.key);
  return dataset;
}

async function uploadScenarioScriptFile(scenarioKey, file) {
  const upload = new FormData();
  upload.append('file', file);
  return api(`/api/scenarios/${scenarioKey}/script`, { method: 'POST', body: upload });
}

async function startScenarioRecording(scenarioKey, environmentKey) {
  return api('/api/recordings/start', {
    method: 'POST',
    body: JSON.stringify({
      scenarioKey,
      environmentKey: environmentKey || state.selectedEnvironment || 'test',
      location: 'local',
      platformUrl: window.location.origin
    })
  });
}

async function refreshRecordingStatus(recordingId, scenarioKey) {
  const status = await api(`/api/recordings/${recordingId}`);
  if (status.status === 'finished') {
    await loadCatalog();
    const scenario = scenarioByKey(scenarioKey);
    if (scenario) {
      state.editDialog.scenario = scenario;
    }
    state.editDialog.activeRecordingId = '';
    state.editDialog.localRecordCommand = '';
  }
  return status;
}

async function finishScenarioRecording(recordingId, scenarioKey) {
  return api(`/api/recordings/${recordingId}/finish`, {
    method: 'POST',
    body: JSON.stringify({ scenarioKey })
  });
}

function renderScriptSourceTabs(source, datasetAttr) {
  return `
    <div class="run-source-tabs script-source-tabs" role="tablist" aria-label="测试脚本来源">
      ${[
        ['path', '填写路径'],
        ['upload', '上传脚本'],
        ['record', '本地录制']
      ].map(([value, label]) => `
        <button type="button" class="source-tab ${source === value ? 'active' : ''}" ${datasetAttr}="${value}">
          ${label}
        </button>
      `).join('')}
    </div>
  `;
}

function renderLocalRecordPanel(command) {
  if (!command) return '';
  return `
    <div class="local-record-panel">
      <label>在本机项目目录打开终端，执行以下命令</label>
      <textarea id="localRecordCommand" class="local-record-command" readonly>${escapeAttr(command)}</textarea>
      <div class="button-row manual-data-actions">
        <button type="button" class="secondary" id="copyRecordCommand">复制命令</button>
        <button type="button" id="refreshRecordingStatus">刷新录制状态</button>
      </div>
      <div class="muted">Playwright Inspector 会在你的电脑上打开；关闭 Inspector 后脚本会自动上传并绑定场景。</div>
    </div>
  `;
}

function renderEditScriptSourceTabs(source) {
  return `
    <div class="run-source-tabs script-source-tabs" role="tablist" aria-label="测试脚本维护方式">
      ${[
        ['upload', '上传脚本'],
        ['record', '本地录制']
      ].map(([value, label]) => `
        <button type="button" class="source-tab ${source === value ? 'active' : ''}" data-edit-script-source="${value}">
          ${label}
        </button>
      `).join('')}
    </div>
  `;
}

async function loadDependencyChecks(key) {
  try {
    const body = await api(`/api/scenarios/${key}/dependency-check`);
    state.dependencyChecks = body.checks || body.dependencies || body || [];
  } catch {
    state.dependencyChecks = [];
  }
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
        <h1>AutoTest Studio</h1>
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

const SETTINGS_VIEWS = ['apps', 'modules', 'environments', 'settings'];

function isSettingsView(view = state.view) {
  return SETTINGS_VIEWS.includes(view);
}

function navButton(id, label, options = {}) {
  const classes = [
    options.className || '',
    state.view === id ? 'active' : ''
  ].filter(Boolean).join(' ');
  return `<button type="button" class="${classes}" data-view="${id}">${label}</button>`;
}

function isSettingsMenuOpen() {
  if (state.settingsMenuCollapsed) return false;
  return state.settingsMenuOpen || isSettingsView();
}

function renderSettingsNav() {
  const open = isSettingsMenuOpen();
  const parentActive = isSettingsView();
  return `
    <div class="nav-group ${open ? 'open' : ''} ${parentActive ? 'has-active' : ''}">
      <button type="button" class="nav-group-toggle ${parentActive ? 'active' : ''}" data-toggle-settings aria-expanded="${open}">
        <span>设置</span>
        <span class="nav-caret" aria-hidden="true"></span>
      </button>
      <div class="nav-sub" ${open ? '' : 'hidden'}>
        ${navButton('apps', '应用管理', { className: 'nav-sub-item' })}
        ${navButton('modules', '模块管理', { className: 'nav-sub-item' })}
        ${navButton('environments', '环境管理', { className: 'nav-sub-item' })}
        ${navButton('settings', 'AI 设置', { className: 'nav-sub-item' })}
      </div>
    </div>
  `;
}

function renderPageTabs() {
  const tabs = [
    ['scenarios', '测试场景'],
    ['runs', '执行与报告'],
    ...(isSettingsView()
      ? [
        ['apps', '应用管理'],
        ['modules', '模块管理'],
        ['environments', '环境管理'],
        ['settings', 'AI 设置']
      ]
      : [])
  ];
  return tabs.map(([id, label]) => `
    <button type="button" class="page-tab ${state.view === id ? 'active' : ''}" data-view="${id}">
      <span>${isSettingsView() && SETTINGS_VIEWS.includes(id) ? `设置 / ${label}` : label}</span>
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
            <strong>AutoTest Studio</strong>
            <small>测试平台</small>
          </span>
        </div>
        <nav class="nav" aria-label="主导航">
          ${navButton('scenarios', '测试场景')}
          ${navButton('runs', '执行与报告')}
          ${renderSettingsNav()}
        </nav>
      </aside>
      <main class="workspace">
        <header class="topbar">
          <div>
            <h1>${state.project?.name || 'AutoTest Studio'} 自动化测试</h1>
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
  document.querySelectorAll('[data-toggle-settings]').forEach((button) => {
    button.addEventListener('click', () => {
      const currentlyOpen = button.getAttribute('aria-expanded') === 'true';
      if (currentlyOpen) {
        state.settingsMenuOpen = false;
        state.settingsMenuCollapsed = true;
      } else {
        state.settingsMenuOpen = true;
        state.settingsMenuCollapsed = false;
      }
      render();
    });
  });
  document.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', async () => {
      state.view = button.dataset.view;
      state.message = '';
      if (isSettingsView(state.view)) {
        state.settingsMenuOpen = true;
        state.settingsMenuCollapsed = false;
      }
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
  if (state.view === 'environments') return renderEnvironments();
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
  const tree = buildScenarioTree(state.apps, state.modules, state.scenarios);
  const category = findScenarioTreeNode(tree.apps, state.categoryFilter);
  return filterScenariosByTree(state.scenarios, {
    appId: state.appFilter,
    moduleId: state.moduleFilter,
    scenarioIds: category?.scenarioIds,
    keyword: state.filter
  });
}

function scenarioFilterLabel() {
  const tree = buildScenarioTree(state.apps, state.modules, state.scenarios);
  const category = findScenarioTreeNode(tree.apps, state.categoryFilter);
  if (category?.type === 'menu') return category.path.join(' / ');
  if (category) return category.label;
  if (state.moduleFilter) return moduleName(state.moduleFilter);
  if (state.appFilter) return appName(state.appFilter);
  return '全部场景';
}

async function syncSelectedScenarioWithVisibleList() {
  const visibleScenarios = filteredScenarios();
  await loadDatasetsForScenarios(visibleScenarios);
  if (!visibleScenarios.length) {
    state.selectedScenario = null;
    state.datasets = [];
    state.sampleRows = [];
    state.dependencyChecks = [];
    return;
  }

  if (visibleScenarios.some((scenario) => scenario.key === state.selectedScenario?.key)) return;

  state.selectedScenario = visibleScenarios[0];
  state.sampleRows = [];
  state.datasets = state.datasetsByScenario[state.selectedScenario.key] || [];
  await loadDependencyChecks(state.selectedScenario.key);
}

function renderScenarioTreeNodes(nodes) {
  return nodes.map((node) => `
    <div class="tree-group">
      <button class="tree-node ${node.type === 'app' ? 'app-node' : 'module-node'} ${state.categoryFilter === node.id ? 'active' : ''}" data-tree-category-id="${node.id}">
        <span>${node.label}</span><strong>${node.scenarioCount}</strong>
      </button>
      ${node.children.length ? `<div class="tree-children">${renderScenarioTreeNodes(node.children)}</div>` : ''}
    </div>
  `).join('');
}

function renderScenarioTree() {
  const tree = buildScenarioTree(state.apps, state.modules, state.scenarios);
  const allActive = !state.categoryFilter;

  return `
    <section class="panel scenario-tree-panel">
      <h2>场景分类</h2>
      <button class="tree-node tree-root ${allActive ? 'active' : ''}" data-tree-all aria-current="${allActive ? 'true' : 'false'}">
        <span>全部场景</span><strong>${tree.total}</strong>
      </button>
      <div class="tree-groups">
        ${renderScenarioTreeNodes(tree.apps)}
      </div>
    </section>
  `;
}

function renderScenarioRow(item) {
  const canOpenRun = item.status === 'published';
  const nextAction = item.readiness?.checks?.find((check) => !check.ready)?.action || '执行';
  return     '<tr data-scenario="' + item.key + '">' +
      '<td><strong>' + item.name + '</strong><div class="muted">' + item.description + '</div></td>' +
      '<td>' + appName(item.appId) + '</td><td>' + moduleName(item.moduleId) + '</td><td>' + item.priority + '</td>' +
      '<td>' + statusTag(item.status) + ' ' + readinessTag(item.readiness) + '</td>' +
      '<td><div class="row-actions"><button type="button" data-row-run="' + item.key + '" ' + (canOpenRun ? '' : 'disabled') + ' title="' + nextAction + '">执行</button>' +
      '<button type="button" class="secondary" data-open-edit="' + item.key + '">编辑</button><button type="button" class="secondary" data-open-history="' + item.key + '">历史</button></div></td></tr>';
}

function renderScenarios() {
  const visibleScenarios = filteredScenarios();
  const today = new Date().toISOString().slice(0, 10);
  const todayRuns = state.runs.filter((run) => (run.startedAt || '').startsWith(today));
  const completed = state.runs.filter((run) => ['passed', 'failed', 'skipped'].includes(run.status));
  const passRate = completed.length ? Math.round(completed.filter((run) => run.status === 'passed').length / completed.length * 100) : 0;
  const failedCount = state.runs.filter((run) => run.status === 'failed').length;
  const readyCount = state.scenarios.filter((item) => item.readiness?.ready).length;
  const scenarioRows = visibleScenarios.length ? visibleScenarios.map((item) => renderScenarioRow(item)) : ['<tr><td colspan="6"><span class="muted">当前分类暂无测试场景</span></td></tr>'];
  renderShell(
    '<div class="grid dashboard-grid">' +
      '<div class="panel stat"><span class="muted">今日执行</span><strong>' + todayRuns.length + '</strong></div>' +
      '<div class="panel stat"><span class="muted">近期成功率</span><strong>' + passRate + '%</strong></div>' +
      '<div class="panel stat"><span class="muted">待处理失败</span><strong>' + failedCount + '</strong></div>' +
      '<div class="panel stat"><span class="muted">可执行场景</span><strong>' + readyCount + '/' + state.scenarios.length + '</strong></div>' +
    '</div>' +
    '<div class="grid scenario-workspace" style="margin-top:16px">' + renderScenarioTree() +
      '<section class="panel scenario-table-panel"><div class="section-heading"><div><h2>测试场景列表</h2><div class="muted">' + scenarioFilterLabel() + ' · ' + visibleScenarios.length + ' 个场景</div></div></div>' +
      '<div class="toolbar"><input id="filterInput" placeholder="搜索场景、模块、编号" value="' + state.filter + '" /><button type="button" id="openCreateScenario">新建场景</button></div>' +
      table(['场景', '应用', '模块', '优先级', '状态', '操作'], scenarioRows, { className: 'scenarios-table-scroll' }) + '</section></div>' + renderCreateDialog() + renderEditDialog() + renderRunDialog());
  document.querySelector('#openCreateScenario')?.addEventListener('click', () => { state.createDialog = { open: true, message: '', scriptSource: 'path' }; renderScenarios(); });
  document.querySelector('#filterInput')?.addEventListener('input', async (event) => { state.filter = event.target.value; await syncSelectedScenarioWithVisibleList(); renderScenarios(); });
  document.querySelector('[data-tree-all]')?.addEventListener('click', async () => { state.appFilter = ''; state.moduleFilter = ''; state.categoryFilter = ''; await syncSelectedScenarioWithVisibleList(); renderScenarios(); });
  document.querySelectorAll('[data-tree-category-id]').forEach((button) => button.addEventListener('click', async () => {
    const tree = buildScenarioTree(state.apps, state.modules, state.scenarios);
    const category = findScenarioTreeNode(tree.apps, button.dataset.treeCategoryId);
    if (!category) return;
    state.appFilter = category.type === 'app' ? category.id : category.appId;
    state.moduleFilter = '';
    state.categoryFilter = category.id;
    await syncSelectedScenarioWithVisibleList();
    renderScenarios();
  }));
  document.querySelectorAll('[data-recommend]').forEach((button) => button.addEventListener('click', async () => { const scenario = scenarioByKey(button.dataset.recommend); if (scenario) await openEditDialog(scenario); }));
  wireScenarioRowControls(); wireCreateDialog(); wireEditDialog(); wireRunDialog();
}

function wireScenarioRowControls() {
  document.querySelectorAll('[data-row-run]').forEach((button) => button.addEventListener('click', async () => {
    const scenario = scenarioByKey(button.dataset.rowRun); if (scenario) await openRunDialog(scenario);
  }));
  document.querySelectorAll('[data-open-edit]').forEach((button) => button.addEventListener('click', async () => {
    const scenario = scenarioByKey(button.dataset.openEdit); if (scenario) await openEditDialog(scenario);
  }));
  document.querySelectorAll('[data-open-history]').forEach((button) => button.addEventListener('click', async () => {
    const scenario = scenarioByKey(button.dataset.openHistory); if (scenario) await openScenarioHistory(scenario);
  }));
}

async function openEditDialog(scenario) {
  state.selectedScenario = scenario;
  state.sampleRows = [];
  await Promise.all([
    loadDatasets(scenario.key),
    loadDependencyChecks(scenario.key)
  ]);
  if (canMaintain() && !state.llm) {
    await loadLlmSetting().catch(() => {
      state.llm = null;
    });
  }
  state.editDialog = {
    open: true,
    scenario,
    message: '',
    sampleRows: [],
    dataSource: 'upload',
    dataName: '',
    manualRows: [blankDataRow(scenario)],
    scriptSource: 'upload',
    activeRecordingId: '',
    localRecordCommand: ''
  };
  renderScenarios();
}

function closeEditDialog() {
  state.editDialog.open = false;
  state.editDialog.message = '';
  state.editDialog.sampleRows = [];
  state.editDialog.dataSource = 'upload';
  state.editDialog.dataName = '';
  state.editDialog.manualRows = [];
  state.editDialog.scriptSource = 'upload';
  state.editDialog.activeRecordingId = '';
  state.editDialog.localRecordCommand = '';
  renderScenarios();
}

function preserveEditDialogManualRows() {
  document.querySelectorAll('[data-manual-index]').forEach((input) => {
    const index = Number(input.dataset.manualIndex);
    const field = input.dataset.manualField;
    if (!state.editDialog.manualRows[index] || !field) return;
    state.editDialog.manualRows[index][field] = input.value;
  });
}

function preserveEditDialogForm(form) {
  if (!form) return;
  const data = new FormData(form);
  state.editDialog.dataName = data.get('name') || state.editDialog.dataName || '';
  preserveEditDialogManualRows();
}

async function openRunDialog(scenario) {
  const selection = getRowSelection(scenario.key);
  const preflight = await api('/api/scenarios/' + scenario.key + '/preflight?environment=' + encodeURIComponent(selection.environment || state.selectedEnvironment));
  scenario = { ...scenario, preflight };
  state.selectedScenario = scenario;
  state.sampleRows = [];
  await Promise.all([
    loadDatasets(scenario.key),
    loadDependencyChecks(scenario.key)
  ]);
  const currentSelection = getRowSelection(scenario.key);
  state.runDialog = {
    open: true,
    scenario,
    source: state.datasets.length ? 'history' : 'upload',
    datasetId: currentSelection.datasetId || state.datasets[0]?.id || '',
    dataName: `${scenario.name}样本`,
    manualCsv: '',
    manualRows: [blankDataRow(scenario)],
    executionMode: 'ui',
    environment: currentSelection.environment || state.selectedEnvironment,
    enforceDependencies: false,
    message: ''
  };
  renderScenarios();
}

async function openScenarioHistory(scenario) {
  state.runScenarioFilter = scenario.id;
  await loadRuns();
  syncActiveRunWithRunFilter();
  state.runDetailOpen = false;
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
  const dependsOn = scenario.dependsOn || [];
  const environment = state.runDialog.environment || state.selectedEnvironment;

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
              ['manual', '在线填写']
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
              <div class="field"><label>数据集名称</label><input name="dataName" value="${state.runDialog.dataName}" placeholder="例如：客户主数据-测试环境-冒烟" /></div>
              <div class="manual-data-grid">${renderManualDataTable(scenario, state.runDialog.manualRows?.length ? state.runDialog.manualRows : [blankDataRow(scenario)])}</div>
              <div class="button-row"><button class="secondary" id="addRunManualRow" type="button">增加一行</button><button class="secondary" id="fillSampleCsv" type="button">生成样例数据</button><button class="secondary" id="fillAiSampleCsv" type="button">AI 生成</button></div>
            ` : ''}
          </div>
          <div class="run-dialog-footer">
            <div class="field compact-field">
              <label>执行环境</label>
              <select name="environment">
                ${(state.environments.length ? state.environments : [{ key: 'test', name: '测试环境' }]).map((env) => `
                  <option value="${env.key}" ${environment === env.key ? 'selected' : ''}>${env.name || env.key}</option>
                `).join('')}
              </select>
            </div>
            <div class="field compact-field">
              <label>执行模式</label>
              <select name="executionMode">
                ${['headless', 'headed', 'ui'].map((mode) => `
                  <option value="${mode}" ${state.runDialog.executionMode === mode ? 'selected' : ''}>${executionModeLabel(mode)}</option>
                `).join('')}
              </select>
            </div>
            ${dependsOn.length ? `
              <label class="checkbox-field">
                <input type="checkbox" name="enforceDependencies" value="1" ${state.runDialog.enforceDependencies ? 'checked' : ''} />
                校验依赖场景（${dependsOn.join(', ')}）
              </label>
            ` : ''}
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
  document.querySelectorAll('.run-dialog [data-manual-index]').forEach((input) => { const index = Number(input.dataset.manualIndex); const field = input.dataset.manualField; if (state.runDialog.manualRows[index]) state.runDialog.manualRows[index][field] = input.value; });
  state.runDialog.executionMode = data.get('executionMode') || state.runDialog.executionMode;
  state.runDialog.environment = data.get('environment') || state.runDialog.environment || state.selectedEnvironment;
  state.runDialog.enforceDependencies = data.get('enforceDependencies') === '1';
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
    const rows = state.runDialog.manualRows || [];
    const csv = rowsToCsvText(rows, scenario.dataSchema?.columns || []);
    if (!csv) throw new Error('请填写 CSV 样本数据');
    upload.append('file', new Blob([`${csv}\n`], { type: 'text/csv;charset=utf-8' }), 'manual-sample.csv');
  }

  const dataset = await api(`/api/scenarios/${scenario.key}/datasets`, { method: 'POST', body: upload });
  await loadDatasets(scenario.key);
  return dataset.id;
}

async function runScenarioWithDataset(scenario, datasetId, executionMode, options = {}) {
  const environment = options.environment || state.selectedEnvironment || 'test';
  const dependsOn = scenario.dependsOn || [];
  const enforceDependencies = options.enforceDependencies ?? false;
  state.executionMode = executionMode;
  state.selectedEnvironment = environment;
  const run = await api('/api/runs', {
    method: 'POST',
    body: JSON.stringify({
      scenarioId: scenario.id,
      datasetId,
      environment,
      executionMode,
      ...(dependsOn.length ? { enforceDependencies } : {})
    })
  });
  state.activeRunId = run.runId;
  state.runScenarioFilter = scenario.id;
  state.runDialog.open = false;
  state.runDetailOpen = true;
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
    state.runDialog.manualRows = sample.rows || state.runDialog.manualRows;
    state.runDialog.message = '已生成样例 CSV，可直接调整后执行';
    renderScenarios();
  });
  document.querySelector('#fillAiSampleCsv')?.addEventListener('click', async () => {
    preserveRunDialogForm(form);
    try {
      const sample = await api(`/api/scenarios/${state.runDialog.scenario.key}/sample-data`, {
        method: 'POST',
        body: JSON.stringify({ count: 3, useLlm: true })
      });
      state.runDialog.source = 'manual';
      state.runDialog.manualCsv = sample.csv;
      state.runDialog.manualRows = sample.rows || state.runDialog.manualRows;
      state.runDialog.message = sample.source === 'llm'
        ? 'AI 已生成样例 CSV，可直接调整后执行'
        : `已回退规则生成：${sample.fallbackReason || ''}`;
      renderScenarios();
    } catch (error) {
      state.runDialog.message = error.message;
      renderScenarios();
    }
  });
  document.querySelector('#addRunManualRow')?.addEventListener('click', () => { preserveRunDialogForm(form); state.runDialog.manualRows.push(blankDataRow(state.runDialog.scenario)); renderScenarios(); });
  document.querySelectorAll('.run-dialog [data-remove-manual-row]').forEach((button) => button.addEventListener('click', () => { preserveRunDialogForm(form); state.runDialog.manualRows.splice(Number(button.dataset.removeManualRow), 1); renderScenarios(); }));
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    preserveRunDialogForm(form);
    const scenario = state.runDialog.scenario;
    try {
      const datasetId = await createDatasetFromDialog(form, scenario);
      await runScenarioWithDataset(scenario, datasetId, state.runDialog.executionMode, {
        environment: state.runDialog.environment,
        enforceDependencies: state.runDialog.enforceDependencies
      });
    } catch (error) {
      state.runDialog.message = error.message;
      renderScenarios();
    }
  });
}

function renderDependencySection(scenario) {
  const dependsOn = scenario.dependsOn || [];
  if (!dependsOn.length && !state.dependencyChecks.length) {
    return '<p class="muted">无前置依赖</p>';
  }
  const checksByKey = new Map((state.dependencyChecks || []).map((check) => [check.key, check]));
  const keys = dependsOn.length ? dependsOn : [...checksByKey.keys()];
  return `
    <div class="dependency-list">
      <strong>依赖场景</strong>
      <div class="schema-list">
        ${keys.map((key) => {
          const check = checksByKey.get(key);
          const status = check?.status || 'pending';
          const label = status === 'ready' ? '就绪' : (status === 'missing' ? '场景不存在' : '待执行');
          const cls = status === 'ready' ? 'success' : (status === 'missing' ? 'danger' : 'warning');
          return `<span>${key} <span class="tag ${cls}">${label}</span>${check?.message ? ` <span class="muted">${check.message}</span>` : ''}</span>`;
        }).join('')}
      </div>
    </div>
  `;
}

function suggestScenarioKey() {
  return `scn-${Date.now().toString(36)}`;
}

function renderCreateDialog() {
  if (!state.createDialog.open) return '';
  const modules = state.modules || [];
  const scriptSource = state.createDialog.scriptSource || 'path';
  return `
    <div class="modal-backdrop" role="presentation">
      <section class="modal create-dialog" role="dialog" aria-modal="true" aria-labelledby="createDialogTitle">
        <div class="section-heading">
          <div>
            <h2 id="createDialogTitle">新建场景</h2>
            <div class="muted">创建后为草稿状态，可上传/录制脚本并维护测试数据；发布需维护员或管理员</div>
          </div>
          <button class="secondary icon-button" id="closeCreateDialog" type="button" aria-label="关闭">×</button>
        </div>
        <form id="createScenarioForm" class="grid create-dialog-form">
          <div class="split">
            <div class="field">
              <label>场景名称 *</label>
              <input name="name" placeholder="例如：客户主数据录入" required />
            </div>
            <div class="field">
              <label>场景 key *</label>
              <input name="key" value="${suggestScenarioKey()}" pattern="[a-z0-9-]+" title="小写字母、数字、中划线" required />
            </div>
          </div>
          <div class="field">
            <label>描述</label>
            <input name="description" placeholder="一句话说明该场景做什么" />
          </div>
          <div class="split">
            <div class="field">
              <label>所属应用</label>
              <select name="appId" id="createScenarioApp">
                <option value="">未分类</option>
                ${state.apps.map((item) => `<option value="${item.id}">${item.name}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label>所属模块</label>
              <select name="moduleId" id="createScenarioModule">
                <option value="">未分类</option>
                ${modules.map((item) => `<option value="${item.id}" data-app="${item.appId}">${item.name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="field">
            <label>优先级</label>
            <select name="priority">
              ${['P0', 'P1', 'P2', 'P3'].map((p) => `<option value="${p}" ${p === 'P2' ? 'selected' : ''}>${p}</option>`).join('')}
            </select>
          </div>
          <div class="detail-section">
            <div class="detail-section-title">测试脚本</div>
            ${renderScriptSourceTabs(scriptSource, 'data-create-script-source')}
            <div class="run-source-panel">
              ${scriptSource === 'path' ? `
                <div class="field">
                  <label>脚本路径（可选）</label>
                  <input name="scriptEntry" placeholder="例如：tests/wms-master-data.spec.js" />
                  <div class="muted">也可创建后在编辑弹窗上传或录制脚本</div>
                </div>
              ` : ''}
              ${scriptSource === 'upload' ? `
                <div class="field">
                  <label>Playwright 脚本文件</label>
                  <input name="scriptFile" type="file" accept=".js,.spec.js,.mjs" />
                  <div class="muted">支持 .js / .spec.js / .mjs，创建后自动绑定到场景</div>
                </div>
              ` : ''}
              ${scriptSource === 'record' ? `
                <div class="field">
                  <label>录制环境</label>
                  <select name="recordEnvironment">
                    ${(state.environments.length ? state.environments : [{ key: 'test', name: '测试环境' }]).map((env) => `
                      <option value="${env.key}" ${env.key === state.selectedEnvironment ? 'selected' : ''}>${env.name || env.key}</option>
                    `).join('')}
                  </select>
                  <div class="muted">创建后将生成本地录制命令，需在本机终端执行 Playwright Codegen</div>
                </div>
              ` : ''}
            </div>
          </div>
          <div class="field">
            <label>数据字段（逗号分隔，默认全部必填）</label>
            <input name="columns" placeholder="例如：客户编号,客户名称,联系人" />
          </div>
          <div class="button-row" style="justify-content:flex-end">
            <button type="button" class="secondary" id="cancelCreateDialog">取消</button>
            <button type="submit">创建</button>
          </div>
          <p class="message">${state.createDialog.message || ''}</p>
        </form>
      </section>
    </div>
  `;
}

function wireCreateDialog() {
  if (!state.createDialog.open) return;
  const close = () => {
    state.createDialog = { open: false, message: '', scriptSource: 'path' };
    renderScenarios();
  };
  document.querySelector('#closeCreateDialog')?.addEventListener('click', close);
  document.querySelector('#cancelCreateDialog')?.addEventListener('click', close);
  document.querySelectorAll('[data-create-script-source]').forEach((button) => {
    button.addEventListener('click', () => {
      state.createDialog.scriptSource = button.dataset.createScriptSource;
      state.createDialog.message = '';
      renderScenarios();
    });
  });
  const appSelect = document.querySelector('#createScenarioApp');
  const moduleSelect = document.querySelector('#createScenarioModule');
  appSelect?.addEventListener('change', () => {
    const appId = appSelect.value;
    [...moduleSelect.options].forEach((option) => {
      option.hidden = Boolean(appId) && Boolean(option.dataset.app) && option.dataset.app !== appId;
    });
    const current = moduleSelect.selectedOptions[0];
    if (current?.hidden) moduleSelect.value = '';
  });
  document.querySelector('#createScenarioForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const columns = String(data.get('columns') || '')
      .split(/[,，\s]+/)
      .map((column) => column.trim())
      .filter(Boolean);
    const moduleId = data.get('moduleId') || '';
    const moduleItem = state.modules.find((item) => item.id === moduleId);
    const appItem = state.apps.find((item) => item.id === (data.get('appId') || moduleItem?.appId));
    const scriptSource = state.createDialog.scriptSource || 'path';
    try {
      const created = await api('/api/scenarios', {
        method: 'POST',
        body: JSON.stringify({
          key: data.get('key'),
          name: data.get('name'),
          description: data.get('description') || '',
          appId: appItem?.id || '',
          moduleId,
          module: [appItem?.name, moduleItem?.name].filter(Boolean).join(' / '),
          priority: data.get('priority') || 'P2',
          scriptEntry: scriptSource === 'path' ? (data.get('scriptEntry') || '') : '',
          dataSchema: {
            columns,
            required: columns,
            example: Object.fromEntries(columns.map((column) => [column, '']))
          }
        })
      });
      if (scriptSource === 'upload') {
        const scriptFile = data.get('scriptFile');
        if (!scriptFile?.name) throw new Error('请选择要上传的测试脚本');
        await uploadScenarioScriptFile(created.key, scriptFile);
      }
      state.createDialog = { open: false, message: '', scriptSource: 'path' };
      await loadCatalog();
      const scenario = scenarioByKey(created.key);
      if (scenario) {
        await openEditDialog(scenario);
        if (scriptSource === 'record') {
          const recording = await startScenarioRecording(
            scenario.key,
            data.get('recordEnvironment') || state.selectedEnvironment
          );
          state.editDialog.activeRecordingId = recording.id;
          state.editDialog.localRecordCommand = recording.localCommand || '';
          state.editDialog.message = '请在本机终端执行编辑弹窗中的录制命令，完成后点击「刷新录制状态」';
        } else if (scriptSource === 'upload') {
          state.editDialog.message = '场景已创建，测试脚本已上传；可继续维护测试数据';
        } else {
          state.editDialog.message = '场景已创建（草稿），可继续维护脚本与测试数据；发布需维护员或管理员';
        }
        renderScenarios();
        return;
      }
      renderScenarios();
    } catch (error) {
      state.createDialog.message = error.message;
      renderScenarios();
    }
  });
}

function renderEditDialog() {
  if (!state.editDialog.open || !state.editDialog.scenario) return '';
  const scenario = state.editDialog.scenario;
  const maintainer = canMaintain();
  const llmEnabled = Boolean(state.llm?.enabled);
  const columns = scenario.dataSchema?.columns || [];
  const required = scenario.dataSchema?.required || [];
  const datasets = state.datasetsByScenario[scenario.key] || state.datasets || [];
  const dataSource = state.editDialog.dataSource || 'upload';
  const scriptSource = state.editDialog.scriptSource || 'upload';
  const manualRows = state.editDialog.manualRows?.length
    ? state.editDialog.manualRows
    : [blankDataRow(scenario)];
  const activeRecordingId = state.editDialog.activeRecordingId || '';

  return `
    <div class="modal-backdrop" role="presentation">
      <section class="modal edit-dialog" role="dialog" aria-modal="true" aria-labelledby="editDialogTitle">
        <div class="section-heading">
          <div>
            <h2 id="editDialogTitle">编辑场景 · ${scenario.name}</h2>
            <div class="muted">${scenario.description}</div>
          </div>
          <button class="secondary icon-button" id="closeEditDialog" type="button" aria-label="关闭">×</button>
        </div>
        <div class="edit-dialog-body">
          <div class="detail-section">
            <div class="detail-section-title">字段 ${statusTag(scenario.status)}</div>
            <div class="schema-chips">${columns.map((column) => `
              <span class="schema-chip ${required.includes(column) ? 'required' : ''}">${column}${required.includes(column) ? ' *' : ''}</span>
            `).join('')}</div>
          </div>
          <div class="detail-section">
            ${renderDependencySection(scenario)}
        ${scenario.preflight ? `<div class="preflight-list">${scenario.preflight.checks.map((check) => `<div class="preflight-item ${check.ready ? 'ready' : 'blocked'}"><span>${check.ready ? '✓' : '!'}</span><div><strong>${check.label}</strong>${check.ready ? '' : `<small>${check.action}</small>`}</div></div>`).join('')}</div>` : ''}
          </div>
          <div class="button-row detail-actions">
            <a href="/api/scenarios/${scenario.key}/template.csv"><button type="button" class="secondary">CSV模板</button></a>
            <button type="button" id="generateSample">生成样例</button>
            <button type="button" id="generateAiSample" ${llmEnabled ? '' : 'disabled'}>AI样例</button>
            ${maintainer ? `
              ${scenario.status === 'draft'
                ? '<button type="button" id="publishScenario">发布</button>'
                : '<button type="button" class="secondary" id="unpublishScenario">下架</button>'}
            ` : ''}
          </div>
          ${state.editDialog.message ? `<p class="message detail-message">${state.editDialog.message}</p>` : ''}
          <div class="section-heading compact-heading" style="margin-top:14px">
            <div>
              <h2>测试脚本</h2>
              <div class="muted">当前入口：${scenario.scriptEntry ? `<code>${scenario.scriptEntry}</code>` : '未配置'}</div>
            </div>
          </div>
          ${activeRecordingId ? `<p class="message detail-message">本地录制会话 ${activeRecordingId} 已创建，请在本机终端执行下方命令。</p>` : ''}
          ${renderEditScriptSourceTabs(scriptSource)}
          <div class="run-source-panel">
            ${scriptSource === 'upload' ? `
              <form id="scriptUploadForm" class="upload-inline script-upload-inline">
                <input name="file" type="file" accept=".js,.spec.js,.mjs" required />
                <button type="submit">上传并绑定</button>
              </form>
            ` : `
              <div class="field compact-field">
                <label>录制环境</label>
                <select id="recordEnvironmentSelect" ${activeRecordingId ? 'disabled' : ''}>
                  ${(state.environments.length ? state.environments : [{ key: 'test', name: '测试环境' }]).map((env) => `
                    <option value="${env.key}" ${env.key === (getRowSelection(scenario.key).environment || state.selectedEnvironment) ? 'selected' : ''}>${env.name || env.key}</option>
                  `).join('')}
                </select>
              </div>
              ${renderLocalRecordPanel(state.editDialog.localRecordCommand)}
              ${activeRecordingId ? '' : `
                <div class="button-row manual-data-actions">
                  <button type="button" id="startScenarioRecording">开始本地录制</button>
                </div>
                <div class="muted">浏览器无法直接录制，需在本机终端运行 Playwright Codegen；命令生成后会在你的电脑上打开 Inspector。</div>
              `}
            `}
          </div>
          <div class="section-heading compact-heading" style="margin-top:14px">
            <div>
              <h2>测试数据</h2>
              <div class="muted">${datasets.length} 个数据集 · 上传或界面录入后可在列表行内选择执行</div>
            </div>
          </div>
          <div class="run-source-tabs dataset-source-tabs" role="tablist" aria-label="测试数据录入方式">
            ${[
              ['upload', '上传文件'],
              ['manual', '界面录入']
            ].map(([value, label]) => `
              <button type="button" class="source-tab ${dataSource === value ? 'active' : ''}" data-edit-data-source="${value}">
                ${label}
              </button>
            `).join('')}
          </div>
          <div class="run-source-panel">
            ${dataSource === 'upload' ? `
              <form id="datasetForm" class="upload-inline">
                <input name="name" placeholder="数据集名称" required />
                <input name="file" type="file" accept=".csv,.xlsx" required />
                <button type="submit">上传</button>
              </form>
            ` : `
              <form id="manualDatasetForm" class="manual-dataset-form">
                <div class="field compact-field">
                  <label>数据集名称</label>
                  <input name="name" value="${escapeAttr(state.editDialog.dataName)}" placeholder="例如：登录验证手工样本" required />
                </div>
                ${renderManualDataTable(scenario, manualRows)}
                <div class="button-row manual-data-actions">
                  <button type="button" class="secondary" id="addManualRow">添加一行</button>
                  <button type="button" class="secondary" id="fillManualSample">填入样例</button>
                  <button type="submit">保存数据集</button>
                </div>
              </form>
            `}
          </div>
          ${datasets.length ? table(['名称', '行数', '状态'], datasets.map((dataset) => `
            <tr>
              <td><strong>${dataset.name}</strong><div class="muted file-name">${dataset.fileName}</div></td>
              <td>${dataset.rowCount}</td>
              <td>${statusTag(dataset.validationStatus)}</td>
            </tr>
          `), { className: 'datasets-table-scroll' }) : '<p class="muted empty-datasets">暂无数据集，请上传文件或界面录入。</p>'}
        </div>
        <div class="button-row" style="justify-content:flex-end;margin-top:14px">
          <button type="button" class="secondary" id="cancelEditDialog">关闭</button>
        </div>
      </section>
    </div>
  `;
}

function wireEditDialog() {
  if (!state.editDialog.open || !state.editDialog.scenario) return;
  const scenario = state.editDialog.scenario;
  document.querySelector('#closeEditDialog')?.addEventListener('click', closeEditDialog);
  document.querySelector('#cancelEditDialog')?.addEventListener('click', closeEditDialog);
  document.querySelector('#generateSample')?.addEventListener('click', async () => {
    const sample = await api(`/api/scenarios/${scenario.key}/sample-data`, { method: 'POST', body: JSON.stringify({ count: 3 }) });
    state.editDialog.sampleRows = sample.rows;
    state.editDialog.manualRows = sample.rows.map((row) => ({ ...row }));
    state.editDialog.dataSource = 'manual';
    state.editDialog.message = '已生成样例数据，可在「界面录入」中调整后保存。';
    renderScenarios();
  });
  document.querySelector('#generateAiSample')?.addEventListener('click', async () => {
    try {
      const sample = await api(`/api/scenarios/${scenario.key}/sample-data`, {
        method: 'POST',
        body: JSON.stringify({ count: 3, useLlm: true })
      });
      state.editDialog.sampleRows = sample.rows;
      state.editDialog.manualRows = sample.rows.map((row) => ({ ...row }));
      state.editDialog.dataSource = 'manual';
      state.editDialog.message = sample.source === 'llm'
        ? 'AI 已生成样例，可在「界面录入」中调整后保存'
        : `已回退规则生成：${sample.fallbackReason || ''}`;
    } catch (error) {
      state.editDialog.message = error.message;
    }
    renderScenarios();
  });
  document.querySelector('#publishScenario')?.addEventListener('click', async () => {
    try {
      await api(`/api/scenarios/${scenario.key}/publish`, { method: 'POST', body: '{}' });
      state.editDialog.message = '场景已发布';
      await loadCatalog();
      state.editDialog.scenario = scenarioByKey(scenario.key) || scenario;
    } catch (error) {
      state.editDialog.message = error.message;
    }
    renderScenarios();
  });
  document.querySelector('#unpublishScenario')?.addEventListener('click', async () => {
    try {
      await api(`/api/scenarios/${scenario.key}/unpublish`, { method: 'POST', body: '{}' });
      state.editDialog.message = '场景已取消发布';
      await loadCatalog();
      state.editDialog.scenario = scenarioByKey(scenario.key) || scenario;
    } catch (error) {
      state.editDialog.message = error.message;
    }
    renderScenarios();
  });
  document.querySelectorAll('[data-edit-script-source]').forEach((button) => {
    button.addEventListener('click', () => {
      state.editDialog.scriptSource = button.dataset.editScriptSource;
      state.editDialog.message = '';
      renderScenarios();
    });
  });
  document.querySelector('#scriptUploadForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    state.editDialog.message = '';
    try {
      const file = new FormData(event.target).get('file');
      if (!file?.name) throw new Error('请选择测试脚本文件');
      const result = await uploadScenarioScriptFile(scenario.key, file);
      await loadCatalog();
      state.editDialog.scenario = scenarioByKey(scenario.key) || scenario;
      state.editDialog.message = `脚本已上传：${result.scriptEntry}`;
    } catch (error) {
      state.editDialog.message = error.message;
    }
    renderScenarios();
  });
  document.querySelector('#startScenarioRecording')?.addEventListener('click', async () => {
    state.editDialog.message = '';
    try {
      const environmentKey = document.querySelector('#recordEnvironmentSelect')?.value
        || getRowSelection(scenario.key).environment
        || state.selectedEnvironment;
      const recording = await startScenarioRecording(scenario.key, environmentKey);
      state.editDialog.activeRecordingId = recording.id;
      state.editDialog.localRecordCommand = recording.localCommand || '';
      state.editDialog.scriptSource = 'record';
      state.editDialog.message = '请复制下方命令，在本机项目目录的终端中执行';
    } catch (error) {
      state.editDialog.message = error.message;
    }
    renderScenarios();
  });
  document.querySelector('#copyRecordCommand')?.addEventListener('click', async () => {
    const command = document.querySelector('#localRecordCommand')?.value || state.editDialog.localRecordCommand;
    if (!command) return;
    try {
      await navigator.clipboard.writeText(command);
      state.editDialog.message = '录制命令已复制到剪贴板';
    } catch {
      state.editDialog.message = '复制失败，请手动选中命令复制';
    }
    renderScenarios();
  });
  document.querySelector('#refreshRecordingStatus')?.addEventListener('click', async () => {
    if (!state.editDialog.activeRecordingId) return;
    state.editDialog.message = '';
    try {
      const status = await refreshRecordingStatus(state.editDialog.activeRecordingId, scenario.key);
      if (status.status === 'finished') {
        state.editDialog.message = `录制已完成，脚本已绑定：${status.scriptEntry || ''}`;
      } else {
        state.editDialog.message = '尚未检测到上传的脚本，请确认已在本机终端执行录制命令';
      }
    } catch (error) {
      state.editDialog.message = error.message;
    }
    renderScenarios();
  });
  document.querySelectorAll('[data-edit-data-source]').forEach((button) => {
    button.addEventListener('click', () => {
      preserveEditDialogManualRows();
      const uploadForm = document.querySelector('#datasetForm');
      if (uploadForm) {
        state.editDialog.dataName = new FormData(uploadForm).get('name') || state.editDialog.dataName;
      }
      state.editDialog.dataSource = button.dataset.editDataSource;
      state.editDialog.message = '';
      renderScenarios();
    });
  });
  document.querySelector('#addManualRow')?.addEventListener('click', () => {
    preserveEditDialogManualRows();
    state.editDialog.manualRows.push(blankDataRow(scenario));
    renderScenarios();
  });
  document.querySelectorAll('[data-remove-manual-row]').forEach((button) => {
    button.addEventListener('click', () => {
      preserveEditDialogManualRows();
      const index = Number(button.dataset.removeManualRow);
      state.editDialog.manualRows.splice(index, 1);
      if (!state.editDialog.manualRows.length) {
        state.editDialog.manualRows = [blankDataRow(scenario)];
      }
      renderScenarios();
    });
  });
  document.querySelector('#fillManualSample')?.addEventListener('click', async () => {
    preserveEditDialogManualRows();
    try {
      const sample = await api(`/api/scenarios/${scenario.key}/sample-data`, { method: 'POST', body: JSON.stringify({ count: 3 }) });
      state.editDialog.manualRows = sample.rows.map((row) => ({ ...row }));
      state.editDialog.message = '已填入样例数据，请确认后保存';
    } catch (error) {
      state.editDialog.message = error.message;
    }
    renderScenarios();
  });
  const form = document.querySelector('#datasetForm');
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    state.editDialog.message = '';
    try {
      await api(`/api/scenarios/${scenario.key}/datasets`, { method: 'POST', body: new FormData(form) });
      await loadDatasets(scenario.key);
      state.editDialog.message = '样本数据已上传';
    } catch (error) {
      state.editDialog.message = error.message;
    }
    renderScenarios();
  });
  const manualForm = document.querySelector('#manualDatasetForm');
  manualForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    state.editDialog.message = '';
    try {
      preserveEditDialogForm(manualForm);
      await uploadDatasetRows(scenario, state.editDialog.dataName, state.editDialog.manualRows);
      state.editDialog.message = '测试数据已保存';
      state.editDialog.manualRows = [blankDataRow(scenario)];
      state.editDialog.dataName = '';
    } catch (error) {
      state.editDialog.message = error.message;
    }
    renderScenarios();
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
      <td><button type="button" data-open-run="${run.runId}">详情</button></td>
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
    <div class="run-process-panel">
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
    </div>
  `;
}

function renderRunDetailDialog() {
  if (!state.runDetailOpen || !state.activeRunId) return '';
  const process = state.activeRunProcess;
  const run = state.runs.find((item) => item.runId === state.activeRunId);
  return `
    <div class="modal-backdrop" role="presentation">
      <section class="modal run-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="runDetailTitle">
        <div class="section-heading">
          <div>
            <h2 id="runDetailTitle">执行详情 · ${state.activeRunId}</h2>
            <div class="muted">
              ${process ? `${process.scenarioName} · ${executionModeLabel(process.executionMode)}` : (run ? scenarioNameForRun(run) : '')}
              ${run ? ` · ${run.environment} · ${run.startedAt || '-'}` : ''}
            </div>
          </div>
          <div class="button-row">
            ${process?.canWatchLive && ['queued', 'running'].includes(process.status) ? `<a href="${process.livePreviewUrl}" target="_blank"><button>实时查看</button></a>` : ''}
            <button class="secondary icon-button" id="closeRunDetail" type="button" aria-label="关闭">×</button>
          </div>
        </div>
        ${run?.businessSummary ? `<section class="business-summary"><div><span>数据总数</span><strong>${run.businessSummary.totalRows}</strong></div><div><span>成功</span><strong>${run.businessSummary.passedRows}</strong></div><div><span>失败</span><strong>${run.businessSummary.failedRows}</strong></div><p>${run.businessSummary.message}</p><a href="/api/runs/${run.runId}/failed-rows.csv"><button class="secondary">下载失败数据</button></a></section>` : ''}
        ${renderProcessPanel()}
      </section>
    </div>
  `;
}

function renderRuns() {
  const activeRunChanged = syncActiveRunWithRunFilter();
  if (activeRunChanged) {
    state.runDetailOpen = false;
    stopRunRefreshTimer();
  }
  renderShell(`
    <section class="panel runs-list-panel">
      <div class="section-heading">
        <div>
          <h2>执行与报告</h2>
          <div class="muted">${runScenarioFilterLabel()} · 点击「详情」查看过程、截图与录像回放。</div>
        </div>
        <button id="refreshRuns">刷新</button>
      </div>
      <div class="toolbar">
        <select id="runScenarioFilter">
          <option value="">全部场景</option>
          ${state.scenarios.map((scenario) => `<option value="${scenario.id}" ${state.runScenarioFilter === scenario.id ? 'selected' : ''}>${scenario.name}</option>`).join('')}
        </select>
      </div>
      ${table(['执行编号', '场景', '状态', '环境', '执行模式', '开始时间', '结束时间', '结果', '操作'], filteredRuns().map(runRow), { className: 'runs-table-scroll' })}
    </section>
    ${renderRunDetailDialog()}
  `);
  document.querySelector('#refreshRuns').addEventListener('click', async () => {
    await loadRuns();
    syncActiveRunWithRunFilter();
    if (state.runDetailOpen) await loadRunProcess();
    renderRuns();
  });
  document.querySelector('#runScenarioFilter').addEventListener('change', async (event) => {
    state.runScenarioFilter = event.target.value;
    syncActiveRunWithRunFilter();
    renderRuns();
  });
  document.querySelectorAll('[data-open-run]').forEach((button) => {
    button.addEventListener('click', async () => {
      state.activeRunId = button.dataset.openRun;
      state.runDetailOpen = true;
      await loadRunProcess();
      renderRuns();
    });
  });
  document.querySelector('#closeRunDetail')?.addEventListener('click', () => {
    state.runDetailOpen = false;
    stopRunRefreshTimer();
    renderRuns();
  });
  if (state.runDetailOpen) startRunRefreshTimer();
}


function renderEnvironments() {
  const canEdit = state.user.role === 'admin';
  renderShell(`
    <section class="panel settings-panel">
      <div class="section-heading"><div><h2>环境管理</h2><div class="muted">统一维护被测系统地址和执行账号，执行场景时在弹窗中选择。</div></div></div>
      ${table(['名称','标识','访问地址','账号','默认环境'], state.environments.map((env) => `<tr><td><strong>${env.name}</strong></td><td>${env.key}</td><td>${env.baseUrl}</td><td>${env.username}</td><td>${env.isDefault ? '是' : '否'}</td></tr>`), { className: 'environments-table-scroll' })}
      <form id="environmentForm" class="grid" style="margin-top:18px">
        <h3>新增环境</h3><div class="split"><div class="field"><label>环境名称</label><input name="name" required placeholder="例如：集成测试环境" /></div><div class="field"><label>环境标识</label><input name="key" required placeholder="例如：integration" /></div></div>
        <div class="field"><label>访问地址</label><input name="baseUrl" required placeholder="http://..." /></div><div class="split"><div class="field"><label>账号</label><input name="username" required /></div><div class="field"><label>密码</label><input name="password" type="password" required /></div></div>
        <label class="checkbox-field"><input name="isDefault" type="checkbox" value="1" />设为默认环境</label><div><button type="submit" ${canEdit ? '' : 'disabled'}>保存环境</button></div><p class="message">${canEdit ? state.message : '仅管理员可以新增或修改环境，所有用户均可查看和选择。'}</p>
      </form>
    </section>`);
  document.querySelector('#environmentForm')?.addEventListener('submit', async (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const body = Object.fromEntries(data); body.isDefault = data.get('isDefault') === '1'; try { await api('/api/environments', { method:'POST', body:JSON.stringify(body) }); state.message='环境已保存'; await loadCatalog(); } catch(error) { state.message=error.message; } renderEnvironments(); });
}

async function loadLlmSetting() { state.llm = await api('/api/settings/llm'); }

function renderSettings() {
  const llm = state.llm || {};
  renderShell(`
    <section class="panel settings-panel">
      <h2>LLM Key 配置</h2>
      <p class="muted">用于 AI 生成测试数据；未配置时自动回退规则生成。API Key 只保存，不在页面回显原文。</p>
      <form id="llmForm" class="grid">
        <div class="split">
          <div class="field"><label>供应商</label><input name="provider" value="${llm.provider || 'openai'}" /></div>
          <div class="field"><label>模型</label><input name="model" value="${llm.model || 'gpt-4.1-mini'}" /></div>
        </div>
        <div class="field"><label>Base URL</label><input name="baseUrl" value="${llm.baseUrl || ''}" placeholder="可选，例如兼容 OpenAI 的代理地址" /></div>
        <div class="field"><label>API Key</label><input name="apiKey" type="password" placeholder="${llm.apiKeyMasked || '请输入 API Key'}" /></div>
        <label class="checkbox-field">
          <input type="checkbox" name="enabled" value="1" ${llm.enabled !== false ? 'checked' : ''} />
          启用 LLM
        </label>
        <div class="button-row">
          <button type="submit">保存配置</button>
          <button class="secondary" id="testLlm" type="button">测试连通性</button>
        </div>
        <p class="muted">当前密钥：${llm.apiKeyMasked || '未配置'} · ${llm.enabled ? '已启用' : '未启用'}</p>
        <p class="message">${state.message}</p>
      </form>
    </section>
  `);
  document.querySelector('#llmForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData);
    payload.enabled = formData.get('enabled') === '1';
    try {
      state.llm = await api('/api/settings/llm', { method: 'PUT', body: JSON.stringify(payload) });
      state.message = 'LLM 配置已保存。';
    } catch (error) {
      state.message = error.message;
    }
    renderSettings();
  });
  document.querySelector('#testLlm')?.addEventListener('click', async () => {
    try {
      const result = await api('/api/settings/llm/test', { method: 'POST', body: '{}' });
      state.message = result.message || '连通性测试通过';
    } catch (error) {
      state.message = error.message;
    }
    renderSettings();
  });
}

bootstrap();
