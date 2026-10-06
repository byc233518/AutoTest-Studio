import { copyFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';

export const REPORT_TEMPLATE_SETTING_KEY = 'reportTemplates';

export const REPORT_MODULE_OPTIONS = Object.freeze([
  { key: 'cover', label: '报告信息' },
  { key: 'result', label: '执行结果' },
  { key: 'narrative', label: '智能总结' },
  { key: 'details', label: '用例明细' },
  { key: 'images', label: '执行截图' },
  { key: 'signature', label: '报告落款' }
]);

export const REPORT_FORMAT_OPTIONS = Object.freeze([
  { value: 'markdown', label: 'Markdown', extension: 'md', contentType: 'text/markdown; charset=utf-8' },
  { value: 'html', label: 'HTML', extension: 'html', contentType: 'text/html; charset=utf-8' },
  { value: 'word', label: 'Word', extension: 'doc', contentType: 'application/msword; charset=utf-8' }
]);

const DEFAULT_MODULES = Object.freeze(['cover', 'result', 'narrative', 'details', 'signature']);

function nowId(prefix = 'RTP') {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value || '');
  } catch {
    return fallback;
  }
}

function requiredText(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new TypeError(`请填写${label}`);
  }
  return value.trim();
}

function optionalText(value, label) {
  if (value === undefined || value === null) return '';
  if (typeof value !== 'string') throw new TypeError(`${label}必须是字符串`);
  return value.trim();
}

function normalizeModules(modules) {
  const allowed = new Set(REPORT_MODULE_OPTIONS.map((item) => item.key));
  const source = Array.isArray(modules) ? modules : DEFAULT_MODULES;
  const normalized = [];
  for (const item of source) {
    const key = String(item || '').trim();
    if (!allowed.has(key) || normalized.includes(key)) continue;
    normalized.push(key);
  }
  if (!normalized.length) {
    throw new TypeError('报告模板至少需要勾选一个模块');
  }
  return normalized;
}

function normalizeOutputFormat(value) {
  const format = String(value || 'markdown').trim().toLowerCase();
  if (!REPORT_FORMAT_OPTIONS.some((item) => item.value === format)) {
    throw new TypeError('输出格式仅支持 Markdown、HTML 或 Word');
  }
  return format;
}

export function createDefaultReportTemplates() {
  return {
    activeTemplateId: 'tpl-standard',
    templates: [
      {
        id: 'tpl-standard',
        name: '标准报告',
        description: '包含报告信息、执行结果、智能总结、用例明细与落款',
        outputFormat: 'markdown',
        includeImages: false,
        modules: [...DEFAULT_MODULES]
      },
      {
        id: 'tpl-brief',
        name: '精简报告',
        description: '仅保留报告信息、执行结果与用例明细',
        outputFormat: 'html',
        includeImages: false,
        modules: ['cover', 'result', 'details', 'signature']
      },
      {
        id: 'tpl-visual',
        name: '图文报告',
        description: '在标准内容基础上附带执行截图，输出 HTML',
        outputFormat: 'html',
        includeImages: true,
        modules: ['cover', 'result', 'narrative', 'details', 'images', 'signature']
      }
    ]
  };
}

export function normalizeReportTemplate(input, current = null) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('报告模板参数无效');
  }
  const id = optionalText(input.id, '模板 ID') || current?.id || nowId();
  return {
    id,
    name: Object.hasOwn(input, 'name') ? requiredText(input.name, '模板名称') : requiredText(current?.name, '模板名称'),
    description: Object.hasOwn(input, 'description')
      ? optionalText(input.description, '模板说明')
      : (current?.description || ''),
    outputFormat: Object.hasOwn(input, 'outputFormat')
      ? normalizeOutputFormat(input.outputFormat)
      : normalizeOutputFormat(current?.outputFormat || 'markdown'),
    includeImages: Object.hasOwn(input, 'includeImages')
      ? Boolean(input.includeImages)
      : Boolean(current?.includeImages),
    modules: Object.hasOwn(input, 'modules')
      ? normalizeModules(input.modules)
      : normalizeModules(current?.modules || DEFAULT_MODULES)
  };
}

export function normalizeReportTemplatesSetting(input, current = null) {
  const fallback = current || createDefaultReportTemplates();
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('报告模板设置参数无效');
  }
  const rawTemplates = Object.hasOwn(input, 'templates') ? input.templates : fallback.templates;
  if (!Array.isArray(rawTemplates) || !rawTemplates.length) {
    throw new TypeError('至少需要保留一个报告模板');
  }
  if (rawTemplates.length > 30) {
    throw new TypeError('报告模板最多 30 个');
  }
  const templates = rawTemplates.map((item, index) => {
    try {
      return normalizeReportTemplate(item);
    } catch (error) {
      throw new TypeError(`第 ${index + 1} 个模板：${error.message}`);
    }
  });
  const ids = new Set();
  for (const template of templates) {
    if (ids.has(template.id)) throw new TypeError(`模板 ID 重复: ${template.id}`);
    ids.add(template.id);
  }
  const activeTemplateId = String(
    Object.hasOwn(input, 'activeTemplateId') ? input.activeTemplateId : fallback.activeTemplateId
  ).trim();
  if (!ids.has(activeTemplateId)) {
    throw new TypeError('当前启用的模板不存在');
  }
  return { activeTemplateId, templates };
}

