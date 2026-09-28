const { test } = require('@playwright/test');
const { login, runBarcodeReportScenario } = require('./support/autotest-ui');
const { rowsFor, shouldRun, testRowTitle } = require('./support/dataset');

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await login(page);
});

const barcodeReportRows = rowsFor('mes-barcode-report', (runTag) => ({
  物料编码: process.env.AUTOTEST_PART_CODE || 'AT-PART-REAL0902',
  工单类型: '正常',
  工单状态: '已创建',
  目标量: '10',
  条码数量: '10',
  条码前缀: `AT-SN-${runTag}`,
  变化位数: '4',
  车间编码: `AT-WS-${runTag}`,
  车间名称: process.env.AUTOTEST_WORKSHOP_NAME || '自动化车间-REAL0932',
  线体编码: `AT-LINE-${runTag}`,
  线体名称: process.env.AUTOTEST_LINE_NAME || '自动化线体-REAL0932',
  工段: '总装',
  所属工序: '总装',
  区域序号: '1',
  工艺名称: `AT-ROUTE-${runTag}`,
  作业看板编码: process.env.AUTOTEST_DESKTOP_CODE || 'S20250032',
  工序名称: process.env.AUTOTEST_OPERATION_NAME || 'SMT2',
  创建车间线体: process.env.AUTOTEST_CREATE_WORKSHOP_LINE || '',
  客户订单号: `AT-CO-${runTag}`,
  客户料号: `AT-OEM-${runTag}`,
  客户品名: `自动化客户品名-${runTag}`,
  客户规格: '自动化客户规格',
  开始日期: '2026-07-08',
  完工日期: '2026-07-09',
  客户交期: '2026-07-15'
}));

if (shouldRun('mes-barcode-report')) {
  for (const row of barcodeReportRows) {
    test(
      testRowTitle('MES - 条码报工全流程', row.客户订单号 || row.条码前缀, row),
      async ({ page }) => {
        try {
          const result = await runBarcodeReportScenario(page, row);
          test.info().annotations.push({
            type: '工单号',
            description: result.woNo
          });
          test.info().annotations.push({
            type: '条码',
            description: result.barcodes.join(', ')
          });
        } catch (error) {
          if (
            error.code === 'MES_BARCODE_UNAVAILABLE'
            || error.code === 'MES_WORKORDER_UNAVAILABLE'
            || error.code === 'MES_WORKSHOP_UNAVAILABLE'
            || error.code === 'MES_RUNCARD_UNAVAILABLE'
            || error.code === 'MES_ROUTE_UNAVAILABLE'
          ) {
            test.skip(true, error.message);
            return;
          }
          if (error.code === 'MES_BARCODE_REPORT_FAILED') {
            test.fail(true, error.message);
            return;
          }
          throw error;
        }
      }
    );
  }
}
