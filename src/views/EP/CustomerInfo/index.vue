<template>
  <div class="w-full h-full px-3 pt-3">
    <el-card class="box-card enter-x" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>客户信息</span>
        </div>
      </template>
      <el-form :model="form" :label-width="110">
        <el-form-item label="公司名称">
          <el-input v-model="form.companyName" class="w-96"></el-input>
        </el-form-item>
        <el-form-item label="公司城市">
          <el-input v-model="form.companyCity" class="w-96"></el-input>
        </el-form-item>
        <el-form-item label="公司地址及简介">
          <el-input
            v-model="form.conpanyAdress"
            type="textarea"
            class="w-96"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card no-padding no-line mt-3 enter-x" shadow="hover">
      <template #header>
        <div class="card-header px-[18px] py-[20px]">
          <span>联系人</span>
        </div>
      </template>
      <Table :columns="columns" :data="tableData"></Table>
    </el-card>
    <el-card class="box-card no-padding mt-3 no-line enter-x" shadow="hover">
      <template #header>
        <div class="card-header px-[18px] py-[20px]">
          <span>支持团队</span>
        </div>
      </template>
      <Table :columns="teamColumns" :data="teamTableData"></Table>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  companyName: '北京海天起点技术有限公司',
  companyCity: '北京',
  conpanyAdress: '北京市朝阳区东大桥路8号尚都国际中心28',
});

const columns = [
  {
    label: '姓名',
    prop: 'name',

    resizable: true,
  },
  {
    label: '联系方式',
    prop: 'phone',

    resizable: true,
  },
  {
    label: '邮件',
    prop: 'email',

    resizable: true,
  },
];
const teamColumns = [
  {
    label: '类型',
    prop: 'type',

    resizable: true,
  },
  {
    label: '名称',
    prop: 'name',

    resizable: true,
  },
  {
    label: '联系方式',
    prop: 'phone',

    resizable: true,
  },
  {
    label: '邮件',
    prop: 'email',

    resizable: true,
  },
];

const tableData = reactive([
  { name: '李登星', phone: '1234567890', email: '123456@163.com' },
  { name: '张三', phone: '1234567890', email: '123456@163.com' },
  { name: '李四', phone: '1234567890', email: '123456@163.com' },
]);

const teamTableData = reactive([
  {
    name: '北京泰克赛尔软件有限公司',
    phone: '1234567890',
    email: '123456@163.com',
    type: '支持团队',
  },
  {
    name: '(北京) 腾飞',
    phone: '1234567890',
    email: '123456@163.com',
    type: '销售人员',
  },
  {
    name: '(嘉兴) 周佳杰',
    phone: '1234567890',
    email: '123456@163.com',
    type: '支持人员',
  },
  {
    name: 'N/A',
    phone: '1234567890',
    email: '123456@163.com',
    type: '项目经理',
  },
]);
</script>

<style lang="scss" scoped>
:deep(.el-table) {
  td {
    border-bottom: none !important;
  }
}
</style>
