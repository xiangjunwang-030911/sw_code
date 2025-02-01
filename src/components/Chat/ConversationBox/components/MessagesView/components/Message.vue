<template>
  <div>
    <template v-for="conversationItem in groupedConversation">
      <div class="text-xs text-center text-placeholder mt-4 mb-7">
        {{ formatDate(conversationItem.date) }}
      </div>
      <template v-for="message in conversationItem.messages">
        <IncomingMessage
          v-if="message.type == MessageTypeEnum.INCOMING"
          :message="message"
        ></IncomingMessage>
        <OutGoingMessage
          v-if="message.type == MessageTypeEnum.OUTGOING"
          :message="message"
        ></OutGoingMessage>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { MessageTypeEnum } from '@/enums/chatEnum';
import moment from 'moment';
import { GroupedConversationItem } from '../../../typing';

const IncomingMessage = defineAsyncComponent(
  () => import('./IncomingMessage.vue'),
);
const OutGoingMessage = defineAsyncComponent(
  () => import('./OutGoingMessage.vue'),
);

interface Props {
  groupedConversation: GroupedConversationItem[];
}

defineProps<Props>();

const formatDate = (date: number) => {
  return moment(date).format('YYYY年M月D日 HH:mm');
};
</script>

<style lang="scss" scoped></style>
