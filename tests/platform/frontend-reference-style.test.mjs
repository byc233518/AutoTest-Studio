import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('前端外壳采用 ElephasCRM 风格的浅色管理后台结构', async () => {
  const [styles, script] = await Promise.all([
    readFile('web/styles.css', 'utf8'),
    readFile('web/app.js', 'utf8')
  ]);

  assert.match(styles, /--ele-primary:\s*#7c3aed/);
  assert.match(styles, /\.app-shell\s*{[^}]*display:\s*flex/s);
  assert.match(styles, /\.sidebar\s*{[^}]*background:\s*rgba\(255,\s*255,\s*255/s);
  assert.match(styles, /\.topbar\s*{[^}]*position:\s*sticky/s);
  assert.match(styles, /\.tabs-bar\s*{/);
  assert.match(script, /class="tabs-bar"/);
});
