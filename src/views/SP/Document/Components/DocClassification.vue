<template>
  <DocWrapper title="文档分类" @moreInfo="moreInfo">
    <template #content>
      <div class="w-full h-full flex flex-col">
        <div
          class="flex-1 flex items-center text-[12px]"
          v-for="(item, idx) in classfificationList"
          :key="item.icon + idx"
        >
          <svg-icon :iconClass="item.icon" size="24"></svg-icon>
          <p class="pl-2 pr-4">{{ item.title }}</p>
          <p class="text-[#7a869a]">{{ item.count }}</p>
        </div>
      </div>
    </template>
  </DocWrapper>
</template>

<script setup lang="ts">
import { reactive, defineAsyncComponent } from 'vue';
const DocWrapper = defineAsyncComponent(() => import('./DocWrapper.vue'));

interface ClassificationItem {
  icon: string;
  title: string;
  count: number;
}
const classfificationList: ClassificationItem[] = reactive([
  {
    icon: 'doc_icon',
    title: '文档',
    count: 10221,
  },
  {
    icon: 'img_icon',
    title: '图片',
    count: 234,
  },
  {
    icon: 'vedio_icon',
    title: '视频',
    count: 2463,
  },
  {
    icon: 'music_icon',
    title: '音频',
    count: 264,
  },
  {
    icon: 'zip_icon',
    title: '压缩文件',
    count: 24,
  },
  {
    icon: 'other_icon',
    title: '其他',
    count: 67,
  },
]);
const moreInfo = () => {
  console.log('文档分类 更多');
};
</script>

<style></style>
