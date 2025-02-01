<template>
  <div ref="classificationPie" style="{ width: 100%, height: 100% }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts/types/dist/shared';
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  GridComponent,
]);

interface Props {
  onResize: number[];
  data?: { value: number; name: string }[];
}

const props = withDefaults(defineProps<Props>(), {
  onResize: () => [0, 0],
  data: () => [
    { value: 60, name: '浏览器问题' },
    { value: 20, name: 'SAP问题' },
    { value: 20, name: '邮箱问题' },
  ],
});

let myChart: echarts.EChartsType | null = null;
const option: EChartsOption = reactive({
  grid: {
    top: '0%',
    left: '1%',
    bottom: '5%',
    right: '1%',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'horizontal',
    left: 'center',
    bottom: '5%',
    itemHeight: 8,
    data: [
      {
        name: '浏览器问题',
        textStyle: {
          color: '#4E74B4',
        },
      },
      {
        name: 'SAP问题',
        textStyle: {
          color: '#4EB44E',
        },
      },
      {
        name: '邮箱问题',
        textStyle: {
          color: '#EBCD63',
        },
      },
    ],
  },
  series: [
    {
      type: 'pie',
      radius: '60%',
      data: props.data,
      label: {
        show: false,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});

const classificationPie = ref(null);

const drawLine = () => {
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
    myChart = echarts.init(classificationPie.value);
    drawLine();
  });
});

onUnmounted(() => {
  myChart?.dispose();
});
</script>

<style></style>
