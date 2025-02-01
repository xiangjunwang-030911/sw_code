<template>
  <DocWrapper title="我收藏的文档" :more="false">
    <template #btn>
      <div>
        <el-button type="primary" @click="intoFavorites">进入收藏夹</el-button>
      </div>
    </template>
    <template #content>
      <div
        class="w-full h-full pt-[18px] pb-[30px] grid grid-cols-2 grid-rows-2 gap-x-[18px] gap-y-[16px]"
      >
        <div
          class="fav-item border border-normal text-[12px] p-[24px] flex flex-col justify-between relative"
          v-for="(item, idx) in FavoriteList"
          :key="item.type + idx"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <svg-icon
                size="24"
                :iconClass="iconDist[item.type]"
                className="mr-2"
              ></svg-icon>
              <p>{{ item.title }}</p>
            </div>
            <p class="text-[#989898]">
              {{ `更新于: ${calcUpdate(item.update)}` }}
            </p>
          </div>
          <p class="pl-8 text-[#989898]">
            {{ `修改日期: ${item.editDate}` }}
          </p>
          <svg-icon
            iconClass="solid_star_icon"
            size="12"
            className="absolute top-[8px] right-[10px]"
          ></svg-icon>
        </div>
      </div>
    </template>
  </DocWrapper>
</template>

<script setup lang="ts">
import { reactive, defineAsyncComponent } from 'vue';
const DocWrapper = defineAsyncComponent(() => import('./DocWrapper.vue'));
const iconDist = reactive<{ [key: string]: string }>({
  doc: 'document_doc_icon',
});

interface FavoriteItem {
  title: string;
  type: string;
  update: string;
  editDate: string;
}
const FavoriteList: FavoriteItem[] = reactive([
  {
    title: '未来信息化技术.doc',
    type: 'doc',
    update: '2023-06-15',
    editDate: '2022-03-22',
  },
  {
    title: '未来信息化技术.doc',
    type: 'doc',
    update: '2023-06-01',
    editDate: '2022-03-22',
  },
  {
    title: '未来信息化技术.doc',
    type: 'doc',
    update: '2023-04-15',
    editDate: '2022-03-22',
  },
  {
    title: '未来信息化技术.doc',
    type: 'doc',
    update: '2022-05-15',
    editDate: '2022-03-22',
  },
]);
const calcUpdate = (dateStr: string) => {
  let lastUpdate = new Date(dateStr).getTime();
  let date = new Date().getTime();
  let days = Math.floor((date - lastUpdate) / (24 * 60 * 60 * 1000));
  let str = '';
  if (days < 7) {
    str = days + '天前';
  } else if (days < 28) {
    str = Math.floor(days / 7) + '周前';
  } else if (days < 365) {
    str = Math.floor(days / 28) + '月前';
  } else {
    str = Math.floor(days / 365) + '年前';
  }
  return str;
};
const intoFavorites = () => {
  console.log('进入收藏夹');
};
</script>

<style></style>
