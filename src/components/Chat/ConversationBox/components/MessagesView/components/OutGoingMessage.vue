<template>
  <div class="content-item flex justify-end mb-5">
    <div class="max-w-[60%] flex flex-col items-end">
      <BubbleHeader
        :message-type="message.type"
        :message-from="message.from"
        :created-time="message.createdTime"
        :sender-name="message.senderName"
      ></BubbleHeader>
      <div
        :class="{
          'opacity-30': message.status == MessageStatusEnum.IN_PROGRESS,
        }"
      >
        <div
          v-if="message.contentType == MessageContentTypeEnum.COMMON"
          class="bg-[#D1FAE5] rounded-md px-4 py-2 h-fit mt-4 text-[#2A2A2A] text-[13px] w-fit"
          v-html="message.content"
        ></div>
        <CustomContent
          v-else
          :content-type="message.contentType"
          class="mt-4"
        ></CustomContent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageContentTypeEnum, MessageStatusEnum } from '@/enums/chatEnum';
import { MessageItem } from '../../../typing';

const CustomContent = defineAsyncComponent(() => import('./CustomContent.vue'));

interface Props {
  message: MessageItem;
}
defineProps<Props>();
const BubbleHeader = defineAsyncComponent(() => import('./BubbleHeader.vue'));
</script>

<style lang="scss" scoped></style>
