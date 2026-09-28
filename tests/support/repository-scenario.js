const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const { login, buttonTextPattern, recordProcessStep } = require('./jmom-ui');
const { config } = require('./config');

const resultSurfaceSelector = [
  '.el-table:visible',
  '.vxe-table:visible',
  '[role="table"]:visible',
  '.el-empty:visible',
  '.el-pagination:visible',
  '[class*="report"]:visible',
  '[class*="list"]:visible',
  'canvas:visible'
].join(', ');
const feedbackSelector = '.el-message:visible, .el-notification:visible, .el-message-box:visible, [role="dialog"]:visible';

async function waitForPageReady(page) {
  await page.locator('.el-loading-mask:visible, .el-loading-spinner:visible')
    .waitFor({ state: 'hidden', timeout: 20_000 })
    .catch(() => {});
  await page.waitForTimeout(800);
}

function looseTextPattern(labels) {
  const values = Array.isArray(labels) ? labels : [labels];
  const alternatives = values.filter(Boolean).map((label) => String(label)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .split('')
    .join('\\s*'));
  return new RegExp(`(?:${alternatives.join('|')})`);
}

function fieldLabelCandidates(label) {
  const aliases = {
    存放地点: ['存放区域']
  };
  return [label, ...(aliases[label] || [])];
}

function scenarioTestData(definition) {
  const fallback = definition.dataSchema?.example || {};
  const datasetPath = process.env.JMOM_DATASET_PATH || '';
  if (!datasetPath) return fallback;
  try {
    const rows = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
    return Array.isArray(rows) && rows[0] && typeof rows[0] === 'object'
      ? { ...fallback, ...rows[0] }
      : fallback;
  } catch {
    return fallback;
  }
}

function inputValueFor(inputType, value) {
  if (inputType === 'number') return /^-?\d+(?:\.\d+)?$/.test(String(value)) ? String(value) : '1';
  if (inputType === 'date') return /^\d{4}-\d{2}-\d{2}$/.test(String(value)) ? String(value) : '2026-08-01';
  if (inputType === 'datetime-local') return '2026-08-01T08:00';
  return String(value ?? '自动化查询');
}

function dataValueForInput(definition, data, placeholder, index) {
  const normalized = String(placeholder || '').replace(/请输入|请选择|搜索/g, '').replace(/\s+/g, '');
  const fields = definition.dataSchema?.fields || [];
  const matched = fields.find((field) => normalized && (
    normalized.includes(String(field.label).replace(/\s+/g, ''))
    || String(field.label).replace(/\s+/g, '').includes(normalized)
  ));
  if (matched && data[matched.key] != null) return data[matched.key];
  const values = Object.values(data).filter((value) => value != null && String(value).trim());
  return values[index % Math.max(values.length, 1)] || '自动化查询';
}

async function writableInputs(page) {
  const formInputs = page.locator('form:visible input:visible:not([disabled]):not([readonly]):not([type="hidden"]):not([type="file"]):not([type="checkbox"]):not([type="radio"]):not([type="password"])');
  if (await formInputs.count()) return formInputs;
  return page.locator('input:visible:not([disabled]):not([readonly]):not([type="hidden"]):not([type="file"]):not([type="checkbox"]):not([type="radio"]):not([type="password"])');
}

async function fillQueryInputs(page, definition, limit = 2) {
  const data = scenarioTestData(definition);
  const inputs = await writableInputs(page);
  const count = Math.min(await inputs.count(), limit);
  const filled = [];
  for (let index = 0; index < count; index += 1) {
    const input = inputs.nth(index);
    const before = await input.inputValue().catch(() => '');
    const placeholder = await input.getAttribute('placeholder');
    const type = (await input.getAttribute('type')) || 'text';
    const next = inputValueFor(type, dataValueForInput(definition, data, placeholder, index));
    await input.fill(next).catch(() => {});
    const after = await input.inputValue().catch(() => before);
    if (after !== before) filled.push({ input, before, after, placeholder: placeholder || `查询条件${index + 1}` });
  }
  return filled;
}

async function captureUiState(page) {
  return {
    url: page.url(),
    modalCount: await page.locator('.el-dialog:visible, .el-drawer:visible').count(),
    formCount: await page.locator('form:visible').count(),
    feedbackCount: await page.locator(feedbackSelector).count(),
    fileInputCount: await page.locator('input[type="file"]').count()
  };
}

function buttonsByText(page, labels, { exact = true } = {}) {
  return page.locator('button:visible').filter({
    hasText: exact ? buttonTextPattern(labels) : looseTextPattern(labels)
  });
}

