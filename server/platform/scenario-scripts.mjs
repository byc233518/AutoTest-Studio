import { copyFile, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ALLOWED_SCRIPT_PATTERN = /\.(spec\.)?[cm]?js$/i;

export function isAllowedScriptFile(fileName = '') {
  return ALLOWED_SCRIPT_PATTERN.test(fileName);
}

export function sanitizeScriptFileName(fileName = '') {
  const base = path.basename(fileName).replace(/[^\w.-]+/g, '-');
  if (!base) return 'scenario.spec.js';
  return isAllowedScriptFile(base) ? base : `${base}.spec.js`;
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
