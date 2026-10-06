const { test, expect } = require('@playwright/test');
const { rowsFor, shouldRun, testRowTitle } = require('./support/dataset');
const { searchBing } = require('./support/bing');

if (shouldRun('sample-data-driven')) {
  const rows = rowsFor('sample-data-driven', () => ({
    记录编码: 'AT-ROW-001',
    记录名称: 'TypeScript'
  }));

  for (const row of rows) {
    test(testRowTitle('示例 - 数据驱动执行', row.记录编码, row), async ({ page }) => {
      const query = row.记录名称 || row.记录编码;
      await searchBing(page, query);
      await expect(page).toHaveURL(new RegExp(encodeURIComponent(query), 'i'));
    });
  }
}
