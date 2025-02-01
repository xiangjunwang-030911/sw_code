<template>
  <div>
    <div class="p-7 bg-default">
      <div class="flex justify-between">
        <div class="flex items-center flex-1 w-0">
          <el-skeleton animated :loading="isLoading">
            <template #template>
              <el-skeleton-item
                variant="button"
                class="mr-2"
                style="height: 28px; width: 81px"
              ></el-skeleton-item>
              <el-skeleton-item
                variant="button"
                class="mr-2"
                style="height: 28px; width: 81px"
              ></el-skeleton-item>
              <el-skeleton-item
                variant="button"
                style="height: 28px; width: 81px"
              ></el-skeleton-item>
            </template>
            <div class="flex items-center flex-wrap">
              <el-tooltip
                :content="`目标状态“${item.nextStatusName}”`"
                placement="top"
                v-for="item in flowList"
                :key="item.statusId"
              >
                <div
                  class="mt-2 px-5 py-1 border-2 w-fit rounded mr-2 cursor-pointer"
                  :class="
                    item.nextStatusIfClosed > 0
                      ? 'border-[#FA6400] text-[#FA6400]'
                      : 'border-theme text-theme'
                  "
                >
                  {{ item.transitionName }}
                </div>
              </el-tooltip>
              <div class="flex items-center mt-2" v-if="sysStore.getEnableINT">
                <el-divider
                  v-if="flowList.length"
                  class="!h-5"
                  direction="vertical"
                />
                <div
                  @click="handleShowCommonQuestion"
                  class="mx-2 px-5 py-1 border-2 w-fit rounded cursor-pointer border-theme text-theme bg-[var(--el-color-primary-light-9)]"
                >
                  Ask Bot
                </div>
                <div
                  @click="handleShowLiveSyncActivity"
                  class="mx-2 px-5 py-1 border-2 w-fit rounded cursor-pointer border-[var(--el-color-success)] text-[var(--el-color-success)] bg-[var(--el-color-success-light-9)]"
                >
                  LiveSync Activity
                </div>
              </div>
            </div>
          </el-skeleton>
        </div>
        <view class="mt-2">
          <el-button v-if="!isEdit" type="default" @click="handleEdit">
            <i-ep-edit class="mr-1"></i-ep-edit>
            Edit
          </el-button>
          <view
            v-else
            class="flex justify-end"
            :style="{ width: submitLoading ? '240px' : '200px' }"
          >
            <el-button-group class="whitespace-nowrap">
              <el-button
                type="default"
                :loading="submitLoading"
                @click="handleSubmit"
              >
                <i-ep-select class="mr-1"></i-ep-select>
                Submit
              </el-button>
              <el-button
                type="default"
                :loading="submitLoading"
                @click="handleCancel"
              >
                <i-ep-close-bold class="mr-1"></i-ep-close-bold>
                Cancel
              </el-button>
            </el-button-group>
          </view>
        </view>
      </div>
      <div class="mt-6 pl-3">
        <div>
          <span class="text-placeholder mr-2">事件ID:</span>
          <span class="text-regular">#{{ route.query.id }}</span>
        </div>
        <el-skeleton :loading="isLoading" animated :throttle="500">
          <template #template>
            <el-skeleton-item class="mt-2" />
            <el-skeleton-item style="width: 20%" />
          </template>
          <div class="text-primary font-semibold mt-2 text-lg">
            <span v-if="!isEdit">
              {{ fieldsValue[FieldIdEnum.TITLE]?.value || '' }}
            </span>
            <el-input
              v-else
              v-model="editForm.Name"
              placeholder="请输入标题"
            ></el-input>
          </div>
          <div class="mt-4">
            <span class="text-placeholder mr-1">当前状态:</span>
            <span class="text-regular">
              {{ fieldsValue[FieldIdEnum.CURRENT_STATUS] || '' }}</span
            >
          </div>
        </el-skeleton>
      </div>
    </div>
    <div class="p-3">
      <EventRate></EventRate>
      <EventInfo
        :fieldList="fieldList"
        :fieldsValue="fieldsValue"
        :isLoading="isLoading"
        :isEdit="isEdit"
        @change="handleEventInfoChange"
        class="mt-3"
      ></EventInfo>
      <EventHistory class="mt-3"> </EventHistory>
      <EventUpload class="mt-3"> </EventUpload>
      <EventRemark class="mt-3"> </EventRemark>
      <EventSearch class="mt-3"></EventSearch>
      <EventSync class="mt-3"></EventSync>
    </div>
    <CommmonQuestionModal
      v-model="isShowCommmonQuestionModal"
    ></CommmonQuestionModal>
    <LiveSyncActivityModal
      v-model="isShowLiveSyncActivityModal"
    ></LiveSyncActivityModal>
  </div>
