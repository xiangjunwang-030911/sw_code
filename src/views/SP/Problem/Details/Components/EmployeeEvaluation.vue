<template>
  <div>
    <div class="font-medium">员工评价</div>
    <div class="flex items-center mt-4">
      <span class="mr-2">评价：</span>
      <el-rate
        v-model="rating"
        :texts="['非常糟糕', '不满意', '一般满意', '满意', '非常满意']"
        show-text
      />
    </div>
    <el-input
      v-model="evaluation"
      type="textarea"
      placeholder="写下您的评价"
      :rows="5"
    ></el-input>
    <div class="font-medium mt-4">对话</div>
    <div class="mt-4 border border-[#dcdfe6] flex flex-col justify-between p-3">
      <Chat class="h-[322px]"></Chat>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';

const Chat = defineAsyncComponent(() => import('@/components/Chat.vue'));

const rating = ref();
const evaluation = ref('');
</script>

<style lang="scss" scoped>
:deep(.el-tag__content) {
  display: flex;
  align-items: center;
}
</style>
