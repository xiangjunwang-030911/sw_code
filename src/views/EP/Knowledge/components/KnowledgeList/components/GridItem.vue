<template>
  <div class="h-[200px] shadow-lighter p-[13px] rounded-lg">
    <div class="border-b border-light">
      <div class="flex w-full">
        <img
          class="w-[24px] h-[30px] mr-2"
          src="@/assets/images/ep/knowledge_grid_normal.png"
          alt=""
        />
        <div class="w-[calc(100%-24px)]">
          <div class="text-secondary text-xs flex justify-between items-center">
            <span>#{{ item.knowledgeID }}</span>
            <span>{{
              moment(item.dateLastModified).format('YYYY/MM/DD')
            }}</span>
          </div>
          <div class="font-bold truncate" :title="item.title">
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="text-xs text-secondary mt-3 mb-2">
        <span>知识负责人:</span>
        <span>{{ item.crntOwner }}</span>
      </div>
    </div>
    <div class="h-[70px] pt-4 border-b border-light">
      <div
        class="h-[35px] text-xs text-secondary leading-5 line-clamp-2"
        title="xxx"
      >
        {{ getDecodeWithUtf8(item.description) }}
      </div>
    </div>
    <div class="mt-3 flex items-center justify-between">
      <div class="text-xs text-secondary flex items-center">
        <i-ep-view class="mr-1"></i-ep-view>
        <span>{{ item.totalOpens }}</span>
      </div>
      <div class="flex items-center cursor-pointer" v-if="item.attachmentCount">
        <svg-icon
          icon-class="common-icon-attach"
          class="text-secondary mr-1"
          :size="14"
        ></svg-icon>
        <span class="text-xs">{{ item.attachmentCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDecodeWithUtf8 } from '@/utils';
import moment from 'moment';

interface KnowledgeItemInfo {
  projectID: number;
  knowledgeID: number;
  title: string;
  description: string;
  imageID: number;
  itemTypeID: number;
  dateLastModified: string;
  dateCreated: string;
  createdBy: string;
  crntOwner: string;
  totalOpens: number;
  attachmentCount: number;
  stateName: string;
  crntStateID: number;
}
interface Props {
  item: KnowledgeItemInfo;
}

defineProps<Props>();
</script>

<style lang="scss" scoped></style>
