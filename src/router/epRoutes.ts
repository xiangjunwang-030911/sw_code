import { MenuGroupEnum, ButtonClickEnum } from '@/enums/projectEnum';
import { AppRouteRecordRaw } from './typing';
import { NeedCacheIframe } from '@/enums/iframeEnum';

const routes: AppRouteRecordRaw[] = [
  {
    name: 'EP-Add',
    path: '/ep/event/add',
    component: () => import('@/views/EP/Event/Add.vue'),
    meta: {
      title: '事件添加',
      group: ButtonClickEnum.EVENT_ADD,
    },
  },
  {
    name: 'EP-Event',
    path: '/ep/event',
    component: () => import('@/views/EP/Event/index.vue'),
    meta: {
      title: '事件列表',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'EP-Event-Details',
    path: '/ep/event/details',
    component: () => import('@/views/EP/Event/Details/index.vue'),
    meta: {
      title: '事件-$id',
    },
  },
  {
    name: 'EP-Home',
    path: '/ep/home',
    component: () => import('@/views/EP/Home/index.vue'),
    meta: {
      title: '首页',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'EP-Knowledge',
    path: '/ep/knowledge',
    component: () => import('@/views/EP/Knowledge/index.vue'),
    meta: {
      title: '知识库',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'EP-Knowledge-Details',
    path: '/ep/knowledge/details',
    component: () => import('@/views/EP/Knowledge/Details/index.vue'),
    meta: {
      title: '知识-$id',
    },
  },
  {
    name: 'EP-Meeting',
    path: '/ep/meeting',
    component: () => import('@/views/EP/Meeting/index.vue'),
    meta: {
      title: '会议列表',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'EP-UserInfo',
    path: '/ep/userinfo',
    component: () => import('@/views/EP/UserInfo/index.vue'),
    meta: {
      title: '用户信息',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'EP-CustomerInfo',
    path: '/ep/customerInfo',
    component: () => import('@/views/EP/CustomerInfo/index.vue'),
    meta: {
      title: '员工信息',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'EP-Service-Counter',
    path: '/ep/service/counter/:id',
    component: () => import('@/views/EP/Service/index.vue'),
    meta: {
      title: '01-服务事件管理',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'EP-Service-Item',
    path: '/ep/service/counter/:id/:groupId',
    component: () => import('@/views/EP/Service/index.vue'),
    meta: {
      title: '桌面支持',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'EP-Chat',
    path: '/ep/chat',
    component: () => import('@/views/EP/Chat/index.vue'),
    meta: {
      title: '智能AI客服',
      group: MenuGroupEnum.MODULE,
    },
  },
  {
    name: 'EP-LiveSync',
    path: '/ep/liveSync/:id/:type',
    component: () => import('@/components/Iframe/LiveSyncMeeting/index.vue'),
    meta: {
      title: 'LiveSync-$id',
      name: 'LiveSyncMeeting',
      iframeName: NeedCacheIframe.LIVE_SYNC_MEETING,
      keepIframeAlive: true,
    },
  },
];
export default routes;
