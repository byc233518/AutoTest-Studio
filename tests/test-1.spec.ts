import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://172.16.100.11:46069/#/login');
  await page.getByRole('textbox', { name: '用户名' }).click();
  await page.getByRole('textbox', { name: '用户名' }).click();
  await page.getByRole('textbox', { name: '用户名' }).fill('byc');
  await page.getByRole('textbox', { name: '密码' }).click();
  await page.getByRole('textbox', { name: '密码' }).fill('Abcd1234');
  await page.getByRole('button', { name: '登 录' }).click();
  await page.locator('i').nth(4).click();
  await expect(page.locator('div:nth-child(2) > .box-card > .content')).toBeVisible();
});