import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../../web/app.js', import.meta.url), 'utf8');

test('场景首页不再显示推荐任务且行内不含执行配置控件', () => {
  assert.doesNotMatch(source, /推荐任务/);
  assert.doesNotMatch(source, /data-row-env/);
  assert.doesNotMatch(source, /data-row-dataset/);
  assert.doesNotMatch(source, /data-row-mode/);
});

test('执行弹窗集中提供环境、数据集、UI模式和表格数据填写', () => {
  assert.match(source, /name="environment"/);
  assert.match(source, /name="datasetId"/);
  assert.match(source, /executionMode: 'ui'/);
  assert.match(source, /manual-data-grid/);
  assert.doesNotMatch(source, /填写CSV/);
});

test('设置菜单包含环境管理且 AI 设置不限制角色', () => {
  assert.match(source, /navButton\('environments'/);
  assert.match(source, /async function loadLlmSetting/);
});
