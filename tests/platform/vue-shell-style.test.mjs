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
  assert.match(app, /class="settings-menu-title"\s+@click="handleSettingsClick"/);
  assert.doesNotMatch(app, /@open="handleMenuOpen"/);
  assert.match(app, /:aria-label="sidebarCollapsed/);
  assert.match(app, /window\.matchMedia\(['"]\(max-width:\s*900px\)['"]\)/);
  assert.match(app, /syncSidebarWithViewport/);
  assert.match(app, /addEventListener\(['"]change['"],\s*syncSidebarWithViewport\)/);
  assert.match(app, /removeEventListener\(['"]change['"],\s*syncSidebarWithViewport\)/);
});

test('独立框架样式定义桌面与响应式视觉规则', async () => {
  const styles = await readSource('frontend/src/shell.css');
  const activeMenuRule = styles.match(
    /\.shell-menu\s+\.el-menu-item\.is-active\s*\{([^}]*)\}/s
  )?.[1] ?? '';
  const runnerContentRule = styles.match(
    /\.topbar\s+\.runner-tag\s+\.el-tag__content\s*\{([^}]*)\}/s
  )?.[1] ?? '';
  const compactMedia = styles.split(/@media\s*\(max-width:\s*900px\)\s*\{/)[1]
    ?.split(/@media\s*\(max-width:\s*640px\)/)[0] ?? '';

  assert.match(styles, /--shell-sidebar-width:\s*248px/);
  assert.match(styles, /--shell-sidebar-collapsed-width:\s*76px/);
  assert.match(styles, /--shell-primary:\s*#7c3aed/);
  assert.match(styles, /--shell-accent:\s*#5578ff/);
  assert.match(styles, /\.shell-menu\s+\.el-menu-item\.is-active/);
  assert.match(activeMenuRule, /background:\s*linear-gradient\([^;]*var\(--shell-primary\)[^;]*var\(--shell-accent\)[^;]*\)/s);
  assert.match(styles, /\.page-tabs/);
  assert.match(styles, /\.content-area/);
  assert.match(styles, /\.shell\.sidebar-collapsed/);
  assert.match(styles, /\.shell\.sidebar-collapsed\s+\.shell-menu\s+\.el-menu-item/);
  assert.match(styles, /\.shell\.sidebar-collapsed\s+\.shell-menu\s+\.el-menu-item\s+span/);
  assert.match(styles, /\.shell\s*>\s*\.sidebar\s*\{[^}]*width:\s*var\(--shell-sidebar-width\)\s*!important/s);
  assert.match(styles, /\.shell:not\(\.sidebar-collapsed\)\s+\.shell-menu\s+\.el-menu-item\s+span/);
  assert.doesNotMatch(compactMedia, /\.shell\s*>\s*\.sidebar\s*\{[^}]*width:\s*var\(--shell-sidebar-collapsed-width\)/s);
  assert.doesNotMatch(compactMedia, /\.shell\s+\.brand-copy/);
  assert.doesNotMatch(compactMedia, /\.shell-menu\s+\.el-menu-item\s+span/);
  assert.match(runnerContentRule, /color:\s*inherit/);
  assert.match(styles, /@media\s*\(max-width:\s*900px\)/);
  assert.match(styles, /@media\s*\(max-width:\s*640px\)/);
});
