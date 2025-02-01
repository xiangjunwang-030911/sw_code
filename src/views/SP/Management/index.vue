<template>
  <div class="bg-default h-full w-full pl-10 pr-10">
    <div
      class="header-wrapper pt-3 pb-3 flex items-center border-b-[1px] border-normal"
    >
      <div class="tabs-wrapper flex items-center" @click="handleTab">
        <div
          class="w-24 p-2 rounded-md text-center cursor-pointer mr-2"
          :class="`${currentTab == 0 ? 'bg-primary text-theme' : ''}`"
          data-id="0"
        >
          事件列表
        </div>
        <div
          class="w-24 p-2 rounded-md text-center cursor-pointer mr-2"
          :class="`${currentTab == 1 ? 'bg-primary text-theme' : ''}`"
          data-id="1"
        >
          子事件列表
        </div>
        <div
          class="w-24 p-2 rounded-md text-center cursor-pointer mr-2"
          :class="`${currentTab == 2 ? 'bg-primary text-theme' : ''}`"
          data-id="2"
        >
          员工列表
        </div>
        <div
          class="w-24 p-2 rounded-md text-center cursor-pointer mr-2"
          :class="`${currentTab == 3 ? 'bg-primary text-theme' : ''}`"
          data-id="3"
        >
          报表
        </div>
      </div>
      <div
        class="new-wrapper w-24 p-2 rounded-md text-center cursor-pointer ml-4 bg-[#44b044] text-white font-medium flex items-center justify-center"
      >
        <IEpPlus class="mr-1" size="14" color="#fff"></IEpPlus>
        新建
      </div>
    </div>
    <search-filter class="mt-5"></search-filter>
    <div class="mt-6 flex wrapper">
      <MenuTree
        class="pt-2 pr-2 h-full"
        @onResize="onResize"
        ref="tree"
      ></MenuTree>
      <ListView class="pl-3" :style="{ width: listWidth }"></ListView>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineAsyncComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
} from 'vue';

import { useEventListener } from '@/hooks/events/useEventListener';
const MenuTree = defineAsyncComponent(
  () => import('@/components/MenuTree.vue'),
);
const ListView = defineAsyncComponent(() => import('./ListView/index.vue'));

const currentTab = ref(0);
const listWidth = ref('');

const tree = ref<InstanceType<typeof MenuTree> | null>(null);

const handleTab = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.dataset?.id) {
    currentTab.value = Number(target.dataset.id);
  }
};

const instance = getCurrentInstance();

const onResize = () => {
  nextTick(() => {
    if (instance && instance.proxy && tree.value) {
      listWidth.value =
        instance.proxy.$el.clientWidth -
        tree.value.$el.clientWidth -
        100 +
        'px';
    }
  });
};

const setListWidth = () => {
  let interval: number | null = setInterval(() => {
    if (tree.value) {
      if (interval) clearInterval(interval);
      interval = null;
      onResize();
    }
  }, 200);
};

onMounted(() => {
  setListWidth();
  useEventListener({
    name: 'resize',
    listener: onResize,
  });
});
</script>

<style lang="scss" scoped>
.line {
  &::after {
    display: block;
    content: '';
    width: 1px;
    border: 0.5px solid #eeeff2;
    height: 20px;
  }
}
.wrapper {
  height: calc(100vh - 220px);
}
</style>
