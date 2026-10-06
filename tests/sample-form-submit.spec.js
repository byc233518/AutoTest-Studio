const { test, expect } = require('@playwright/test');
const { rowsFor, shouldRun, testRowTitle } = require('./support/dataset');
const { searchBing } = require('./support/bing');

if (shouldRun('sample-form-submit')) {
  const rows = rowsFor('sample-form-submit', () => ({
    记录编码: 'AT-001',
    记录名称: 'Playwright',
    经办人: '测试员',
    分类: '示例',
    说明: '在 Bing 搜索框填写并提交'
  }));

  for (const row of rows) {
    test(testRowTitle('示例 - 表单填写与提交', row.记录编码, row), async ({ page }) => {
      const query = row.记录名称 || row.记录编码;
      await searchBing(page, query);
      await expect(page).toHaveURL(new RegExp(encodeURIComponent(query), 'i'));
    });
  }
}
