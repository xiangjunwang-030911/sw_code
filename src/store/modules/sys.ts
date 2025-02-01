import { defineStore } from 'pinia';
import store from '@/store/pinia';
import {
  getIntegratedSystemApi,
  getKloudCompanyApi,
  getKloudTokenApi,
} from '@/api/sys';
import { SettingItemIdEnum } from '@/enums/integrationEnum';
import { useThemeStoreWithOut } from './theme';
import {
  EP_ENABLE_INT_KEY,
  EP_KLOUD_API_DOMAIN_KEY,
  EP_KLOUD_API_SYNC_DOMAIN_KEY,
  EP_KLOUD_COMPANY_ID_KEY,
  EP_KLOUD_PAGE_DOMAIN_KEY,
  EP_KLOUD_TOKEN_KEY,
  EP_SUB_SYSTEM_ID_KEY,
  SP_ENABLE_INT_KEY,
  SP_KLOUD_API_DOMAIN_KEY,
  SP_KLOUD_API_SYNC_DOMAIN_KEY,
  SP_KLOUD_COMPANY_ID_KEY,
  SP_KLOUD_PAGE_DOMAIN_KEY,
  SP_KLOUD_TOKEN_KEY,
  SP_SUB_SYSTEM_ID_KEY,
} from '@/enums/cacheEnum';
import { ThemeEnum } from '@/enums/themeEnum';
import { useAuthStoreWithOut } from './auth';
interface SysState {
  enableINT: boolean | null;
  subSystemId: number | null;
  kloudApiDomain: string | null;
  kloudApiSyncDomain: string | null;
  kloudPageDomain: string | null;
  kloudToken: string | null;
  kloudCompanyId: number | null;
}

