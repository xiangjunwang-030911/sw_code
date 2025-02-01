<template>
  <ModalWrapper
    :show="modelValue"
    :title="modalTitle"
    :loading="loading"
    :buttonLoading="buttonLoading"
    :isShowFooter="false"
    :close-on-click-modal="false"
    @ok="ok"
    @close="closeModal"
    @init="init"
    @onHeightChange="onHeightChange"
    width="80%"
  >
    <iframe
      class="w-full"
      ref="iframeRef"
      :key="iframeKey"
      :height="iframeHeight"
      :src="iframeSrc"
      frameborder="0"
      @load="handleLoad"
      allow="microphone; camera"
    ></iframe>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { useIframe } from '@/utils/iframeHelper';

interface Props {
  modelValue: boolean;
  livesyncId: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

interface Emit {
  (e: 'submit'): void;
  (e: 'update:modelValue', flag: boolean): void;
}

const emit = defineEmits<Emit>();

const modalTitle = 'LiveSync';
const buttonLoading = ref(false);
const loading = ref(true);
const iframeHeight = ref(0);
const iframeKey = ref(0);
const iframeSrc = ref('');
const iframeRef = ref<HTMLIFrameElement>();

watch([() => props.livesyncId], () => {
  iframeSrc.value = useIframe().liveSyncIframe({
    id: props.livesyncId,
  });
  iframeKey.value++;
});

const onHeightChange = (height: number) => {
  iframeHeight.value = height;
};

const handleLoad = () => {
  loading.value = false;
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
