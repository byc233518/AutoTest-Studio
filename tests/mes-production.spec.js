const { test } = require('@playwright/test');
const {
  login,
  createVirtualWorkOrder,
  createWorkshopAndLine,
  passBarcode
} = require('./support/jmom-ui');
const { rowsFor, shouldRun } = require('./support/dataset');

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await login(page);
});

const workorderRows = rowsFor('mes-workorder-create', (runTag) => ({
  物料编码: `AT-PART-${runTag}`,
  工单类型: '正常',
  工单状态: '已创建',
  目标量: '10',
  车间名称: '自动化车间001',
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
  作业看板编码: 'DesktopReportWork',
  工单号: `AT-WO-${runTag}`,
  线体ID: '',
  车间名称: '自动化车间001',
  线体名称: '自动化线体001',
  工序名称: '总装',
  条码: `AT-SN-${runTag}`,
  良品数: '1',
  次品数: '0',
  是否扫码提交: '是'
}));

if (shouldRun('mes-workorder-create')) {
  for (const row of workorderRows) {
    test(`MES - 生产工单创建 - ${row.客户订单号 || row.物料编码}`, async ({ page }) => {
      await createVirtualWorkOrder(page, row);
    });
  }
}

if (shouldRun('mes-workshop-line-create')) {
  for (const row of workshopLineRows) {
    test(`MES - 车间/线体创建 - ${row.车间名称} / ${row.线体名称}`, async ({ page }) => {
      await createWorkshopAndLine(page, row);
    });
  }
}

if (shouldRun('mes-barcode-pass')) {
  for (const row of barcodePassRows) {
    test(`MES - 条码过站 - ${row.条码}`, async ({ page }) => {
      await passBarcode(page, row);
    });
  }
}
