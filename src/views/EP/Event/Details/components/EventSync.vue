<template>
  <ReCard>
    <template #title>
      <div class="flex items-center justify-between">
        <span>对话</span>
        <div class="flex items-center mr-4">
          <div class="flex items-center mr-8">
            <span class="text-xs text-regular mr-2">新消息</span>
            <span class="text-[22px] font-medium">3</span>
          </div>
          <div class="flex items-center">
            <span class="text-xs text-regular mr-2">新音想</span>
            <span class="text-[22px] font-medium">1</span>
          </div>
        </div>
      </div>
    </template>
    <MessagesView
      ref="messagesViewRef"
      class="h-[400px] py-3"
      :groupedConversation="groupedConversation"
      :isShowActivity="false"
      @send="handleSend"
    ></MessagesView>
  </ReCard>
</template>

<script setup lang="ts">
import { addCommentApi, getRecentCommentsApi } from '@/api/conversation';
import { RecentCommentsApiResult } from '@/api/conversation/conversationModel';
import { GroupedConversationItem } from '@/components/Chat/ConversationBox/typing';
import {
  MessageContentTypeEnum,
  MessageFromEnum,
  MessageStatusEnum,
  MessageTypeEnum,
} from '@/enums/chatEnum';
import { useAuthStore } from '@/store/modules/auth';
import { getUUID, groupConversationsByDate } from '@/utils';
import { sortBy } from 'lodash-es';

const MessagesView = defineAsyncComponent(
 // () => import('@/components/Chat/ConversationBox/components/MessagesView.vue'),
);

const route = useRoute();
const authStore = useAuthStore();

const conversationList = ref<RecentCommentsApiResult[]>([]);
const messagesViewRef = ref<InstanceType<typeof MessagesView>>();

const groupedConversation = computed((): GroupedConversationItem[] => {
  return groupConversationsByDate(
    sortBy(conversationList.value, ['sequenceID', 'orderID']).map((item) => ({
      from: MessageFromEnum.HUMMAN,
      type: item.role,
      content: item.desc,
      createdTime: Number(item.createdTime),
      senderName: item.creator,
      contentType: MessageContentTypeEnum.COMMON,
      status: item.status,
    })),
  );
});

const getRecentComments = async () => {
  let res = await getRecentCommentsApi({
    projectId: Number(route.query.projectId),
    itemId: Number(route.query.id),
    beforeCommentID: '',
    limit: 100,
  });

  conversationList.value = res;
};

const handleSend = async (msg: string) => {
  const tempId = getUUID();
  conversationList.value.push({
    id: tempId,
    role: MessageTypeEnum.OUTGOING,
    desc: msg,
    creator: authStore.getUserInfo.fName + authStore.getUserInfo.lName,
    createdTime: String(new Date().getTime()),
    status: MessageStatusEnum.IN_PROGRESS,
  });
  messagesViewRef.value?.scrollToButtom();
  await addCommentApi({
    projectID: Number(route.query.projectId),
    itemID: Number(route.query.id),
    desc: msg,
    clearRequestFlag: false,
    fileID: 0,
  });
  conversationList.value.forEach((item) => {
    if (item.id === tempId) {
      item.status = MessageStatusEnum.SENT;
    }
  });
  // getRecentComments();
};

onMounted(() => {
  getRecentComments();
});
</script>

<style lang="scss" scoped></style>
