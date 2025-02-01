<template>
  <ModalWrapper
    :show="modelValue"
    :width="420"
    :isShowFooter="false"
    @init="init"
    @close="$emit('update:modelValue', false)"
  >
    <template v-slot="{ close }">
      <div class="flex flex-col items-center pt-[30px]">
        <svg-icon
          :iconClass="`submit_${type}_icon`"
          size="96"
          className="pb-[43px] pt-[26px]"
        ></svg-icon>
        <p
          class="pb-[43px] text-[24px] font-pingfang font-medium cursor-default"
        >
          提交成功
        </p>
        <el-button class="mb-[54px]" @click="close">关闭</el-button>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  type: string;
}
withDefaults(defineProps<Props>(), {
  modelValue: false,
  type: 'success',
});

interface Emits {
  (e: 'close'): void;
}

const $emit = defineEmits<Emits>();
// const close = $emit("close", false)
const init = () => {
  console.log('init modal');
};
</script>

<style lang="scss" scoped>
:deep(.ivu-btn.ivu-btn-default) {
  border-color: black;
  border-radius: 0;
  color: black;
}
</style>
