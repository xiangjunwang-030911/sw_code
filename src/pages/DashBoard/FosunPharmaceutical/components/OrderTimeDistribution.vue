<template>
  <div ref="main" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  TopLevelFormatterParams,
  EChartsOption,
} from 'echarts/types/dist/shared';
import { getOrderTimeDistributionData } from '@/api/dashboard/fosun';
import { computed, ref, watch } from 'vue';

echarts.use([
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

interface Props {
  onResize: number[];
  dateInfo: DataInfo;
}

interface DataInfo {
  yearFrom?: number;
  monthFrom?: number;
  yearTo?: number;
  monthTo?: number;
  start?: string;
  end?: string;
}

const props = withDefaults(defineProps<Props>(), {
  onResize: () => [0, 0],
  dateInfo: () => ({}),
});

let seriesData = ref<number[]>([]);
let timeData = ref<string[]>([]);
let myChart: echarts.EChartsType | null = null;
const main = ref(null);

const option = computed<EChartsOption>(() => {
  return {
    grid: {
      top: 6,
      bottom: 25,
      left: 20,
      right: 20,
    },
    tooltip: {
      show: true,
      triggerOn: 'mousemove',
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: function (params: TopLevelFormatterParams) {
        if (Array.isArray(params)) {
          const item = params[0];
          const titleArr = item.name.split('.');
          const title = titleArr[0] + '年' + titleArr[1] + '月';
          return title + '<br>' + item.marker + item.value;
        }
        return '';
      },
    },
    xAxis: {
      type: 'category',
      data: timeData.value,
      axisLine: {
        show: false,
      },
      boundaryGap: false,
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
      axisLabel: {
        show: true,
        margin: 4,
        color: '#fff',
        fontFamily: 'Arial',
        fontWeight: 'bold',
      },
      splitLine: {
        show: true,
        lineStyle: { type: 'dashed', color: ['#213488'] },
      },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        data: seriesData.value,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#3453cf', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(20, 33, 88,0.1)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  };
});

const initChart = () => {
  myChart?.setOption(option.value);
};

const init = async (
  yearFrom: number,
  monthFrom: number,
  yearTo: number,
  monthTo: number,
) => {
  const res = await getOrderTimeDistributionData({
    projectId: 106,
    yearFrom,
    monthFrom,
    yearTo,
    monthTo,
  });
  seriesData.value = res.map((item) => item.count);
  timeData.value = res.map(
    (item) => String(item.year).slice(2) + '.' + item.month,
  );
  initChart();
};

watch(
  () => props.onResize,
  () => {
    myChart?.resize();
  },
);
watch(
  () => props.dateInfo,
  ({ yearFrom, monthFrom, yearTo, monthTo }) => {
    if (yearFrom && monthFrom && yearTo && monthTo) {
      init(yearFrom, monthFrom, yearTo, monthTo);
    }
  },
  { immediate: true },
);

onMounted(() => {
  const chartDom = main.value;
  myChart = echarts.init(chartDom);
  initChart();
});
</script>

<style></style>
