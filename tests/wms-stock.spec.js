const { test, expect } = require('@playwright/test');
const { login, gotoBusinessPage, buttonTextPattern } = require('./support/jmom-ui');
const { shouldRun } = require('./support/dataset');

test.beforeEach(async ({ page }) => {
  await login(page);
});

if (shouldRun('wms-stock-query')) {
  test('WMS - 库存查询与追溯入口', async ({ page }) => {
    await gotoBusinessPage(page, '/ImsStock/Index', '库存', { requireSearch: false });
    await expect(page.locator('button:visible').filter({ hasText: buttonTextPattern('搜索') }).first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('body')).toContainText('子条码');
    await expect(page.locator('body')).toContainText('收料单据信息');
    await expect(page.locator('body')).toContainText('捡料单据信息');
    await expect(page.locator('body')).toContainText('库存交易日志');
  });
}
