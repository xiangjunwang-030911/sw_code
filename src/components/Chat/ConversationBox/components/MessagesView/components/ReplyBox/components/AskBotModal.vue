<template>
  <ModalWrapper
    :show="modelValue"
    :title="modalTitle"
    :loading="loading"
    :buttonLoading="buttonLoading"
    :isShowOk="false"
    cancelText="关闭"
    @ok="ok"
    @close="closeModal"
    @init="init"
    width="40%"
  >
    <div>
      <el-input
        v-model="search"
        class="w-full"
        clearable
        size="large"
        placeholder="Please Input"
        :prefix-icon="Search"
      />
      <div
        class="flex justify-between items-center border-normal border rounded-lg px-3 py-2 mt-4 cursor-pointer"
        v-for="item in questionList"
        :key="item.id"
      >
        <div class="mr-1">{{ item.question }}</div>
        <i-ep-right class="text-xl" />
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { getBotQuestionApi } from '@/api/bot';
import { ChatbotNode } from '@/api/bot/botModal';
import { Search } from '@element-plus/icons-vue';
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

const modalTitle = 'Ask Bot for action';
const buttonLoading = ref(false);
const loading = ref(false);
const search = ref('');
const questionList = ref<ChatbotNode[]>([]);

const closeModal = () => {
  emit('update:modelValue', false);
};
const ok = () => {
  closeModal();
  emit('submit');
};

const getBotQuestion = async () => {
  const res = await getBotQuestionApi({ chatbotId: 6 });
  if (res.code == 0) {
    questionList.value = res.data;
  }
};
const init = () => {
  getBotQuestion();
};
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  border-radius: 20px;
}
</style>
