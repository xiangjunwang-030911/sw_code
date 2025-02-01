<template>
  <div
    ref="serviceWrapperRef"
    :style="{ height: height - 30 + 'px', overflowY: 'auto' }"
  >
    <el-row>
      <el-col :span="8" v-for="item in serviceList" :key="item.templateID">
        <div class="flex pb-9" @click="onItemClick(item)">
          <svg-icon
            iconClass="email-calendar"
            :className="'cursor-pointer mr-[14px]'"
            :size="'40'"
          ></svg-icon>
          <div class="cursor-pointer font-pingfang">
            <div class="font-semibold">{{ item.templateName }}</div>
            <div>{{ item.userCreateNotes }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ServiceListApiResult } from '@/api/ep/service/serviceModel';
import { useTableMaxHeight } from '@/hooks/tools/useTableMaxHeight';
import { useServiceStore } from '@/store/modules/service';
import { storeToRefs } from 'pinia';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { useRoute } from 'vue-router';
import { ButtonClickEnum } from '@/enums/projectEnum';

const router = useRouter();
const route = useRoute();
const tagsViewStore = useTagsViewStore();

const serviceStore = useServiceStore();

const { serviceList } = storeToRefs(serviceStore);

const height = ref(0);
const serviceWrapperRef = ref<HTMLElement>();

const handleSearch = (filters: ServiceListApiResult[]) => {
  serviceList.value = filters;
};

const onItemClick = (item: ServiceListApiResult) => {
  // window.localStorage.setItem('currentTitle', item.templateName);
  // window.localStorage.setItem('currentDesc', item.userCreateNotes);
  router
    .push({
      path: '/ep/event/add',
      query: {
        currentTitle: item.templateName,
        currentDesc: item.userCreateNotes,
        templateId: item.templateID,
        projectId: item.projectID,
      },
    })
    .then(() => {
      tagsViewStore.addTagsViewList({
        title: '事件添加',
        name: `/ep/event/add?currentTitle=${item.templateName}&currentDesc=${item.userCreateNotes}&templateId=${item.templateID}&projectId=${item.projectID}`,
        group: ButtonClickEnum.EVENT_ADD,
        meta: route.meta,
      });
    });
};

onMounted(() => {
  useTableMaxHeight(height, serviceWrapperRef.value as HTMLElement);
});

defineExpose({ handleSearch });
</script>

<style lang="scss" scoped></style>
