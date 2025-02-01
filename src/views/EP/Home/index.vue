<template>
  <div class="ep-home px-3 pt-3">
    <el-card
      class="search card flex items-center justify-center"
      shadow="hover"
    >
      <SearchBox
        v-model="searchValue"
        class="w-[300px]"
        searchBtn="搜索知识"
        searchSize="large"
        :placeholder="t('ep_home.enter_keyword')"
      ></SearchBox>
    </el-card>
    <el-skeleton :count="1" animated :loading="isEventLoading" :throttle="500">
      <template #template>
        <el-card class="mb-4">
          <div class="flex justify-between">
            <el-skeleton-item style="width: 20%"></el-skeleton-item>
            <el-skeleton-item style="width: 20%"></el-skeleton-item>
          </div>
          <el-skeleton class="mt-10" :rows="6"></el-skeleton>
        </el-card>
      </template>
      <ListView
        v-for="item in selectedProject"
        :key="item.projectId"
        :project-name="item.projectName"
        :project-id="item.projectId"
        :selected-status="1"
        :is-home="true"
      ></ListView>
    </el-skeleton>
    <div class="flex">
      <el-card class="card !ml-0 flex-1" shadow="hover">
        <template #header>
          <p class="font-semibold">{{ t('ep_home.new_request') }}</p>
        </template>

        <request-list />
      </el-card>
      <el-card class="card !ml-0 !mr-0 w-[325px]" shadow="hover">
        <template #header>
          <p class="font-semibold">{{ t('ep_home.announcement') }}</p>
        </template>

        <notice-list />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { getProjectTreeListApi } from '@/api/ep/event';
// import { ProjectTreeListApiResult } from '@/api/ep/event/eventModel';
import { defineAsyncComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
// import { ProjectListItem } from '../Event/typing';
// import { useAuthStore } from '@/store/modules/auth';
import { useServiceStore } from '@/store/modules/service';
import { storeToRefs } from 'pinia';

const NoticeList = defineAsyncComponent(
  () => import('@/views/EP/Home/NoticeList.vue'),
);
const RequestList = defineAsyncComponent(
  () => import('@/views/EP/Home/RequestList.vue'),
);
const ListView = defineAsyncComponent(
  () => import('@/views/EP/Event/components/Listview.vue'),
);

const { t } = useI18n();
// const authStore = useAuthStore();
const serviceStore = useServiceStore();
const { selectedProject } = storeToRefs(useServiceStore());

const searchValue = ref('');
const isEventLoading = ref(false);
// const selectedProject = ref<ProjectListItem[]>([]);

// const getProjectList = (res: ProjectTreeListApiResult[]) => {
//   const projectIdSet: Set<number> = new Set(authStore.getProjectId);
//   let projectList: ProjectListItem[] = [];

//   const recursion = (list: ProjectTreeListApiResult[]) => {
//     for (const element of list) {
//       if (projectIdSet.has(element.value.projectID)) {
//         element.value.isActiveProject &&
//           !element.value.isTemplateProject &&
//           projectList.push({
//             projectId: element.value.projectID,
//             projectName: element.value.projectName,
//           });
//       }
//       if (projectList.length !== projectIdSet.size && element.children.length) {
//         recursion(element.children);
//       }
//     }
//   };

//   recursion(res);
//   selectedProject.value = projectList;
//   isEventLoading.value = false;
// };

const getProjectTreeList = async () => {
  isEventLoading.value = true;
  // const res = await getProjectTreeListApi();
  // getProjectList(res);
  if (selectedProject.value == null) {
    await serviceStore.getServiceCatalogList();
  }
  isEventLoading.value = false;
};

onMounted(() => {
  getProjectTreeList();
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
