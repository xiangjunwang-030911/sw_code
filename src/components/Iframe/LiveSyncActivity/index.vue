<template>
  <div class="h-full" v-loading="loading">
    <iframe
      class="w-full"
      ref="iframeRef"
      :height="height"
      :src="iframeSrc"
      frameborder="0"
      @load="handleLoad"
    ></iframe>
    <NewSyncModal
      v-model="isShowNewSyncModal"
      :livesyncId="livesyncId"
      :meetingType="meetingType"
    ></NewSyncModal>
    <ShareModal v-model="isShowShareSyncModal"></ShareModal>
    <LiveSyncModal
      v-model="isShowLiveSyncModal"
      :livesyncId="livesyncId"
    ></LiveSyncModal>
  </div>
</template>

<script setup lang="ts">
import { LanguageIdEnum } from '@/enums/commonEnum';
import {
  IframeMessageTypeEnum,
  IframePostMessageEnum,
  KloudLanguage,
  KloudMeetingType,
} from '@/enums/iframeEnum';
import { useEventListener } from '@/hooks/events/useEventListener';
import { useAuthStore } from '@/store/modules/auth';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { useIframe } from '@/utils/iframeHelper';

interface Props {
  iframeStyle: number;
  height: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  iframeStyle: 0,
  height: '100%',
});

const NewSyncModal = defineAsyncComponent(
  () => import('./components/NewSyncModal.vue'),
);
const ShareModal = defineAsyncComponent(
  () => import('./components/ShareModal.vue'),
);
const LiveSyncModal = defineAsyncComponent(
  () => import('./components/LiveSyncModal.vue'),
);

const router = useRouter();
const route = useRoute();
const tagsViewStore = useTagsViewStore();
const authStore = useAuthStore();

const loading = ref(true);

const iframeSrc = useIframe().liveSyncActivityIframe({
  id: 2350598,
  style: props.iframeStyle,
});
const isShowNewSyncModal = ref(false);
const isShowShareSyncModal = ref(false);
const isShowLiveSyncModal = ref(false);
const iframeRef = ref<HTMLIFrameElement>();

let livesyncId = ref(0);
let meetingType = ref(0);

const handleLoad = () => {
  loading.value = false;
};

const handleOpenNewSync = () => {
  isShowNewSyncModal.value = true;
};

const handleOpenNewSyncMeeting = () => {
  router
    .push({
      path: `/ep/liveSync/${livesyncId.value}/${KloudMeetingType.NEW_SYNC_MEETING}`,
    })
    .then(() => {
      tagsViewStore.addTagsViewList({
        name: `/ep/liveSync/${livesyncId.value}/${KloudMeetingType.NEW_SYNC_MEETING}`,
        title: `LiveSync-${livesyncId.value}`,
        meta: route.meta,
      });
    });
};

const handleOpenNewLivePersonSupport = () => {
  router
    .push({
      path: `/ep/liveSync/${livesyncId.value}/${KloudMeetingType.NEW_LIVE_PERSON_SUPPORT}`,
    })
    .then(() => {
      tagsViewStore.addTagsViewList({
        name: `/ep/liveSync/${livesyncId.value}/${KloudMeetingType.NEW_LIVE_PERSON_SUPPORT}`,
        title: `LiveSync-${livesyncId.value}`,
        meta: route.meta,
      });
    });
};

const handleOpen = (data: { livesyncid: number; meetingtype: number }) => {
  livesyncId.value = data.livesyncid;
  meetingType.value = data.meetingtype;
  switch (meetingType.value) {
    case KloudMeetingType.NEW_SYNC:
      handleOpenNewSync();
      break;
    case KloudMeetingType.NEW_SYNC_MEETING:
      handleOpenNewSyncMeeting();
      break;
    case KloudMeetingType.NEW_LIVE_PERSON_SUPPORT:
      handleOpenNewLivePersonSupport();
      break;
    default:
      break;
  }
};

const handleCloseMeetingModal = () => {
  isShowNewSyncModal.value = false;
};

const handleOpenShareSync = () => {
  isShowShareSyncModal.value = true;
};

const handleOpenLiveSync = () => {
  isShowLiveSyncModal.value = true;
};

const handleMessage = (e: Event) => {
  const data = (e as MessageEvent).data;
  switch (data.type) {
    case IframeMessageTypeEnum.NEW_SYNC_MEETING:
      handleOpen(data);
      break;
    case IframeMessageTypeEnum.CLOSE_MEETING_MODAL:
      handleCloseMeetingModal();
      break;
    case IframeMessageTypeEnum.SHARE_LIVESYNC:
      handleOpenShareSync();
      break;
    case IframeMessageTypeEnum.OPEN_LIVESYNC:
      livesyncId.value = data.livesyncid;
      handleOpenLiveSync();
      break;
    default:
      break;
  }
};

watch(
  () => authStore.getLanguageId,
  (languageId) => {
    iframeRef.value?.contentWindow?.postMessage(
      {
        type: IframePostMessageEnum.CHANGE_KLOUD_LANGUAGE,
        languageid:
          languageId == LanguageIdEnum.EN ? KloudLanguage.EN : KloudLanguage.CN,
      },
      '*',
    );
  },
);

useEventListener({
  name: 'message',
  listener: handleMessage,
});
</script>

<style lang="scss" scoped></style>
