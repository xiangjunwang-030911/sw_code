<template>
  <div>
    <div class="flex justify-between pt-3">
      <div class="flex flex-col justify-around items-center">
        <CountTo
          class="h-56px text-[24px] font-[500] font-['PingFangSC-Medium'] text-[#44B044]"
          :startVal="0"
          :endVal="countData[0]?.count"
          :duration="1000"
          ref="CountToPower"
        ></CountTo>
        <span
          class="h-20px font-[400] text-[#7a869a] font-['PingFangSC-Regular']"
          >{{ countData[0]?.title }}</span
        >
      </div>
      <div class="flex flex-col justify-around items-center">
        <CountTo
          class="h-56px text-[24px] font-[500] font-['PingFangSC-Medium'] text-[#272928]"
          :startVal="0"
          :endVal="countData[1]?.count"
          :duration="1000"
          ref="CountToPower"
        ></CountTo>
        <span
          class="h-20px font-[400] text-[#7a869a] font-['PingFangSC-Regular']"
          >{{ countData[1]?.title }}</span
        >
      </div>
      <div class="flex flex-col justify-around items-center">
        <CountTo
          class="h-56px text-[24px] font-[500] font-['PingFangSC-Medium'] text-[#272928]"
          :startVal="0"
          :endVal="countData[2]?.count"
          :duration="1000"
          ref="CountToPower"
        ></CountTo>
        <span
          class="h-20px font-[400] text-[#7a869a] font-['PingFangSC-Regular']"
          >{{ countData[2]?.title }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  countData: {
    title: string;
    count: number;
  }[];
}
withDefaults(defineProps<Props>(), {
  countData: () => [
    {
      title: '浮动',
      count: 80,
    },
    {
      title: '已使用',
      count: 64,
    },
    {
      title: '当前占用',
      count: 31,
    },
  ],
});
</script>

<style lang="scss" scoped></style>
