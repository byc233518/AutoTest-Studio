import { randomBytes } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'acorn';
import { normalizeSchema } from './schema-sync.mjs';

const ALLOWED_SCRIPT_PATTERN = /\.(spec\.)?[cm]?js$/i;

export function isAllowedScriptFile(fileName = '') {
  return ALLOWED_SCRIPT_PATTERN.test(fileName);
}

export function sanitizeScriptFileName(fileName = '') {
  const base = path.basename(fileName).replace(/[^\w.-]+/g, '-');
  if (!base) return 'scenario.spec.js';
  return isAllowedScriptFile(base) ? base : `${base}.spec.js`;
}

function normalizeDataSchema(value) {
  const schema = normalizeSchema(value);
  return schema.columns.length ? schema : null;
}

function propertyName(property) {
  if (property.computed) return '';
  if (property.key.type === 'Identifier') return property.key.name;
  if (property.key.type === 'Literal' && (typeof property.key.value === 'string' || typeof property.key.value === 'number')) {
    return String(property.key.value);
  }
  return '';
}

function staticValue(node) {
  if (node.type === 'Literal' && (node.value === null || ['string', 'number', 'boolean'].includes(typeof node.value))) {
    return { ok: true, value: node.value };
  }
  if (node.type === 'ArrayExpression') {
    const values = [];
    for (const item of node.elements) {
      if (!item) return { ok: false };
      const parsed = staticValue(item);
      if (!parsed.ok) return parsed;
      values.push(parsed.value);
    }
    return { ok: true, value: values };
  }
  if (node.type === 'ObjectExpression') {
    const value = Object.create(null);
    for (const property of node.properties) {
      if (property.type !== 'Property' || property.kind !== 'init' || property.method || property.computed || property.shorthand) {
        return { ok: false };
      }
      const key = propertyName(property);
      if (!key) return { ok: false };
      const parsed = staticValue(property.value);
      if (!parsed.ok) return parsed;
      value[key] = parsed.value;
    }
    return { ok: true, value };
  }
  return { ok: false };
}

function findSchemaInitializer(source) {
  const ast = parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  const initializers = [];
  for (const statement of ast.body) {
    const declaration = statement.type === 'VariableDeclaration'
      ? statement
      : statement.type === 'ExportNamedDeclaration' && statement.declaration?.type === 'VariableDeclaration'
        ? statement.declaration
        : null;
    const schema = declaration?.declarations.filter((item) => item.id.type === 'Identifier' && item.id.name === 'testDataSchema') || [];
    initializers.push(...schema.map((item) => item.init));
  }
  return initializers.length === 1 ? initializers[0] : null;
}

export function extractScriptDataSchema(source = '') {
  try {
    if (typeof source !== 'string') return null;
    const marker = source.match(/\/\*\s*@(?:autotest|jmom)-data-schema\s*([\s\S]*?)\*\//);
    if (marker) {
      return normalizeDataSchema(JSON.parse(marker[1].trim()));
    }
    const initializer = findSchemaInitializer(source);
    if (!initializer || initializer.type !== 'ObjectExpression') return null;
    const parsed = staticValue(initializer);
    return parsed.ok ? normalizeDataSchema(parsed.value) : null;
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

function comparablePath(value) {
  const resolved = path.resolve(value);
  return process.platform === 'win32' ? resolved.toLocaleLowerCase('en-US') : resolved;
}

export async function removeScenarioScriptAssets({
  workspaceRoot,
  dataDir,
  scriptsDir,
  scenarios = [],
  remainingScenarios = []
}) {
  const managedRoot = path.resolve(scriptsDir);
  const remainingPaths = remainingScenarios
    .map((scenario) => resolveScenarioScriptPath({ workspaceRoot, dataDir, scriptEntry: scenario.script_entry }))
    .filter((scriptPath) => scriptPath && isWithin(managedRoot, scriptPath));
  const remainingPathKeys = new Set(remainingPaths.map(comparablePath));
  const directoryTargets = new Set();
  const fileTargets = new Set();
  const preservedShared = [];
  const skippedExternal = [];

  for (const scenario of scenarios) {
    const versionDirectory = versionsDir(managedRoot, scenario.key);
    if (isWithin(managedRoot, versionDirectory)) directoryTargets.add(versionDirectory);

    const scriptPath = resolveScenarioScriptPath({ workspaceRoot, dataDir, scriptEntry: scenario.script_entry });
    if (!scriptPath) continue;
    if (!isWithin(managedRoot, scriptPath)) {
      skippedExternal.push(scriptPath);
      continue;
    }
    if (remainingPathKeys.has(comparablePath(scriptPath))) {
      preservedShared.push(scriptPath);
      continue;
    }

    const scenarioDirectory = path.resolve(managedRoot, scenario.key);
    const remainingUsesScenarioDirectory = remainingPaths.some((remainingPath) => isWithin(scenarioDirectory, remainingPath));
    if (isWithin(scenarioDirectory, scriptPath) && !remainingUsesScenarioDirectory) {
      directoryTargets.add(scenarioDirectory);
    } else {
      fileTargets.add(scriptPath);
    }
  }

  const recursiveTargets = [...directoryTargets];
  const targets = [
    ...recursiveTargets.map((target) => ({ target, recursive: true })),
    ...[...fileTargets]
      .filter((target) => !recursiveTargets.some((directory) => isWithin(directory, target)))
      .map((target) => ({ target, recursive: false }))
  ];
  const removed = [];
  const failed = [];
  for (const entry of targets) {
    try {
      await rm(entry.target, { recursive: entry.recursive, force: true });
      removed.push(entry.target);
    } catch (error) {
      failed.push({ path: entry.target, message: error.message });
    }
  }
  return { removed, preservedShared, skippedExternal, failed };
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
  const managedExistingPath = existingPath && isWithin(scriptsDir, existingPath)
    ? existingPath
    : null;
  let storedPath;
  if (managedExistingPath && path.basename(managedExistingPath) === safeFileName) {
    storedPath = managedExistingPath;
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
    scriptEntry: managedExistingPath === storedPath
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
