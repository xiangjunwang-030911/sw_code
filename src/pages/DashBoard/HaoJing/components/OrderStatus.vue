<template>
    <div id="OrderStatus" :style="{ width: width, height: height }"></div>
  </template>
  
  <script setup lang="ts">
  import * as echarts from 'echarts/core';
  import {
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent,
  } from 'echarts/components';
  import { BarChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  import type { EChartsOption } from 'echarts/types/dist/shared';
  import type { BarSeriesOption } from 'echarts/charts';
  import { get2IdNameCountGroupBy2Field as get2IdNameCountGroupBy2FieldApi } from '@/api/dashboard/fosun';
  import { onMounted, onUnmounted, watch } from 'vue';
  
  echarts.use([
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent,
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
  
  let xAxisData = [
    'SAP关键用户',
    'IT工程师组',
    '现场工程师组',
    'SAP关键用户',
    'IT工程师组',
    '现场工程师组',
  ];
  
  let yAxisData = [
    ['已解决工单', 320, 302, 301, 334, 390, 330, 320],
    ['未解决工单', 120, 132, 101, 134, 90, 230, 210],
  ];
  
  const itemStyleList = ['#2FD8FF', '#F8635D', '#FFD946', '#3061F6', '#61F5A9'];
  
  let myChart: echarts.EChartsType | null = null;
  
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      itemWidth: 15,
      itemHeight: 15,
      right: 0,
      icon: 'roundRect',
      textStyle: {
        color: '#00',
        // fontSize: "20",
      },
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
          // textStyle: {
          color: '#FFFFFF',
          // },
          // fontSize: "24",
          fontFamily: 'MicrosoftYaHei',
          rotate: -15,
          opacity: 0.7,
          margin: 20,
          interval: 0,
          align: 'center',
        },
        // interval: 0,
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        data: xAxisData,
      },
    ],
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        // textStyle: {
        color: '#FFFFFF',
        // },
        // fontSize: "26",
        fontFamily: 'MicrosoftYaHei',
        opacity: 0.7,
        // interval: 0,
        margin: 18,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: { color: '#2FD8FF', opacity: 0.2, type: 'dashed' },
      },
    },
    series: [],
  };
  
  const drawLine = () => {
    myChart?.setOption(option);
  };
  const handlerXY = () => {
    if (option.series) {
      option.series = [];
      let serieObjList: BarSeriesOption[] = [];
      yAxisData.forEach((item, index) => {
        if (index == 0) {
          serieObjList.push({
            name: item[0],
            type: 'bar',
            stack: 'total',
            itemStyle: {
              color: itemStyleList[index],
              borderRadius: [0, 0, 4, 4],
            },
            emphasis: {
              focus: 'series',
            },
            barWidth: '22%',
            data: item.slice(1),
          });
        } else if (index == yAxisData.length - 1) {
          serieObjList.push({
            name: item[0],
            type: 'bar',
            stack: 'total',
            itemStyle: {
              color: itemStyleList[index],
              borderRadius: [4, 4, 0, 0],
            },
            emphasis: {
              focus: 'series',
            },
            barWidth: '22%',
            data: item.slice(1),
          });
        } else {
          serieObjList.push({
            name: item[0],
            type: 'bar',
            stack: 'total',
            itemStyle: {
              color: itemStyleList[index],
            },
  
            emphasis: {
              focus: 'series',
            },
            barWidth: '22%',
            data: item.slice(1),
          });
        }
      });
      option.xAxis = [
        {
          data: xAxisData,
        },
      ];
      option.series = serieObjList;
      setTimeout(() => {
        drawLine();
      }, 50);
    }
  };
  
  const get2IdNameCountGroupBy2Field = async (dtFrom: string, dtTo: string) => {
    await get2IdNameCountGroupBy2FieldApi({
      projectId: 106,
      fieldId: 491,
      fieldId2: 601,
      dtFrom,
      dtTo,
    }).then((res) => {
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
        let finishState=[260,261,291,263];
        const categoriesCount = res.reduce(
          (
            result: { re: Record<string, number>; red: Record<string, number> },
            item,
          ) => {
            if (xAxisData.includes(item.name)) {
              item.childIdNameCount.forEach((childItem) => {
                if (finishState.indexOf(childItem.id)>-1) {
                  result.red[item.name] =
                    (result.red[item.name] || 0) + childItem.count;
                } else {
                  result.re[item.name] =
                    (result.re[item.name] || 0) + childItem.count;
                }
              });
            }
            return result;
          },
          { re: {}, red: {} },
        );
  
        yAxisData = [
          [
            '已解决工单',
            ...xAxisData.map((name) => categoriesCount.red[name] || 0),
          ],
          [
            '未解决工单',
            ...xAxisData.map((name) => categoriesCount.re[name] || 0),
          ],
        ];
  
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
    myChart = echarts.init(document.getElementById('OrderStatus'));
    drawLine();
  });
  onUnmounted(() => {
    myChart?.dispose();
  });
  </script>
  
  <style></style>
  