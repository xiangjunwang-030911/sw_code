import { request } from '@/utils/axios';

import { ErrorMessageMode } from '@/types/axios';
import {
  IntegratedSystemApiResult,
  KloudCompanyApiResult,
  KloudTokenApiResult,
} from './sysModel';
import { useSysStoreWithOut } from '@/store/modules/sys';

enum Api {
  IntegratedSystem = '/api/SystemSettingList/Lists',
  KloudToken = '/V1/P1Integration/ExchangeToken',
  KloudCompany = '/MeetingServer/subsystem/subsystem_item',
}

/**
 * @description: 系统集成
 */
export function getIntegratedSystemApi(
  params = { strIds: '80033,80034,80035,80036,80037,80038,80039,80040' },
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<IntegratedSystemApiResult[]>(
    {
      url: Api.IntegratedSystem,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getKloudTokenApi(
  params: {
    LoginName: string;
    Phone?: string;
    Email?: string;
    Role?: number;
    SubSystemID: number;
    UniqueID: string;
  },
  mode: ErrorMessageMode = 'modal',
) {
  const sysStore = useSysStoreWithOut();

  return request.post<KloudTokenApiResult>(
    {
      url: sysStore.getKloudApiDomain + Api.KloudToken,
      params: {
        Role: 100,
        ...params,
      },
    },
    {
      errorMessageMode: mode,
      isTransformResponse: false,
    },
  );
}

export function getKloudCompanyApi(
  params: {
    UserToken: string;
    subSystemId: number;
  },
  mode: ErrorMessageMode = 'modal',
) {
  const sysStore = useSysStoreWithOut();

  return request.get<KloudCompanyApiResult>(
    {
      headers: { UserToken: params.UserToken },
      url: sysStore.getKloudApiSyncDomain + Api.KloudCompany,
      params,
    },
    {
      errorMessageMode: mode,
      isTransformResponse: false,
    },
  );
}
