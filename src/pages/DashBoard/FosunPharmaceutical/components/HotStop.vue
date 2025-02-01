<template>
  <div id="HotStop" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import type { DatasetComponentOption } from 'echarts/components';
import type {
  CallbackDataParams,
  EChartsOption,
  BarSeriesOption,
} from 'echarts/types/dist/shared';
import {
  GetIdNameCountGroupByFieldResult,
  ChildIdNameCount,
} from '@/api/dashboard/fosun/fosunModel';
import { get2IdNameCountGroupBy2Field as get2IdNameCountGroupBy2FieldApi } from '@/api/dashboard/fosun';
import { onMounted, onUnmounted, watch } from 'vue';

echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
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

const itemStyleList = ['#2FD8FF', '#61F5A9', '#FFD946', '#F8635D', '#3061F6'];

let myChart: echarts.EChartsType | null = null;

let xAxisData = [
  'SAP关键用户',
  'IT工程师组',
  '现场工程师组',
  'SAP关键用户',
  'IT工程师组',
  '现场工程师组',
];

let yAxisData = [
  ['1', '2', '3', '4', '5', '6'],
  ['7', '6', '5', '4', '3', '2'],
];

let option: EChartsOption = {
  itemStyle: {
    borderColor: '#000',
  },
  tooltip: {},
  dataset: {
    source: [],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '0%',
    top: '18%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        color: '#FFFFFF',
        fontFamily: 'MicrosoftYaHei',
        rotate: -15,
        opacity: 0.7,
        margin: 20,
        align: 'center',
        interval: 0,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      data: xAxisData,
    },
  ],
  yAxis: [
    {
      axisLine: {
        show: false,
        lineStyle: {
          color: '#FFFFFF', //y轴线的颜色（若只设置了y轴线的颜色，未设置y轴文字的颜色，则y轴文字会默认跟设置的y轴线颜色一致）
          width: 1, //y轴线的宽度
          type: 'solid', //y轴线为实线
        },
      },
      axisLabel: { show: false },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: { color: '#2FD8FF', opacity: 0.2, type: 'dashed' },
      },
    },
  ],
  series: [],
};
const drawLine = () => {
  myChart?.setOption(option);
};

const handlerXY = () => {
  if (option.dataset) {
    option.series = [];
    let newSource: string[][] = [];
    const dataSet = option.dataset as DatasetComponentOption;
    xAxisData.forEach((item) => {
      newSource.push([item]);
    });

    let serieObjList: BarSeriesOption[] = [];
    yAxisData.forEach((item, index) => {
      serieObjList.push({
        type: 'bar',
        itemStyle: {
          color: itemStyleList[index],
          borderRadius: 4,
        },
        label: {
          show: true,
          position: 'top',
          formatter: (params: CallbackDataParams) => {
            return params.value as string;
          },
          color: '#FFFFFF',
          fontFamily: 'MicrosoftYaHei',
          align: 'center',
        },
        barWidth: '20%',
        barGap: 1,
        data: item,
      });
      item.forEach((subitem, itemIndex) => {
        newSource[itemIndex].push(subitem);
      });
    });
    dataSet.source = newSource;
    option.series = serieObjList;
    if (option.xAxis) {
      option.xAxis = [
        {
          data: xAxisData,
        },
      ];
    }

    setTimeout(() => {
      drawLine();
    }, 50);
  }
};

const get2IdNameCountGroupBy2Field = async (dtFrom: string, dtTo: string) => {
  await get2IdNameCountGroupBy2FieldApi({
    projectId: 106,
    fieldId: 491,
    fieldId2: 103,
    dtFrom,
    dtTo,
  }).then((res: GetIdNameCountGroupByFieldResult[]) => {
    if (res.length === 0) {
    } else {
      const namesCount = res.reduce((result: Record<string, number>, item) => {
        result[item.name] = (result[item.name] || 0) + 1;
        return result;
      }, {});

      const namesSorted = Object.entries(namesCount).sort(
        ([, countA], [, countB]) => countB - countA,
      );
      xAxisData = namesSorted.slice(0, 6).map(([name]) => name);

      const childIdNames = res.reduce(
        (result: Record<string, ChildIdNameCount[]>, item) => {
          if (xAxisData.includes(item.name)) {
            const childIdNameSorted = item.childIdNameCount.sort(
              (a, b) => b.count - a.count,
            );
            result[item.name] = childIdNameSorted.slice(0, 2);
          }
          return result;
        },
        {},
      );
      yAxisData = [[], []];
      xAxisData.forEach((name) => {
        yAxisData[0].push(
          childIdNames[name] && childIdNames[name][0]
            ? childIdNames[name][0].count.toString()
            : '',
        );
        yAxisData[1].push(
          childIdNames[name] && childIdNames[name][1]
            ? childIdNames[name][1].count.toString()
            : '',
        );
      });
      handlerXY();
    }
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
  { deep: true, immediate: true },
);

onMounted(() => {
  myChart = echarts.init(document.getElementById('HotStop'));
  drawLine();
});

onUnmounted(() => {
  myChart?.dispose();
});
</script>

<style></style>
