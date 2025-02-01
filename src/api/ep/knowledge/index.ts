import { request } from '@/utils/axios';

import { ErrorMessageMode } from '@/types/axios';
import {
  KnowLedgeFolderTreeApiResult,
  KnowledgeInfoApiResult,
  KnowledgeListApiResult,
} from './knowledgeModel';

enum Api {
  KnowLedgeFolderTree = '/api/ep/KnowledgeFolder/GetFolderTree',
  KnowLedgeList = '/api/ep/KnowledgeItemList/GetItemList',
  KnowLedgeInfo = '/api/ep/KnowledgeItem/GetItemsInfo',
}

export function getKnowLedgeFolderTreeApi(
  params: {
    ProjectID: number;
    ParentFolderID: number;
    showClosedFolder?: number;
    keyWord?: string;
  },
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<KnowLedgeFolderTreeApiResult>(
    {
      url: Api.KnowLedgeFolderTree,
      params: { showClosedFolder: 0, ...params },
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getKnowLedgeListApi(
  params: {
    projectId: number;
    pageIndex: number;
    pageSize: number;
    keyWords: string;
    folderIds: number[];
    ownerIds: number[];
    fieldIds: number[];
    sortBy: number;
  },
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<KnowledgeListApiResult>(
    {
      url: Api.KnowLedgeList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getKnowLedgeInfoApi(
  params: {
    projectId: number;
    itemIds: number[];
    fieldIds: number[];
  },
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<KnowledgeInfoApiResult[]>(
    {
      url: Api.KnowLedgeInfo,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
