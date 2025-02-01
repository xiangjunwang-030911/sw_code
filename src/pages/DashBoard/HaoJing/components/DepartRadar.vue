<template>
   <div id="departRadar" :style="{width:width,height:height}"></div>
</template>
<script setup lang="ts">
  import * as echarts from 'echarts/core';
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  } from 'echarts/components';
  import { RadarChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  import { getCityCountGroupByCustomerField } from '@/api/dashboard/haojing';
  import { PieChart } from 'echarts/charts';
  import { LabelLayout } from 'echarts/features';
  import type {
      CallbackDataParams,
      EChartsOption,
  } from 'echarts/types/dist/shared';

  import { watch } from 'vue';

  echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    RadarChart,
    PieChart,
    LabelLayout,
    CanvasRenderer,
  ])

  interface Props {
    width?: string;
    height?: string;
    radius?: string | number;
    onResize: number[];
    dateInfo: DataInfo;
  }

  interface DataInfo {
      yearFrom?:number;
      monthFrom?:number;
      yearTo?:number;
      monthTo?:number;
      start?:string;
      end?:string;
  }

  const props=withDefaults(defineProps<Props>(),{
      witdh:'100%',
      height:'100%',
      radius:'50%',
      onresize:()=>[0,0],
      dateInfo:()=>({}),
  })

  let indicator=[];
  let value=[];
  let myChart:echarts.EChartsType|null=null;

  let option: EChartsOption = {
    color: ['rgba(49, 98, 250, 1)'],
    legend: {
      show: false,
    },
    tooltip: {
      trigger: 'item',
    },
    radar: {
      indicator: [
        { name: '北京泰克赛尔', max: 100 },
        { name: '官网', max: 100 },
        { name: '官网', max: 100 },
        { name: '苏州云可达', max: 100 },
        { name: '官网', max: 100 }, 
        { name: '官网', max: 100 },             
      ],
      center: ['50%', '50%'],
      radius: props.radius,
      splitLine: {
        lineStyle: {
          color: [
            'RGBA(15, 75, 168, 1)',
            'RGBA(15, 75, 168, .8)',
            'RGBA(15, 75, 168, .6)',
            'RGBA(15, 75, 168, .4)',
            'RGBA(15, 75, 168, .2)',
            'RGBA(15, 75, 168, .1)',
          ].reverse(),
        },
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(7,24,100, .6)'],
        },
      },
      axisLine: {
        lineStyle: {
          color: 'RGBA(15, 75, 168, 1)',
        },
      },
      axisName: {
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0)',
        padding: [-8, -8],
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [95, 65, 75, 80, 45, 90],
            name: '部门占比',
            lineStyle: {
              width: 0,
            },
            areaStyle: {
              color: 'RGBA(10, 44, 127, 1)',
            },
            label: {
              show: true,
              formatter: function (params: CallbackDataParams) {
                return params.value as string;
              },
              color: '#fff',
            },
          },
        ],
      },
    ],
  };
  
  let option2: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      left: 'center',
      itemWidth: 15,
      itemHeight: 15,
      textStyle: {
        color: '#fff',
      },
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          color: '#fff',
          formatter(param: CallbackDataParams) {
            return param.name + '(' + param.value + ')';
          },
        },
      },
    ],
  };

  const init = async ({ start, end }: { start: string; end: string }) => {
    const res = await getCityCountGroupByCustomerField({
      projectId: 106,
      fieldId: 112,
      dtTo: new Date(new Date(end).getTime() + 8 * 60 * 60 * 1000).toISOString(),
      dtFrom: new Date(
        new Date(start).getTime() + 8 * 60 * 60 * 1000,
      ).toISOString(),
    });
    if (res.length === 0) return;
  
    if (res.length < 3) {
      option2.series = [
        {
          data: res.map((item) => {
            return {
              value: item.count,
              name: item.name,
            };
          }),
        },
      ];
      setOption2();
      return;
    }
    indicator = res.map((item) => ({ name: item.name,max:item.count+5}));
    value = res.map((item) => item.count);

    if (option.radar) { 
      option.radar = {
        indicator,
      };
    }
    option.series = [
      {
        data: [
          {
            value,
            name: '部门占比',
            lineStyle: {
              width: 0,
            },
            areaStyle: {
              color: 'RGBA(10, 44, 127, 1)',
            },
            label: {
              show: false,
              formatter: function (params: CallbackDataParams) {
                return params.value as string;
              },
              color: '#fff',
            },
          },
        ],
      },
    ];
    setOption();
  };
  
  const setOption = () => {
    myChart?.setOption(option);
  };
  const setOption2 = () => {
    myChart?.setOption(option2);
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
        init({ start, end });
      }
    },
    { immediate: true },
  );


  onMounted(() => {
    myChart = echarts.init(document.getElementById('departRadar'));
    setOption();
  });
  
  onUnmounted(() => {
    myChart?.dispose();
  });


</script>

<style></style>