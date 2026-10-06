import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildPreviewReportContext,
  createDefaultReportTemplates,
  normalizeReportTemplatesSetting,
  renderReportContent
} from '../../server/platform/report-templates.mjs';
import { createTestContext } from './helpers/test-context.mjs';

test('默认报告模板可读取，并支持切换启用模板与预览', async (t) => {
  const ctx = await createTestContext(t, { desktopMode: true });
  const cookie = await ctx.loginCookie('admin', 'Admin123!');
  const headers = { cookie, 'content-type': 'application/json' };

  const listed = await ctx.fetch('/api/settings/report-templates', { headers: { cookie } });
  assert.equal(listed.status, 200);
  const body = await listed.json();
  assert.equal(body.activeTemplateId, 'tpl-standard');
  assert.equal(body.templates.length >= 3, true);
  assert.equal(body.moduleOptions.some((item) => item.key === 'cover'), true);

  const preview = await ctx.fetch('/api/settings/report-templates/preview', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      template: {
        name: '图文预览',
        outputFormat: 'html',
        includeImages: true,
        modules: ['cover', 'result', 'images', 'signature']
      }
    })
  });
  assert.equal(preview.status, 200);
  const previewBody = await preview.json();
  assert.equal(previewBody.format, 'html');
  assert.match(previewBody.content, /执行截图/);
  assert.match(previewBody.content, /示例测试计划/);

  const saved = await ctx.fetch('/api/settings/report-templates', {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      activeTemplateId: 'tpl-brief',
      templates: body.templates
    })
  });
  assert.equal(saved.status, 200);
  assert.equal((await saved.json()).activeTemplateId, 'tpl-brief');
});

test('报告模板可按模块裁剪并输出 Word 兼容文档', () => {
  const defaults = createDefaultReportTemplates();
  const template = {
    ...defaults.templates[0],
    outputFormat: 'word',
    includeImages: false,
    modules: ['cover', 'result', 'signature']
  };
  const rendered = renderReportContent(buildPreviewReportContext(), template);
  assert.equal(rendered.format, 'word');
  assert.equal(rendered.extension, 'doc');
  assert.match(rendered.content, /报告信息/);
  assert.match(rendered.content, /执行结果/);
  assert.doesNotMatch(rendered.content, /用例明细/);
  assert.doesNotMatch(rendered.content, /智能总结/);
});

test('启用模板缺失或模块为空时拒绝保存', () => {
  const defaults = createDefaultReportTemplates();
  assert.throws(
    () => normalizeReportTemplatesSetting({
      activeTemplateId: 'missing',
      templates: defaults.templates
    }),
    /当前启用的模板不存在/
  );
  assert.throws(
    () => normalizeReportTemplatesSetting({
      activeTemplateId: defaults.activeTemplateId,
      templates: [{ ...defaults.templates[0], modules: [] }]
    }),
    /至少需要勾选一个模块/
  );
});

test('计划执行使用当前启用的 HTML 模板生成报告', async (t) => {
  const ctx = await createTestContext(t, { desktopMode: true, mockRunStepDelayMs: 20 });
  const cookie = await ctx.loginCookie('admin', 'Admin123!');
  const headers = { cookie, 'content-type': 'application/json' };
  const catalog = await (await ctx.fetch('/api/scenarios', { headers: { cookie } })).json();
  const customer = catalog.scenarios.find((item) => item.key === 'sample-form-submit');

  const form = new FormData();
  form.append('name', '模板执行数据');
  form.append('file', new Blob([
    '记录编码,记录名称,经办人,分类,说明\nTPL-001,模板记录,测试员,示例,说明'
  ], { type: 'text/csv' }), 'tpl-customers.csv');
  const dataset = await (await ctx.fetch(`/api/scenarios/${customer.key}/datasets`, {
    method: 'POST',
    headers: { cookie },
    body: form
  })).json();

  const defaults = createDefaultReportTemplates();
  const visual = defaults.templates.find((item) => item.id === 'tpl-visual');
  const saveTemplates = await ctx.fetch('/api/settings/report-templates', {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      activeTemplateId: visual.id,
      templates: defaults.templates
    })
  });
  assert.equal(saveTemplates.status, 200);

  const created = await (await ctx.fetch('/api/test-plans', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: '模板验证计划',
      environment: 'test',
      executionMode: 'headless',
      items: [{ scenarioId: customer.id, datasetId: dataset.id }]
    })
  })).json();

  const started = await (await ctx.fetch(`/api/test-plans/${created.id}/run`, {
    method: 'POST',
    headers: { cookie }
  })).json();

  let completed;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    completed = await (await ctx.fetch(`/api/test-plan-runs/${started.id}`, { headers: { cookie } })).json();
    if (!['queued', 'running'].includes(completed.status)) break;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  assert.equal(completed.status, 'passed');
  assert.equal(completed.reportFormat, 'html');
  assert.equal(completed.summary.reportTemplate.id, 'tpl-visual');

  const report = await ctx.fetch(completed.reportUrl, { headers: { cookie } });
  assert.equal(report.status, 200);
  assert.match(report.headers.get('content-type') || '', /text\/html/);
  const html = await report.text();
  assert.match(html, /模板验证计划执行报告/);
  assert.match(html, /<base href="\/api\/test-plan-runs\/[^"]+\/report-asset\/"/);
});
