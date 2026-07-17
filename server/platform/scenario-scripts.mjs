import { randomBytes } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const ALLOWED_SCRIPT_PATTERN = /\.(spec\.)?[cm]?js$/i;

export function isAllowedScriptFile(fileName = '') {
  return ALLOWED_SCRIPT_PATTERN.test(fileName);
}

export function sanitizeScriptFileName(fileName = '') {
  const base = path.basename(fileName).replace(/[^\w.-]+/g, '-');
  if (!base) return 'scenario.spec.js';
  return isAllowedScriptFile(base) ? base : `${base}.spec.js`;
}

function findBalancedObjectLiteral(source, startIndex) {
  const openIndex = source.indexOf('{', startIndex);
  if (openIndex < 0) return '';
  let depth = 0;
  let quote = '';
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (lineComment) {
      if (char === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === '*' && next === '/') {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = '';
      }
      continue;
    }
    if (char === '/' && next === '/') {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(openIndex, index + 1);
    }
  }
  return '';
}

function normalizeDataSchema(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const columns = Array.isArray(value.columns)
    ? value.columns.map((item) => String(item).trim()).filter(Boolean)
    : [];
  if (!columns.length) return null;
  const uniqueColumns = [...new Set(columns)];
  const columnSet = new Set(uniqueColumns);
  const required = Array.isArray(value.required)
    ? [...new Set(value.required.map((item) => String(item).trim()).filter((item) => columnSet.has(item)))]
    : [];
  const example = value.example && typeof value.example === 'object' && !Array.isArray(value.example)
    ? Object.fromEntries(uniqueColumns.map((column) => [column, String(value.example[column] ?? '')]))
    : Object.fromEntries(uniqueColumns.map((column) => [column, '']));
  return { columns: uniqueColumns, required, example };
}

