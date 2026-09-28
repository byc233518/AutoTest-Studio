# AutoTest Studio 绿色免安装本地录制器 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 交付一个 Windows x64 绿色免安装录制器，使同事只需解压、双击并输入短录制码即可启动 Playwright Inspector，关闭后自动上传脚本并绑定场景。

**Architecture:** 平台为本地录制任务生成一次性短录制码，录制器用该码换取现有录制 ID、开始地址和上传 Token。Node 共享执行模块负责 Playwright codegen 与上传，WinForms 自包含外壳只负责输入、状态展示和进程管理；构建脚本把 WinForms、便携 Node、Playwright 和 Chromium 打成 ZIP。

**Tech Stack:** Node.js ES Modules、Express 5、Node Test Runner、Vue 3、Element Plus、.NET 10 WinForms、MSTest、Playwright 1.61.1、PowerShell ZIP 打包。

---

## 文件结构

新增或拆分后的职责如下：

- `server/platform/recording-codes.mjs`：录制码规范化、生成、摘要、校验和一次性消费。
- `scripts/lib/local-recording.mjs`：解析参数、换取录制参数、启动 codegen、上传脚本和状态事件。
- `scripts/record-local.mjs`：保留现有 npm 命令的薄入口。
- `scripts/portable-record-runner.mjs`：绿色录制器调用的短录制码入口。
- `recorder/src/JmomRecorder.Core/`：平台地址、录制码、配置和 Node 子进程协议。
- `recorder/src/JmomRecorder.App/`：WinForms GUI。
- `scripts/build-portable-recorder.mjs`：生成绿色目录和 ZIP。
- `tests/platform/recording-codes.test.mjs`：录制码单元测试。
- `tests/platform/local-recorder.test.mjs`：共享 Node 执行器测试。
- `tests/platform/portable-recorder-package.test.mjs`：打包布局和版本锁定测试。
- `recorder/tests/JmomRecorder.Core.Tests/`：.NET Core 层测试。

### Task 1: 一次性短录制码与解析接口

**Files:**
- Create: `server/platform/recording-codes.mjs`
- Create: `tests/platform/recording-codes.test.mjs`
- Modify: `server/app.mjs`
- Modify: `tests/platform/scenario-scripts.test.mjs`

- [ ] **Step 1: 编写录制码失败测试**

在 `tests/platform/recording-codes.test.mjs` 写入：

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createRecordingCode,
  createRecordingCodeLimiter,
  hashRecordingCode,
  normalizeRecordingCode,
  verifyRecordingCode
} from '../../server/platform/recording-codes.mjs';

test('录制码使用不易混淆的 8 位字符并按四位分组', () => {
  const value = createRecordingCode({ randomBytes: () => Buffer.from([1, 2, 3, 4, 5]) });
  assert.match(value.code, /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);
  assert.equal(normalizeRecordingCode(` ${value.code.toLowerCase()} `), value.code.replace('-', ''));
});

test('录制码只保存摘要并拒绝过期或已消费的值', () => {
  const code = '7K3P-W9QM';
  const meta = {
    recordCodeHash: hashRecordingCode(code),
    recordCodeExpires: '2026-07-14T05:30:00.000Z',
    recordCodeUsedAt: null
  };
  assert.equal(verifyRecordingCode(meta, code, new Date('2026-07-14T05:00:00.000Z')).ok, true);
  assert.equal(verifyRecordingCode(meta, code, new Date('2026-07-14T06:00:00.000Z')).ok, false);
  assert.equal(verifyRecordingCode({ ...meta, recordCodeUsedAt: '2026-07-14T05:01:00.000Z' }, code, new Date('2026-07-14T05:02:00.000Z')).ok, false);
});

