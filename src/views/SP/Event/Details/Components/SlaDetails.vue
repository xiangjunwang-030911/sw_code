<template>
  <div>
    <div
      class="grid grid-rows-4 grid-cols-2 gap-y-[20px] pb-[16px] border-b border-normal"
    >
      <template v-for="item in slaData" :key="item.title">
        <div class="flex items-center h-[30px] leading-[30px]">
          <span class="flex justify-end min-w-[100px] font-semibold">
            {{ `${item.title}: ` }}
          </span>
          <span v-if="!item.isSelect" class="flex pl-[8px]">
            {{ item.content }}
          </span>
          <span v-else class="flex pl-[8px] w-full">
            <el-select
              v-model="item.content"
              class="w-full min-w-[200px] max-w-[420px]"
            >
              <el-option
                v-for="item2 in item.option"
                :value="item2.value"
                :key="item2.value"
                >{{ item2.label }}</el-option
              >
            </el-select>
          </span>
        </div>
      </template>
    </div>
    <div class="flex flex-col">
      <div class="sla flex pt-[24px]">
        <span
          class="flex justify-end min-w-[100px] font-semibold h-[30px] leading-[30px] mt-[16px]"
        >
          SLA详细信息:
        </span>
        <div class="border border-normal flex-1 p-4 ml-[8px]">
          <p class="h-[30px] leading-[30px] mb-[16px]">经历时间: 1小时18分钟</p>
          <Table
            class="scrollBar-light2"
            :columns="slaDetailColumn"
            :data="slaDetail"
          ></Table>
        </div>
      </div>
      <div class="response pt-4 flex">
        <span
          class="flex justify-end min-w-[100px] font-semibold h-[30px] leading-[30px]"
        >
          响应时间:
        </span>
        <el-progress
          class="pl-2 w-[50%]"
          :stroke-width="10"
          :percentage="25"
          :show-text="false"
        />
        <span class="flex justify-end min-w-[100px] h-[30px] leading-[30px]">
          剩余时间: 60M
        </span>
      </div>
      <div class="solve pt-4 flex">
        <span
          class="flex justify-end min-w-[100px] font-semibold h-[30px] leading-[30px]"
        >
          解决时间:
        </span>
        <el-progress
          class="pl-2 w-[50%]"
          :percent="65"
          :stroke-width="10"
          color="#ed4014"
        />
        <span class="flex justify-end min-w-[100px] h-[30px] leading-[30px]">
          剩余时间: 12M
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, h } from 'vue';

interface Props {
  slaData: SlaData[];
  slaDetail: SlaDetail[];
}

interface SlaData {
  title: string;
  content: number | string;
  isSelect: boolean;
  option?: Option[];
}

interface Option {
  label: string;
  value: number;
}

interface SlaDetail {
  desc: string;
  response: string;
  solve: string;
  cellClassName?: CellClassName;
}

interface CellClassName {
  desc: string;
  response: string;
  solve: string;
}

withDefaults(defineProps<Props>(), {
  slaData: () => [
    {
      title: '当前状态',
      content: '一线处理',
      isSelect: false,
    },
    {
      title: '受理人',
      content: '按服务台 周铁人 | 2023/06/01 14:30:00',
      isSelect: false,
    },
    {
      title: '服务等级类型',
      content: 0,
      isSelect: true,
      option: [
        {
          label: '一般工单SLA',
          value: 0,
        },
        {
          label: '一般工单SLA 22222222',
          value: 1,
        },
      ],
    },
    {
      title: '受理日期',
      content: '2023/06/01 14:30:00',
      isSelect: false,
    },
    {
      title: '预计响应',
      content: '2023/06/02 14:30:00',
      isSelect: false,
    },
    {
      title: '预计解决',
      content: '2023/06/06 14:30:00',
      isSelect: false,
    },
    {
      title: '实际受理',
      content: '',
      isSelect: false,
    },
    {
      title: '实际解决',
      content: '',
      isSelect: false,
    },
  ],
  slaDetail: () => [
    {
      desc: '要求时间',
      response: '2023/06/02 14:30:00(24h 0m)',
      solve: '2023/06/06 14:30:00(24h 0m)',
    },
    {
      desc: '计时时间数',
      response: '----------',
      solve: '1小时18分',
    },
    {
      desc: '暂停时间数',
      response: '----------',
      solve: '0小时0分',
    },
    {
      desc: '剩余时间数',
      response: '6小时42分',
      solve: '22小时42分',
      cellClassName: {
        desc: 'last-tr',
        response: 'last-tr',
        solve: 'last-tr',
      },
    },
  ],
});

const slaDetailColumn: Table.Column[] = reactive([
  {
    label: '',
    prop: 'desc',
    align: 'center',
    renderHeader: () => {
      return h('div');
    },
    render: ({ row }) => {
      return h(
        'span',
        {
          style: {
            fontWeight: 500,
          },
        },
        row.desc,
      );
    },
  },
  {
    label: '实际受理',
    prop: 'response',
  },
  {
    label: '实际解决',
    prop: 'solve',
  },
]);
</script>

<style lang="scss" scoped>
:deep(.el-table) {
  &::before {
    height: 0;
  }
  .el-table__inner-wrapper::before {
    background-color: transparent;
  }

  tbody :last-child .el-table__cell {
    border-bottom: none;
  }
}
</style>
