const { test, expect } = require('@playwright/test');
const { login } = require('./support/autotest-ui');
const { rowsFor, shouldRun, testRowTitle } = require('./support/dataset');

test.skip(!shouldRun('auth-login'), '平台本次未选择登录场景');

const rows = rowsFor('auth-login', () => ({
  用户名: process.env.AUTOTEST_USERNAME || 'byc',
  密码: process.env.AUTOTEST_PASSWORD || 'Abcd1234'
}));

for (const row of rows) {
  test(testRowTitle('基座 - 登录验证', row.用户名, row), async ({ page }) => {
    process.env.AUTOTEST_USERNAME = row.用户名;
    process.env.AUTOTEST_PASSWORD = row.密码;
    await login(page);
    await expect(page).toHaveURL(/#\/index$/);
    await expect(page).toHaveTitle(/JMOM/);
  });
}
