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
    width="40%"
  >
    <div>
      <div
        class="px-5 py-1 border-2 w-fit rounded cursor-pointer border-theme text-theme bg-default mb-4"
      >
        Support incident summary
      </div>
      <div
        class="px-5 py-1 border-2 w-fit rounded cursor-pointer border-theme text-theme bg-default mb-4"
      >
        Search knowledge for solution
      </div>
      <div
        class="px-5 py-1 border-2 w-fit rounded cursor-pointer border-theme text-theme bg-default mb-4"
      >
        List similar support incidents
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
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

const modalTitle = 'Common Questions';
const buttonLoading = ref(false);
const loading = ref(false);

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