export function readReportTemplatesSetting(database) {
  const row = database.getSetting(REPORT_TEMPLATE_SETTING_KEY);
  if (!row) return createDefaultReportTemplates();
  try {
    return normalizeReportTemplatesSetting(parseJson(row.value, null));
  } catch {
    return createDefaultReportTemplates();
  }
}

export function getActiveReportTemplate(database, templateId = '') {
  const setting = readReportTemplatesSetting(database);
  const preferredId = String(templateId || '').trim() || setting.activeTemplateId;
  return setting.templates.find((item) => item.id === preferredId) || setting.templates[0];
}

export function reportFormatMeta(format) {
  return REPORT_FORMAT_OPTIONS.find((item) => item.value === format) || REPORT_FORMAT_OPTIONS[0];
}

function formatDuration(milliseconds) {
  const value = Number(milliseconds) || 0;
  if (value < 1000) return `${value} ms`;
  const seconds = Math.round(value / 100) / 10;
  return `${seconds} 秒`;
}

function markdownCell(value) {
  return String(value ?? '').replaceAll('|', '\\|').replaceAll(/\r?\n/g, ' ');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function moduleEnabled(template, key) {
  if (key === 'images') {
    return Boolean(template.includeImages) || template.modules.includes('images');
  }
  return template.modules.includes(key);
}

function signatureText(general = {}) {
  return general.reportSignature
    || `${general.testingUnit || ''}${general.testingUnit && general.testerName ? ' / ' : ''}${general.testerName || ''}`
    || 'AutoTest Studio';
}

function statusLabel(status) {
  return status === 'passed' ? '通过' : status === 'failed' ? '失败' : String(status || '-');
}

export function buildPreviewReportContext(overrides = {}) {
  const general = {
    testingUnit: '质量保障部',
    testerName: '张三',
    reportSignature: 'AutoTest Studio 测试组',
    ...(overrides.general || {})
  };
  return {
    batch: {
      environment: 'test',
      execution_mode: 'headless',
      started_at: '2026-09-29T08:00:00.000Z',
      finished_at: '2026-09-29T08:03:20.000Z',
      status: 'failed',
      ...(overrides.batch || {})
    },
    snapshot: {
      name: '示例测试计划',
      general,
      ...(overrides.snapshot || {})
    },
    environment: {
      name: '测试环境',
      key: 'test',
      ...(overrides.environment || {})
    },
    general,
    items: overrides.items || [
      {
        position: 0,
        scenarioName: '客户主数据录入',
        datasetName: '客户样例',
        status: 'passed',
        durationMs: 42000,
        error: '',
        images: [
          { label: '客户主数据录入截图', fileName: 'preview-customer.svg', relativePath: 'preview-customer.svg', dataUrl: previewSvgDataUrl('通过') }
        ]
      },
      {
        position: 1,
        scenarioName: '供应商主数据录入',
        datasetName: '供应商样例',
        status: 'failed',
        durationMs: 28000,
        error: '未找到可用数据集',
        images: [
          { label: '供应商主数据录入截图', fileName: 'preview-vendor.svg', relativePath: 'preview-vendor.svg', dataUrl: previewSvgDataUrl('失败') }
        ]
      }
    ],
    summary: {
      total: 2,
      passed: 1,
      failed: 1,
      durationMs: 200000,
      narrative: '本次共执行 2 个测试用例，通过 1 个，失败 1 个。建议优先处理失败项并结合截图定位原因。',
      source: 'rules',
      ...(overrides.summary || {})
    }
  };
}

function previewSvgDataUrl(text) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220"><rect width="100%" height="100%" fill="#f5f7fa"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#606266" font-size="28" font-family="sans-serif">${text}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function renderMarkdownReport(context, template) {
  const { batch, snapshot, environment, general, items, summary } = context;
  const lines = [`# ${snapshot.name || '测试计划'}执行报告`, ''];

  if (moduleEnabled(template, 'cover')) {
    lines.push(
      '## 报告信息',
      '',
      `- 测试单位：${general.testingUnit || '未配置'}`,
      `- 测试人员：${general.testerName || '未配置'}`,
      `- 执行环境：${environment?.name || batch.environment}（${batch.environment}）`,
      `- 执行模式：${batch.execution_mode}`,
      `- 开始时间：${batch.started_at || '-'}`,
      `- 完成时间：${batch.finished_at || '-'}`,
      `- 执行耗时：${formatDuration(summary.durationMs)}`,
      ''
    );
  }

  if (moduleEnabled(template, 'result')) {
    lines.push(
      '## 执行结果',
      '',
      `- 用例总数：${summary.total}`,
      `- 通过：${summary.passed}`,
      `- 失败：${summary.failed}`,
      ''
    );
  }

  if (moduleEnabled(template, 'narrative')) {
    lines.push('## 智能总结', '', summary.narrative || '暂无总结', '');
  }

  if (moduleEnabled(template, 'details')) {
    lines.push(
      '## 用例明细',
      '',
      '| 序号 | 测试用例 | 测试数据 | 状态 | 耗时 | 说明 |',
      '| ---: | --- | --- | --- | ---: | --- |',
      ...items.map((item) => `| ${item.position + 1} | ${markdownCell(item.scenarioName)} | ${markdownCell(item.datasetName || '-')} | ${statusLabel(item.status)} | ${formatDuration(item.durationMs)} | ${markdownCell(item.error || '-')} |`),
      ''
    );
  }

  if (moduleEnabled(template, 'images')) {
    lines.push('## 执行截图', '');
    let hasImage = false;
    for (const item of items) {
      const images = item.images || [];
      if (!images.length) continue;
      hasImage = true;
      lines.push(`### ${item.scenarioName}`, '');
      for (const image of images) {
        const target = image.dataUrl || image.relativePath || image.fileName;
        lines.push(`![${markdownCell(image.label || item.scenarioName)}](${target})`, '');
      }
    }
    if (!hasImage) lines.push('暂无截图', '');
  }

  if (moduleEnabled(template, 'signature')) {
    lines.push('---', '', signatureText(general));
  }

  return `${lines.join('\n').trim()}\n`;
}

