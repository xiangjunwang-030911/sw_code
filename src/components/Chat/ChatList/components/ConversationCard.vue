<template>
  <div
    class="flex pl-2 pt-2 pb-4 pr-4 bg-default rounded-lg cursor-pointer"
    :class="
      isActive && '!bg-[#E9F5E8] shadow-[0_2px_6px_0_rgba(68,176,68,0.38)]'
    "
  >
    <div class="mr-3 w-[30px] h-[30px]">
      <img class="w-[30px] h-[30px]" :src="avator" alt="" />
    </div>
    <div class="flex-1 w-0">
      <div class="flex justify-between text-placeholder">
        <div class="text-xs">{{ name }}</div>
        <div class="text-xs">{{ time }}</div>
      </div>
      <div class="text-xs text-regular mt-2 truncate" :title="content">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  avator: string;
  name: string;
  time: string;
  content: string;
  isActive?: boolean;
}
defineProps<Props>();
</script>

<style lang="scss" scoped></style>
