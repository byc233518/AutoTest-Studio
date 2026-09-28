import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import path from 'node:path';
import test from 'node:test';

const require = createRequire(import.meta.url);
const config = require('../../electron-builder.config.cjs');

test('桌面安装包只携带录像所需的 Playwright FFmpeg', () => {
  const playwrightResources = config.extraResources.filter(resource => (
    resource && typeof resource === 'object' && String(resource.to).startsWith('app-runtime/browsers/')
  ));

  assert.equal(playwrightResources.length, 1);
  assert.match(path.basename(playwrightResources[0].from), /^ffmpeg-\d+$/);
  assert.match(playwrightResources[0].to, /^app-runtime\/browsers\/ffmpeg-\d+$/);
});

test('桌面安装包不再携带 Playwright Chromium 和 Windows 依赖检查工具', () => {
  const packagedPaths = config.extraResources
    .filter(resource => resource && typeof resource === 'object')
    .flatMap(resource => [resource.from, resource.to])
    .map(value => String(value).toLowerCase());

  assert.equal(packagedPaths.some(value => /chromium(?:_|-headless|\b)/.test(value)), false);
  assert.equal(packagedPaths.some(value => /winldd(?:-|\b)/.test(value)), false);
});
