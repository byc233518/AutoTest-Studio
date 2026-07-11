import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('前端外壳采用 ElephasCRM 风格的浅色管理后台结构', async () => {
  const [styles, script] = await Promise.all([
    readFile('web/styles.css', 'utf8'),
    readFile('web/app.js', 'utf8')
  ]);

  assert.match(styles, /--ele-primary:\s*#7c3aed/);
  assert.match(styles, /\.app-shell\s*{[^}]*display:\s*flex/s);
  assert.match(styles, /\.sidebar\s*{[^}]*background:\s*rgba\(255,\s*255,\s*255/s);
  assert.match(styles, /\.topbar\s*{[^}]*position:\s*sticky/s);
  assert.match(styles, /\.tabs-bar\s*{/);
  assert.match(script, /class="tabs-bar"/);
});

test('执行中心提供实时过程和截图录像回放面板', async () => {
  const [styles, script] = await Promise.all([
    readFile('web/styles.css', 'utf8'),
    readFile('web/app.js', 'utf8')
  ]);

  assert.match(script, /loadRunProcess/);
  assert.match(script, /\/api\/runs\/\$\{runId\}\/process/);
  assert.match(script, /activeRunProcess/);
  assert.match(script, /livePreviewUrl/);
  assert.match(script, /latestScreenshotUrl/);
  assert.match(script, /videoReplayUrl/);
  assert.match(script, /resultTests/);
  assert.match(script, /renderResultTests/);
  assert.match(script, /renderEvidenceNotice/);
  assert.match(script, /<video/);
  assert.match(styles, /\.run-process-panel\s*{/);
  assert.match(styles, /\.runs-list-panel\s*{/);
  assert.match(styles, /\.live-preview-frame\s*{/);
  assert.match(styles, /\.screenshot-preview\s*{/);
  assert.match(styles, /\.result-tests\s*{/);
  assert.match(styles, /\.evidence-notice\s*{/);
});

test('场景列表行内提供环境、样本数据与执行操作', async () => {
  const [styles, script] = await Promise.all([
    readFile('web/styles.css', 'utf8'),
    readFile('web/app.js', 'utf8')
  ]);

  assert.doesNotMatch(script, /data-row-env=/);
  assert.doesNotMatch(script, /data-row-dataset=/);
  assert.match(script, /data-row-run=/);
  assert.match(script, /data-open-edit=/);
  assert.match(script, /function openEditDialog/);
  assert.match(script, /function renderEditDialog/);
  assert.match(styles, /\.row-env-select\s*{/);
  assert.match(styles, /\.row-dataset-select\s*{/);
  assert.match(styles, /\.run-mode-select\s*{/);
});

test('前端接口遇到非 JSON 响应时不会抛出原始解析异常', async () => {
  const script = await readFile('web/app.js', 'utf8');

  assert.match(script, /headers\.get\('content-type'\)/);
  assert.match(script, /接口返回了非 JSON 内容/);
  assert.match(script, /failedRunProcess/);
  assert.match(script, /catch \(error\)[\s\S]*failedRunProcess\(error, runId\)/);
});

test('所有列表都有固定高度的滚动容器', async () => {
  const [styles, script] = await Promise.all([
    readFile('web/styles.css', 'utf8'),
    readFile('web/app.js', 'utf8')
  ]);

  assert.match(styles, /\.table-scroll\s*{[^}]*max-height:\s*min\(58vh,\s*520px\)/s);
  assert.match(styles, /\.table-scroll\s*{[^}]*overflow:\s*auto/s);
  assert.match(script, /function table\(headers, rows, options = \{\}\)/);
  assert.match(script, /class="table-scroll \$\{options\.className \|\| ''\}"/);
  assert.match(script, /state\.apps\.map[\s\S]*className: 'apps-table-scroll'/);
  assert.match(script, /state\.modules[\s\S]*className: 'modules-table-scroll'/);
  assert.match(script, /scenarioRows[\s\S]*className: 'scenarios-table-scroll'/);
  assert.match(script, /filteredRuns\(\)\.map\(runRow\)[\s\S]*className: 'runs-table-scroll'/);
});

test('场景列表支持编辑弹窗维护数据并跳转历史过滤', async () => {
  const script = await readFile('web/app.js', 'utf8');

  assert.match(script, /runScenarioFilter:\s*''/);
  assert.match(script, /editDialog:\s*\{/);
  assert.match(script, /runDialog:\s*\{/);
  assert.match(script, /function filteredRuns\(\)/);
  assert.match(script, /function openEditDialog\(scenario\)/);
  assert.match(script, /function openScenarioHistory\(scenario\)/);
  assert.match(script, /data-open-edit=/);
  assert.match(script, /data-open-history=/);
  assert.match(script, /function renderEditDialog\(\)/);
  assert.match(script, /测试数据/);
  assert.match(script, /data-edit-data-source=/);
  assert.match(script, /id="manualDatasetForm"/);
  assert.match(script, /function renderManualDataTable/);
  assert.match(script, /name="file" type="file" accept="\.csv,\.xlsx"/);
  assert.match(script, /id="runScenarioFilter"/);
});

test('前端暴露环境、依赖校验与发布/AI 样例能力', async () => {
  const script = await readFile('web/app.js', 'utf8');

  assert.match(script, /\/api\/environments/);
  assert.match(script, /selectedEnvironment/);
  assert.match(script, /selectedEnvironment/);
  assert.match(script, /dependency-check/);
  assert.match(script, /enforceDependencies/);
  assert.match(script, /useLlm:\s*true/);
  assert.match(script, /id="publishScenario"/);
  assert.match(script, /id="generateAiSample"/);
  assert.match(script, /\/api\/settings\/llm\/test/);
});

test('run dialog treats dependency checks as opt-in', async () => {
  const script = await readFile('web/app.js', 'utf8');

  assert.match(script, /runDialog:\s*\{[\s\S]*enforceDependencies:\s*false/);
  assert.match(script, /state\.runDialog = \{[\s\S]*enforceDependencies:\s*false/);
  assert.match(script, /const enforceDependencies = options\.enforceDependencies \?\? false/);
  assert.doesNotMatch(script, /enforceDependencies:\s*\(scenario\.dependsOn \|\| \[\]\)\.length > 0/);
});

test('执行与报告主界面仅保留列表，详情通过弹窗查看', async () => {
  const [styles, script] = await Promise.all([
    readFile('web/styles.css', 'utf8'),
    readFile('web/app.js', 'utf8')
  ]);

  assert.match(script, /runDetailOpen/);
  assert.match(script, /function renderRunDetailDialog\(\)/);
  assert.match(script, /id="closeRunDetail"/);
  assert.match(script, /data-open-run=/);
  assert.doesNotMatch(script, /class="grid runs-workspace"/);
  assert.match(styles, /\.run-detail-dialog\s*{/);
});

test('所有角色可通过新建场景弹窗快速创建草稿', async () => {
  const [styles, script] = await Promise.all([
    readFile('web/styles.css', 'utf8'),
    readFile('web/app.js', 'utf8')
  ]);

  assert.match(script, /id="openCreateScenario"/);
  assert.match(script, /function renderCreateDialog\(\)/);
  assert.match(script, /data-create-script-source/);
  assert.match(script, /id="scriptUploadForm"/);
  assert.match(script, /id="startScenarioRecording"/);
  assert.match(script, /localRecordCommand/);
  assert.match(script, /refreshRecordingStatus/);
  assert.match(script, /function wireCreateDialog\(\)/);
  assert.match(script, /createDialog:\s*\{/);
  assert.match(script, /suggestScenarioKey/);
  assert.match(styles, /\.create-dialog\s*{/);
});

test('场景数据维护在编辑弹窗中完成', async () => {
  const [styles, script] = await Promise.all([
    readFile('web/styles.css', 'utf8'),
    readFile('web/app.js', 'utf8')
  ]);

  assert.match(script, /edit-dialog/);
  assert.match(script, /schema-chips/);
  assert.match(script, /upload-inline/);
  assert.match(script, /manualDatasetForm/);
  assert.match(script, /manual-data-table/);
  assert.match(script, /测试脚本/);
  assert.match(script, /scriptUploadForm/);
  assert.match(styles, /\.script-source-tabs\s*{/);
  assert.match(styles, /\.edit-dialog\s*{/);
  assert.match(styles, /\.schema-chips\s*{/);
  assert.match(styles, /\.upload-inline\s*{/);
  assert.match(styles, /\.manual-data-table\s*{/);
});

test('应用管理、模块管理、AI 设置收拢到设置二级菜单', async () => {
  const [styles, script] = await Promise.all([
    readFile('web/styles.css', 'utf8'),
    readFile('web/app.js', 'utf8')
  ]);

  assert.match(script, /SETTINGS_VIEWS/);
  assert.match(script, /function renderSettingsNav\(\)/);
  assert.match(script, /data-toggle-settings/);
  assert.match(script, />设置</);
  assert.match(script, /navButton\('apps', '应用管理'/);
  assert.match(script, /navButton\('modules', '模块管理'/);
  assert.match(script, /navButton\('settings', 'AI 设置'/);
  assert.match(styles, /\.nav-group\s*{/);
  assert.match(styles, /\.nav-sub\s*{/);
  assert.match(styles, /\.nav-group-toggle\s*{/);
});
