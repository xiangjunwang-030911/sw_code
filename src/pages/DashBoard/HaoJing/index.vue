<template>
    <div class="main">
      <div class="time-wrapper">
        <span class="mr-3">{{ date }}</span>
        <span class="mr-3">{{ week }}</span>
        <span>{{ time }}</span>
      </div>
      <div class="date-select-wrapper">
        <div class="datepicker">
          <span class="mr-3 range text-[#5de5fd]">选择范围</span>
          <a class="date text-white mr-5" href="javascript:void(0)">
            {{ selectedDateStr }}
          </a>
        </div>
        <el-date-picker
          ref="datepicker"
          v-model="selectedDateTemp"
          confirm
          transfer
          :allowClear="false"
          type="daterange"
          :style="{ opacity: 0, cursor: 'pointer' }"
          @change="handleDatePickerChange"
        >
        </el-date-picker>
        <img
          class="w-[20px] cursor-pointer"
          src="/static/img/dashboard_fx_full.png"
          alt=""
          @click="handleFull"
        />
      </div>
      <div class="title flex justify-center">
        <img
          class="w-[320px] mt-4"
          src="/static/img/dashboard_fx_title.png"
          alt=""
        />
      </div>
      <div class="grid grid-cols-7 grid-rows-1 h-full w-full content px-3">
        <!-- left -->
        <div class="col-start-1 col-end-3 grid grid-rows-3 grid-cols-1 h-full">
          <div class="pb-3">
            <box-wrapper title="工单解决情况">
              <OrderSolutionInfo
                :dateInfo="dateInfo"
                :onResize="windowSize"
              ></OrderSolutionInfo>
            </box-wrapper>
          </div>
          <div class="pb-3">
            <box-wrapper title="工单分配情况">
              <OrderStatus :dateInfo="dateInfo" :onResize="windowSize" />
            </box-wrapper>
          </div>
           <div class="pb-3">
            <box-wrapper title="工程师处理工单数">
              <HotStop :dateInfo="dateInfo" :onResize="windowSize" />
            </box-wrapper>
          </div>
        </div>
        <!-- center -->
        <div class="col-start-3 col-end-6 grid grid-rows-5 grid-cols-1 h-full">
          <div class="row-start-1 row-end-2 pb-3 px-3 w-full">
            <div
              class="grid grid-rows-[minmax(0,50px)_1fr_minmax(0,20px)] gridrow"
            >
              <div class="row-start-2 flex">
                <div class="flex-1 flex flex-col items-center justify-end">
                  <p class="text-[18px] text-[#5de5fd] font-[Adobe_Heiti_Std]">
                    本年度工单数量
                  </p>
                  <CountTo
                    :startVal="0"
                    :endVal="countOfCrntYear"
                    :duration="800"
                    class="text-[48px] text-[#fff] font-[Impact]"
                  ></CountTo>
                </div>
                <div
                  class="flex-1 flex flex-col items-center justify-end relative order-count-middle"
                >
                  <p class="text-[18px] text-[#5de5fd] font-[Adobe_Heiti_Std]">
                    本月工单提交数量
                  </p>
                  <p class="text-[48px] text-[#fff] font-[Impact]">
                    <CountTo
                      :startVal="0"
                      :endVal="countOfCrntMonth"
                      :duration="800"
                      class="text-[48px] text-[#fff] font-[Impact]"
                    ></CountTo>
                  </p>
                </div>
                <div class="flex-1 flex flex-col items-center justify-end">
                  <p class="text-[18px] text-[#5de5fd] font-[Adobe_Heiti_Std]">
                    本周工单提交数量
                  </p>
                  <p class="text-[48px] text-[#fff] font-[Impact]">
                    <CountTo
                      :startVal="0"
                      :endVal="countOfCrntWeek"
                      :duration="800"
                      class="text-[48px] text-[#fff] font-[Impact]"
                    ></CountTo>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row-start-2 row-end-4 pb-3 px-3 flex">
            <div class="flex-1">
              <box-wrapper title="城市占比" :hideBg="true">
                <DepartRadar
                  :onResize="windowSize"
                  :dateInfo="dateInfo"
                ></DepartRadar>
              </box-wrapper>
            </div>
            <div class="flex-1">
              <box-wrapper title="工单处理结果" :hideBg="true">               
                <OrderSource
                  :onResize="windowSize"
                  :dateInfo="dateInfo"
                ></OrderSource>
              </box-wrapper>
            </div>
          </div>
          <div class="row-start-4 row-end-6 pb-3 px-3">
            <box-wrapper title="最近新增工单" :hideBg="true">
              <NewOrder
                class="overflow-hidden"
                :style="{ height: newOrderHeight }"
              ></NewOrder>
            </box-wrapper>
          </div>
        </div>
        <!-- right -->
        <div
          class="col-start-6 col-end-8 grid grid-rows-3 grid-cols-1 h-full"
          ref="rightBox"
        >
          <div class="pb-3">
            <box-wrapper title="工单时间分布">
              <OrderTimeDistribution
                :dateInfo="dateInfo"
                :onResize="windowSize"
              ></OrderTimeDistribution>
            </box-wrapper>
          </div>
          <div class="pb-3">
            <box-wrapper title="工单分类">
              <OrderClassification :dateInfo="dateInfo" :onResize="windowSize" />
            </box-wrapper>
          </div>
          <div class="pb-3">
            <box-wrapper title="系统公告">
              <div class="pl-4">
                <div
                  class="notice-wrapper opacity-80 text-white overflow-hidden relative"
                  :style="{ height: noticeHeight }"
                >
                  <div ref="notice" class="notice" v-html="systemNotice"></div>
                </div>
                <!-- <div class="opacity-50 text-white mt-2">
                  今天 2022/11/24 11:04:24
                </div> -->
              </div>
            </box-wrapper>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { TOKEN_KEY } from '@/enums/cacheEnum';
  export default {
    beforeRouteEnter(to, from, next) {
      if (localStorage.getItem(TOKEN_KEY)) {
        next();
      } else {
        next('/sp/login?redirect=' + to.path);
      }
    },
  };
  </script>
  <script setup>

  import moment from 'moment';
  import {
    getOrderSubmissionStatistics,
    getSystemNoticeData,
    login,
  } from '@/api/dashboard/fosun';
  
  import {
    computed,
    defineAsyncComponent,
    nextTick,
    onMounted,
    onUnmounted,
    ref,
  } from 'vue';
  import 'moment/dist/locale/zh-cn';
  import { useFullscreen } from '@vueuse/core';
  
  const BoxWrapper = defineAsyncComponent(() =>
    import('./components/BoxWrapper.vue'),
  );
  const OrderClassification = defineAsyncComponent(() =>
    import(
      '@/pages/DashBoard/HaoJing/components/OrderClassification.vue'
    ),
  );
  const OrderStatus = defineAsyncComponent(() =>
    import('@/pages/DashBoard/HaoJing/components/OrderStatus.vue'),
  );
  const OrderSolutionInfo = defineAsyncComponent(() =>
    import(
      '@/pages/DashBoard/HaoJing/components/OrderSolutionInfo.vue'
    ),
  );
  const OrderTimeDistribution = defineAsyncComponent(() =>
    import(
      '@/pages/DashBoard/FosunPharmaceutical/components/OrderTimeDistribution.vue'
    ),
  );
  const HotStop = defineAsyncComponent(() =>
    import('@/pages/DashBoard/HaoJing/components/HotStop.vue'),
  );
  const DepartRadar = defineAsyncComponent(() =>
    import('@/pages/DashBoard/HaoJing/components/DepartRadar.vue'),
  );
  const OrderSource = defineAsyncComponent(() =>
    import('@/pages/DashBoard/HaoJing/components/OrderSource.vue'),
  );
  const NewOrder = defineAsyncComponent(() =>
    import('@/pages/DashBoard/FosunPharmaceutical/components/NewOrder.vue'),
  );
  
  const { toggle } = useFullscreen();
  
  let timer = null;
  const countOfCrntYear = ref(0);
  const countOfCrntMonth = ref(0);
  const countOfCrntWeek = ref(0);
  const date = ref('');
  const week = ref('');
  const time = ref('');
  const noticeHeight = ref(null);
  const newOrderHeight = ref(null);
  const windowSize = ref([0, 0]);
  const isShowDatePicker = ref(false);
  const selectedDateTemp = ref([]);
  const selectedDateStr = ref('请选择');
  const systemNotice = ref('');
  
  const rightBox = ref(null);
  const notice = ref(null);
  const datepicker = ref(null);
  
  const selectedDate = computed(() => {
    const startTime = moment(selectedDateTemp.value[0]).format('YYYY-MM-DD');
    const endTime = moment(selectedDateTemp.value[1]).format('YYYY-MM-DD');
    return [startTime, endTime];
  });
  
  const dateInfo = computed(() => {
    const yearFrom = selectedDate.value[0].split('-')[0];
    const monthFrom =
      selectedDate.value[0].split('-')[1].slice(0, 1) == 0
        ? selectedDate.value[0].split('-')[1].slice(1)
        : selectedDate.value[0].split('-')[1];
    const yearTo = selectedDate.value[1].split('-')[0];
    const monthTo =
      selectedDate.value[1].split('-')[1].slice(0, 1) == 0
        ? selectedDate.value[1].split('-')[1].slice(1)
        : selectedDate.value[1].split('-')[1];
    return {
      yearFrom: Number(yearFrom),
      monthFrom: Number(monthFrom),      
      yearTo: Number(yearTo),
      monthTo: Number(monthTo),
      start: moment(selectedDate.value[0]).format(),
      end: moment(selectedDate.value[1]).format(),
    };
  });
  
  const handleDatePickerChange = () => {
    selectedDateStr.value = `${selectedDate.value[0]}    -    ${selectedDate.value[1]}`;
  };
  
  const getOrderStatistics = async () => {
    let date = selectedDate.value[1].split('-');
    const res = await getOrderSubmissionStatistics({
      projectId: 106,
      year: Number(date[0]),
      month: Number(date[1]),
      day: Number(date[2]),
    });
  
    countOfCrntYear.value = res.countOfCrntYear;
    countOfCrntMonth.value = res.countOfCrntMonth;
    countOfCrntWeek.value = res.countOfCrntWeek;
  };
  
  const getNotice = async () => {
    const res = await getSystemNoticeData({
      projectId: 106,
      strItemIDs: 101041,
    });
    const reg = new RegExp('\r\n', 'g');
    systemNotice.value = res[0].settingNote.replaceAll(reg, '<br/>');
  };
  
  const getNoticeHeight = () => {
    nextTick(() => {
      let height = rightBox.value?.clientHeight / 3 - 120;
      noticeHeight.value = height + 'px';
  
      //自动滚动
      const interval = setInterval(() => {
        const noticeElement = notice.value;
        if (noticeElement) {
          clearInterval(interval);
          // 根据公告内容高度判断是否需要滚动
          if (noticeElement.clientHeight > height) {
            noticeElement.style.animationDuration = `${
              noticeElement.scrollHeight / 10
            }s`; // 根据内容高度动态设置滚动时长
          } else {
            noticeElement.style.animation = 'none';
          }
        }
      }, 500);
    });
  };
  
  const getNewOrderHeight = () => {
    nextTick(() => {
      let height = (rightBox.value?.clientHeight / 5) * 2 - 100;
      newOrderHeight.value = height + 'px';
    });
  };
  
  const handleResize = () => {
    getNoticeHeight();
    getNewOrderHeight();
    windowSize.value = [window.innerWidth, window.innerHeight];
  };
  
  const getDefaultDate = () => {
    // 获取当前日期
    const currentDate = new Date();
    // 获取去年同一时刻的日期
    const lastYearDate = new Date();
    lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
    selectedDateTemp.value = [lastYearDate, currentDate];
    selectedDateStr.value = `${selectedDate.value[0]}    -    ${selectedDate.value[1]}`;
  };
  
  const handleFull = () => toggle();
  
  const getTime = () => {
    moment.locale('zh-cn');
    date.value = moment().format('LL');
    week.value = moment().format('dddd');
    time.value = moment().format('LTS');
  };
  
  const init = async () => {
    getDefaultDate();
  
    getTime();
    timer = setInterval(() => {
      getTime();
    }, 1000);
  
    getNoticeHeight();
    getNewOrderHeight();
  
    window.addEventListener('resize', handleResize);
  
    getNotice();
  
    getOrderStatistics();
  };
  
  onMounted(() => {
    init();
  });
  
  onUnmounted(() => {
    clearInterval(timer);
    window.removeEventListener('resize', handleResize);
  });
  </script>
  
  <style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    // z-index: -10;
    position: relative;
    background-color: #080b1c;
    background-image: url('/static/img/dashboard_fx_bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    .content {
      height: calc(100vh - 61.7px);
      padding-top: 25px;
    }
    .time-wrapper {
      position: absolute;
      left: 8px;
      top: 5px;
      font-size: 1rem;
      font-weight: bold;
      font-style: italic;
      color: #5de5fd;
    }
    .date-select-wrapper {
      .datepicker {
        position: absolute;
        right: 28px;
        top: 5px;
      }
      .range,
      .date {
        font-size: 1rem;
        font-weight: bold;
        font-style: italic;
      }
      position: absolute;
      right: 8px;
      top: 5px;
      display: flex;
      align-items: center;
    }
    .notice {
      position: absolute;
      top: 0;
      left: 0;
      animation: scroll linear infinite;
    }
    @keyframes scroll {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-70%);
      }
    }
  }
  
  .order-count-middle::before,
  .order-count-middle::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background: linear-gradient(
      rgba(255, 255, 255, 0),
      #57d5f2,
      rgba(255, 255, 255, 0)
    );
    top: 0;
    left: 0;
  }
  .order-count-middle::after {
    left: 100%;
  }
  :deep(.ivu-btn-primary) {
    background-color: #2d8cf0 !important;
  }
  </style>
  