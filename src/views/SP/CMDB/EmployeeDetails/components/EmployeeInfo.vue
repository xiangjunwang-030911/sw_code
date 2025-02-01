<template>
  <div>
    <div class="mb-4">
      <p class="mb-4 font-semibold">基本信息:</p>
      <div class="border border-normal p-[24px] flex">
        <div
          class="flex-1 grid grid-rows-[repeat(9,_minmax(0,_1fr))] grid-cols-2 gap-y-4 items-center justify-items-center"
        >
          <div
            v-for="(item, idx) in employeeInfo"
            :key="item.title + idx"
            class="flex justify-center items-center w-full"
          >
            <p class="w-[160px] pr-2 font-semibold text-right">
              {{ item.title + ':' }}
            </p>
            <p class="w-[300px]">{{ item.content }}</p>
          </div>
          <div
            class="col-start-1 row-start-[9] flex justify-center items-center w-full"
          >
            <p class="w-[160px] pr-2 font-semibold text-right">是否激活:</p>
            <div class="w-[300px]">
              <CustomSwitch
                v-model="activationStatus"
                @on-change="changeActivation"
              ></CustomSwitch>
            </div>
          </div>
        </div>
        <div class="w-[120px]">
          <div v-show="!avatorUrl" class="flex justify-between items-center">
            <svg-icon iconClass="employee_avator_icon" size="31"></svg-icon>
            <el-upload
              action=""
              accept=".jpg,.jpeg,.png"
              :show-file-list="false"
              :before-upload="handleBeforeUpload"
            >
              <el-button class="px-[6px] leading-[26px] h-[26px]"
                >选择照片</el-button
              >
            </el-upload>
          </div>
          <el-upload
            action=""
            accept=".jpg,.jpeg,.png"
            :show-file-list="false"
            :before-upload="handleBeforeUpload"
          >
            <div
              v-show="avatorUrl"
              class="avator-wrap relative flex justify-center items-center w-[100px] h-[100px] rounded-[50px] overflow-hidden border cursor-pointer hover:border-black"
            >
              <div
                class="avator-mask absolute w-full h-full bg-[rgba(0,0,0,.4)] flex justify-center items-center"
              >
                <span class="text-[white]">选择新头像</span>
              </div>
              <img :src="avatorUrl" alt="" />
            </div>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="mb-4">
      <p class="mb-4 font-semibold">支持团队:</p>
      <div
        class="border border-normal py-8 grid grid-cols-2 grid-rows-2 items-center justify-items-center gap-y-4"
      >
        <div
          v-for="item in supportTeam"
          :key="item.name"
          class="flex items-center min-w-[140px]"
        >
          <span class="pr-2 font-semibold">{{ item.title + ':' }}</span>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="mb-4">
      <p class="mb-4 font-semibold">变更日志:</p>
      <Table :data="changeLog" :columns="LogColumns"></Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, h } from 'vue';
// import { useMessage } from '@/hooks/components/useMessage';
import { UploadRawFile } from 'element-plus';

// const { createWarningModal } = useMessage();

const activationStatus = ref(true);
const avatorUrl = ref('');
const employeeInfo = [
  {
    title: '姓名',
    content: '周佳杰',
  },
  {
    title: '公司',
    content: 'TechExcel',
  },
  {
    title: '用户名',
    content: 'zhoujiajie',
  },
  {
    title: '部门',
    content: 'Beijing TechExcel',
  },
  {
    title: '手机号码',
    content: '13957317588',
  },
  {
    title: '子部门',
    content: '品牌与公众传播部',
  },
  {
    title: '审批级别',
    content: '一般员工',
  },
  {
    title: '二级部门',
    content: '数字科技创新部_2',
  },
  {
    title: '员工状态',
    content: '在职员工',
  },
  {
    title: 'User ID',
    content: '20210813152225955-C79A-A00A40132',
  },
  {
    title: '邮箱',
    content: 'clean@clean',
  },
  {
    title: '职位',
    content: 'IT经理',
  },
  {
    title: 'Employee Manager',
    content: 'aaron_ge 葛云',
  },
  {
    title: '登录别名',
    content: 'Zhoujiajie',
  },
  {
    title: '邮箱',
    content: 'Zhoujiajie',
  },
];

const supportTeam = [
  {
    title: '一线支持',
    name: '周佳杰',
  },
  {
    title: '支持团队',
    name: 'TechExcel',
  },
  {
    title: '二线支持',
    name: 'zhoujiajie',
  },
  {
    title: '销售人员',
    name: 'Beijing Lilie',
  },
];

const changeLog = [
  {
    date: '2023/03/24 08:00:02',
    operator: 'Zhoujiajie',
    target: '邮件',
    oldVal: 'techexcel@techexcel.com',
    newVal: 'jiajie.zhou@techexcel.com',
  },
  {
    date: '2023/03/24 08:00:02',
    operator: 'Tieren Zhou',
    target: '姓名',
    oldVal: 'techexcel',
    newVal: 'Tieren Zhou',
  },
];
const LogColumns: Table.Column[] = reactive([
  {
    label: '操作时间',
    prop: 'date',
    minWidth: 200,
    resizable: true,
    sortable: true,
  },
  {
    label: '操作人',
    prop: 'operator',
    minWidth: 120,
    resizable: true,
    sortable: true,
  },
  {
    label: '备注',
    prop: 'target',
    minWidth: 440,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'p',
        {
          class: 'flex items-center',
        },
        `更改"${row.target}"从"${row.oldVal}"到"${row.newVal}"`,
      );
    },
  },
]);

const handleBeforeUpload = (file: UploadRawFile) => {
  let fileReader = new FileReader();

  fileReader.readAsDataURL(file); //文件转化为 Base64

  fileReader.onload = () => {
    if (typeof fileReader.result === 'string') {
      avatorUrl.value = fileReader.result;
    }
  };

  return false;
};
// const handleFormatError = (file) => {
//   createWarningModal({
//     title: '图片格式错误',
//     message: file.name + ' 格式错误, 请选择 jpg, png 或者jpeg.',
//   });
// };

const changeActivation = () => {
  console.log('改变激活状态');
};
</script>

<style lang="scss" scoped>
.avator-mask {
  display: none;
}

.avator-wrap:hover .avator-mask {
  display: flex;
}
</style>
