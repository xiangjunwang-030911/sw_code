export interface CommentInfo {
  userImg: string;
  userName: string;
  commentDate: string;
  rate: number;
  commentContent: string;
}

export enum KnowledgeFieldIdEnum {
  TITLE = 1101,
  DATE_LAST_MODIFIED = 1109,
  DETAILS = 1102,
}
