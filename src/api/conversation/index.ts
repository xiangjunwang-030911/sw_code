import { request } from '@/utils/axios';

import { ErrorMessageMode } from '@/types/axios';
import {
  AddCommentApiResult,
  RecentCommentsApiResult,
} from './conversationModel';

enum Api {
  RecentComments = '/api/WebConversation/RecentComments',
  AddComment = '/api/WebConversation/AddComment',
}

export function getRecentCommentsApi(
  params: {
    projectId: number;
    itemId: number;
    beforeCommentID: string;
    limit: number;
  },
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<RecentCommentsApiResult[]>(
    {
      url: Api.RecentComments,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addCommentApi(
  params: {
    projectID: number;
    desc: string;
    itemID: number;
    clearRequestFlag: boolean;
    fileID: number;
  },
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<AddCommentApiResult[]>(
    {
      url: Api.AddComment,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
