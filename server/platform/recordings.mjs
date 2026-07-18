import { randomBytes } from 'node:crypto';
import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { toWorkspaceScriptEntry } from './scenario-scripts.mjs';
import { analyzeRecordedScript, buildDataDrivenScript } from './recording-analysis.mjs';

function trimTrailingSlash(value = '') {
  return value.replace(/\/+$/, '');
}

export function createRecordingUploadToken() {
  return randomBytes(16).toString('hex');
}

export function buildLocalRecordCommand({ recordingId, uploadToken, startUrl, platformUrl }) {
  const platform = trimTrailingSlash(platformUrl);
  return [
    'npm run record:local --',
    `--id ${recordingId}`,
    `--token ${uploadToken}`,
    `--url ${JSON.stringify(startUrl)}`,
    `--platform ${JSON.stringify(platform)}`
  ].join(' ');
}

export function buildRecordingStub(id, environment) {
  const baseUrl = trimTrailingSlash(environment.base_url);
  return `// Auto-generated recording for ${id}
// Environment: ${environment.key} (${baseUrl})
import { test, expect } from '@playwright/test';

test('recorded flow ${id}', async ({ page }) => {
  await page.goto(process.env.JMOM_BASE_URL || '${baseUrl}/#/login');
  // TODO: replace with recorded steps
  await expect(page).toHaveURL(/.+/);
});
`;
}

export async function writeRecordingStub(outputPath, id, environment) {
  await writeFile(outputPath, buildRecordingStub(id, environment), 'utf8');
}

export function startRecordingProcess({
  workspaceRoot,
  outputPath,
  environment,
  recordMode = 'codegen'
}) {
  const baseUrl = trimTrailingSlash(environment.base_url);
  const startUrl = `${baseUrl}/#/login`;

  if (recordMode === 'stub') {
    return { pid: null, mode: 'stub', startUrl };
  }

  const cli = path.resolve(workspaceRoot, 'node_modules', 'playwright', 'cli.js');
  const child = spawn(process.execPath, [
    cli,
    'codegen',
    '--target',
    'playwright-test',
    '-o',
    outputPath,
    startUrl
  ], {
    cwd: workspaceRoot,
    env: {
      ...process.env,
      JMOM_BASE_URL: baseUrl
    },
    detached: true,
    stdio: 'ignore'
  });
  child.unref();
  return { pid: child.pid, mode: 'codegen', startUrl };
}

export function stopRecordingProcess(pid) {
  if (!pid) return;
  try {
    process.kill(pid);
  } catch {
    // Inspector may already be closed by the user.
  }
}

export function resolveRecordingScriptEntry(workspaceRoot, outputPath, dataDir) {
  if (!existsSync(outputPath)) return '';
  return toWorkspaceScriptEntry(workspaceRoot, outputPath, dataDir);
}

export function isManagedScriptEntry(entry) {
  if (typeof entry !== 'string' || !entry.trim()) return false;
  const normalized = entry.replaceAll('\\', '/');
  if (normalized.startsWith('/') || /^[A-Za-z]:\//.test(normalized)) return false;
  const parts = normalized.split('/');
  if (parts.includes('..')) return false;
  return normalized.startsWith('tests/') || normalized.startsWith('platform-data/scripts/');
}

export function analyzeRecordingScript(source) {
  return analyzeRecordedScript(source);
}

export function buildRecordingReviewScript(input) {
  return buildDataDrivenScript(input);
}
