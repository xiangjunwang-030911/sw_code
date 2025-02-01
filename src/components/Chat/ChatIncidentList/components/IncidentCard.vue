<template>
  <div
    class="flex pl-2 py-3 mb-4 pr-4 bg-default rounded-lg cursor-pointer"
    :class="
      isActive && '!bg-[#E8F2FC] shadow-[0_2px_6px_0_rgba(59,130,246,0.3)]'
    "
  >
    <div
      class="mr-3 w-[30px] h-[30px] bg-[#EDEDED] rounded-full flex items-center justify-center"
      :class="isActive && '!bg-[#3B82F6]'"
    >
      <svg-icon
        icon-class="ep-common-ep_event"
        :class="isActive && 'text-white'"
      ></svg-icon>
    </div>
    <div class="flex-1 w-0">
      <div class="flex justify-between text-placeholder items-center">
        <div>
          <span class="text-xs mr-1">事件ID</span>
          <span class="text-xs text-primary">#{{ incidentId }}</span>
        </div>
        <div class="text-xs">{{ time }}</div>
      </div>
      <div class="mt-2">
        <span class="text-xs text-[#2C2B52] mr-2"> 新的人工支持请求</span>
        <span class="text-xs text-[#E02020]">01:20</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  incidentId: number;
  time: string;
  isActive?: boolean;
}
defineProps<Props>();
</script>

<style lang="scss" scoped></style>
