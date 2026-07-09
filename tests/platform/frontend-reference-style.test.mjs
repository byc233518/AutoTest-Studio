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

test('执行模式控件紧邻每条数据集的执行按钮', async () => {
  const [styles, script] = await Promise.all([
    readFile('web/styles.css', 'utf8'),
    readFile('web/app.js', 'utf8')
  ]);

  assert.doesNotMatch(script, /class="execution-mode-picker"/);
  assert.match(script, /data-run-mode="\$\{dataset\.id\}"/);
  assert.match(script, /selectedRunMode\(button\.dataset\.run\)/);
  assert.match(styles, /\.run-action-group\s*{/);
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

test('场景列表支持弹窗执行和跳转历史过滤', async () => {
  const script = await readFile('web/app.js', 'utf8');

  assert.match(script, /runScenarioFilter:\s*''/);
  assert.match(script, /runDialog:\s*\{/);
  assert.match(script, /function filteredRuns\(\)/);
  assert.match(script, /function openRunDialog\(scenario\)/);
  assert.match(script, /function openScenarioHistory\(scenario\)/);
  assert.match(script, /data-open-run-dialog="\$\{item\.key\}"/);
  assert.match(script, /data-open-history="\$\{item\.key\}"/);
  assert.match(script, /function renderRunDialog\(\)/);
  assert.match(script, /\['history', '选择历史数据'\]/);
  assert.match(script, /\['upload', '上传文件'\]/);
  assert.match(script, /\['manual', '填写CSV'\]/);
  assert.match(script, /data-run-source="\$\{value\}"/);
  assert.match(script, /name="manualCsv"/);
  assert.match(script, /name="file" type="file" accept="\.csv,\.xlsx"/);
  assert.match(script, /id="runScenarioFilter"/);
});
