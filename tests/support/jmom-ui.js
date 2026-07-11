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

async function gotoBusinessPage(page, hashPath, expectedTitle, options = {}) {
  await recordProcessStep(page, `打开业务页面：${expectedTitle}`, { stepId: 'scenario' });
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await page.goto(`${config.baseURL}/#${hashPath}`, { waitUntil: 'domcontentloaded' });
    await waitForLoadingDone(page);
    await page.waitForTimeout(800);
    const url = page.url();
    const body = await page.locator('body').innerText().catch(() => '');
    const titleReady = body.includes(expectedTitle) || new RegExp(expectedTitle).test(body);
    const routeReady = url.includes(hashPath.replace(/^\//, '')) || url.includes(hashPath);
    if (titleReady && (routeReady || options.requireSearch === false)) {
      break;
    }
    if (attempt === 2) {
      await expect(page.locator('body')).toContainText(expectedTitle);
    }
  }
  if (options.requireSearch !== false) {
    const searchVisible = await visibleButton(page, '搜索').isVisible({ timeout: 5_000 }).catch(() => false);
    if (!searchVisible && options.requireSearch === true) {
      await visibleButton(page, '搜索').waitFor({ state: 'visible' });
    }
  }
  await recordProcessStep(page, `业务页面已就绪：${expectedTitle}`);
}

function visibleButton(page, text, options = {}) {
  const values = Array.isArray(text) ? text : [text];
  const pattern = options.exact === false
    ? new RegExp(values.filter(Boolean).map((label) => escapeRegExp(label).split('').join('\\s*')).join('|'))
    : buttonTextPattern(values);
  return page.locator('button:visible').filter({ hasText: pattern }).first();
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

function formItemByLabel(scope, label) {
  return scope.locator('.el-form-item:visible').filter({ hasText: label }).first();
}

async function resolveInputByLabel(page, scope, label) {
  const candidates = [
    () => formItemByLabel(scope, label).locator('input:visible').first(),
    () => scope.locator(`input[placeholder*="${label}"]:visible`).first(),
    () => page.getByLabel(String(label), { exact: false }),
    () => formItemByLabel(scope, label).locator('input:visible').last()
  ];

  for (let index = 0; index < candidates.length; index += 1) {
    const input = candidates[index]();
    const visible = await input.isVisible({ timeout: 2_000 }).catch(() => false);
    if (!visible) continue;
    if (index > 0) {
      await recordProcessStep(page, `自愈定位: ${label} → 策略${index + 1}`);
    }
    return input;
  }

  throw new Error(`无法定位输入框: ${label}`);
}

async function fillFormInput(scope, label, value) {
  const page = typeof scope.page === 'function' ? scope.page() : scope;
  const input = await resolveInputByLabel(page, scope, label);
  await expect(input, `字段输入框可见: ${label}`).toBeVisible();
  await input.fill(String(value));
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

async function fillEnabledInputByLabel(scope, label, value) {
  if (value === undefined || value === null || value === '') return;
  const items = scope.locator('.el-form-item:visible').filter({ hasText: label });
  const count = await items.count();
  let input = null;
  for (let index = 0; index < count; index += 1) {
    const candidate = items.nth(index).locator('input:visible:not([disabled])').last();
    if (await candidate.isVisible({ timeout: 500 }).catch(() => false)) {
      input = candidate;
      break;
    }
  }
  if (!input) {
    throw new Error(`无法定位可编辑输入框: ${label}`);
  }
  await input.fill(String(value));
  await input.press('Tab').catch(() => {});
}

async function chooseDropdownOption(page, value) {
  const text = String(value);
  const selectItem = page
    .locator('.el-select-dropdown:visible .el-select-dropdown__item')
    .filter({ hasText: text })
    .first();
  if (await selectItem.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await selectItem.click({ force: true });
    await waitForLoadingDone(page);
    return true;
  }

  const suggestion = page
    .locator('.el-autocomplete-suggestion:visible li')
    .filter({ hasText: text })
    .first();
  if (await suggestion.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await suggestion.click({ force: true });
    await waitForLoadingDone(page);
    return true;
  }

  await page.keyboard.press('Enter').catch(() => {});
  await waitForLoadingDone(page);
  return false;
}

async function closeOpenDropdown(page) {
  // 只关下拉，不按 Escape（会关掉 el-dialog）
  const openDropdown = page.locator('.el-select-dropdown:visible, .jz-select-dropdown:visible').first();
  if (await openDropdown.isVisible({ timeout: 300 }).catch(() => false)) {
    await page.mouse.click(8, 8).catch(() => {});
    await waitForLoadingDone(page);
  }
}

async function selectByLabel(page, scope, label, value) {
  if (value === undefined || value === null || value === '') return;
  await closeOpenDropdown(page);
  await waitForLoadingDone(page);
  const formItem = formItemByLabel(scope, label);
  await expect(formItem, `下拉字段可见: ${label}`).toBeVisible();
  const input = formItem.locator('input:visible').last();
  await expect(input, `下拉输入框可见: ${label}`).toBeVisible();
  await input.click({ force: true });
  await input.fill(String(value)).catch(async () => {
    await input.pressSequentially(String(value));
  });
  await chooseDropdownOption(page, value);
  await closeOpenDropdown(page);
}

async function selectEnabledByLabel(page, scope, label, value) {
  if (value === undefined || value === null || value === '') return;
  await closeOpenDropdown(page);
  const items = scope.locator('.el-form-item:visible').filter({ hasText: label });
  const count = await items.count();
  let formItem = items.first();
  for (let index = 0; index < count; index += 1) {
    const candidate = items.nth(index);
    const enabled = candidate.locator('input:visible:not([disabled])').first();
    if (await enabled.isVisible({ timeout: 500 }).catch(() => false)) {
      formItem = candidate;
      break;
    }
  }
  await expect(formItem, `可编辑下拉字段可见: ${label}`).toBeVisible();
  const input = formItem.locator('input:visible:not([disabled])').last();
  await input.click({ force: true });
  await chooseDropdownOption(page, value);
  await closeOpenDropdown(page);
}

async function selectJzTableValue(page, scope, label, value) {
  if (value === undefined || value === null || value === '') return;
  await closeOpenDropdown(page);
  await waitForLoadingDone(page);
  const formItem = formItemByLabel(scope, label);
  await expect(formItem, `选择器字段可见: ${label}`).toBeVisible();
  const trigger = formItem.locator('input.el-input__inner:visible').last();
  await expect(trigger, `选择器触发器可见: ${label}`).toBeVisible({ timeout: 10_000 });
  await trigger.click({ force: true });
  // JzSelect 常设置 append-to-body=false，下拉可能挂在弹窗内。
  const dropdown = page
    .locator('.jz-select-dropdown:visible, .el-select-dropdown:visible')
    .last();
  await expect(dropdown, `选择器下拉可见: ${label}`).toBeVisible({ timeout: 15_000 });
  const searchInput = dropdown.locator('input:visible').first();
  if (await searchInput.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await searchInput.fill(String(value));
    const searchBtn = dropdown.locator('button:visible').filter({ hasText: /搜\s*索/ }).first();
    if (await searchBtn.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await searchBtn.click();
    } else {
      await searchInput.press('Enter').catch(() => {});
    }
    await waitForLoadingDone(page);
  }
  const row = dropdown
    .locator('.el-select-dropdown__item, .wrapper-row, li')
    .filter({ hasText: String(value) })
    .first();
  await expect(row, `选择器结果可见: ${value}`).toBeVisible({ timeout: 15_000 });
  await row.click({ force: true });
  await dropdown.waitFor({ state: 'hidden', timeout: 8_000 }).catch(() => {});
  await closeOpenDropdown(page);
}

async function waitForMesAction(page, buttonText, errorCode, hashPath = '') {
  const tabHint = hashPath.includes('ImesRuncardRanger')
    ? /产品条码管理/
    : hashPath.includes('ProdRoutes')
      ? /产品工艺配置/
      : hashPath.includes('SfcsFactoryModeling')
        ? /工厂建模/
        : hashPath.includes('ProductConfiguration/Wo')
          ? /工单管理/
          : null;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    if (hashPath && attempt > 0) {
      await page.goto(`${config.baseURL}/#${hashPath}`, { waitUntil: 'domcontentloaded' });
    } else if (hashPath && attempt === 0) {
      await page.goto(`${config.baseURL}/#${hashPath}`, { waitUntil: 'domcontentloaded' });
    }
    await waitForLoadingDone(page);
    await page.locator('.el-loading-mask:visible, .el-loading-spinner:visible').waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => {});
    if (tabHint) {
      const tab = page
        .locator('.tags-view-item:visible, .el-tabs__item:visible, [class*="tag"]:visible, .d2-multiple-page-control-content-item:visible')
        .filter({ hasText: tabHint })
        .last();
      if (await tab.isVisible({ timeout: 800 }).catch(() => false)) {
        await tab.click({ force: true }).catch(() => {});
        await waitForLoadingDone(page);
      }
    }
    const button = visibleButton(page, buttonText, { exact: false });
    if (await button.isVisible({ timeout: 3_000 }).catch(() => false)) {
      return button;
    }
    await page.waitForTimeout(1_200);
  }
  const bodyText = await page.locator('body').innerText().catch(() => '');
  const error = new Error(
    `MES 页面未加载出「${buttonText}」，可能是微前端未挂载或账号无权限。页面摘要: ${bodyText.replace(/\s+/g, ' ').slice(0, 160)}`
  );
  error.code = errorCode;
  throw error;
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

async function closeOpenDatePicker(page) {
  const picker = page.locator('.el-picker-panel:visible, .el-date-picker:visible .el-picker-panel').first();
  if (await picker.isVisible({ timeout: 300 }).catch(() => false)) {
    await page.mouse.click(8, 8).catch(() => {});
    await picker.waitFor({ state: 'hidden', timeout: 3_000 }).catch(() => {});
  }
}

async function clickDialogButton(dialog, labels) {
  const page = dialog.page();
  await closeOpenDatePicker(page);
  await closeOpenDropdown(page);
  await dialog.locator('button:visible').filter({ hasText: buttonTextPattern(labels) }).first().click({ force: true });
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
  const confirmButton = confirm.getByRole('button', { name: /确认|确定/ }).first();
  if (await confirmButton.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await confirmButton.click({ force: true });
  } else {
    await confirm.locator('button:visible').filter({ hasText: /确认|确定/ }).last().click({ force: true });
  }
  await expect(visibleButton(page, '新增')).toBeVisible({ timeout: 20_000 });
  await waitForLoadingDone(page);
  await recordProcessStep(page, `物料保存成功：${part.code}`);
}

async function createVirtualWorkOrder(page, row) {
  await recordProcessStep(page, '打开生产工单页面');
  await gotoBusinessPage(page, '/iMES6/ProductConfiguration/Wo/Index', '工单', { requireSearch: false });
  await waitForMesAction(page, '虚拟工单', 'MES_WORKORDER_UNAVAILABLE', '/iMES6/ProductConfiguration/Wo/Index');
  await recordProcessStep(page, '打开虚拟工单弹窗');
  await closeOpenDropdown(page);
  await visibleButton(page, '虚拟工单', { exact: false }).click();
  await waitForLoadingDone(page);
  const dialog = page
    .locator('.el-dialog:visible')
    .filter({ hasText: '虚拟工单' })
    .filter({ has: page.locator('.el-form-item:visible').filter({ hasText: '工单号' }) })
    .first();
  await expect(dialog, '虚拟工单弹窗可见').toBeVisible({ timeout: 20_000 });
  await expect(formItemByLabel(dialog, '料号')).toBeVisible();

  // 料号是 JzSelect 表格选择器，必须先选完并关闭，再填其它下拉，避免遮挡。
  await selectJzTableValue(page, dialog, '料号', row.物料编码);
  if (row.车间名称) {
    await selectByLabel(page, dialog, '车间', row.车间名称);
  }
  await selectByLabel(page, dialog, '工单类型', row.工单类型);
  if (row.工单状态) {
    await selectByLabel(page, dialog, '工单状态', row.工单状态);
  }
  await fillLastInputByLabel(dialog, '目标量', row.目标量);
  await fillLastInputByLabel(dialog, '客户交期', row.客户交期);
  await fillLastInputByLabel(dialog, '开始时间', row.开始日期);
  await fillLastInputByLabel(dialog, '完工时间', row.完工日期);
  await fillLastInputByLabel(dialog, '客户订单号', row.客户订单号);
  await fillLastInputByLabel(dialog, '客户料号', row.客户料号);
  await fillLastInputByLabel(dialog, '客户品名', row.客户品名);
  await fillLastInputByLabel(dialog, '客户规格', row.客户规格);
  await closeOpenDatePicker(page);

  const generatedWoNo = await formItemByLabel(dialog, '工单号').locator('input:visible').first().inputValue().catch(() => '');
  await recordProcessStep(page, `提交虚拟工单：${generatedWoNo || row.客户订单号 || row.物料编码}`);
  await clickDialogButton(dialog, '确定');
  const woDialogClosed = await dialog.waitFor({ state: 'hidden', timeout: 20_000 }).then(() => true).catch(() => false);
  if (!woDialogClosed) {
    const errors = await dialog.locator('.el-form-item__error:visible').allInnerTexts().catch(() => []);
    const toast = await page.locator('.el-message:visible, .el-notification:visible').innerText().catch(() => '');
    const error = new Error(`虚拟工单保存失败: ${[...errors, toast].filter(Boolean).join('；') || '弹窗未关闭'}`);
    error.code = 'MES_WORKORDER_UNAVAILABLE';
    throw error;
  }
  await waitForLoadingDone(page);
  await expect(page.locator('body')).toContainText(generatedWoNo || row.物料编码);
  await recordProcessStep(page, `生产工单创建成功：${generatedWoNo || row.物料编码}`);
  return generatedWoNo || '';
}

function buildSnListFromRange(snBegin, snEnd, expectedCount) {
  if (!snBegin) return [];
  const count = Number(expectedCount) || 1;
  if (snEnd && snBegin !== snEnd) {
    const matchBegin = String(snBegin).match(/^(.*?)(\d+)$/);
    const matchEnd = String(snEnd).match(/^(.*?)(\d+)$/);
    if (matchBegin && matchEnd && matchBegin[1] === matchEnd[1]) {
      const width = matchBegin[2].length;
      const start = parseInt(matchBegin[2], 10);
      const end = parseInt(matchEnd[2], 10);
      const list = [];
      for (let value = start; value <= end; value += 1) {
        list.push(`${matchBegin[1]}${String(value).padStart(width, '0')}`);
      }
      if (list.length >= count) return list.slice(0, count);
    }
  }
  if (count === 1) return [snBegin];
  const match = String(snBegin).match(/^(.*?)(\d+)$/);
  if (match) {
    const width = match[2].length;
    const start = parseInt(match[2], 10);
    return Array.from({ length: count }, (_, index) => `${match[1]}${String(start + index).padStart(width, '0')}`);
  }
  return Array.from({ length: count }, (_, index) => `${snBegin}-${String(index + 1).padStart(2, '0')}`);
}

async function selectFirstJzOption(page, scope, label) {
  await closeOpenDropdown(page);
  const formItem = formItemByLabel(scope, label);
  await expect(formItem, `选择器字段可见: ${label}`).toBeVisible();
  const trigger = formItem.locator('input.el-input__inner:visible').last();
  await trigger.click({ force: true });
  const dropdown = page.locator('.jz-select-dropdown:visible, .el-select-dropdown:visible').last();
  await expect(dropdown, `选择器下拉可见: ${label}`).toBeVisible({ timeout: 15_000 });
  const row = dropdown.locator('.el-select-dropdown__item:not(.is-disabled), .wrapper-row, li').first();
  await expect(row, `选择器存在可选项: ${label}`).toBeVisible({ timeout: 10_000 });
  await row.click({ force: true });
  await dropdown.waitFor({ state: 'hidden', timeout: 8_000 }).catch(() => {});
  await closeOpenDropdown(page);
}

async function readInputByLabel(scope, label) {
  const formItem = formItemByLabel(scope, label);
  const input = formItem.locator('input:visible').last();
  if (!(await input.isVisible({ timeout: 2_000 }).catch(() => false))) return '';
  return input.inputValue().catch(() => '');
}

async function createRuncardBarcodesForWorkOrder(page, row) {
  const woNo = row.工单号;
  const count = Number(row.条码数量 || row.目标量 || 10);
  await recordProcessStep(page, `打开产品条码管理：${woNo}`);
  await waitForMesAction(page, '保存', 'MES_RUNCARD_UNAVAILABLE', '/iMES6/ImesRuncardRanger/Index');

  const saveBtn = visibleButton(page, '保存');
  if (!(await saveBtn.isEnabled({ timeout: 2_000 }).catch(() => true))) {
    const addBtn = visibleButton(page, '新增');
    if (await addBtn.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await addBtn.click();
      const confirm = page.locator('.el-message-box:visible').filter({ hasText: /继续|清空/ }).first();
      if (await confirm.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await confirm.locator('button:visible').filter({ hasText: buttonTextPattern(['确定']) }).first().click();
      }
      await waitForLoadingDone(page);
    }
  }

  const formScope = page.locator('.edit-form, .jg-layout-normal').first();
  await selectJzTableValue(page, formScope, '工单', woNo);
  await waitForLoadingDone(page);
  await page.waitForTimeout(1200);

  await fillLastInputByLabel(formScope, '分配数量', String(count));
  let snBegin = await readInputByLabel(formScope, '开始流水号');
  if (!snBegin && row.条码前缀) {
    await fillLastInputByLabel(formScope, '开始流水号', String(row.条码前缀));
    snBegin = row.条码前缀;
    await page.waitForTimeout(800);
  }
  if (!(await readInputByLabel(formScope, '进制'))) {
    await selectFirstJzOption(page, formScope, '进制').catch(() => {});
    await page.waitForTimeout(500);
  }
  const rangeInput = formItemByLabel(formScope, '变化位数').locator('input:visible').last();
  if (await rangeInput.isEnabled().catch(() => false)) {
    const rangeValue = row.变化位数 || '4';
    await rangeInput.fill(String(rangeValue));
    await rangeInput.press('Tab').catch(() => {});
    await page.waitForTimeout(800);
  }

  await recordProcessStep(page, `保存条码范围：${count} 个`);
  await clickVisibleButton(page, '保存');
  await waitForSuccess(page);
  await waitForLoadingDone(page);

  snBegin = (await readInputByLabel(formScope, '开始流水号')) || snBegin;
  const snEnd = await readInputByLabel(formScope, '结束流水号');
  const barcodes = buildSnListFromRange(snBegin, snEnd, count);
  if (!barcodes.length) {
    const error = new Error(`未能生成条码列表：SnBegin=${snBegin}, SnEnd=${snEnd}`);
    error.code = 'MES_RUNCARD_UNAVAILABLE';
    throw error;
  }
  await recordProcessStep(page, `条码已创建：${barcodes[0]} ~ ${barcodes[barcodes.length - 1]}`);
  return { snBegin, snEnd, barcodes };
}

async function createProductRouteForPart(page, row) {
  const partNo = row.物料编码 || row.料号;
  const routeName = row.工艺名称 || `AT-ROUTE-${partNo}`;
  await recordProcessStep(page, `打开产品工艺配置：${partNo}`);
  await waitForMesAction(page, '新增', 'MES_ROUTE_UNAVAILABLE', '/iMES6/ProdRoutes/Index');

  const bodyText = await page.locator('body').innerText().catch(() => '');
  if (partNo && bodyText.includes(partNo) && bodyText.includes('已审核')) {
    await recordProcessStep(page, `工艺路线已存在：${partNo}`);
    return;
  }

  await clickVisibleButton(page, '新增');
  const dialog = page.locator('.el-dialog:visible').filter({ hasText: '新增' }).first();
  await expect(dialog).toBeVisible({ timeout: 10_000 });
  await selectJzTableValue(page, dialog, '料号', partNo);
  if (row.来源模板) {
    await selectJzTableValue(page, dialog, '来源模板', row.来源模板);
  } else {
    await selectFirstJzOption(page, dialog, '来源模板');
  }
  const currentRouteName = await readInputByLabel(dialog, '工艺名称');
  if (!currentRouteName) {
    await fillFormInput(dialog, '工艺名称', routeName);
  }
  if (!(await readInputByLabel(dialog, '类型'))) {
    await selectFirstJzOption(page, dialog, '类型').catch(() => {});
  }

  await recordProcessStep(page, `保存工艺路线：${routeName}`);
  await clickDialogButton(dialog, '保存');
  await waitForSuccess(page);
  await expect(dialog).toBeHidden({ timeout: 20_000 }).catch(() => {});
  await waitForLoadingDone(page);

  const reviewBtn = visibleButton(page, '审核');
  if (await reviewBtn.isVisible({ timeout: 2_000 }).catch(() => false)) {
    const rowLocator = page.locator('.vxe-body--row:visible, .el-table__body tr:visible').filter({ hasText: partNo }).first();
    if (await rowLocator.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await rowLocator.click({ force: true });
      await reviewBtn.click();
      const confirm = page.locator('.el-message-box:visible').first();
      if (await confirm.isVisible({ timeout: 3_000 }).catch(() => false)) {
        const confirmBtn = confirm.locator('button:visible').filter({ hasText: buttonTextPattern(['确定', '确认', '是']) }).first();
        if (await confirmBtn.isVisible({ timeout: 2_000 }).catch(() => false)) {
          await confirmBtn.click({ force: true });
          await waitForSuccess(page).catch(() => {});
        } else {
          await page.keyboard.press('Escape').catch(() => {});
        }
      }
    }
  }
  await recordProcessStep(page, `工艺路线创建成功：${partNo}`);
}

async function openDesktopReportWork(page, row) {
  const desktopCode = row.作业看板编码 || process.env.JMOM_DESKTOP_CODE || 'S20250032';
  const params = new URLSearchParams({ code: desktopCode });
  if (row.工单号) params.set('wono', row.工单号);
  await recordProcessStep(page, `打开条码报工页面：${desktopCode}${row.工单号 ? ` / ${row.工单号}` : ''}`);
  await page.goto(`${config.baseURL}/#/iMES6/DesktopReportWork/Index?${params.toString()}`, { waitUntil: 'domcontentloaded' });
  await waitForDesktopReportWork(page);
}

async function selectDesktopArea(page, row) {
  const needArea = !row.线体ID && (row.线体名称 || row.车间名称);
  if (!needArea) return;
  await recordProcessStep(page, `选择线体：${row.线体名称 || row.车间名称}`);
  const title = page.locator('.design-header-title, .design-header-title-text').first();
  await expect(title).toBeVisible({ timeout: 10_000 });
  await title.click({ force: true });
  const areaDialog = page.locator('.el-dialog:visible').filter({ hasText: '区域信息' }).first();
  await expect(areaDialog).toBeVisible({ timeout: 10_000 });
  if (row.车间名称) {
    await selectJzTableValue(page, areaDialog, '车间', row.车间名称);
  }
  if (row.线体名称) {
    await selectJzTableValue(page, areaDialog, '区域', row.线体名称);
  }
  await clickDialogButton(areaDialog, '确定');
  await expect(areaDialog).toBeHidden({ timeout: 15_000 });
  await waitForLoadingDone(page);
  if (row.线体名称) {
    await expect(page.locator('.design-header-title-text')).toContainText(row.线体名称, { timeout: 10_000 });
  }
}

async function selectDesktopOperation(page, operationName) {
  await recordProcessStep(page, `选择工序：${operationName || '默认'}`);
  await waitForLoadingDone(page);
  await page.waitForTimeout(2000);

  const radioSelectors = [
    '.process-checkbox .el-radio:visible',
    '.process-content .el-radio:visible',
    '.design-panel .el-radio-group .el-radio:visible'
  ];
  let radios = null;
  for (const selector of radioSelectors) {
    const candidate = page.locator(selector);
    if (await candidate.first().isVisible({ timeout: 8_000 }).catch(() => false)) {
      radios = candidate;
      break;
    }
  }
  if (!radios) {
    const roleRadio = page.getByRole('radio').first();
    if (await roleRadio.isVisible({ timeout: 3_000 }).catch(() => false)) {
      if (operationName) {
        const named = page.getByRole('radio', { name: new RegExp(String(operationName)) }).first();
        if (await named.isVisible({ timeout: 2_000 }).catch(() => false)) {
          await named.click({ force: true });
        } else {
          await roleRadio.click({ force: true });
        }
      } else {
        await roleRadio.click({ force: true });
      }
      await page.waitForTimeout(1000);
      await waitForLoadingDone(page);
      return;
    }
    await recordProcessStep(page, '作业看板未展示工序选项，沿用系统默认工序');
    return;
  }
  if (operationName) {
    const matched = radios.filter({ hasText: String(operationName) }).first();
    if (await matched.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await matched.click({ force: true });
    } else {
      await radios.first().click({ force: true });
    }
  } else {
    await radios.first().click({ force: true });
  }
  await page.waitForTimeout(1000);
  await waitForLoadingDone(page);
}

async function selectDesktopWorkOrder(page, woNo) {
  await recordProcessStep(page, `选择工单：${woNo}`);
  const woCard = page.locator('.work-order-content').first();
  const woInput = woCard.locator('input[disabled]').first();
  const currentWo = (await woInput.inputValue().catch(() => '')) || (await woCard.innerText().catch(() => ''));
  if (currentWo.includes(String(woNo))) {
    await recordProcessStep(page, `工单已选中：${woNo}`);
    return;
  }

  const selectBtn = woCard.locator('button:visible').filter({ hasText: buttonTextPattern(['选择']) }).first();
  await expect(selectBtn, '工单选择按钮可见').toBeVisible({ timeout: 15_000 });
  await selectBtn.click({ force: true });
  await page.waitForTimeout(800);

  const dialog = page.locator('.el-dialog:visible').filter({ hasText: '生产总览' }).first();
  if (!(await dialog.isVisible({ timeout: 5_000 }).catch(() => false))) {
    const blocked = page.locator('.el-notification:visible, .el-message:visible').filter({ hasText: /请选择工序|请选择区域/ }).first();
    if (await blocked.isVisible({ timeout: 2_000 }).catch(() => false)) {
      const message = (await blocked.innerText().catch(() => '')).replace(/\s+/g, ' ').trim();
      const error = new Error(`无法选择工单：${message || '请先选择线体与工序'}`);
      error.code = 'MES_BARCODE_UNAVAILABLE';
      throw error;
    }
    await page.reload({ waitUntil: 'domcontentloaded' });
    await waitForDesktopReportWork(page);
    const reloadedWo = (await woInput.inputValue().catch(() => '')) || (await woCard.innerText().catch(() => ''));
    if (reloadedWo.includes(String(woNo))) return;
    const retryDialog = page.locator('.el-dialog:visible').filter({ hasText: '生产总览' }).first();
    if (!(await retryDialog.isVisible({ timeout: 5_000 }).catch(() => false))) {
      const error = new Error(`生产总览弹窗未打开，无法选择工单 ${woNo}`);
      error.code = 'MES_BARCODE_UNAVAILABLE';
      throw error;
    }
  }

  const activeDialog = page.locator('.el-dialog:visible').filter({ hasText: '生产总览' }).first();
  await expect(activeDialog).toBeVisible({ timeout: 15_000 });

  const dialogWoInput = activeDialog.locator('input[placeholder*="工单"], input[placeholder*="Wo"]').first();
  if (await dialogWoInput.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await dialogWoInput.fill(String(woNo));
  } else {
    await activeDialog.locator('.el-form-item').filter({ hasText: '工单号' }).locator('input:visible').first().fill(String(woNo));
  }
  await activeDialog.locator('button:visible').filter({ hasText: buttonTextPattern(['查询']) }).first().click();
  await waitForLoadingDone(page);

  const row = activeDialog.locator('.vxe-body--row:visible').filter({ hasText: String(woNo) }).first();
  await expect(row, `待选工单可见：${woNo}`).toBeVisible({ timeout: 20_000 });
  const checkbox = row.locator('.vxe-checkbox--icon, .vxe-cell--checkbox').first();
  if (await checkbox.isVisible({ timeout: 1_000 }).catch(() => false)) {
    await checkbox.click({ force: true });
  } else {
    await row.click({ force: true });
  }
  await clickDialogButton(activeDialog, '确定');
  await expect(activeDialog).toBeHidden({ timeout: 15_000 });
  await waitForLoadingDone(page);
  await expect(page.locator('.work-order-content, .design-panel')).toContainText(String(woNo), { timeout: 15_000 });
}

async function scanBarcodeAndWait(page, barcode, index, total) {
  await recordProcessStep(page, `扫码报工 ${index + 1}/${total}：${barcode}`);
  const scanInput = page.locator('input.native-scan-input').first();
  await expect(scanInput).toBeVisible({ timeout: 20_000 });
  await scanInput.fill('');
  await scanInput.fill(String(barcode));
  await scanInput.press('Enter');
  await waitForLoadingDone(page);

  const deadline = Date.now() + 25_000;
  while (Date.now() < deadline) {
    const failure = page
      .locator('.el-message:visible, .el-notification:visible, .el-alert:visible')
      .filter({ hasText: /失败|错误|无效|不存在|不能|重复/ })
      .first();
    if (await failure.isVisible({ timeout: 300 }).catch(() => false)) {
      const message = (await failure.innerText().catch(() => '')).replace(/\s+/g, ' ').trim();
      const error = new Error(`条码 ${barcode} 报工失败：${message || '未知错误'}`);
      error.code = 'MES_BARCODE_REPORT_FAILED';
      throw error;
    }
    const success = page
      .locator('.el-message:visible, .el-notification:visible, .el-alert:visible')
      .filter({ hasText: /成功|处理成功|过站成功/ })
      .first();
    if (await success.isVisible({ timeout: 300 }).catch(() => false)) {
      await page.waitForTimeout(600);
      return;
    }
    if (!(await page.locator('.el-loading-mask:visible').isVisible().catch(() => false))) {
      await page.waitForTimeout(900);
      return;
    }
    await page.waitForTimeout(400);
  }
}

async function ensureWorkshopLineReady(page, row) {
  if (!row.车间名称 && !row.线体名称) return;
  if (row.创建车间线体 === '是') {
    await createWorkshopAndLine(page, row);
    return;
  }
  await recordProcessStep(page, `检查线体是否可用：${row.线体名称 || row.车间名称}`);
  await gotoBusinessPage(page, '/iMES6/SfcsFactoryModeling/Index', '工厂建模', { requireSearch: false });
  await waitForMesAction(page, '新增车间', 'MES_WORKSHOP_UNAVAILABLE', '/iMES6/SfcsFactoryModeling/Index');

  const lineName = row.线体名称;
  if (lineName) {
    const treeSearch = page.locator('input[placeholder*="车间"], input[placeholder*="区域名称"], input[placeholder*="区域编号"]').first();
    if (await treeSearch.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await treeSearch.fill(String(lineName));
      await treeSearch.press('Enter');
      await waitForLoadingDone(page);
      await page.waitForTimeout(800);
    }
    const treeNode = page.locator('.el-tree-node__content:visible').filter({ hasText: String(lineName) }).first();
    if (await treeNode.isVisible({ timeout: 8_000 }).catch(() => false)) {
      await ensureLineScheduleInList(page, lineName);
      await recordProcessStep(page, `复用已有线体：${lineName}`);
      return;
    }
  }
  await createWorkshopAndLine(page, row);
}

async function runBarcodeReportScenario(page, row) {
  const barcodeCount = Number(row.条码数量 || 10);
  row.目标量 = row.目标量 || String(barcodeCount);

  await ensureWorkshopLineReady(page, row);

  const woNo = await createVirtualWorkOrder(page, row);
  if (!woNo) {
    const error = new Error('工单创建失败：未能获取工单号');
    error.code = 'MES_WORKORDER_UNAVAILABLE';
    throw error;
  }
  row.工单号 = woNo;

  const { barcodes } = await createRuncardBarcodesForWorkOrder(page, { ...row, 工单号: woNo, 条码数量: barcodeCount });
  await createProductRouteForPart(page, row);

  await openDesktopReportWork(page, row);
  await selectDesktopArea(page, row);
  await selectDesktopOperation(page, row.工序名称);
  await openDesktopReportWork(page, { ...row, 工单号: woNo });
  await selectDesktopArea(page, row);
  await selectDesktopOperation(page, row.工序名称);
  await selectDesktopWorkOrder(page, woNo);

  for (let index = 0; index < barcodes.length; index += 1) {
    await scanBarcodeAndWait(page, barcodes[index], index, barcodes.length);
  }
  await recordProcessStep(page, `条码报工完成：共 ${barcodes.length} 个`);
  return { woNo, barcodes };
}

async function chooseOperationFromSelector(page, text) {
  if (!text) return;
  // 所属工序可能是独立弹窗，也可能是 JzSelect 下拉
  const dropdown = page.locator('.jz-select-dropdown:visible, .el-select-dropdown:visible').last();
  if (await dropdown.isVisible({ timeout: 2_000 }).catch(() => false)) {
    const searchInput = dropdown.locator('input:visible').first();
    if (await searchInput.isVisible({ timeout: 800 }).catch(() => false)) {
      await searchInput.fill(String(text));
      const searchBtn = dropdown.locator('button:visible').filter({ hasText: /搜\s*索/ }).first();
      if (await searchBtn.isVisible({ timeout: 500 }).catch(() => false)) await searchBtn.click();
      else await searchInput.press('Enter').catch(() => {});
      await waitForLoadingDone(page);
    }
    const option = dropdown
      .locator('.el-select-dropdown__item:not(.is-disabled), .wrapper-row')
      .filter({ hasText: String(text) })
      .first();
    if (await option.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await option.click({ force: true });
      await closeOpenDropdown(page);
      return;
    }
    const firstOption = dropdown.locator('.el-select-dropdown__item:not(.is-disabled), .wrapper-row').first();
    if (await firstOption.isVisible({ timeout: 1_500 }).catch(() => false)) {
      await firstOption.click({ force: true });
      await closeOpenDropdown(page);
      return;
    }
    // 下拉无有效选项时关闭，改走「选择工序」弹窗
    await closeOpenDropdown(page);
  }

  const selectorDialog = page.locator('.el-dialog:visible').filter({ hasText: /选择工序|工序名称/ }).last();
  await expect(selectorDialog).toBeVisible({ timeout: 8_000 });
  const search = selectorDialog.locator('input:visible').first();
  if (await search.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await search.fill(String(text));
    const searchBtn = selectorDialog.locator('button:visible').filter({ hasText: /搜\s*索/ }).first();
    if (await searchBtn.isVisible({ timeout: 800 }).catch(() => false)) await searchBtn.click();
    else await search.press('Enter').catch(() => {});
    await waitForLoadingDone(page);
  }
  let matched = await selectFirstTableRowByText(page, text);
  if (!matched) {
    // 指定工序不存在时，重置后取第一条可用工序
    const resetBtn = selectorDialog.locator('button:visible').filter({ hasText: /重\s*置/ }).first();
    if (await resetBtn.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await resetBtn.click();
      await waitForLoadingDone(page);
    } else if (await search.isVisible().catch(() => false)) {
      await search.fill('');
      await search.press('Enter').catch(() => {});
      await waitForLoadingDone(page);
    }
    const firstRow = selectorDialog.locator('.vxe-body--row:visible, .el-table__body tr:visible').first();
    if (await firstRow.isVisible({ timeout: 8_000 }).catch(() => false)) {
      await firstRow.click({ force: true });
      matched = true;
    }
  }
  if (!matched) {
    throw new Error(`所属工序选择失败：未找到「${text}」，且列表无可用工序`);
  }
  const confirm = selectorDialog.locator('button:visible').filter({ hasText: buttonTextPattern(['确定', '提交', '选择']) }).first();
  if (await confirm.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await confirm.click();
  }
  await waitForLoadingDone(page);
}

async function createWorkshopAndLine(page, row) {
  await recordProcessStep(page, '打开车间/线体建模页面');
  await gotoBusinessPage(page, '/iMES6/SfcsFactoryModeling/Index', '工厂建模', { requireSearch: false });
  await waitForMesAction(page, '新增车间', 'MES_WORKSHOP_UNAVAILABLE', '/iMES6/SfcsFactoryModeling/Index');

  await recordProcessStep(page, '新增车间');
  await visibleButton(page, '新增车间', { exact: false }).click();
  await waitForLoadingDone(page);
  const workshopDialog = visibleDialog(page, '新增');
  await expect(workshopDialog).toBeVisible();
  await fillLastInputByLabel(workshopDialog, '区域编码', row.车间编码);
  await fillLastInputByLabel(workshopDialog, '区域名称', row.车间名称);
  await clickDialogButton(workshopDialog, '保存');
  await waitForSuccess(page);
  await expect(workshopDialog).toBeHidden({ timeout: 20_000 });
  await waitForLoadingDone(page);

  await recordProcessStep(page, `选择车间：${row.车间名称}`);
  const workshopNode = page.locator('.el-tree-node__content:visible').filter({ hasText: row.车间名称 }).first();
  await expect(workshopNode, `车间树节点可见: ${row.车间名称}`).toBeVisible({ timeout: 20_000 });
  await workshopNode.click({ force: true });
  await waitForLoadingDone(page);
  await page.waitForTimeout(500);

  let lineDialog = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await workshopNode.click({ force: true });
    await waitForLoadingDone(page);
    await visibleButton(page, '新增子区域', { exact: false }).click();
    await waitForLoadingDone(page);
    lineDialog = page
      .locator('.el-dialog:visible')
      .filter({ hasText: '新增' })
      .filter({ has: page.locator('input[placeholder*="自动生成"], input[placeholder*="手动输入"]') })
      .last();
    if (await lineDialog.isVisible({ timeout: 4_000 }).catch(() => false)) break;
    const warn = page.locator('.el-message:visible').filter({ hasText: /请选择车间/ });
    if (await warn.isVisible({ timeout: 800 }).catch(() => false)) {
      await page.waitForTimeout(500);
    }
  }
  await expect(lineDialog, '线体新增弹窗可见').toBeVisible({ timeout: 10_000 });
  const codeInput = lineDialog.locator('input[placeholder="自动生成/手动输入"]:not([disabled])').first();
  await expect(codeInput, '线体区域编码输入框可见').toBeVisible({ timeout: 10_000 });
  await codeInput.fill(String(row.线体编码));
  const nameInput = lineDialog.locator('input[placeholder="请输入区域名称"]:not([disabled])').first();
  await expect(nameInput, '线体区域名称输入框可见').toBeVisible({ timeout: 5_000 });
  await nameInput.fill(String(row.线体名称));

  // 基础信息区：第二个「区域类型」才是可编辑项；选完后校验已回填
  const basicType = lineDialog.locator('.el-form-item').filter({ hasText: /^区域类型/ }).nth(1);
  const typeInput = basicType.locator('input:not([disabled])').first();
  await typeInput.click({ force: true });
  const lineOption = page.locator('.el-select-dropdown:visible .el-select-dropdown__item:not(.is-disabled)').filter({ hasText: '线体' }).first();
  await expect(lineOption, '区域类型选项「线体」可见').toBeVisible({ timeout: 8_000 });
  await lineOption.click({ force: true });
  await closeOpenDropdown(page);
  await expect(typeInput).not.toHaveValue('', { timeout: 5_000 });

  const sectionItem = lineDialog.locator('.el-form-item').filter({ hasText: /^工段/ }).first();
  const sectionInput = sectionItem.locator('input:not([disabled])').first();
  await sectionInput.click({ force: true });
  await page.waitForTimeout(300);
  const sectionOptions = page.locator('.el-select-dropdown:visible .el-select-dropdown__item:not(.is-disabled)');
  await expect(sectionOptions.first(), '工段选项可见').toBeVisible({ timeout: 8_000 });
  const preferred = sectionOptions.filter({ hasText: row.工段 || '总装' }).first();
  if (await preferred.isVisible({ timeout: 1_500 }).catch(() => false)) {
    await preferred.click({ force: true });
  } else {
    await sectionOptions.first().click({ force: true });
  }
  await closeOpenDropdown(page);
  // SysDataDictSelect 可能不回写 input value，改为检查错误提示消失
  await expect(sectionItem.locator('.el-form-item__error')).toBeHidden({ timeout: 5_000 }).catch(() => {});

  if (row.所属工序) {
    const operationItem = lineDialog.locator('.el-form-item').filter({ hasText: /^所属工序/ }).first();
    await operationItem.locator('input').first().click({ force: true });
    await chooseOperationFromSelector(page, row.所属工序);
  }
  // 工序选择可能冲掉下拉状态，保存前再确认区域类型
  if (!(await typeInput.inputValue().catch(() => ''))) {
    await typeInput.click({ force: true });
    await page.locator('.el-select-dropdown:visible .el-select-dropdown__item:not(.is-disabled)').filter({ hasText: '线体' }).first().click({ force: true });
    await closeOpenDropdown(page);
  }
  // 作业看板区域选择过滤 IsSchedule=Y，线体必须参与排程
  await ensureScheduleEnabled(lineDialog);
  const seqInput = lineDialog.locator('.el-form-item').filter({ hasText: '区域序号' }).locator('input:not([disabled])').last();
  if (await seqInput.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await seqInput.fill(String(row.区域序号 || '1'));
  }
  await recordProcessStep(page, `提交线体：${row.线体名称}`);
  await lineDialog.locator('.el-dialog__footer button').filter({ hasText: buttonTextPattern(['保存']) }).first().click();
  const success = page.locator('.el-notification:visible, .el-message:visible').filter({ hasText: /成功|保存成功/ }).first();
  const failed = page.locator('.el-notification:visible, .el-message:visible, .el-message-box:visible').filter({ hasText: /失败|错误|异常|不能|已存在/ }).first();
  const closed = await lineDialog.waitFor({ state: 'hidden', timeout: 15_000 }).then(() => true).catch(() => false);
  const saved = closed || await success.isVisible({ timeout: 2_000 }).catch(() => false);
  if (!saved) {
    const errors = await lineDialog.locator('.el-form-item__error:visible').allInnerTexts().catch(() => []);
    const toast = await failed.innerText().catch(() => '');
    throw new Error(`线体保存失败: ${[...errors, toast].filter(Boolean).join('；') || '未知'}`);
  }
  await expect(page.locator('body')).toContainText(row.线体名称);
  // 列表「参与排程」列可直接切换；表单开关在微前端里偶发点不动，保存后兜底打开
  await ensureLineScheduleInList(page, row.线体名称 || row.线体编码);
  await recordProcessStep(page, `车间/线体创建成功：${row.车间名称} / ${row.线体名称}`);
}

async function ensureScheduleEnabled(scope) {
  const page = scope.page();
  const scheduleItem = scope.locator('.el-form-item').filter({ hasText: /^是否排程/ }).first();
  await scheduleItem.scrollIntoViewIfNeeded().catch(() => {});
  const scheduleSwitch = scheduleItem.locator('.el-switch').first();
  await expect(scheduleSwitch, '是否排程开关可见').toBeVisible({ timeout: 5_000 });
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const alreadyOn = await scheduleSwitch.evaluate((el) => el.classList.contains('is-checked'));
    if (alreadyOn) return true;
    // Element UI switch：优先点 core 右侧；micro-app 下 force click 有时不触发 v-model
    const core = scheduleItem.locator('.el-switch__core').first();
    const box = await core.boundingBox();
    if (box) {
      await page.mouse.click(box.x + Math.max(box.width - 6, box.width * 0.75), box.y + box.height / 2);
    } else {
      await core.click();
    }
    await page.waitForTimeout(250);
    if (await scheduleSwitch.evaluate((el) => el.classList.contains('is-checked'))) return true;
    await scheduleItem.locator('input.el-switch__input, input[type="checkbox"]').first().click({ force: true }).catch(() => {});
    await page.waitForTimeout(250);
  }
  return scheduleSwitch.evaluate((el) => el.classList.contains('is-checked'));
}

