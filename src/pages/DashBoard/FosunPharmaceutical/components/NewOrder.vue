<template>
  <div class="w-full h-full flex flex-col order-list-wrapper" ref="listWrapper">
    <div
      v-for="(item, index) in displayedOrderList"
      :key="index"
      ref="orderListItem"
      class="item flex justify-start items-center relative"
      :style="{
        animationDuration: `${orderList.length * 1}s`,
        animationDelay: `-${index * 1}s`,
      }"
    >
      <img
        :src="
          'static/img/dashboard_fx_' +
          (item.index == 0 ? 'red' : 'blue') +
          '.png'
        "
        alt=""
      />
      <span class="absolute left-[25px] font-['Impact'] text-white text-xs">{{
        item.index ? item.index + 1 : 1
      }}</span>
      <p class="wrap flex-1 opacity-70 text-white" :title="item.title">
        {{ item.title }}
      </p>
      <p class="opacity-50 text-white">
        {{ item.dateCreated }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLatestBugReport } from '@/api/dashboard/fosun';
import { LatestBugReportResult } from '@/api/dashboard/fosun/fosunModel';
import moment from 'moment';
import { cloneDeep } from 'lodash-es';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';

const orderList = ref<LatestBugReportResult[]>([]);
const displayedOrderList = ref<LatestBugReportResult[]>([]);
const count = ref(0);

const listWrapper = ref<HTMLElement | null>(null);
const orderListItem = ref<HTMLElement[] | null>(null);
let interval: number | null = null;
let newOrderInterval: number | null = null;

const getList = async () => {
  const res = await getLatestBugReport({
    projectId: 106,
    count: 10,
  });
  res.forEach((item, index) => {
    item.index = index;
    item.dateCreated = '[' + moment().format('LL') + ']';
  });
  orderList.value = res;
};

const initPosition = () => {
  count.value = 0;
  //加延迟防止最后一个过渡被取消
  setTimeout(() => {
    if (orderListItem.value) {
      for (let i = 0; i < orderListItem.value.length; i++) {
        const element = orderListItem.value[i];
        element.style.transition = 'none'; //回到初始位置不需要过渡
        element.style.transform = `translateY(0px)`;
      }
    }
  }, 500);
};

const scrollOrderList = () => {
  if (listWrapper.value) {
    if (listWrapper.value.clientHeight >= orderList.value.length * 60) {
      //无需滚动
      displayedOrderList.value = [...orderList.value];
      return;
    }
  }
  displayedOrderList.value = [...orderList.value, ...orderList.value]; //实现循环效果
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    count.value++;
    if (orderListItem.value) {
      for (let i = 0; i < orderListItem.value.length; i++) {
        const element = orderListItem.value[i];
        element.style.transition = `transform 0.5s ease`;
        element.style.transform = `translateY(-${count.value * 60}px)`;
      }
    }
    if (count.value == orderList.value.length) {
      initPosition();
    }
  }, 2000);
};

const speakWithPauses = (utterances: string[], pauseDuration: number) => {
  let index = 0;

  function speakNextUtterance() {
    if (index < utterances.length) {
      const message = new SpeechSynthesisUtterance();
      const beginMessage =
        index == 0
          ? `您有${utterances.length}条新增工单${
              utterances.length ? '分别' : ''
            }是：`
          : '';
      message.text = beginMessage + utterances[index];
      message.voice = speechSynthesis.getVoices()[0];
      speechSynthesis.speak(message);

      message.onend = function () {
        index++;
        setTimeout(speakNextUtterance, pauseDuration);
      };
    }
  }

  speakNextUtterance();
};

const handleNewOrder = (messageList: string[]) => {
  //语音播报必须用户点击一次后才可以
  speakWithPauses(messageList, 500);

  orderList.value = orderList.value.map((item, index) => ({
    ...item,
    index,
  }));
  initPosition();
  scrollOrderList();
};

const checkNewOrder = () => {
  newOrderInterval = setTimeout(async () => {
    const orderListClone = cloneDeep(orderList.value);
    const idList = orderListClone.map((item) => item.bugId);
    await getList();
    let newOrderList: string[] = [];
    orderList.value.map((item) => {
      if (!idList.includes(item.bugId)) {
        newOrderList.push(item.title);
      }
    });
    newOrderList.length && handleNewOrder(newOrderList);
  }, 60 * 1000);
};

onMounted(() => {
  nextTick(async () => {
    await getList();
    scrollOrderList();
    checkNewOrder();
  });
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
  if (newOrderInterval) {
    clearInterval(newOrderInterval);
  }
});
</script>

<style lang="scss" scoped>
.wrap {
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; // 数字代表文字需要显示几行
}
</style>
