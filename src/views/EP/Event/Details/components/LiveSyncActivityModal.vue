<template>
  <ModalWrapper
    :show="modelValue"
    :title="modalTitle"
    :loading="loading"
    :buttonLoading="buttonLoading"
    :isShowCancel="false"
    :isShowOk="false"
    @ok="ok"
    @close="closeModal"
    @init="init"
    @onHeightChange="onHeightChange"
    width="80%"
  >
    <LiveSyncActivity :height="iframeHeight"></LiveSyncActivity>
  </ModalWrapper>
</template>

<script setup lang="ts">
const LiveSyncActivity = defineAsyncComponent(
  () => import('@/components/Iframe/LiveSyncActivity/index.vue'),
);

interface Props {
  modelValue: boolean;
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
});

interface Emit {
  (e: 'submit'): void;
  (e: 'update:modelValue', flag: boolean): void;
}

const emit = defineEmits<Emit>();

const modalTitle = 'LiveSync Activity';
const buttonLoading = ref(false);
const loading = ref(false);
const iframeHeight = ref(0);

const onHeightChange = (height: number) => {
  iframeHeight.value = height;
};

const closeModal = () => {
  emit('update:modelValue', false);
};
const ok = () => {
  closeModal();
  emit('submit');
};
const init = () => {};
</script>

<style lang="scss" scoped></style>