test('同一来源一分钟最多允许 10 次失败解析', () => {
  const limiter = createRecordingCodeLimiter({ windowMs: 60_000, maxFailures: 10 });
  for (let index = 0; index < 10; index += 1) limiter.fail('127.0.0.1', index * 1000);
  assert.equal(limiter.check('127.0.0.1', 10_000).allowed, false);
  assert.equal(limiter.check('127.0.0.1', 61_000).allowed, true);
});
```

- [ ] **Step 2: 运行测试并确认因模块缺失而失败**

Run: `node --test tests/platform/recording-codes.test.mjs`

Expected: FAIL，错误包含 `ERR_MODULE_NOT_FOUND`。

- [ ] **Step 3: 实现最小录制码模块**

`server/platform/recording-codes.mjs` 提供以下 API：

```js
import { createHash, randomBytes as secureRandomBytes, timingSafeEqual } from 'node:crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function normalizeRecordingCode(value = '') {
  return String(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function hashRecordingCode(value) {
  return createHash('sha256').update(normalizeRecordingCode(value)).digest('hex');
}

export function createRecordingCode({ randomBytes = secureRandomBytes, now = new Date(), ttlMs = 30 * 60 * 1000 } = {}) {
  const bytes = randomBytes(8);
  const raw = Array.from(bytes, (byte) => ALPHABET[byte % ALPHABET.length]).join('');
  const code = `${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
  return {
    code,
    hash: hashRecordingCode(code),
    expiresAt: new Date(now.getTime() + ttlMs).toISOString()
  };
}

export function verifyRecordingCode(meta, code, now = new Date()) {
  if (!meta?.recordCodeHash || meta.recordCodeUsedAt || !meta.recordCodeExpires) return { ok: false };
  if (new Date(meta.recordCodeExpires).getTime() < now.getTime()) return { ok: false };
  const actual = Buffer.from(hashRecordingCode(code), 'hex');
  const expected = Buffer.from(meta.recordCodeHash, 'hex');
  return { ok: actual.length === expected.length && timingSafeEqual(actual, expected) };
}

export function createRecordingCodeLimiter({ windowMs = 60_000, maxFailures = 10 } = {}) {
  const attempts = new Map();
  function active(key, now) {
    const values = (attempts.get(key) || []).filter((value) => now - value < windowMs);
    if (values.length) attempts.set(key, values);
    else attempts.delete(key);
    return values;
  }
  return {
    check(key, now = Date.now()) {
      const values = active(key, now);
      return { allowed: values.length < maxFailures, retryAfterMs: values.length ? windowMs - (now - values[0]) : 0 };
    },
    fail(key, now = Date.now()) {
      const values = active(key, now);
      values.push(now);
      attempts.set(key, values);
    },
    clear(key) {
      attempts.delete(key);
    }
  };
}
```

- [ ] **Step 4: 运行单元测试并确认通过**

Run: `node --test tests/platform/recording-codes.test.mjs`

Expected: 2 tests PASS。

- [ ] **Step 5: 为创建和解析接口写失败集成测试**

扩展 `tests/platform/scenario-scripts.test.mjs`：

```js
assert.match(recording.recordCode, /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);
assert.ok(recording.recordCodeExpires);

const resolved = await ctx.fetch('/api/recordings/resolve', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ code: recording.recordCode.toLowerCase().replace('-', ' ') })
});
assert.equal(resolved.status, 200);
const resolvedBody = await resolved.json();
assert.equal(resolvedBody.id, recording.id);
assert.equal(resolvedBody.token, recording.uploadToken);
assert.equal(resolvedBody.startUrl, recording.startUrl);

const repeated = await ctx.fetch('/api/recordings/resolve', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ code: recording.recordCode })
});
assert.equal(repeated.status, 401);
```

- [ ] **Step 6: 运行集成测试并确认解析接口不存在**

Run: `node --test tests/platform/scenario-scripts.test.mjs`

Expected: FAIL，`/api/recordings/resolve` 返回 404 或响应缺少 `recordCode`。

- [ ] **Step 7: 在服务端生成、保存并消费录制码**

修改 `server/app.mjs`：

```js
import { readdir } from 'node:fs/promises';
import { createRecordingCode, verifyRecordingCode } from './platform/recording-codes.mjs';
```

创建应用时初始化限速器：

```js
const recordingCodeLimiter = createRecordingCodeLimiter();
app.locals.recordingCodeLimiter = recordingCodeLimiter;
```

创建本地任务时使用：

```js
const recordCode = location === 'local' ? createRecordingCode() : null;

// meta 字段
recordCodeHash: recordCode?.hash || null,
recordCodeExpires: recordCode?.expiresAt || null,
recordCodeUsedAt: null,

// 响应字段
recordCode: recordCode?.code || null,
recordCodeExpires: recordCode?.expiresAt || null,
```

新增解析接口：

```js
app.post('/api/recordings/resolve', async (request, response, next) => {
  try {
    const clientKey = request.ip || request.socket.remoteAddress || 'unknown';
    const limit = app.locals.recordingCodeLimiter.check(clientKey);
    if (!limit.allowed) {
      response.setHeader('retry-after', String(Math.max(1, Math.ceil(limit.retryAfterMs / 1000))));
      return jsonError(response, 429, '录制码尝试次数过多，请稍后重试');
    }

    const code = request.body?.code || '';
    const files = (await readdir(app.locals.paths.recordingsDir))
      .filter((name) => name.endsWith('.meta.json'))
      .sort()
      .reverse();

    for (const name of files) {
      const metaPath = path.resolve(app.locals.paths.recordingsDir, name);
      const meta = JSON.parse(await readFile(metaPath, 'utf8'));
      if (meta.location !== 'local' || !verifyRecordingCode(meta, code).ok) continue;

      meta.recordCodeUsedAt = new Date().toISOString();
      meta.recordCodeHash = null;
      await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
      app.locals.recordingCodeLimiter.clear(clientKey);
      return response.json({
        id: meta.id,
        token: meta.uploadToken,
        startUrl: meta.startUrl,
        expiresAt: meta.uploadTokenExpires
      });
    }

    app.locals.recordingCodeLimiter.fail(clientKey);
    return jsonError(response, 401, '录制码无效或已过期');
  } catch (error) {
    return next(error);
  }
});
```

- [ ] **Step 8: 运行录制相关测试并确认通过**

Run: `node --test tests/platform/recording-codes.test.mjs tests/platform/scenario-scripts.test.mjs`

Expected: 全部 PASS。

- [ ] **Step 9: 提交录制码服务端改动**

```powershell
git add server/platform/recording-codes.mjs server/app.mjs tests/platform/recording-codes.test.mjs tests/platform/scenario-scripts.test.mjs
git commit -m "[feat] 增加本地录制短码"
```

### Task 2: 抽取共享本地录制执行器

**Files:**
- Create: `scripts/lib/local-recording.mjs`
- Create: `scripts/portable-record-runner.mjs`
- Create: `tests/platform/local-recorder.test.mjs`
- Modify: `scripts/record-local.mjs`

- [ ] **Step 1: 编写执行器失败测试**

`tests/platform/local-recorder.test.mjs` 覆盖：

```js
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  normalizePlatformUrl,
  normalizeRecordCode,
  resolvePortablePaths,
  runCodegen
} from '../../scripts/lib/local-recording.mjs';

test('录制器规范化平台地址和录制码', () => {
  assert.equal(normalizePlatformUrl('http://host:3050/'), 'http://host:3050');
  assert.equal(normalizeRecordCode('7k3p w9qm'), '7K3P-W9QM');
});

test('便携路径只根据绿色包根目录解析', () => {
  const paths = resolvePortablePaths('D:/AutoTest-Studio录制器');
  assert.match(paths.nodeExecutable, /runtime[\\/]node\.exe$/);
  assert.match(paths.playwrightCli, /app[\\/]node_modules[\\/]playwright[\\/]cli\.js$/);
  assert.match(paths.browserPath, /browsers$/);
});

test('codegen 使用指定 Node 和 CLI 写入输出脚本', async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), 'autotest-recorder-'));
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
  assert.equal(await readFile(outputPath, 'utf8'), '// recorded');
});
```

- [ ] **Step 2: 运行测试并确认模块缺失**

Run: `node --test tests/platform/local-recorder.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND`。

- [ ] **Step 3: 实现共享执行器**

`scripts/lib/local-recording.mjs` 导出以下完整核心实现：

```js
import { spawn } from 'node:child_process';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

export function normalizePlatformUrl(value) {
  const url = new URL(String(value).trim());
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('平台地址必须是有效的 HTTP 或 HTTPS 地址');
  }
  return url.toString().replace(/\/+$/, '');
}

export function normalizeRecordCode(value) {
  const raw = String(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!/^[A-HJ-NP-Z2-9]{8}$/.test(raw)) throw new Error('请输入 8 位录制码');
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
}

export function resolvePortablePaths(rootDir) {
  const root = path.resolve(rootDir);
  return {
    root,
    nodeExecutable: path.resolve(root, 'runtime', 'node.exe'),
    playwrightCli: path.resolve(root, 'app', 'node_modules', 'playwright', 'cli.js'),
    browserPath: path.resolve(root, 'browsers'),
    recordingsDir: path.resolve(root, 'data', 'recordings'),
    pendingDir: path.resolve(root, 'data', 'pending')
  };
}

async function responseBody(response) {
  const text = await response.text();
  try { return text ? JSON.parse(text) : {}; } catch { return {}; }
}

export async function resolveRecording({ platform, code, fetchImpl = fetch }) {
  const response = await fetchImpl(`${normalizePlatformUrl(platform)}/api/recordings/resolve`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ code: normalizeRecordCode(code) })
  });
  const body = await responseBody(response);
  if (!response.ok) throw new Error(body.message || `解析录制码失败 (${response.status})`);
  return body;
}

export async function runCodegen({
  nodeExecutable,
  playwrightCli,
  browserPath,
  outputPath,
  startUrl,
  cwd,
  spawnImpl = spawn
}) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  const child = spawnImpl(nodeExecutable, [playwrightCli, 'codegen', '--target', 'javascript', '-o', outputPath, startUrl], {
    cwd,
    stdio: 'inherit',
    env: {
      ...process.env,
      PLAYWRIGHT_BROWSERS_PATH: browserPath,
      AUTOTEST_BASE_URL: startUrl.replace(/#.*$/, '').replace(/\/+$/, '')
    }
  });
  const exitCode = await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('close', (code) => resolve(code ?? 1));
  });
  return { exitCode, outputExists: existsSync(outputPath) };
}

export async function uploadRecording({ platform, id, token, filePath, fetchImpl = fetch }) {
  const form = new FormData();
  form.append('token', token);
  form.append('file', new Blob([await readFile(filePath)], { type: 'text/javascript' }), path.basename(filePath));
  const response = await fetchImpl(`${normalizePlatformUrl(platform)}/api/recordings/${id}/upload`, { method: 'POST', body: form });
  const body = await responseBody(response);
  if (!response.ok) throw new Error(body.message || `上传失败 (${response.status})`);
  return body;
}

export async function runRecording({ platform, code, recording, paths, fetchImpl = fetch, spawnImpl = spawn, emit = () => {} }) {
  const resolved = recording || await resolveRecording({ platform, code, fetchImpl });
  const outputPath = path.resolve(paths.recordingsDir, `${resolved.id}.spec.js`);
  emit({ type: 'status', stage: 'recording', message: 'Playwright Inspector 已启动' });
  const generated = await runCodegen({
    nodeExecutable: paths.nodeExecutable,
    playwrightCli: paths.playwrightCli,
    browserPath: paths.browserPath,
    outputPath,
    startUrl: resolved.startUrl,
    cwd: paths.root,
    spawnImpl
  });
  if (!generated.outputExists) throw new Error('未生成脚本，录制已取消');
  emit({ type: 'status', stage: 'uploading', message: '正在上传录制脚本' });
  const result = await uploadRecording({ platform, id: resolved.id, token: resolved.token, filePath: outputPath, fetchImpl });
  await rm(outputPath, { force: true });
  emit({ type: 'completed', stage: 'finished', message: '录制脚本已上传', result });
  return result;
}
```

所有进度使用 JSON 行输出，格式为：

```json
{"type":"status","stage":"recording","message":"Playwright Inspector 已启动"}
```

错误事件只包含错误码和中文信息，不包含 Token。

- [ ] **Step 4: 运行执行器测试并确认通过**

Run: `node --test tests/platform/local-recorder.test.mjs`

Expected: 全部 PASS。

- [ ] **Step 5: 将两个入口改为调用共享模块**

`scripts/record-local.mjs` 保留原参数格式，改为调用 `runRecording({ id, token, startUrl, platform, runtimeRoot: process.cwd() })`；`scripts/portable-record-runner.mjs` 接收 `--platform`、`--code`、`--root`，先调用解析接口，再启动录制。CLI 使用当前工作区 Node/Playwright，便携入口使用包内路径。

- [ ] **Step 6: 验证旧命令参数与便携入口**

Run: `node --test tests/platform/local-recorder.test.mjs tests/platform/scenario-scripts.test.mjs`

Expected: 全部 PASS，旧上传链路保持兼容。

- [ ] **Step 7: 提交共享执行器**

```powershell
git add scripts/lib/local-recording.mjs scripts/record-local.mjs scripts/portable-record-runner.mjs tests/platform/local-recorder.test.mjs
git commit -m "[refactor] 复用本地录制执行流程"
```

### Task 3: 平台展示录制码和录制器下载入口

**Files:**
- Modify: `server/app.mjs`
- Modify: `frontend/src/components/ScenarioDrawer.vue`
- Create: `tests/platform/portable-recorder-ux.test.mjs`

- [ ] **Step 1: 编写前端失败测试**

`tests/platform/portable-recorder-ux.test.mjs`：

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('场景抽屉优先展示短录制码和免安装录制器下载入口', async () => {
  const source = await readFile('frontend/src/components/ScenarioDrawer.vue', 'utf8');
  assert.match(source, /recording\.recordCode/);
  assert.match(source, /复制录制码/);
  assert.match(source, /下载免安装录制器/);
  assert.match(source, /recordCodeExpires/);
  assert.doesNotMatch(source, /recording\.localCommand/);
});
```

- [ ] **Step 2: 运行测试并确认旧 UI 失败**

Run: `node --test tests/platform/portable-recorder-ux.test.mjs`

Expected: FAIL，因为当前页面展示 `localCommand`。

- [ ] **Step 3: 增加录制器下载接口**

在 `createApp` 中增加 `recorderPackagePath`：优先使用 `options.recorderPackagePath`，否则使用环境变量 `AUTOTEST_RECORDER_PACKAGE`，最后默认 `dist/AutoTest-Studio本地录制器-win-x64.zip`。新增需要登录的 `GET /api/recorder/download`，文件不存在时返回 404 `免安装录制器尚未构建`，存在时调用 `response.download()`。

`POST /api/recordings/start` 的本地录制响应增加：

```js
recorderDownloadUrl: '/api/recorder/download'
```

- [ ] **Step 4: 修改场景抽屉**

将命令输入框替换为醒目的录制码、有效期、“复制录制码”和“下载免安装录制器”。保留“刷新状态”和兼容管理员完成流程；提示文案改为“在免安装录制器中输入录制码，关闭 Inspector 后脚本会自动上传并绑定”。

- [ ] **Step 5: 运行前端测试和构建**

Run: `node --test tests/platform/portable-recorder-ux.test.mjs`

Expected: PASS。

Run: `npm run build:web`

Expected: Vite build exit 0，并更新 `web-dist/`。

- [ ] **Step 6: 提交平台 UI**

```powershell
git add server/app.mjs frontend/src/components/ScenarioDrawer.vue tests/platform/portable-recorder-ux.test.mjs web-dist
git commit -m "[feat] 使用录制码启动本地录制"
```

### Task 4: 实现自包含 WinForms 绿色录制器

**Files:**
- Create: `recorder/JmomRecorder.sln`
- Create: `recorder/src/JmomRecorder.Core/JmomRecorder.Core.csproj`
- Create: `recorder/src/JmomRecorder.Core/RecorderInput.cs`
- Create: `recorder/src/JmomRecorder.Core/RecorderSettingsStore.cs`
- Create: `recorder/src/JmomRecorder.Core/RecorderProcessSpec.cs`
- Create: `recorder/src/JmomRecorder.Core/RecorderOutputEvent.cs`
- Create: `recorder/tests/JmomRecorder.Core.Tests/JmomRecorder.Core.Tests.csproj`
- Create: `recorder/tests/JmomRecorder.Core.Tests/RecorderCoreTests.cs`
- Create: `recorder/src/JmomRecorder.App/JmomRecorder.App.csproj`
- Create: `recorder/src/JmomRecorder.App/Program.cs`
- Create: `recorder/src/JmomRecorder.App/MainForm.cs`

- [ ] **Step 1: 创建解决方案和测试项目骨架**

Run:

```powershell
dotnet new sln --format sln -n JmomRecorder -o recorder
dotnet new classlib -n JmomRecorder.Core -f net10.0 -o recorder/src/JmomRecorder.Core
dotnet new mstest -n JmomRecorder.Core.Tests -f net10.0 -o recorder/tests/JmomRecorder.Core.Tests
dotnet new winforms -n JmomRecorder.App -f net10.0 -o recorder/src/JmomRecorder.App
dotnet sln recorder/JmomRecorder.sln add recorder/src/JmomRecorder.Core/JmomRecorder.Core.csproj recorder/tests/JmomRecorder.Core.Tests/JmomRecorder.Core.Tests.csproj recorder/src/JmomRecorder.App/JmomRecorder.App.csproj
dotnet add recorder/tests/JmomRecorder.Core.Tests/JmomRecorder.Core.Tests.csproj reference recorder/src/JmomRecorder.Core/JmomRecorder.Core.csproj
dotnet add recorder/src/JmomRecorder.App/JmomRecorder.App.csproj reference recorder/src/JmomRecorder.Core/JmomRecorder.Core.csproj
```

Expected: 三个项目创建成功。

- [ ] **Step 2: 先写 Core 层失败测试**

`RecorderCoreTests.cs` 覆盖：

```csharp
[TestMethod]
public void NormalizeCode_AcceptsSpacesAndLowerCase()
{
    Assert.AreEqual("7K3P-W9QM", RecorderInput.NormalizeCode("7k3p w9qm"));
}

[TestMethod]
public void NormalizePlatformUrl_RejectsUnsupportedSchemes()
{
    Assert.ThrowsException<ArgumentException>(() => RecorderInput.NormalizePlatformUrl("file:///tmp"));
}

[TestMethod]
public void ProcessSpec_UsesPathsRelativeToPortableRoot()
{
    var spec = RecorderProcessSpec.Create(@"D:\AutoTest-Studio录制器", "http://host:3050", "7K3P-W9QM");
    Assert.IsTrue(spec.FileName.EndsWith(@"runtime\node.exe", StringComparison.OrdinalIgnoreCase));
    StringAssert.Contains(spec.Arguments, @"app\portable-record-runner.mjs");
    StringAssert.Contains(spec.Arguments, "7K3P-W9QM");
}
```

- [ ] **Step 3: 运行 .NET 测试并确认失败**

Run: `dotnet test recorder/JmomRecorder.sln`

Expected: FAIL，因为 Core 类型尚未实现。

- [ ] **Step 4: 实现 Core 层**

实现：

- `RecorderInput.NormalizeCode`：输出 `XXXX-XXXX`，非法长度抛中文 `ArgumentException`。
- `RecorderInput.NormalizePlatformUrl`：只允许 http/https，移除尾部 `/`。
- `RecorderSettingsStore`：在 `<绿色包根目录>/data/config.json` 读写平台地址。
- `RecorderProcessSpec.Create`：生成隐藏窗口的 Node 进程配置，参数只包含平台地址、录制码和根目录。
- `RecorderOutputEvent.TryParse`：解析 Node 输出的 JSON 行，不解析或保存 Token。

- [ ] **Step 5: 运行 Core 测试并确认通过**

Run: `dotnet test recorder/JmomRecorder.sln`

Expected: 全部 PASS。

- [ ] **Step 6: 实现 WinForms GUI**

`MainForm` 使用代码创建控件，避免 Designer 生成文件：平台地址输入框、录制码输入框、开始录制按钮、重试按钮、状态标签、只读日志框和打开日志目录按钮。点击开始后保存配置、启动 Node 进程、异步读取标准输出/错误输出并根据 `RecorderOutputEvent` 更新 UI。进程运行时禁用输入；退出后恢复。关闭窗口时如果子进程仍运行，弹出确认框。

`JmomRecorder.App.csproj` 设置：

```xml
<PropertyGroup>
  <OutputType>WinExe</OutputType>
  <TargetFramework>net10.0-windows</TargetFramework>
  <UseWindowsForms>true</UseWindowsForms>
  <PublishSingleFile>true</PublishSingleFile>
  <SelfContained>true</SelfContained>
  <RuntimeIdentifier>win-x64</RuntimeIdentifier>
  <AssemblyName>AutoTest-Studio录制器</AssemblyName>
</PropertyGroup>
```

- [ ] **Step 7: 构建自包含 EXE**

Run:

```powershell
dotnet publish recorder/src/JmomRecorder.App/JmomRecorder.App.csproj -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true
```

Expected: `recorder/src/JmomRecorder.App/bin/Release/net10.0-windows/win-x64/publish/AutoTest-Studio录制器.exe` 存在。

- [ ] **Step 8: 提交 WinForms 录制器**

```powershell
git add recorder
git commit -m "[feat] 增加免安装录制器界面"
```

### Task 5: 生成可分发绿色 ZIP

**Files:**
- Create: `scripts/build-portable-recorder.mjs`
- Create: `tests/platform/portable-recorder-package.test.mjs`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: 编写打包失败测试**

测试 `readLockedPlaywrightVersion(package-lock.json)` 返回 `1.61.1`，`portableLayout(outputRoot)` 返回 `runtime/node.exe`、`app/portable-record-runner.mjs`、`app/node_modules/playwright/cli.js`、`browsers`、`data/logs` 和 `VERSION` 等路径，并断言 `.gitignore` 忽略 `dist/recorder-staging/` 和生成的 ZIP。

- [ ] **Step 2: 运行测试并确认模块缺失**

Run: `node --test tests/platform/portable-recorder-package.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND`。

- [ ] **Step 3: 实现打包器**

`scripts/build-portable-recorder.mjs` 导出可测试的版本读取与布局函数；直接执行时完成：

1. 清理 `dist/recorder-staging/AutoTest-Studio录制器`。
2. 执行 `dotnet publish` 并复制 EXE。
3. 复制当前 `node.exe` 到 `runtime/node.exe`。
4. 根据 lockfile 固定版本，在 staging 的 `app` 中安装 `playwright@<locked version>`。
5. 复制 `portable-record-runner.mjs` 和 `scripts/lib/local-recording.mjs`。
6. 以 `PLAYWRIGHT_BROWSERS_PATH=<staging>/browsers` 执行 `playwright install chromium`。
7. 创建 `data/recordings`、`data/pending`、`data/logs`、默认 `recorder.config.json` 和 `VERSION`。
8. 用 PowerShell `Compress-Archive` 输出 `dist/AutoTest-Studio本地录制器-win-x64.zip`。
9. 计算 SHA-256，写入同名 `.sha256` 文件。

`package.json` 增加：

```json
"test:recorder": "node --test tests/platform/recording-codes.test.mjs tests/platform/local-recorder.test.mjs tests/platform/portable-recorder-package.test.mjs && dotnet test recorder/JmomRecorder.sln",
"build:recorder": "node scripts/build-portable-recorder.mjs"
```

- [ ] **Step 4: 运行打包测试并确认通过**

Run: `node --test tests/platform/portable-recorder-package.test.mjs`

Expected: PASS。

- [ ] **Step 5: 构建实际绿色包**

Run: `npm run build:recorder`

Expected:

- `dist/AutoTest-Studio本地录制器-win-x64.zip` 存在且大小大于 100MB。
- `.sha256` 存在。
- 解压目录包含 EXE、Node、Playwright CLI 和 Chromium。

- [ ] **Step 6: 运行解压后冒烟检查**

解压 ZIP 到临时目录，执行：

```powershell
Test-Path .\AutoTest-Studio录制器.exe
Test-Path .\runtime\node.exe
Test-Path .\app\node_modules\playwright\cli.js
Get-ChildItem .\browsers\chromium-* | Select-Object -First 1
```

Expected: 三个 `Test-Path` 均为 `True`，且存在 Chromium 目录。

- [ ] **Step 7: 提交打包逻辑**

```powershell
git add scripts/build-portable-recorder.mjs tests/platform/portable-recorder-package.test.mjs package.json package-lock.json .gitignore
git commit -m "[build] 增加绿色录制器打包流程"
```

### Task 6: 使用文档与全量验证

**Files:**
- Modify: `README.md`
- Create: `docs/免安装录制器使用说明.md`

- [ ] **Step 1: 编写同事使用说明**

文档必须包含：下载与 SHA-256 校验、解压、首次平台地址、获取录制码、开始录制、关闭 Inspector、上传成功、录制码 30 分钟过期、上传失败重试、日志目录和重新下载完整包的处理方式。

- [ ] **Step 2: 更新 README 入口**

在录制章节优先推荐免安装录制器，保留 `npm run record:local` 作为开发人员兼容方式，并链接 `docs/免安装录制器使用说明.md`。

- [ ] **Step 3: 运行全量 Node 测试**

Run: `npm test`

Expected: 0 failures。

- [ ] **Step 4: 运行 .NET 测试与发布**

Run: `dotnet test recorder/JmomRecorder.sln -c Release`

Expected: 0 failures。

Run: `dotnet publish recorder/src/JmomRecorder.App/JmomRecorder.App.csproj -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true`

Expected: exit 0。

- [ ] **Step 5: 构建平台前端**

Run: `npm run build:web`

Expected: exit 0，无 Vue/Vite 编译错误。

- [ ] **Step 6: 重建并检查绿色包**

Run: `npm run build:recorder`

Expected: ZIP、SHA-256 和完整目录检查全部成功。

- [ ] **Step 7: 运行录制接口端到端测试**

Run: `node --test tests/platform/scenario-scripts.test.mjs tests/platform/local-recorder.test.mjs tests/platform/portable-recorder-ux.test.mjs`

Expected: 创建短码、解析、上传、绑定和 UI 契约全部 PASS。

- [ ] **Step 8: 提交文档和最终验证调整**

```powershell
git add README.md docs/免安装录制器使用说明.md
git commit -m "[docs] 增加免安装录制器使用说明"
```

- [ ] **Step 9: 检查最终差异**

Run:

```powershell
git status --short
git log --oneline -6
git diff HEAD~6..HEAD --check
```

Expected: 没有未提交的功能文件；所有提交均只属于绿色录制器功能。
