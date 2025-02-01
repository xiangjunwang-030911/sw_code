<template>
  <div class="py-4">
    <div ref="headWrapper">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="flex items-center">
            <span class="whitespace-nowrap">部门名称：</span>
            <el-input
              class="w-[200px]"
              v-model="departmentName"
              placeholder="部门名称"
            ></el-input>
          </div>
          <div class="flex items-center ml-2">
            <span class="whitespace-nowrap">状态：</span>
            <el-select v-model="status" placeholder="状态" class="w-[200px]">
              <el-option value="11" key="22"></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <el-button class="w-[70px] mr-2" type="primary">查询</el-button>
          <el-button class="w-[70px]" type="default">重置</el-button>
        </div>
      </div>
      <div class="flex items-center justify-between mt-3">
        <div>
          <el-button class="w-[70px] mr-2" type="primary" @click="handleNew"
            >新建</el-button
          >
          <el-button type="default">全部收起</el-button>
        </div>
        <div class="flex items-center">
          <svg-icon
            className="mr-2 cursor-pointer"
            iconClass="search_icon"
            size="22"
          ></svg-icon>
          <svg-icon
            className="mr-2 cursor-pointer"
            iconClass="settingIcon"
            size="18"
          ></svg-icon>
          <svg-icon
            className="cursor-pointer"
            iconClass="refresh_icon"
            size="24"
          ></svg-icon>
        </div>
      </div>
    </div>
    <ListView class="mt-3"></ListView>
    <NewOrUpdateModal
      v-model="isShowNewOrUpdateModal"
      @close="isShowNewOrUpdateModal = false"
    ></NewOrUpdateModal>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
const ListView = defineAsyncComponent(() => import('./ListView.vue'));
const NewOrUpdateModal = defineAsyncComponent(
  () => import('./NewOrUpdateModal.vue'),
);

const departmentName = ref('');
const status = ref('');
const isShowNewOrUpdateModal = ref(false);

const handleNew = () => {
  isShowNewOrUpdateModal.value = true;
};
</script>

<style></style>
