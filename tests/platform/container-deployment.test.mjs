import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

async function source(relativePath) {
  return readFile(new URL(`../../${relativePath}`, import.meta.url), 'utf8').catch(() => '');
}

test('容器镜像使用 Node 22、系统 Chromium 和 3050 端口', async () => {
  const dockerfile = await source('Dockerfile');

  assert.match(dockerfile, /FROM node:22-alpine/);
  assert.match(dockerfile, /apk add --no-cache[\s\S]*chromium/);
  assert.match(dockerfile, /\n    ffmpeg \\/);
  assert.match(dockerfile, /npm ci --include=dev/);
  assert.match(dockerfile, /find\(\(browser\) => browser\.name === 'ffmpeg'\)\.revision/);
  assert.match(dockerfile, /\/home\/node\/\.cache\/ms-playwright\/ffmpeg-/);
  assert.match(dockerfile, /ln -s \/usr\/bin\/ffmpeg/);
  assert.match(dockerfile, /mkdir -p \/app\/test-results/);
  assert.match(dockerfile, /chown -R node:node \/app\/test-results/);
  assert.match(dockerfile, /PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=\/usr\/bin\/chromium-browser/);
  assert.match(dockerfile, /EXPOSE 3050/);
});

test('Compose 持久化平台数据并自动重启', async () => {
  const compose = await source('compose.yaml');

  assert.match(compose, /3050:3050/);
  assert.match(compose, /\.\/platform-data:\/app\/platform-data/);
  assert.match(compose, /restart: unless-stopped/);
  assert.match(compose, /shm_size: 1gb/);
});
