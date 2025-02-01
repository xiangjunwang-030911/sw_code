<template>
  <div>
    <div class="p-7 bg-default">
      <div class="pl-3">
        <div>
          <span class="text-placeholder mr-2">知识ID:</span>
          <span class="text-regular">#{{ route.query.id }}</span>
        </div>
        <el-skeleton :loading="isLoading" animated :throttle="500">
          <template #template>
            <el-skeleton-item class="mt-2" />
            <el-skeleton-item style="width: 15%" class="mt-2" />
            <el-skeleton-item style="width: 15%" class="ml-10 mt-2" />
          </template>
          <div class="text-primary font-semibold mt-2 text-lg">
            {{ title }}
          </div>
          <div class="flex mt-4">
            <span class="text-placeholder mr-1">最后编辑日期:</span>
            <span class="text-regular"> {{ dateLastModified }}</span>

            <span class="text-placeholder mr-1 ml-[77px]">浏览次数:</span>
            <span class="text-regular"> {{ totalOpens }}</span>
          </div>
        </el-skeleton>
      </div>
    </div>
    <div class="p-3">
      <KnowledgeInfo
        class="mt-3"
        :knowledgeInfo="knowledgeInfo"
      ></KnowledgeInfo>
      <KnowledgeComment class="mt-3"></KnowledgeComment>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getKnowLedgeInfoApi } from '@/api/ep/knowledge';
import { useServiceStore } from '@/store/modules/service';
import { KnowledgeFieldIdEnum } from '../typing';
import { getDecodeWithUtf8 } from '@/utils';

const KnowledgeInfo = defineAsyncComponent(
  () => import('./components/KnowledgeInfo.vue'),
);
const KnowledgeComment = defineAsyncComponent(
  () => import('./components/KnowledgeComment.vue'),
);
const route = useRoute();
const serviceStore = useServiceStore();

const isLoading = ref(false);
const title = ref('');
const dateLastModified = ref('');
const totalOpens = ref(10);
const knowledgeInfo = ref('');

const getKnowLedgeInfo = async () => {
  isLoading.value = true;
  const res = await getKnowLedgeInfoApi({
    projectId: serviceStore.getKnowledgeProjectId as number,
    itemIds: [Number(route.query.id)],
    fieldIds: [
      KnowledgeFieldIdEnum.TITLE,
      KnowledgeFieldIdEnum.DATE_LAST_MODIFIED,
      KnowledgeFieldIdEnum.DETAILS,
    ],
  });
  res[0].itemValues.forEach((item) => {
    switch (item.fieldID) {
      case KnowledgeFieldIdEnum.TITLE:
        title.value = item.value;
        break;
      case KnowledgeFieldIdEnum.DATE_LAST_MODIFIED:
        dateLastModified.value = item.value;
        break;
      case KnowledgeFieldIdEnum.DETAILS:
        knowledgeInfo.value = getDecodeWithUtf8(item.valueHTML as string);
        break;
      default:
        break;
    }
  });
  isLoading.value = false;
};

watch(
  () => route.query.id,
  () => {
    route.query.id && getKnowLedgeInfo();
  },
  {
    immediate: true,
  },
);
</script>

<style scoped lang="scss"></style>
