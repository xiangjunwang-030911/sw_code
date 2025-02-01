<template>
  <div class="p-4 h-full">
    <el-row :gutter="15" class="h-full">
      <el-col :span="5">
        <ChatList></ChatList>
      </el-col>
      <el-col :span="13">
        <ConversationBox></ConversationBox>
      </el-col>
      <el-col :span="6">
        <ChatPanel :tab-list="tabList"></ChatPanel>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { PanelTabsEnum } from '@/enums/chatEnum';

const ChatList = defineAsyncComponent(
  () => import('@/components/Chat/ChatList/index.vue'),
);
const ConversationBox = defineAsyncComponent(
  () => import('@/components/Chat/ConversationBox/index.vue'),
);
const ChatPanel = defineAsyncComponent(
  () => import('@/components/Chat/ChatPanel/index.vue'),
);

const tabList = [
  {
    name: '事件',
    value: PanelTabsEnum.EVENT,
  },
  {
    name: '客户',
    value: PanelTabsEnum.CUSTOMER,
  },
  {
    name: '历史',
    value: PanelTabsEnum.HISTORY,
  },
];
</script>

<style lang="scss" scoped></style>