async function requiredButton(page, labels, message) {
  const exactButtons = buttonsByText(page, labels);
  const exactButton = exactButtons.first();
  const button = await exactButton.isVisible({ timeout: 2_000 }).catch(() => false)
    ? exactButton
    : buttonsByText(page, labels, { exact: false }).first();
  await expect(button, message || `未找到按钮：${[].concat(labels).join('、')}`).toBeVisible({ timeout: 10_000 });
  await expect(button).toBeEnabled();
  return button;
}

async function workflowButton(page, workflow, message) {
  if (workflow.menuTriggerLabel) {
    const trigger = await requiredButton(page, workflow.menuTriggerLabel, `未找到业务菜单：${workflow.menuTriggerLabel}`);
    await trigger.click();
  }
  if (workflow.rowAction) {
    const rowButton = page.locator([
      '.el-table__body-wrapper button:visible',
      '.el-table__fixed-body-wrapper button:visible',
      '.vxe-table--body-wrapper button:visible',
      'tbody tr button:visible'
    ].join(', ')).filter({ hasText: buttonTextPattern(workflow.label) }).first();
    await expect(rowButton, message || `未找到数据行按钮：${workflow.label}`).toBeVisible({ timeout: 10_000 });
    await expect(rowButton).toBeEnabled();
    return rowButton;
  }
  return requiredButton(page, workflow.label, message);
}

async function openScenarioPage(page, definition) {
  await recordProcessStep(page, `打开${definition.displayName}`, { stepId: 'scenario' });
  await page.goto(`${config.baseURL}/#${definition.route}`, { waitUntil: 'domcontentloaded' });
  await waitForPageReady(page);

  await expect(page, `路由未停留在目标页面: ${definition.route}`).not.toHaveURL(/#\/(?:login|404)(?:[/?]|$)/i);
  const body = page.locator('body');
  await expect(body, `页面正文为空: ${definition.route}`).not.toHaveText(/^\s*$/);
  const bodyText = await body.innerText();
  expect(bodyText, `页面返回 404: ${definition.route}`).not.toMatch(/(?:^|\s)(?:404|page not found)(?:\s|$)/i);
  expect(bodyText, `页面无访问权限: ${definition.route}`).not.toMatch(/无权限|没有权限|暂无权限|access denied|forbidden/i);
  expect(bodyText.replace(/\s+/g, ' ').trim(), `页面持续停留在加载状态: ${definition.route}`)
    .not.toMatch(/^(?:应用加载中|加载中|loading)[.。…\s]*$/i);
  await expect(body, `页面未展示菜单名称: ${definition.displayName}`).toContainText(definition.displayName);

  const blockingSkeletons = await page
    .locator('.el-skeleton:visible, .el-skeleton__item:visible, [class*="skeleton"]:visible')
    .evaluateAll((elements) => elements.filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width >= 200 && rect.height >= 100;
    }).length);
  expect(blockingSkeletons, `页面持续显示骨架屏: ${definition.route}`).toBe(0);
}

async function assertInteractiveSurface(page, definition) {
  const surface = page.locator(
    'button:visible, input:visible, .el-table:visible, .vxe-table:visible, [role="table"]:visible, form:visible'
  ).first();
  await expect(surface, `${definition.displayName}没有可交互或列表内容`).toBeVisible({ timeout: 10_000 });
}

async function assertResultSurface(page, definition) {
  const surface = page.locator(resultSurfaceSelector).first();
  await expect(surface, `${definition.displayName}查询后没有列表、空状态或业务结果区域`).toBeVisible({ timeout: 10_000 });
}

async function resolveOpenedEditor(page, workflow, before) {
  const modals = page.locator('.el-dialog:visible, .el-drawer:visible');
  const modalCount = await modals.count();
  if (modalCount > before.modalCount) return { kind: 'modal', scope: modals.last() };

  const forms = page.locator('form:visible');
  const formCount = await forms.count();
  if (page.url() !== before.url) {
    return { kind: 'route', scope: formCount ? forms.last() : page.locator('body') };
  }
  if (formCount > before.formCount) return { kind: 'form', scope: forms.last() };

  await expect(modals.first(), `${workflow.label}后未出现新表单、对话框、抽屉或编辑路由`).toBeVisible({ timeout: 10_000 });
  return { kind: 'modal', scope: modals.first() };
}

