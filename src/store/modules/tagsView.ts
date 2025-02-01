import { defineStore } from 'pinia';
import store from '@/store/pinia';
import router from '@/router';
import { RouteLocationNormalized, RouteMeta } from 'vue-router';
import { MenuGroupEnum } from '@/enums/projectEnum';
import { IframePostMessageEnum, NeedCacheIframe } from '@/enums/iframeEnum';
import { menuItemGroupProps } from 'element-plus';
import { ITEM_RENDER_EVT } from 'element-plus/es/components/virtual-list/src/defaults';

interface TagsViewListItem {
  name: string;
  title?: string;
  group?: string;
  meta?: RouteMeta;
}
interface TagsViewState {
  tagsViewList: TagsViewListItem[];
  activeName: string;
  currentProject: string;
  cacheTagList: Set<string>;
}

export const useTagsViewStore = defineStore({
  id: 'store-tags-view',
  state: (): TagsViewState => ({
    tagsViewList: [
      { name: '/ep/home', title: '首页', group: MenuGroupEnum.MODULE },
    ],
    activeName: '/ep/home',
    currentProject: 'ep',
    cacheTagList: new Set(),
  }),
  getters: {
    getCachedTagList(state): string[] {
      return Array.from(state.cacheTagList);
    },
  },
  actions: {
    changeProject(project: string) {
      this.currentProject = project;
      if (this.tagsViewList.length >= 2) {
        return;
      }
      const tagName = this.tagsViewList[0].name;
      switch (project) {
        case 'sp':
          if (tagName.indexOf(`/${project}`) == -1) {
            this.initTagsViewList('sp');
          }
          break;
        case 'ep':
          if (tagName.indexOf(`/${project}`) == -1) {
            this.initTagsViewList('ep');
          }
          break;
        default:
          break;
      }
    },
    changeActiveName(payload: string) {
      this.activeName = payload;
    },
    initTagsViewList(payload: string) {
      if (payload == 'ep') {
        this.tagsViewList = [
          { name: '/ep/home', title: '首页', group: MenuGroupEnum.MODULE },
        ];
      } else if (payload == 'sp') {
        this.tagsViewList = [
          { name: '/sp/home', title: '工作台', group: MenuGroupEnum.MODULE },
        ];
      }
      this.updateCacheTag();
    },
    addTagsViewList(payload: TagsViewListItem) {
      const flagIndex = this.tagsViewList.findIndex((item) => {
        if (item.name.includes('/admin/setting')) {
          return true;
        } else {
          return item.name == payload.name;
        }
      });
      if (flagIndex == -1 && !payload.group) {
        this.tagsViewList.push(payload);
      } else if (payload.group) {
        //去除同一个模块的tag
        const index = this.tagsViewList.findIndex(
          (item) => item.group == payload.group,
        );
        if (index >= 0) {
          this.tagsViewList.splice(index, 1, payload);
        } else {
          this.tagsViewList.push(payload);
        }
      }
      this.activeName = payload.name;
      this.updateCacheTag();
    },
    deleteTagsViewList({
      name,
      route,
      forceDelete = false,
    }: {
      name: string;
      route: RouteLocationNormalized;
      forceDelete?: boolean;
    }) {
      if (!forceDelete) {
        const accessDelete = this.beforeDeleteTag(route);
        if (!accessDelete) {
          return;
        }
      }
      const index = this.tagsViewList.map((item) => item.name).indexOf(name);
      this.activeName =
        this.tagsViewList[index + 1]?.name ||
        this.tagsViewList[index - 1]?.name;
      this.tagsViewList.splice(index, 1);
      if (route.fullPath.toLowerCase() != this.activeName.toLowerCase()) {
        router.push(this.activeName);
      }
      this.updateCacheTag();
    },
    updateCacheTag() {
      const cacheMap: Set<string> = new Set();

      for (const tag of this.tagsViewList) {
        const needCache = tag.meta?.keepAlive;
        if (!needCache) {
          continue;
        }
        const name = tag.meta?.name as string;
        cacheMap.add(name);
      }
      this.cacheTagList = cacheMap;
    },
    beforeDeleteTag(route: RouteLocationNormalized) {
      if (route.meta.keepIframeAlive) {
        switch (route.meta.iframeName) {
          case NeedCacheIframe.LIVE_SYNC_MEETING:
            const iframe = document.getElementById(
              'LiveSyncMeeting',
            ) as HTMLIFrameElement;
            iframe!.contentWindow?.postMessage(
              { type: IframePostMessageEnum.CLOSE_SUB_SYNC_MEETING },
              '*',
            );
            return false;
          default:
            break;
        }
      }
      return true;
    },
  },
});

// Need to be used outside the setup
export function useTagsViewStoreWithOut() {
  return useTagsViewStore(store);
}
