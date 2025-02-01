<template>
  <div class="px-3 pt-3">
    <div class="flex flex-wrap justify-between items-left enter-x mt-2 mb-4">
      <div class="flex flex-nowrap justify-between items-left">
        <div class="select-box">
          <label>项目：</label>
          <el-select
            v-model="selectedProjectIds"
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="1"
            @change="handleSelectedProject"
          >
            <el-option
              v-for="item in projectList"
              :label="item.projectName"
              :value="item.projectId"
              :key="item.projectId"
            ></el-option>
          </el-select>
        </div>
        <div class="select-box">
          <label>用户信息：</label>
          <el-select v-model="selectUserInfo" clearable>
            <el-option
              v-for="item in userInfo"
              :label="item.label"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</el-option
            >
          </el-select>
        </div>
        <div class="select-box">
          <label>状态：</label>
          <el-select v-model="selectedStatus">
            <el-option label="打开的" :value="EventStatusEnum.OPEN"></el-option>
            <el-option
              label="标记为已解决"
              :value="EventStatusEnum.RESOLVED"
            ></el-option>
            <el-option
              label="关闭的"
              :value="EventStatusEnum.CLOSED"
            ></el-option>
            <el-option
              label="打开和关闭"
              :value="EventStatusEnum.OPEN_AND_CLOSED"
            ></el-option>
          </el-select>
        </div>
      </div>
      <SearchBox :minWidth="'w-[320px]'" class="mr-3" />
    </div>
    <el-skeleton :count="3" animated :loading="isLoading" :throttle="500">
      <template #template>
        <el-card class="mb-4">
          <div class="flex justify-between">
            <el-skeleton-item style="width: 20%"></el-skeleton-item>
            <el-skeleton-item style="width: 20%"></el-skeleton-item>
          </div>
          <el-skeleton class="mt-10" :rows="5"></el-skeleton>
        </el-card>
      </template>
      <div ref="projectItemWrapper">
        <ListView
          v-for="item in selectedProject"
          :key="item.projectId"
          :project-name="item.projectName"
          :project-id="item.projectId"
          :selected-status="selectedStatus"
        ></ListView>
      </div>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ProjectListItem } from './typing';
import { useAutoAnimate } from '@formkit/auto-animate/vue';
import { EventStatusEnum } from '@/enums/commonEnum';
import { useServiceStore } from '@/store/modules/service';

const ListView = defineAsyncComponent(
  () => import('./components/Listview.vue'),
);

const [projectItemWrapper] = useAutoAnimate();
const serviceStore = useServiceStore();

const isLoading = ref(false);
const selectedProjectIds = ref<number[]>([]);
const selectedProject = ref<ProjectListItem[]>([]);
const selectUserInfo = ref('');
const projectList = ref<ProjectListItem[]>([]);
const userInfo = reactive([
  {
    value: 'beijing',
    label: '北京市',
  },
  {
    value: 'shanghai',
    label: '上海市',
  },
]);
const selectedStatus = ref(1);

const handleSelectedProject = (idList: number[]) => {
  selectedProject.value = projectList.value.filter(
    (item) => idList.indexOf(item.projectId) !== -1,
  );
};

const getProjectTreeList = async () => {
  isLoading.value = true;
  if (serviceStore.serviceCatalogList) {
    projectList.value = [...serviceStore.serviceCatalogList];
  } else {
    await serviceStore.getServiceCatalogList();
    projectList.value = [
      ...(serviceStore.serviceCatalogList as unknown as ProjectListItem[]),
    ];
  }
  selectedProjectIds.value = projectList.value.map((item) => item.projectId);
  selectedProject.value = [...projectList.value];
  isLoading.value = false;
};

onMounted(() => {
  getProjectTreeList();
});
</script>

<style lang="scss" scoped>
.select-box {
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    display: block;
    width: 80px;
    margin-right: 3px;
    text-align: right;
  }
}
</style>
@/api/ep/event@/api/ep/event/eventModel
