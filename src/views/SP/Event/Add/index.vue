<template>
  <div class="bg-default w-full py-5 px-10">
    <div
      class="flex items-center justify-between border-b border-solid border-normal pb-5"
    >
      <div class="tabs-wrapper flex items-center" @click="handleTab">
        <div
          class="py-1 px-2 rounded-md text-center cursor-pointer mr-2 bg-primary"
          :class="`${currentTab == 0 ? 'text-theme' : ''}`"
          data-id="0"
        >
          Assign to work
        </div>
        <div
          class="py-1 px-2 rounded-md text-center cursor-pointer mr-2 bg-primary"
          :class="`${currentTab == 1 ? 'text-theme' : ''}`"
          data-id="1"
        >
          工程师提交SAP工单
        </div>
        <div
          class="py-1 px-2 rounded-md text-center cursor-pointer mr-2 bg-primary"
          :class="`${currentTab == 2 ? 'text-theme' : ''}`"
          data-id="2"
        >
          工程师补单
        </div>
        <div
          class="py-1 px-2 rounded-md text-center cursor-pointer mr-2 bg-primary"
          :class="`${currentTab == 3 ? 'text-theme' : ''}`"
          data-id="3"
        >
          新建DMS权限申请
        </div>
      </div>
      <div class="template-select flex items-center">
        <span class="mr-2 whitespace-nowrap">事件模版</span>
        <el-select class="w-40" placeholder="运维工单">
          <el-option value="1234" :key="123">123</el-option>
        </el-select>
      </div>
      <div class="action-wrapper flex items-center">
        <el-button type="primary" class="mr-4 w-[70px]">提交</el-button>
        <el-button class="w-[70px]" @click="handleCancel">取消</el-button>
      </div>
    </div>
    <el-form :model="formItem" label-width="90" class="py-5">
      <el-form-item label="员工:" prop="employee">
        <div class="flex items-center">
          <el-select
            v-model="formItem.employee"
            class="w-80"
            placeholder="请选择"
          >
            <el-option value="1234" :key="123">123</el-option>
            <el-option value="2345" :key="2">2</el-option>
          </el-select>
          <svg-icon
            iconClass="search_icon"
            className="cursor-pointer mr-1 ml-2"
            size="23"
          ></svg-icon>
          <svg-icon
            iconClass="add_icon"
            className="cursor-pointer mr-1"
            size="30"
          ></svg-icon>
        </div>
      </el-form-item>
      <el-form-item label="资产:" prop="property">
        <Table
          :columns="columns"
          :data="tableData"
          class="propertyTableWrapper"
        ></Table>
      </el-form-item>
      <el-form-item label="标题:" prop="title">
        <el-input v-model="formItem.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品:" prop="product">
            <el-select
              v-model="formItem.employee"
              class="w-[90%]"
              placeholder="请选择"
            >
              <el-option value="1234" :key="123">123</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数据库:" prop="database">
            <el-select
              v-model="formItem.database"
              class="w-full"
              placeholder="请选择"
              multiple
            >
              <el-option value="123" :key="123">杭州市</el-option>
              <el-option value="1234" :key="1234">南京市</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发生时间:" prop="occurrenceTime">
            <el-date-picker
              v-model="formItem.occurrenceTime"
              type="datetime"
              class="!w-[90%]"
              placeholder="选择日期和时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发生地点:" prop="scene">
            <el-input v-model="formItem.scene"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item class="w-full" label="描述:" prop="desc">
        <Tinymce width="100%"></Tinymce>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="进程状态:" prop="status">
            <el-input v-model="formItem.status" class="w-[90%]" disabled>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="进程状态:" prop="status">
            <el-input v-model="formItem.principal"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="附件:" prop="file">
        <div class="px-[29px] py-[27px] border-solid border border-normal">
          <FileUpload></FileUpload>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref, h } from 'vue';
import { useRouter } from 'vue-router';
const Tinymce = defineAsyncComponent(
  () => import('@/components/Tinymce/index.vue'),
);
const FileUpload = defineAsyncComponent(
  () => import('@/components/Upload/index.vue'),
);

const router = useRouter();
const currentTab = ref(0);
interface FormItem {
  employee: string;
  title: string;
  database: string;
  scene: string;
  occurrenceTime: string;
  status: string;
  principal: string;
}
const formItem: FormItem = reactive({
  employee: '',
  title: '',
  database: '',
  scene: '',
  occurrenceTime: '',
  status: '服务台受理中',
  principal: '',
});
const tableData = reactive([
  {
    number: '123458',
    title: '笔记本',
    category: '桌面设备',
    endTime: '2023年11月25日',
    vender: '联想',
  },
]);

const columns: Table.Column[] = reactive([
  {
    type: 'selection',
    width: 80,
  },
  {
    prop: 'number',
    renderHeader: () => h('span', '资产编号'),
  },
  {
    prop: 'title',
    renderHeader: () => h('span', '标题'),
  },
  {
    prop: 'category',
    renderHeader: () => h('span', '三级分类'),
  },
  {
    prop: 'endTime',
    renderHeader: () => h('span', '维保到期时间'),
  },
  {
    prop: 'vender',
    renderHeader: () => h('span', '厂家'),
  },
]);

const handleTab = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.dataset?.id) {
    currentTab.value = Number(target.dataset.id);
  }
};
const handleCancel = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.propertyTableWrapper {
  :deep(.el-table th) {
    // background-color: #e7f7ef !important;
    background-color: var(--el-color-primary-light-9) !important;
  }
}
</style>