export const useSysStore = defineStore({
  id: 'store-sys',
  state: (): SysState => ({
    enableINT: null,
    subSystemId: null,
    kloudApiDomain: null,
    kloudApiSyncDomain: null,
    kloudPageDomain: null,
    kloudToken: null,
    kloudCompanyId: null,
  }),
  getters: {
    getEnableINT(state) {
      const themeStore = useThemeStoreWithOut();
      const cacheKey =
        themeStore.getTheme == ThemeEnum.EP
          ? EP_ENABLE_INT_KEY
          : SP_ENABLE_INT_KEY;

      if (state.enableINT !== null) {
        return state.enableINT;
      } else {
        return !!localStorage.getItem(cacheKey) || false;
      }
    },
    getSubSystemId(state) {
      const themeStore = useThemeStoreWithOut();
      const cacheKey =
        themeStore.getTheme == ThemeEnum.EP
          ? EP_SUB_SYSTEM_ID_KEY
          : SP_SUB_SYSTEM_ID_KEY;

      if (state.subSystemId !== null) {
        return state.subSystemId;
      } else {
        return Number(localStorage.getItem(cacheKey)) || null;
      }
    },
    getKloudApiDomain(state) {
      const themeStore = useThemeStoreWithOut();
      const cacheKey =
        themeStore.getTheme == ThemeEnum.EP
          ? EP_KLOUD_API_DOMAIN_KEY
          : SP_KLOUD_API_DOMAIN_KEY;
      if (state.kloudApiDomain !== null) {
        return state.kloudApiDomain;
      } else {
        return JSON.parse(localStorage.getItem(cacheKey) as string) || null;
      }
    },
    getKloudApiSyncDomain(state) {
      const themeStore = useThemeStoreWithOut();
      const cacheKey =
        themeStore.getTheme == ThemeEnum.EP
          ? EP_KLOUD_API_SYNC_DOMAIN_KEY
          : SP_KLOUD_API_SYNC_DOMAIN_KEY;
      if (state.kloudApiSyncDomain !== null) {
        return state.kloudApiSyncDomain;
      } else {
        return JSON.parse(localStorage.getItem(cacheKey) as string) || null;
      }
    },
    getKloudPageDomain(state) {
      const themeStore = useThemeStoreWithOut();
      const cacheKey =
        themeStore.getTheme == ThemeEnum.EP
          ? EP_KLOUD_PAGE_DOMAIN_KEY
          : SP_KLOUD_PAGE_DOMAIN_KEY;
      if (state.kloudPageDomain !== null) {
        return state.kloudPageDomain;
      } else {
        return JSON.parse(localStorage.getItem(cacheKey) as string) || null;
      }
    },
    getKloudToken(state) {
      const themeStore = useThemeStoreWithOut();
      const cacheKey =
        themeStore.getTheme == ThemeEnum.EP
          ? EP_KLOUD_TOKEN_KEY
          : SP_KLOUD_TOKEN_KEY;
      if (state.kloudToken !== null) {
        return state.kloudToken;
      } else {
        return (localStorage.getItem(cacheKey) as string) || null;
      }
    },
    getKloudCompanyId(state) {
      const themeStore = useThemeStoreWithOut();
      const cacheKey =
        themeStore.getTheme == ThemeEnum.EP
          ? EP_KLOUD_COMPANY_ID_KEY
          : SP_KLOUD_COMPANY_ID_KEY;

      if (state.kloudCompanyId !== null) {
        return state.kloudCompanyId;
      } else {
        return Number(localStorage.getItem(cacheKey)) || null;
      }
    },
  },
  actions: {
    async getIntegratedSystem() {
      const themeStore = useThemeStoreWithOut();
      const res = await getIntegratedSystemApi();
      const isEP = themeStore.getTheme == ThemeEnum.EP;
      res.forEach((item) => {
        switch (item.settingItemID) {
          case SettingItemIdEnum.ENABLE_INT:
            this.enableINT = !!item.settingValue;
            localStorage.setItem(
              isEP ? EP_ENABLE_INT_KEY : SP_ENABLE_INT_KEY,
              JSON.stringify(this.enableINT),
            );
            break;
          case SettingItemIdEnum.SUB_SYSTEM_ID:
            this.subSystemId = item.settingValue;
            localStorage.setItem(
              isEP ? EP_SUB_SYSTEM_ID_KEY : SP_SUB_SYSTEM_ID_KEY,
              JSON.stringify(this.subSystemId),
            );
            break;
          case SettingItemIdEnum.KLOUD_API_DOMAIN:
            this.kloudApiDomain = item.settingText as string;
            localStorage.setItem(
              isEP ? EP_KLOUD_API_DOMAIN_KEY : SP_KLOUD_API_DOMAIN_KEY,
              JSON.stringify(this.kloudApiDomain),
            );
            break;
          case SettingItemIdEnum.KLOUD_PAGE_DOMAIN:
            this.kloudPageDomain = item.settingText as string;
            localStorage.setItem(
              isEP ? EP_KLOUD_PAGE_DOMAIN_KEY : SP_KLOUD_PAGE_DOMAIN_KEY,
              JSON.stringify(this.kloudPageDomain),
            );
            break;
          case SettingItemIdEnum.KLOUD_API_SYNC_DOMAIN:
            this.kloudApiSyncDomain = item.settingText as string;
            localStorage.setItem(
              isEP
                ? EP_KLOUD_API_SYNC_DOMAIN_KEY
                : SP_KLOUD_API_SYNC_DOMAIN_KEY,
              JSON.stringify(this.kloudApiSyncDomain),
            );
            break;
          default:
            break;
        }
      });
      if (this.enableINT) {
        this.getKloudTokenAction();
      }
    },
    async getKloudTokenAction() {
      const themeStore = useThemeStoreWithOut();
      const authStore = useAuthStoreWithOut();
      const res = await getKloudTokenApi({
        LoginName: authStore.getUserInfo.fName + authStore.getUserInfo.lName,
        Phone: '',
        Email: authStore.getUserInfo.eMail,
        SubSystemID: this.getSubSystemId as number,
        UniqueID: `${this.getSubSystemId}-${authStore.getUserId}-100`,
      });
      this.kloudToken = res.RetData;
      localStorage.setItem(
        themeStore.getTheme == ThemeEnum.EP
          ? EP_KLOUD_TOKEN_KEY
          : SP_KLOUD_TOKEN_KEY,
        this.kloudToken,
      );
      this.getKloudCompany({
        UserToken: this.kloudToken,
        subSystemId: this.getSubSystemId as number,
      });
    },
    async getKloudCompany(payload: { UserToken: string; subSystemId: number }) {
      const themeStore = useThemeStoreWithOut();
      const res = await getKloudCompanyApi(payload);
      this.kloudCompanyId = res.data.companyId;
      localStorage.setItem(
        themeStore.getTheme == ThemeEnum.EP
          ? EP_KLOUD_COMPANY_ID_KEY
          : SP_KLOUD_COMPANY_ID_KEY,
        JSON.stringify(this.kloudCompanyId),
      );
    },
  },
});

// Need to be used outside the setup
export function useSysStoreWithOut() {
  return useSysStore(store);
}
