import { request } from '@/utils/axios';

import { ErrorMessageMode } from '@/types/axios';
import { ServiceGroupApiResult, ServiceListApiResult } from './serviceModel';

enum Api {
  ServiceList = '/api/EwpIncidentTemplate/EwpIncidentTemplateList',
  ServiceGroup = '/api/EwpIncidentTemplate/EwpSubmissionGroupTree',
}

export function getServiceListApi(
  params: { projectId: number },
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<ServiceListApiResult[]>(
    {
      url: Api.ServiceList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getServiceGroupApi(
  params: { projectId: number },
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<ServiceGroupApiResult[]>(
    {
      url: Api.ServiceGroup,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