function renderHtmlBody(context, template) {
  const { batch, snapshot, environment, general, items, summary } = context;
  const sections = [];
  sections.push(`<h1>${escapeHtml(snapshot.name || '测试计划')}执行报告</h1>`);

  if (moduleEnabled(template, 'cover')) {
    sections.push(`
<section>
  <h2>报告信息</h2>
  <ul>
    <li>测试单位：${escapeHtml(general.testingUnit || '未配置')}</li>
    <li>测试人员：${escapeHtml(general.testerName || '未配置')}</li>
    <li>执行环境：${escapeHtml(environment?.name || batch.environment)}（${escapeHtml(batch.environment)}）</li>
    <li>执行模式：${escapeHtml(batch.execution_mode)}</li>
    <li>开始时间：${escapeHtml(batch.started_at || '-')}</li>
    <li>完成时间：${escapeHtml(batch.finished_at || '-')}</li>
    <li>执行耗时：${escapeHtml(formatDuration(summary.durationMs))}</li>
  </ul>
</section>`);
  }

  if (moduleEnabled(template, 'result')) {
    sections.push(`
<section>
  <h2>执行结果</h2>
  <ul>
    <li>用例总数：${escapeHtml(summary.total)}</li>
    <li>通过：${escapeHtml(summary.passed)}</li>
    <li>失败：${escapeHtml(summary.failed)}</li>
  </ul>
</section>`);
  }

  if (moduleEnabled(template, 'narrative')) {
    sections.push(`
<section>
  <h2>智能总结</h2>
  <p>${escapeHtml(summary.narrative || '暂无总结').replaceAll('\n', '<br/>')}</p>
</section>`);
  }

  if (moduleEnabled(template, 'details')) {
    sections.push(`
<section>
  <h2>用例明细</h2>
  <table>
    <thead>
      <tr><th>序号</th><th>测试用例</th><th>测试数据</th><th>状态</th><th>耗时</th><th>说明</th></tr>
    </thead>
    <tbody>
      ${items.map((item) => `
        <tr>
          <td>${item.position + 1}</td>
          <td>${escapeHtml(item.scenarioName)}</td>
          <td>${escapeHtml(item.datasetName || '-')}</td>
          <td>${escapeHtml(statusLabel(item.status))}</td>
          <td>${escapeHtml(formatDuration(item.durationMs))}</td>
          <td>${escapeHtml(item.error || '-')}</td>
        </tr>`).join('')}
    </tbody>
  </table>
</section>`);
  }

  if (moduleEnabled(template, 'images')) {
    const blocks = [];
    for (const item of items) {
      const images = item.images || [];
      if (!images.length) continue;
      blocks.push(`<h3>${escapeHtml(item.scenarioName)}</h3>`);
      for (const image of images) {
        const src = image.dataUrl || image.relativePath || image.fileName;
        blocks.push(`<p><img src="${escapeHtml(src)}" alt="${escapeHtml(image.label || item.scenarioName)}" /></p>`);
      }
    }
    sections.push(`
<section>
  <h2>执行截图</h2>
  ${blocks.length ? blocks.join('\n') : '<p>暂无截图</p>'}
</section>`);
  }

  if (moduleEnabled(template, 'signature')) {
    sections.push(`<hr/><p class="signature">${escapeHtml(signatureText(general))}</p>`);
  }

  return sections.join('\n');
}

