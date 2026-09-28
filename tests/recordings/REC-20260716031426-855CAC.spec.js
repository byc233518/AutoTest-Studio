const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://172.16.100.11:46069/#/login');
  await page.getByRole('textbox', { name: '用户名' }).click();
  await page.getByRole('textbox', { name: '用户名' }).fill('byc');
  await page.getByRole('textbox', { name: '用户名' }).press('Tab');
  await page.getByRole('textbox', { name: '密码' }).click();
  await page.getByRole('textbox', { name: '密码' }).fill('Abcd1234');
  await page.getByRole('button', { name: '登 录' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('div').filter({ hasText: /^System Initializing\.\.\.$/ }).first().click();
  const page1 = await page1Promise;
  await page1.goto('http://172.16.100.11:46069/#/iMES6/DesktopReportWork/Index?code=S20250032');
  await page1.getByText('—— 请选择区域 ——').click();
  await page1.getByRole('textbox', { name: '请选择车间' }).click();
  await page1.getByText('3', { exact: true }).click();
  await page1.getByText('组装车间').click();
  await page1.getByRole('textbox', { name: '请选择区域名称' }).click();
  await page1.getByText('D502 装配5楼502 线体 组装车间').click();
  await page1.getByText('条码采集-工作单元').click();
  await page1.getByRole('button', { name: '确定' }).click();
  await page1.getByRole('button', { name: '选择' }).click();
  await page1.getByRole('tab', { name: '超期生产信息' }).click();
  await page1.getByText('DGW2506306TJ0LXM9TX').click();
  await page1.getByText('DGW2506306TJ0LXM9TX').click();
  await page1.getByRole('button', { name: '确定' }).click();
  await page1.locator('.native-scan-input').click();
  await page1.locator('.native-scan-input').fill('XLH269101');
  await page1.locator('.native-scan-input').press('Enter');
  await page1.locator('.native-scan-input').click();
  await page1.locator('.native-scan-input').fill('DGW2506306TJ0LXM9TX');
  await page1.locator('.native-scan-input').press('Enter');

  // ---------------------
  await context.close();
  await browser.close();
})();