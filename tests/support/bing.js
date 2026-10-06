const { expect } = require('@playwright/test');
const { recordProcessStep } = require('./autotest-ui');

function bingHomeUrl() {
  const base = String(process.env.AUTOTEST_BASE_URL || 'https://www.bing.com').replace(/\/+$/, '');
  return `${base}/`;
}

function searchBox(page) {
  return page.locator('#sb_form_q, textarea[name="q"], input[name="q"]').first();
}

function searchedUrl(url) {
  return /(?:[?&]q=|\/search)/i.test(String(url || ''));
}

async function dismissBingOverlays(page) {
  const candidates = [
    '#bnp_btn_accept',
    '#bnp_close_link',
    'button:has-text("Accept")',
    'button:has-text("Agree")',
    'button:has-text("接受")',
    'button:has-text("同意")'
  ];
  for (const selector of candidates) {
    const button = page.locator(selector).first();
    if (await button.isVisible().catch(() => false)) {
      await button.click({ timeout: 2000 }).catch(() => {});
    }
  }
}

async function openBingHome(page) {
  await recordProcessStep(page, '打开测试页面', { stepId: 'browser' });
  await page.goto(bingHomeUrl(), { waitUntil: 'domcontentloaded' });
  await dismissBingOverlays(page);
  await expect(searchBox(page)).toBeVisible();
}

async function submitBingQuery(page, query) {
  const box = searchBox(page);
  await box.click();
  await box.fill(String(query || '').trim());
  await box.press('Enter');
  if (!searchedUrl(page.url())) {
    const submit = page.locator('#sb_form_go, #search_icon, label[for="sb_form_go"], button[aria-label="搜索"], button[aria-label="Search"]').first();
    if (await submit.count()) {
      await submit.click({ timeout: 3000 }).catch(() => {});
    }
  }
  if (!searchedUrl(page.url())) {
    await page.locator('#sb_form').evaluate((form) => form.requestSubmit ? form.requestSubmit() : form.submit()).catch(() => {});
  }
}

async function searchBing(page, query) {
  await openBingHome(page);
  await recordProcessStep(page, `提交搜索：${query}`, { stepId: 'scenario' });
  await submitBingQuery(page, query);
  await expect(page).toHaveURL(/(?:[?&]q=|\/search)/i);
  await expect(page.locator('#b_results, #b_content, main').first()).toBeVisible();
}

module.exports = { bingHomeUrl, openBingHome, searchBing, searchBox, searchedUrl };
