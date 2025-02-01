<template>
  <div
    id="container"
    ref="myChart"
    :style="{ width: '100%', height: '100%' }"
  ></div>
</template>

<script setup lang="ts">
import { onMounted, reactive, nextTick } from 'vue';
import { useEventListener } from '@/hooks/events/useEventListener';
import * as echarts from 'echarts/core';
import {
  GridComponent,
  MarkAreaComponent,
  TooltipComponent,
} from 'echarts/components';
import { LineChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  CallbackDataParams,
  EChartsOption,
  BarSeriesOption,
} from 'echarts/types/dist/shared';
import { useThemeStore } from '@/store/modules/theme';
import { ModeEnum } from '@/enums/themeEnum';

const themeStore = useThemeStore();

echarts.use([
  GridComponent,
  MarkAreaComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
  TooltipComponent,
]);
const option: EChartsOption = reactive({
  tooltip: {},
  grid: {
    width: '100%',
    top: '3%',
    left: 0,
    right: 0,
    bottom: 0,
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
      axisLine: { show: false }, // 不显示轴线
      splitLine: { show: false }, // 不显示分割线
      axisTick: { show: false }, // 不显示刻度线
    },
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: { show: false }, // 不显示分割F线
    },
  ],
  series: [
    {
      type: 'bar',
      barWidth: '80%',
      showBackground: true,
      backgroundStyle: {
        color: themeStore.getMode === ModeEnum.LIGHT ? '#F9FAFB' : '#343434',
        borderRadius: [5, 5, 0, 0],
      },
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#44B044' },
          { offset: 1, color: '#333333' },
        ]),
        borderRadius: [5, 5, 0, 0],
      },
    },
    {
      type: 'line',
      smooth: false,
      data: [30, 28, 25, 26, 27, 3, 55, 5, 4, 39, 85, 40],
      symbolSize: 3,
      lineStyle: {
        color: '#44B044 ',
        width: 1,
        type: 'dashed',
      },
      itemStyle: {
        color: '#44B044',
      },
      areaStyle: {
        // normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(68, 176, 68, 0.3)' },
          { offset: 1, color: '#f0f0f0' },
        ]),
        // },
      },
    },
  ],
});
let myChart: echarts.EChartsType | null = null;

function drawLine() {
  myChart?.setOption(option);
}

const initFinishedListner = () => {
  myChart?.on('finished', () => {
    myChart?.on('mouseover', (params: CallbackDataParams) => {
      const dataIndex = params.dataIndex;
      const newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      newData[dataIndex] = params.data as number;
      option.series = [
        {
          data: newData,
        },
      ];
      drawLine();
    });
    myChart?.on('mouseout', () => {
      const newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      option.series = [
        {
          data: newData,
        },
      ];
      drawLine();
    });
  });
};

function resizeChart() {
  myChart?.resize();
}

watch(
  () => themeStore.getMode,
  (newValue) => {
    if (newValue === ModeEnum.LIGHT) {
      setBarBGColor('#F9FAFB');
    } else {
      setBarBGColor('#343434');
    }
  },
);

const setBarBGColor = (value: string) => {
  const currentOption = myChart?.getOption();
  if (currentOption?.series && Array.isArray(currentOption.series)) {
    currentOption?.series.forEach((item: BarSeriesOption) => {
      if (item.backgroundStyle) {
        item.backgroundStyle.color = value;
      }
    });
    myChart?.setOption(currentOption, true);
  }
};

onMounted(() => {
  nextTick(() => {
    myChart = echarts.init(document.getElementById('container'));
    drawLine();
    initFinishedListner();
    useEventListener({
      name: 'resize',
      listener: resizeChart,
    });
    setTimeout(() => {
      resizeChart();
    }, 500);
  });
});
</script>

<style></style>
