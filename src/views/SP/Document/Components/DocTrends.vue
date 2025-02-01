<template>
  <DocWrapper title="文档动态" @moreInfo="moreInfo">
    <template #content>
      <div class="w-full h-full flex flex-col">
        <div
          class="flex-1 flex items-center text-[12px]"
          v-for="(item, idx) in docTrendList"
          :key="item.date + idx"
        >
          <p>{{ item.date }}</p>
          <span :class="`default ${item.status}`"></span>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </template>
  </DocWrapper>
</template>

<script setup lang="ts">
import { reactive, defineAsyncComponent } from 'vue';
const DocWrapper = defineAsyncComponent(() => import('./DocWrapper.vue'));

interface DocTrendItem {
  date: string;
  status: string;
  desc: string;
}
const docTrendList: DocTrendItem[] = reactive([
  {
    date: '4月21日 11:00',
    status: 'warning',
    desc: '开发 上传 文档 2011年公司计划',
  },
  {
    date: '4月21日 11:00',
    status: '',
    desc: '开发 上传 文档 2011年公司计划',
  },
  {
    date: '4月21日 11:00',
    status: '',
    desc: '开发 上传 文档 2011年公司计划',
  },
  {
    date: '4月21日 11:00',
    status: '',
    desc: '开发 上传 文档 2011年公司计划',
  },
]);
const moreInfo = () => {
  console.log('文档动态 更多');
};
</script>

<style lang="scss" scoped>
.default {
  width: 8px;
  height: 8px;
  margin: 0 8px 0 16px;
  border-radius: 50%;
  background-color: #4daeff;
}

.warning {
  background-color: #ff864d;
}
</style>
