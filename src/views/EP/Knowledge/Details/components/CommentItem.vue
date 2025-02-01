<template>
  <div>
    <div class="flex items-center mb-2">
      <svg-icon :iconClass="item.userImg" size="24"></svg-icon>
      <span class="font-medium ml-2 mr-3.5">{{ item.userName }}</span>
      <span class="text-placeholder text-xs">{{ item.commentDate }}</span>
    </div>
    <div class="pl-8">
      <div class="flex mb-4">
        <svg-icon
          icon-class="ep-knowledge-icon_start"
          :size="17"
          class="mr-1"
        ></svg-icon>
        <svg-icon
          icon-class="ep-knowledge-icon_start"
          :size="17"
          class="mr-1"
        ></svg-icon>
        <span>满意</span>
      </div>
      <div class="w-[50%] bg-[#E0F2FE] px-4 py-2 rounded">
        <span class="text-xs text-[#2A2A2A]">{{ item.commentContent }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CommentInfo } from '@/views/EP/Knowledge/typing';

interface Props {
  item: CommentInfo;
}

defineProps<Props>();
</script>

<style scoped></style>
