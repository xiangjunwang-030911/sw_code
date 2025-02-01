<template>
  <div class="bg-default rounded-lg p-3 h-fit text-[13px] flex">
    <div
      class="rounded-full w-[30px] h-[30px] bg-[#EDEDED] flex items-center justify-center mr-3"
    >
      <svg-icon icon-class="ep-common-ep_event" :size="15"></svg-icon>
    </div>
    <div class="flex-1 w-0">
      <div class="flex justify-between items-center">
        <div>
          <span class="mr-1 text-xs text-secondary">事件ID:</span>
          <span class="text-xs">#{{ event.id }}</span>
        </div>
        <div class="text-xs text-secondary">{{ event.time }}</div>
      </div>
      <div class="text-xs my-2 line-clamp-2 max-h-[28px]" title="xxxx">
        {{ event.content }}
      </div>
      <div class="flex justify-between items-center">
        <div>
          <span class="text-secondary text-xs">当前负责人:</span>
          <span class="text-xs">{{ event.master }}</span>
        </div>
        <div
          class="border-normal border rounded-xl text-xs py-[2px] px-3 bg-default text-regular"
        >
          {{ event.status }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EventItem } from './typing';

interface Props {
  event: EventItem;
}
defineProps<Props>();
</script>

<style lang="scss" scoped></style>
