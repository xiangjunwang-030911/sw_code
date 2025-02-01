<template>
  <div ref="supportProportionPie" style="{ width: 100%, height: 100% }"></div>
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
import { EChartsOption } from 'echarts/types/dist/shared';
import { CanvasRenderer } from 'echarts/renderers';
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
  data1?: DataItem[];
  data2?: DataItem[];
  data3?: DataItem[];
}

interface DataItem {
  value: number;
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  onResize: () => [0, 0],
  data1: () => [
    { value: 60, name: '浏览器问题' },
    { value: 20, name: 'SAP问题' },
    { value: 20, name: '邮箱问题' },
  ],
  data2: () => [
    { value: 60, name: '浏览器问题' },
    { value: 40, name: 'SAP问题' },
    { value: 20, name: '邮箱问题' },
  ],
  data3: () => [
    { value: 55, name: '浏览器问题' },
    { value: 20, name: 'SAP问题' },
    { value: 10, name: '邮箱问题' },
  ],
});

let myChart: echarts.EChartsType | null = null;

const colors = reactive([
  ['#4E74B4', '#EBCD63', '#4EB44E'],
  ['#4EB44E', '#6374EB', '#B48F4E'],
  ['#B4604E', '#6370EB', '#4EB4AB'],
]);

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

  series: [
    {
      type: 'pie',
      radius: '80%',
      center: ['20%', '50%'],
      data: props.data1,
      itemStyle: {
        color: ({ seriesIndex, dataIndex }) => {
          if (seriesIndex) {
            return colors[seriesIndex][dataIndex];
          }
          return colors[0][dataIndex];
        },
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    {
      type: 'pie',
      radius: '80%',
      center: ['50%', '50%'],
      data: props.data2,
      itemStyle: {
        color: ({ seriesIndex, dataIndex }) => {
          if (seriesIndex) {
            return colors[seriesIndex][dataIndex];
          }
          return colors[1][dataIndex];
        },
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    {
      type: 'pie',
      radius: '80%',
      center: ['80%', '50%'],
      data: props.data3,
      itemStyle: {
        color: ({ seriesIndex, dataIndex }) => {
          if (seriesIndex) {
            return colors[seriesIndex][dataIndex];
          }
          return colors[2][dataIndex];
        },
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

const supportProportionPie = ref(null);

const drawLine = () => {
  myChart = echarts.init(supportProportionPie.value);
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
    drawLine();
    setOption();
  });
});

onUnmounted(() => {
  myChart?.dispose();
});
</script>

<style></style>
