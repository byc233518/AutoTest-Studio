import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('项目切换器提供整包导出和导入', async () => {
  const [switcher, preload, main] = await Promise.all([
    readFile('frontend/src/components/ProjectSwitcher.vue', 'utf8'),
    readFile('desktop/preload.cjs', 'utf8'),
    readFile('desktop/main.mjs', 'utf8')
  ]);
  assert.match(switcher, /导出项目/);
  assert.match(switcher, /导入项目/);
  assert.match(switcher, /autotestDesktop\.exportProject/);
  assert.match(switcher, /autotestDesktop\.importProject/);
  assert.match(preload, /exportProject: 'autotest:projects:export'/);
  assert.match(preload, /importProject: 'autotest:projects:import'/);
  assert.match(main, /exportActiveProject/);
  assert.match(main, /importProjectArchive/);
  assert.match(main, /unpackProjectArchiveFile/);
});
