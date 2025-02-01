<template>
  <div class="p-3 h-full">
    <el-row :gutter="10" class="h-full">
      <el-col :span="4" class="enter-x h-full">
        <KnowledgeTree></KnowledgeTree>
      </el-col>
      <el-col :span="20" class="enter-x">
        <KnowledgeList></KnowledgeList>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const KnowledgeTree = defineAsyncComponent(
  () => import('./components/KnowledgeTree.vue'),
);
const KnowledgeList = defineAsyncComponent(
  () => import('./components/KnowledgeList/index.vue'),
);
</script>

<style lang="scss" scoped></style>
