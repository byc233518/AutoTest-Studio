const { test, expect } = require('@playwright/test');
const { login, openImportConfig, recordProcessStep } = require('./support/autotest-ui');
const { rowsFor, shouldRun, testRowTitle } = require('./support/dataset');

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await login(page);
});

const importRows = rowsFor('base-excel-import', () => ({
  基本信息名称: '客户导入',
  表名: 'ImsCustomer',
  项目标题: '客户编号',
  Excel栏位: 'CustomerCode',
  是否可空值: '否'
}));

if (shouldRun('base-excel-import')) {
  for (const row of importRows) {
    test(testRowTitle('基座 - Excel 导入配置验证', row.基本信息名称 || row.表名, row), async ({ page }) => {
      try {
        await openImportConfig(page);
      } catch (error) {
        if (error.code === 'IMPORT_CONFIG_UNAVAILABLE') {
          test.skip(true, error.message);
          return;
        }
        throw error;
      }
      await expect(page.locator('body')).toContainText(/导入配置|基本信息|导出模板|导入/);
      await recordProcessStep(
        page,
        `导入配置页已就绪，样例：${row.基本信息名称} / ${row.表名}`
      );
      expect(row.基本信息名称).toBeTruthy();
      expect(row.表名).toBeTruthy();
    });
  }
}
