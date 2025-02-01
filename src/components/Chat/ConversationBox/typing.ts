import {
  MessageContentTypeEnum,
  MessageFromEnum,
  MessageStatusEnum,
  MessageTypeEnum,
} from '@/enums/chatEnum';

export interface MessageItem {
  from: MessageFromEnum;
  type: MessageTypeEnum;
  content?: string;
  contentType: MessageContentTypeEnum;
  createdTime: string | number;
  senderName: string;
  avatarUrl?: string;
  status?: MessageStatusEnum;
}

export interface GroupedConversationItem {
  date: number;
  messages: MessageItem[];
}
