<template>
  <ReCard>
    <template #title> 事件属性 </template>
    <el-skeleton animated :throttle="500" :count="3" :loading="isLoading">
      <template #template>
        <div class="flex justify-between px-11 py-9">
          <el-skeleton-item variant="text" style="width: 30%" />
          <el-skeleton-item variant="text" style="width: 30%" />
          <el-skeleton-item variant="text" style="width: 30%" />
        </div>
      </template>
      <el-form class="px-11 py-9" :label-width="120">
        <el-row :gutter="10">
          <template v-for="item in fieldList">
            <el-col
              v-if="isShow(item)"
              :md="item.width == 1 ? 12 : 24"
              :lg="item.width == 1 ? 8 : 24"
              class="mb-5"
              :key="item.fieldID"
            >
              <div v-if="!isEdit" class="flex">
                <div class="text-regular mr-2">{{ item.fieldName }}:</div>
                <div
                  v-if="isRichText(item)"
                  class="text-secondary"
                  v-html="fieldsValue[item.fieldID]?.value || ''"
                ></div>
                <div v-else class="text-secondary">
                  {{ fieldsValue[item.fieldID]?.value || '' }}
                </div>
              </div>
              <CommonField
                v-else
                v-model="editFieldsValue[item.fieldID]"
                :label="item.fieldName"
                :field-id="item.fieldID"
                :field-type-id="item.fieldTypeID"
                :list-choice="item.listChoice"
                :attributes="item.attributes || {}"
              ></CommonField>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </el-skeleton>
  </ReCard>
</template>

<script setup lang="ts">
import {
  FieldAuthorityEnum,
  FieldIdEnum,
  FieldTypeEnum,
} from '@/enums/commonEnum';
import { EditFieldsValue, FieldListItem, FieldsValue } from '../typing';

const CommonField = defineAsyncComponent(
  () => import('@/components/CommonField/index.vue'),
);

interface Props {
  fieldList: FieldListItem[];
  fieldsValue: FieldsValue;
  isLoading: boolean;
  isEdit: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  fieldList: () => [],
  fieldsValue: () => ({}),
  isLoading: false,
});

interface Emit {
  (e: 'change', data: EditFieldsValue): void;
}

const emit = defineEmits<Emit>();

const editFieldsValue = ref<EditFieldsValue>({});

const isRichText = (item: FieldListItem) => {
  return (
    FieldTypeEnum.MULTILINE_EDIT_BOX == item.fieldTypeID &&
    item.attributes?.SupportHTMLFormat
  );
};

const isShow = (item: FieldListItem) => {
  return (
    item.fieldID !== FieldIdEnum.TITLE &&
    item.fieldID !== FieldIdEnum.CURRENT_STATUS &&
    item.visibleToCustomer > FieldAuthorityEnum.HIDDEN
  );
};

const isOptionField = (item?: FieldListItem) => {
  return (
    item?.fieldTypeID == FieldTypeEnum.DROPDOWN_LIST ||
    item?.fieldTypeID == FieldTypeEnum.CHECKBOX ||
    item?.fieldTypeID == FieldTypeEnum.MULTIPLE_SELECTION_LISTBOX ||
    item?.fieldTypeID == FieldTypeEnum.COMBOBOX
  );
};

watch(
  () => props.fieldsValue,
  () => {
    props.fieldList.forEach((item) => {
      if (isOptionField(item)) {
        editFieldsValue.value[item.fieldID] =
          props.fieldsValue[item.fieldID]?.dbValue || '';
      } else {
        editFieldsValue.value[item.fieldID] =
          props.fieldsValue[item.fieldID]?.value || '';
      }
    });
  },
  { deep: true, immediate: true },
);

watch(
  () => editFieldsValue.value,
  (val) => {
    emit('change', val);
  },
  { deep: true },
);
</script>

<style lang="scss" scoped></style>
