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
        <el-button class="ml-6" type="primary">新建子事件</el-button>
        <el-button>添加附件为子事件</el-button>
        <el-button>发送邮件</el-button>
        <el-button>批量下载</el-button>
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
  master: string;
  attachment: string;
  status: string;
  createUser: string;
  children: {
    id: number;
    title: string;
    master: string;
    attachment: string;
    status: string;
    createUser: string;
  }[];
}
const tableData: TableData[] = [
  {
    id: 1,
    title: '&nbsp；安装打印机（ID=436）：',
    master: 'Frank Zeng',
    attachment: '离职证明.pdf',
    status: '附件',
    createUser: 'Jiajie Zhou',
    children: [
      {
        id: 2,
        title: '事件文件附件（附件，没有访问权限）',
        master: 'Frank Zeng',
        attachment: '离职证明.pdf',
        status: '附件',
        createUser: 'Jiajie Zhou',
      },
      {
        id: 3,
        title: '事件文件附件（附件，没有访问权限）',
        master: 'Frank Zeng',
        attachment: '离职证明.pdf',
        status: '附件',
        createUser: 'Jiajie Zhou',
      },
    ],
  },
  {
    id: 4,
    title: '安装打印机（ID=436）',
    master: 'Frank Zeng',
    attachment: '离职证明.pdf',
    status: '附件',
    createUser: '周铁人',
    children: [
      {
        id: 5,
        title: '事件文件附件（附件，没有访问权限）',
        master: 'Frank Zeng',
        attachment: '离职证明.pdf',
        status: '附件',
        createUser: 'Jiajie Zhou',
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
    prop: 'master',
    label: '负责人',
  },
  {
    prop: 'status',
    label: '状态',
  },
  {
    prop: 'attachment',
    label: '附件',
  },
  {
    prop: 'createUser',
    label: '创建人',
  },
];
</script>

<style lang="scss" scoped></style>
