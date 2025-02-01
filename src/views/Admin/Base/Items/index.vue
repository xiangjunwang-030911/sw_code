<template>
  <div>
    <el-card class="pt-[34px] pb-[40px]" shadow="hover">
      <el-form
        :model="projectItemForm"
        label-position="right"
        :label-width="120"
      >
        <el-form-item label="基础项目 : ">
          <el-input
            class="sm:w-[417px]"
            v-model="projectItemForm.basicProject"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item class="project-name" label="项目名称 : ">
          <div class="w-[100%] sm:w-[417px] inline-block relative">
            <el-input v-model="projectItemForm.projectName"></el-input>
            <span
              class="absolute right-0 top-[50%] translate-y-[-50%] pr-[9px] text-[32px] leading-[12px] h-[32px] text-center cursor-pointer"
              >...</span
            >
          </div>
          <el-checkbox class="pl-[20px]" v-model="projectItemForm.alive"
            >活动的项目</el-checkbox
          >
        </el-form-item>
        <el-form-item label="描述 : ">
          <el-input
            class="w-[80%]"
            v-model="projectItemForm.projectDesc"
            type="textarea"
            :rows="8"
          ></el-input>
          <div class="w-[80%] flex justify-end">
            <span class="pr-[9px] text-[32px] leading-[16px] cursor-pointer"
              >...</span
            >
          </div>
        </el-form-item>
        <el-form-item label="名字显示格式 : ">
          <el-checkbox v-model="projectItemForm.nameFormat">名, 姓</el-checkbox>
          <el-checkbox v-model="nameFormat">姓, 名</el-checkbox>
        </el-form-item>
        <el-form-item class="timeout" label="超时设置 : ">
          <el-checkbox
            class="w-[100%] mb-[15px]"
            v-model="projectItemForm.fixPermission"
            >启用固定许可证用户无操作自动注销, 超时设置为<el-input
              class="w-[101px] px-[8px]"
              v-model="projectItemForm.fixTimeout"
            ></el-input
            >分钟(至少15分钟)</el-checkbox
          >
          <el-checkbox
            class="w-[100%]"
            v-model="projectItemForm.floatPermission"
            >启用浮动许可证用户无操作自动注销, 超时设置为<el-input
              class="w-[101px] px-[8px]"
              v-model="projectItemForm.floatTimeout"
            ></el-input
            >分钟(至少15分钟)</el-checkbox
          >
        </el-form-item>
        <el-form-item class="mb-[16px]" label="适用语言 : ">
          <el-checkbox-group v-model="projectItemForm.applicationLanguage"
            >英语是系统序言并且总是适用:&nbsp;&nbsp;&nbsp;&nbsp;
            <el-checkbox label="en">English</el-checkbox>
            <el-checkbox label="fr">Français</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button class="w-[85px] h-[24px] text-black">ID设置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';

interface ProjectItemForm {
  basicProject: string;
  projectName: string;
  alive: boolean;
  projectDesc: string;
  nameFormat: boolean;
  fixPermission: boolean;
  floatPermission: boolean;
  fixTimeout: string;
  floatTimeout: string;
  applicationLanguage: string[];
}
const projectItemForm: ProjectItemForm = reactive({
  basicProject: '资产CMDB管理库(ServiceWise)',
  projectName: '',
  alive: true,
  projectDesc: '',
  nameFormat: true,
  fixPermission: true,
  floatPermission: true,
  fixTimeout: '',
  floatTimeout: '',
  applicationLanguage: ['en'],
});

const nameFormat = ref(false);

watch(
  () => projectItemForm.nameFormat,
  (value) => {
    nameFormat.value = value;
  },
  { immediate: true },
);

watch(
  () => nameFormat.value,
  (nV, oV) => {
    if (nV === oV) return;
    projectItemForm.nameFormat = nV;
  },
);
</script>

<style lang="scss" scoped>
:deep(.ivu-form) {
  .ivu-form-item-label {
    font-weight: 600;
  }
}

.project-name :deep(.ivu-input) {
  padding-right: 36px;
}
.timeout :deep(.ivu-input) {
  height: 22px;
}
</style>
