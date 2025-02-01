<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <el-checkbox label="显示普通子流程"></el-checkbox>
        <div class="ml-6">
          <span>排序方式：</span>
          <el-select v-model="sortType" placeholder="">
            <el-option label="截止日期(降序)" :value="1"></el-option>
          </el-select>
        </div>
        <svg-icon
          class="ml-6 cursor-pointer"
          iconClass="arrange_group_icon1"
          size="25"
        ></svg-icon>
        <svg-icon
          class="ml-2 cursor-pointer"
          iconClass="treeIcon"
          size="25"
        ></svg-icon>
        <el-button class="ml-6" type="primary">新建链接</el-button>
        <el-button>跨项目拷贝</el-button>
      </div>
      <div class="flex items-center">
        <svg-icon class="cursor-pointer" iconClass="settingIcon"></svg-icon>
      </div>
    </div>
    <Table
      class="mt-4"
      :data="tableData"
      :columns="columns"
      row-key="id"
      :expand-row-keys="['1']"
    ></Table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sortType = ref('');
interface TableData {
  id: number;
  title: string;
  status: string;
  projectId: number;
  children: {
    id: number;
    title: string;
    status: string;
    projectId: number;
  }[];
}
const tableData: TableData[] = [
  {
    id: 1,
    title: '01.服务台&事件管理',
    status: '关闭',
    projectId: 106,
    children: [
      {
        id: 2,
        title: '桂林南药出库单内容描述调整',
        status: '关闭',
        projectId: 106,
      },
      {
        id: 3,
        title: '桂林南药出库单内容描述调整',
        status: '关闭',
        projectId: 106,
      },
      {
        id: 4,
        title: '桂林南药出库单内容描述调整',
        status: '关闭',
        projectId: 106,
      },
      {
        id: 5,
        title: '桂林南药出库单内容描述调整',
        status: '关闭',
        projectId: 106,
      },
    ],
  },
];
const columns: Table.Column[] = [
  {
    width: 300,
    prop: 'title',
    label: '名称',
  },
  {
    prop: 'status',
    label: '状态',
  },
  {
    prop: 'projectId',
    label: '项目ID',
  },
];
</script>

<style lang="scss" scoped></style>
