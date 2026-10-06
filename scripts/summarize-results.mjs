import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function stripAnsi(text) {
  return String(text || '').replace(/\u001B\[[0-9;]*[A-Za-z]/g, '');
}

function collectSpecs(suite, items = []) {
  for (const spec of suite.specs || []) {
    for (const test of spec.tests || []) {
      const result = test.results?.at(-1) || {};
      items.push({
        title: [...(suite.title ? [suite.title] : []), spec.title].join(' / '),
        project: test.projectName,
        expectedStatus: test.expectedStatus,
        status: result.status || test.status || 'unknown',
        durationMs: result.duration || 0,
        error: stripAnsi(result.error?.message || result.errors?.[0]?.message || '')
      });
    }
  }
  for (const child of suite.suites || []) {
    collectSpecs(child, items);
  }
  return items;
}

export { stripAnsi, collectSpecs };

function toMarkdown(summary) {
  const lines = [
    `# AutoTest Studio 测试结果`,
    ``,
    `- 运行时间: ${summary.generatedAt}`,
    `- 结果目录: ${summary.resultDir}`,
    `- 总数: ${summary.total}`,
    `- 通过: ${summary.passed}`,
    `- 失败: ${summary.failed}`,
    `- 跳过: ${summary.skipped}`,
    ``,
    `| 场景 | 项目 | 状态 | 耗时(ms) |`,
    `| --- | --- | --- | ---: |`
  ];

  for (const item of summary.tests) {
    lines.push(`| ${item.title} | ${item.project || ''} | ${item.status} | ${item.durationMs} |`);
  }

  const failures = summary.tests.filter((item) => item.error);
  if (failures.length) {
    lines.push('', '## 失败详情');
    for (const item of failures) {
      lines.push('', `### ${item.title}`, '```text', item.error.trim(), '```');
    }
  }

  return `${lines.join('\n')}\n`;
}

export async function summarizeResults(resultDir = process.env.AUTOTEST_RESULT_DIR || path.join('test-results', 'latest')) {
  const absoluteResultDir = path.resolve(resultDir);
  const resultsPath = path.join(absoluteResultDir, 'results.json');
  const raw = await fs.readFile(resultsPath, 'utf8').catch(() => null);

  const summary = {
    generatedAt: new Date().toISOString(),
    resultDir: absoluteResultDir,
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    tests: []
  };

  if (raw) {
    const report = JSON.parse(raw);
    summary.tests = collectSpecs(report);
    summary.total = summary.tests.length;
    summary.passed = summary.tests.filter((item) => item.status === 'passed').length;
    summary.failed = summary.tests.filter((item) => ['failed', 'timedOut', 'interrupted'].includes(item.status)).length;
    summary.skipped = summary.tests.filter((item) => item.status === 'skipped').length;
  }

  await fs.mkdir(absoluteResultDir, { recursive: true });
  await fs.writeFile(path.join(absoluteResultDir, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  await fs.writeFile(path.join(absoluteResultDir, 'summary.md'), toMarkdown(summary), 'utf8');
  return summary;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await summarizeResults(process.argv[2]);
}
