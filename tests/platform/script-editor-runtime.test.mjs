import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { javascript } from '@codemirror/lang-javascript';
import { lintGutter, linter } from '@codemirror/lint';
import { EditorState } from '@codemirror/state';

const codeMirrorPackages = [
  '@codemirror/commands',
  '@codemirror/lang-javascript',
  '@codemirror/language',
  '@codemirror/lint',
  '@codemirror/search',
  '@codemirror/state',
  '@codemirror/view'
];

test('CodeMirror lint 扩展与编辑器共享同一个 EditorState 实例', () => {
  assert.doesNotThrow(() => EditorState.create({
    doc: 'const value = 1;',
    extensions: [javascript(), lintGutter(), linter(() => [])]
  }));
});

test('Vite 对 CodeMirror 扩展及其状态依赖使用单一模块实例', async () => {
  const source = await readFile(new URL('../../vite.config.js', import.meta.url), 'utf8');
  const configured = codeMirrorPackages.filter((packageName) => source.includes(`'${packageName}'`));
  assert.deepEqual(configured, codeMirrorPackages);
});
