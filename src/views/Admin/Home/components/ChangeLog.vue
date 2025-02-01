<template>
  <div>
    <div
      class="flex items-center justify-between border-b border-[#EEEFF2] pb-[12px]"
    >
      <div class="text-[#131313] font-[600]">变更日志</div>
    </div>
    <div
      class="text-[#505050] mt-[12px] max-h-[348px] overflow-y-scroll scrollBar"
    >
      <template v-for="item in changeData" :key="item.time">
        <div class="flex overflow-hidden">
          <div
            class="time relative top-[-8px] w-[114px] pr-[12px] leading-[36px] h-[36px]"
          >
            {{ item.time }}
          </div>
          <div
            class="relative top-[-8px] w-[160px] pl-[12px] leading-[36px] h-[36px]"
          >
            <span class="text-[#44B044]">{{ item.user }}</span
            ><span>{{ item.operate }}</span
            ><span class="text-[#44B044]">{{ item.model }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  changeData: { time: string; user: string; operate: string; model: string }[];
}
withDefaults(defineProps<Props>(), {
  changeData: () => [
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
    {
      time: '5月23日 14 : 24',
      user: 'demo',
      operate: '移动了',
      model: '板块111',
    },
  ],
});
</script>

<style lang="scss" scoped>
.time::after {
  content: '';
  height: 200%;
  width: 2px;
  background-color: #e7f7ef;
  position: absolute;
  top: 0;
  right: -1px;
}
.time::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #e7f7ef;
  position: absolute;
  top: 50%;
  right: -3px;
  transform: translateY(-50%);
}
</style>
