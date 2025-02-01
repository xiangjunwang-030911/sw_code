<template>
  <div>
    <SearchFilter>
       <template #common>
           <div class="principal-wrapper flex-1 flex items-center mr-5">
             <span class="whitespace-nowrap mr-2">负责人</span>
             <el-select class="w-full" placeholder="*所有员工">
                <el-option value="123" :key="1">张三</el-option>
             </el-select>
           </div>
           <div class="principal-wrapper flex-1 flex items-center mr-5">
             <span class="whitespace-nowrap mr-2">状态</span> 
             <el-select class="w-full" placeholder="*所有员工">
              <el-option value="123" :key="1">张三</el-option>
             </el-select>

           </div>
       </template>
    </SearchFilter>
    <Table
      ref="tableRef"
      class="w-full mt-6 "
      :columns="columns"
      :data="tableData"
      :border="true"
      :height="tableHeight"
    >
    </Table>
    <div class="flex justify-center items-center mt-4">
      <el-pagination
        layout="total,prev,pager,next,sizes"
        :page-sizes="[10,20,30,40]"
        :total="100"
      />          
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref, h } from 'vue';
import SvgIcon from '@/components/globalComponents/SvgIcon.vue';
import { useEventListener } from '@/hooks/events/useEventListener';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { useRouter, useRoute } from 'vue-router';

import { useI18n } from 'vue-i18n';
import { TableInstance } from 'element-plus';

const router=useRouter();
const route=useRoute();

const tagsViewStore=useTagsViewStore();


const { t } = useI18n();

const tableHeight = ref(0);

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
        size: 16,
        class: 'ml-1',
      });
    },
  },
  {
    label: '编号',
    prop: 'indexID',
    // resizable: true,
    // sortable: true,
    width: 60,
    render:({row})=>{
      return h(
        'span',
        {
          class:'cursor-pointor',
          onclick:()=>{
            handleGoDetails(row);
          }
        },
        row.indexID,
      )

    }
  },
  {
    label:t('home.event_id'),
    prop:'eventID',
    sortable: true,    
    width: 100,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'cursor-pointor',
          onClick: () => {
            handleGoDetails(row);
          },
        },
        row.eventID,
      );
    },
  },
  {
    label: '标题',
    sortable: true,
    prop: '',
    width: 150,
    render: ({ row }) => {
      return h('span', row.name);
    },
  },
  {
    label: '三级分类',
    sortable: true,
    prop: '',
    width: 150,
    render: ({ row }) => {
      return h('span', row.threeLevelType);
    },
  },
  {
    label: '工单来源',
    sortable: true,
    prop: '',
    width: 150,
    render: ({ row }) => {
      return h('span', row.workOrderSource);
    },
  },
  {
    label: '紧急度',
    sortable: true,
    prop: '',
    width: 90,
    render: ({ row }) => {
      const { basicClass, text } = getEmergencyDegreeClassAndText(
        row.emergencyDegree,
      );
      return h(
        'span',
        {
          class: basicClass,
        },
        text,
      );
    },
  },
  {
    label: '当前状态',
    sortable: true,
    prop: '',
    width: 150,
    render: ({ row }) => {
      return h('span', row.currentStatus);
    },
  },
  {
    label: '分配责任人',
    prop: '',
    sortable: true,
    width: 180,
    render: ({ row }) => {
      return h('span', row.assignmentResponsiblePerson);
    },
  },
  {
    label: '提交日期',
    prop: '',
    sortable: true,
    width: 200,
    render: ({ row }) => {
      return h('span', row.commitDate);
    },
  },
  {
    label: '剩余响应时间',
    prop: '',
    sortable: true,
    width: 200,
    render: ({ row }) => {
      return h(
        'span',
        { class: 'text-[#0043C8] cursor-pointer', onclick: () => {} },
        row.remainResponseTime,
      );
    },
  },
  {
    label: '剩余解决时间',
    prop: '',
    sortable: true,
    width: 200,
    render: ({ row }) => {
      return h(
        'span',
        {
          class: 'text-[#B80000] cursor-pointer',
          onclick: () => {},
        },
        row.remainSolutionTime,
      );
    },
  },
]);

const tableRef = ref<TableInstance>();

function handleTableHeight() {
  nextTick(() => {
    const { top } = tableRef.value?.$el.getBoundingClientRect();
    tableHeight.value = window.innerHeight - top - 60;
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
      basicClass += 'bg-[#85C56E]';
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

function handleGoDetails(row:TableDataItem) {
    router.push(
      {
        name:'SP-Event-Details',
        params:{
          id:row.eventID,
        }
      }
    ).then(
      ()=>{
        tagsViewStore.addTagsViewList({
          title:`事件-${row.eventID}`,
          name:`/sp/event/details/${row.eventID}`,
          meta:route.meta,
        })
      }
    )
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
