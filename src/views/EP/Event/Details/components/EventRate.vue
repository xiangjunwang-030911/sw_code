<template>
  <ReCard :show-border="false">
    <template #title> 满意度评价 </template>
    <div class="flex px-[20px] pt-[22px] pb-[30px]">
      <EventRateItem
        v-for="(item, index) in rateList"
        :key="index"
        :icon-name="item.iconName"
        :rate-text="item.rateText"
        :is-select="item.isSelect"
        :item-index="index"
        @item-click="onItemClick"
      />
      <div class="flex-1 ml-[28px]">
        <el-input
          v-model="inputValue"
          :rows="4"
          type="textarea"
          placeholder="Input your evaluation comments"
        />
      </div>
    </div>
  </ReCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const EventRateItem = defineAsyncComponent(() => import('./EventRateItem.vue'));

const inputValue = ref('');

interface RateItem {
  iconName: string;
  rateText: string;
  isSelect: boolean;
}

const rateList: RateItem[] = reactive([
  {
    iconName: 'ep-event-rate_very_good',
    rateText: '非常满意',
    isSelect: false,
  },
  {
    iconName: 'ep-event-rate_good',
    rateText: '满意',
    isSelect: true,
  },
  {
    iconName: 'ep-event-rate_ordinary',
    rateText: '一般满意',
    isSelect: false,
  },
  {
    iconName: 'ep-event-rate_dissatisfy',
    rateText: '不满意',
    isSelect: false,
  },
  {
    iconName: 'ep-event-rate_very_bad',
    rateText: '非常糟糕',
    isSelect: false,
  },
]);

const onItemClick = (selectIndex: number) => {
  rateList.map((item, itemIndex) => {
    if (itemIndex === selectIndex) {
      item.isSelect = true;
    } else {
      item.isSelect = false;
    }
    return item;
  });
};
</script>

<style scoped lang="scss"></style>
