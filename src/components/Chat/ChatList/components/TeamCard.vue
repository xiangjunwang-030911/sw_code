<template>
  <div class="flex pl-2 pt-2 pb-4 pr-4 bg-default rounded-lg cursor-pointer">
    <div
      class="mr-3 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-[#302f52]"
      :style="{ background: avatorColor }"
    >
      {{ shortName }}
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
  name: string;
  shortName: string;
  time: string;
  content: string;
  avatorColor: string;
  isActive?: boolean;
}
defineProps<Props>();
</script>

<style lang="scss" scoped></style>
