<template>
  <div class="h-full">
    <header class="flex justify-between items-center pb-5">
      <p class="font-medium">所有报表视图</p>
      <div class="flex flex-row justify-between items-center">
        <SearchBox
          placeholder="输入关键字"
          :searchIcon="true"
          searchBtn="search_icon"
          @search="searchForm"
        ></SearchBox>
        <el-button
          class="ml-[24px]"
          type="primary"
          @click="addForm(addFormTypes)"
          >添加</el-button
        >
      </div>
    </header>
    <div class="form-container overflow-hidden overflow-y-scroll scrollBar">
      <div class="grid grid-cols-4 grid-rows-5">
        <template v-for="(item, idx) in repotrForms" :key="item.key">
          <div class="flex flex-col" @click="selectForm(idx)">
            <div
              class="relative max-w-[240px] mx-[auto] overflow-hidden cursor-pointer rounded-lg shadow-[0_0_6px_-2px_rgba(0,0,0,0.3)]"
            >
              <svg-icon
                v-show="item.selected"
                iconClass="selected"
                size="24"
                class="cursor-pointer absolute z-10 right-1 top-1"
              >
              </svg-icon>
              <svg-icon
                v-show="!item.selected"
                iconClass="unselected"
                size="24"
                class="cursor-pointer absolute z-10 right-1 top-1"
              >
              </svg-icon>
              <img class="hover:scale-110" :src="item.src" alt="" />
            </div>
            <span class="h-[52px] leading-[52px] mb-[24px] text-center">{{
              item.name
            }}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="flex justify-center items-center mt-4">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[25, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import tableImage from '@/assets/images/sp_event_forms/table.png';
import pieSpecialImage from '@/assets/images/sp_event_forms/pieSpecial.png';
import stackedBarChartImage from '@/assets/images/sp_event_forms/stackedBarChart.png';
import barChartImage from '@/assets/images/sp_event_forms/barChart.png';
import basicScatterImage from '@/assets/images/sp_event_forms/basicScatter.png';
import smoothLineImage from '@/assets/images/sp_event_forms/smoothLine.png';
import basicRadarImage from '@/assets/images/sp_event_forms/basicRadar.png';
import clusteringProcessImage from '@/assets/images/sp_event_forms/clusteringProcess.png';
import stackedAreaImage from '@/assets/images/sp_event_forms/stackedArea.png';
import doughnutImage from '@/assets/images/sp_event_forms/doughnut.png';
import multibarChartImage from '@/assets/images/sp_event_forms/multibarChart.png';
import funnelImage from '@/assets/images/sp_event_forms/funnel.png';
import customGaugeImage from '@/assets/images/sp_event_forms/customGauge.png';

const addFormTypes = reactive([1, 2, 3, 4]);

interface ReportDataItem {
  src: string;
  name: string;
  type: string;
  key: string;
  selected: boolean;
}
const repotrForms: ReportDataItem[] = reactive([
  {
    src: tableImage,
    name: '事件列表',
    type: 'table',
    key: '0001',
    selected: true,
  },
  {
    src: pieSpecialImage,
    name: '事件状态分布',
    type: 'pieSpecial',
    key: '0002',
    selected: false,
  },
  {
    src: stackedBarChartImage,
    name: '事件表格报表',
    type: 'stackedBarChart',
    key: '0003',
    selected: false,
  },
  {
    src: barChartImage,
    name: '事件原因分布',
    type: 'barChart',
    key: '0004',
    selected: false,
  },
  {
    src: basicScatterImage,
    name: '事件流动',
    type: 'basicScatter',
    key: '0005',
    selected: false,
  },
  {
    src: smoothLineImage,
    name: '事件趋势',
    type: 'smoothLine',
    key: '0006',
    selected: false,
  },
  {
    src: basicRadarImage,
    name: '事件重复分析',
    type: 'basicRadar',
    key: '0007',
    selected: false,
  },
  {
    src: clusteringProcessImage,
    name: '事件来源分析',
    type: 'clusteringProcess',
    key: '0008',
    selected: false,
  },
  {
    src: stackedAreaImage,
    name: '事件平均时间',
    type: 'stackedArea',
    key: '0009',
    selected: false,
  },
  {
    src: doughnutImage,
    name: '工程师工作量分布',
    type: 'doughnut',
    key: '0010',
    selected: false,
  },
  {
    src: multibarChartImage,
    name: '时间VS日期',
    type: 'multibarChart',
    key: '0011',
    selected: false,
  },
  {
    src: funnelImage,
    name: '事件状态漏斗',
    type: 'funnel',
    key: '0012',
    selected: false,
  },
  {
    src: customGaugeImage,
    name: '员工工时统计',
    type: 'customGauge',
    key: '0013',
    selected: false,
  },
]);

const currentPage = ref(1);
const pageSize = ref(25);

const searchForm = (key: string) => {
  console.log(key);
};
const addForm = (forms: number[]) => {
  console.log(forms);
};
const selectForm = (idx: number) => {
  if (repotrForms[idx].selected) {
    console.log('取消选择');
  }
  if (!repotrForms[idx].selected) {
    console.log('加入选择');
  }
  repotrForms[idx].selected = !repotrForms[idx].selected;
};
</script>

<style lang="scss" scoped>
.form-container {
  height: calc(100% - 52px - 20px);
}
</style>
