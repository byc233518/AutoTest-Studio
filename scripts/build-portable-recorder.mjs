import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import {
  copyFile,
  cp,
  mkdir,
  readFile,
  rm,
  stat,
  writeFile
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, '..');

export function readLockedPlaywrightVersion(lock) {
  const version = lock?.packages?.['node_modules/playwright']?.version;
  if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error('package-lock.json 中未找到固定的 Playwright 版本');
  }
  return version;
}

export function portableLayout(outputRoot) {
  const root = path.resolve(outputRoot);
  const appDir = path.resolve(root, 'app');
  return {
    root,
    executable: path.resolve(root, 'JMOM录制器.exe'),
    nodeExecutable: path.resolve(root, 'runtime', 'node.exe'),
    appDir,
    runner: path.resolve(appDir, 'portable-record-runner.mjs'),
    library: path.resolve(appDir, 'lib', 'local-recording.mjs'),
    executionRunner: path.resolve(appDir, 'portable-execution-runner.mjs'),
    executionLibrary: path.resolve(appDir, 'lib', 'local-execution.mjs'),
    playwrightCli: path.resolve(appDir, 'node_modules', 'playwright', 'cli.js'),
    browsersDir: path.resolve(root, 'browsers'),
    dataDir: path.resolve(root, 'data'),
    recordingsDir: path.resolve(root, 'data', 'recordings'),
    pendingDir: path.resolve(root, 'data', 'pending'),
    logsDir: path.resolve(root, 'data', 'logs'),
    configFile: path.resolve(root, 'data', 'config.json'),
    versionFile: path.resolve(root, 'VERSION')
  };
}

function executable(name) {
  return process.platform === 'win32' ? name + '.exe' : name;
}

export function resolveNpmInvocation({
  execPath = process.execPath,
  npmExecPath = process.env.npm_execpath
} = {}) {
  const cliPath = npmExecPath || path.resolve(
    path.dirname(execPath),
    'node_modules',
    'npm',
    'bin',
    'npm-cli.js'
  );
  return { command: execPath, argsPrefix: [cliPath] };
}

async function run(command, args, options = {}) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: workspaceRoot,
      stdio: 'inherit',
      ...options
    });
    child.once('error', reject);
    child.once('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(command + ' 退出码: ' + code));
    });
  });
}

async function runCapture(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: workspaceRoot,
      ...options,
      stdio: ['ignore', 'pipe', 'pipe']
    });
    const stdout = [];
    const stderr = [];
    child.stdout.on('data', (chunk) => stdout.push(chunk));
    child.stderr.on('data', (chunk) => stderr.push(chunk));
    child.once('error', reject);
    child.once('close', (code) => {
      const output = Buffer.concat([...stdout, ...stderr]).toString('utf8');
      if (code === 0) resolve(output);
      else reject(new Error(command + ' 退出码: ' + code + '\n' + output));
    });
  });
}

export function parseInstallLocations(output) {
  return Array.from(
    String(output).matchAll(/^\s*Install location:\s+(.+?)\s*$/gm),
    (match) => match[1].trim()
  );
}

async function pathExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function copyCachedBrowsers({ nodeExecutable, playwrightCli, browsersDir, cwd }) {
  const env = { ...process.env };
  delete env.PLAYWRIGHT_BROWSERS_PATH;
  const dryRun = await runCapture(nodeExecutable, [
    playwrightCli,
    'install',
    '--dry-run',
    'chromium'
  ], { cwd, env });
  const locations = parseInstallLocations(dryRun);
  if (!locations.length) return false;
  for (const location of locations) {
    if (!await pathExists(location)) return false;
  }
  await mkdir(browsersDir, { recursive: true });
  for (const location of locations) {
    await cp(location, path.resolve(browsersDir, path.basename(location)), { recursive: true });
  }
  return true;
}

