import path from 'node:path';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createRecordingCode, verifyRecordingCode } from './recording-codes.mjs';
import { createRecordingUploadToken } from './recordings.mjs';
import { readScenarioScript } from './scenario-scripts.mjs';
import { environmentVariablesObject } from './environment-context.mjs';

const META_FILE = 'local-execution.json';

function metaPath(reportDir) {
  return path.resolve(reportDir, META_FILE);
}

export async function createLocalExecutionTicket({ reportDir, runId, createdBy, ttlMs = 30 * 60 * 1000 }) {
  const recordCode = createRecordingCode({ ttlMs });
  const now = new Date();
  const meta = {
    runId,
    status: 'waiting',
    recordCodeHash: recordCode.hash,
    recordCodeExpires: recordCode.expiresAt,
    recordCodeUsedAt: null,
    token: createRecordingUploadToken(),
    tokenExpires: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(),
    createdBy,
    createdAt: now.toISOString()
  };
  await mkdir(reportDir, { recursive: true });
  await writeFile(metaPath(reportDir), `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
  return { code: recordCode.code, expiresAt: recordCode.expiresAt, meta };
}

export async function readLocalExecutionMeta(reportDir) {
  if (!existsSync(metaPath(reportDir))) return null;
  return JSON.parse(await readFile(metaPath(reportDir), 'utf8'));
}

export async function writeLocalExecutionMeta(reportDir, meta) {
  await writeFile(metaPath(reportDir), `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
}

export async function resolveLocalExecutionTicket({ reportsDir, code }) {
  const entries = (await readdir(reportsDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .reverse();
  for (const runId of entries) {
    const reportDir = path.resolve(reportsDir, runId);
    const meta = await readLocalExecutionMeta(reportDir);
    if (!meta || !verifyRecordingCode(meta, code).ok) continue;
    return { reportDir, meta };
  }
  return null;
}

export function hasValidLocalExecutionToken(meta, token, now = new Date()) {
  return Boolean(
    meta?.token
    && token
    && token === meta.token
    && meta.tokenExpires
    && new Date(meta.tokenExpires).getTime() >= now.getTime()
  );
}

function normalizeBundlePath(value) {
  const normalized = String(value || '').replaceAll('\\', '/').replace(/^\/+/, '');
  if (!normalized || normalized.split('/').includes('..')) throw new Error('执行脚本路径无效');
  return normalized;
}

async function collectSupportFiles(workspaceRoot) {
  const supportDir = path.resolve(workspaceRoot, 'tests', 'support');
  if (!existsSync(supportDir)) return [];
  const files = [];
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const target = path.resolve(directory, entry.name);
      if (entry.isDirectory()) await visit(target);
      else if (/\.(?:c?js|mjs|json)$/i.test(entry.name)) {
        files.push({
          path: path.relative(workspaceRoot, target).replaceAll('\\', '/'),
          content: await readFile(target, 'utf8')
        });
      }
    }
  }
  await visit(supportDir);
  return files;
}

export async function buildLocalExecutionBundle({ workspaceRoot, dataDir, scenario, dataset, environment }) {
  const script = await readScenarioScript({
    workspaceRoot,
    dataDir,
    scriptEntry: scenario.script_entry
  });
  if (!script) throw new Error('场景执行脚本不存在');
  const scriptEntry = normalizeBundlePath(scenario.script_entry);
  const supportFiles = await collectSupportFiles(workspaceRoot);
  const rows = JSON.parse(await readFile(dataset.rows_path, 'utf8'));
  return {
    runId: null,
    scenarioKey: scenario.key,
    scenarioName: scenario.name,
    datasetName: dataset.name,
    scriptEntry,
    executionMode: 'headed',
    environment: {
      key: environment.key,
      baseUrl: environment.base_url,
      username: environment.username,
      password: environment.password,
      variables: environmentVariablesObject(environment)
    },
    rows,
    files: [
      ...supportFiles.filter((file) => file.path !== scriptEntry),
      { path: scriptEntry, content: script.content }
    ]
  };
}

export function resolveLocalArtifactPath(reportDir, relativePath) {
  const normalized = String(relativePath || '').replaceAll('\\', '/').replace(/^\/+/, '');
  if (!normalized || normalized.split('/').includes('..')) return null;
  const target = path.resolve(reportDir, ...normalized.split('/'));
  const relative = path.relative(reportDir, target);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) return null;
  return target;
}
