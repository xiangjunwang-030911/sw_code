<template>
  <ReCard>
    <template #title>备注&星级(2)</template>
    <el-skeleton
      class="mt-4"
      animated
      :throttle="500"
      :loading="isLoading"
      style="--el-skeleton-circle-size: 24px"
    >
      <template #template>
        <div class="flex">
          <el-skeleton-item variant="circle" />
          <div class="ml-3 flex flex-col">
            <el-skeleton-item class="mb-3" style="width: 150px" />
            <el-skeleton-item class="mb-4" style="width: 100px" />
            <el-skeleton-item class="mb-2" style="width: 300px; height: 80px" />
          </div>
        </div>
        <div class="flex mt-4">
          <el-skeleton-item variant="circle" />
          <div class="ml-3 flex flex-col">
            <el-skeleton-item class="mb-3" style="width: 150px" />
            <el-skeleton-item class="mb-4" style="width: 100px" />
            <el-skeleton-item class="mb-2" style="width: 300px; height: 80px" />
          </div>
        </div>
      </template>

      <div class="px-5 pt-4">
        <el-row>
          <el-col :span="24" v-for="item in commentList">
            <CommentItem
              class="mr-3 mb-8 cursor-pointer"
              :item="item"
            ></CommentItem>
          </el-col>
        </el-row>
      </div>
    </el-skeleton>
  </ReCard>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { CommentInfo } from '@/views/EP/Knowledge/typing';

const CommentItem = defineAsyncComponent(() => import('./CommentItem.vue'));

const isLoading = ref(false);
const commentList: CommentInfo[] = [
  {
    userImg: 'employee_avator_icon',
    userName: 'Mildred Miller',
    commentDate: '02/09/2022 10:21:00',
    rate: 2,
    commentContent:
      'Hi, this is cool but I want to add a LiveSync, to record a new LiveSync to explain the problem, use LiveSync here.',
  },
  {
    userImg: 'employee_avator_icon',
    userName: 'Bryan Robinson',
    commentDate: '02/09/2022 10:21:00',
    rate: 5,
    commentContent:
      'Hi, this is cool but I want to add a LiveSync, to record a new LiveSync to explain the problem, use LiveSync here.',
  },
];
</script>

<style scoped></style>
