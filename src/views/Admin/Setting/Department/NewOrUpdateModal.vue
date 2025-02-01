<template>
  <ModalWrapper
    :show.sync="value"
    :title="modalTitle"
    @close="close"
    @ok="submit"
    @init="initData"
  >
    <el-form :model="formItem" :label-width="80" class="mt-3 mb-6">
      <el-form-item label="上级部门:">
        <el-select v-model="formItem.superiorDepartment" placeholder="总公司">
          <el-option value="beijing">New York</el-option>
          <el-option value="shanghai">London</el-option>
          <el-option value="shenzhen">Sydney</el-option>
        </el-select>
      </el-form-item>
      <div class="flex items-center w-full justify-between">
        <el-form-item label="部门名称:">
          <el-input v-model="formItem.name" class="w-[130px]"></el-input>
        </el-form-item>
        <el-form-item label="显示排序:" class="flex">
          <el-input v-model="formItem.order" placeholder="显示排序"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="状态:">
        <div class="flex items-center w-full justify-between">
          <div class="flex items-center">
            <CustomSwitch v-model="formItem.status"></CustomSwitch>
            <span class="ml-2">停用/正常</span>
          </div>
          <el-form-item label="负责人:" class="flex">
            <el-input
              v-model="formItem.principal"
              placeholder="负责人"
            ></el-input>
          </el-form-item>
        </div>
      </el-form-item>
    </el-form>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';

interface Emits {
  (e: 'close'): void;
}
const emit = defineEmits<Emits>();

interface Props {
  value: boolean;
}
withDefaults(defineProps<Props>(), {
  value: false,
});

interface Form {
  superiorDepartment: string;
  name: string;
  order: string;
  status: boolean;
  principal: string;
}

const formItem: Form = reactive({
  superiorDepartment: '',
  name: '',
  order: '',
  status: false,
  principal: '',
});
const modalTitle = computed<string>(() => {
  return '新增';
});

const submit = () => {
  emit('close');
};

const close = () => {
  emit('close');
};

const initData = () => {};
</script>

<style lang="scss" scoped></style>
