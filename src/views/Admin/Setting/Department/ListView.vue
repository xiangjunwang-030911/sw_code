<template>
  <div ref="tableWrapper">
    <Table
      ref="tableWrapper"
      class="scrollBar-light2"
      row-key="id"
      :expand-row-keys="expandRowKeys"
      :columns="columns"
      :data="tableData"
      :max-height="tableHeight"
    ></Table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, h, onMounted, defineAsyncComponent } from 'vue';
import { useTableMaxHeight } from '@/hooks/tools/useTableMaxHeight';

const CustomSwitch = defineAsyncComponent(
  () => import('@/components/globalComponents/CustomSwitch.vue'),
);

const tableData: any[] = reactive([
  {
    id: '100',
    name: '总公司',
    index: 0,
    createTime: '2020/02/21 23:00:00',
    status: 1,
    _showChildren: true,
    children: [
      {
        id: '101',
        name: '总经办',
        index: 1,
        createTime: '2020/02/21 23:00:00',
        status: 1,
        children: [
          {
            id: '10100',
            name: '战略部',
            index: 1,
            createTime: '2020/02/21 23:00:00',
            status: 1,
            children: [],
          },
          {
            id: '10101',
            name: '法务部',
            index: 2,
            createTime: '2020/02/21 23:00:00',
            status: 1,
            children: [],
          },
        ],
      },
      {
        id: '102',
        name: '产品部',
        index: 2,
        createTime: '2020/02/21 23:00:00',
        status: 0,
        _showChildren: false,
        children: [],
      },
      {
        id: '103',
        name: '研发部',
        index: 3,
        createTime: '2020/02/21 23:00:00',
        status: 0,
        _showChildren: false,
        children: [],
      },
    ],
  },
]);
const columns: Table.Column[] = reactive([
  {
    label: '部门名称',
    prop: 'name',
    width: 200,
    resizable: true,
    sortable: true,
  },
  {
    label: '显示排序',
    prop: 'index',
    width: 120,
    resizable: true,
    sortable: true,
  },
  {
    label: '状态',
    prop: 'staus',
    width: 180,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(CustomSwitch, {
        modelValue: !!row.status,
        onChange: (status: boolean) => {
          console.log(status);
        },
      });
    },
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 200,
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
              class: 'cursor-pointer',
              onClick: () => {},
            },
            '增加子部门',
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
const expandRowKeys = ref<string[]>([]);
const getExpandKeys = () => {
  tableData.forEach((item) => {
    expandRowKeys.value.push(item.id + '');
  });
};

const tableWrapper = ref(null);
const tableHeight = ref(0);
onMounted(() => {
  getExpandKeys();
  useTableMaxHeight(tableHeight, tableWrapper.value);
});
</script>

<style lang="scss" scoped></style>
