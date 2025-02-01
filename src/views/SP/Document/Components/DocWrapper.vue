<template>
  <div class="flex flex-col h-full">
    <div
      class="flex justify-between items-center pb-[12px] border-b border-normal"
    >
      <p class="font-[600]">{{ title }}</p>
      <div class="func flex items-center">
        <slot name="btn"></slot>
        <svg-icon
          v-if="more"
          @click="moreInfo"
          iconClass="common-icon_more"
          size="24"
          className="ml-4 cursor-pointer"
        ></svg-icon>
      </div>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  more: boolean;
  title?: string | undefined;
}
withDefaults(defineProps<Props>(), {
  title: String,
  more: true,
});
const emit = defineEmits(['moreInfo']);
const moreInfo = () => {
  emit('moreInfo');
};
</script>

<style></style>
