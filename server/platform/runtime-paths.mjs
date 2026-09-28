import { existsSync } from 'node:fs';
import path from 'node:path';

export function resolveRuntimePaths(workspaceRoot, {
  exists = existsSync,
  execPath = process.execPath,
  isElectron = Boolean(process.versions.electron)
} = {}) {
  const bundledNodePath = path.resolve(workspaceRoot, 'runtime', 'node.exe');
  const bundledBrowsersPath = path.resolve(workspaceRoot, 'browsers');
  const hasBundledNode = exists(bundledNodePath);
  return {
    nodeExecutable: hasBundledNode ? bundledNodePath : execPath,
    browsersPath: exists(bundledBrowsersPath) ? bundledBrowsersPath : null,
    electronRunAsNode: !hasBundledNode && isElectron
  };
}
