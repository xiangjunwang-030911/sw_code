<template>
  <el-dialog
    :model-value="dialogVisible"
    :append-to-body="true"
    :show-close="false"
    :fullscreen="fullScreen"
    class="modal-wrapper"
    @open="handleOpen"
    v-bind="$attrs"
  >
    <template #header>
      <slot name="header">
        <div class="flex justify-between items-center">
          <p class="font-[600] cursor-default text-[18px]">{{ title }}</p>
          <div class="flex items-center">
            <svg-icon
              @click="full"
              iconClass="fullScreenIcon"
              size="24"
              className="mr-[8px] cursor-pointer"
            ></svg-icon>
            <svg-icon
              @click="handleClose"
              iconClass="closeIcon"
              size="24"
              className="cursor-pointer"
            ></svg-icon>
          </div>
        </div>
      </slot>
    </template>
    <div
      ref="bodyRef"
      class="el-scrollbar !overflow-y-auto overflow-x-hidden pr-3"
      v-loading="loading"
    >
      <slot :close="handleClose"></slot>
    </div>

    <template v-if="isShowFooter" #footer>
      <slot name="footer">
        <div class="flex justify-end items-center">
          <el-button
            v-if="isShowOk"
            type="primary"
            class="mr-2"
            :loading="buttonLoading"
            @click="ok"
            >{{ okText }}</el-button
          >
          <el-button v-if="isShowCancel" @click="handleClose">{{
            cancelText
          }}</el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { getCurrentInstance, nextTick, ref, toRef, watch } from 'vue';

defineOptions({
  name: 'ModalWrapper',
});

type DoneFn = (cancel?: boolean) => void;
export type DialogBeforeCloseFn = (done: DoneFn) => void;

let instance = getCurrentInstance();

const scopdeId = instance?.proxy?.$options.__scopeId;

interface Props {
  show?: boolean;
  isShowFooter?: boolean;
  title?: string;
  okText?: string;
  isShowOk?: boolean;
  cancelText?: string;
  isShowCancel?: boolean;
  buttonLoading?: boolean;
  loading?: boolean;
  beforeClose?: (_arg: any) => void;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  isShowFooter: true,
  title: '',
  okText: '提交',
  isShowOk: true,
  cancelText: '取消',
  isShowCancel: true,
  buttonLoading: false,
  loading: false,
});

const dialogVisible = ref(false);
const bodyRef = ref<HTMLDivElement | null>(null);

const isShow = toRef(props, 'show');
watch(isShow, () => {
  dialogVisible.value = isShow.value;
});

interface Emits {
  (e: 'init'): void;
  (e: 'close'): void;
  (e: 'ok'): void;
  (e: 'onHeightChange', value: number): void;
}
const emit = defineEmits<Emits>();

const rangeHeight = computed(() => {
  if (fullScreen.value) {
    if (props.isShowFooter) {
      return 92;
    } else {
      return 30;
    }
  } else {
    if (props.isShowFooter) {
      return 130;
    } else {
      return 68;
    }
  }
});

const handleBodyHeight = () => {
  if (bodyRef.value) {
    const { top } = bodyRef.value.getBoundingClientRect();
    const height = window.innerHeight - top - rangeHeight.value;
    bodyRef.value.style.maxHeight = height + 'px';
    bodyRef.value.parentElement?.parentElement?.parentElement?.setAttribute(
      scopdeId,
      '',
    );
    emit('onHeightChange', height);
  }
};

const fullScreen = ref(false);

const full = () => {
  fullScreen.value = !fullScreen.value;
  nextTick(() => {
    handleBodyHeight();
  });
};
const handleClose = () => {
  //如果传入beforeClose 需要阻止关闭
  if (props.beforeClose) {
    props.beforeClose(() => {
      dialogVisible.value = false;
      emit('close');
    });
  } else {
    dialogVisible.value = false;
    emit('close');
  }
};

const handleOpen = () => {
  handleBodyHeight();
  emit('init');
};

const ok = () => {
  emit('ok');
};
</script>

<style lang="scss" scoped>
.el-overlay-dialog {
  overflow: hidden;
}
</style>
