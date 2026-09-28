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

test('Vue 应用外壳提供紧凑桌面导航、主题切换和折叠交互', async () => {
  const [app, main, theme] = await Promise.all([
    readSource('frontend/src/App.vue'),
    readSource('frontend/src/main.js'),
    readSource('frontend/src/theme.js')
  ]);

  assert.match(main, /import ['"]\.\/shell\.css['"]/);
  assert.match(main, /element-plus\/theme-chalk\/dark\/css-vars\.css/);
  assert.match(main, /initializeTheme\(\)/);
  assert.match(app, /shell-brand/);
  assert.match(app, /shell-menu/);
  assert.match(app, /sidebar-toggle/);
  assert.match(app, /app-breadcrumb/);
  assert.match(app, /page-tabs/);
  assert.match(app, /content-area/);
  assert.match(app, /const sidebarCollapsed\s*=\s*ref\(false\)/);
  assert.match(app, /toggleSidebar/);
  assert.match(app, /:collapse="sidebarCollapsed"/);
  assert.match(app, /:width="sidebarCollapsed \? '68px' : '220px'"/);
  assert.match(app, /class="settings-menu-title"\s+@click="handleSettingsClick"/);
  assert.match(app, /class="settings-menu-label">系统配置<\/span>/);
  assert.doesNotMatch(app, /@open="handleMenuOpen"/);
  assert.match(app, /:aria-label="sidebarCollapsed/);
  assert.match(app, /aria-label="切换主题"/);
  assert.match(app, /const \{ resolvedTheme, setTheme \} = useTheme\(\)/);
  assert.match(app, /setTheme\(resolvedTheme\.value === 'dark' \? 'light' : 'dark'\)/);
  assert.doesNotMatch(app, /matchMedia\(['"]\(max-width:/);
  assert.doesNotMatch(app, /syncSidebarWithViewport/);
  assert.match(theme, /new Set\(\['light', 'dark', 'system'\]\)/);
  assert.match(theme, /classList\.toggle\('dark', next === 'dark'\)/);
  assert.match(theme, /dataset\.theme = next/);
});

test('独立框架样式定义紧凑桌面、动态高度和深浅主题规则', async () => {
  const [styles, globalStyles] = await Promise.all([
    readSource('frontend/src/shell.css'),
    readSource('frontend/src/styles.css')
  ]);
  const activeMenuRule = styles.match(
    /\.shell-menu\s+\.el-menu-item\.is-active\s*\{([^}]*)\}/s
  )?.[1] ?? '';
  const shellRule = styles.match(/\.shell\s*\{([^}]*)\}/s)?.[1] ?? '';
  const shellMainRule = styles.match(/\.shell-main\s*\{([^}]*)\}/s)?.[1] ?? '';
  const contentRule = styles.match(/\.content-area\s*\{([^}]*)\}/s)?.[1] ?? '';
  const shellMenuRule = styles.match(/\.shell-menu\.el-menu\s*\{([^}]*)\}/s)?.[1] ?? '';
  const viewportRule = globalStyles.match(/html,\s*body,\s*#app\s*\{([^}]*)\}/s)?.[1] ?? '';
  const pageRule = globalStyles.match(/\.page\s*\{([^}]*)\}/s)?.[1] ?? '';
  const runnerContentRule = styles.match(
    /\.topbar\s+\.runner-tag\s+\.el-tag__content\s*\{([^}]*)\}/s
  )?.[1] ?? '';
  const collapsedSettingsRule = styles.match(
    /\.shell\.sidebar-collapsed\s+\.shell-menu\s+\.settings-menu-title\s*\{([^}]*)\}/s
  )?.[1] ?? '';
  const collapsedSettingsLabelRule = styles.match(
    /\.shell\.sidebar-collapsed\s+\.shell-menu\s+\.settings-menu-label\s*\{([^}]*)\}/s
  )?.[1] ?? '';

  assert.match(styles, /--shell-sidebar-width:\s*220px/);
  assert.match(styles, /--shell-sidebar-collapsed-width:\s*68px/);
  assert.match(styles, /--shell-primary:\s*#167d79/);
  assert.match(styles, /--shell-accent:\s*#d97706/);
  assert.match(styles, /\.shell-menu\s+\.el-menu-item\.is-active/);
  assert.match(activeMenuRule, /color:\s*#fff/);
  assert.match(activeMenuRule, /background:\s*var\(--shell-primary\)\s*!important/);
  assert.doesNotMatch(activeMenuRule, /linear-gradient/);
  assert.match(styles, /\.page-tabs/);
  assert.match(styles, /\.content-area/);
  assert.match(styles, /\.shell\.sidebar-collapsed/);
  assert.match(styles, /\.shell\.sidebar-collapsed\s+\.shell-menu\s+\.el-menu-item/);
  assert.match(styles, /\.shell\.sidebar-collapsed\s+\.shell-menu\s+\.el-menu-item\s+span/);
  assert.doesNotMatch(styles, /\.shell\.sidebar-collapsed\s+\.shell-menu\s+\.el-sub-menu__title\s+span/);
  assert.match(collapsedSettingsRule, /display:\s*flex/);
  assert.match(collapsedSettingsRule, /width:\s*100%/);
  assert.match(collapsedSettingsLabelRule, /display:\s*none/);
  assert.match(styles, /\.shell\s*>\s*\.sidebar\s*\{[^}]*width:\s*var\(--shell-sidebar-width\)\s*!important/s);
  assert.match(styles, /\.shell:not\(\.sidebar-collapsed\)\s+\.shell-menu\s+\.el-menu-item\s+span/);
  assert.match(shellRule, /min-width:\s*0/);
  assert.match(shellRule, /height:\s*100%/);
  assert.match(shellMainRule, /min-width:\s*0/);
  assert.match(contentRule, /min-width:\s*0/);
  assert.match(contentRule, /overflow:\s*auto\s*!important/);
  assert.match(shellMenuRule, /overflow-x:\s*hidden/);
  assert.match(shellMenuRule, /overflow-y:\s*auto/);
  assert.match(viewportRule, /height:\s*100%/);
  assert.match(pageRule, /height:\s*100%/);
  assert.match(pageRule, /min-height:\s*0/);
  assert.doesNotMatch(styles, /@media\s*\(max-width:/);
  assert.doesNotMatch(styles, /min-width:\s*(?:1100|1200)px/);
  assert.match(runnerContentRule, /color:\s*inherit/);
  assert.match(styles, /\.dark\s*\{[^}]*--shell-bg:\s*#15191d/s);
  assert.match(styles, /\.dark\s+\.shell\s*>\s*\.sidebar/);
  assert.match(styles, /\.dark\s+\.topbar/);
});
