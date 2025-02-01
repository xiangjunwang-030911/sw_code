<template>
  <EventMessage
    v-if="contentType == MessageContentTypeEnum.EVENT"
  ></EventMessage>
</template>

<script setup lang="ts">
import { MessageContentTypeEnum } from '@/enums/chatEnum';

const EventMessage = defineAsyncComponent(() => import('./EventMessage.vue'));

interface Props {
  contentType: MessageContentTypeEnum;
}
defineProps<Props>();
</script>

<style lang="scss" scoped></style>
