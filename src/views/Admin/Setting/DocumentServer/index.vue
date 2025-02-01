<template>
  <div class="py-4">
    <div ref="headWrapper">
      <div class="text-[18px] font-medium">参数设置</div>
      <el-form :model="formItem" :label-width="120" class="w-full mt-3">
        <div class="flex items-center">
          <el-form-item label="服务器或IP地址:" class="w-1/2">
            <el-input
              v-model="formItem.address"
              placeholder="127.0.0.1"
            ></el-input>
          </el-form-item>
          <el-form-item label="端口:" class="flex">
            <el-input v-model="formItem.port" placeholder="8128"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="文档根目录:">
          <div class="flex items-center w-full">
            <el-input
              v-model="formItem.rootPath"
              placeholder="C:\Program Files(x86)\TechExcelskjhjhj\invisible file\123.doc"
            ></el-input>
            <el-button class="ml-2" type="primary">检查链接</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="flex items-center">
        <CustomSwitch v-model="blackList"></CustomSwitch>
        <span class="ml-2">IP黑名单已启用</span>
        <el-button class="ml-4" type="primary">新建</el-button>
      </div>
    </div>
    <ListView class="mt-4"></ListView>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineAsyncComponent } from 'vue';
const ListView = defineAsyncComponent(() => import('./ListView.vue'));

interface FormItem {
  address: string;
  port: string;
  rootPath: string;
}

const formItem: FormItem = reactive({
  address: '',
  port: '',
  rootPath: '',
});
const blackList = ref(true);
</script>

<style></style>
