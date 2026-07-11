import { copyFile, mkdir, rename } from 'node:fs/promises';
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
