import { defineStore } from 'pinia';
import store from '@/store/pinia';
import { useTheme } from '@/hooks/theme/useTheme';
import { ModeEnum, ThemeColorEnum, ThemeEnum } from '@/enums/themeEnum';
import { MODE_KEY, THEME_KEY } from '@/enums/cacheEnum';

interface ThemeState {
  theme: ThemeEnum | null;
  mode: ModeEnum | null;
}

export const useThemeStore = defineStore({
  id: 'store-theme',
  state: (): ThemeState => ({
    theme: null,
    mode: null,
  }),
  getters: {
    getTheme(state): ThemeEnum {
      return state.theme || (localStorage.getItem(THEME_KEY) as ThemeEnum);
    },
    getMode(state): ModeEnum {
      return state.mode || localStorage.getItem(MODE_KEY) != 'null'
        ? (localStorage.getItem(MODE_KEY) as ModeEnum)
        : ModeEnum.LIGHT;
    },
  },
  actions: {
    changeTheme(theme: ThemeEnum, mode: ModeEnum) {
      this.theme = theme;
      this.mode = mode;
      localStorage.setItem(THEME_KEY, theme);
      localStorage.setItem(MODE_KEY, mode);
      window.document.documentElement.setAttribute('data-theme', mode);
      const { changeTheme: changeThemeHook } = useTheme;
      if (theme == ThemeEnum.SP) {
        changeThemeHook(ThemeColorEnum.SP, mode);
      } else {
        changeThemeHook(ThemeColorEnum.EP, mode);
      }
    },
  },
});

// Need to be used outside the setup
export function useThemeStoreWithOut() {
  return useThemeStore(store);
}
