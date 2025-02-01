import { request } from '@/utils/axios';

import { ErrorMessageMode } from '@/types/axios';
import {
  GetLanguageListApiResult,
  LoginApiParams,
  LoginApiResult,
} from './authModel';

enum Api {
  SpLogin = '/api/Login/Login',
  EpLogin = '/api/EwpLogin/Login',
  LanguageList = '/api/Language/List',
}

/**
 * @description: user login api
 */
export function spLoginApi(
  params: LoginApiParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<LoginApiResult>(
    {
      url: Api.SpLogin,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function epLoginApi(
  params: LoginApiParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<LoginApiResult>(
    {
      url: Api.EpLogin,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getLanguageListApi(
  params?: {},
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<GetLanguageListApiResult[]>(
    {
      url: Api.LanguageList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
