import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readUtf8 = (path) => readFile(path, 'utf8');
const readOptionalUtf8 = async (path) => {
  try {
    return await readUtf8(path);
  } catch {
    return '';
  }
};

test('登录页提供 JMOM 品牌视觉与三项平台能力', async () => {
  const source = await readUtf8('frontend/src/views/LoginView.vue');

  for (const className of [
    'login-visual',
    'login-visual-brand',
    'login-brand-symbol',
    'login-capabilities',
    'login-panel-shell',
  ]) {
    assert.match(source, new RegExp(`class=["'][^"']*${className}`));
  }

  assert.match(source, /JMOM 自动化测试平台/);
  assert.match(source, /场景、数据、执行与证据的一体化工作台/);
  assert.match(source, /<strong>场景管理<\/strong>[\s\S]*?<small>脚本、数据、环境与依赖统一沉淀<\/small>/);
  assert.match(source, /<strong>执行闭环<\/strong>[\s\S]*?<small>预检、执行、过程与结果全程追踪<\/small>/);
  assert.match(source, /<strong>证据回放<\/strong>[\s\S]*?<small>步骤、截图、录像与报告集中查看<\/small>/);
});

test('登录页保留原有账号表单与提交逻辑', async () => {
  const source = await readUtf8('frontend/src/views/LoginView.vue');

  for (const evidence of [
    /:model=["']form["']/,
    /const accounts\s*=/,
    /selectAccount/,
    /async function submit\(\)/,
    /class=["']test-accounts["']/,
    /native-type=["']submit["']/,
    /:loading=["']loading["']/,
    /class=["']login-button["']/,
  ]) {
    assert.match(source, evidence);
  }
});

test('登录视觉样式引用本地 SVG 并在移动端切换为单栏', async () => {
  const css = await readUtf8('frontend/src/login.css');
  const svg = await readOptionalUtf8('frontend/src/assets/jmom-login-visual.svg');

  assert.match(css, /url\(["']?\.\/assets\/jmom-login-visual\.svg["']?\)/);
  assert.match(css, /--login-panel-shell-width\s*:\s*44\.444444%/);
  assert.match(css, /\.login-panel-shell\s*\{[\s\S]*?width\s*:\s*var\(--login-panel-shell-width\)/);
  assert.match(css, /\.login-visual\s*\{/);
  assert.match(css, /\.login-capabilities\s*\{/);
  assert.match(css, /@media\s*\(max-width\s*:\s*768px\)[\s\S]*?\.login-visual\s*\{[\s\S]*?display\s*:\s*none[\s\S]*?\.login-panel-shell\s*\{[\s\S]*?width\s*:\s*100%/);
  assert.match(svg, /<svg\b/);
  assert.match(svg, /#(?:7C3AED|4F8CFF)/i);
});