async function exerciseEditorFields(page, editor, workflow, definition) {
  const fields = (workflow.fields || []).slice(0, 8);
  const data = { ...scenarioTestData(definition), ...(workflow.testData || {}) };
  let filledCount = 0;
  for (const field of fields) {
    const fieldItem = editor.scope.locator('.el-form-item:visible').filter({ hasText: looseTextPattern(fieldLabelCandidates(field.label)) });
    expect(await fieldItem.count(), `源码字段未出现在表单中: ${field.label}`).toBeGreaterThan(0);
    const inputs = fieldItem.locator('input:visible:not([disabled]):not([readonly]):not([type="hidden"]):not([type="file"]):not([type="checkbox"]):not([type="radio"])');
    if (!await inputs.count()) continue;
    const input = inputs.last();
    const type = (await input.getAttribute('type')) || 'text';
    const value = inputValueFor(type, data[field.key] ?? field.example);
    await input.fill(value).catch(() => {});
    if (await input.inputValue().catch(() => '') === value) filledCount += 1;
  }
  if (fields.length) {
    const controls = editor.scope.locator('input:visible, textarea:visible, .el-select:visible, .el-date-editor:visible');
    expect(await controls.count(), `${workflow.label}表单没有可验证字段控件`).toBeGreaterThan(0);
  }
  return filledCount;
}

async function closeEditorWithoutSaving(page, editor, before) {
  if (editor.kind === 'route') {
    await page.goto(before.url, { waitUntil: 'domcontentloaded' });
    await waitForPageReady(page);
    return;
  }

  const cancel = editor.scope.locator('button:visible').filter({ hasText: buttonTextPattern(['取消', '取 消', '关闭']) });
  if (await cancel.count()) {
    await cancel.first().click();
  } else {
    const close = editor.scope.locator('.el-dialog__headerbtn, .el-drawer__close-btn');
    await expect(close.first(), '编辑界面没有取消或关闭入口').toBeVisible();
    await close.first().click();
  }
  await expect(editor.scope, '取消后编辑界面仍然可见').toBeHidden({ timeout: 8_000 });
}

async function clickAndObserve(page, button, before, message) {
  const downloadPromise = page.waitForEvent('download', { timeout: 4_000 }).then(() => true).catch(() => false);
  const popupPromise = page.waitForEvent('popup', { timeout: 4_000 }).then(async (popup) => {
    await popup.close().catch(() => {});
    return true;
  }).catch(() => false);
  const responsePromise = page.waitForResponse((response) => response.request().resourceType() === 'xhr' || response.request().resourceType() === 'fetch', { timeout: 4_000 })
    .then(() => true)
    .catch(() => false);
  await button.click();
  await waitForPageReady(page);
  const after = await captureUiState(page);
  const immediateFeedback = after.url !== before.url
    || after.modalCount > before.modalCount
    || after.feedbackCount > before.feedbackCount;
  const externalFeedback = immediateFeedback
    ? true
    : (await Promise.race([
      Promise.any([downloadPromise, popupPromise, responsePromise]).catch(() => false),
      page.waitForTimeout(4_200).then(() => false)
    ]));
  expect(immediateFeedback || externalFeedback, message || '业务操作后没有路由、弹窗、下载、请求或消息反馈').toBeTruthy();
  return { after, feedback: immediateFeedback || externalFeedback };
}

