<template>
  <div>
    <Table
      ref="tableWrapper"
      class="scrollBar-light2"
      :columns="columns"
      :data="tableData"
      :max-height="tableHeight - 60"
    ></Table>
    <div class="flex justify-center mt-5">
      <el-pagination
        layout="total, prev, pager, next, sizes"
        :page-sizes="[10, 20, 30, 40]"
        :total="tableData.length"
        @current-change="createReq"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineAsyncComponent, h, onMounted } from 'vue';
import { useTableMaxHeight } from '@/hooks/tools/useTableMaxHeight';

const CustomSwitch = defineAsyncComponent(
  () => import('@/components/globalComponents/CustomSwitch.vue'),
);

const tableData: any[] = reactive([
  {
    title: '停机公告',
    status: 1,
    content: '10.04 凌晨03:00-07:00',
    createTime: '2022-09-20',
    expirationTime: '2023-09-20',
  },
  {
    title: '停机公告',
    status: 0,
    content: '昨天早上有人没有及时维护',
    createTime: '2022-09-20',
    expirationTime: '2023-09-20',
  },
]);
const columns: Table.Column[] = reactive([
  {
    type: 'selection',
    width: 60,
    align: 'center',
  },
  {
    label: '序号',
    type: 'index',
    width: 90,
    resizable: true,
    sortable: true,
  },
  {
    label: '公告标题',
    prop: 'title',
    width: 180,
    resizable: true,
    sortable: true,
  },
  {
    label: '公告对象',
    prop: 'noticeObject',
    width: 200,
    resizable: true,
    sortable: true,
    render: () => {
      return h(
        'div',
        {
          class: 'flex items-center',
        },
        [
          h(
            'div',
            {
              class: 'px-2 bg-[#FF864D] text-white mr-1',
            },
            'SWP',
          ),
          h(
            'div',
            {
              class: 'px-2 bg-[#FF864D] text-white mr-1',
            },
            'EWP',
          ),
        ],
      );
    },
  },
  {
    label: '状态',
    prop: 'status',
    width: 200,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center',
        },
        [
          h(CustomSwitch, {
            modelValue: !!row.status,
            onChange: (status: boolean) => {
              row.status = status ? 1 : 0;
            },
            class: 'mr-2',
          }),
          h('span', row.status ? '激活' : '未激活'),
        ],
      );
    },
  },
  {
    label: '内容',
    prop: 'content',
    width: 200,
    resizable: true,
    sortable: true,
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 120,
    resizable: true,
    sortable: true,
  },
  {
    label: '过期时间',
    prop: 'expirationTime',
    width: 120,
    resizable: true,
    sortable: true,
  },
  {
    label: '操作',
    prop: 'action',
    minWidth: 280,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex justify-between items-center',
        },
        [
          h(
            'span',
            {
              class: 'cursor-pointer',
              onClick: () => {
                console.log(row);
              },
            },
            '查看',
          ),
          h(
            'span',
            {
              class: 'cursor-pointer',
              onClick: () => {},
            },
            '编辑',
          ),
          h(
            'span',
            {
              class: 'cursor-pointer text-[#B04444]',
              onClick: () => {},
            },
            '删除',
          ),
        ],
      );
    },
  },
]);
const createReq = (val: number) => {
  console.log('新建请求', val);
};

const tableWrapper = ref(null);
const tableHeight = ref(0);
onMounted(() => {
  useTableMaxHeight(tableHeight, tableWrapper.value);
});
</script>

<style lang="scss" scoped></style>
