const { test, expect } = require('@playwright/test');
const { login } = require('./support/jmom-ui');
const { rowsFor, shouldRun } = require('./support/dataset');

test.skip(!shouldRun('auth-login'), '平台本次未选择登录场景');

const rows = rowsFor('auth-login', () => ({
  用户名: process.env.JMOM_USERNAME || 'byc',
  密码: process.env.JMOM_PASSWORD || 'Abcd1234'
}));

for (const row of rows) {
  test(`基座 - 登录验证 - ${row.用户名}`, async ({ page }) => {
    process.env.JMOM_USERNAME = row.用户名;
    process.env.JMOM_PASSWORD = row.密码;
    await login(page);
    await expect(page).toHaveURL(/#\/index$/);
    await expect(page).toHaveTitle(/JMOM/);
  });
}
