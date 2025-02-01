<template>
  <div>
    <Table
      class="w-full scrollBar-light2"
      ref="tableRef"
      :columns="columns"
      :data="tableData"
      :height="tableHeight"
    >
    </Table>
    <div class="flex justify-center items-center mt-4">
      <el-pagination
        layout="total, prev, pager, next, sizes"
        :page-sizes="[10, 20, 30, 40]"
        :total="100"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, h } from 'vue';
import SvgIcon from '@/components/globalComponents/SvgIcon.vue';
import { TableInstance } from 'element-plus';

interface TableData {
  qz: number;
  indexID: number;
  eventID: number;
  workOrderType: string;
  name: string;
  threeLevelType: string;
  workOrderSource: string;
  degreeOfRrgency: string;
  currentStatus: string;
  assignmentResponsiblePerson: string;
  commitDate: string;
  predictedResponse: string;
}
const tableData: TableData[] = reactive([]);
const columns: Table.Column[] = reactive([
  {
    type: 'selection',
    width: 60,
    align: 'center',
    fixed: 'left',
    resizable: true,
  },
  {
    label: '旗帜',
    width: 60,
    prop: 'qz',
    resizable: true,
    render: () => {
      return h(SvgIcon, {
        iconClass: 'flag_normal',
      });
    },
    renderHeader: () => {
      return h(SvgIcon, {
        iconClass: 'flag2_icon',
        size: 14,
        class: 'ml-1',
      });
    },
  },

  {
    label: '编号',
    prop: 'indexID',
    width: 120,
    resizable: true,
    sortable: true,
  },
  {
    label: '事件ID',
    prop: 'eventID',
    width: 120,
    resizable: true,
    sortable: true,
  },
  {
    label: '工单分类',
    prop: 'workOrderType',
    width: 120,
    resizable: true,
    sortable: true,
  },
  {
    label: '标题',
    prop: 'name',
    width: 120,
    resizable: true,
    sortable: true,
  },
  {
    label: '三级分类',
    prop: 'threeLevelType',
    width: 120,
    resizable: true,
    sortable: true,
  },
  {
    label: '工单来源',
    prop: 'workOrderSource',
    width: 120,
    resizable: true,
    sortable: true,
  },
  {
    label: '紧急度',
    prop: 'degreeOfRrgency',
    width: 120,
    resizable: true,
    sortable: true,
  },
  {
    label: '当前状态',
    prop: 'currentStatus',
    width: 120,
    resizable: true,
    sortable: true,
  },
  {
    label: '分派责任人',
    prop: 'assignmentResponsiblePerson',
    width: 180,
    resizable: true,
    sortable: true,
  },
  {
    label: '提交日期',
    prop: 'commitDate',
    width: 180,
    resizable: true,
    sortable: true,
  },
  {
    label: '预计响应',
    prop: 'predictedResponse',
    minWidth: 180,
    sortable: true,
  },
]);
const tableHeight = ref(0);
const tableRef = ref<TableInstance>();

onMounted(() => {
  for (let i = 0; i < 20; i++) {
    let item = {
      qz: 1,
      indexID: i + 1,
      eventID: 605 + i,
      workOrderType: i + '事件工单',
      name: 'John Brown' + i,
      threeLevelType: '网络故障',
      workOrderSource: 'ITSM',
      degreeOfRrgency: '一般',
      currentStatus: '服务台受理',
      assignmentResponsiblePerson: 'Admin ServiceWise',
      commitDate: '2023/04/14 09:49:00',
      predictedResponse: '2023/04/14 09:49:00',
    };
    tableData.push(item);
  }

  setTimeout(() => {
    const { top } = tableRef?.value?.$el.getBoundingClientRect();
    tableHeight.value = window.innerHeight - top - 60;
  }, 300);
});
</script>

<style></style>
