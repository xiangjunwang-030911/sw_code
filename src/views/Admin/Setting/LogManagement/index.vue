<template>
  <div>
    <div ref="headWrapper">
      <p class="pt-4 pb-6 text-[18px] font-semibold leading-[25px]">操作日志</p>
      <div
        class="pb-6 grid grid-rows-2 grid-cols-2 gap-x-6 gap-y-6 lg:grid-rows-1 lg:grid-cols-4 items-center"
      >
        <div class="flex items-center">
          <p class="w-[70px] whitespace-nowrap mr-1">系统模块:</p>
          <el-input
            class="w-[200px]"
            placeholder="系统模块"
            v-model="systemModule"
          ></el-input>
        </div>
        <div class="flex items-center">
          <p class="w-[70px] whitespace-nowrap mr-1">操作类型:</p>
          <el-select
            v-model="operationType"
            class="w-[200px]"
            placeholder="操作类型"
          >
            <el-option
              v-for="item in operationTypeList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </div>
        <div class="flex items-center">
          <p class="w-[70px] whitespace-nowrap mr-1">操作人员:</p>
          <el-input
            class="w-[200px]"
            placeholder="操作人员"
            v-model="operator"
          ></el-input>
        </div>
        <div class="flex items-center">
          <p class="w-[70px] whitespace-nowrap mr-1">操作状态:</p>
          <el-select
            v-model="operationStatus"
            class="w-[200px]"
            placeholder="操作状态"
          >
            <el-option
              v-for="item in operationStatusList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="flex items-center pb-6">
        <p class="w-[70px] whitespace-nowrap">操作时间:</p>
        <span>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="w-[250px]"
            @change="handleOk"
          >
          </el-date-picker>
        </span>

        <el-button type="primary" class="w-[70px] ml-2">查询</el-button>
        <el-button type="default" class="w-[70px] ml-2">重置</el-button>
      </div>
      <div class="pb-6 flex items-center justify-between">
        <div>
          <el-button type="primary" class="w-[70px] ml-2">导出</el-button>
          <el-button type="default" class="w-[70px] ml-2 p-0"
            >清空日志</el-button
          >
        </div>
        <div class="flex items-center">
          <svg-icon
            className="mr-2 cursor-pointer"
            iconClass="refresh_icon"
            size="22"
          ></svg-icon>
          <svg-icon
            className="mr-2 cursor-pointer"
            iconClass="search_icon"
            size="21"
          ></svg-icon>
          <svg-icon
            className="mr-2 cursor-pointer"
            iconClass="arrange_group_icon1"
            size="22"
          ></svg-icon>
          <svg-icon
            className="mr-2 cursor-pointer"
            iconClass="print_icon"
            size="22"
          ></svg-icon>
          <svg-icon
            className="cursor-pointer"
            iconClass="resize_icon"
            size="22"
          ></svg-icon>
        </div>
      </div>
    </div>
    <div class="mb-[20px]">
      <Table
        ref="tableWrapper"
        class="scrollBar-light2"
        :data="logData"
        :columns="logColoumns"
        :max-height="tableHeight - 60"
      >
      </Table>
    </div>
    <div class="flex justify-center items-center">
      <el-pagination
        layout="total, prev, pager, next, sizes"
        :page-sizes="[20, 30, 40]"
        :total="logData.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, h, onMounted } from 'vue';
import { useTableMaxHeight } from '@/hooks/tools/useTableMaxHeight';
const systemModule = ref('');
const operationType = ref('');
const operator = ref('');
const operationStatus = ref('');
interface OperationItem {
  label: string;
  value: string;
}
const operationTypeList: OperationItem[] = reactive([
  {
    label: '事件管理',
    value: '0',
  },
  {
    label: '问题管理',
    value: '1',
  },
]);
const operationStatusList: OperationItem[] = reactive([
  {
    label: '注销',
    value: '0',
  },
  {
    label: '登录',
    value: '1',
  },
]);
const isShowDatePicker = ref(false);
const dateRange = ref('');
const logData: any[] = reactive([
  {
    no: 3122,
    module: '事件管理',
    type: '登录',
    operator: 'admin',
    ip: '127.0.0.1',
    address: '山西省',
    status: true,
    date: '2023/06/17 13:00:01',
  },
  {
    no: 3122,
    module: '事件管理',
    type: '登录',
    operator: 'admin',
    ip: '127.0.0.1',
    address: '山西省',
    status: true,
    date: '2023/06/17 13:00:01',
  },
  {
    no: 3122,
    module: '事件管理',
    type: '登录',
    operator: 'admin',
    ip: '127.0.0.1',
    address: '山西省',
    status: true,
    date: '2023/06/17 13:00:01',
  },
  {
    no: 3122,
    module: '事件管理',
    type: '登录',
    operator: 'admin',
    ip: '127.0.0.1',
    address: '山西省',
    status: true,
    date: '2023/06/17 13:00:01',
  },
]);

const logColoumns: Table.Column[] = reactive([
  {
    type: 'selection',
    width: 60,
    align: 'center',
  },
  {
    label: '日志编号',
    prop: 'no',
    width: 120,
    align: 'left',
    resizable: true,
    sortable: true,
  },
  {
    label: '系统模块',
    prop: 'module',
    width: 120,
    align: 'left',
    resizable: true,
    sortable: true,
  },
  {
    label: '操作类型',
    prop: 'type',
    width: 120,
    align: 'left',
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'div',
        {
          class: 'border rounded text-center py-1',
        },
        row.type,
      );
    },
  },
  {
    label: '操作人员',
    prop: 'operator',
    width: 180,
    align: 'left',
    resizable: true,
    sortable: true,
  },
  {
    label: '操作地址',
    prop: 'ip',
    width: 180,
    align: 'left',
    resizable: true,
    sortable: true,
  },
  {
    label: '操作地点',
    prop: 'address',
    width: 200,
    align: 'left',
    resizable: true,
    sortable: true,
  },
  {
    label: '操作状态',
    prop: 'status',
    width: 120,
    align: 'left',
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'div',
        {
          class: `text-white text-center ${
            row.status ? 'bg-[#85C56E]' : 'bg-red-500'
          }`,
        },
        row.status ? '成功' : '失败',
      );
    },
  },
  {
    label: '操作时间',
    prop: 'date',
    minWidth: 240,
    align: 'left',
    resizable: true,
    sortable: true,
  },
  {
    width: 100,
    align: 'left',
    label: '',
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
                viewInfo(row);
              },
            },
            '查看',
          ),
        ],
      );
    },
  },
]);

const viewInfo = (row: any) => {
  console.log(row);
};

const handleOk = () => {
  isShowDatePicker.value = false;
};

const tableWrapper = ref(null);
const tableHeight = ref(0);
onMounted(() => {
  useTableMaxHeight(tableHeight, tableWrapper.value);
});
</script>

<!-- import getTableMaxHeightMixin from '@/mixins/getTableMaxHeightMixin'; -->

<style></style>
