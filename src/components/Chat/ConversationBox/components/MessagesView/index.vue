<template>
  <div>
    <div class="p-3 h-full flex flex-col">
      <div
        class="flex-1 h-0 px-3 py-2 overflow-scroll"
        ref="scrollContainerRef"
      >
        <Message :groupedConversation="groupedConversation"></Message>
      </div>
      <div>
        <OngoingActivity v-if="isShowActivity" class="mb-4"></OngoingActivity>
        <ReplyBox @send="handleSend"></ReplyBox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GroupedConversationItem } from '../../typing';

const ReplyBox = defineAsyncComponent(
  () => import('./components/ReplyBox/index.vue'),
);
const Message = defineAsyncComponent(() => import('./components/Message.vue'));
const OngoingActivity = defineAsyncComponent(
  () => import('./components/OngoingActivity.vue'),
);

interface Props {
  isShowActivity: boolean;
  groupedConversation: GroupedConversationItem[];
}
defineProps<Props>();

interface Emits {
  (e: 'send', message: string): void;
}
const emit = defineEmits<Emits>();

const scrollContainerRef = ref<HTMLElement>();

const handleSend = (msg: string) => {
  emit('send', msg);
};

const scrollToButtom = () => {
  nextTick(() => {
    if (scrollContainerRef.value) {
      const container = scrollContainerRef.value;
      const containerHeight = container.scrollHeight;

      container.scrollTo({
        top: containerHeight,
        behavior: 'smooth',
      });
    }
  });
};

defineExpose({
  scrollToButtom,
});
</script>

<style lang="scss" scoped></style>
