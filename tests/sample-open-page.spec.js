const { test } = require('@playwright/test');
const { shouldRun } = require('./support/dataset');
const { openBingHome } = require('./support/bing');

if (shouldRun('sample-open-page')) {
  test('打开 Bing 首页并校验搜索框', async ({ page }) => {
    await openBingHome(page);
  });
}
