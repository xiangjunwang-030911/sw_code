<template>
  <div class="py-4">
    <div class="text-[18px] font-medium">许可证管理</div>
    <div class="mt-3 flex items-center">
      <span class="text-[#505050]"
        >许可证信息：beijing techexcel 终身付费授权（永久有效）</span
      >
      <el-button class="ml-1" type="primary">更新</el-button>
    </div>
    <Table class="mt-3" :data="tableData" :columns="columns"></Table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const tableData: any[] = reactive([
  {
    type: '固定许可',
    countOfBuy: 50,
    countOfUse: 49,
    endTime: '长期有效',
  },
  {
    type: '浮动许可',
    countOfBuy: 50,
    countOfUse: 49,
    endTime: '长期有效',
  },
]);
const columns: Table.Column[] = reactive([
  {
    type: 'index',
    label: '序号',
    sortable: true,
  },
  {
    prop: 'type',
    label: '许可类型',
    sortable: true,
  },
  {
    prop: 'countOfBuy',
    label: '已购数量',
    sortable: true,
  },
  {
    prop: 'countOfUse',
    label: '已用数量',
    sortable: true,
  },
  {
    prop: 'endTime',
    label: '有效期',
    sortable: true,
  },
]);
</script>

<style></style>
