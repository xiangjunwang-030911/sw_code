<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center text-secondary">
      <div class="text-theme">
        <span class="mr-1 font-semibold text-xs">4</span>
        <span class="text-xs">等待处理</span>
      </div>
      <div
        class="w-1 h-1 bg-[var(--el-text-color-secondary)] rounded-full mx-2"
      ></div>
      <div>
        <span class="mr-1 text-xs">未读</span>
        <span class="font-semibold text-xs">15</span>
      </div>
      <div
        class="w-1 h-1 bg-[var(--el-text-color-secondary)] rounded-full mx-2"
      ></div>
      <div>
        <span class="mr-1 text-xs">总计</span>
        <span class="font-semibold text-xs">125</span>
      </div>
    </div>
    <svg-icon
      icon-class="common-icon_filter"
      class="cursor-pointer"
      :size="16"
    ></svg-icon>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