export function extractScriptDataSchema(source = '') {
  const marker = source.match(/\/\*\s*@jmom-data-schema\s*([\s\S]*?)\*\//);
  if (marker) {
    try {
      return normalizeDataSchema(JSON.parse(marker[1].trim()));
    } catch {
      return null;
    }
  }
  const declaration = /\b(?:export\s+const|const|let|var)\s+testDataSchema\s*=/g.exec(source);
  if (!declaration) return null;
  const literal = findBalancedObjectLiteral(source, declaration.index + declaration[0].length);
  if (!literal) return null;
  if (/[`()]/.test(literal) || /\b(?:function|new|require|import|process|global|constructor|__proto__)\b/.test(literal)) {
    return null;
  }
  try {
    return normalizeDataSchema(vm.runInNewContext(`(${literal})`, Object.create(null), { timeout: 50 }));
  } catch {
    return null;
  }
}

export function toWorkspaceScriptEntry(workspaceRoot, absolutePath, dataDir) {
  const normalizedAbs = path.resolve(absolutePath);
  const normalizedRoot = path.resolve(workspaceRoot);
  const relative = path.relative(normalizedRoot, normalizedAbs).replaceAll('\\', '/');
  const isWorkspaceRelative = relative && !relative.startsWith('..') && !path.isAbsolute(relative);
  if (isWorkspaceRelative) return relative;
  if (dataDir) {
    const fromDataDir = path.relative(path.resolve(dataDir), normalizedAbs).replaceAll('\\', '/');
    const isDataRelative = fromDataDir && !fromDataDir.startsWith('..') && !path.isAbsolute(fromDataDir);
    if (isDataRelative) {
      return path.posix.join('platform-data', fromDataDir);
    }
  }
  return relative.replaceAll('\\', '/');
}

function isWithin(root, candidate) {
  const relative = path.relative(path.resolve(root), path.resolve(candidate));
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function versionsDir(scriptsDir, scenarioKey) {
  return path.resolve(scriptsDir, '_versions', scenarioKey);
}

function versionIdFromDate(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, '-');
}

function safeVersionId(versionId = '') {
  const base = path.basename(String(versionId));
  return /^[\w.-]+$/.test(base) ? base : '';
}

async function pruneVersions(directory, keep = 10) {
  const entries = (await readdir(directory, { withFileTypes: true }).catch(() => []))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => entry.name)
    .sort()
    .reverse();
  for (const name of entries.slice(keep)) {
    await rm(path.resolve(directory, name), { force: true });
  }
}

export function resolveScenarioScriptPath({ workspaceRoot, dataDir, scriptEntry }) {
  if (!scriptEntry || !isAllowedScriptFile(scriptEntry)) return null;
  const normalizedEntry = String(scriptEntry).replaceAll('\\', '/');
  const dataPrefix = 'platform-data/';
  const isDataEntry = normalizedEntry.startsWith(dataPrefix);
  const candidate = isDataEntry
    ? path.resolve(dataDir, normalizedEntry.slice(dataPrefix.length))
    : path.resolve(workspaceRoot, normalizedEntry);
  if (isDataEntry ? !isWithin(dataDir, candidate) : !isWithin(workspaceRoot, candidate)) return null;
  return candidate;
}

export async function readScenarioScript(options) {
  const storedPath = resolveScenarioScriptPath(options);
  if (!storedPath) return null;
  return {
    storedPath,
    fileName: path.basename(storedPath),
    content: await readFile(storedPath, 'utf8')
  };
}

export async function archiveScenarioScriptVersion({
  workspaceRoot,
  scriptsDir,
  dataDir,
  scenarioKey,
  scriptEntry,
  actor = '',
  reason = 'save'
}) {
  const current = await readScenarioScript({ workspaceRoot, dataDir, scriptEntry }).catch(() => null);
  if (!current) return null;
  const directory = versionsDir(scriptsDir, scenarioKey);
  await mkdir(directory, { recursive: true });
  const createdAt = new Date();
  const id = `${versionIdFromDate(createdAt)}-${randomBytes(3).toString('hex')}-${sanitizeScriptFileName(current.fileName)}.json`;
  const payload = {
    id,
    scenarioKey,
    scriptEntry,
    fileName: current.fileName,
    content: current.content,
    actor,
    reason,
    createdAt: createdAt.toISOString()
  };
  await writeFile(path.resolve(directory, id), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  await pruneVersions(directory, 10);
  return payload;
}

export async function listScenarioScriptVersions({ scriptsDir, scenarioKey }) {
  const directory = versionsDir(scriptsDir, scenarioKey);
  const entries = (await readdir(directory, { withFileTypes: true }).catch(() => []))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => entry.name)
    .sort()
    .reverse();
  const versions = [];
  for (const name of entries) {
    try {
      const payload = JSON.parse(await readFile(path.resolve(directory, name), 'utf8'));
      versions.push({
        id: payload.id || name,
        scenarioKey: payload.scenarioKey,
        scriptEntry: payload.scriptEntry,
        fileName: payload.fileName,
        actor: payload.actor || '',
        reason: payload.reason || '',
        createdAt: payload.createdAt
      });
    } catch {
      // Ignore malformed version metadata.
    }
  }
  return versions;
}

export async function readScenarioScriptVersion({ scriptsDir, scenarioKey, versionId }) {
  const safeId = safeVersionId(versionId);
  if (!safeId) return null;
  const filePath = path.resolve(versionsDir(scriptsDir, scenarioKey), safeId);
  const directory = versionsDir(scriptsDir, scenarioKey);
  if (!isWithin(directory, filePath)) return null;
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    return null;
  }
}

export async function restoreScenarioScriptVersion({
  workspaceRoot,
  scriptsDir,
  dataDir,
  scenarioKey,
  versionId
}) {
  const version = await readScenarioScriptVersion({ scriptsDir, scenarioKey, versionId });
  if (!version?.content || !version?.fileName) return null;
  const restoredEntry = version.scriptEntry && resolveScenarioScriptPath({
    workspaceRoot,
    dataDir,
    scriptEntry: version.scriptEntry
  })
    ? version.scriptEntry
    : null;
  return saveScenarioScriptContent({
    workspaceRoot,
    scriptsDir,
    dataDir,
    scenarioKey,
    existingScriptEntry: restoredEntry,
    fileName: version.fileName,
    content: version.content
  });
}

export async function saveScenarioScriptContent({
  workspaceRoot,
  scriptsDir,
  dataDir,
  scenarioKey,
  existingScriptEntry,
  fileName,
  content
}) {
  const safeFileName = sanitizeScriptFileName(fileName);
  const existingPath = existingScriptEntry
    ? resolveScenarioScriptPath({ workspaceRoot, dataDir, scriptEntry: existingScriptEntry })
    : null;
  let storedPath;
  if (existingPath && path.basename(existingPath) === safeFileName) {
    storedPath = existingPath;
  } else {
    const targetDir = path.resolve(scriptsDir, scenarioKey);
    if (!isWithin(scriptsDir, targetDir)) {
      throw new Error('场景脚本目录无效');
    }
    await mkdir(targetDir, { recursive: true });
    storedPath = path.resolve(targetDir, safeFileName);
  }
  const temporaryPath = `${storedPath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, content, 'utf8');
  await rename(temporaryPath, storedPath);
  return {
    storedPath,
    fileName: safeFileName,
    scriptEntry: existingPath === storedPath
      ? existingScriptEntry
      : toWorkspaceScriptEntry(workspaceRoot, storedPath, dataDir)
  };
}

export async function saveScenarioScript({
  workspaceRoot,
  scriptsDir,
  dataDir,
  scenarioKey,
  sourcePath,
  originalName
}) {
  const targetDir = path.resolve(scriptsDir, scenarioKey);
  await mkdir(targetDir, { recursive: true });
  const fileName = sanitizeScriptFileName(originalName);
  const storedPath = path.resolve(targetDir, fileName);
  try {
    await rename(sourcePath, storedPath);
  } catch {
    await copyFile(sourcePath, storedPath);
  }
  return {
    storedPath,
    fileName,
    scriptEntry: toWorkspaceScriptEntry(workspaceRoot, storedPath, dataDir)
  };
}
