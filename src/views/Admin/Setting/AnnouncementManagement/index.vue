<template>
  <div class="py-4">
    <div ref="headWrapper">
      <div>
        <div class="flex items-center">
          <div class="flex items-center flex-1">
            <span class="whitespace-nowrap mr-2">系统模块:</span>
            <el-input placeholder="系统模块"></el-input>
          </div>
          <div class="flex items-center ml-3 flex-1">
            <span class="whitespace-nowrap mr-2">操作类型:</span>
            <el-select placeholder="操作类型" class="w-full">
              <el-option value="11" key="22"></el-option>
            </el-select>
          </div>
          <div class="flex items-center ml-3 flex-1">
            <span class="whitespace-nowrap mr-2">操作人员:</span>
            <el-input placeholder="操作人员"></el-input>
          </div>
          <div class="flex items-center ml-3 flex-1">
            <span class="whitespace-nowrap mr-2">系统模块:</span>
            <el-select placeholder="系统模块" class="w-full">
              <el-option value="11" key="22"></el-option>
            </el-select>
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <el-button class="w-[70px] mr-2" type="primary">查询</el-button>
          <el-button class="w-[70px]" type="default">重置</el-button>
        </div>
      </div>
      <div class="flex items-center justify-between mt-5">
        <div>
          <el-button class="w-[70px] mr-2" type="primary">新建</el-button>
        </div>
        <div class="flex items-center">
          <svg-icon
            className="mr-2 cursor-pointer"
            iconClass="refresh_icon"
            size="22"
          ></svg-icon>
          <svg-icon
            className="mr-2 cursor-pointer"
            iconClass="search_icon"
            size="21"
          ></svg-icon>
          <svg-icon
            className="mr-2 cursor-pointer"
            iconClass="arrange_group_icon1"
            size="22"
          ></svg-icon>
          <svg-icon
            className="mr-2 cursor-pointer"
            iconClass="print_icon"
            size="22"
          ></svg-icon>
          <svg-icon
            className="cursor-pointer"
            iconClass="resize_icon"
            size="22"
          ></svg-icon>
        </div>
      </div>
    </div>
    <ListView class="mt-3"></ListView>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const ListView = defineAsyncComponent(() => import('./ListView.vue'));
</script>

<style></style>