async function sha256(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    const stream = createReadStream(filePath);
    stream.on('error', reject);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

function psQuote(value) {
  return "'" + String(value).replaceAll("'", "''") + "'";
}

export async function buildPortableRecorder({
  root = workspaceRoot,
  distDir = path.resolve(root, 'dist')
} = {}) {
  const lock = JSON.parse(await readFile(path.resolve(root, 'package-lock.json'), 'utf8'));
  const playwrightVersion = readLockedPlaywrightVersion(lock);
  const stagingParent = path.resolve(distDir, 'recorder-staging');
  const layout = portableLayout(path.resolve(stagingParent, 'JMOM录制器'));
  const publishDir = path.resolve(distDir, 'recorder-publish');
  const zipPath = path.resolve(distDir, 'JMOM本地录制器-win-x64.zip');
  const hashPath = zipPath + '.sha256';

  await rm(stagingParent, { recursive: true, force: true });
  await rm(publishDir, { recursive: true, force: true });
  await rm(zipPath, { force: true });
  await rm(hashPath, { force: true });
  await mkdir(layout.root, { recursive: true });

  await run('dotnet', [
    'publish',
    path.resolve(root, 'recorder', 'src', 'JmomRecorder.App', 'JmomRecorder.App.csproj'),
    '-c', 'Release',
    '-r', 'win-x64',
    '--self-contained', 'true',
    '-p:PublishSingleFile=true',
    '-o', publishDir
  ], { cwd: root });
  await copyFile(path.resolve(publishDir, 'JMOM录制器.exe'), layout.executable);

  await mkdir(path.dirname(layout.nodeExecutable), { recursive: true });
  await copyFile(process.execPath, layout.nodeExecutable);

  await mkdir(path.dirname(layout.library), { recursive: true });
  await copyFile(path.resolve(root, 'scripts', 'portable-record-runner.mjs'), layout.runner);
  await copyFile(path.resolve(root, 'scripts', 'lib', 'local-recording.mjs'), layout.library);
  await copyFile(path.resolve(root, 'scripts', 'portable-execution-runner.mjs'), layout.executionRunner);
  await copyFile(path.resolve(root, 'scripts', 'lib', 'local-execution.mjs'), layout.executionLibrary);
  await writeFile(path.resolve(layout.appDir, 'package.json'), JSON.stringify({
    private: true,
    type: 'module',
    dependencies: { playwright: playwrightVersion, '@playwright/test': playwrightVersion }
  }, null, 2) + '\n', 'utf8');

  const npm = resolveNpmInvocation();
  await run(npm.command, [...npm.argsPrefix,
    'install',
    '--prefix', layout.appDir,
    '--omit=dev',
    '--no-package-lock',
    '--ignore-scripts',
    '--no-audit',
    '--no-fund'
  ], { cwd: root });

  await mkdir(layout.browsersDir, { recursive: true });
  const reusedBrowserCache = await copyCachedBrowsers({
    nodeExecutable: layout.nodeExecutable,
    playwrightCli: layout.playwrightCli,
    browsersDir: layout.browsersDir,
    cwd: layout.root
  });
  if (!reusedBrowserCache) {
    await run(layout.nodeExecutable, [
      layout.playwrightCli,
      'install',
      'chromium'
    ], {
      cwd: layout.root,
      env: {
        ...process.env,
        PLAYWRIGHT_BROWSERS_PATH: layout.browsersDir
      }
    });
  } else {
    console.log('已复用本机 Playwright 浏览器缓存');
  }

  await Promise.all([
    mkdir(layout.recordingsDir, { recursive: true }),
    mkdir(layout.pendingDir, { recursive: true }),
    mkdir(layout.logsDir, { recursive: true })
  ]);
  await writeFile(layout.configFile, JSON.stringify({ PlatformUrl: 'http://localhost:3050' }, null, 2) + '\n', 'utf8');
  await writeFile(layout.versionFile, JSON.stringify({
    recorderVersion: '0.1.0',
    nodeVersion: process.version,
    playwrightVersion,
    builtAt: new Date().toISOString()
  }, null, 2) + '\n', 'utf8');

  if (process.platform === 'win32') {
    const command = 'Compress-Archive -LiteralPath '
      + psQuote(layout.root)
      + ' -DestinationPath '
      + psQuote(zipPath)
      + ' -CompressionLevel Optimal -Force';
    await run(executable('powershell'), ['-NoProfile', '-Command', command], { cwd: root });
  } else {
    throw new Error('绿色录制器当前只支持在 Windows 构建');
  }

  const digest = await sha256(zipPath);
  await writeFile(hashPath, digest + '  ' + path.basename(zipPath) + '\n', 'utf8');
  const archive = await stat(zipPath);
  return {
    zipPath,
    hashPath,
    size: archive.size,
    playwrightVersion,
    layout
  };
}

const entryUrl = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : '';
if (import.meta.url === entryUrl) {
  buildPortableRecorder()
    .then((result) => {
      console.log('绿色录制器已生成: ' + result.zipPath);
      console.log('文件大小: ' + result.size + ' bytes');
      console.log('SHA-256: ' + result.hashPath);
    })
    .catch((error) => {
      console.error(error.message || error);
      process.exitCode = 1;
    });
}
