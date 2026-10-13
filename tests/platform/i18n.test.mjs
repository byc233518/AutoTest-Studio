import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('i18n provides Chinese and English shell strings', async () => {
  const moduleUrl = pathToFileURL(path.join(root, 'frontend/src/i18n/index.js')).href;
  const { useI18n, t } = await import(moduleUrl);
  const { setLocale } = useI18n();

  setLocale('zh-CN');
  assert.equal(t('app.menu.scenarios'), '测试用例');
  assert.equal(t('login.submit'), '登录平台');

  setLocale('en-US');
  assert.equal(t('app.menu.scenarios'), 'Test cases');
  assert.equal(t('login.submit'), 'Sign in');
  assert.equal(t('settings.language'), 'Interface language');
});
