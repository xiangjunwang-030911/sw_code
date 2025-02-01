<template>
  <div class="flex items-center justify-center">
    <div class="bg-[#FBF9E6] rounded-lg py-4 px-3 flex items-center">
      <svg-icon icon-class="chat-icon_request_live" :size="25"></svg-icon>
      <div class="mx-3">
        <span class="text-xs font-bold text-[rgba(0,0,0,0.85)]"
          >Request live person support</span
        >
        <div>
          <span class="text-xs text-[rgba(0,0,0,0.5)] mr-1">Waiting Time</span>
          <span class="text-[13px] font-bold text-[#E02020]">01:20</span>
        </div>
      </div>
      <el-button round size="small"
        ><span class="!text-xs mx-4">Join</span></el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