function renderHtmlDocument(context, template, { forWord = false } = {}) {
  const title = `${context.snapshot?.name || '测试计划'}执行报告`;
  const body = renderHtmlBody(context, template);
  const styles = `
    body { font-family: "Microsoft YaHei", "PingFang SC", sans-serif; color: #303133; line-height: 1.6; margin: 24px; }
    h1 { font-size: 24px; margin: 0 0 16px; }
    h2 { font-size: 18px; margin: 24px 0 10px; border-bottom: 1px solid #ebeef5; padding-bottom: 6px; }
    h3 { font-size: 15px; margin: 16px 0 8px; }
    table { width: 100%; border-collapse: collapse; margin: 8px 0 16px; }
    th, td { border: 1px solid #dcdfe6; padding: 8px 10px; text-align: left; vertical-align: top; }
    th { background: #f5f7fa; }
    img { max-width: 100%; border: 1px solid #e4e7ed; border-radius: 4px; }
    .signature { color: #606266; margin-top: 18px; }
  `;
  if (forWord) {
    return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View></w:WordDocument></xml><![endif]-->
<style>${styles}</style>
</head>
<body>${body}</body>
</html>
`;
  }
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<style>${styles}</style>
</head>
<body>${body}</body>
</html>
`;
}

export function renderReportContent(context, template) {
  const normalized = normalizeReportTemplate(template);
  if (normalized.outputFormat === 'html') {
    return {
      format: 'html',
      extension: 'html',
      contentType: reportFormatMeta('html').contentType,
      content: renderHtmlDocument(context, normalized)
    };
  }
  if (normalized.outputFormat === 'word') {
    return {
      format: 'word',
      extension: 'doc',
      contentType: reportFormatMeta('word').contentType,
      content: renderHtmlDocument(context, normalized, { forWord: true })
    };
  }
  return {
    format: 'markdown',
    extension: 'md',
    contentType: reportFormatMeta('markdown').contentType,
    content: renderMarkdownReport(context, normalized)
  };
}

export function previewReportTemplate(template, overrides = {}) {
  const normalized = normalizeReportTemplate(template);
  const context = buildPreviewReportContext(overrides);
  return {
    template: normalized,
    ...renderReportContent(context, normalized)
  };
}

async function resolveScreenshotFiles(artifact) {
  const candidates = [artifact.file_path].filter(Boolean);
  for (const candidate of candidates) {
    if (candidate && existsSync(candidate)) return candidate;
  }
  return '';
}

export async function collectReportItemImages(database, items, reportDir) {
  const imagesDir = path.resolve(reportDir, 'images');
  await mkdir(imagesDir, { recursive: true });
  const enriched = [];
  for (const item of items) {
    const images = [];
    if (item.runId) {
      const artifacts = database.listRunArtifacts(item.runId)
        .filter((artifact) => artifact.type === 'screenshot' || /\.(png|jpe?g|svg|webp)$/i.test(artifact.file_name || ''));
      let index = 0;
      for (const artifact of artifacts) {
        const sourcePath = await resolveScreenshotFiles(artifact);
        if (!sourcePath) continue;
        index += 1;
        const extension = path.extname(sourcePath) || path.extname(artifact.file_name || '') || '.png';
        const fileName = `${item.runId}-${index}${extension}`;
        const targetPath = path.resolve(imagesDir, fileName);
        await copyFile(sourcePath, targetPath);
        images.push({
          label: artifact.label || `${item.scenarioName}截图`,
          fileName,
          relativePath: `images/${fileName}`,
          absolutePath: targetPath
        });
      }
    }
    enriched.push({ ...item, images });
  }
  return enriched;
}

export async function writeRenderedReport(reportDir, rendered, writer = undefined) {
  await mkdir(reportDir, { recursive: true });
  const fileName = `report.${rendered.extension}`;
  const reportPath = path.resolve(reportDir, fileName);
  const write = writer || ((filePath, content) =>
    import('node:fs/promises').then(({ writeFile }) => writeFile(filePath, content, 'utf8')));
  await write(reportPath, rendered.content, 'utf8');
  return { reportPath, fileName };
}

export async function readReportFileAsText(reportPath) {
  return readFile(reportPath, 'utf8');
}