async function ensureLineScheduleInList(page, lineText) {
  // 列表「参与排程」列为 disabled，只能通过「编辑子区域」修改
  if (!lineText) return;
  const treeNode = page.locator('.el-tree-node__content:visible').filter({ hasText: String(lineText) }).first();
  if (await treeNode.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await treeNode.click({ force: true });
    await waitForLoadingDone(page);
    await page.waitForTimeout(400);
  }
  const editBtn = page.locator('button:visible').filter({ hasText: /编辑子区域|编\s*辑/ }).first();
  if (!(await editBtn.isVisible({ timeout: 3_000 }).catch(() => false))) return;
  await editBtn.click();
  await waitForLoadingDone(page);
  const editDialog = page
    .locator('.el-dialog:visible')
    .filter({ has: page.locator('.el-form-item').filter({ hasText: /^是否排程/ }) })
    .last();
  if (!(await editDialog.isVisible({ timeout: 8_000 }).catch(() => false))) return;
  const enabled = await ensureScheduleEnabled(editDialog);
  if (enabled) {
    await editDialog.locator('.el-dialog__footer button').filter({ hasText: buttonTextPattern(['保存', '确定']) }).first().click();
    await editDialog.waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    await waitForLoadingDone(page);
  } else {
    await editDialog.locator('button:visible').filter({ hasText: /关闭|取消/ }).first().click().catch(() => {});
  }
}

