import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function readSource(path) {
  try {
    return await readFile(path, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return '';
    throw error;
  }
}

test('Vue 应用外壳提供浅色导航结构与折叠交互', async () => {
  const [app, main] = await Promise.all([
    readSource('frontend/src/App.vue'),
    readSource('frontend/src/main.js')
  ]);

  assert.match(main, /import ['"]\.\/shell\.css['"]/);
  assert.match(app, /shell-brand/);
  assert.match(app, /shell-menu/);
  assert.match(app, /sidebar-toggle/);
  assert.match(app, /app-breadcrumb/);
  assert.match(app, /page-tabs/);
  assert.match(app, /content-area/);
  assert.match(app, /const sidebarCollapsed\s*=\s*ref\(false\)/);
  assert.match(app, /toggleSidebar/);
  assert.match(app, /:collapse="sidebarCollapsed"/);
  assert.match(app, /@open="handleMenuOpen"/);
  assert.match(app, /:aria-label="sidebarCollapsed/);
});

test('独立框架样式定义桌面与响应式视觉规则', async () => {
  const styles = await readSource('frontend/src/shell.css');

  assert.match(styles, /--shell-sidebar-width:\s*248px/);
  assert.match(styles, /\.shell-menu\s+\.el-menu-item\.is-active/);
  assert.match(styles, /\.page-tabs/);
  assert.match(styles, /\.content-area/);
  assert.match(styles, /\.shell\.sidebar-collapsed/);
  assert.match(styles, /@media\s*\(max-width:\s*900px\)/);
  assert.match(styles, /@media\s*\(max-width:\s*640px\)/);
});
