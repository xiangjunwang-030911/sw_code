<template>
  <div v-loading="loading" class="w-full h-full">
    <iframe
      id="LiveSyncMeeting"
      class="w-full h-full"
      ref="iframeRef"
      :src="iframeUrl"
      :key="iframeKey"
      @load="handleLoad"
      allow="microphone; camera"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { IframeMessageTypeEnum } from '@/enums/iframeEnum';
import { useEventListener } from '@/hooks/events/useEventListener';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { useIframe } from '@/utils/iframeHelper';

defineOptions({
  name: 'LiveSyncMeeting',
});

const route = useRoute();
const tagsViewStore = useTagsViewStore();

const iframeUrl = ref('');
const iframeKey = ref(0);
const loading = ref(false);

const handleLoad = () => {
  loading.value = false;
};

watch(
  [() => route.params.id, () => route.params.type],
  () => {
    if (Number(route.params.id)) {
      iframeUrl.value = useIframe().newSyncMeetingIframe({
        id: Number(route.params.id),
        type: Number(route.params.type),
      });
      iframeKey.value = Number(route.params.id);
    }
  },
  {
    immediate: true,
  },
);

const handleClose = () => {
  if (route.path.indexOf('/liveSync') !== -1) {
    tagsViewStore.deleteTagsViewList({
      name: route.fullPath,
      route,
      forceDelete: true,
    });
  }
};

const handleMessage = (e: Event) => {
  const data = (e as MessageEvent).data;

  switch (data.type) {
    case IframeMessageTypeEnum.CLOSE_MEETING_MODAL:
      handleClose();
      break;
    default:
      break;
  }
};

useEventListener({
  name: 'message',
  listener: handleMessage,
});
</script>

<style lang="scss" scoped></style>
