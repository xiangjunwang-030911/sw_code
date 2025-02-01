<template>
  <div>
    <div
      class="relative w-[93px] h-[96px] mx-[11px] px-[20px] pt-[16px] pb-[12px] rounded-[8px] cursor-pointer"
      :class="isSelect ? 'border-2 border-[#FA6400]' : 'border-2 border-normal'"
      @click="itemClick"
    >
      <div class="flex flex-col items-center">
        <svg-icon :icon-class="iconName" :size="40" />
        <span
          class="text-xs mt-[12px]"
          :class="isSelect ? 'text-[#FA6400]' : ''"
          >{{ rateText }}</span
        >
      </div>
      <svg-icon
        v-show="isSelect"
        icon-class="ep-event-rate_checked"
        :size="28"
        class="absolute top-0 right-0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  iconName: string;
  rateText: string;
  isSelect?: boolean;
  itemIndex: number;
}
const props = defineProps<Props>();

interface Emits {
  (e: 'itemClick', value: number): void;
}
const emit = defineEmits<Emits>();
const itemClick = () => {
  emit('itemClick', props.itemIndex);
};
</script>

<style lang="scss" scoped></style>
