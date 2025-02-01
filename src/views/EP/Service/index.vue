<template>
  <div class="px-3 pt-3 h-full flex flex-col">
    <!-- <el-breadcrumb class="pt-3 pb-8 enter-x" :separator="'>'">
      <el-breadcrumb-item>服务目录</el-breadcrumb-item>
      <el-breadcrumb-item>01.服务台&事件管理</el-breadcrumb-item>
      <el-breadcrumb-item>电子邮件服务</el-breadcrumb-item>
    </el-breadcrumb> -->
    <el-card class="px-[24px] enter-x" :bordered="false" shadow="hover">
      <template #header>
        <div
          class="flex justify-between items-center border-b border-lighter pb-4"
        >
          <div class="font-bold">{{ title }}</div>
          <SearchBox
            class="w-[200px] md:w-[340px]"
            v-model="search"
            placeholder="输入关键字"
            searchBtn="搜索服务"
          ></SearchBox>
        </div>
      </template>

      <ServiceList ref="serviceListRef" class="pt-4"></ServiceList>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ServiceListApiResult } from '@/api/ep/service/serviceModel';
import { useServiceStore } from '@/store/modules/service';
import { cloneDeep } from 'lodash-es';
import { defineAsyncComponent } from 'vue';
const ServiceList = defineAsyncComponent(
  () => import('./components/ServiceList.vue'),
);

const route = useRoute();
const serviceStore = useServiceStore();

const serviceListRef = ref<InstanceType<typeof ServiceList>>();
const search = ref('');
const title = ref('');
let serviceListClone: ServiceListApiResult[] = [];

const getTitle = async () => {
  if (route.params.groupId) {
    !serviceStore.serviceGroupList && (await serviceStore.getServiceGroup);
    title.value = serviceStore.serviceGroupList?.find(
      (item) => item.groupID == Number(route.params.groupId),
    )?.groupName as string;
  } else if (route.params.id) {
    !serviceStore.serviceCatalogList &&
      (await serviceStore.getServiceCatalogList);
    title.value = serviceStore.serviceCatalogList?.find(
      (item) => item.projectId == Number(route.params.id),
    )?.projectName as string;
  }
};

const getServiceList = async () => {
  await serviceStore.getServiceList(
    route.params.id as unknown as number,
    route.params.groupId as unknown as number,
  );
  getTitle();
  serviceListClone = cloneDeep(serviceStore.serviceList);
};

watch([() => route.params.id, () => route.params.groupId], () => {
  if (route.path.indexOf('/ep/service/counter') !== -1) {
    getServiceList();
  }
});

watch(
  () => search.value,
  () => {
    if (search.value.trim()) {
      serviceListRef.value!.handleSearch(
        serviceListClone.filter(
          (item) =>
            item.templateName
              .toLocaleLowerCase()
              .indexOf(search.value.toLocaleLowerCase()) !== -1,
        ),
      );
    } else {
      serviceListRef.value!.handleSearch(serviceListClone);
    }
  },
);

onMounted(() => {
  getServiceList();
});
</script>

<style lang="scss" scoped></style>
