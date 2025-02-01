<template>
  <div class="bg-default w-full py-5 px-10">
    <div
      class="flex items-center justify-between border-b border-solid border-normal pb-5"
    >
      <div class="tabs-wrapper flex items-center">
        <el-tooltip placement="top">
          <div
            class="py-1 px-3 rounded-sm text-center cursor-pointer mr-3 border-[#289E22] border"
          >
            工程师补单
          </div>
          <template #content>
            <div>目标状态“处理中”</div>
          </template>
        </el-tooltip>
        <el-tooltip placement="top">
          <div
            class="py-1 px-3 rounded-sm text-center cursor-pointer mr-3 border-[#D05D00] border"
          >
            关闭
          </div>
          <template #content>
            <div>目标状态“关闭”</div>
          </template>
        </el-tooltip>
        <el-tooltip placement="top">
          <div
            class="py-1 px-3 rounded-sm text-center cursor-pointer mr-3 border-[#979797] border"
          >
            创建协同任务
          </div>
          <template #content>
            <div>目标状态“协同处理中”</div>
          </template>
        </el-tooltip>
      </div>
      <div class="action-wrapper flex items-center">
        <el-button type="primary" class="mr-4 w-[70px]" @click="eventFlow"
          >提交</el-button
        >
        <el-button class="w-[70px]" @click="handleCancel">取消</el-button>
      </div>
    </div>
    <el-tabs v-model="tabName" class="mt-3">
      <el-tab-pane label="事件详情" name="name1">
        <EventDetails class="content-wrapper scrollBar pr-2"></EventDetails>
      </el-tab-pane>
      <el-tab-pane label="SLA详情" name="name2">
        <SlaDetails class="content-wrapper scrollBar pr-2"></SlaDetails>
      </el-tab-pane>
      <el-tab-pane label="历史记录" name="name3">
        <HistoryRecord class="content-wrapper scrollBar pr-2"></HistoryRecord>
      </el-tab-pane>
      <el-tab-pane label="所有活动" name="name4">
        <Activities class="content-wrapper scrollBar pr-2"></Activities>
      </el-tab-pane>
      <el-tab-pane label="资产" name="name5">
        <Property class="content-wrapper scrollBar pr-2"></Property>
      </el-tab-pane>
      <el-tab-pane label="子事件" name="name6">
        <SubEvent class="content-wrapper scrollBar pr-2"></SubEvent>
      </el-tab-pane>
      <el-tab-pane label="链接" name="name7">
        <Link class="content-wrapper scrollBar pr-2"></Link>
      </el-tab-pane>
      <el-tab-pane label="对话" name="name8">
        <EmployeeEvaluation
          class="content-wrapper scrollBar pr-2"
        ></EmployeeEvaluation>
      </el-tab-pane>
    </el-tabs>
    <SubmitModal v-model="isShowSubmitModal" :type="submitResult"></SubmitModal>
    <EventFlowModal v-model="eventFlowModal" @submit="submit"></EventFlowModal>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

const EventDetails = defineAsyncComponent(
  () => import('./Components/EventDetails.vue'),
);
const SlaDetails = defineAsyncComponent(
  () => import('./Components/SlaDetails.vue'),
);
const HistoryRecord = defineAsyncComponent(
  () => import('./Components/HistoryRecord.vue'),
);
const Activities = defineAsyncComponent(
  () => import('./Components/Activities.vue'),
);
const Property = defineAsyncComponent(
  () => import('./Components/Property.vue'),
);
const SubmitModal = defineAsyncComponent(
  () => import('./Components/SubmitModal.vue'),
);
const EventFlowModal = defineAsyncComponent(
  () => import('./Components/EventFlowModal.vue'),
);
const SubEvent = defineAsyncComponent(
  () => import('./Components/SubEvent.vue'),
);
const Link = defineAsyncComponent(() => import('./Components/Link.vue'));
const EmployeeEvaluation = defineAsyncComponent(
  () => import('./Components/EmployeeEvaluation.vue'),
);

const router = useRouter();

const tabName = ref('name1');
const submitResult = ref('success');
const isShowSubmitModal = ref(false);
const eventFlowModal = ref(false);

const handleCancel = () => {
  router.back();
};

const submit = () => {
  submitResult.value = 'success';
  isShowSubmitModal.value = true;
};

const eventFlow = () => {
  eventFlowModal.value = true;
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  height: calc(100vh - 72px - 40px - 53px - 80px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
