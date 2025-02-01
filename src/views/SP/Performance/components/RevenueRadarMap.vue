<template>
  <div ref="main" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsOption } from 'echarts/types/dist/shared';
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

interface Props {
  onResize?: number[];
}
const props = withDefaults(defineProps<Props>(), {
  onResize: () => [0, 0],
});

const option: EChartsOption = reactive({
  legend: {
    data: [
      {
        name: '客户营收',
        itemStyle: {
          color: '#4E74B4',
        },
        textStyle: {
          color: '#4E74B4',
        },
      },
      {
        name: '内部成本',
        itemStyle: {
          color: '#4EB44E',
        },
        textStyle: {
          color: '#4EB44E',
        },
      },
    ],
    left: '70%',
    top: '40%',
    itemWidth: 18,
    itemHeight: 5,
  },
  symbol: 'none',
  radar: {
    center: ['35%', '50%'],
    axisName: {
      show: false,
    },
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 },
    ],
  },
  series: [
    {
      type: 'radar',
      lineStyle: {
        width: 1,
      },
      data: [
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: '客户营收',
          lineStyle: {
            color: '#4E74B4',
          },
          areaStyle: {
            color: 'rgba(78,116,180,0.25)',
          },
        },
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: '内部成本',
          lineStyle: {
            color: '#4EB44E',
          },
          areaStyle: {
            color: 'rgba(78,180,78,0.25)',
          },
        },
      ],
    },
  ],
});

const main = ref(null);
let myChart: echarts.EChartsType | null = null;

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
