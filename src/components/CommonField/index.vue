<template>
  <FileUpload
    v-if="fieldId === FieldIdEnum.UPLOAD"
    v-model="value"
    :label="label"
    :fieldId="fieldId"
  ></FileUpload>
  <DataGrid
    v-else-if="fieldId === FieldIdEnum.DATA_GRID"
    :label="label"
    :table-columns="tableColumns"
    :table-data="tableData"
  ></DataGrid>
  <MultilineEdit
    v-else-if="fieldTypeId === FieldTypeEnum.MULTILINE_EDIT_BOX"
    v-model="value"
    :label="label"
    :attributes="attributes"
    :fieldTypeId="fieldTypeId"
    :is-show-textarea-input="isShowTextareaInput"
  ></MultilineEdit>
  <CheckBox
    v-else-if="fieldTypeId === FieldTypeEnum.CHECKBOX"
    v-model="value"
    :label="label"
    :fieldTypeId="fieldTypeId"
    :list-choice="listChoice"
  ></CheckBox>
  <DatePicker
    v-else-if="fieldTypeId === FieldTypeEnum.DATE_TIME_FIELD"
    v-model="value"
    :label="label"
    :fieldTypeId="fieldTypeId"
  ></DatePicker>
  <Select
    v-else-if="fieldTypeId === FieldTypeEnum.DROPDOWN_LIST"
    v-model="value"
    :label="label"
    :fieldTypeId="fieldTypeId"
    :list-choice="listChoice"
  ></Select>
  <Combobox
    v-else-if="fieldTypeId === FieldTypeEnum.COMBOBOX"
    v-model="value"
    :label="label"
    :fieldTypeId="fieldTypeId"
    :list-choice="listChoice"
  ></Combobox>
  <MultipleSelect
    v-else-if="fieldTypeId === FieldTypeEnum.MULTIPLE_SELECTION_LISTBOX"
    v-model="value"
    :label="label"
    :fieldTypeId="fieldTypeId"
    :list-choice="listChoice"
  ></MultipleSelect>
  <StaticLabel
    v-else-if="fieldTypeId === FieldTypeEnum.STATIC_LABEL"
    v-model="value"
    :label="label"
    :fieldTypeId="fieldTypeId"
  ></StaticLabel>
  <Input
    v-else
    v-model="value"
    :label="label"
    :fieldTypeId="fieldTypeId"
  ></Input>
</template>

<script setup lang="ts">
import { FieldTypeEnum, FieldIdEnum } from '@/enums/commonEnum';
import { ChoiceItem } from '@/api/ep/userInfo/userInfoModel';
import { Attributes } from './typing';

const CheckBox = defineAsyncComponent(() => import('./Checkbox.vue'));
const FileUpload = defineAsyncComponent(() => import('./FileUpload.vue'));
const DataGrid = defineAsyncComponent(() => import('./DataGrid.vue'));
const MultilineEdit = defineAsyncComponent(() => import('./MultilineEdit.vue'));
const DatePicker = defineAsyncComponent(() => import('./DatePicker.vue'));
const Select = defineAsyncComponent(() => import('./Select.vue'));
const MultipleSelect = defineAsyncComponent(
  () => import('./MultipleSelect.vue'),
);
const Combobox = defineAsyncComponent(() => import('./Combobox.vue'));
const StaticLabel = defineAsyncComponent(() => import('./StaticLabel.vue'));
const Input = defineAsyncComponent(() => import('./Input.vue'));

interface Props {
  modelValue: any;
  label: string;
  fieldId: number;
  fieldTypeId: number;
  attributes?: Attributes;
  listChoice?: ChoiceItem[];
  isShowTextareaInput?: boolean;
  tableColumns?: Table.Column[];
  tableData?: any[];
}

const props = withDefaults(defineProps<Props>(), {
  attributes: () => ({}),
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss" scoped></style>
