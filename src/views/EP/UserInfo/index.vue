<template>
  <div class="custom-content scrollBar-light px-3 pt-3">
    <InfoForm
      :field-list="fieldList"
      :field-list-data="fieldListData"
      :is-loading="isLoading"
      :form-list="formList"
    />

    <InfoAssets />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { uniqBy } from 'lodash-es';
import {
  getEmployeeGuiSettingApi,
  getEmployeeItemValuesApi,
} from '@/api/ep/userInfo';
import { FieldsOnPage, Field } from '@/api/ep/userInfo/userInfoModel';
import { useAuthStoreWithOut } from '@/store/modules/auth';
import { FieldTypeEnum } from '@/enums/commonEnum';

const InfoForm = defineAsyncComponent(
  () => import('./components/InfoForm.vue'),
);
const InfoAssets = defineAsyncComponent(
  () => import('./components/InfoAssets.vue'),
);

const authStore = useAuthStoreWithOut();

const isLoading = ref(false);

const fieldList = ref<Field[]>([]);
const fieldListData = ref<FieldsOnPage[]>([]);
const formList: Record<number, string | number | number[]> = reactive({});

// 获取员工信息表单字段名
const getEmployeeGuiSetting = async () => {
  isLoading.value = true;
  const { fields, pageNames, fieldsOnPage } = await getEmployeeGuiSettingApi(
    authStore.getBaseProjectId,
  );

  fieldList.value = fields;
  const uniqByFieldsOnPage = uniqBy(fieldsOnPage, 'uiFieldID');
  fieldListData.value = uniqByFieldsOnPage
    .filter((item) => item.guiPageID === pageNames[0].id)
    .sort((itema, itemb) => {
      return itema.tabOrder - itemb.tabOrder;
    })
    .map((item) => {
      const fieldObj = fieldList.value.find(
        (fieldItem) => fieldItem.fieldID === item.uiFieldID,
      );
      item.fieldTypeID = fieldObj?.fieldTypeID;
      if (
        fieldObj?.attributes &&
        fieldObj.fieldID === FieldTypeEnum.MULTILINE_EDIT_BOX
      ) {
        item.SupportHTMLFormat = fieldObj.attributes.SupportHTMLFormat;
      }
      if (
        fieldObj?.fieldTypeID === FieldTypeEnum.COMBOBOX ||
        fieldObj?.fieldTypeID === FieldTypeEnum.DROPDOWN_LIST ||
        fieldObj?.fieldTypeID === FieldTypeEnum.MULTIPLE_SELECTION_LISTBOX ||
        fieldObj?.fieldTypeID === FieldTypeEnum.CHECKBOX
      ) {
        item.listChoice = fieldObj.listChoice;
      }
      return item;
    });

  getEmployeeItemValues();
};

// 获取员工信息表单字段值
const getEmployeeItemValues = async () => {
  let strFieldIds = fieldListData.value.reduce(
    (previous, current: FieldsOnPage) => {
      const fieldIds = previous + current.uiFieldID + ',';
      return fieldIds;
    },
    '',
  );
  strFieldIds = strFieldIds.substring(0, strFieldIds.length - 1);
  const result = await getEmployeeItemValuesApi(
    authStore.getBaseProjectId,
    authStore.getUserId,
    strFieldIds,
  );
  isLoading.value = false;
  fieldListData.value.map((item) => {
    if (
      item.fieldTypeID === FieldTypeEnum.CHECKBOX ||
      item.fieldTypeID === FieldTypeEnum.MULTIPLE_SELECTION_LISTBOX
    ) {
      const valueArr = result.filter((valueItem) => {
        return valueItem.fieldId === item.uiFieldID;
      });
      if (valueArr.length) {
        item.value = valueArr.join(',');
      } else {
        item.value = '';
      }
    } else {
      const valueObj = result.find((valueItem) => {
        return valueItem.fieldId === item.uiFieldID;
      });
      if (valueObj) {
        if (valueObj.choiceId) {
          item.value = valueObj.choiceId;
        } else {
          const fieldObj = item.listChoice?.find(
            (choiceItem) => choiceItem.name === valueObj.value,
          );
          item.value = fieldObj ? fieldObj.id : valueObj.value;
        }
      } else {
        item.value = '';
      }
    }

    return item;
  });
  //把字段ID和字段值放到表单对象中去
  fieldListData.value.forEach((field) => {
    if (
      field.fieldTypeID === FieldTypeEnum.CHECKBOX ||
      field.fieldTypeID === FieldTypeEnum.MULTIPLE_SELECTION_LISTBOX
    ) {
      if (field.value && typeof field.value === 'string') {
        formList[field.uiFieldID] = field.value.split(',').map((item) => {
          const choiceId = Number(item);
          return choiceId;
        });
      } else {
        formList[field.uiFieldID] = [];
      }
    } else {
      formList[field.uiFieldID] = field.value || '';
    }
  });
};

const initData = () => {
  getEmployeeGuiSetting();
};

onMounted(() => {
  initData();
});
</script>

<style lang="scss" scoped></style>
