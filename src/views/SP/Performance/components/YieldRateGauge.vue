<template>
  <div ref="main" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import { TooltipComponent } from 'echarts/components';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  EChartsOption,
  GaugeSeriesOption,
} from 'echarts/types/dist/shared';
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
echarts.use([TooltipComponent, GaugeChart, CanvasRenderer]);

interface Props {
  onResize: number[];
}
const props = withDefaults(defineProps<Props>(), {
  onResize: () => [0, 0],
});

const main = ref(null);
let myChart: echarts.EChartsType | null = null;

const commonOption: GaugeSeriesOption = {
  radius: '85%',
  startAngle: 220,
  endAngle: -40,
  progress: {
    show: true,
    itemStyle: {
      color: '#46b146',
    },
  },
  detail: {
    valueAnimation: true,
    color: '#46b146',
    fontSize: 40,
    offsetCenter: ['0', '55%'],
    formatter: '{value}',
  },
  axisLine: {
    lineStyle: {
      color: [[1, '#d5ecd4']],
    },
  },
  splitLine: {
    show: false,
  },
  axisTick: {
    show: true,
    splitNumber: 1,
    distance: 2,
  },
  axisLabel: {
    distance: 3,
  },
  pointer: {
    itemStyle: {
      color: '#46b146',
    },
  },
  title: {
    show: true,
    offsetCenter: ['0', '90%'],
    fontFamily: 'Arial',
    color: '#718096',
  },
};

const option: EChartsOption = reactive({
  tooltip: {
    formatter: '{b} : {c}%',
  },
  series: [
    {
      ...commonOption,
      type: 'gauge',
      center: ['30%', '50%'],
      data: [
        {
          value: 70,
          name: '响应达成率',
        },
      ],
    },
    {
      ...commonOption,
      type: 'gauge',
      center: ['70%', '50%'],
      data: [
        {
          value: 70,
          name: '解决达成率',
        },
      ],
    },
  ],
});

const init = () => {
  myChart = echarts.init(main.value);
};

const setOption = () => {
  myChart?.setOption(option);
};

watch(
  () => props.onResize,
  () => {
    myChart?.resize();
  },
);

onMounted(() => {
  nextTick(() => {
    init();
    setOption();
  });
});

onUnmounted(() => {
  myChart?.dispose();
});
</script>

<style></style>
