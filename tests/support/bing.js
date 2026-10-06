const { expect } = require('@playwright/test');

function bingHomeUrl() {
  const base = String(process.env.AUTOTEST_BASE_URL || 'https://www.bing.com').replace(/\/+$/, '');
  return `${base}/`;
}

function searchBox(page) {
  return page.locator('#sb_form_q');
}

async function openBingHome(page) {
  await page.goto(bingHomeUrl());
  await expect(searchBox(page)).toBeVisible();
}

async function searchBing(page, query) {
  await openBingHome(page);
  await searchBox(page).fill(String(query || '').trim());
  await searchBox(page).press('Enter');
  await expect(page).toHaveURL(/[?&]q=/i);
  await expect(page.locator('#b_results, #b_content')).toBeVisible();
}

module.exports = { bingHomeUrl, openBingHome, searchBing, searchBox };
