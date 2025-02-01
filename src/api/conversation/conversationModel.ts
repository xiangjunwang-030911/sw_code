import { MessageStatusEnum } from '@/enums/chatEnum';

export interface RecentCommentsApiResult {
  id: string;
  desc: string;
  createdTime: string;
  creator: string;
  creatorID?: number;
  creatorLogin?: string;
  role: number;
  avatarURL?: string;
  fileID?: number;
  fileDownloadURL?: string;
  fileName?: string;
  status?: MessageStatusEnum;
}

export interface AddCommentApiResult {
  id: string;
  desc: string;
  createdTime: string;
  creator: string;
  creatorID: number;
  creatorLogin: string;
  role: number;
  avatarURL: string;
  fileID: number;
  fileDownloadURL: string;
  fileName: string;
}
