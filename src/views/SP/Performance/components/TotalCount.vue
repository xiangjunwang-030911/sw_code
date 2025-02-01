<template>
  <div>
    <div class="flex items-center justify-between border-b border-light pb-2">
      <div class="">{{ title }}</div>
      <svg-icon
        iconClass="common-icon_more"
        size="26"
        class="cursor-pointer"
      ></svg-icon>
    </div>
    <div class="flex justify-between pt-3">
      <div class="flex flex-col justify-around items-center">
        <CountTo
          class="h-56px text-[40px] font-[500] font-['PingFangSC-Medium'] text-[#44B044]"
          :startVal="0"
          :endVal="59"
          :duration="1000"
          ref="CountToPower"
        ></CountTo>
        <span
          class="h-20px text-[14px] font-[400] text-[#7a869a] font-['PingFangSC-Regular']"
          >今天</span
        >
      </div>
      <div class="flex flex-col justify-around items-center">
        <CountTo
          class="h-56px text-[40px] font-[500] font-['PingFangSC-Medium'] text-primary"
          :startVal="0"
          :endVal="159"
          :duration="1000"
          ref="CountToPower"
        ></CountTo>
        <span
          class="h-20px text-[14px] font-[400] text-[#7a869a] font-['PingFangSC-Regular']"
          >本月</span
        >
      </div>
      <div class="flex flex-col justify-around items-center">
        <CountTo
          class="h-56px text-[40px] font-[500] font-['PingFangSC-Medium'] text-primary"
          :startVal="0"
          :endVal="2659"
          :duration="1000"
          ref="CountToPower"
        ></CountTo>
        <span
          class="h-20px text-[14px] font-[400] text-[#7a869a] font-['PingFangSC-Regular']"
          >今年</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}
defineProps<Props>();
</script>

<style></style>
