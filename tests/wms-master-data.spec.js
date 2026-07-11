const { test } = require('@playwright/test');
const {
  login,
  gotoBusinessPage,
  createMasterDataByDialog,
  createPart,
  createLocator,
  searchByPlaceholder
} = require('./support/jmom-ui');
const { rowsFor, shouldRun, testRowTitle } = require('./support/dataset');

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await login(page);
});

const customerRows = rowsFor('wms-customer-create', (runTag) => ({
  客户编号: `AT-CUST-${runTag}`,
  客户名称: `自动化客户-${runTag}`,
  联系人: '自动化测试',
  客户类别: '自动化',
  客户地址: '自动化测试地址'
}));

const vendorRows = rowsFor('wms-vendor-create', (runTag) => ({
  供应商编号: `AT-VEN-${runTag}`,
  供应商名称: `自动化供应商-${runTag}`,
  联系人: '自动化测试',
  供应商类别: '自动化',
  供应商地址: '自动化测试地址',
  可提前送货天数: '0'
}));

const partRows = rowsFor('wms-part-create', (runTag) => ({
  物料编码: `AT-PART-${runTag}`,
  物料名称: `自动化物料-${runTag}`,
  规格: '自动化规格',
  库存单位: 'PCS'
}));

const locatorRows = rowsFor('wms-locator-create', (runTag) => ({
  储位码: `AT-LOC-${runTag}`,
  储位名称: `自动化储位-${runTag}`,
  公司: '自动化公司',
  仓库: '自动化仓库',
  捡料区: 'PA01',
  储存区: 'SA01',
  楼层: '1',
  部门: '自动化部门',
  区域: 'A',
  货架号: 'R01',
  货架面: '正面',
  容量: '100',
  储位类型: '普通',
  库位编码: ''
}));

if (shouldRun('wms-customer-create')) {
for (const row of customerRows) {
  test(testRowTitle('WMS - 客户主数据录入', row.客户编号, row), async ({ page }) => {
    await gotoBusinessPage(page, '/ImsCustomer/Index', '客户档案');
    await createMasterDataByDialog(page, [
      { label: '客户编号', value: row.客户编号 },
      { label: '客户名称', value: row.客户名称 },
      { label: '联系人', value: row.联系人 },
      { label: '客户类别', value: row.客户类别 },
      { label: '客户地址', value: row.客户地址 }
    ]);
    await searchByPlaceholder(page, '请输入客户编号', row.客户编号);
  });
}
}

if (shouldRun('wms-vendor-create')) {
for (const row of vendorRows) {
  test(testRowTitle('WMS - 供应商主数据录入', row.供应商编号, row), async ({ page }) => {
    await gotoBusinessPage(page, '/ImsVendor/Index', '供应商');
    await createMasterDataByDialog(page, [
      { label: '供应商编号', value: row.供应商编号 },
      { label: '供应商名称', value: row.供应商名称 },
      { label: '联系人', value: row.联系人 },
      { label: '供应商类别', value: row.供应商类别 },
      { label: '供应商地址', value: row.供应商地址 },
      { label: '可提前送货天数', value: row.可提前送货天数 }
    ]);
    await searchByPlaceholder(page, '请输入供应商编号', row.供应商编号);
  });
}
}

if (shouldRun('wms-part-create')) {
for (const row of partRows) {
  test(testRowTitle('WMS - 物料主数据录入', row.物料编码, row), async ({ page }) => {
    await gotoBusinessPage(page, '/ImsPart/Index', '料号管理');
    await createPart(page, {
      code: row.物料编码,
      name: row.物料名称,
      description: row.规格,
      unit: row.库存单位
    });
    await searchByPlaceholder(page, '请输入料号', row.物料编码);
  });
}
}

if (shouldRun('wms-locator-create')) {
for (const row of locatorRows) {
  test(testRowTitle('WMS - 库位维护录入', row.储位码, row), async ({ page }) => {
    await createLocator(page, row);
    await searchByPlaceholder(page, '请输入储位码', row.储位码);
  });
}
}
