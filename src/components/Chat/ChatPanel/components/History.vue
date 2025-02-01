<template>
  <div>
    <el-input v-model="search" placeholder="搜索...">
      <template #suffix>
        <svg-icon
          icon-class="search_icon"
          class="text-primary cursor-pointer"
        ></svg-icon>
      </template>
    </el-input>
    <div class="bg-default rounded-lg px-5 py-6 mt-4">
      <HistoryItem class="history-item"></HistoryItem>
      <HistoryItem class="history-item"></HistoryItem>
      <HistoryItem class="history-item"></HistoryItem>
    </div>
  </div>
</template>

<script setup lang="ts">
const HistoryItem = defineAsyncComponent(() => import('./HistoryItem.vue'));

const search = ref('');
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  box-shadow: none !important;
  border-radius: 15px;
}
.history-item + .history-item {
  border-top: 1px solid var(--el-border-color);
  padding-top: 20px;
}
</style>
