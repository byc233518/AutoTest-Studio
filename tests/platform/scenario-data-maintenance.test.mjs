import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('测试数据维护使用同一张表承接所有录入方式', async () => {
  const source = await readFile('frontend/src/components/ScenarioDrawer.vue', 'utf8');

  assert.match(source, /加载已保存数据/);
  assert.match(source, /下载 Excel 模板/);
  assert.match(source, /导入 Excel \/ CSV/);
  assert.match(source, /自动生成/);
  assert.match(source, /AI 生成/);
  assert.match(source, /:data="dataRows"/);
  assert.match(source, /保存数据/);
  assert.doesNotMatch(source, /dataSource/);
});

test('已保存数据、文件导入和生成结果都回填统一表格', async () => {
  const source = await readFile('frontend/src/components/ScenarioDrawer.vue', 'utf8');

  assert.match(source, /dataSchema\?\.columns/);
  assert.match(source, /requiredColumns/);
  assert.match(source, /loadDataset/);
  assert.match(source, /datasets\/\$\{datasetId\}/);
  assert.match(source, /previewDataFile/);
  assert.match(source, /datasets\/preview/);
  assert.match(source, /dataRows\.value\.push/);
  assert.match(source, /template\.xlsx/);
  assert.match(source, /addDataRow/);
  assert.match(source, /removeDataRow/);
  assert.match(source, /validateDataRows/);
  assert.match(source, /dataRowsCsv/);
  assert.match(source, /new Blob\(\[dataRowsCsv\(\)\]/);
});

test('AI 生成通过配置窗口设置条数和规则并支持降级', async () => {
  const source = await readFile('frontend/src/components/ScenarioDrawer.vue', 'utf8');

  assert.match(source, /title="AI 生成测试数据"/);
  assert.match(source, /label="生成条数"/);
  assert.match(source, /label="生成规则"/);
  assert.match(source, /aiConfig\.value/);
  assert.match(source, /fallbackReason/);
  assert.match(source, /大模型不可用，已降级自动生成/);
});
