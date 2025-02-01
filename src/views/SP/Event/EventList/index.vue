<template>
  <div>
    <SearchFilter>
      <template #common>
        <div class="principal-wrapper flex-1 flex items-center mr-5">
          <span class="whitespace-nowrap mr-2">负责人</span>
          <el-select class="w-full" placeholder="*所有员工" clearable>
            <el-option value="123" :key="1">张三</el-option>
          </el-select>
        </div>
        <div class="status-wrapper flex-1 flex items-center">
          <span class="whitespace-nowrap mr-2">状态</span>
          <el-select class="w-full" placeholder="*所有员工" clearable>
            <el-option value="123" :key="1">张三</el-option>
          </el-select>
        </div>
      </template>
    </SearchFilter>
    <Table
      ref="tableRef"
      class="w-full scrollBar-light2 mt-6"
      :columns="columns"
      :data="tableData"
      :height="tableHeight"
      :border="true"
    ></Table>
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
import SvgIcon from '@/components/globalComponents/SvgIcon.vue';

import { nextTick, onMounted, reactive, ref, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useEventListener } from '@/hooks/events/useEventListener';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { TableInstance } from 'element-plus';

const router = useRouter();
const route = useRoute();
const tagsViewStore = useTagsViewStore();

const { t } = useI18n();

interface TableDataItem {
  qz: number;
  indexID: number;
  eventID: number;
  workOrderType: string;
  name: string;
  threeLevelType: string;
  workOrderSource: string;
  emergencyDegree: number;
  currentStatus: string;
  assignmentResponsiblePerson: string;
  commitDate: string;
  predictedResponse: string;
  remainResponseTime: string;
  remainSolutionTime: string;
}

let tableData: TableDataItem[] = reactive([]);
let columns: Table.Column[] = reactive([
  {
    type: 'selection',
    width: 60,

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
    resizable: true,
    sortable: true,
    width: 90,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => {
            handleGoDetails(row);
          },
        },
        row.indexID,
      );
    },
  },
  {
    label: t('home.event_id'),
    prop: 'eventID',
    width: 130,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoDetails(row),
        },
        row.eventID,
      );
    },
  },
  {
    label: '标题',
    prop: 'name',
    width: 150,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoDetails(row),
        },
        row.name,
      );
    },
  },
  {
    label: '三级分类',
    prop: 'threeLevelType',
    width: 120,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoDetails(row),
        },
        row.threeLevelType,
      );
    },
  },
  {
    label: '工单来源',
    prop: 'workOrderSource',
    width: 120,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoDetails(row),
        },
        row.workOrderSource,
      );
    },
  },
  {
    label: '紧急度',
    prop: 'emergencyDegree',
    width: 120,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      const { basicClass, text } = getEmergencyDegreeClassAndText(
        row.emergencyDegree,
      );
      return h(
        'div',
        {
          class: basicClass,
        },
        text,
      );
    },
  },
  {
    label: '当前状态',
    prop: 'currentStatus',
    width: 120,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoDetails(row),
        },
        row.currentStatus,
      );
    },
  },
  {
    label: '分派责任人',
    prop: 'assignmentResponsiblePerson',
    width: 180,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoDetails(row),
        },
        row.assignmentResponsiblePerson,
      );
    },
  },
  {
    label: '提交日期',
    prop: 'commitDate',
    width: 200,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointer',
          onclick: () => handleGoDetails(row),
        },
        row.commitDate,
      );
    },
  },
  {
    label: '剩余响应时间',
    prop: 'remainResponseTime',
    width: 200,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'div',
        {
          class: 'text-[#0043C8] cursor-pointer',
          onclick: () => handleGoDetails(row),
        },
        row.remainResponseTime,
      );
    },
  },
  {
    label: '剩余解决时间',
    prop: 'remainSolutionTime',
    width: 200,
    sortable: true,
    render: ({ row }) => {
      return h(
        'div',
        {
          class: 'text-[#B80000] cursor-pointer',
          onclick: () => handleGoDetails(row),
        },
        row.remainSolutionTime,
      );
    },
  },
]);

const tableHeight = ref(0);

const tableRef = ref<TableInstance>();

function handleTableHeight() {
  nextTick(() => {
    const { top } = tableRef.value?.$el.getBoundingClientRect();
    tableHeight.value = window.innerHeight - top - 80;
  });
}

function handleGoDetails(row: TableDataItem) {
  router
    .push({
      name: 'SP-Event-Details',
      params: {
        id: row.eventID,
      },
    })
    .then(() => {
      tagsViewStore.addTagsViewList({
        title: `事件-${row.eventID}`,
        name: `/sp/event/details/${row.eventID}`,
        // router: `/sp/event/details/${row.eventID}`,
        meta: route.meta,
      });
    });
}

function getEmergencyDegreeClassAndText(degree: number) {
  let basicClass = 'w-[40px] text-white text-center ';
  let text = '最高';
  switch (degree) {
    case 0:
      basicClass += 'bg-[#B04444]';
      text = '最高';
      break;
    case 1:
      basicClass += 'bg-[#FF864D]';
      text = '较高';
      break;
    case 2:
      basicClass += 'bg-[#4DAEFF]';
      text = '普通';
      break;
    case 3:
      basicClass += 'bg-[#85C56E]';
      text = '一般';
      break;
    case 4:
      basicClass += 'bg-[#B3B3B3]';
      text = '最低';
      break;
    default:
      break;
  }
  return {
    basicClass,
    text,
  };
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
    let item: TableDataItem = {
      qz: 1,
      indexID: i + 1,
      eventID: 605 + i,
      workOrderType: i + '事件工单',
      name: 'John Brown' + i,
      threeLevelType: '网络故障',
      workOrderSource: 'ITSM',
      emergencyDegree: i % 5,
      currentStatus: '服务台受理',
      assignmentResponsiblePerson: 'Admin ServiceWise',
      commitDate: '2023/04/14 09:49:00',
      predictedResponse: '2023/04/14 09:49:00',
      remainResponseTime: '7h 58m',
      remainSolutionTime: '-4d 5h 23m',
    };
    tableData.push(item);
  }
});
</script>

<style lang="scss" scoped></style>