</template>

<script setup lang="ts">
import {
  getDetailsFieldsApi,
  getDetailsFieldsValueApi,
  getEventDetailsFlowApi,
  getFieldChoiceListApi,
  updateEventApi,
} from '@/api/ep/event';
import { EditFieldsValue, FieldListItem, FieldsValue } from './typing';
import { uniqBy } from 'lodash-es';
import {
  EventOperationTypeEnum,
  FieldAuthorityEnum,
  FieldIdEnum,
  FieldTypeEnum,
} from '@/enums/commonEnum';
import {
  EventDetailsFlowApiResult,
  IncidentPostFields,
  UpdateEventParams,
} from '@/api/ep/event/eventModel';
import { useSysStore } from '@/store/modules/sys';

const EventRate = defineAsyncComponent(
  () => import('./components/EventRate.vue'),
);
const EventInfo = defineAsyncComponent(
  () => import('./components/EventInfo.vue'),
);
const EventHistory = defineAsyncComponent(
  () => import('./components/EventHistory.vue'),
);
const EventUpload = defineAsyncComponent(
  () => import('./components/EventUpload.vue'),
);
const EventRemark = defineAsyncComponent(
  () => import('./components/EventRemark.vue'),
);
const EventSearch = defineAsyncComponent(
  () => import('./components/EventSearch.vue'),
);
const EventSync = defineAsyncComponent(
  () => import('./components/EventSync.vue'),
);
const CommmonQuestionModal = defineAsyncComponent(
  () => import('./components/CommonQuestionModal.vue'),
);
const LiveSyncActivityModal = defineAsyncComponent(
  () => import('./components/LiveSyncActivityModal.vue'),
);

const route = useRoute();
const router = useRouter();
const sysStore = useSysStore();
const { createMessage } = useMessage();

let lastUpdateNo = 0;
const fieldList = ref<FieldListItem[]>([]);
const fieldsValue = ref<FieldsValue>({});
const isLoading = ref(false);
const flowList = ref<EventDetailsFlowApiResult[]>([]);
const isShowCommmonQuestionModal = ref(false);
const isShowLiveSyncActivityModal = ref(false);
const isEdit = ref(false);
const editForm = ref<UpdateEventParams>({});
const isChanged = ref(false);
const submitLoading = ref(false);

const handleEdit = async () => {
  isEdit.value = !isEdit.value;
  isLoading.value = true;
  await Promise.all(
    fieldList.value.map(async (item) => {
      return await getFieldChoiceList(item);
    }),
  );
  isLoading.value = false;
  editForm.value = {
    OperationType: EventOperationTypeEnum.EDIT,
    ProjectID: Number(route.query.projectId),
    ID: Number(route.query.id),
    Name: fieldsValue.value[FieldIdEnum.TITLE].value || '',
    LastUpdateNo: lastUpdateNo + 1,
  };
};

const handleSubmit = async () => {
  if (isChanged.value) {
    submitLoading.value = true;
    await updateEventApi(editForm.value);
    submitLoading.value = false;
  }
  createMessage.success('修改成功');
  router.back();
};

const handleEventInfoChange = (editFieldsValue: EditFieldsValue) => {
  isChanged.value = true;
  editForm.value.Fields = setObjToArrar(editFieldsValue);
};

