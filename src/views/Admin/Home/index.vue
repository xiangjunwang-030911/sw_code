<template>
  <div class="px-3 pt-3">
    <el-card class="mr-2 enter-x" shadow="hover">
      <div class="flex justify-between flex-col lg:flex-row">
        <div class="lg:flex-1 flex py-4 pl-4">
          <div
            class="w-[67px] h-[67px] mr-[24px] rounded-[50%] overflow-hidden bg-black"
          >
            <img src="@/assets/logo.png" alt="avatar" />
          </div>
          <div class="flex flex-col justify-between py-[8px]">
            <p class="text-[16px] font-[600] text-[#131313]">
              欢迎, {{ '管理员' }}, 祝你拥有愉快的一天
            </p>
            <div class="text-[#505050]">
              <span class="mr-[40px]">用户名: {{ 'Admin' }}</span>
              <span>邮箱: {{ 'Admin@ServiceWise.com' }}</span>
            </div>
          </div>
        </div>
        <div class="lg:flex-1 flex flex-col py-[6px]">
          <p class="font-[600] text-[#000] text-[16px]">当前许可证使用情况</p>
          <div class="grid grid-rows-1 grid-cols-7">
            <div class="col-start-1 col-end-4">
              <TotalCount :countData="fixCount"></TotalCount>
            </div>
            <p
              class="justify-self-center self-center text-[#9d9d9d] text-[32px] font-thin"
            >
              |
            </p>
            <div class="col-start-5 col-end-8">
              <TotalCount :countData="flexCount"></TotalCount>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <div class="flex my-2 h-8 leading-8 enter-x">
      <!-- <Input
        v-model="searchkeys"
        placeholder="输入关键词"
        class="w-[232px] mr-4 enter-x"
      >
        <div slot="suffix" class="h-full flex justify-center items-center">
          <svg-icon
            iconClass="search_icon"
            class="inline-box cursor-pointer"
          ></svg-icon>
        </div>
      </Input> -->
      <SearchBox
        class="w-[232px] mr-4 enter-x"
        v-model="searchkeys"
        :searchIcon="true"
        searchBtn="search_icon"
        placeholder="输入关键词"
      ></SearchBox>
      <el-select v-model="projectValue" class="w-[130px] enter-x">
        <el-option
          v-for="item in projectList"
          :value="item.value"
          :key="item.value"
          :label="item.label"
          >{{ item.label }}</el-option
        >
      </el-select>
    </div>
    <div class="flex w-full flex-col lg:flex-row enter-x">
      <div class="container flex flex-col">
        <el-card class="table-card mb-2 mr-2" shadow="hover">
          <Table
            class="scrollBar-light2"
            height="268"
            :columns="projectTable.columns"
            :data="projectTable.data"
          ></Table>
        </el-card>
        <el-card class="mb-2 mr-2" shadow="hover">
          <CommonSettings></CommonSettings>
        </el-card>
      </div>
      <div class="flex lg:flex-col enter-x">
        <el-card class="mb-2 mr-2" shadow="hover">
          <ChangeLog></ChangeLog>
        </el-card>
        <el-card class="flex-1 lg:flex-none mb-2 mr-2" shadow="hover">
          <div>
            <div
              class="flex items-center justify-between border-b border-[#EEEFF2] pb-[12px]"
            >
              <div class="text-[#131313] font-[600]">推荐升级</div>
            </div>
            <div class="flex flex-col text-[#505050]">
              <span class="pt-[16px]">SW2.0 已发布——————</span>
              <span class="pt-[16px]">新增4个新功能</span>
              <span class="pt-[16px]">新增24个新报表</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineAsyncComponent, h } from 'vue';
import SvgIcon from '@/components/globalComponents/SvgIcon.vue';

const TotalCount = defineAsyncComponent(
  () => import('./components/TotalCount.vue'),
);
const CommonSettings = defineAsyncComponent(
  () => import('./components/CommonSettings.vue'),
);
const ChangeLog = defineAsyncComponent(
  () => import('./components/ChangeLog.vue'),
);

interface CountItem {
  title: string;
  count: number;
}