async function runWorkflow(page, definition, workflow) {
  await recordProcessStep(page, `${definition.displayName}：${workflow.name}`);
  if (workflow.type === '页面加载') {
    await assertInteractiveSurface(page, definition);
    return;
  }

  if (workflow.type === '查询') {
    const filled = await fillQueryInputs(page, definition);
    const queryButtons = buttonsByText(page, workflow.buttonLabels || ['搜索', '查询']);
    if (workflow.trigger !== 'enter' && await queryButtons.count()) {
      await queryButtons.first().click();
    } else {
      const searchInput = page.locator('input[placeholder]:not([disabled]):not([readonly]):visible').first();
      const input = await searchInput.isVisible({ timeout: 8_000 }).catch(() => false)
        ? searchInput
        : page.locator('input:not([disabled]):not([readonly]):visible').first();
      await expect(input, '源码存在回车查询逻辑，但页面未找到可输入的查询条件').toBeVisible({ timeout: 10_000 });
      await input.press('Enter');
    }
    await waitForPageReady(page);
    await assertResultSurface(page, definition);
    if (filled.length) expect(filled.some((item) => item.after !== item.before), '查询条件没有成功填入').toBeTruthy();
    return;
  }

  if (workflow.type === '重置') {
    const filled = await fillQueryInputs(page, definition, 1);
    const resetButton = await requiredButton(page, workflow.buttonLabels || ['重置']);
    await resetButton.click();
    await waitForPageReady(page);
    if (filled.length) {
      await expect(filled[0].input, `${filled[0].placeholder}点击重置后没有恢复初始值`).toHaveValue(filled[0].before);
    } else {
      await assertInteractiveSurface(page, definition);
    }
    return;
  }

  if (workflow.type === '新增表单' || workflow.type === '编辑表单' || workflow.type === '查看详情') {
    const before = await captureUiState(page);
    const actionButton = await workflowButton(page, workflow);
    await actionButton.click();
    await waitForPageReady(page);
    const editor = await resolveOpenedEditor(page, workflow, before);
    if (workflow.type !== '查看详情') await exerciseEditorFields(page, editor, workflow, definition);
    await closeEditorWithoutSaving(page, editor, before);
    return;
  }

  if (workflow.type === '删除确认') {
    const deleteButton = await workflowButton(page, workflow, '没有可用于验证删除确认流程的数据行');
    await deleteButton.click();
    const confirmation = page.locator('.el-message-box:visible, [role="dialog"]:visible').filter({ hasText: /删除|移除|确认/ });
    await expect(confirmation.first(), '删除操作未出现确认提示').toBeVisible({ timeout: 8_000 });
    const cancelButton = confirmation.first().locator('button:visible').filter({ hasText: /取消|取\s*消|否/ });
    await expect(cancelButton.first(), '删除确认框没有取消按钮').toBeVisible();
    await cancelButton.first().click();
    await expect(confirmation.first(), '取消后删除确认框仍然可见').toBeHidden({ timeout: 5_000 });
    return;
  }

  if (workflow.type === '导入入口') {
    const before = await captureUiState(page);
    const importButton = await workflowButton(page, workflow);
    await importButton.click();
    await waitForPageReady(page);
    const fileInputs = page.locator('input[type="file"]');
    expect(await fileInputs.count(), '导入入口没有关联文件选择控件').toBeGreaterThan(0);
    const modals = page.locator('.el-dialog:visible, .el-drawer:visible');
    if (await modals.count() > before.modalCount) {
      await closeEditorWithoutSaving(page, { kind: 'modal', scope: modals.last() }, before);
    }
    return;
  }

  if (workflow.type === '导出入口') {
    const before = await captureUiState(page);
    const exportButton = await workflowButton(page, workflow);
    await clickAndObserve(page, exportButton, before, `${workflow.label}后没有下载、请求或界面反馈`);
    return;
  }

  if (workflow.type === '运行时业务按钮') {
    const runtimeButtons = page.locator('button:visible');
    let businessButtons = await runtimeButtons.evaluateAll((buttons) => buttons
      .map((button) => ({
        text: String(button.innerText || '').replace(/\s+/g, ' ').trim(),
        disabled: button.disabled || button.getAttribute('aria-disabled') === 'true'
      }))
      .filter((item) => item.text && !/^(?:搜索|查询|重置)$/.test(item.text)));
    expect(businessButtons.some((item) => !item.disabled), '动态页面没有加载可用的权限业务按钮').toBeTruthy();

    const groupLabel = businessButtons.find((item) => !item.disabled && /导入\s*\/\s*导出/.test(item.text))?.text;
    if (groupLabel) {
      const groupButton = await requiredButton(page, groupLabel);
      await groupButton.click();
      businessButtons = await runtimeButtons.evaluateAll((buttons) => buttons
        .map((button) => ({
          text: String(button.innerText || '').replace(/\s+/g, ' ').trim(),
          disabled: button.disabled || button.getAttribute('aria-disabled') === 'true'
        }))
        .filter((item) => item.text && !/^(?:搜索|查询|重置)$/.test(item.text)));
    }

    const safeAction = businessButtons.find((item) => (
      !item.disabled
      && !/导入\s*\/\s*导出/.test(item.text)
      && /导出|下载|打印|查看|详情/.test(item.text)
    ));
    if (safeAction) {
      const actionButton = await requiredButton(page, safeAction.text);
      const before = await captureUiState(page);
      await clickAndObserve(page, actionButton, before, `${safeAction.text}后没有下载、请求或界面反馈`);
    }
    return;
  }

  const actionButton = await workflowButton(page, workflow, `业务动作入口不可用：${workflow.label}`);
  if (workflow.sourceMutatesData) return;
  const before = await captureUiState(page);
  await clickAndObserve(page, actionButton, before, `${workflow.label}后没有路由、弹窗、下载、请求或消息反馈`);
}

function defineRepositoryScenario(definition) {
  test.describe(definition.name, () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
      await openScenarioPage(page, definition);
    });

    for (const workflow of definition.workflows) {
      if (workflow.mutatesData) throw new Error(`仓库自动场景禁止直接写入业务数据：${definition.name} / ${workflow.name}`);
      test(workflow.name, async ({ page }) => {
        await runWorkflow(page, definition, workflow);
      });
    }
  });
}

module.exports = {
  defineRepositoryScenario,
  runWorkflow,
  openScenarioPage,
  scenarioTestData,
  inputValueFor
};
