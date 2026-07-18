import assert from 'node:assert/strict';
import test from 'node:test';
import { analyzeRecordedScript, buildDataDrivenScript } from '../../server/platform/recording-analysis.mjs';

const basicSource = `import { test, expect } from '@playwright/test';

test('创建客户', async ({ page }) => {
  await page.getByLabel('客户编码').fill('C001');
  await page.getByPlaceholder('请输入客户名称').fill('测试客户');
  await expect(page.getByText('保存成功')).toBeVisible();
});`;

test('分析两个固定输入并保留可读标签和可见断言', () => {
  const result = analyzeRecordedScript(basicSource);

  assert.equal(result.supported, true);
  assert.deepEqual(result.warnings, []);
  assert.deepEqual(result.fields, [
    { candidateId: 'field-1', label: '客户编码', type: 'text', value: 'C001' },
    { candidateId: 'field-2', label: '请输入客户名称', type: 'text', value: '测试客户' }
  ]);
  assert.deepEqual(result.assertions, [
    { type: 'visible', label: '保存成功' }
  ]);
});

test('参数化脚本使用 defineRecordedTests 和 schema', () => {
  const result = buildDataDrivenScript({
    source: basicSource,
    title: '客户录入',
    fields: [
      { candidateId: 'field-1', key: 'customerCode', label: '客户编码', type: 'text', value: 'C001', required: true },
      { candidateId: 'field-2', key: 'customerName', label: '客户名称', type: 'text', value: '测试客户', required: false }
    ],
    assertions: [{ type: 'visible', label: '保存成功' }]
  });

  assert.deepEqual(result.schema, {
    columns: ['customerCode', 'customerName'],
    required: ['customerCode'],
    example: { customerCode: 'C001', customerName: '测试客户' },
    fields: [
      { key: 'customerCode', label: '客户编码', type: 'text', required: true },
      { key: 'customerName', label: '客户名称', type: 'text', required: false }
    ]
  });
  assert.match(result.script, /const \{ defineRecordedTests \} = require\('\.\.\/support\/recorded-script'\);/);
  assert.match(result.script, /defineRecordedTests\(test, ["']客户录入["'], dataSchema, async \(\{ page \}, data\) => \{/);
  assert.match(result.script, /\.fill\(data\.customerCode\)/);
  assert.match(result.script, /\.fill\(data\.customerName\)/);
  assert.match(result.script, /await expect\(page\.getByText\('保存成功'\)\)\.toBeVisible\(\);/);
});

test('多个 test 拒绝转换', () => {
  const result = analyzeRecordedScript(`${basicSource}\ntest('另一个', async () => {});`);

  assert.equal(result.supported, false);
  assert.match(result.warnings.join('\n'), /仅支持包含一个 Playwright test/);
});

test('语法错误返回中文 warning 而不是抛出解析异常', () => {
  const result = analyzeRecordedScript("test('坏脚本', async ({ page }) => { await page.getByLabel('x').fill('y');");

  assert.equal(result.supported, false);
  assert.match(result.warnings.join('\n'), /脚本语法无法解析/);
});

test('分析 selectOption 和 checkbox 候选类型', () => {
  const source = `import { test } from '@playwright/test';
test('选择', async ({ page }) => {
  await page.getByRole('combobox', { name: '状态' }).selectOption('enabled');
  await page.getByLabel('启用').check();
});`;

  const result = analyzeRecordedScript(source);

  assert.equal(result.supported, true);
  assert.deepEqual(result.fields, [
    { candidateId: 'field-1', label: '状态', type: 'select', value: 'enabled' },
    { candidateId: 'field-2', label: '启用', type: 'checkbox', value: true }
  ]);
});

test('参数化 checkbox 候选为 data 布尔值', () => {
  const source = `import { test } from '@playwright/test';
test('选择', async ({ page }) => {
  await page.getByLabel('启用').check();
});`;

  const result = buildDataDrivenScript({
    source,
    title: '状态维护',
    fields: [{ candidateId: 'field-1', key: 'enabled', label: '启用', type: 'checkbox', value: true, required: true }],
    assertions: []
  });

  assert.match(result.script, /page\.getByLabel\('启用'\)\.setChecked\(data\.enabled\)/);
});

test('参数化时补充向导新增的 URL、文本和值断言', () => {
  const result = buildDataDrivenScript({
    source: basicSource,
    title: '客户录入',
    fields: [],
    assertions: [
      { type: 'url', value: '/customers' },
      { type: 'text', label: '客户编号', value: 'C001' },
      { type: 'value', label: '客户编码', value: 'C001' }
    ]
  });

  assert.match(result.script, /await expect\(page\)\.toHaveURL\(["']\/customers["']\);/);
  assert.match(result.script, /await expect\(page\.getByText\(["']客户编号["']\)\)\.toHaveText\(["']C001["']\);/);
  assert.match(result.script, /await expect\(page\.getByLabel\(["']客户编码["']\)\)\.toHaveValue\(["']C001["']\);/);
});
