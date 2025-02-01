import { request } from '@/utils/axios';

import { ErrorMessageMode } from '@/types/axios';
import {
  DetailsFieldsApiResult,
  DetailsFieldsValueApiResult,
  EventDetailsFlowApiResult,
  EventHistoryApiResult,
  ListColumnsApiResult,
  ListDataApiResult,
  ListDataParams,
  ProjectTreeListApiResult,
  GetEventAddFieldsParams,
  UpdateEventParams,
  AddEventParams,
} from './eventModel';
import { ChoiceItem } from '@/api/ep/userInfo/userInfoModel';

enum Api {
  ProjectTreeList = '/api/Projects/TreeList',
  ListColumns = '/api/ep/GUI/GetIncidentColumn',
  ListData = '/api/ep/IncidentList/Query',
  DetailsFields = '/api/EwpIncidentGuiSetting/IncidentGuiSetting',
  DetailsFieldsValue = '/api/ep/Incident/Query',
  EventDetailsFlow = '/api/EwpIncidentGuiSetting/ApplicableNextTransitions',
  EventHistory = '/api/ep/Incident/History',
  IncidentPost = '/api/ep/Incident/Post',
  FieldChoiceList = '/api/IncidentField/FieldChoiceList',
}

export function getProjectTreeListApi(
  params?: { bTemplate?: boolean },
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<ProjectTreeListApiResult[]>(
    {
      url: Api.ProjectTreeList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getListColumnsApi(
  params: { userId: number; projectId: number },
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<ListColumnsApiResult[]>(
    {
      url: Api.ListColumns,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getListDataApi(
  params: ListDataParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<ListDataApiResult>(
    {
      url: Api.ListData,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getDetailsFieldsApi(
  params: { projectId: Number },
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<DetailsFieldsApiResult>(
    {
      url: Api.DetailsFields,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getDetailsFieldsValueApi(
  params: { projectId: number; itemId: number; fieldIds: string },
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<DetailsFieldsValueApiResult>(
    {
      url: Api.DetailsFieldsValue,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getEventDetailsFlowApi(
  params: { projectId: Number; crntStatusID: Number },
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<EventDetailsFlowApiResult[]>(
    {
      url: Api.EventDetailsFlow,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getEventHistoryApi(
  params: { projectId: Number; itemId: Number },
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<EventHistoryApiResult[]>(
    {
      url: Api.EventHistory,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getEventAddFieldsApi(
  params: GetEventAddFieldsParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<DetailsFieldsValueApiResult>(
    { url: Api.IncidentPost, params },
    { errorMessageMode: mode },
  );
}

export function getFieldChoiceListApi(
  projectId: number,
  fieldId: number,
  mode: ErrorMessageMode = 'modal',
) {
  const params = {
    projectId,
    fieldId,
  };
  return request.get<ChoiceItem[]>(
    { url: Api.FieldChoiceList, params },
    { errorMessageMode: mode },
  );
}

export function updateEventApi(
  params: UpdateEventParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<boolean>(
    {
      url: Api.IncidentPost,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addEventApi(
  params: AddEventParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<DetailsFieldsValueApiResult[]>(
    {
      url: Api.IncidentPost,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
