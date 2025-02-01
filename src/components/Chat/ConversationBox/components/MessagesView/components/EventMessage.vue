<template>
  <div
    class="bg-[#F5F7F9] rounded-lg p-3 h-fit text-[#2A2A2A] text-[13px] w-[300px] flex"
  >
    <div
      class="rounded-full w-[30px] h-[30px] bg-[#EDEDED] flex items-center justify-center mr-3"
    >
      <svg-icon icon-class="ep-common-ep_event" :size="15"></svg-icon>
    </div>
    <div class="flex-1 w-0">
      <div class="flex justify-between items-center">
        <div>
          <span class="mr-1 text-xs text-secondary">事件ID:</span>
          <span class="text-xs">#439</span>
        </div>
        <div class="text-xs text-secondary">10:30 am</div>
      </div>
      <div
        class="text-[#2C2B52] text-xs my-2 line-clamp-2 max-h-[28px]"
        title="xxxx"
      >
        我希望有人来帮我看下服务器防火墙相关问题
      </div>
      <div class="flex justify-between items-center">
        <div>
          <span class="text-secondary text-xs">当前负责人:</span>
          <span class="text-xs">二线-吴元</span>
        </div>
        <div
          class="border-[#DDDDDD] border rounded-xl text-xs py-[2px] px-3 bg-white text-regular !text-[#505050]"
        >
          协同处理
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
