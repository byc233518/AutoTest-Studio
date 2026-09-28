import { computed, ref } from 'vue';

const STORAGE_KEY = 'autotest-theme-mode';
const allowedModes = new Set(['light', 'dark', 'system']);
const themeMode = ref(readStoredTheme());
const resolvedTheme = ref('light');
let mediaQuery;
let listening = false;

function readStoredTheme() {
  const value = globalThis.localStorage?.getItem(STORAGE_KEY);
  return allowedModes.has(value) ? value : 'system';
}

function resolve(mode) {
  if (mode !== 'system') return mode;
  return globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply() {
  const next = resolve(themeMode.value);
  resolvedTheme.value = next;
  document.documentElement.classList.toggle('dark', next === 'dark');
  document.documentElement.dataset.theme = next;
  document.documentElement.style.colorScheme = next;
}

function listen() {
  if (listening || !globalThis.matchMedia) return;
  listening = true;
  mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', apply);
}

export function initializeTheme() {
  listen();
  apply();
  if (globalThis.autotestDesktop?.getTheme) {
    globalThis.autotestDesktop.getTheme()
      .then((mode) => {
        if (!allowedModes.has(mode)) return;
        themeMode.value = mode;
        apply();
      })
      .catch(() => {});
  }
}

export function useTheme() {
  listen();
  const setTheme = (mode) => {
    if (!allowedModes.has(mode)) return;
    themeMode.value = mode;
    globalThis.localStorage?.setItem(STORAGE_KEY, mode);
    if (globalThis.autotestDesktop?.setTheme) {
      void globalThis.autotestDesktop.setTheme(mode).catch(() => {});
    }
    apply();
  };
  return {
    themeMode,
    resolvedTheme: computed(() => resolvedTheme.value),
    setTheme
  };
}
