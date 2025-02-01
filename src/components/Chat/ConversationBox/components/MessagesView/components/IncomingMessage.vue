<template>
  <div class="content-item flex justify-start mb-5">
    <div class="max-w-[60%]">
      <BubbleHeader
        :message-type="message.type"
        :messageFrom="message.from"
        :created-time="message.createdTime"
        :sender-name="message.senderName"
      ></BubbleHeader>
      <div
        v-if="message.contentType == MessageContentTypeEnum.COMMON"
        class="bg-[#F0F3F5] rounded-md px-4 py-2 h-fit mt-4 text-[#2A2A2A] text-[13px] w-fit"
        v-html="message.content"
      ></div>
      <CustomContent v-else :content-type="message.contentType"></CustomContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageContentTypeEnum } from '@/enums/chatEnum';
import { MessageItem } from '../../../typing';

const CustomContent = defineAsyncComponent(() => import('./CustomContent.vue'));

interface Props {
  message: MessageItem;
}
defineProps<Props>();
const BubbleHeader = defineAsyncComponent(() => import('./BubbleHeader.vue'));
</script>

<style lang="scss" scoped></style>
