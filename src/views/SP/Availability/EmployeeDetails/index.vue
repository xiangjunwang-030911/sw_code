<template>
  <div class="bg-default w-full py-5 px-10">
    <div
      class="flex items-center justify-between border-b border-solid border-normal pb-5"
    >
      <div class="tabs-wrapper flex items-center">
        <p>员工: 周佳杰 100001</p>
      </div>
      <div class="action-wrapper flex items-center">
        <el-button type="primary" class="mr-4 w-[70px]">保存</el-button>
        <el-button class="w-[70px]" @click="handleCancel">取消</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" class="mt-3">
      <el-tab-pane label="员工信息" :name="0">
        <EmployeeInfo></EmployeeInfo>
      </el-tab-pane>
      <el-tab-pane label="所有活动" :name="1">6</el-tab-pane>
      <el-tab-pane label="资产" :name="2">7</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
const EmployeeInfo = defineAsyncComponent(
  () => import('./components/EmployeeInfo.vue'),
);

const router = useRouter();

const activeName = ref(0);

const handleCancel = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  height: calc(100vh - 72px - 40px - 53px - 80px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
