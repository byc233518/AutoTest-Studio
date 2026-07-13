const { defineConfig, devices } = require('@playwright/test');
const path = require('node:path');

const resultDir = process.env.JMOM_RESULT_DIR || path.join('test-results', 'latest');
const baseURL = process.env.JMOM_BASE_URL || 'http://172.16.100.11:46069';
const chromiumExecutablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90_000,
  expect: {
    timeout: 20_000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  outputDir: path.join(resultDir, 'artifacts'),
  reporter: [
    ['list'],
    ['json', { outputFile: path.join(resultDir, 'results.json') }],
    ['html', { outputFolder: path.join(resultDir, 'html'), open: 'never' }]
  ],
  use: {
    baseURL,
    actionTimeout: 20_000,
    navigationTimeout: 45_000,
    screenshot: 'on',
    trace: 'retain-on-failure',
    video: 'on',
    viewport: { width: 1440, height: 900 }
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(chromiumExecutablePath ? {
          launchOptions: { executablePath: chromiumExecutablePath }
        } : {})
      }
    }
  ]
});
