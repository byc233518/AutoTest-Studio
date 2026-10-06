const { test, expect } = require('@playwright/test');
const { rowsFor, shouldRun, testRowTitle } = require('./support/dataset');
const { searchBing } = require('./support/bing');

if (shouldRun('sample-search')) {
  const rows = rowsFor('sample-search', () => ({ 关键字: 'Playwright' }));

  for (const row of rows) {
    test(testRowTitle('示例 - 查询与筛选', row.关键字, row), async ({ page }) => {
      const query = row.关键字 || 'Playwright';
      await searchBing(page, query);
      await expect(page.locator('#b_results, #b_content')).toContainText(new RegExp(query, 'i'));
    });
  }
}
