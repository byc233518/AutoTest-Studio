import { test, expect } from '@playwright/test';

// Example scratch recording — use env vars; do not hardcode credentials.
test('open sample site', async ({ page }) => {
  await page.goto(process.env.AUTOTEST_BASE_URL || 'https://www.bing.com');
  await expect(page).toHaveTitle(/.+/);
});
