import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './styles.css';
import './login.css';
import './shell.css';
import App from './App.vue';
import { initializeTheme } from './theme';

initializeTheme();
createApp(App).use(createPinia()).use(ElementPlus, { locale: zhCn }).mount('#app');