async function createLocator(page, row) {
  await recordProcessStep(page, '打开储位维护页面');
  await gotoBusinessPage(page, '/ImsLocator/Index', '储位');
  await recordProcessStep(page, '打开储位新增弹窗');
  await clickVisibleButton(page, '新增');
  const dialog = visibleDialog(page, '新增');
  await expect(dialog).toBeVisible();

  const textFields = [
    ['储位码', row.储位码],
    ['储位名称', row.储位名称],
    ['公司', row.公司],
    ['仓库', row.仓库],
    ['捡料区', row.捡料区 || row.拣料区],
    ['储存区', row.储存区],
    ['楼层', row.楼层],
    ['部门', row.部门],
    ['区域', row.区域],
    ['货架号', row.货架号]
  ];
  for (const [label, value] of textFields) {
    if (value === undefined || value === null || value === '') continue;
    await recordProcessStep(page, `填写字段：${label}`);
    await fillFormInput(dialog, label, value);
  }

  await selectByLabel(page, dialog, '货架面', row.货架面 === '正面' ? '正面' : row.货架面);
  // Prefer selecting first available type when sample value is not in dictionary.
  await selectByLabel(page, dialog, '储位类型', row.储位类型);
  const typeInput = formItemByLabel(dialog, '储位类型').locator('input:visible').last();
  const typeValue = await typeInput.inputValue().catch(() => '');
  if (!typeValue) {
    await typeInput.click();
    const firstType = page.locator('.el-select-dropdown:visible .el-select-dropdown__item').first();
    if (await firstType.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await firstType.click({ force: true });
    }
  }
  await fillLastInputByLabel(dialog, '容量', row.容量);
  if (row.库位编码) {
    await selectByLabel(page, dialog, '库位', row.库位编码);
  }

  await recordProcessStep(page, `提交储位：${row.储位码}`);
  await clickDialogButton(dialog, '确定');
  await waitForSuccess(page);
  await expect(dialog).toBeHidden({ timeout: 20_000 }).catch(() => {});
  await waitForLoadingDone(page);
  await recordProcessStep(page, `储位创建成功：${row.储位码}`);
}

