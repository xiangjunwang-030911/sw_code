<template>
  <div class="mt-4">
    <div
      ref="gridWrapperRef"
      class="pl-1 pt-1"
      :style="{ height: height - 55 + 'px', overflowY: 'auto' }"
      v-loading="isLoading"
    >
      <el-row>
        <el-col :lg="8" :md="12" v-for="item in knowledgeList">
          <GridItem
            class="mr-3 mb-4 cursor-pointer"
            :item="item"
            @click="onItemClick(item)"
          ></GridItem>
        </el-col>
      </el-row>
    </div>
    <div class="flex justify-center">
      <el-pagination
        v-model:current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useTableMaxHeight } from '@/hooks/tools/useTableMaxHeight';
import { useKnowledgeStore } from '@/store/modules/knowledge';
import { useServiceStore } from '@/store/modules/service';
import { storeToRefs } from 'pinia';
import { getKnowLedgeListApi } from '@/api/ep/knowledge';
import { KnowledgeListItem } from '@/api/ep/knowledge/knowledgeModel';
import { useTagsViewStore } from '@/store/modules/tagsView';

const GridItem = defineAsyncComponent(() => import('./GridItem.vue'));

const router = useRouter();
const route = useRoute();
const tagsViewStore = useTagsViewStore();

interface Props {
  search: string;
}

const props = defineProps<Props>();

const height = ref(0);
const gridWrapperRef = ref<HTMLElement>();
const serviceStore = useServiceStore();
const knowledgeStore = useKnowledgeStore();
const { currentFolderId } = storeToRefs(knowledgeStore);

const knowledgeList = ref<KnowledgeListItem[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const pageTotal = ref(0);
const isLoading = ref(false);

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  getKnowledgeList();
};

const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  getKnowledgeList();
};

const getKnowledgeList = async () => {
  isLoading.value = true;
  const res = await getKnowLedgeListApi({
    projectId: serviceStore.getKnowledgeProjectId as number,
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    keyWords: props.search,
    folderIds: [currentFolderId.value],
    ownerIds: [],
    fieldIds: [],
    sortBy: 0,
  });
  knowledgeList.value = res.knowledgeItems;
  pageTotal.value = res.totalCount;
  isLoading.value = false;
};

const onItemClick = (item: KnowledgeListItem) => {
  router
    .push({
      path: '/ep/knowledge/details',
      query: {
        id: item.knowledgeID,
      },
    })
    .then(() => {
      tagsViewStore.addTagsViewList({
        title: `知识库-${item.knowledgeID}`,
        name: `/ep/knowledge/details?id=${item.knowledgeID}`,
        meta: route.meta,
      });
    });
};

watch(
  () => currentFolderId.value,
  () => {
    getKnowledgeList();
  },
);

onMounted(() => {
  useTableMaxHeight(height, gridWrapperRef.value as HTMLElement);
  getKnowledgeList();
});

defineExpose({ getKnowledgeList });
</script>

<style lang="scss" scoped></style>
