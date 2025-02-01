import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import i18n from '@/i18n';
import '@/assets/css/tailwind.css';
import GlobalComponent from '@/vue/globalComponent';
import 'virtual:svg-icons-register';
import './common/css/global.scss';
import ElementPlus  from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/common/css/ui-theme.scss';
import pinia from '@/store/pinia';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

const app = createApp(App)
  .use(i18n)
  .use(router)
  .use(pinia)
  .use(GlobalComponent)
  .use(autoAnimatePlugin);

  app.use(ElementPlus, {
    locale: zhCn, // 设置中文语言包
  })

app.mount('#app');