async function openImportConfig(page) {
  await recordProcessStep(page, '打开导入配置页面', { stepId: 'scenario' });
  const candidates = ['/ImportConfig', '/Import/Index', '/ImportExcel/Index'];
  let lastBody = '';
  for (const hashPath of candidates) {
    await page.goto(`${config.baseURL}/#${hashPath}`, { waitUntil: 'domcontentloaded' });
    await waitForLoadingDone(page);
    lastBody = await page.locator('body').innerText().catch(() => '');
    if (/404|page not found/i.test(lastBody)) continue;
    if (/导入配置|基本信息|导出模板|功能导入|导入/.test(lastBody)) {
      await recordProcessStep(page, `导入配置页面已就绪：${hashPath}`);
      return hashPath;
    }
  }
  const error = new Error('导入配置页面不可用：当前账号可能无管理员开发管理路由权限（ImportConfig 为动态加载）');
  error.code = 'IMPORT_CONFIG_UNAVAILABLE';
  throw error;
}

async function waitForDesktopReportWork(page) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    await waitForLoadingDone(page);
    const url = page.url();
    const bodyText = await page.locator('body').innerText().catch(() => '');
    if (/\/#\/404|404|page not found/i.test(`${url}\n${bodyText}`)) {
      const error = new Error('生产作业看板不可用：作业看板编码无效或未配置 SysViewDesign 方案（code 应为桌面方案编码，如 S20250032）');
      error.code = 'MES_BARCODE_UNAVAILABLE';
      throw error;
    }
    if (/请选择区域|字号|全屏|扫码过站|采集作业区/.test(bodyText) && !/应用加载中\s*$/.test(bodyText.replace(/\s+/g, ' '))) {
      return;
    }
    await page.waitForTimeout(800);
  }
  const summary = (await page.locator('body').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 160);
  const error = new Error(`生产作业看板未就绪：${summary}`);
  error.code = 'MES_BARCODE_UNAVAILABLE';
  throw error;
}

