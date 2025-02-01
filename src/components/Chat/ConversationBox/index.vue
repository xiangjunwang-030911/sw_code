<template>
  <div class="bg-default rounded-md h-full flex flex-col">
    <ConversationHeader></ConversationHeader>
    <MessagesView
      ref="messagesViewRef"
      :is-show-activity="true"
      :style="{ height: height - 14 + 'px' }"
      :groupedConversation="groupedConversation"
    ></MessagesView>
  </div>
</template>

<script setup lang="ts">
import { useTableMaxHeight } from '@/hooks/tools/useTableMaxHeight';
import ConversationHeader from './components/ConversationHeader.vue';
import MessagesView from './components/MessagesView/index.vue';
import { GroupedConversationItem } from './typing';
import {
  MessageContentTypeEnum,
  MessageFromEnum,
  MessageTypeEnum,
} from '@/enums/chatEnum';

const messagesViewRef = ref<HTMLElement>();
const height = ref(0);

const groupedConversation: GroupedConversationItem[] = [
  {
    date: 1693478220000,
    messages: [
      {
        from: MessageFromEnum.HUMMAN,
        type: MessageTypeEnum.INCOMING,
        content:
          'Hi, this is cool but I want to add a LiveSync, to record a new LiveSync to explain the problem, use LiveSync here.',
        contentType: MessageContentTypeEnum.COMMON,
        senderName: 'Jeremiah Barnett',
        createdTime: 1695210180000,
      },
      {
        from: MessageFromEnum.HUMMAN,
        type: MessageTypeEnum.OUTGOING,
        content: 'Hi, this is cool.',
        contentType: MessageContentTypeEnum.COMMON,
        senderName: 'Danielle Hawkins',
        createdTime: 1695210182000,
      },
    ],
  },
  {
    date: 1693478230000,
    messages: [
      {
        from: MessageFromEnum.HUMMAN,
        type: MessageTypeEnum.OUTGOING,
        contentType: MessageContentTypeEnum.EVENT,
        senderName: 'Danielle Hawkins',
        createdTime: 1695210182000,
      },
      {
        from: MessageFromEnum.HUMMAN,
        type: MessageTypeEnum.OUTGOING,
        content: '@ Jeremiah Barnett, 这是您需要咨询的事件吗？',
        contentType: MessageContentTypeEnum.COMMON,
        senderName: 'Danielle Hawkins',
        createdTime: 1695210182000,
      },
      {
        from: MessageFromEnum.HUMMAN,
        type: MessageTypeEnum.INCOMING,
        content: '@Bot, what’s livesync conversation',
        contentType: MessageContentTypeEnum.COMMON,
        senderName: 'Jeremiah Barnett',
        createdTime: 1695210182000,
      },
      {
        from: MessageFromEnum.BOT,
        type: MessageTypeEnum.OUTGOING,
        content:
          'Livesync conversation refers to live, real-time interaction between users and AI models. During a livesync, the AI model can generate responses immediately as a user enters their input. This is typically used in conversational AI systems where the AI needs to simulate a real, flowing conversation.',
        contentType: MessageContentTypeEnum.COMMON,
        senderName: 'Bot',
        createdTime: 1695210182000,
      },
    ],
  },
];

onMounted(() => {
  nextTick(() => {
    useTableMaxHeight(height, messagesViewRef.value as HTMLElement);
  });
});
</script>

<style lang="scss" scoped></style>
