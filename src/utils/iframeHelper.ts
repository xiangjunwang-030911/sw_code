import { LanguageIdEnum } from '@/enums/commonEnum';
import { IframeUrlEnum, KloudLanguage } from '@/enums/iframeEnum';
import { useAuthStoreWithOut } from '@/store/modules/auth';
import { useSysStoreWithOut } from '@/store/modules/sys';

const authStore = useAuthStoreWithOut();
const sysStore = useSysStoreWithOut();

let kloudLanguageId =
  authStore.getLanguageId == LanguageIdEnum.EN
    ? KloudLanguage.EN
    : KloudLanguage.CN;
let kloudPageDomain = '';
let kloudToken = '';

function meetingListIframe({
  subsystemId,
  token = kloudToken,
  languageid = kloudLanguageId,
}: {
  subsystemId: number;
  token?: string;
  languageid?: KloudLanguage;
}): string {
  return `${kloudPageDomain}${IframeUrlEnum.MEETING_LIST}?subsystemId=${subsystemId}&token=${token}&languageid=${languageid}&fromType=4`;
}

function liveSyncActivityIframe({
  id,
  token = kloudToken,
  style = 0,
  needClearSessionStorage = 1,
  type = 0,
  languageid = kloudLanguageId,
}: {
  id: number;
  token?: string;
  style?: number;
  needClearSessionStorage?: number;
  type?: number;
  languageid?: number;
}) {
  return `${kloudPageDomain}${IframeUrlEnum.LIVE_SYNC_ACTIVITY}/${id}?token=${token}&needClearSessionStorage=${needClearSessionStorage}&type=${type}&languageid=${languageid}&style=${style}`;
}

function newSyncMeetingIframe({
  id,
  token = kloudToken,
  opensubsync = 1,
  needClearSessionStorage = 1,
  type = 0,
  languageid = kloudLanguageId,
}: {
  id: number;
  token?: string;
  opensubsync?: number;
  needClearSessionStorage?: number;
  type?: number;
  languageid?: number;
}) {
  return `${kloudPageDomain}${IframeUrlEnum.NEW_SYNC_MEETING}/${id}?token=${token}&opensubsync=${opensubsync}&needClearSessionStorage=${needClearSessionStorage}&type=${type}&languageid=${languageid}`;
}

function shareSyncIframe({
  id,
  token = kloudToken,
  type = 8,
  languageid = kloudLanguageId,
}: {
  id: number;
  token?: string;
  type?: number;
  languageid?: number;
}) {
  return `${kloudPageDomain}${IframeUrlEnum.SHARE_LIVESYNC}/${id}?token=${token}&type=${type}&languageid=${languageid}&hideheader1=1`;
}

function liveSyncIframe({
  id,
  token = kloudToken,
  needClearSessionStorage = 1,
  languageid = kloudLanguageId,
}: {
  id: number;
  token?: string;
  needClearSessionStorage?: number;
  languageid?: number;
}) {
  return `${kloudPageDomain}${IframeUrlEnum.NEW_SYNC_MEETING}/${id}?token=${token}&needClearSessionStorage=${needClearSessionStorage}&languageid=${languageid}`;
}

export function useIframe() {
  kloudLanguageId =
    authStore.getLanguageId == LanguageIdEnum.EN
      ? KloudLanguage.EN
      : KloudLanguage.CN;
  kloudPageDomain = sysStore.getKloudPageDomain as string;
  kloudToken = sysStore.getKloudToken as string;
  return {
    meetingListIframe,
    liveSyncActivityIframe,
    newSyncMeetingIframe,
    shareSyncIframe,
    liveSyncIframe,
  };
}
