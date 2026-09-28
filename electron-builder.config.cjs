const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const projectRoot = __dirname;
const lock = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package-lock.json'), 'utf8'));
const packageEntries = Object.entries(lock.packages || {}).filter(([name]) => name.startsWith('node_modules/'));
const productionPackages = packageEntries.filter(([, value]) => !value.dev && !value.devOptional && !value.link).map(([name]) => name);
const developmentPackages = packageEntries.filter(([, value]) => value.dev || value.devOptional).map(([name]) => name);
const nodeModulesPrefix = 'node_modules/';

// Keep runnable scripts and dependencies in app-runtime so the bundled Node can load them directly.
const runtimeFiles = [
  'package.json',
  'server/**/*',
  'web-dist/**/*',
  'playwright.config.js',
  'scripts/run-tests.mjs',
  'scripts/summarize-results.mjs',
  'scripts/record-local.mjs',
  'scripts/portable-record-runner.mjs',
  'scripts/portable-execution-runner.mjs',
  'scripts/lib/**/*',
  'tests/*.spec.js',
  'tests/*.spec.ts',
  'tests/generated/repository/**/*.spec.js',
  'tests/support/**/*',
  '!tests/platform/**/*',
  '!tests/recordings/**/*',
  '!platform-data*/**/*',
  '!test-results/**/*',
  '!dist/**/*',
  '!release/**/*',
  '!**/*.log'
];
const runtimeNodeModuleFiles = [
  '**/*',
  ...developmentPackages.map(name => `!${name.slice(nodeModulesPrefix.length)}/**/*`),
  '!.bin/**/*',
  '!.cache/**/*',
  '!.vite/**/*',
  '!.package-lock.json'
];

const playwrightRoot = path.dirname(require.resolve('playwright-core/package.json'));
const browserManifest = JSON.parse(fs.readFileSync(path.join(playwrightRoot, 'browsers.json'), 'utf8'));
const configuredCache = process.env.AUTOTEST_DESKTOP_BROWSER_CACHE;
const playwrightCache = process.env.PLAYWRIGHT_BROWSERS_PATH;
const browserCaches = [
  configuredCache && path.resolve(projectRoot, configuredCache),
  playwrightCache && (playwrightCache === '0' ? path.join(playwrightRoot, '.local-browsers') : path.resolve(projectRoot, playwrightCache)),
  path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'), 'ms-playwright'),
  path.join(projectRoot, 'dist', 'AutoTest-Studio录制器', 'browsers'),
  path.join(projectRoot, 'dist', 'recorder-staging', 'AutoTest-Studio录制器', 'browsers')
].filter(Boolean);
// The desktop client runs against Chrome or Edge installed on the target machine.
// Keep only Playwright's FFmpeg build so video recording remains fully local.
const requiredPlaywrightTools = ['ffmpeg'].map(name => {
  const entry = browserManifest.browsers.find(browser => browser.name === name);
  if (!entry) throw new Error(`Playwright 浏览器清单缺少 ${name}`);
  const directory = `${name.replaceAll('-', '_')}-${entry.revision}`;
  const source = browserCaches.map(root => path.join(root, directory)).find(candidate => fs.existsSync(candidate));
  return { name, directory, source: source || path.join(browserCaches[0], directory) };
});

module.exports = {
  appId: 'com.autotest.studio.workbench',
  productName: 'AutoTest Studio',
  copyright: 'Copyright © AutoTest Studio',
  electronDist: path.join(projectRoot, 'node_modules', 'electron', 'dist'),
  directories: { output: 'release/desktop-package-ready' },
  asar: false,
  npmRebuild: false,
  files: [
    'package.json',
    'desktop/**/*',
    'server/**/*',
    'web-dist/**/*',
    '!**/*.test.*',
    '!**/*.log',
    '!node_modules/.cache/**/*',
    '!node_modules/.vite/**/*'
  ],
  extraResources: [
    { from: projectRoot, to: 'app-runtime', filter: runtimeFiles },
    { from: path.join(projectRoot, 'node_modules'), to: 'app-runtime/node_modules', filter: runtimeNodeModuleFiles },
    { from: process.execPath, to: 'app-runtime/runtime/node.exe' },
    ...requiredPlaywrightTools.map(tool => ({ from: tool.source, to: `app-runtime/browsers/${tool.directory}`, filter: ['**/*'] }))
  ],
  win: {
    target: [{ target: 'nsis', arch: ['x64'] }],
    signAndEditExecutable: false,
    executableName: 'AutoTest-Studio',
    artifactName: 'AutoTest-Studio-Setup-${version}-${arch}.${ext}'
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'AutoTest Studio',
    deleteAppDataOnUninstall: false,
    runAfterFinish: false
  },
  beforePack: async () => {
    if (process.platform !== 'win32' || process.arch !== 'x64') {
      throw new Error('此安装包需要在 Windows x64 下构建，以便打包匹配的 Node 与录像组件');
    }
    if (Number(process.versions.node.split('.')[0]) < 22) {
      throw new Error('打包需要 Node.js 22 或更高版本，以支持本地 SQLite');
    }
    if (!fs.existsSync(path.join(projectRoot, 'web-dist', 'index.html'))) {
      throw new Error('缺少 web-dist/index.html，请先执行 npm run build:web');
    }
    for (const packagePath of productionPackages) {
      if (!fs.existsSync(path.join(projectRoot, packagePath, 'package.json'))) {
        const metadata = lock.packages[packagePath];
        if (metadata.optional || metadata.os?.every(platform => platform !== 'win32')) continue;
        throw new Error(`运行依赖未安装：${packagePath}，请先执行 npm ci`);
      }
    }
    const missing = requiredPlaywrightTools.filter(tool => !fs.existsSync(tool.source));
    if (missing.length) {
      throw new Error(`缺少与当前 Playwright 匹配的录像组件：${missing.map(tool => tool.directory).join('、')}。请先执行 npx.cmd playwright install ffmpeg，或设置 AUTOTEST_DESKTOP_BROWSER_CACHE 指向已有 Playwright 缓存目录；打包过程不会自动下载组件。`);
    }
  },
  afterPack: async context => {
    const packageDestination = path.join(context.appOutDir, 'resources', 'app', 'package.json');
    if (!fs.existsSync(packageDestination)) {
      fs.mkdirSync(path.dirname(packageDestination), { recursive: true });
      const runtimePackage = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
      delete runtimePackage.scripts;
      delete runtimePackage.devDependencies;
      fs.writeFileSync(packageDestination, `${JSON.stringify(runtimePackage, null, 2)}\n`, 'utf8');
    }
  }
};
