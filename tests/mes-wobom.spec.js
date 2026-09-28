const { test, expect } = require('@playwright/test');
const { login, gotoBusinessPage, buttonTextPattern } = require('./support/jmom-ui');
const { shouldRun } = require('./support/dataset');

test.beforeEach(async ({ page }) => {
  await login(page);
});

if (shouldRun('mes-wobom-query')) {
  test('MES - 生产 BOM 查询与同步入口', async ({ page }) => {
    await gotoBusinessPage(page, '/iMES6/ProductConfiguration/WoBom/Index', '生产BOM', { requireSearch: false });
    await expect(page.locator('button:visible').filter({ hasText: buttonTextPattern('同步生产BOM') }).first()).toBeVisible({ timeout: 20_000 });
    await expect(page.locator('button:visible').filter({ hasText: buttonTextPattern('搜索') }).first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('body')).toContainText('单号同步');
  });
}
