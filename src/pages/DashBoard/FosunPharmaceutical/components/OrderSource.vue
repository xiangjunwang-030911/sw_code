<template>
  <div id="orderSource" :style="{ width: width, height: height }"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts/types/dist/shared';
import { getOrderSourceData } from '@/api/dashboard/fosun';
import { onMounted, onUnmounted, watch } from 'vue';

echarts.use([GridComponent, TooltipComponent, BarChart, CanvasRenderer]);

interface Props {
  width?: string;
  height?: string;
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
  width: '100%',
  height: '100%',
  onResize: () => [0, 0],
  dateInfo: () => ({}),
});

let yAxisData = ['微信', '电信', 'APP', '官网', '邮件', '其他'].reverse();
let seriesData = [300, 250, 200, 160, 130, 80].reverse();
let myChart: echarts.EChartsType | null = null;

let option: EChartsOption = {
  color: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#1A3B95', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#3163FB', // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '0%',
    top: '10%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'value',
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      color: '#FFF',
      fontFamily: 'MicrosoftYaHei',
      opacity: 0.7,
      margin: 18,
    },
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      show: true,
      color: '#FFF',
      // fontSize: "26",
      fontFamily: 'MicrosoftYaHei',
      opacity: 0.7,
      margin: 18,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      data: [],
      type: 'bar',
      itemStyle: {
        borderRadius: [0, 5, 5, 0],
      },
      showBackground: true,
      backgroundStyle: {
        color: 'RGBA(18, 39, 67, .8)',
        borderRadius: [0, 5, 5, 0],
      },
    },
  ],
};

const drawLine = () => {
  myChart?.setOption(option);
};

const init = async (start: string, end: string) => {
  const res = await getOrderSourceData({
    projectId: 106,
    fieldId: 14,
    dtTo: new Date(end).toISOString(),
    dtFrom: new Date(start).toISOString(),
  });

  yAxisData = res.map((item) => item.name).reverse();
  seriesData = res.map((item) => item.count).reverse();

  option.yAxis = {
    data: yAxisData,
  };
  option.series = [
    {
      data: seriesData,
    },
  ];
  drawLine();
};

watch(
  () => props.onResize,
  () => {
    myChart?.resize();
  },
);

watch(
  () => props.dateInfo,
  ({ start, end }) => {
    if (start && end) {
      init(start, end);
    }
  },
  { immediate: true },
);

onMounted(() => {
  myChart = echarts.init(document.getElementById('orderSource'));
  drawLine();
});

onUnmounted(() => {
  myChart?.dispose();
});
</script>

<style></style>
