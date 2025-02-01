<template>
  <ReCard>
    <template #title> 详情 </template>
    <el-skeleton class="mt-4" animated :throttle="500" :loading="isLoading">
      <template #template>
        <el-skeleton-item style="width: 300px" class="mb-4" />
        <el-skeleton-item
          variant="image"
          style="width: 300px; height: 150px"
          class="mb-4"
        />
      </template>

      <div class="px-5 pt-4">
        <div v-html="knowledgeInfo"></div>
        <div class="flex items-center w-full border-light border-t mt-5 py-5">
          <span class="text-regular mr-8">取消物料凭证.gif</span>
          <el-button class="w-[86px] h-[28px]" size="small">
            <svg-icon
              class="mr-0.5"
              iconClass="ep-knowledge-icon_open"
              size="16"
            ></svg-icon>
            Open</el-button
          >
        </div>
      </div>
    </el-skeleton>
  </ReCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  knowledgeInfo: string;
}

defineProps<Props>();

const isLoading = ref(false);
</script>

<style scoped></style>
