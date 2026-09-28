import { chromium } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { login } = require('../tests/support/jmom-ui.js');
const baseURL = process.env.JMOM_BASE_URL || 'http://172.16.100.11:46069';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await login(page);
await page.goto(`${baseURL}/#/iMES6/SfcsFactoryModeling/Index`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);

const node = page.locator('.el-tree-node__content:visible').filter({ hasText: '自动化车间-REAL0915' }).first();
console.log('nodeCount', await node.count());
await node.click();
await page.waitForTimeout(800);

const btn = page.locator('button:visible').filter({ hasText: /新增子区域/ }).first();
console.log('btnText', await btn.innerText().catch(() => ''));
await btn.click();
await page.waitForTimeout(1500);

const dialogs = await page.locator('.el-dialog:visible').evaluateAll((els) => els.map((el) => ({
  title: el.querySelector('.el-dialog__title')?.textContent || '',
  text: el.innerText.replace(/\s+/g, ' ').slice(0, 240),
  placeholders: [...el.querySelectorAll('input')].map((input) => input.getAttribute('placeholder')).filter(Boolean)
})));
console.log(JSON.stringify({ dialogs }, null, 2));

const msgs = await page.locator('.el-message:visible').allInnerTexts().catch(() => []);
console.log('msgs', msgs);
await page.screenshot({ path: 'test-results/mes-line-debug.png' });
await browser.close();
