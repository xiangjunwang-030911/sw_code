<template>
  <div class="p-4 h-full">
    <el-row :gutter="15" class="h-full">
      <el-col :span="5">
        <ChatIncidentList></ChatIncidentList>
      </el-col>
      <el-col :span="13">
        <ConversationBox></ConversationBox>
      </el-col>
      <el-col :span="6">
        <ChatPanel :tabList="tabList"></ChatPanel>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { PanelTabsEnum } from '@/enums/chatEnum';

const ConversationBox = defineAsyncComponent(
  () => import('@/components/Chat/ConversationBox/index.vue'),
);
const ChatPanel = defineAsyncComponent(
  () => import('@/components/Chat/ChatPanel/index.vue'),
);
const ChatIncidentList = defineAsyncComponent(
  () => import('@/components/Chat/ChatIncidentList/index.vue'),
);
const tabList = [
  {
    name: '事件',
    value: PanelTabsEnum.EVENT,
  },
  {
    name: '历史',
    value: PanelTabsEnum.HISTORY,
  },
  {
    name: 'LiveSync Activity',
    value: PanelTabsEnum.LIVE_SYNC_ACTIVITY,
  },
];
</script>

<style lang="scss" scoped></style>
