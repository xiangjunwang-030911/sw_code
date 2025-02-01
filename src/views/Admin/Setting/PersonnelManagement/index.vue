<template>
  <div>
    <div ref="headWrapper">
      <p class="pt-4 pb-6 text-[18px] font-semibold leading-[25px]">用户管理</p>
      <div class="select-wrap mb-[30px]">
        <div
          class="grid grid-cols-2 grid-rows-3 gap-y-6 gap-x-[30px] lg:grid-cols-3 lg:grid-rows-2"
        >
          <div class="flex items-center">
            <p class="w-[70px] pr-2 font-semibold text-[#505050] text-right">
              用户名称:
            </p>
            <el-input
              v-model="user.userName"
              class="flex-1"
              placeholder="用户名称"
            ></el-input>
          </div>
          <div class="flex items-center">
            <p class="w-[70px] pr-2 font-semibold text-[#505050] text-right">
              手机号码:
            </p>
            <el-input
              v-model="user.phone"
              class="flex-1"
              placeholder="手机号码"
            ></el-input>
          </div>
          <div class="flex items-center">
            <p class="w-[70px] pr-2 font-semibold text-[#505050] text-right">
              邮箱:
            </p>
            <el-input
              v-model="user.email"
              class="flex-1"
              placeholder="邮箱"
            ></el-input>
          </div>
          <div class="flex items-center">
            <p class="w-[70px] pr-2 font-semibold text-[#505050] text-right">
              部门名称:
            </p>
            <el-select
              v-model="user.department"
              class="flex-1"
              placeholder="部门名称"
            >
              <el-option
                v-for="item in departmentList"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </el-option>
            </el-select>
          </div>
          <div class="flex items-center">
            <p class="w-[70px] pr-2 font-semibold text-[#505050] text-right">
              登录名:
            </p>
            <el-input
              v-model="user.loginName"
              class="flex-1"
              placeholder="登录名"
            ></el-input>
          </div>
          <div class="flex items-center">
            <p class="w-[70px] pr-2 font-semibold text-[#505050] text-right">
              状态:
            </p>
            <el-select v-model="user.status" class="flex-1" placeholder="状态">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="toolbar flex justify-between items-center pb-4">
        <div class="flex items-center">
          <el-button @click="create" class="w-[70px] mr-2" type="primary"
            >新建</el-button
          >
          <el-button @click="importInfo" class="w-[70px] mr-2">导入</el-button>
          <el-button @click="exportInfo" class="w-[70px] mr-2">导出</el-button>
        </div>
        <div class="flex items-center">
          <svg-icon
            @click="handleSearch"
            className="mr-2 cursor-pointer"
            iconClass="search_icon"
            size="22"
          ></svg-icon>
          <svg-icon
            @click="handleSetting"
            className="mr-2 cursor-pointer"
            iconClass="settingIcon"
            size="18"
          ></svg-icon>
          <svg-icon
            @click="handleRefresh"
            className="cursor-pointer"
            iconClass="refresh_icon"
            size="24"
          ></svg-icon>
        </div>
      </div>
    </div>
    <div class="mb-5">
      <Table
        ref="tableWrapper"
        class="scrollBar-light2"
        :max-height="tableHeight - 60"
        :data="personnelData"
        :columns="personnelColumns"
      ></Table>
    </div>
    <div class="flex justify-center items-center">
      <el-pagination
        layout="total, prev, pager, next, sizes"
        :page-sizes="[20, 30, 40]"
        :total="personnelData.length"
      />
    </div>
    <AddUserModal v-model="addUserModal"></AddUserModal>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
  defineAsyncComponent,
  h,
  onMounted,
  nextTick,
} from 'vue';
import { useTableMaxHeight } from '@/hooks/tools/useTableMaxHeight';

const CustomSwitch = defineAsyncComponent(
  () => import('@/components/globalComponents/CustomSwitch.vue'),
);
const AddUserModal = defineAsyncComponent(() => import('./AddUserModal.vue'));

interface User {
  userName: string;
  phone: string;
  email: string;
  department: string;
  loginName: string;
  status: string;
}
const user: User = reactive({
  userName: '',
  phone: '',
  email: '',
  department: '',
  loginName: '',
  status: '',
});

interface DepartmentItem {
  value: number;
  label: string;
}
const departmentList: DepartmentItem[] = reactive([
  {
    value: 0,
    label: '总公司',
  },
  {
    value: 1,
    label: '战略部',
  },
  {
    value: 2,
    label: '前端',
  },
]);

