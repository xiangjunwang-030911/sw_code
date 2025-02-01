<template>
  <div
    ref="resolvePercent"
    id="resolvePercent"
    :style="{ width: width, height: height }"
  ></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts/types/dist/shared';
import { getOrderSolutionInfo } from '@/api/dashboard/fosun';
import { onMounted, onUnmounted, nextTick, watch } from 'vue';

echarts.use([GaugeChart, CanvasRenderer]);

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
});

const valueList = [
  {
    value: 50.05,
    title: '按时响应率',
  },
  {
    value: 27.05,
    title: '按时解决率',
  },
];

let myChart: echarts.EChartsType | null = null;

const calcFontSize = (size: number) => {
  let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (!width) return;
  let fontSize = width / 1920;
  return size * fontSize;
};

let option: EChartsOption = {
  grid: {
    top: '0%',
    right: '0%',
    left: '0%',
    bottom: '0%',
    containLabel: true,
  },
  series: [
    {
      type: 'gauge',
      radius: '80%',
      center: ['27%', '50%'],
      progress: {
        itemStyle: {
          color: 'RGBA(56, 111, 255, 1)',
        },
        show: true,
        width: 10,
        roundCap: true,
      },
      axisLine: {
        lineStyle: {
          color: [[1, 'RGBA(255, 255, 255, 0.2)']],
          width: 10,
        },
        roundCap: true,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        show: false,
      },
      anchor: {
        show: false,
      },
      title: {
        show: true,
        fontSize: calcFontSize(20),
        color: '#fff',
      },
      detail: {
        valueAnimation: true,
        fontSize: calcFontSize(30),
        color: 'RGBA(100, 179, 252, 1)',
        formatter: '{value}%',
        offsetCenter: [0, 0],
      },
      data: [
        {
          value: valueList[0].value,
          name: valueList[0].title,
          title: {
            offsetCenter: ['0', '110%'],
          },
        },
      ],
    },
    {
      type: 'gauge',
      radius: '80%',
      center: ['73%', '50%'],
      progress: {
        itemStyle: {
          color: 'RGBA(10, 242, 255, 1)',
        },
        show: true,
        width: 10,
        roundCap: true,
      },
      axisLine: {
        lineStyle: {
          color: [[1, 'RGBA(255, 255, 255, 0.2)']],
          width: 10,
        },
        roundCap: true,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        show: false,
      },
      anchor: {
        show: false,
      },
      title: {
        show: true,
        fontSize: calcFontSize(20),
        color: '#fff',
      },
      detail: {
        valueAnimation: true,
        fontSize: calcFontSize(30),
        color: 'RGBA(10, 242, 255, 1)',
        formatter: '{value}%',
        offsetCenter: [0, 0],
      },
      data: [
        {
          value: valueList[1].value,
          name: valueList[1].title,
          title: {
            offsetCenter: ['0', '110%'],
          },
        },
      ],
    },
  ],
};

const drawLine = () => {
  myChart?.setOption(option);
};

const init = async () => {
  // const res = await getOrderSolutionInfo({ projectId: 106 });
  // valueList[0].value =
  //   Math.floor((res.responseOnTimeCounts / res.counts) * 10000) / 100;
  // valueList[1].value =
  //   Math.floor((res.resolveOnTimeCounts / res.counts) * 10000) / 100;
  const res = await getOrderSolutionInfo({ projectId: 106 });
  valueList[0].value =
    Math.floor((res.responseOnTimeCounts / res.responseCounts) * 10000) / 100;
  valueList[1].value =
    Math.floor((res.resolveOnTimeCounts / res.resolveCounts) * 10000) / 100;
  option.series = [
    {
      data: [
        {
          value: valueList[0].value,
          name: valueList[0].title,
          title: {
            offsetCenter: ['0', '110%'],
          },
        },
      ],
    },
    {
      data: [
        {
          value: valueList[1].value,
          name: valueList[1].title,
          title: {
            offsetCenter: ['0', '110%'],
          },
        },
      ],
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
  () => {
    init();
  },
  { immediate: true, deep: true },
);

onMounted(() => {
  nextTick(() => {
    myChart = echarts.init(document.getElementById('resolvePercent'));
    drawLine();
  });
});

onUnmounted(() => {
  myChart?.dispose();
});
</script>

<style lang="scss" scoped></style>
