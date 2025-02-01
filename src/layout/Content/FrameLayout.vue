<template>
  <LiveSyncMeeting
    v-show="route.meta.iframeName == NeedCacheIframe.LIVE_SYNC_MEETING"
  ></LiveSyncMeeting>
</template>

<script setup lang="ts">
import { NeedCacheIframe } from '@/enums/iframeEnum';
const LiveSyncMeeting = defineAsyncComponent(
  () => import('@/components/Iframe/LiveSyncMeeting/index.vue'),
);

const route = useRoute();
</script>

<style lang="scss" scoped></style>
