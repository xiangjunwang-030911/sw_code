<template>
  <div class="bg-default h-full w-full pl-10 pr-10">
    <div
      class="header-wrapper pt-3 pb-3 flex items-center border-b-[1px] border-normal enter-x"
    >
      <div class="tabs-wrapper flex items-center" @click="handleTab">
        <div
          class="w-24 p-2 rounded-md text-center cursor-pointer mr-2"
          :class="`${
            currentTab == 0 ? 'bg-primary text-theme tabs-active' : ''
          }`"
          data-id="0"
        >
          事件列表
        </div>
        <div
          class="w-24 p-2 rounded-md text-center cursor-pointer mr-2"
          :class="`${
            currentTab == 1 ? 'bg-primary text-theme tabs-active' : ''
          }`"
          data-id="1"
        >
          子事件列表
        </div>
        <div
          class="w-24 p-2 rounded-md text-center cursor-pointer mr-2"
          :class="`${
            currentTab == 2 ? 'bg-primary text-theme tabs-active' : ''
          }`"
          data-id="2"
        >
          员工列表
        </div>
        <div
          class="w-24 p-2 rounded-md text-center cursor-pointer mr-2"
          :class="`${
            currentTab == 3 ? 'bg-primary text-theme tabs-active' : ''
          }`"
          data-id="3"
        >
          报表
        </div>
      </div>
      <el-dropdown
        @command="handleNew"
        trigger="click"
        style="margin-left: 20px"
        transfer
      >
        <div
          class="new-wrapper w-24 p-2 rounded-md text-center cursor-pointer ml-4 bg-[#44b044] text-white font-medium flex items-center justify-center"
        >
          <IEpPlus class="mr-1" size="14" color="#fff"></IEpPlus>

          新建
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>1.新建桌面事件</el-dropdown-item>
            <el-dropdown-item>2.新建应用事件</el-dropdown-item>
            <el-dropdown-item>3.新建SAP事件</el-dropdown-item>
            <el-dropdown-item>4.VPN权限申请</el-dropdown-item>
            <el-dropdown-item>5.1DMS内部账号创建(公司体系内)</el-dropdown-item>
            <el-dropdown-item>5.2DMS外部账号创建(公司体系外)</el-dropdown-item>
            <el-dropdown-item>5.3DMS账号提前停用(仅外部账号)</el-dropdown-item>
            <el-dropdown-item>5.4DMS账号延长期限(仅外部账号)</el-dropdown-item>
            <el-dropdown-item>5.5DMS一级文件夹管理员权限申请</el-dropdown-item>
            <el-dropdown-item>6.基础架构问题</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="mt-5 contain-wrapper enter-x">
      <transition name="fade-transform" mode="out-in">
        <component :is="currentComponent" :key="currentTab"></component>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

const EventList = defineAsyncComponent(() => import('./EventList/index.vue'));
const EmployeeList = defineAsyncComponent(
  () => import('./EmployeeList/index.vue'),
);
const ReportForms = defineAsyncComponent(
  () => import('./ReportForms/index.vue'),
);

const router = useRouter();

const currentTab = ref<number>(0);

const handleTab = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.dataset?.id) {
    currentTab.value = Number(target.dataset.id);
  }
};

const handleNew = () => {
  router.push({ name: 'SP-Event-Add' });
};

const currentComponent = computed(() => {
  switch (currentTab.value) {
    case 0:
      return EventList;
    case 1:
      return EventList;
    case 2:
      return EmployeeList;
    case 3:
      return ReportForms;
    default:
      return EventList;
  }
});
</script>

<style lang="scss" scoped>
.contain-wrapper {
  height: calc(100% - 64px - 70px);
}
.line {
  &::after {
    display: block;
    content: '';
    width: 1px;
    border: 0.5px solid #eeeff2;
    height: 20px;
  }
}
.tabs-active {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    bottom: -1px;
    left: 0;
    height: 2px;
    background-color: #289e22;
    animation: tabsActive 0.2s linear;
  }
}
@keyframes tabsActive {
  0% {
    width: 1%;
  }
  100% {
    width: 100%;
  }
}
</style>
