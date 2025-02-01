/**
 * 所有带星号的都表示退出登录后需要清除的Key
 */

// token key *
export const TOKEN_KEY = 'TOKEN__';

// user info key *
export const USER_INFO_KEY = 'USER__INFO__';

// base global local key
export const APP_LOCAL_CACHE_KEY = 'COMMON__LOCAL__KEY__';

// base global session key
export const APP_SESSION_CACHE_KEY = 'COMMON__SESSION__KEY__';

// theme key
export const THEME_KEY = 'THEME__';

// mode key dark or light
export const MODE_KEY = 'MODE__';

//languageId
export const LANGUAGE_KEY = 'LANGUAGE__ID__';

export const LANGUAGE_LIST_KEY = 'LANGUAGE__List__';

//kloud integration *
export const EP_ENABLE_INT_KEY = 'EP__ENABLE__INT__';
export const SP_ENABLE_INT_KEY = 'SP__ENABLE__INT__';

export const EP_KLOUD_API_DOMAIN_KEY = 'EP__KLOUD__API__DOMAIN__';
export const SP_KLOUD_API_DOMAIN_KEY = 'SP__KLOUD__API__DOMAIN__';

export const EP_KLOUD_API_SYNC_DOMAIN_KEY = 'EP__KLOUD__API__SYNC__DOMAIN__';
export const SP_KLOUD_API_SYNC_DOMAIN_KEY = 'SP__KLOUD__API__SYNC__DOMAIN__';

export const EP_KLOUD_PAGE_DOMAIN_KEY = 'EP__KLOUD__PAGE__DOMAIN__';
export const SP_KLOUD_PAGE_DOMAIN_KEY = 'SP__KLOUD__PAGE__DOMAIN__';

export const EP_KLOUD_TOKEN_KEY = 'EP__KLOUD__TOKEN__';
export const SP_KLOUD_TOKEN_KEY = 'SP__KLOUD__TOKEN__';

export const EP_SUB_SYSTEM_ID_KEY = 'EP__SUB__SYSTEM__ID__';
export const SP_SUB_SYSTEM_ID_KEY = 'SP__SUB__SYSTEM__ID__';

export const EP_KLOUD_COMPANY_ID_KEY = 'EP__KLOUD__COMPANY__ID__';
export const SP_KLOUD_COMPANY_ID_KEY = 'SP__KLOUD__COMPANY__ID__';

//knowledge project id *
export const KNOWLEDGE_PROJECT_ID_KEY = 'KNOWLEDGE__PROJECT__ID__';

// customer as (menu alias) *
export const CUSTOMER_AS_KEY = 'CUSTOMER__AS__';

export enum CacheTypeEnum {
  SESSION,
  LOCAL,
}
