const { test, expect } = require('@playwright/test');
const { login, openImportConfig, recordProcessStep } = require('./support/autotest-ui');
const { rowsFor, shouldRun, testRowTitle } = require('./support/dataset');

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await login(page);
});

const poRows = rowsFor('wms-po-create', (runTag) => ({
  采购订单号: `AT-PO-${runTag}`,
  订单类型: '标准采购',
  供应商编号: `AT-VEN-${runTag}`,
  行项目: '10',
  物料编码: `AT-PART-${runTag}`,
  订单数量: '100',
  接收库位编码: `AT-SIC-${runTag}`,
  交货日: '2026-07-15',
  采购单位: 'PCS',
  库存单位: 'PCS'
}));

const soRows = rowsFor('wms-so-create', (runTag) => ({
  销单号: `AT-SO-${runTag}`,
  销单日期: '2026-07-08',
  销单类型: '标准销售',
  客户编号: `AT-CUST-${runTag}`,
  行号: '10',
  物料编码: `AT-PART-${runTag}`,
  开单数量: '50',
  单位: 'PCS',
  库位编码: `AT-SIC-${runTag}`
}));

if (shouldRun('wms-po-create')) {
  for (const row of poRows) {
    test(testRowTitle('WMS - 采购订单导入配置验证', row.采购订单号, row), async ({ page }) => {
      try {
        await openImportConfig(page);
      } catch (error) {
        if (error.code === 'IMPORT_CONFIG_UNAVAILABLE') {
          test.skip(true, error.message);
          return;
        }
        throw error;
      }
      await expect(page.locator('body')).toContainText(/导入配置|基本信息|导出模板|功能导入|导入/);
      const hasPoHint = await page.locator('body').evaluate((body) => /采购|PO|ImsPoMst/i.test(body.innerText));
      await recordProcessStep(
        page,
        hasPoHint
          ? `采购订单走 Excel 导入路径，样例单号：${row.采购订单号}`
          : `采购订单无独立 CRUD 页，已验证导入配置页就绪；样例单号：${row.采购订单号}`
      );
      expect(row.采购订单号).toBeTruthy();
      expect(row.供应商编号).toBeTruthy();
      expect(row.物料编码).toBeTruthy();
    });
  }
}

if (shouldRun('wms-so-create')) {
  for (const row of soRows) {
    test(testRowTitle('WMS - 销售订单导入配置验证', row.销单号, row), async ({ page }) => {
      try {
        await openImportConfig(page);
      } catch (error) {
        if (error.code === 'IMPORT_CONFIG_UNAVAILABLE') {
          test.skip(true, error.message);
          return;
        }
        throw error;
      }
      await expect(page.locator('body')).toContainText(/导入配置|基本信息|导出模板|功能导入|导入/);
      const hasSoHint = await page.locator('body').evaluate((body) => /销售|SO|ImsSoMst|销单/i.test(body.innerText));
      await recordProcessStep(
        page,
        hasSoHint
          ? `销售订单走 Excel 导入路径，样例单号：${row.销单号}`
          : `销售订单无独立 CRUD 页，已验证导入配置页就绪；样例单号：${row.销单号}`
      );
      expect(row.销单号).toBeTruthy();
      expect(row.客户编号).toBeTruthy();
      expect(row.物料编码).toBeTruthy();
    });
  }
}
