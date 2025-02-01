<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="font-semibold">动态</div>
      <el-button-group class="mr-4">
        <el-button type="default">
          <span class="text-xs">新建</span>
        </el-button>
        <el-button type="default">
          <span class="text-xs">打开</span>
        </el-button>
      </el-button-group>
    </div>
    <Table :columns="columns" :data="tableData" class="mt-4"></Table>
  </div>
</template>

<script setup lang="ts">
const tableData = ref([
  {
    date: '2023-08-18 17:03',
    type: '音想',
    duration: '00:04',
    createBy: 'jianping',
  },
]);

const columns: Table.Column[] = [
  {
    prop: 'date',
    label: '日期/时间',
    sortable: true,
  },
  {
    prop: 'type',
    label: '类型',
    sortable: true,
  },
  {
    prop: 'duration',
    label: '时长',
    sortable: true,
  },
  {
    prop: 'createBy',
    label: '创建人',
    sortable: true,
  },
];
</script>

<style lang="scss" scoped></style>