const statusList: DepartmentItem[] = reactive([
  {
    value: 0,
    label: '未激活',
  },
  {
    value: 1,
    label: '激活',
  },
]);

const personnelData: any[] = reactive([
  {
    no: 1,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 0,
    phone: '13923482931',
    status: 1,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 2,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 2,
    phone: '13923482931',
    status: 1,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 3,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 1,
    phone: '13923482931',
    status: 0,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 4,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 0,
    phone: '13923482931',
    status: 0,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 5,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 2,
    phone: '13923482931',
    status: 1,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 6,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 2,
    phone: '13923482931',
    status: 1,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 7,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 1,
    phone: '13923482931',
    status: 0,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 8,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 1,
    phone: '13923482931',
    status: 1,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 9,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 0,
    phone: '13923482931',
    status: 0,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 10,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 0,
    phone: '13923482931',
    status: 1,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 11,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 0,
    phone: '13923482931',
    status: 1,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 12,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 0,
    phone: '13923482931',
    status: 1,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 13,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 0,
    phone: '13923482931',
    status: 1,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 14,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 0,
    phone: '13923482931',
    status: 1,
    createDate: '2020/02/21 23:00:00',
  },
  {
    no: 15,
    loginName: 'admin',
    userName: 'Zengjiayuan',
    department: 0,
    phone: '13923482931',
    status: 1,
    createDate: '2020/02/21 23:00:00',
  },
]);

const personnelColumns: Table.Column[] = reactive([
  {
    type: 'selection',
    width: 60,
    align: 'center',
  },
  {
    label: '用户编号',
    prop: 'no',
    width: 120,
    align: 'left',
    resizable: true,
    sortable: true,
  },
  {
    label: '登录名',
    prop: 'loginName',
    width: 140,
    resizable: true,
    sortable: true,
  },
  {
    label: '用户名称',
    prop: 'userName',
    width: 180,
    resizable: true,
    sortable: true,
  },
  {
    label: '所在部门',
    prop: 'department',
    width: 140,
    align: 'left',
    render: ({ row }) => {
      return h(
        'span',
        {},
        departmentList.filter((item) => item.value === row.department)[0]
          ?.label,
      );
    },
  },
  {
    label: '手机号码',
    prop: 'phone',
    width: 180,
    align: 'left',
    resizable: true,
    sortable: true,
  },
  {
    label: '状态',
    prop: 'status',
    width: 100,
    render: ({ row, $index }) => {
      return h(CustomSwitch, {
        modelValue: Boolean(row.status),
        onChange: (status: boolean) => {
          handleStatusChange(status, $index);
        },
      });
    },
  },
  {
    label: '创建时间',
    prop: 'createDate',
    width: 220,
    align: 'left',
    resizable: true,
    sortable: true,
  },
  {
    label: '操作',
    minWidth: 400,
    align: 'left',
    fixed: 'right',
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
          h(
            'span',
            {
              class: 'cursor-pointer',
              onCClick: () => {
                editInfo(row);
              },
            },
            '编辑',
          ),
          h(
            'span',
            {
              class: 'cursor-pointer',
              onClick: () => {
                deleteInfo(row);
              },
            },
            '删除',
          ),
          h(
            'span',
            {
              class: 'cursor-pointer flex items-center',
              onClick: () => {
                moreInfo(row);
              },
            },
            [
              h('span', {}, '更多'),
              h('SvgIcon', {
                iconClass: 'icon_arrow_down',
                size: '16',
              }),
            ],
          ),
        ],
      );
    },
  },
]);
const addUserModal = ref(false);
const handleStatusChange = (status: boolean, index: number) => {
  personnelData[index].status = Number(status);
};

const viewInfo = (row: any) => {
  console.log(row);
};
const editInfo = (row: any) => {
  console.log(row);
};
const deleteInfo = (row: any) => {
  console.log(row);
};
const moreInfo = (row: any) => {
  console.log(row);
};
const create = () => {
  addUserModal.value = true;
};
const importInfo = () => {};
const exportInfo = () => {};
const handleSearch = () => {};
const handleSetting = () => {};
const handleRefresh = () => {};
const tableWrapper = ref(null);
const tableHeight = ref(0);
onMounted(() => {
  nextTick(() => {
    useTableMaxHeight(tableHeight, tableWrapper.value);
  });
});
</script>

<style lang="scss" scoped>
:deep(.el-table-fixed-right.el-table-fixed-shadow) {
  right: 6px !important;
}
</style>
