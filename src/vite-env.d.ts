/// <reference types="vite/client" />

/// <reference types="element-plus/global.d.ts" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: ReturnType<typeof DefineComponent>;
  export default Component;
}

declare module '@/i18n' {
  import { createI18n } from 'vue-i18n';
  const i18n: createI18n;
  export default i18n;
}
declare module '@/router' {
  import { createRouter } from 'vue-router';
  const router: createRouter;
  export default router;
}
declare module '@/pages/DashBoard/FosunPharmaceutical' {
  import FosunPharmaceutical from '@/pages/DashBoard/FosunPharmaceutical';
  export default FosunPharmaceutical;
}
// declare module '@/pages/DashBoard/HaoJing' {
//   import HaoJing from '@/pages/DashBoard/HaoJing';
//   export default HaoJing;
// }
declare module '@/pages/Login' {
  import Login from '@/pages/Login';
  export default Login;
}

declare module 'element-plus/dist/locale/zh-cn.mjs';
declare module '@/vue/globalComponent';
