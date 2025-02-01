<template>
  <div class="bg-default h-full w-full pl-10 pr-10">
    <div class="pt-3 pb-3 flex items-center border-b-[1px] border-normal enter-x">
      <div
        class="flex item-center"
        @click="handleTab"
      >
        <div
          class="w-24 p-2 rounded-md mr-2 text-center cursor-pointer"
          :class="`${currentTab==0?'bg-primary text-theme tabs-active':''}`"
          data-id="0"
        >事件列表</div>
        <div
          class="w-24 p-2 rounded-md text-center cursor-pointer"
          :class="`${currentTab==1?'bg-primary text-theme tabs-active':''}`"
          data-id="1"
        >子事件列表</div>
        <div
          class="w-24 p-2 rounded-md text-center cursor-pointer"
          :class="`${currentTab==2?'bg-promary text-theme tabs-active':''}`"
          data-id="2"
        >员工列表</div>
        <div
          class="w-24 p-2 rounded-md text-center cursor-pointer"
          :class="`${currentTab==3?'bg-primary text-theme tabs-active':''}`"
          data-id="3"
        >报表</div>
      </div>

      <el-dropdown  
        @command="handleNew"  
        trigger="click"
        style="margin-left:20px"
        transfer
        >
        <div class="new-wrapper w-24 p-2 rounded-md text-center cursor-pointer ml-4 bg-[#44b044] text-white font-medium flex items-center justify-center">          
          新建</div>
        <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>1.新建桌面事件</el-dropdown-item>
              <el-dropdown-item>2.新建应用事件</el-dropdown-item>
             <el-dropdown-item>3.新建SAP事件</el-dropdown-item>
             <el-dropdown-item>4.VPN权限申请</el-dropdown-item>
             <el-dropdown-item>5.新建SAP事件</el-dropdown-item>
             <el-dropdown-item>6.基础架构问题</el-dropdown-item>
            </el-dropdown-menu>
        </template>
      </el-dropdown>
  
    </div>

    <div class="mt-5 contain-wrapper enter-x">
      <!-- <transition
        name="fade-transform"
        mode="out-in"
      >
        <component
          :is="currentComponent"
          :key="currentTab"
        ></component>
      </transition> -->

      <component
          :is="currentComponent"
          :key="currentTab"
        ></component>

    </div>
  </div>
</template>
<script setup lang="ts">
import {computed,defineAsyncComponent,ref} from 'vue';
import { useRouter } from 'vue-router';

const EventList = defineAsyncComponent(() => import('./EventList/index.vue'));


const currentTab = ref<number>(0);

const router = useRouter();


const handleNew=()=>{
   router.push({name:'SP-State-Add'});
}


// const handleNew=()=>{
//    router.push({name:'SP-Event-Add'});
// }



const handleTab = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.dataset?.id) currentTab.value = Number(target.dataset.id);
};

const currentComponent = computed(() => {
  switch (currentTab.value) {
    case 0:
      return EventList;
    case 1:
      return EventList;
    case 2:
      return EventList;
    case 3:
      return EventList;
    default:
      return EventList;
  }
});
</script>

<style lang="scss" scoped>
.tabs-active {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    bottom: -1px;
    background-color: #289e22;
    animation: tabs-active 0.2s linear;
  }
}

@keyframes tabs-active {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
