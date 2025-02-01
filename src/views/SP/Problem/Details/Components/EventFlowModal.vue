<template>
  <ModalWrapper
    :show="modelValue"
    title="开始处理"
    @ok="ok"
    @close="closeModal"
  >
    <div class="pt-[24px] flex flex-col">
      <div class="flex mb-20">
        <p class="font-[600]">服务台受理中</p>
        <div class="process flex-1 px-4 flex items-center">
          <div class="start flex-1"></div>
          <div class="end flex-1"></div>
        </div>
        <p class="font-[600]">工程师开始处理</p>
      </div>
      <div class="flex justify-between items-center pb-[24px]">
        <div class="flex-1 flex items-center">
          <p class="font-[600] w-[70px]">目标状态：</p>
          <p class="">工程师开始处理</p>
        </div>
        <div class="flex-1 flex items-center">
          <div>
            <p class="font-[600] w-[56px]">负责人：</p>
          </div>
          <el-select v-model="chargeValue">
            <el-option
              v-for="item in chargeList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</el-option
            >
          </el-select>
        </div>
      </div>
      <div class="flex justify-between items-center pb-[24px]">
        <div class="w-1/2 flex items-center">
          <div>
            <p class="font-[600] w-[70px]">根本原因：</p>
          </div>
          <el-select v-model="faultValue">
            <el-option
              v-for="item in faultList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</el-option
            >
          </el-select>
        </div>
      </div>
      <div class="flex items-center pb-[24px]">
        <div class="flex-1 flex items-start">
          <div>
            <p class="font-[600] w-[70px]">目标状态：</p>
          </div>
          <el-input
            v-model="solution"
            class="flex-1 w-full scrollBar-light"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 3 }"
            placeholder="请记录解决方案"
          />
        </div>
      </div>
      <div class="flex items-center pb-[24px]">
        <div class="flex-1 flex items-start">
          <div>
            <p class="font-[600] w-[70px]">工作记录：</p>
          </div>
          <el-input
            v-model="workLog"
            class="flex-1 w-full scrollBar-light"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 3 }"
            placeholder="如有交接信息, 请填写!"
          />
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

interface Props {
  modelValue: boolean;
}
withDefaults(defineProps<Props>(), {
  modelValue: false,
});

interface Emits {
  (e: 'submit'): void;
  (e: 'update:modelValue', value: boolean): void;
}

const emit = defineEmits<Emits>();
const workLog = ref('');
const solution = ref('');
const faultValue = ref(0);
let faultList = reactive([
  {
    value: 0,
    label: 'API故障',
  },
  {
    value: 1,
    label: '网络故障',
  },
  {
    value: 2,
    label: '账号冻结',
  },
]);
const chargeValue = ref(0);
let chargeList = reactive([
  {
    value: 0,
    label: 'Tieren Zhou',
  },
  {
    value: 1,
    label: 'Akang Xia',
  },
  {
    value: 2,
    label: 'Frenk Zeng',
  },
]);
const closeModal = () => {
  emit('update:modelValue', false);
};
const ok = () => {
  closeModal();
  emit('submit');
};
</script>

<style lang="scss" scoped>
.process {
  .start,
  .end {
    position: relative;
    height: 1px;
    border: 0.5px solid black;
    border-color: var(--el-color-primary);
  }

  .end {
    border-style: dashed;
  }

  .start::before,
  .end::before {
    content: '';
    z-index: 1;
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 0.5px solid #fff;
    border-color: var(--el-color-primary);
    background-color: var(--el-color-primary);
    top: -6px;
  }
  .start::before {
    left: -4px;
  }
  .end::before {
    background-color: #fff !important;
    right: -4px;
  }
}
:deep(.ivu-modal-body) {
  padding: 26px 48px 36px;
}
</style>
