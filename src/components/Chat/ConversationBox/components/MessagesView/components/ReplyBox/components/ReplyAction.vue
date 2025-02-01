<template>
  <div class="flex items-center flex-wrap">
    <el-button class="mt-3 p-4 !h-[50px] mr-3" @click="handleAskBot">
      <svg-icon icon-class="chat-icon_robot" class="mr-2" :size="20"></svg-icon>
      <span class="text-xs">Ask Bot</span>
    </el-button>
    <el-button class="mt-3 p-4 !h-[50px] mr-3">
      <svg-icon
        icon-class="chat-icon_meeting"
        class="mr-2"
        :size="20"
      ></svg-icon>
      <span class="text-xs">LiveSync Meeting</span>
    </el-button>
    <el-button class="mt-3 p-4 !h-[50px] mr-3">
      <svg-icon icon-class="chat-icon_sync" class="mr-2" :size="20"></svg-icon>
      <span class="text-xs">New Sync</span>
    </el-button>
    <el-button class="mt-3 p-4 !h-[50px] mr-3">
      <svg-icon
        icon-class="chat-icon_person_support"
        class="mr-2"
        :size="20"
      ></svg-icon>
      <span class="text-xs">Live Person Support</span>
    </el-button>
    <el-button class="mt-3 p-4 !h-[50px] mr-3">
      <svg-icon
        icon-class="chat-icon_remote_control"
        class="mr-2"
        :size="20"
      ></svg-icon>
      <span class="text-xs">Remote Control</span>
    </el-button>
    <AskBotModal v-model="isShowAskBotModal"></AskBotModal>
  </div>
</template>

<script setup lang="ts">
const AskBotModal = defineAsyncComponent(() => import('./AskBotModal.vue'));

const isShowAskBotModal = ref(false);

const handleAskBot = () => {
  isShowAskBotModal.value = true;
};
</script>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0;
}
</style>