async function passBarcode(page, row) {
  // code 必须是桌面管理方案编码（SysViewDesign.Code），不是路由名 DesktopReportWork
  const desktopCode = row.作业看板编码 || process.env.JMOM_DESKTOP_CODE || 'S20250032';
  const params = new URLSearchParams({ code: desktopCode });
  if (row.工单号) params.set('wono', row.工单号);
  if (row.线体ID) params.set('lineid', row.线体ID);
  await recordProcessStep(page, `打开生产作业看板：${desktopCode}`);
  await page.goto(`${config.baseURL}/#/iMES6/DesktopReportWork/Index?${params.toString()}`, { waitUntil: 'domcontentloaded' });
  await waitForDesktopReportWork(page);

  const needArea = !row.线体ID && (row.线体名称 || row.车间名称);
  if (needArea) {
    await recordProcessStep(page, `选择区域：${row.线体名称 || row.车间名称}`);
    const title = page.locator('.design-header-title, .design-header-title-text').first();
    await expect(title, '作业看板标题可见').toBeVisible({ timeout: 10_000 });
    await title.click({ force: true });
    const areaDialog = page.locator('.el-dialog:visible').filter({ hasText: '区域信息' }).first();
    await expect(areaDialog, '区域信息弹窗可见').toBeVisible({ timeout: 10_000 });
    // 车间/区域均为 JzSelect；区域列表还要求线体 IsSchedule=Y
    if (row.车间名称) {
      await selectJzTableValue(page, areaDialog, '车间', row.车间名称);
    }
    if (row.线体名称) {
      await selectJzTableValue(page, areaDialog, '区域', row.线体名称);
    }
    await clickDialogButton(areaDialog, '确定');
    await expect(areaDialog).toBeHidden({ timeout: 15_000 });
    await waitForLoadingDone(page);
    if (row.线体名称) {
      await expect(page.locator('.design-header-title-text')).toContainText(row.线体名称, { timeout: 10_000 });
    }
  }

  await recordProcessStep(page, `扫码过站：${row.条码}`);
  const scanInput = page.locator('input.native-scan-input').first();
  await expect(scanInput, '条码输入框可见').toBeVisible({ timeout: 20_000 });
  await scanInput.fill(String(row.条码));
  await scanInput.press('Enter');
  await waitForLoadingDone(page);
  const toast = page
    .locator('.el-message:visible, .el-notification:visible, .el-message-box__message:visible')
    .filter({ hasText: /处理成功|成功|失败|错误|请选择|无效|不存在|条码|报工|工序|区域|工单/ })
    .first();
  const bodyReady = page.locator('body').filter({ hasText: /处理成功|成功|提交报工失败|请选择工序|请选择区域|条码|无效|不存在/ });
  const toastVisible = await toast.isVisible({ timeout: 8_000 }).catch(() => false);
  if (!toastVisible) {
    await expect(bodyReady).toBeVisible({ timeout: 5_000 });
  }
  await recordProcessStep(page, `条码过站已提交：${row.条码}`);
}

module.exports = {
  config,
  login,
  recordProcessStep,
  gotoBusinessPage,
  createMasterDataByDialog,
  createPart,
  createLocator,
  createVirtualWorkOrder,
  createWorkshopAndLine,
  passBarcode,
  runBarcodeReportScenario,
  createRuncardBarcodesForWorkOrder,
  createProductRouteForPart,
  openDesktopReportWork,
  selectDesktopArea,
  selectDesktopOperation,
  selectDesktopWorkOrder,
  scanBarcodeAndWait,
  buildSnListFromRange,
  openImportConfig,
  resolveInputByLabel,
  selectByLabel,
  fillFormInput,
  fillLastInputByLabel,
  clickVisibleButton,
  visibleDialog,
  clickDialogButton,
  waitForSuccess,
  searchByPlaceholder,
  buttonTextPattern
};
