import { NeedCacheIframe } from '@/enums/iframeEnum';

export {};

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    title: string;
    keepAlive?: boolean;
    keepIframeAlive?: boolean;
    iframeName?: NeedCacheIframe;
    group?: MenuGroupEnum;
    name?: string; //如果开启keepAlive,那么name必须和组件同名
  }
}
