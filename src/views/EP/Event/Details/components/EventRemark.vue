<template>
  <ReCard>
    <template #title> 备注/子事件 </template>
    <div class="item flex items-center py-4 ml-5">
      <svg-icon icon-class="ep-event-icon_subevent" class="mr-2"></svg-icon>
      <svg-icon icon-class="ep-common-event" class="text-white mr-2"></svg-icon>
      <span class="text-regular mr-1">ITSM说明</span>
      <span class="text-secondary">(By: 服务台 周铁人)</span>
      <div class="flex items-center ml-5">
        <i-ep-paperclip class="mr-1"></i-ep-paperclip>
        <span class="text-regular">ITSM说明</span>
      </div>
    </div>
    <div class="item flex items-center py-4 ml-5">
      <svg-icon icon-class="ep-event-icon_subevent" class="mr-2"></svg-icon>
      <svg-icon
        icon-class="ep-event-icon_check"
        class="text-white mr-2"
      ></svg-icon>
      <span class="text-regular mr-1">领导审批子事件</span>
      <span class="text-regular mx-1">---</span>
      <span class="text-secondary"
        >(负责人:(aaron_ge 葛云),状态:审批通过 - {Closed})</span
      >
    </div>
    <div class="item flex items-center py-4 ml-5">
      <svg-icon icon-class="ep-event-icon_subevent" class="mr-2"></svg-icon>
      <svg-icon
        icon-class="ep-event-icon_email"
        class="text-white mr-2"
      ></svg-icon>
      <span class="text-regular mr-1">领导审批子事件</span>
      <span class="text-regular mx-1">---</span>
      <span class="text-secondary"
        >(负责人:(aaron_ge 葛云),状态:审批通过 - {Closed})</span
      >
    </div>
  </ReCard>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.item + .item {
  border-top: 1px solid var(--el-border-color-light);
}
* {
  font-size: 13px;
}
</style>
