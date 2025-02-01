import { MenuGroupEnum } from '@/enums/projectEnum';
import { AppRouteRecordRaw } from './typing';

const routes: AppRouteRecordRaw[] = [
  {
    name: 'SP-CMDB',
    path: '/sp/cmdb',
    component: () => import('@/views/SP/CMDB/index.vue'),
    meta: {
      title: 'CMDB',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Defect',
    path: '/sp/defect',
    component: () => import('@/views/SP/Defect/index.vue'),
    meta: {
      title: '',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Event',
    path: '/sp/event',
    component: () => import('@/views/SP/Event/index.vue'),
    meta: {
      title: '事件管理',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Event-Add',
    path: '/sp/event/add',
    component: () => import('@/views/SP/Event/Add/index.vue'),
    meta: {
      title: '新增事件',
    },
  },
  {
    name:'SP-State-Add',
    path:'/sp/State/add',
    component:()=>import('@/views/SP/State/Add/index.vue'),
    meta:{
      title:'新增状态',
    }
  },
  {
    name: 'SP-Event-Details',
    path: '/sp/event/details/:id',
    component: () => import('@/views/SP/Event/Details/index.vue'),
    meta: {
      title: '事件-$id',
    },
  },
  {
    name: 'SP-Event-EmployeeDetails',
    path: '/sp/event/employeeDetails/:id',
    component: () => import('@/views/SP/Event/EmployeeDetails/index.vue'),
    meta: {
      title: '客户详情',
    },
  },
  {
    name: 'SP-Home',
    path: '/sp/home',
    component: () => import('@/views/SP/Home/index.vue'),
    meta: {
      title: '首页',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Knowledge',
    path: '/sp/knowledge',
    component: () => import('@/views/SP/Knowledge/index.vue'),
    meta: {
      title: '知识管理',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Management',
    path: '/sp/management',
    component: () => import('@/views/SP/Management/index.vue'),
    meta: {
      title: '项目管理',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Performance',
    path: '/sp/performance',
    component: () => import('@/views/SP/Performance/index.vue'),
    meta: {
      title: '效能分析',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Problem',
    path: '/sp/problem',
    component: () => import('@/views/SP/Problem/index.vue'),
    meta: {
      title: '问题管理',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Publish',
    path: '/sp/publish',
    component: () => import('@/views/SP/Publish/index.vue'),
    meta: {
      title: '发布管理',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Quality',
    path: '/sp/quality',
    component: () => import('@/views/SP/Quality/index.vue'),
    meta: {
      title: '质量管理',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Requirement',
    path: '/sp/requirement',
    component: () => import('@/views/SP/Requirement/index.vue'),
    meta: {
      title: '需求管理',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Setting',
    path: '/sp/setting',
    component: () => import('@/views/SP/Setting/index.vue'),
    meta: {
      title: '设置',
    },
  },
  {
    name: 'SP-Team',
    path: '/sp/team',
    component: () => import('@/views/SP/Team/index.vue'),
    meta: {
      title: '团队管理',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Continuity',
    path: '/sp/continuity',
    component: () => import('@/views/SP/Continuity/index.vue'),
    meta: {
      title: '连续性管理',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Availability',
    path: '/sp/availability',
    component: () => import('@/views/SP/Availability/index.vue'),
    meta: {
      title: '可用性管理',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Hrscc',
    path: '/sp/hrscc',
    component: () => import('@/views/SP/Hrscc/index.vue'),
    meta: {
      title: 'HRSCC工单',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Document',
    path: '/sp/document',
    component: () => import('@/views/SP/Document/index.vue'),
    meta: {
      title: '文档管理',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'SP-Chat',
    path: '/sp/chat',
    component: () => import('@/views/SP/Chat/index.vue'),
    meta: {
      title: '智能AI客服',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name:'SP-State',
    path:'/sp/state',
    component:()=>import('@/views/SP/State/index.vue'),
    meta:{
      title:'状态管理',
      group:MenuGroupEnum.MODULE,
    }
  },
];
export default routes;