const setObjToArrar = (obj: EditFieldsValue) => {
  let arr: IncidentPostFields[] = [];
  for (const key in obj) {
    arr.push({ FieldID: Number(key), Value: obj[key] });
  }
  return arr;
};

const handleShowCommonQuestion = () => {
  isShowCommmonQuestionModal.value = true;
};

const handleShowLiveSyncActivity = () => {
  isShowLiveSyncActivityModal.value = true;
};

const handleCancel = () => {
  isEdit.value = !isEdit.value;
  isChanged.value = false;
};

const isOptionField = (item?: FieldListItem) => {
  return (
    item?.fieldTypeID == FieldTypeEnum.DROPDOWN_LIST ||
    item?.fieldTypeID == FieldTypeEnum.CHECKBOX ||
    item?.fieldTypeID == FieldTypeEnum.MULTIPLE_SELECTION_LISTBOX ||
    item?.fieldTypeID == FieldTypeEnum.COMBOBOX
  );
};

const getEventFlow = async (statusValue: number) => {
  const res = await getEventDetailsFlowApi({
    projectId: Number(route.query.projectId),
    crntStatusID: statusValue,
  });
  flowList.value = res;
  isLoading.value = false;
};

const getDetailsFieldsValue = async (fieldIds: string) => {
  const res = await getDetailsFieldsValueApi({
    projectId: Number(route.query.projectId),
    itemId: Number(route.query.id),
    fieldIds: fieldIds,
  });
  lastUpdateNo = res.lastUpdateNo;
  let statusValue = 0;
  res.fields.map((item) => {
    if (item.id == FieldIdEnum.CURRENT_STATUS) {
      statusValue = item.dbValue as number;
    }
    fieldsValue.value[item.id] = {
      value: item.value || '',
      dbValue: item.dbValue || '',
    };
  });
  if (!statusValue) {
    statusValue = res.oldStatusID;
  }
  await getEventFlow(statusValue);
};

const getFieldChoiceList = async (item: FieldListItem) => {
  if (isOptionField(item)) {
    const choiceList = await getFieldChoiceListApi(
      Number(route.query.projectId),
      item.fieldID,
    );
    item.listChoice = choiceList;
  }
  return item;
};

const getDetailsFields = async () => {
  if (!route.query.projectId) {
    return;
  }
  isLoading.value = true;
  const res = await getDetailsFieldsApi({
    projectId: Number(route.query.projectId),
  });
  const guiPageIDList = res.stmartIssueTypePages
    .filter((item) => item.incidentTypeID == 1)
    .map((item) => item.guiPageID);
  const fieldsIdList = res.fieldsOnPage.filter((item) =>
    guiPageIDList.includes(item.guiPageID),
  );
  for (let i = 0; i < fieldsIdList.length; i++) {
    const item = fieldsIdList[i];
    const customField = res.customFields.find(
      (el) => el.fieldID == item.uiFieldID,
    );
    const sysField = res.sysFields.find((el) => el.fieldID == item.uiFieldID);
    let existItem = (customField || sysField) as FieldListItem;
    if (!sysField && !customField) {
      continue;
    }
    existItem.width = item.width;
    existItem.height = item.height;
    existItem.tabOrder = item.tabOrder;
    // existItem = await getFieldChoiceList(existItem);

    fieldList.value = [...fieldList.value, existItem];
  }
  fieldList.value = uniqBy(fieldList.value, 'fieldID');
  fieldList.value.sort((a, b) => a.tabOrder - b.tabOrder);
  fieldList.value = fieldList.value.filter(
    (item) => item.visibleToCustomer > FieldAuthorityEnum.HIDDEN,
  );
  await getDetailsFieldsValue(
    fieldList.value.map((item) => item.fieldID).join(','),
  );
};
watch(
  () => route.query.id,
  () => {
    getDetailsFields();
  },
);
onMounted(() => {
  getDetailsFields();
});
</script>

<style lang="scss" scoped></style>
