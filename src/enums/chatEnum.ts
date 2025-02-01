export enum MessageTypeEnum {
  OUTGOING = 1,
  INCOMING = 2,
}

export enum PanelTabsEnum {
  EVENT = 'event',
  CUSTOMER = 'customer',
  HISTORY = 'history',
  LIVE_SYNC_ACTIVITY = 'LiveSync Activity',
}

export enum MessageContentTypeEnum {
  COMMON = 0,
  EVENT = 1,
}

export enum MessageFromEnum {
  HUMMAN = 0,
  BOT = 1,
}

export enum MessageStatusEnum {
  IN_PROGRESS = 'in_progress',
  SENT = 'sent',
  FAILED = 'failed',
}
