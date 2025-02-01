<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <el-checkbox v-model="showAllEvent" class="pr-[24px]"
          >显示所有事件和子事件</el-checkbox
        >
        <label class="pr-[8px]">项目:</label>
        <el-select v-model="project" class="w-[200px]">
          <el-option
            v-for="item in projectList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</el-option
          >
        </el-select>
        <svg-icon
          iconClass="arrange_group_icon1"
          size="24"
          className=" ml-4 cursor-pointer"
        />
        <svg-icon iconClass="treeIcon" size="24" className=" cursor-pointer" />
      </div>
      <svg-icon
        iconClass="setting_icon"
        size="24"
        className=" cursor-pointer"
      />
    </div>
    <div class="pt-[24px]">
      <Table
        class="scrollBar-light2"
        :columns="activityColumn"
        :data="activityData"
      ></Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/globalComponents/SvgIcon.vue';
import { reactive, ref, h } from 'vue';

const showAllEvent = ref(false);
const project = ref(false);

interface ProjectItem {
  value: string;
  label: string;
}
const projectList: ProjectItem[] = reactive([
  {
    value: '0',
    label: '01.服务台&事件管理',
  },
  {
    value: '1',
    label: '02.服务台&事件管理',
  },
  {
    value: '2',
    label: '03.服务台&事件管理',
  },
]);

const activityColumn: Table.Column[] = reactive([
  {
    label: '',
    type: 'expand',
    width: 50,
    render: ({ row }) => {
      return h('div', { class: 'p-4' }, row.desc);
    },
  },
  {
    label: '名称',
    prop: 'title',
    minWidth: 440,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center',
        },
        [
          h(SvgIcon, {
            iconClass: 'flag_normal',
          }),
          h('span', row.title),
        ],
      );
    },
  },
  {
    label: '负责人',
    prop: 'director',
    width: 140,
    resizable: true,
    sortable: true,
  },
  {
    label: '状态',
    prop: 'status',
    width: 140,
    resizable: true,
    sortable: true,
  },
  {
    label: '附件',
    prop: 'annex',
    width: 220,
    resizable: true,
    sortable: true,
  },
  {
    label: '创建人',
    prop: 'creator',
    width: 140,
    resizable: true,
    sortable: true,
  },
]);
const activityData = reactive([
  {
    title: '离职（ID=442）',
    desc: '描述：用于提醒销售总监有项目已到签订合同阶段',
    director: 'Frank Zeng',
    status: '已办结',
    annex: '离职证明.pdf',
    creator: 'Jiajie Zhou',
  },
  {
    title: '安装打印机（ID=436）',
    desc: '描述：用于提醒销售总监有项目已到签订合同阶段',
    director: 'Frank Zeng',
    status: '已办结',
    annex: '-',
    creator: 'Jiajie Zhou',
  },
  {
    title: '0526申请开通测试服务器VPN账号：开通网络权限（ID=43）',
    desc: '描述：用于提醒销售总监有项目已到签订合同阶段',
    director: 'Frank Zeng',
    status: '已办结',
    annex: '账号信息.pdf',
    creator: 'Jiajie Zhou',
  },
  {
    title: '申请开通测试服务器VPN账号（ID=430）',
    desc: '描述：用于提醒销售总监有项目已到签订合同阶段',
    director: 'Frank Zeng',
    status: '已办结',
    annex: 'VPN账号信息.pdf',
    creator: 'Jiajie Zhou',
  },
  {
    title: 'DMS账号申请（ID=427）',
    desc: '描述：用于提醒销售总监有项目已到签订合同阶段',
    director: 'Frank Zeng',
    status: '已办结',
    annex: 'VPN账号信息.pdf',
    creator: 'Jiajie Zhou',
  },
  {
    title: '笔记本（ID=426）',
    desc: '描述：用于提醒销售总监有项目已到签订合同阶段',
    director: 'Frank Zeng',
    status: '已办结',
    annex: '笔记本信息.doc',
    creator: 'Jiajie Zhou',
  },
  {
    title: '钉钉出问题了（ID=425）',
    desc: '描述：用于提醒销售总监有项目已到签订合同阶段',
    director: 'Frank Zeng',
    status: '已办结',
    annex: '笔记本信息.doc',
    creator: 'Jiajie Zhou',
  },
  {
    title: '帮我重置一下OA密码（ID=423）',
    desc: '描述：用于提醒销售总监有项目已到签订合同阶段',
    director: 'Frank Zeng',
    status: '已办结',
    annex: '-',
    creator: 'Jiajie Zhou',
  },
  {
    title: '不能开机（ID=421）',
    desc: '描述：用于提醒销售总监有项目已到签订合同阶段',
    director: 'Frank Zeng',
    status: '已办结',
    annex: '-',
    creator: 'Jiajie Zhou',
  },
  {
    title: '安装打印机（ID=436）',
    desc: '描述：用于提醒销售总监有项目已到签订合同阶段',
    director: 'Frank Zeng',
    status: '已办结',
    annex: '-',
    creator: 'Jiajie Zhou',
  },
  {
    title: '0526申请开通测试服务器VPN账号：开通网络权限（ID=43）',
    desc: '描述：用于提醒销售总监有项目已到签订合同阶段',
    director: 'Frank Zeng',
    status: '已办结',
    annex: '-',
    creator: 'Jiajie Zhou',
  },
]);
</script>

<style lang="scss" scoped>
:deep(.el-table__cell) {
  width: 100%;
  padding: 0;
}

:deep(.el-table td) {
  height: 58px;
  border-bottom: none;
  border-top: 1px solid var(--el-border-color-light);
}

:deep(td.ivu-table-expanded-cell) {
  border: none;
  background-color: var(--el-bg-color);
}
</style>
