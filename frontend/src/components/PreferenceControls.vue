<template>
  <div class="preference-controls" :class="{ compact }">
    <el-dropdown trigger="click" @command="setTheme">
      <button type="button" class="pref-button" :aria-label="t('theme.label')">
        <el-icon><Sunny v-if="resolvedTheme === 'dark'" /><Moon v-else /></el-icon>
        <span v-if="!iconOnly">{{ themeLabel }}</span>
      </button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="option in themeOptions"
            :key="option.value"
            :command="option.value"
            :class="{ 'is-active': themeMode === option.value }"
          >
            {{ option.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dropdown trigger="click" @command="setLocale">
      <button type="button" class="pref-button" :aria-label="t('locale.label')">
        <el-icon>
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a14 14 0 0 1 0 18" />
            <path d="M12 3a14 14 0 0 0 0 18" />
          </svg>
        </el-icon>
        <span v-if="!iconOnly">{{ localeLabel }}</span>
      </button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in locales"
            :key="item.value"
            :command="item.value"
            :class="{ 'is-active': locale === item.value }"
          >
            {{ t(item.labelKey) }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Moon, Sunny } from '@element-plus/icons-vue';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';

defineProps({
  iconOnly: { type: Boolean, default: false },
  compact: { type: Boolean, default: false }
});

const { themeMode, resolvedTheme, setTheme } = useTheme();
const { locale, locales, t, setLocale } = useI18n();

const themeOptions = computed(() => [
  { label: t('theme.light'), value: 'light' },
  { label: t('theme.dark'), value: 'dark' },
  { label: t('theme.system'), value: 'system' }
]);

const themeLabel = computed(() => {
  const match = themeOptions.value.find((item) => item.value === themeMode.value);
  return match?.label || t('theme.label');
});

const localeLabel = computed(() => {
  const match = locales.find((item) => item.value === locale.value);
  return match ? t(match.labelKey) : t('locale.label');
});
</script>

<style scoped>
.preference-controls {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.pref-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 0 10px;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  background: var(--el-bg-color);
  color: var(--el-text-color-regular);
  cursor: pointer;
}

.pref-button:hover {
  border-color: var(--el-color-primary-light-5);
  color: var(--el-color-primary);
}

.compact .pref-button {
  min-width: 32px;
  padding: 0 8px;
  justify-content: center;
}

:deep(.el-dropdown-menu__item.is-active) {
  color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
}
</style>
