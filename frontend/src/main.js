import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './styles.css';
import './login.css';
import './shell.css';
import App from './App.vue';
import { initializeTheme } from './theme';
import { initializeI18n } from './i18n';

initializeTheme();
initializeI18n();
createApp(App).use(createPinia()).use(ElementPlus).mount('#app');
