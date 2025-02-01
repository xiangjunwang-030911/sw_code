import { defineStore } from 'pinia';
import store from '@/store/pinia';
import { GetLanguageListApiResult, LoginApiResult } from '@/api/auth/authModel';
import {
  CUSTOMER_AS_KEY,
  EP_ENABLE_INT_KEY,
  EP_KLOUD_API_DOMAIN_KEY,
  EP_KLOUD_API_SYNC_DOMAIN_KEY,
  EP_KLOUD_COMPANY_ID_KEY,
  EP_KLOUD_PAGE_DOMAIN_KEY,
  EP_KLOUD_TOKEN_KEY,
  EP_SUB_SYSTEM_ID_KEY,
  KNOWLEDGE_PROJECT_ID_KEY,
  LANGUAGE_KEY,
  LANGUAGE_LIST_KEY,
  SP_ENABLE_INT_KEY,
  SP_KLOUD_API_DOMAIN_KEY,
  SP_KLOUD_API_SYNC_DOMAIN_KEY,
  SP_KLOUD_COMPANY_ID_KEY,
  SP_KLOUD_PAGE_DOMAIN_KEY,
  SP_KLOUD_TOKEN_KEY,
  SP_SUB_SYSTEM_ID_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
} from '@/enums/cacheEnum';
import { epLoginApi, spLoginApi } from '@/api/auth';
import { LanguageIdEnum } from '@/enums/commonEnum';
import { useThemeStoreWithOut } from './theme';
import router from '@/router';
import { useSysStoreWithOut } from './sys';

interface AuthState {
  userInfo: LoginApiResult;
  languageId: LanguageIdEnum | null;
  languageList: GetLanguageListApiResult[];
}

interface LoginParams {
  client: string;
  username: string;
  password: string;
}

export const useAuthStore = defineStore({
  id: 'store-auth',
  state: (): AuthState => ({
    userInfo: {
      token: '',
      userId: 0,
      fName: '',
      lName: '',
      eMail: '',
      baseProjectId: 0,
      projectIds: [],
    },
    languageId: null,
    languageList: [],
  }),
  getters: {
    getUserInfo: (state): LoginApiResult => {
      if (state.userInfo.userId) {
        return state.userInfo;
      } else {
        const userInfo =
          JSON.parse(localStorage.getItem(USER_INFO_KEY) as string) || {};
        return userInfo;
      }
    },
    getProjectId(): number[] {
      return this.getUserInfo.projectIds;
    },
    getUserId(): number {
      return this.getUserInfo.userId;
    },
    getLanguageList(state): GetLanguageListApiResult[] {
      if (state.languageList.length) {
        return state.languageList;
      } else {
        const languageList =
          JSON.parse(localStorage.getItem(LANGUAGE_LIST_KEY) as string) || [];
        return languageList;
      }
    },
    getLanguageId(): number {
      if (!this.getLanguageList.length) {
        return 0;
      } else if (this.languageId != null) {
        return this.languageId;
      } else {
        const languageId =
          localStorage.getItem(LANGUAGE_KEY) || LanguageIdEnum.EN;
        return Number(languageId);
      }
    },
    getBaseProjectId(): number {
      return this.getUserInfo.baseProjectId;
    },
  },
  actions: {
    async login({ client, username, password }: LoginParams) {
      const sysStore = useSysStoreWithOut();
      let res;
      if (client === 'sp') {
        res = await spLoginApi({
          username,
          password: btoa(password),
        });
      } else {
        res = await epLoginApi({
          username,
          password: btoa(password),
        });
      }
      localStorage.setItem(TOKEN_KEY, res.token);
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(res));
      this.userInfo = res;
      sysStore.getIntegratedSystem();
    },
    logout() {
      const themeStore = useThemeStoreWithOut();
      this.clearLoginLocalStorage();
      setTimeout(() => {
        router
          .replace({
            path: `/${themeStore.getTheme}/login`,
          })
          .then(
            //刷新清一下store
            () => location.reload(),
          );
      }, 500);
    },
    setLanguage(languageId: number) {
      this.languageId = languageId;
      localStorage.setItem(LANGUAGE_KEY, String(languageId));
    },
    setLanguageList(languageList: GetLanguageListApiResult[]) {
      this.languageList = languageList;
      localStorage.setItem(LANGUAGE_LIST_KEY, JSON.stringify(languageList));
    },
    clearLoginLocalStorage() {
      //退出后需要清理的缓存数据
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_INFO_KEY);
      localStorage.removeItem(EP_ENABLE_INT_KEY);
      localStorage.removeItem(SP_ENABLE_INT_KEY);
      localStorage.removeItem(EP_KLOUD_API_DOMAIN_KEY);
      localStorage.removeItem(SP_KLOUD_API_DOMAIN_KEY);
      localStorage.removeItem(EP_KLOUD_PAGE_DOMAIN_KEY);
      localStorage.removeItem(SP_KLOUD_PAGE_DOMAIN_KEY);
      localStorage.removeItem(EP_KLOUD_TOKEN_KEY);
      localStorage.removeItem(SP_KLOUD_TOKEN_KEY);
      localStorage.removeItem(EP_SUB_SYSTEM_ID_KEY);
      localStorage.removeItem(SP_SUB_SYSTEM_ID_KEY);
      localStorage.removeItem(EP_KLOUD_COMPANY_ID_KEY);
      localStorage.removeItem(SP_KLOUD_COMPANY_ID_KEY);
      localStorage.removeItem(EP_KLOUD_API_SYNC_DOMAIN_KEY);
      localStorage.removeItem(SP_KLOUD_API_SYNC_DOMAIN_KEY);
      localStorage.removeItem(KNOWLEDGE_PROJECT_ID_KEY);
      localStorage.removeItem(CUSTOMER_AS_KEY);
    },
  },
});

// Need to be used outside the setup
export function useAuthStoreWithOut() {
  return useAuthStore(store);
}
