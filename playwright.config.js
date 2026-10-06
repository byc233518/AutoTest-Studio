const { defineConfig, devices } = require('@playwright/test');
const path = require('node:path');

const resultDir = process.env.AUTOTEST_RESULT_DIR || path.join('test-results', 'latest');
const baseURL = process.env.AUTOTEST_BASE_URL || 'https://www.bing.com';
const chromiumExecutablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const browserChannel = ['chrome', 'msedge'].includes(process.env.AUTOTEST_BROWSER_CHANNEL)
  ? process.env.AUTOTEST_BROWSER_CHANNEL
  : '';
const scenarioScript = process.env.AUTOTEST_SCENARIO_SCRIPT
  ? path.resolve(process.env.AUTOTEST_SCENARIO_SCRIPT)
  : null;

module.exports = defineConfig({
  testDir: scenarioScript ? path.dirname(scenarioScript) : './tests',
  ...(scenarioScript ? { testMatch: path.basename(scenarioScript) } : {}),
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
    viewport: { width: 1920, height: 1080 }
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(browserChannel || chromiumExecutablePath ? {
          launchOptions: chromiumExecutablePath
            ? { executablePath: chromiumExecutablePath }
            : { channel: browserChannel }
        } : {})
      }
    }
  ]
});
