const { test } = require('@playwright/test');
const {
  login,
  createVirtualWorkOrder,
  createWorkshopAndLine,
  passBarcode
} = require('./support/jmom-ui');
const { rowsFor, shouldRun, testRowTitle } = require('./support/dataset');

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await login(page);
});

const workorderRows = rowsFor('mes-workorder-create', (runTag) => ({
  // Prefer a part created in earlier real runs; fall back to tagged code.
  物料编码: process.env.JMOM_PART_CODE || 'AT-PART-REAL0902',
  工单类型: '正常',
  工单状态: '已创建',
  目标量: '10',
  车间名称: process.env.JMOM_WORKSHOP_NAME || '',
  客户订单号: `AT-CO-${runTag}`,
  客户料号: `AT-OEM-${runTag}`,
  客户品名: `自动化客户品名-${runTag}`,
  客户规格: '自动化客户规格',
  开始日期: '2026-07-08',
  完工日期: '2026-07-09',
  客户交期: '2026-07-15'
}));

const workshopLineRows = rowsFor('mes-workshop-line-create', (runTag) => ({
  车间编码: `AT-WS-${runTag}`,
  车间名称: `自动化车间-${runTag}`,
  线体编码: `AT-LINE-${runTag}`,
  线体名称: `自动化线体-${runTag}`,
  工段: '总装',
  所属工序: '总装',
  区域序号: '1'
}));

const barcodePassRows = rowsFor('mes-barcode-pass', (runTag) => ({
  // 桌面管理方案编码（条码报工），可用 JMOM_DESKTOP_CODE 覆盖
  作业看板编码: process.env.JMOM_DESKTOP_CODE || 'S20250032',
  工单号: process.env.JMOM_WO_NO || '',
  线体ID: process.env.JMOM_LINE_ID || '',
  车间名称: process.env.JMOM_WORKSHOP_NAME || `自动化车间-${runTag}`,
  线体名称: process.env.JMOM_LINE_NAME || `自动化线体-${runTag}`,
  工序名称: '总装',
  条码: `AT-SN-${runTag}`,
  良品数: '1',
  次品数: '0',
  是否扫码提交: '是'
}));

if (shouldRun('mes-workorder-create')) {
  for (const row of workorderRows) {
    test(testRowTitle('MES - 生产工单创建', row.客户订单号 || row.物料编码, row), async ({ page }) => {
      await createVirtualWorkOrder(page, row);
    });
  }
}

if (shouldRun('mes-workshop-line-create')) {
  for (const row of workshopLineRows) {
    test(testRowTitle('MES - 车间/线体创建', `${row.车间名称} / ${row.线体名称}`, row), async ({ page }) => {
      await createWorkshopAndLine(page, row);
    });
  }
}

if (shouldRun('mes-barcode-pass')) {
  for (const row of barcodePassRows) {
    test(testRowTitle('MES - 条码过站', row.条码, row), async ({ page }) => {
      try {
        await passBarcode(page, row);
      } catch (error) {
        if (error.code === 'MES_BARCODE_UNAVAILABLE') {
          test.skip(true, error.message);
          return;
        }
        throw error;
      }
    });
  }
}
