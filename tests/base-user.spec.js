const { test, expect } = require('@playwright/test');
const {
  login,
  gotoBusinessPage,
  clickVisibleButton,
  visibleDialog,
  fillFormInput,
  waitForSuccess
} = require('./support/autotest-ui');
const { rowsFor, shouldRun, testRowTitle } = require('./support/dataset');

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await login(page);
});

const userRows = rowsFor('base-user-create', (runTag) => ({
  用户账号: `AT-USER-${runTag}`,
  用户昵称: `自动化用户-${runTag}`
}));

async function selectFirstAvailable(page, dialog, label) {
  const field = dialog.locator('.el-form-item:visible').filter({ hasText: label }).first();
  const trigger = field.locator('input:visible').last();
  await expect(trigger, `字段可用: ${label}`).toBeVisible();
  await trigger.click({ force: true });

  const option = page
    .locator('.el-select-dropdown:visible .el-select-dropdown__item:not(.is-disabled)')
    .last();
  if (!await option.isVisible({ timeout: 5_000 }).catch(() => false)) {
    await dialog.locator('.el-dialog__header').click({ force: true });
    return false;
  }
  await option.click({ force: true });
  // 多选角色下拉在选中后仍保持展开，先显式收起再继续选择下一个字段。
  await dialog.locator('.el-dialog__header').click({ force: true });
  return true;
}

async function selectFirstOrganization(page, dialog) {
  const field = dialog.locator('.el-form-item:visible').filter({ hasText: '请选择组织架构' }).first();
  const trigger = field.locator('input:visible').last();
  await expect(trigger, '组织架构选择器可用').toBeVisible();
  await trigger.click({ force: true });

  const option = page
    .locator('.el-cascader-panel:visible .el-cascader-node:not(.is-disabled)')
    .last();
  if (!await option.isVisible({ timeout: 5_000 }).catch(() => false)) {
    await dialog.locator('.el-dialog__header').click({ force: true });
    return false;
  }
  await option.click({ force: true });
  // 不能用 Escape 关闭级联面板：Element UI 会把按键冒泡给弹窗并直接关闭新增表单。
  await dialog.locator('.el-dialog__header').click({ force: true });
  return true;
}

if (shouldRun('base-user-create')) {
  for (const row of userRows) {
    test(testRowTitle('基座 - 用户管理新增', row.用户账号, row), async ({ page }) => {
      await gotoBusinessPage(page, '/Manager/Index', '用户管理');
      await clickVisibleButton(page, '新增');

      const dialog = visibleDialog(page, '新增用户');
      await expect(dialog).toBeVisible({ timeout: 15_000 });
      await fillFormInput(dialog, '用户账号', row.用户账号);
      await fillFormInput(dialog, '用户昵称', row.用户昵称);
      if (!await selectFirstAvailable(page, dialog, '所属角色')) {
        test.skip(true, '当前环境未配置可用角色，无法新增用户');
      }
      if (!await selectFirstAvailable(page, dialog, '用户类型')) {
        test.skip(true, '当前环境未配置 USER_TYPE 数据字典，无法新增用户');
      }
      if (!await selectFirstOrganization(page, dialog)) {
        test.skip(true, '当前环境未配置可用组织架构，无法新增用户');
      }

      await dialog.locator('button:visible').filter({ hasText: /^\s*确\s*定\s*$/ }).first().click();
      await waitForSuccess(page);
      await expect(dialog).toBeHidden({ timeout: 20_000 });
      await expect(page.locator('.el-table__body-wrapper:visible')).toContainText(row.用户账号, { timeout: 20_000 });
    });
  }
}
