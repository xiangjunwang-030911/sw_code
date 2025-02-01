<template>
  <div class="px-3">
    <div class="px-9 py-3 font-medium">全局看板视图</div>
    <el-row :gutter="10" class="enter-x">
      <el-col :span="8" class="enter-x">
        <el-card class="w-full" shadow="hover">
          <TotalCount title="工单总量"></TotalCount>
        </el-card>
      </el-col>
      <el-col :span="8" class="enter-x">
        <el-card class="w-full" shadow="hover">
          <TotalCount title="工单总量"></TotalCount>
        </el-card>
      </el-col>
      <el-col :span="8" class="enter-x">
        <el-card class="w-full" shadow="hover">
          <TotalCount title="工单总量"></TotalCount>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mt-3 enter-x">
      <el-col :span="16" class="enter-x">
        <el-card class="w-full fix-height-card" shadow="hover">
          <div
            class="flex items-center justify-between border-b border-light pb-2 mb-3"
          >
            <div class="">工单时间分布</div>
            <svg-icon
              iconClass="common-icon_more"
              size="26"
              class="cursor-pointer"
            ></svg-icon>
          </div>
          <LineTable class="w-full flex-1" />
        </el-card>
      </el-col>
      <el-col :span="8" class="enter-x">
        <el-card class="w-full fix-height-card" shadow="hover">
          <div
            class="flex items-center justify-between border-b border-light pb-2 mb-3"
          >
            <div class="">事件问题分类</div>
            <svg-icon
              iconClass="common-icon_more"
              size="26"
              class="cursor-pointer"
            ></svg-icon>
          </div>
          <ClassificationPie
            class="h-full"
            :onResize="windowSize"
          ></ClassificationPie>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mt-3 enter-x">
      <el-col :span="16" class="enter-x">
        <el-card class="w-full fix-height-card" shadow="hover">
          <div
            class="flex items-center justify-between border-b border-light pb-2 mb-3"
          >
            <div class="">SLA达成率</div>
            <svg-icon
              iconClass="common-icon_more"
              size="26"
              class="cursor-pointer"
            ></svg-icon>
          </div>
          <YieldRateGauge :onResize="windowSize"></YieldRateGauge>
        </el-card>
      </el-col>
      <el-col :span="8" class="enter-x">
        <el-card class="w-full fix-height-card" shadow="hover">
          <div
            class="flex items-center justify-between border-b border-light pb-2 mb-3"
          >
            <div class="">事件问题分类</div>
            <svg-icon
              iconClass="common-icon_more"
              size="26"
              class="cursor-pointer"
            ></svg-icon>
          </div>
          <RevenueRadarMap :onResize="windowSize"></RevenueRadarMap>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mt-3 px-[5px] enter-x">
      <el-card class="w-full" shadow="hover">
        <div
          class="flex items-center justify-between border-b border-light pb-2 mb-3"
        >
          <div class="">事件支撑占比</div>
          <svg-icon
            iconClass="common-icon_more"
            size="26"
            class="cursor-pointer"
          ></svg-icon>
        </div>
        <SupportProportionPie
          class="min-h-[250px]"
          :onResize="windowSize"
        ></SupportProportionPie>
      </el-card>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useEventListener } from '@/hooks/events/useEventListener';
const TotalCount = defineAsyncComponent(
  () => import('./components/TotalCount.vue'),
);
const LineTable = defineAsyncComponent(
  () => import('@/components/echarts/LineTable.vue'),
);
const ClassificationPie = defineAsyncComponent(
  () => import('./components/ClassificationPie.vue'),
);
const RevenueRadarMap = defineAsyncComponent(
  () => import('./components/RevenueRadarMap.vue'),
);
const SupportProportionPie = defineAsyncComponent(
  () => import('./components/SupportProportionPie.vue'),
);
const YieldRateGauge = defineAsyncComponent(
  () => import('./components/YieldRateGauge.vue'),
);

const windowSize = ref([0, 0]);

const handleResize = () => {
  windowSize.value = [window.innerWidth, window.innerHeight];
};

onMounted(() => {
  useEventListener({
    name: 'resize',
    listener: handleResize,
  });
});
</script>

<style lang="scss" scoped>
.fix-height-card {
  :deep(.el-card__body) {
    height: 350px;
    display: flex;
    flex-direction: column;
  }
}
</style>