const fixCount: CountItem[] = reactive([
  {
    title: '固定许可',
    count: 66,
  },
  {
    title: '已使用',
    count: 64,
  },
  {
    title: '当前占用',
    count: 31,
  },
]);
const flexCount: CountItem[] = reactive([
  {
    title: '浮动许可',
    count: 80,
  },
  {
    title: '已使用',
    count: 64,
  },
  {
    title: '当前占用',
    count: 31,
  },
]);
const searchkeys = ref('');
const projectValue = ref('');

interface ProjectItem {
  value: string;
  label: string;
}
const projectList: ProjectItem[] = reactive([
  {
    value: '1',
    label: '工作项目',
  },
  {
    value: '2',
    label: '工作项目2',
  },
  {
    value: '3',
    label: '工作项目3',
  },
  {
    value: '4',
    label: '工作项目4',
  },
]);

interface ProjectTable {
  columns: Table.Column[];
  data: any[];
}
const projectTable: ProjectTable = reactive({
  columns: [
    {
      label: '流程名称',
      prop: 'process',
      align: 'center',
      resizable: true,
      sortable: true,
      width: 300,
      // sortMethod: (a, b, type) => {},
    },
    {
      label: '短ID',
      prop: 'id',
      align: 'center',
      resizable: true,
      sortable: true,
      width: 300,
    },
    {
      label: '项目管理员',
      prop: 'admin',
      align: 'center',
      resizable: true,
      sortable: true,
      width: 300,
      render: ({ row }) => {
        return h(
          'div',
          {
            class: 'flex justify-center items-center',
          },
          [
            h(SvgIcon, {
              iconClass: row.icon,
              size: '24',
            }),
            h('p', { class: 'pl-[3px]' }, row.id),
          ],
        );
      },
    },
    {
      label: '最后编辑时间',
      prop: 'lastEditing',
      align: 'center',
      resizable: true,
      sortable: true,
      minWidth: 300,
    },
  ],
  data: [
    {
      process: '事件管理',
      id: 'ZQ243234',
      icon: 'admin_adminsiter',
      admin: 'Jiajie Zhou',
      lastEditing: 'No issues',
    },
    {
      process: '事件管理',
      id: 'ZQ243234',
      icon: 'admin_adminsiter',
      admin: 'Jiajie Zhou',
      lastEditing: 'No issues',
    },
    {
      process: '事件管理',
      id: 'ZQ243234',
      icon: 'admin_adminsiter',
      admin: 'Jiajie Zhou',
      lastEditing: 'No issues',
    },
    {
      process: '事件管理',
      id: 'ZQ243234',
      icon: 'admin_adminsiter',
      admin: 'Jiajie Zhou',
      lastEditing: 'No issues',
    },
    {
      process: '事件管理',
      id: 'ZQ243234',
      icon: 'admin_adminsiter',
      admin: 'Jiajie Zhou',
      lastEditing: 'No issues',
    },
    {
      process: '事件管理',
      id: 'ZQ243234',
      icon: 'admin_adminsiter',
      admin: 'Jiajie Zhou',
      lastEditing: 'No issues',
    },
    {
      process: '事件管理',
      id: 'ZQ243234',
      icon: 'admin_adminsiter',
      admin: 'Jiajie Zhou',
      lastEditing: 'No issues',
    },
    {
      process: '事件管理',
      id: 'ZQ243234',
      icon: 'admin_adminsiter',
      admin: 'Jiajie Zhou',
      lastEditing: 'No issues',
    },
    {
      process: '事件管理',
      id: 'ZQ243234',
      icon: 'admin_adminsiter',
      admin: 'Jiajie Zhou',
      lastEditing: 'No issues',
    },
    {
      process: '事件管理',
      id: 'ZQ243234',
      icon: 'admin_adminsiter',
      admin: 'Jiajie Zhou',
      lastEditing: 'No issues',
    },
    {
      process: '事件管理',
      id: 'ZQ243234',
      icon: 'admin_adminsiter',
      admin: 'Jiajie Zhou',
      lastEditing: 'No issues',
    },
  ],
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  @media (min-width: 1024px) {
    width: calc(100% - 320px);
  }
  .table-card :deep(.el-card-body) {
    padding: 16px 0;
  }
}
:deep(.el-table) {
  margin-bottom: 35px;
  th,
  td {
    color: #505050;
    border-bottom: 0px !important;
  }
}
:deep(.el-table::before) {
  height: 0;
}
</style>
