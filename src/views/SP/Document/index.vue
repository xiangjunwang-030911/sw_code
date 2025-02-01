<template>
  <div class="px-3 pt-3">
    <div class="h-[190px] pb-[8px] flex enter-x">
      <el-card shadow="hover" class="flex-1 mr-[8px] enter-x">
        <DocStatistics></DocStatistics>
      </el-card>
      <el-card shadow="hover" class="w-[395px] enter-x">
        <DocTrends></DocTrends>
      </el-card>
    </div>
    <div class="h-[509px] pb-[8px] enter-x">
      <el-card shadow="hover" class="enter-x h-full">
        <ModuleDocLib></ModuleDocLib>
      </el-card>
    </div>
    <div class="h-[331px] flex enter-x">
      <el-card shadow="hover" class="flex-1 mr-[8px] enter-x">
        <FavoriteDoc></FavoriteDoc>
      </el-card>
      <el-card shadow="hover" class="w-[395px] enter-x">
        <DocClassification></DocClassification>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const DocStatistics = defineAsyncComponent(
  () => import('./Components/DocStatistics.vue'),
);
const DocTrends = defineAsyncComponent(
  () => import('./Components/DocTrends.vue'),
);
const ModuleDocLib = defineAsyncComponent(
  () => import('./Components/ModuleDocLib.vue'),
);
const FavoriteDoc = defineAsyncComponent(
  () => import('./Components/FavoriteDoc.vue'),
);
const DocClassification = defineAsyncComponent(
  () => import('./Components/DocClassification.vue'),
);
</script>

<style lang="scss" scoped>
:deep(.el-card__body) {
  padding: 14px 32px;
  height: 100%;
}
</style>
