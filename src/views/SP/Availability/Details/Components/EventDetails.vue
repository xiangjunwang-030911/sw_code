<template>
  <div class="content mt-4">
    <div ref="employeeInfoRef">
      <div class="flex items-center">
        <div class="flex items-center w-[80px] justify-end">
          <span class="font-semibold">员工：</span>
          <svg-icon
            iconClass="icon_arrow"
            size="14"
            class="origin-center ml-[-7px] cursor-pointer"
            :class="employeeClass"
            @click="handleExpand(1)"
          ></svg-icon>
        </div>
        <div
          class="text-[#505050] ml-2 cursor-pointer"
          @click="handleExpand(1)"
        >
          周佳杰 技术支持经理
        </div>
      </div>
      <div
        v-if="showEmployeeInfo"
        class="ml-[30px] mt-1 rounded-[2px] overflow-hidden expandAnimation"
        ref="employee"
      >
        <div class="py-6 flex flex-wrap border-[#EEEFF2] border">
          <div class="w-[50%] flex">
            <div class="w-[40%] text-right">姓名：</div>
            <div class="">周佳杰</div>
          </div>
          <div class="w-[50%] flex">
            <div class="w-[40%] text-right">公司：</div>
            <div class="">TechExcel</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">用户名：</div>
            <div class="">zhoujiajie</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">部门：</div>
            <div class="">Beijing TechExcel</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">手机号码：</div>
            <div class="">13957317588</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">子部门：</div>
            <div class="">品牌与公众传播部</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">审批级别：</div>
            <div class="">一般员工</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">组：</div>
            <div class="">数字科技创新部_2</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">员工状态：</div>
            <div class="">在职员工</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">User ID：</div>
            <div class="">20210813152225955-C7</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">邮箱：</div>
            <div class="">clean@clean</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">组织：</div>
            <div class="">神秘部门</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">Employee Manager：</div>
            <div class="">aaron_ge 葛云</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">职位：</div>
            <div class="">IT经理</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">二级部门：</div>
            <div class="">销售部</div>
          </div>
          <div class="w-[50%] flex mt-4">
            <div class="w-[40%] text-right">办公号码：</div>
            <div class="">0573-42457765</div>
          </div>
        </div>
      </div>
    </div>
    <div ref="propertyInfoRef">
      <div class="flex items-center mt-4">
        <div class="flex items-center w-[80px] justify-end">
          <span class="font-semibold">资产：</span>
          <svg-icon
            iconClass="icon_arrow"
            size="14"
            class="origin-center ml-[-7px] cursor-pointer"
            :class="propertyClass"
            @click="handleExpand(2)"
          ></svg-icon>
        </div>
        <div
          class="text-[#505050] ml-2 cursor-pointer"
          @click="handleExpand(2)"
        >
          (关联的资产信息..)
        </div>
      </div>
      <div
        v-if="showPropertyInfo"
        class="ml-[30px] mt-1 overflow-hidden expandAnimation"
        ref="property"
      >
        <Table
          class="w-full scrollBar-light2 mt-6"
          :columns="columns"
          :data="tableData"
        ></Table>
      </div>
    </div>

    <el-form :model="formItem" :label-width="80" class="py-5">
      <el-form-item label="标题:" prop="title">
        <el-input v-model="formItem.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品:" prop="product">
            <el-select
              v-model="formItem.employee"
              class="!w-full"
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
              placeholder="选择日期和时间"
              class="!w-full"
            />
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
            <el-input v-model="formItem.status" disabled> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="进程状态:" prop="status">
            <el-input v-model="formItem.principal"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="附件:" prop="file">
        <div
          class="w-full px-[29px] py-[27px] border-solid border border-normal"
        >
          <FileUpload></FileUpload>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, ref, h } from 'vue';
import { useAutoAnimate } from '@formkit/auto-animate/vue';

const Tinymce = defineAsyncComponent(
  () => import('@/components/Tinymce/index.vue'),
);
const FileUpload = defineAsyncComponent(
  () => import('@/components/Upload/index.vue'),
);

const [employeeInfoRef] = useAutoAnimate();
const [propertyInfoRef] = useAutoAnimate();

const showEmployeeInfo = ref(false);
const showPropertyInfo = ref(false);

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
    id: 1544,
    name: '{1544}工作站',
    status: '在用',
    index: '123444444',
    location: '仓库',
    templateName: '工作站',
  },
]);

const employeeClass = computed(() => {
  return showEmployeeInfo.value ? '-rotate' : '-rotate-90';
});

const propertyClass = computed(() => {
  return showPropertyInfo.value ? '-rotate' : '-rotate-90';
});

const columns: Table.Column[] = reactive([
  {
    prop: 'id',
    renderHeader: () => h('span', '资产编号'),
  },
  {
    prop: 'name',
    renderHeader: () => h('span', '名称'),
  },
  {
    prop: 'status',
    renderHeader: () => h('span', '状态'),
  },
  {
    prop: 'index',
    renderHeader: () => h('span', '序列号'),
  },
  {
    prop: 'location',
    renderHeader: () => h('span', '存放位置'),
  },
  {
    prop: 'templateName',
    renderHeader: () => h('span', '资产模板名称'),
  },
]);

const employee = ref<HTMLElement>();
const property = ref<HTMLElement>();

const handleExpand = (type: number) => {
  if (type == 1) {
    showEmployeeInfo.value = !showEmployeeInfo.value;
  } else if (type == 2) {
    showPropertyInfo.value = !showPropertyInfo.value;
  }
};
</script>

<style lang="scss" scoped>
/* .expandAnimation {
  transition: height 0.3s ease;
} */
</style>
