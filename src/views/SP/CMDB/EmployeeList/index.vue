<template>
  <div>
    <SearchFilter></SearchFilter>
    <Table
      ref="tableRef"
      class="w-full scrollBar-light2 mt-6"
      :columns="columns"
      :data="tableData"
      :height="tableHeight"
    ></Table>
    <div class="flex justify-center items-center mt-4">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[25, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, h } from 'vue';
import { useRouter } from 'vue-router';
import { useEventListener } from '@/hooks/events/useEventListener';
import logo from '@/assets/logo.png';
import SearchFilter from '@/views/SP/Event/EmployeeList/components/SearchFilter.vue';
import { TableInstance } from 'element-plus';

const router = useRouter();

interface TableDataItem {
  id: number;
  name: string;
  workOrderType: string;
  username: string;
  loginAccount: string;
  phone: string;
  email: string;
  sex: string;
  status: number;
  createTime: string;
  department: string;
}
let tableData: TableDataItem[] = reactive([]);
let columns: Table.Column[] = reactive([
  {
    type: 'selection',
    width: 60,
    align: 'center',
    fixed: 'left',
    resizable: true,
  },
  {
    label: '用户ID',
    prop: 'id',
    width: 120,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoEmployeeDetail(row),
        },
        row.id,
      );
    },
  },
  {
    label: '用户名',
    prop: 'name',
    width: 120,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center cursor-pointer',
          onclick: () => handleGoEmployeeDetail(row),
        },
        [
          h('img', {
            src: logo,
            class: 'mr-1 w-[14px] h-[14px] overflow-hidden rounded-full',
          }),
          h('span', row.name),
        ],
      );
    },
  },
  {
    label: '登录账户',
    prop: 'loginAccount',
    width: 180,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoEmployeeDetail(row),
        },
        row.loginAccount,
      );
    },
  },
  {
    label: '手机号',
    prop: 'phone',
    width: 140,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoEmployeeDetail(row),
        },
        row.phone,
      );
    },
  },
  {
    label: '邮箱',
    prop: 'email',
    width: 200,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoEmployeeDetail(row),
        },
        row.email,
      );
    },
  },
  {
    label: '性别',
    prop: 'sex',
    width: 120,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoEmployeeDetail(row),
        },
        row.sex,
      );
    },
  },
  {
    label: '状态',
    prop: 'statue',
    width: 120,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      const status = row.status;
      return h(
        'div',
        {
          class: 'flex items-center cursor-pointer',
          onclick: () => handleGoEmployeeDetail(row),
        },
        [
          h('span', {
            class: `w-[8px] h-[8px] rounded-full mr-1 border border-[#E7F7EF]  ${
              status == 1 ? 'bg-[#44B044]' : 'bg-[#A6A6A6]'
            }`,
          }),
          h('span', status == 1 ? '激活' : '未激活'),
        ],
      );
    },
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 200,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoEmployeeDetail(row),
        },
        row.createTime,
      );
    },
  },
  {
    label: '所在部门',
    prop: 'department',
    minWidth: 120,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoEmployeeDetail(row),
        },
        row.department,
      );
    },
  },
]);
const currentPage = ref(1);
const pageSize = ref(25);
const tableHeight = ref(0);

const tableRef = ref<TableInstance>();

function handleTableHeight() {
  nextTick(() => {
    const { top } = tableRef.value?.$el.getBoundingClientRect();
    tableHeight.value = window.innerHeight - top - 60;
  });
}

function handleGoEmployeeDetail(row: TableDataItem) {
  router.push({
    name: 'SP-Event-EmployeeDetails',
    params: {
      id: row.id,
    },
  });
}

onMounted(() => {
  useEventListener({
    name: 'resize',
    listener: () => {
      handleTableHeight();
    },
    immediate: true,
  });
  for (let i = 0; i < 20; i++) {
    let item = {
      id: i + 1,
      name: 'frankZ',
      workOrderType: i + '事件工单',
      username: 'John Brown' + i,
      loginAccount: 'Zengjiayuan',
      phone: '1392342221',
      email: 'FrankZ@techexcel.com',
      sex: '男',
      status: i % 2,
      createTime: '2023/04/14 09:49:00',
      department: '北京分公司',
    };
    tableData.push(item);
  }
});
</script>

<style></style>
