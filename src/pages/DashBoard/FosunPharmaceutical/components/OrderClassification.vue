<template>
  <div id="OrderClassification" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  TopLevelFormatterParams,
  EChartsOption,
  BarSeriesOption,
} from 'echarts/types/dist/shared';
import { get2IdNameCountGroupBy2Field as get2IdNameCountGroupBy2FieldApi } from '@/api/dashboard/fosun';
import { onMounted, onUnmounted, watch } from 'vue';

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);

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

const itemStyleList = ['#2FD8FF', '#FFD946', '#F8635D', '#3061F6', '#61F5A9'];
let myChart: echarts.EChartsType | null = null;
let yAxisData = [['Direct', 320, 302, 301, 334, 390, 330, 320]];
let xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

let option: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: function (params: TopLevelFormatterParams) {
      var result = '';
      if (Array.isArray(params)) {
        params.forEach(function (item) {
          result += item.name + ': ' + item.value + '<br>';
        });
      }
      return result;
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '0%',
    top: '18%',
    containLabel: true,
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
      color: '#FFFFFF',
      // fontSize: "26",
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
    data: xAxisData,
    axisLabel: {
      show: true,
      color: '#FFFFFF',
      // fontSize: "26",
      fontFamily: 'MicrosoftYaHei',
      opacity: 0.7,
      interval: 0,
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
  series: [],
};

const drawLine = () => {
  myChart?.setOption(option);
};

const handlerXY = () => {
  option.series = [];
  let serieObjList: BarSeriesOption[] = [];
  yAxisData.forEach((item, index) => {
    serieObjList.push({
      name: item[0],
      type: 'bar',
      stack: 'total',
      itemStyle: {
        color: itemStyleList[index],
        borderRadius: [3, 3, 3, 3],
      },
      emphasis: {
        focus: 'series',
      },
      barWidth: '64%',
      data: item.slice(1),
    });
  });
  option.series = serieObjList;
  setTimeout(() => {
    drawLine();
  }, 50);
};

const get2IdNameCountGroupBy2Field = async (dtFrom: string, dtTo: string) => {
  await get2IdNameCountGroupBy2FieldApi({
    projectId: 106,
    fieldId: 105,
    fieldId2: 120,
    dtFrom,
    dtTo,
  }).then((res) => {
    const namesCount = res.reduce((result: Record<string, number>, item) => {
      if (item.name) {
        result[item.name] = (result[item.name] || 0) + 1;
      }
      return result;
    }, {});

    const namesSorted = Object.entries(namesCount).sort(
      ([, countA], [, countB]) => countB - countA,
    );

    xAxisData = namesSorted.slice(0, 6).map(([name]) => name);

    yAxisData = [['']];

    xAxisData.forEach((name: string | null) => {
      if (name === 'null') name = null;
      let item = res.find((item) => item.name === name);
      if (item) {
        yAxisData[0].push(item.count);
      }
    });

    option.yAxis = {
      data: xAxisData,
    };

    handlerXY();
  });
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
      get2IdNameCountGroupBy2Field(
        new Date(start).toISOString(),
        new Date(end).toISOString(),
      );
    }
  },
  { immediate: true, deep: true },
);

onMounted(() => {
  myChart = echarts.init(document.getElementById('OrderClassification'));
  drawLine();
});

onUnmounted(() => {
  myChart?.dispose();
});
</script>

<style></style>
