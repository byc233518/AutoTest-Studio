import { computed, ref } from 'vue';
import zhCnElement from 'element-plus/es/locale/lang/zh-cn';
import enElement from 'element-plus/es/locale/lang/en';
import zhCN from './locales/zh-CN.js';
import enUS from './locales/en-US.js';

export const LOCALES = Object.freeze([
  { value: 'zh-CN', labelKey: 'locale.zhCN' },
  { value: 'en-US', labelKey: 'locale.enUS' }
]);

const STORAGE_KEY = 'autotest-locale';
const messages = Object.freeze({
  'zh-CN': zhCN,
  'en-US': enUS
});
const elementLocales = Object.freeze({
  'zh-CN': zhCnElement,
  'en-US': enElement
});

const locale = ref(readStoredLocale());

function readStoredLocale() {
  const value = globalThis.localStorage?.getItem(STORAGE_KEY);
  return messages[value] ? value : 'zh-CN';
}

function lookup(dict, path) {
  return path.split('.').reduce((current, part) => {
    if (current && typeof current === 'object' && part in current) return current[part];
    return undefined;
  }, dict);
}

function format(template, params) {
  if (!params) return template;
  return String(template).replace(/\{(\w+)\}/g, (_, key) => (
    params[key] == null ? `{${key}}` : String(params[key])
  ));
}

export function t(key, params) {
  const primary = lookup(messages[locale.value], key);
  if (primary != null) return format(primary, params);
  const fallback = lookup(messages['zh-CN'], key);
  if (fallback != null) return format(fallback, params);
  return key;
}

function applyDocumentLang(next) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = next === 'en-US' ? 'en' : 'zh-CN';
}

export function initializeI18n() {
  applyDocumentLang(locale.value);
  if (globalThis.autotestDesktop?.getLocale) {
    globalThis.autotestDesktop.getLocale()
      .then((value) => {
        if (!messages[value]) return;
        locale.value = value;
        globalThis.localStorage?.setItem(STORAGE_KEY, value);
        applyDocumentLang(value);
      })
      .catch(() => {});
  }
}

export function useI18n() {
  const setLocale = (next) => {
    if (!messages[next]) return;
    locale.value = next;
    globalThis.localStorage?.setItem(STORAGE_KEY, next);
    applyDocumentLang(next);
    if (globalThis.autotestDesktop?.setLocale) {
      void globalThis.autotestDesktop.setLocale(next).catch(() => {});
    }
  };

  return {
    locale,
    locales: LOCALES,
    t,
    setLocale,
    elementLocale: computed(() => elementLocales[locale.value] || zhCnElement)
  };
}
