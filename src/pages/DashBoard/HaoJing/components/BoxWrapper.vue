<template>
    <div
      class="w-full h-full rounded-xl p-4 flex flex-col"
      :class="hideBg ? '' : 'bg-[#0c1948]'"
    >
      <div class="head flex items-center ml-[-25px]">
        <div class="title-wrapper">{{ title }}</div>
        <img
          class="w-[50px] ml-3"
          src="/static/img/dashboard_fx_box_icon.png"
          alt=""
        />
      </div>
      <div class="container pt-3 flex-1">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    title: string;
    hideBg?: boolean;
  }
  
  withDefaults(defineProps<Props>(), {
    title: '',
    hideBg: false,
  });
  </script>
  
  <style lang="scss" scoped>
  .title-wrapper {
    flex: 1;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-weight: bold;
    font-style: italic;
    font-size: 16px;
    padding-left: 40px;
    background-image: url('/static/img/dashboard_fx_box_title_bg.png');
    background-repeat: no-repeat;
  }
  </style>
  