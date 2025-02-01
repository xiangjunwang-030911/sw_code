<template>
  <div>
    <Table
      ref="tableWrapper"
      class="scrollBar-light2"
      :data="tableData"
      :columns="coloumns"
      :max-height="tableHeight - 60"
    >
    </Table>
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
import { reactive, ref, onMounted, h } from 'vue';
import { useTableMaxHeight } from '@/hooks/tools/useTableMaxHeight';

const tableData: any[] = reactive([
  {
    ruleName: '10网段',
    ip: '192.168.10.1-192.168.10.255',
  },
  {
    ruleName: '10网段',
    ip: '192.168.10.1-192.168.10.255',
  },
  {
    ruleName: '10网段',
    ip: '192.168.10.1-192.168.10.255',
  },
]);
const coloumns: Table.Column[] = reactive([
  {
    type: 'selection',
    width: 60,
    align: 'center',
  },
  {
    prop: 'ruleName',
    label: '规则名称',
    sortable: true,
  },
  {
    prop: 'ip',
    label: 'IP地址',
    sortable: true,
  },
  {
    label: '操作',
    render: () => {
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
              onClick: () => {},
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

<style></style>
