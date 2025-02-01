// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import epRoutes from './epRoutes';
import spRoutes from './spRoutes';
import adminRoutes from './adminRoutes';
import { useThemeStoreWithOut } from '@/store/modules/theme';
import { useTagsViewStoreWithOut } from '@/store/modules/tagsView';
import { ThemeEnum } from '@/enums/themeEnum';
import { RouteLocationNormalized } from 'vue-router';
import { AppRouteRecordRaw } from './typing';
import { RouteRecordRaw } from 'vue-router';
import EPIcon from '@/assets/images/ep-logo.svg';
import SPIcon from '@/assets/images/sw-logo.svg';

const themeStore = useThemeStoreWithOut();
const tagsViewStore = useTagsViewStoreWithOut();

const routes: AppRouteRecordRaw[] = [
  {
    name: 'fosunpharmaceutical',
    path: '/dashboard/fosunpharmaceutical',
    component: () => import('@/pages/DashBoard/FosunPharmaceutical'),
    meta: {
      title: '复星医药',
    },
  },
  {
    name:'haojing',
    path:'/dashboard/haojing',
    component:()=>import('@/pages/DashBoard/HaoJing'),
    meta:{
      title:'浩鲸',
    },
  },
  {
    name: 'ep-login',
    path: '/ep/login',
    component: () => import('@/pages/Login'),
    meta: {
      title: '登录',
    },
  },
  {
    name: 'sp-login',
    path: '/sp/login',
    component: () => import('@/pages/Login'),
    meta: {
      title: '登录',
    },
  },
  {
    name: 'ep',
    path: '/ep',
    redirect: '/ep/home',
    meta: {
      title: '首页',
    },
  },
  {
    name: 'sp',
    path: '/sp',
    redirect: '/sp/home',
    meta: {
      title: '首页',
    },
  },
  // {
  //   name: 'admin',
  //   path: '/admin',
  //   redirect: '/admin/home',
  //   meta: {
  //     title: '首页',
  //   },
  // },
  {
    name: '/',
    path: '/',
    component: () => import('../layout/index.vue'),
    children: [...epRoutes, ...spRoutes, ...adminRoutes],
    redirect: '/sp/home',
    meta: {
      title: '首页',
    },
  },
  //404
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/ErrorPage/404.vue'),
    meta: {
      title: '404',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as unknown as RouteRecordRaw[],
});

const initTabTitleAndIcon = (to: RouteLocationNormalized) => {
  let faviconLink: HTMLLinkElement | null =
    document.querySelector('link[rel="icon"]');
  if (!faviconLink) {
    faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
  }
  if (to.path.indexOf('/admin') !== -1) {
    faviconLink.href = SPIcon;
    document.title = 'ServiceWise';
  } else if (to.path.indexOf('/ep') !== -1) {
    faviconLink.href = EPIcon;
    document.title = 'Employee Portal';
  } else {
    faviconLink.href = SPIcon;
    document.title = 'ServiceWise';
  }
  document.head.appendChild(faviconLink);
};

const replaceTitleVar = (to: RouteLocationNormalized): string => {
  if (to.query.id) {
    return to.meta.title.replace('$id', to.query.id as string);
  } else if (to.params.id) {
    return to.meta.title.replace('$id', to.params.id as string);
  } else {
    return to.meta.title;
  }
};

const initRefreshTags = (to: RouteLocationNormalized) => {
  if (
    tagsViewStore.tagsViewList.length == 1 &&
    to.path !== '/ep/login' &&
    to.path !== '/sp/login'
  ) {
    const meta = to.meta;
    if (!meta.title) return;
    const name = to.fullPath;
    meta.title = replaceTitleVar(to);
    tagsViewStore.addTagsViewList({
      title: meta.title,
      name,
      group: meta.group as string,
      meta: to.meta,
    });
  }
};

const changeThemeAndProject = (to: RouteLocationNormalized) => {
  if (to.path.indexOf('/sp') !== -1) {
    themeStore.changeTheme(ThemeEnum.SP, themeStore.getMode);
    tagsViewStore.changeProject(ThemeEnum.SP);
  } else if (to.path.indexOf('/ep') !== -1) {
    themeStore.changeTheme(ThemeEnum.EP, themeStore.getMode);
    tagsViewStore.changeProject(ThemeEnum.EP);
  } else if (to.path.indexOf('/admin') !== -1) {
    themeStore.changeTheme(ThemeEnum.SP, themeStore.getMode);
    tagsViewStore.changeProject(ThemeEnum.ADMIN);
  } else {
    themeStore.changeTheme(ThemeEnum.EP, themeStore.getMode);
  }
  tagsViewStore.changeActiveName(to.fullPath);
  if (to.path.indexOf('login') !== -1) {
    themeStore.changeTheme(ThemeEnum.EP, themeStore.getMode);
  }
};

router.beforeEach((to, _, next) => {
  initTabTitleAndIcon(to);
  initRefreshTags(to);
  changeThemeAndProject(to);
  next();
});

export default router;
