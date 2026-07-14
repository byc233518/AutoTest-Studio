import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  normalizePlatformUrl,
  normalizeRecordCode,
  resolvePortablePaths,
  resolveRecording,
  runCodegen
} from '../../scripts/lib/local-recording.mjs';

test('录制器规范化平台地址和录制码', () => {
  assert.equal(normalizePlatformUrl('http://host:3050/'), 'http://host:3050');
  assert.equal(normalizeRecordCode('7k3p w9qm'), '7K3P-W9QM');
  assert.throws(() => normalizePlatformUrl('file:///tmp'), /HTTP 或 HTTPS/);
  assert.throws(() => normalizeRecordCode('123'), /8 位录制码/);
});

test('便携路径只根据绿色包根目录解析', () => {
  const paths = resolvePortablePaths('D:/JMOM录制器');
  assert.match(paths.nodeExecutable, /runtime[\\/]node\.exe$/);
  assert.match(paths.playwrightCli, /app[\\/]node_modules[\\/]playwright[\\/]cli\.js$/);
  assert.match(paths.browserPath, /browsers$/);
  assert.match(paths.recordingsDir, /data[\\/]recordings$/);
  assert.match(paths.pendingDir, /data[\\/]pending$/);
});

test('录制码通过真实 HTTP 请求换取录制参数', async (t) => {
  const server = createServer(async (request, response) => {
    assert.equal(request.method, 'POST');
    assert.equal(request.url, '/api/recordings/resolve');
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    assert.deepEqual(JSON.parse(Buffer.concat(chunks).toString('utf8')), { code: '7K3P-W9QM' });
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify({
      id: 'REC-001',
      token: 'upload-token',
      startUrl: 'http://target/#/login'
    }));
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise((resolve) => server.close(resolve)));

  const result = await resolveRecording({
    platform: `http://127.0.0.1:${server.address().port}/`,
    code: '7k3p w9qm'
  });
  assert.equal(result.id, 'REC-001');
  assert.equal(result.token, 'upload-token');
});

test('codegen 使用指定 Node 和 CLI 写入输出脚本', async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), 'jmom-recorder-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const fakeCli = path.join(root, 'fake-cli.mjs');
  const outputPath = path.join(root, 'recorded.spec.js');
  await writeFile(fakeCli, `
import { writeFile } from 'node:fs/promises';
const outputIndex = process.argv.indexOf('-o');
await writeFile(process.argv[outputIndex + 1], '// recorded', 'utf8');
`, 'utf8');

  const result = await runCodegen({
    nodeExecutable: process.execPath,
    playwrightCli: fakeCli,
    browserPath: path.join(root, 'browsers'),
    outputPath,
    startUrl: 'http://example.test/#/login',
    cwd: root
  });

  assert.equal(result.exitCode, 0);
  assert.equal(result.outputExists, true);
  assert.equal(await readFile(outputPath, 'utf8'), '// recorded');
});
