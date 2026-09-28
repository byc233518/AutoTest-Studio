import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { createApp } from '../../../server/app.mjs';

export async function createTestContext(t, options = {}) {
  const rootDir = await mkdtemp(path.join(tmpdir(), 'jmom-platform-'));
  const testWorkspaceRoot = path.resolve(rootDir, 'workspace');
  const app = await createApp({
    workspaceRoot: testWorkspaceRoot,
    dataDir: rootDir,
    databasePath: ':memory:',
    runMode: 'mock',
    silent: true,
    ...options
  });
  const server = createServer(app);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const baseURL = `http://127.0.0.1:${server.address().port}`;

  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    await app.locals.database.close();
    await rm(rootDir, { recursive: true, force: true });
  });

  async function doFetch(url, options = {}) {
    return fetch(`${baseURL}${url}`, options);
  }

  async function loginCookie(username, password) {
    const response = await doFetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (response.status !== 200) {
      throw new Error(`登录失败: ${response.status} ${await response.text()}`);
    }
    return response.headers.get('set-cookie').split(';')[0];
  }

  async function waitForRun(runId) {
    const cookie = await loginCookie('tester', 'Tester123!');
    for (let attempt = 0; attempt < 30; attempt += 1) {
      const response = await doFetch(`/api/runs/${runId}`, { headers: { cookie } });
      const body = await response.json();
      if (!['queued', 'running'].includes(body.status)) {
        return body;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    throw new Error(`执行任务未完成: ${runId}`);
  }

  async function uploadCustomerDataset(cookie) {
    const form = new FormData();
    const csv = [
      '客户编号,客户名称,联系人,客户类别,客户地址',
      'AT-CUST-001,自动化客户001,测试员,自动化,上海'
    ].join('\n');
    form.append('file', new Blob([csv], { type: 'text/csv' }), 'customers.csv');
    form.append('name', '客户回归样本');
    const response = await doFetch('/api/scenarios/wms-customer-create/datasets', {
      method: 'POST',
      headers: { cookie },
      body: form
    });
    if (response.status !== 201) {
      throw new Error(`上传失败: ${response.status} ${await response.text()}`);
    }
    return response.json();
  }

  async function createRun(cookie, scenarioId, datasetId) {
    const response = await doFetch('/api/runs', {
      method: 'POST',
      headers: { cookie, 'content-type': 'application/json' },
      body: JSON.stringify({ scenarioId, datasetId, environment: 'test' })
    });
    if (response.status !== 202) {
      throw new Error(`创建执行失败: ${response.status} ${await response.text()}`);
    }
    return response.json();
  }

  async function waitForRunProcess(runId, predicate = () => true) {
    const cookie = await loginCookie('tester', 'Tester123!');
    for (let attempt = 0; attempt < 30; attempt += 1) {
      const response = await doFetch(`/api/runs/${runId}/process`, { headers: { cookie } });
      if (response.status === 200) {
        const body = await response.json();
        if (predicate(body)) {
          return body;
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    throw new Error(`执行过程未就绪: ${runId}`);
  }

  return { app, baseURL, fetch: doFetch, loginCookie, waitForRun, waitForRunProcess, uploadCustomerDataset, createRun };
}
