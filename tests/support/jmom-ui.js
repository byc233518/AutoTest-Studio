const { expect } = require('@playwright/test');
const { config } = require('./config');

async function waitForLoadingDone(page) {
  await page.locator('.el-loading-mask:visible').waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
}

async function login(page) {
  await page.goto(`${config.baseURL}/#/login`, { waitUntil: 'domcontentloaded' });
  await page.getByPlaceholder('用户名').fill(process.env.JMOM_USERNAME || config.username);
  await page.getByPlaceholder('密码').fill(process.env.JMOM_PASSWORD || config.password);
  await page.locator('button:visible').filter({ hasText: '登 录' }).click();
  await page.waitForURL('**/#/index', { timeout: 45_000 });
  await waitForLoadingDone(page);
  await expect(page.locator('body')).toContainText('首页');
}

async function gotoBusinessPage(page, hashPath, expectedTitle) {
  await page.goto(`${config.baseURL}/#${hashPath}`, { waitUntil: 'domcontentloaded' });
  await waitForLoadingDone(page);
  await expect(page.locator('body')).toContainText(expectedTitle);
  await page.locator('button:visible').filter({ hasText: '搜索' }).first().waitFor({ state: 'visible' });
}

function visibleButton(page, text) {
  return page.locator('button:visible').filter({ hasText: text }).first();
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

async function waitForSuccess(page) {
  const successNotice = page
    .locator('.el-notification:visible, .el-message:visible')
    .filter({ hasText: /成功|提交成功|保存成功/ })
    .first();
  await expect(successNotice).toBeVisible({ timeout: 20_000 });
}

async function createMasterDataByDialog(page, fields) {
  await clickVisibleButton(page, '新增');
  const dialog = visibleDialog(page, '新增');
  await expect(dialog).toBeVisible();

  for (const field of fields) {
    await fillFormInput(dialog, field.label, field.value);
  }

  await dialog.locator('button:visible').filter({ hasText: /确定|保存/ }).first().click();
  await waitForSuccess(page);
  await expect(dialog).toBeHidden({ timeout: 20_000 });
  await waitForLoadingDone(page);
}

async function searchByPlaceholder(page, placeholder, value) {
  const input = page.locator(`input[placeholder="${placeholder}"]:visible`).first();
  await expect(input).toBeVisible();
  await input.fill(String(value));
  await clickVisibleButton(page, '搜索');
  await expect(page.locator('body')).toContainText(String(value));
}

async function createPart(page, part) {
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
  await confirm.locator('button:visible').filter({ hasText: /确认|确定/ }).first().click();
  await expect(visibleButton(page, '新增')).toBeVisible();
  await waitForLoadingDone(page);
}

module.exports = {
  config,
  login,
  gotoBusinessPage,
  createMasterDataByDialog,
  createPart,
  searchByPlaceholder
};
