import { chromium } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { login } = require('../tests/support/jmom-ui.js');
const baseURL = process.env.JMOM_BASE_URL || 'http://172.16.100.11:46069';

async function probe(page, hashPath, buttonText) {
  await page.goto(`${baseURL}/#${hashPath}`, { waitUntil: 'domcontentloaded' });
  for (let i = 0; i < 15; i += 1) {
    await page.waitForTimeout(1000);
    await page.locator('.el-loading-mask:visible').waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
    const pattern = new RegExp(buttonText.split('').join('\\s*'));
    const hasBtn = await page.locator('button:visible').filter({ hasText: pattern }).count();
    const micro = await page.locator('micro-app').count();
    const body = (await page.locator('body').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 140);
    console.log(JSON.stringify({ hashPath, i, hasBtn, micro, body }));
    if (hasBtn > 0) return true;
    if (i === 6) await page.reload({ waitUntil: 'domcontentloaded' }).catch(() => {});
  }
  return false;
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await login(page);
const ws = await probe(page, '/iMES6/SfcsFactoryModeling/Index', '新增车间');
const wo = await probe(page, '/iMES6/ProductConfiguration/Wo/Index', '虚拟工单');
console.log(JSON.stringify({ workshopReady: ws, workorderReady: wo }));
await page.screenshot({ path: 'test-results/mes-debug-final.png', fullPage: false });
await browser.close();
process.exit(ws && wo ? 0 : 2);
