import { chromium } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { login } = require('../tests/support/autotest-ui.js');

const baseURL = process.env.AUTOTEST_BASE_URL || 'http://172.16.100.11:46069';
const workshop = process.env.AUTOTEST_WORKSHOP_NAME || '自动化车间-REAL0932';
const line = process.env.AUTOTEST_LINE_NAME || '自动化线体-REAL0932';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const traffic = [];
page.on('request', (req) => {
  if (req.url().includes('/FBuild/List') && req.method() === 'POST') {
    traffic.push(req.postData());
  }
});
page.on('response', async (res) => {
  if (res.url().includes('/FBuild/List')) {
    traffic.push((await res.text().catch(() => '')).replace(/\s+/g, ' ').slice(0, 400));
  }
});

await login(page);
await page.goto(`${baseURL}/#/iMES6/DesktopReportWork/Index?code=S20250032`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);
await page.locator('.design-header-title-text').first().click({ force: true });
await page.waitForTimeout(1000);
const dialog = page.locator('.el-dialog:visible').filter({ hasText: '区域信息' }).first();

async function jz(label, value) {
  const formItem = dialog.locator('.el-form-item:visible').filter({ hasText: label }).first();
  await formItem.locator('input.el-input__inner:visible').last().click({ force: true });
  const dropdown = page.locator('.jz-select-dropdown:visible, .el-select-dropdown:visible').last();
  await dropdown.waitFor({ state: 'visible' });
  const searchInput = dropdown.locator('input:visible').first();
  if (await searchInput.isVisible().catch(() => false)) {
    await searchInput.fill(String(value));
    const btn = dropdown.locator('button:visible').filter({ hasText: /搜/ }).first();
    if (await btn.isVisible().catch(() => false)) await btn.click();
    else await searchInput.press('Enter');
    await page.waitForTimeout(1200);
  }
  const texts = await dropdown.locator('.el-select-dropdown__item, .wrapper-row').allTextContents();
  console.log(JSON.stringify({ label, value, texts: texts.slice(0, 10).map((t) => t.replace(/\s+/g, ' ').trim()) }));
  const row = dropdown.locator('.el-select-dropdown__item, .wrapper-row').filter({ hasText: String(value) }).first();
  if (await row.isVisible().catch(() => false)) {
    await row.click({ force: true });
    console.log('picked', label);
  }
  await dropdown.waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {});
}

await jz('车间', workshop);
await page.waitForTimeout(500);
await jz('区域', line);
console.log(JSON.stringify({ traffic: traffic.slice(-4) }, null, 2));
await browser.close();
