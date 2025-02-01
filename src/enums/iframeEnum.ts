export enum KloudLanguage {
  CN = 0,
  EN = 1,
}

export enum KloudMeetingType {
  NEW_SYNC = 0,
  NEW_SYNC_MEETING = 1,
  NEW_LIVE_PERSON_SUPPORT = 2,
}

export enum IframeUrlEnum {
  MEETING_LIST = '/integration-meeting',
  LIVE_SYNC_ACTIVITY = '/mainlivesynclist',
  NEW_SYNC_MEETING = '/livesync',
  SHARE_LIVESYNC = '/publicshare',
}

export enum IframeMessageTypeEnum {
  NEW_SYNC_MEETING = 'newsyncmeeting',
  CLOSE_MEETING_MODAL = 'cw-close-modal',
  SHARE_LIVESYNC = 'cw-share-livesync',
  OPEN_LIVESYNC = 'openlivesync',
}

export enum IframePostMessageEnum {
  CLOSE_SUB_SYNC_MEETING = 'closesubsyncmeeting',
  LIVE_SYNC_ACTIVITY_CAN_DELETE_ALL = 'sw-candel',
  CHANGE_KLOUD_LANGUAGE = 'changeLang',
}

export enum NeedCacheIframe {
  LIVE_SYNC_MEETING = 'LiveSyncMeeting',
}
