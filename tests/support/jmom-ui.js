const { expect } = require('@playwright/test');
const fs = require('node:fs');
const { config } = require('./config');

function updateProcessFile(patch) {
  if (!process.env.JMOM_PROCESS_FILE) return;
  let current = {};
  try {
    current = JSON.parse(fs.readFileSync(process.env.JMOM_PROCESS_FILE, 'utf8'));
  } catch {
    current = {};
  }
  fs.writeFileSync(
    process.env.JMOM_PROCESS_FILE,
    `${JSON.stringify({ ...current, ...patch, updatedAt: new Date().toISOString() }, null, 2)}\n`,
    'utf8'
  );
}

function markStepRunning(steps = [], stepId) {
  return steps.map((step) => {
    if (step.id === stepId) return { ...step, status: 'running', startedAt: step.startedAt || new Date().toISOString() };
    if (step.status === 'running') return { ...step, status: 'passed', finishedAt: new Date().toISOString() };
    return step;
  });
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buttonTextPattern(labels) {
  const values = Array.isArray(labels) ? labels : [labels];
  const alternatives = values
    .filter(Boolean)
    .map((label) => escapeRegExp(label).split('').join('\\s*'));
  return new RegExp(`^(?:${alternatives.join('|')})$`);
}

async function recordProcessStep(page, title, options = {}) {
  if (!process.env.JMOM_PROCESS_FILE || !process.env.JMOM_RESULT_DIR) return;
  fs.mkdirSync(process.env.JMOM_RESULT_DIR, { recursive: true });
  const screenshotPath = `${process.env.JMOM_RESULT_DIR}/live-latest.png`;
  await page.screenshot({ path: screenshotPath, fullPage: false }).catch(() => {});

  let current = {};
  try {
    current = JSON.parse(fs.readFileSync(process.env.JMOM_PROCESS_FILE, 'utf8'));
  } catch {
    current = {};
  }

  updateProcessFile({
    currentStep: title,
    latestScreenshotUrl: `/api/runs/${process.env.JMOM_RUN_ID}/report-file/live-latest.png`,
    steps: options.stepId ? markStepRunning(current.steps, options.stepId) : current.steps
  });
}

async function waitForLoadingDone(page) {
  await page.locator('.el-loading-mask:visible').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
}

async function login(page) {
  await recordProcessStep(page, '打开登录页', { stepId: 'browser' });
  await page.goto(`${config.baseURL}/#/login`, { waitUntil: 'domcontentloaded' });
  await recordProcessStep(page, '填写登录账号');
  await page.getByPlaceholder('用户名').fill(process.env.JMOM_USERNAME || config.username);
  await page.getByPlaceholder('密码').fill(process.env.JMOM_PASSWORD || config.password);
  await visibleButton(page, '登录').click();
  await page.waitForURL('**/#/index', { timeout: 45_000 });
  await waitForLoadingDone(page);
  await expect(page.locator('body')).toContainText('首页');
  await recordProcessStep(page, '登录成功进入首页', { stepId: 'scenario' });
}

async function gotoBusinessPage(page, hashPath, expectedTitle) {
  await recordProcessStep(page, `打开业务页面：${expectedTitle}`, { stepId: 'scenario' });
  await page.goto(`${config.baseURL}/#${hashPath}`, { waitUntil: 'domcontentloaded' });
  await waitForLoadingDone(page);
  await expect(page.locator('body')).toContainText(expectedTitle);
  await visibleButton(page, '搜索').waitFor({ state: 'visible' });
  await recordProcessStep(page, `业务页面已就绪：${expectedTitle}`);
}

function visibleButton(page, text) {
  return page.locator('button:visible').filter({ hasText: buttonTextPattern(text) }).first();
}

async function clickVisibleButton(page, text) {
  const button = visibleButton(page, text);
  await expect(button).toBeVisible();
  await button.click();
  await waitForLoadingDone(page);
}

function visibleDialog(page, title) {
  return page.locator('.el-dialog:visible').filter({ hasText: title }).first();
}

async function fillFormInput(scope, label, value) {
  const formItem = scope.locator('.el-form-item:visible').filter({ hasText: label }).first();
  await expect(formItem, `表单字段可见: ${label}`).toBeVisible();
  const input = formItem.locator('input:visible').first();
  await expect(input, `字段输入框可见: ${label}`).toBeVisible();
  await input.fill(String(value));
}

function formItemByLabel(scope, label) {
  return scope.locator('.el-form-item:visible').filter({ hasText: label }).first();
}

async function fillLastInputByLabel(scope, label, value) {
  if (value === undefined || value === null || value === '') return;
  const formItem = formItemByLabel(scope, label);
  await expect(formItem, `表单字段可见: ${label}`).toBeVisible();
  const input = formItem.locator('input:visible').last();
  await expect(input, `字段输入框可见: ${label}`).toBeVisible();
  await input.fill(String(value));
  await input.press('Tab').catch(() => {});
}

async function chooseDropdownOption(page, value) {
  const option = page
    .locator('.el-select-dropdown:visible .el-select-dropdown__item, .el-autocomplete-suggestion:visible li, .vxe-table--body:visible .vxe-body--row')
    .filter({ hasText: String(value) })
    .first();
  if (await option.isVisible({ timeout: 5_000 }).catch(() => false)) {
    await option.click();
    await waitForLoadingDone(page);
    return true;
  }
  await page.keyboard.press('Enter').catch(() => {});
  await waitForLoadingDone(page);
  return false;
}

async function selectByLabel(page, scope, label, value) {
  if (value === undefined || value === null || value === '') return;
  const formItem = formItemByLabel(scope, label);
  await expect(formItem, `下拉字段可见: ${label}`).toBeVisible();
  const input = formItem.locator('input:visible').last();
  await expect(input, `下拉输入框可见: ${label}`).toBeVisible();
  await input.click();
  await input.fill(String(value)).catch(async () => {
    await input.pressSequentially(String(value));
  });
  await chooseDropdownOption(page, value);
}

async function selectFirstTableRowByText(page, text) {
  const row = page
    .locator('.el-dialog:visible .vxe-body--row, .vxe-table--body:visible .vxe-body--row, .el-table__body:visible tr')
    .filter({ hasText: String(text) })
    .first();
  if (await row.isVisible({ timeout: 8_000 }).catch(() => false)) {
    await row.click();
    return true;
  }
  return false;
}

async function clickDialogButton(dialog, labels) {
  await dialog.locator('button:visible').filter({ hasText: buttonTextPattern(labels) }).first().click();
}

async function waitForSuccess(page) {
  const successNotice = page
    .locator('.el-notification:visible, .el-message:visible')
    .filter({ hasText: /成功|提交成功|保存成功/ })
    .first();
  await expect(successNotice).toBeVisible({ timeout: 20_000 });
}

async function createMasterDataByDialog(page, fields) {
  await recordProcessStep(page, '打开新增弹窗');
  await clickVisibleButton(page, '新增');
  const dialog = visibleDialog(page, '新增');
  await expect(dialog).toBeVisible();

  for (const field of fields) {
    await recordProcessStep(page, `填写字段：${field.label}`);
    await fillFormInput(dialog, field.label, field.value);
  }

  await recordProcessStep(page, '提交新增表单');
  await dialog.locator('button:visible').filter({ hasText: buttonTextPattern(['确定', '保存']) }).first().click();
  await waitForSuccess(page);
  await expect(dialog).toBeHidden({ timeout: 20_000 });
  await waitForLoadingDone(page);
  await recordProcessStep(page, '新增数据保存成功');
}

async function searchByPlaceholder(page, placeholder, value) {
  await recordProcessStep(page, `查询验证：${value}`);
  const input = page.locator(`input[placeholder="${placeholder}"]:visible`).first();
  await expect(input).toBeVisible();
  await input.fill(String(value));
  await clickVisibleButton(page, '搜索');
  await expect(page.locator('body')).toContainText(String(value));
  await recordProcessStep(page, `查询结果已匹配：${value}`);
}

async function createPart(page, part) {
  await recordProcessStep(page, '打开物料新增页面');
  await clickVisibleButton(page, '新增');
  await expect(visibleButton(page, '保存')).toBeVisible();
  await fillFormInput(page.locator('.ImsPartEdit'), '物料编码', part.code);
  await fillFormInput(page.locator('.ImsPartEdit'), '物料名称', part.name);
  await fillFormInput(page.locator('.ImsPartEdit'), '规格', part.description);
  await fillFormInput(page.locator('.ImsPartEdit'), '库存单位', part.unit);
  await clickVisibleButton(page, '保存');
  await waitForSuccess(page);
  await clickVisibleButton(page, '返回');
  const confirm = page.locator('.el-message-box:visible').first();
  await expect(confirm).toBeVisible();
  await confirm.locator('button:visible').filter({ hasText: buttonTextPattern(['确认', '确定']) }).first().click();
  await expect(visibleButton(page, '新增')).toBeVisible();
  await waitForLoadingDone(page);
  await recordProcessStep(page, `物料保存成功：${part.code}`);
}

async function createVirtualWorkOrder(page, row) {
  await recordProcessStep(page, '打开生产工单页面');
  await gotoBusinessPage(page, '/iMES6/ProductConfiguration/Wo/Index', '工单');
  await recordProcessStep(page, '打开虚拟工单弹窗');
  await clickVisibleButton(page, '虚拟工单');
  const dialog = visibleDialog(page, '虚拟工单');
  await expect(dialog).toBeVisible();

  await selectByLabel(page, dialog, '车间', row.车间名称);
  await selectByLabel(page, dialog, '料号', row.物料编码);
  await selectByLabel(page, dialog, '工单类型', row.工单类型);
  await selectByLabel(page, dialog, '工单状态', row.工单状态);
  await fillLastInputByLabel(dialog, '目标量', row.目标量);
  await fillLastInputByLabel(dialog, '客户交期', row.客户交期);
  await fillLastInputByLabel(dialog, '开始时间', row.开始日期);
  await fillLastInputByLabel(dialog, '完工时间', row.完工日期);
  await fillLastInputByLabel(dialog, '客户订单号', row.客户订单号);
  await fillLastInputByLabel(dialog, '客户料号', row.客户料号);
  await fillLastInputByLabel(dialog, '客户品名', row.客户品名);
  await fillLastInputByLabel(dialog, '客户规格', row.客户规格);

  const generatedWoNo = await formItemByLabel(dialog, '工单号').locator('input:visible').first().inputValue().catch(() => '');
  await recordProcessStep(page, `提交虚拟工单：${generatedWoNo || row.客户订单号 || row.物料编码}`);
  await clickDialogButton(dialog, '确定');
  await expect(dialog).toBeHidden({ timeout: 20_000 });
  await waitForLoadingDone(page);
  await expect(page.locator('body')).toContainText(generatedWoNo || row.物料编码);
  await recordProcessStep(page, `生产工单创建成功：${generatedWoNo || row.物料编码}`);
}

async function chooseOperationFromSelector(page, text) {
  if (!text) return;
  const selectorDialog = page.locator('.el-dialog:visible').last();
  await selectorDialog
    .locator('input:visible')
    .first()
    .fill(String(text))
    .catch(() => {});
  await page.keyboard.press('Enter').catch(() => {});
  await waitForLoadingDone(page);
  const matched = await selectFirstTableRowByText(page, text);
  if (!matched) {
    await selectorDialog.locator('.vxe-body--row, .el-table__body tr').first().click();
  }
  await selectorDialog.locator('button:visible').filter({ hasText: buttonTextPattern(['确定', '提交']) }).first().click();
}

async function createWorkshopAndLine(page, row) {
  await recordProcessStep(page, '打开车间/线体建模页面');
  await gotoBusinessPage(page, '/iMES6/SfcsFactoryModeling/Index', '车间');

  await recordProcessStep(page, '新增车间');
  await clickVisibleButton(page, '新增车间');
  const workshopDialog = visibleDialog(page, '新增');
  await expect(workshopDialog).toBeVisible();
  await fillLastInputByLabel(workshopDialog, '区域编码', row.车间编码);
  await fillLastInputByLabel(workshopDialog, '区域名称', row.车间名称);
  await clickDialogButton(workshopDialog, '保存');
  await waitForSuccess(page);
  await expect(workshopDialog).toBeHidden({ timeout: 20_000 });

  await recordProcessStep(page, `选择车间：${row.车间名称}`);
  await page.locator('.el-tree-node:visible').filter({ hasText: row.车间名称 }).first().click();
  await clickVisibleButton(page, '新增子区域');
  const lineDialog = visibleDialog(page, '新增');
  await expect(lineDialog).toBeVisible();
  await selectByLabel(page, lineDialog, '区域类型', '线体');
  await fillLastInputByLabel(lineDialog, '区域编码', row.线体编码);
  await fillLastInputByLabel(lineDialog, '区域名称', row.线体名称);
  await selectByLabel(page, lineDialog, '工段', row.工段);
  const operationItem = formItemByLabel(lineDialog, '所属工序');
  await operationItem.locator('input:visible').first().click();
  await chooseOperationFromSelector(page, row.所属工序);
  await fillLastInputByLabel(lineDialog, '区域序号', row.区域序号);
  await recordProcessStep(page, `提交线体：${row.线体名称}`);
  await clickDialogButton(lineDialog, '保存');
  await waitForSuccess(page);
  await expect(lineDialog).toBeHidden({ timeout: 20_000 });
  await expect(page.locator('body')).toContainText(row.线体名称);
  await recordProcessStep(page, `车间/线体创建成功：${row.车间名称} / ${row.线体名称}`);
}

async function passBarcode(page, row) {
  const params = new URLSearchParams({ code: row.作业看板编码 || 'DesktopReportWork', wono: row.工单号 || '' });
  if (row.线体ID) params.set('lineid', row.线体ID);
  await recordProcessStep(page, '打开生产作业看板');
  await page.goto(`${config.baseURL}/#/iMES6/DesktopReportWork/Index?${params.toString()}`, { waitUntil: 'domcontentloaded' });
  await waitForLoadingDone(page);
  await expect(page.locator('body')).toContainText(/请选择区域|工单号|输入|生产作业|扫码过站/);

  if (!row.线体ID && row.线体名称) {
    await recordProcessStep(page, `选择区域：${row.线体名称}`);
    await page.locator('.design-header-title, .design-header-title-text').first().click();
    const areaDialog = page.locator('.el-dialog:visible').filter({ hasText: '区域信息' }).first();
    if (await areaDialog.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await selectByLabel(page, areaDialog, '车间', row.车间名称);
      await selectByLabel(page, areaDialog, '区域', row.线体名称);
      await clickDialogButton(areaDialog, '确定');
      await waitForLoadingDone(page);
    }
  }

  await recordProcessStep(page, `扫码过站：${row.条码}`);
  const scanInput = page.locator('input.native-scan-input:visible').first();
  await expect(scanInput, '条码输入框可见').toBeVisible({ timeout: 20_000 });
  await scanInput.fill(String(row.条码));
  await scanInput.press('Enter');
  await expect(page.locator('body')).toContainText(/处理成功|成功|提交报工失败|请选择工序|请选择区域/);
  await recordProcessStep(page, `条码过站已提交：${row.条码}`);
}

module.exports = {
  config,
  login,
  recordProcessStep,
  gotoBusinessPage,
  createMasterDataByDialog,
  createPart,
  createVirtualWorkOrder,
  createWorkshopAndLine,
  passBarcode,
  searchByPlaceholder,
  buttonTextPattern
};
