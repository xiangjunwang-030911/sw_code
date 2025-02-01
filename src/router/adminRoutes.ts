import { AppRouteRecordRaw } from './typing';

const routes: AppRouteRecordRaw[] = [
  {
    name: 'Admin-Change',
    path: '/admin/change',
    component: () => import('@/views/Admin/Change/index.vue'),
    meta: {
      title: '变更管理',
    },
  },
  {
    name: 'Admin-CMDB',
    path: '/admin/cmdb',
    component: () => import('@/views/Admin/CMDB/index.vue'),
    meta: {
      title: 'CMDB',
    },
  },
  {
    name: 'Admin-Defect',
    path: '/admin/defect',
    component: () => import('@/views/Admin/Defect/index.vue'),
    meta: {
      title: '缺陷管理',
    },
  },
  {
    name: 'Admin-Event',
    path: '/admin/event',
    component: () => import('@/views/Admin/Event/index.vue'),
    meta: {
      title: '事件管理',
    },
  },
  {
    name: 'Admin-Home',
    path: '/admin/home',
    component: () => import('@/views/Admin/Home/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    name: 'Admin-Knowledge',
    path: '/admin/knowledge',
    component: () => import('@/views/Admin/Knowledge/index.vue'),
    meta: {
      title: '知识管理',
    },
  },
  {
    name: 'Admin-Management',
    path: '/admin/management',
    component: () => import('@/views/Admin/Management/index.vue'),
    meta: {
      title: '项目管理',
    },
  },
  {
    name: 'Admin-Problem',
    path: '/admin/problem',
    component: () => import('@/views/Admin/Problem/index.vue'),
    meta: {
      title: '问题管理',
    },
  },
  {
    name: 'Admin-Publish',
    path: '/admin/publish',
    component: () => import('@/views/Admin/Publish/index.vue'),
    meta: {
      title: '发布管理',
    },
  },
  {
    name: 'Admin-Quality',
    path: '/admin/quality',
    component: () => import('@/views/Admin/Quality/index.vue'),
    meta: {
      title: '质量管理',
    },
  },
  {
    name: 'Admin-Requirement',
    path: '/admin/requirement',
    component: () => import('@/views/Admin/Requirement/index.vue'),
    meta: {
      title: '需求管理',
    },
  },
  {
    name: 'Admin-Setting',
    path: '/admin/setting',
    redirect: '/admin/setting/personnelManagement',
    component: () => import('@/views/Admin/Setting/index.vue'),
    meta: {
      title: '系统设置',
    },
    children: [
      {
        name: 'Admin-Department',
        path: 'department',
        component: () => import('@/views/Admin/Setting/Department/index.vue'),
        meta: {
          title: '系统设置',
        },
      },
      {
        name: 'Admin-PersonnelManagement',
        path: 'personnelManagement',
        component: () =>
          import('@/views/Admin/Setting/PersonnelManagement/index.vue'),
        meta: {
          title: '系统设置',
        },
      },
      {
        name: 'Admin-LogManagement',
        path: 'logManagement',
        component: () =>
          import('@/views/Admin/Setting/LogManagement/index.vue'),
        meta: {
          title: '系统设置',
        },
      },
      {
        name: 'Admin-LicenseManagement',
        path: 'licenseManagement',
        component: () =>
          import('@/views/Admin/Setting/LicenseManagement/index.vue'),
        meta: {
          title: '系统设置',
        },
      },
      {
        name: 'Admin-BasicParams',
        path: 'basicParams',
        component: () => import('@/views/Admin/Setting/BasicParams/index.vue'),
        meta: {
          title: '系统设置',
        },
      },
      {
        name: 'Admin-DocumentServer',
        path: 'documentServer',
        component: () =>
          import('@/views/Admin/Setting/DocumentServer/index.vue'),
        meta: {
          title: '系统设置',
        },
      },
      {
        name: 'Admin-AnnouncementManagement',
        path: 'announcementManagement',
        component: () =>
          import('@/views/Admin/Setting/AnnouncementManagement/index.vue'),
        meta: {
          title: '系统设置',
        },
      },
      {
        name: 'Admin-LanguagePackImport',
        path: 'languagePackImport',
        component: () =>
          import('@/views/Admin/Setting/LanguagePackImport/index.vue'),
        meta: {
          title: '系统设置',
        },
      },
    ],
  },
];
export default routes;
