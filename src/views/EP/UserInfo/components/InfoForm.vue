<template>
  <ReCard class="w-full m-0 enter-x" shadow="hover">
    <template #title>
      <div class="flex justify-between items-center px-3 py-3.5 h-12">
        <span class="h-9 text-[14px] font-bold text-left">{{
          serviceStore.customerAs
        }}</span>
        <div class="flex items-center leading-5">
          <div
            class="flex items-center cursor-pointer mr-8"
            @click.stop="changePwd"
          >
            <span class="h-4 font-normal mr-2.5">更改密码</span>
            <svg-icon
              class="h-5"
              iconClass="EP_userdata_close"
              fill=""
              alt=""
            />
          </div>
          <div
            class="flex items-center cursor-pointer mr-8"
            @click.stop="sumbitUserInfo"
          >
            <span class="h-4 font-normal mr-2.5">提交</span>
            <svg-icon
              iconClass="EP_userdata_submit"
              fill=""
              class="h-5"
              alt=""
            />
          </div>
        </div>
      </div>
    </template>
    <el-skeleton animated :throttle="500" :count="5" :loading="isLoading">
      <template #template>
        <div class="flex justify-between px-11 py-9">
          <el-skeleton-item variant="text" style="width: 45%" />
          <el-skeleton-item variant="text" style="width: 45%" />
        </div>
      </template>
      <el-form class="p-5" :model="currentFormList" :label-width="100">
        <el-row>
          <template v-for="item in fieldListData" :key="item.uiFieldID">
            <el-col
              class="flex justify-center"
              v-if="item.ifVisible"
              :span="item.width == 1 ? 12 : 24"
            >
              <CommonField
                class="text-secondary font-semibold text-[#505050] w-full items-center"
                v-model="currentFormList[item.uiFieldID]"
                :label="getLabelName(item.name)"
                :fieldId="item.uiFieldID"
                :attributes="{ SupportHTMLFormat: item.SupportHTMLFormat }"
                :fieldTypeId="item.fieldTypeID ? item.fieldTypeID : 1"
                :list-choice="item.listChoice"
              ></CommonField>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </el-skeleton>
  </ReCard>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { FieldsOnPage } from '@/api/ep/userInfo/userInfoModel';
import { useServiceStore } from '@/store/modules/service';
import { useAuthStoreWithOut } from '@/store/modules/auth';
import { setEmployeeItemValuesApi } from '@/api/ep/userInfo';
import { SetEmployeeItemValuesData } from '@/api/ep/userInfo/userInfoModel';
import { useMessage } from '@/hooks/components/useMessage';
import { FieldTypeEnum } from '@/enums/commonEnum';

interface Props {
  fieldListData: FieldsOnPage[];
  isLoading: boolean;
  formList: Record<number, string | number | number[]>;
}

const serviceStore = useServiceStore();
const authStore = useAuthStoreWithOut();
const { createSuccessModal, createErrorModal } = useMessage();

const props = defineProps<Props>();

const currentFormList = reactive(props.formList);

const getLabelName = (name: string) => {
  return name + ': ';
};

const changePwd = () => {};

const sumbitUserInfo = async () => {
  const userInfoArr: SetEmployeeItemValuesData[] = [];
  for (const key in currentFormList) {
    const fieldId = Number(key);
    const fieldOnPage = props.fieldListData.find(
      (pageItem) => pageItem.uiFieldID === fieldId,
    );
    if (fieldOnPage) {
      if (
        fieldOnPage.fieldTypeID === FieldTypeEnum.MULTIPLE_SELECTION_LISTBOX ||
        fieldOnPage.fieldTypeID === FieldTypeEnum.CHECKBOX
      ) {
        fieldOnPage.listChoice
          ?.filter((choiceItem) => choiceItem.id === currentFormList[key])
          .forEach((selectItem) => {
            let infoData: SetEmployeeItemValuesData = {
              fieldId: fieldId,
              choiceId: selectItem.id,
              value: selectItem.name,
            };
            userInfoArr.push(infoData);
          });
      } else {
        let infoData: SetEmployeeItemValuesData = {
          fieldId: 0,
          value: '',
        };
        const choiceObj = fieldOnPage.listChoice?.find(
          (choiceItem) => choiceItem.id === currentFormList[key],
        );
        infoData.fieldId = fieldId;
        if (choiceObj) {
          infoData.choiceId = choiceObj.id;
          infoData.value = choiceObj.name;
        } else {
          infoData.value = currentFormList[key] as string;
        }
        userInfoArr.push(infoData);
      }
    }
  }
  // console.log('currentFormList', currentFormList);
  // console.log('userInfoArr', userInfoArr);
  const result = await setEmployeeItemValuesApi(
    authStore.getBaseProjectId,
    authStore.getUserId,
    userInfoArr,
  );
  if (result.every((item) => item.ok)) {
    createSuccessModal({ message: '提交成功' });
  } else {
    const message = result
      .filter((resultItem) => !resultItem.ok)
      .map((failedItem) => failedItem.msg)
      .join(',');
    createErrorModal({ message });
  }
};
</script>

<style scoped lang="scss"></style>
