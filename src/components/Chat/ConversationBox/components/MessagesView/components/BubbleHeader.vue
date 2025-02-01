<template>
  <div>
    <div
      v-if="messageType == MessageTypeEnum.INCOMING"
      class="flex items-center"
    >
      <div class="w-6 h-6 rounded-full mr-3">
        <div
          v-if="messageFrom == MessageFromEnum.BOT"
          class="bg-[#E8F2FC] w-6 h-6 flex items-center justify-center rounded-full"
        >
          <svg-icon
            icon-class="chat-icon_robot"
            :size="16"
            class="text-[#3B82F6]"
          ></svg-icon>
        </div>
        <img
          v-else-if="messageFrom == MessageFromEnum.HUMMAN"
          src="@/assets/images/temp_avator2.png"
          alt=""
        />
      </div>
      <span class="font-medium mr-4 text-[13px]">{{ senderName }}</span>
      <span class="text-xs text-placeholder"
        >{{ moment(createdTime).format('DD/MM/YYYY HH:mm:ss') }}
      </span>
    </div>
    <div v-else class="flex items-center">
      <span class="text-xs text-placeholder mr-4">{{
        moment(createdTime).format('DD/MM/YYYY HH:mm:ss')
      }}</span>
      <span class="font-medium mr-3 text-[13px]">{{ senderName }}</span>
      <div class="w-6 h-6 rounded-full">
        <div
          v-if="messageFrom == MessageFromEnum.BOT"
          class="bg-[#E8F2FC] w-6 h-6 flex items-center justify-center rounded-full"
        >
          <svg-icon
            icon-class="chat-icon_robot"
            :size="16"
            class="text-[#3B82F6]"
          ></svg-icon>
        </div>
        <img
          v-else-if="messageFrom == MessageFromEnum.HUMMAN"
          src="@/assets/images/temp_avator2.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageFromEnum, MessageTypeEnum } from '@/enums/chatEnum';
import moment from 'moment';

interface Props {
  messageType: MessageTypeEnum;
  messageFrom: MessageFromEnum;
  senderName: string;
  createdTime: string | number;
}
defineProps<Props>();
</script>

<style lang="scss" scoped></style>
