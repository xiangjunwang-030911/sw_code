import { createI18n } from 'vue-i18n';
import en from './en';
import zh from './zh';
import { LANGUAGE_KEY } from '@/enums/cacheEnum';
import { LanguageIdEnum } from '@/enums/commonEnum';

const i18n = createI18n({
  locale: localStorage.getItem(LANGUAGE_KEY) == LanguageIdEnum.CN ? 'zh' : 'en',
  legacy: false,
  messages: {
    en,
    zh,
  },
});

export default i18n;
