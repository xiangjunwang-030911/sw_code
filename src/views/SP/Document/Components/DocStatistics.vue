<template>
  <DocWrapper title="文档统计" @moreInfo="moreInfo">
    <template #content>
      <div class="w-full h-full flex justify-around items-center">
        <div
          class="flex flex-col justify-around items-center"
          v-for="(item, index) in statisticsList"
          :key="index"
        >
          <p>
            <CountTo
              class="h-56px text-[40px] font-[500] font-['PingFangSC-Medium']"
              :startVal="item.startVal"
              :endVal="item.endVal"
              :duration="item.duration"
              ref="CountToPower"
            ></CountTo>
          </p>
          <span
            class="h-20px text-[14px] font-[400] text-[#7a869a] font-['PingFangSC-Regular']"
            >{{ item.title }}</span
          >
        </div>
      </div>
    </template>
  </DocWrapper>
</template>

<script setup lang="ts">
import { reactive, defineAsyncComponent } from 'vue';
const DocWrapper = defineAsyncComponent(() => import('./DocWrapper.vue'));
interface StatisticsItem {
  title: string;
  startVal: number;
  endVal: number;
  duration: number;
}
const statisticsList: StatisticsItem[] = reactive([
  {
    title: '全部文档',
    startVal: 0,
    endVal: 834,
    duration: 1000,
  },
  {
    title: '今日上传',
    startVal: 0,
    endVal: 2,
    duration: 1000,
  },
  {
    title: '今日打开',
    startVal: 0,
    endVal: 4,
    duration: 1000,
  },
  {
    title: '被收藏量',
    startVal: 0,
    endVal: 9,
    duration: 1000,
  },
]);
const moreInfo = () => {
  console.log('文档统计 更多');
};
</script>

<style></style>
