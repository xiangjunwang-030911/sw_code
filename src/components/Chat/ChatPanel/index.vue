<template>
  <div class="h-full flex flex-col">
    <div class="flex justify-around text-secondary mt-2">
      <span
        v-for="item in tabList"
        @click="toggleActive(item.value)"
        class="cursor-pointer"
        :class="activeName == item.value && 'text-theme font-semibold '"
        >{{ item.name }}</span
      >
    </div>
    <div v-auto-animate class="mt-4 h-full flex-1">
      <div v-if="activeName == PanelTabsEnum.EVENT">
        <Event></Event>
      </div>
      <div v-if="activeName == PanelTabsEnum.CUSTOMER">客户</div>
      <div v-if="activeName == PanelTabsEnum.HISTORY">
        <History></History>
      </div>
      <div class="h-full" v-if="activeName == PanelTabsEnum.LIVE_SYNC_ACTIVITY">
        <LiveSyncActivity :iframeStyle="1"></LiveSyncActivity>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PanelTabsEnum } from '@/enums/chatEnum';

const Event = defineAsyncComponent(() => import('./components/Event.vue'));
const History = defineAsyncComponent(() => import('./components/History.vue'));
const LiveSyncActivity = defineAsyncComponent(
  () => import('@/components/Iframe/LiveSyncActivity/index.vue'),
);

interface TabListItem {
  name: string;
  value: PanelTabsEnum;
}

interface Props {
  tabList: TabListItem[];
}

defineProps<Props>();

const activeName = ref<PanelTabsEnum>(PanelTabsEnum.EVENT);

const toggleActive = (tab: PanelTabsEnum) => {
  activeName.value = tab;
};
</script>

<style lang="scss" scoped></style>
