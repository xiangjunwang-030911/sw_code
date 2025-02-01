<template>
  <div class="scrollBar-light">
    <div class="pt-[16px] pb-[16px] ml-[32px] flex items-center relative">
      <span class="min-w-[60px] h-4 font-semibold leading-4">{{
        currentTitle
      }}</span>
      <span
        class="min-w-[120px] h-4 font-normal leading-4 ml-[22px] text-regular"
        >{{ currentDesc }}</span
      >
      <span
        class="min-w-[24px] h-4 font-normal leading-4 absolute right-[77px] cursor-pointer"
        @click="submit"
        >提交</span
      >
      <svg-icon
        iconClass="EP_add_submit"
        className="absolute right-[48px] cursor-pointer"
        size="19"
        @click="submit"
      />
    </div>

    <el-card class="py-8 pr-16 pl-9 mx-8 enter-x" shadow="hover">
      <el-skeleton animated :throttle="500" :count="6" :loading="isLoading">
        <div class="flex items-center flex-wrap">
          <el-tooltip
            :content="`目标状态“${item.nextStatusName}”`"
            placement="top"
            v-for="(item, index) in flowList"
            :key="item.statusId"
          >
            <div
              class="mt-2 px-5 py-1 border-2 w-fit rounded mr-2 cursor-pointer"
              :class="[
                item.nextStatusIfClosed > 0
                  ? 'border-[#FA6400] text-[#FA6400]'
                  : 'border-theme text-theme',
                item.selected
                  ? 'bg-[var(--el-color-primary)] text-[var(--el-color-white)]'
                  : 'bg-default text-theme',
              ]"
              @click="onClick(index)"
            >
              {{ item.transitionName }}
            </div>
          </el-tooltip>
        </div>
        <el-form class="p-5" :model="form" :label-width="100">
          <el-row>
            <template v-for="item in fieldList" :key="item.uiFieldID">
              <el-col
                class="flex justify-start"
                :span="item.width == 1 ? 12 : 24"
              >
                <CommonField
                  class="text-secondary font-semibold text-[#505050] w-full items-center"
                  v-model="form[item.fieldID]"
                  :label="labelName(item.fieldName)"
                  :fieldId="item.fieldID"
                  :attributes="item.attributes || {}"
                  :fieldTypeId="item.fieldTypeID"
                  :list-choice="item.listChoice"
                  :table-columns="columns"
                  :table-data="tableData"
                ></CommonField>
              </el-col>
            </template>
          </el-row>
        </el-form>
      </el-skeleton>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { h, computed, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import SvgIcon from '@/components/globalComponents/SvgIcon.vue';
import { ElInput } from 'element-plus';
import {
  getEventAddFieldsApi,
  getDetailsFieldsApi,
  getFieldChoiceListApi,
  getEventDetailsFlowApi,
  addEventApi,
} from '@/api/ep/event';
import { FieldListItem } from './Details/typing';
import { uniqBy } from 'lodash-es';
import {
  FieldAuthorityEnum,
  FieldTypeEnum,
  FieldIdEnum,
} from '@/enums/commonEnum';
import {
  Field,
  AddEventParams,
  IncidentPostFields,
  EventDetailsFlowApiResult,
} from '@/api/ep/event/eventModel';
import { ChoiceItem } from '@/api/ep/userInfo/userInfoModel';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { useI18n } from 'vue-i18n';
import { MenuGroupEnum } from '@/enums/projectEnum';

const router = useRouter();
const route = useRoute();
const tagsViewStore = useTagsViewStore();
const { t } = useI18n();

const projectId = Number(route.query.projectId);
const templateId = Number(route.query.templateId);

const form: Record<number, string | number | number[]> = reactive({});

const columns = reactive([
  {
    label: 'No',
    prop: 'index',
    width: 80,
    render: ({ $index }: { $index: number }) => {
      return h('span', $index + 1);
    },
  },
  {
    label: '公司',
    prop: 'company',
    render: ({ row }: { row: any }) => {
      return h(ElInput, {
        modelValue: row.company,
        onInput: (value) => {
          row.company = value;
        },
      });
    },
  },
  {
    label: '部门',
    prop: 'department',
    render: ({ row }: { row: any }) => {
      return h(ElInput, {
        modelValue: row.department,
        onInput: (value) => {
          row.department = value;
        },
      });
    },
  },
  {
    label: '设备号',
    prop: 'tel',
    render: ({ row }: { row: any }) => {
      return h(ElInput, {
        modelValue: row.tel,
        onInput: (value) => {
          row.tel = value;
        },
      });
    },
  },
  {
    label: '座机号',
    prop: 'landline',
    render: ({ row }: { row: any }) => {
      return h(ElInput, {
        modelValue: row.landline,
        onInput: (value) => {
          row.landline = value;
        },
      });
    },
  },
  {
    label: '',
    width: 80,
    render: ({ $index }: { $index: number }) => {
      return h(SvgIcon, {
        class: 'flex items-center cursor-pointer',
        iconClass: 'EP_add_add',
        onClick: () => {
          add($index);
        },
      });
    },
  },
]);

let defaultValueFields: Field[] = [];
const fieldList = ref<FieldListItem[]>([]);
const isLoading = ref(false);
const flowList = ref<EventDetailsFlowApiResult[]>([]);

const currentTitle = String(route.query.currentTitle);

const currentDesc = String(route.query.currentDesc);

const labelName = computed(() => {
  return (name: string) => {
    return name + ': ';
  };
});

const tableData = reactive([
  {
    company: '18',
    department: 'New York',
    tel: '180 000 000 00',
    landline: '180 000 000 00',
  },
]);

const add = (index: number) => {
  tableData.splice(index + 1, 0, {
    company: '',
    department: '',
    tel: '',
    landline: '',
  });
};

const getEventAddFields = async () => {
  isLoading.value = true;
  const result = await getEventAddFieldsApi({
    ProjectID: projectId,
    TemplateID: templateId,
    OperationType: 6,
  });
  defaultValueFields = result.fields;
  const field = result.fields.find(
    (item) => item.id === FieldIdEnum.EVENT_TICKET,
  );
  if (field && field.dbValue && typeof field.dbValue === 'number') {
    getDetailsFields(field.dbValue);
  }

  let statusValue = 0;
  result.fields.map((item) => {
    if (item.id == FieldIdEnum.CURRENT_STATUS) {
      statusValue = item.dbValue as number;
    }
  });
  if (!statusValue) {
    statusValue = result.oldStatusID;
  }
  getEventFlow(statusValue);
};

const getDetailsFields = async (fieldId: number) => {
  const res = await getDetailsFieldsApi({
    projectId: projectId,
  });
  const guiPageIDList = res.stmartIssueTypePages
    .filter((item) => item.incidentTypeID == fieldId)
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
    const existItem = (customField || sysField) as FieldListItem;
    if (!sysField && !customField) {
      continue;
    }
    existItem.width = item.width;
    existItem.height = item.height;
    existItem.tabOrder = item.tabOrder;
    fieldList.value = [...fieldList.value, existItem];
  }
  fieldList.value = uniqBy(fieldList.value, 'fieldID');
  fieldList.value.sort((a, b) => a.tabOrder - b.tabOrder);
  fieldList.value = fieldList.value.filter(
    (item) => item.visibleToCustomer > FieldAuthorityEnum.HIDDEN,
  );
  getFieldChoiceList();
};

const getFieldChoiceList = async () => {
  let getChoicesQueue: Promise<ChoiceItem[]>[] = [];
  const dropDownFieldList = fieldList.value.filter(
    (item) =>
      item.fieldTypeID === FieldTypeEnum.DROPDOWN_LIST ||
      item.fieldTypeID === FieldTypeEnum.CHECKBOX ||
      item.fieldTypeID === FieldTypeEnum.COMBOBOX ||
      item.fieldTypeID === FieldTypeEnum.MULTIPLE_SELECTION_LISTBOX,
  );
  dropDownFieldList.forEach((item) => {
    getChoicesQueue.push(getFieldChoiceListApi(projectId, item.fieldID));
  });
  const FieldChoiceList = await Promise.all(getChoicesQueue);
  dropDownFieldList.map((field, index) => {
    field.listChoice = FieldChoiceList[index];
    return field;
  });
  fieldList.value.forEach((field) => {
    const findField = dropDownFieldList.find(
      (dropField) => dropField.fieldID === field.fieldID,
    );
    if (findField) {
      field.listChoice = findField.listChoice;
    }
  });
  setFormDefaultValue();
};

const setFormDefaultValue = () => {
  fieldList.value.forEach((field) => {
    if (
      (field.fieldTypeID === FieldTypeEnum.CHECKBOX ||
        field.fieldTypeID === FieldTypeEnum.MULTIPLE_SELECTION_LISTBOX) &&
      field.fieldID !== FieldIdEnum.DATA_GRID
    ) {
      const defaultValue = getFieldDefaultValueArr(field.fieldID);
      form[field.fieldID] = defaultValue;
    } else if (field.fieldID === FieldIdEnum.DATA_GRID) {
      form[field.fieldID] = [];
    } else {
      const defaultValue = getFieldDefaultValue(
        field.fieldID,
        field.fieldTypeID,
      );
      form[field.fieldID] = defaultValue;
    }
  });
};

const getFieldDefaultValueArr = (fieldId: number): number[] => {
  const defaultFieldArr = defaultValueFields.filter(
    (item) => item.id === fieldId,
  );
  if (defaultFieldArr.length) {
    const defaultValueArr: number[] = [];
    defaultFieldArr.forEach((item) => {
      if (item.dbValue) {
        defaultValueArr.push(item.dbValue as number);
      }
    });
    return defaultValueArr;
  } else {
    return [];
  }
};

const getFieldDefaultValue = (fieldId: number, fieldTypeId: number) => {
  const defaultField = defaultValueFields.find((item) => item.id === fieldId);
  if (defaultField) {
    if (
      defaultField.dbValue &&
      (fieldTypeId === FieldTypeEnum.COMBOBOX ||
        fieldTypeId === FieldTypeEnum.DROPDOWN_LIST)
    ) {
      return defaultField.dbValue;
    } else {
      const value = defaultField.value;
      return value ? value : '';
    }
  } else {
    return '';
  }
};

const getEventFlow = async (statusValue: number) => {
  const res = await getEventDetailsFlowApi({
    projectId: Number(route.query.projectId),
    crntStatusID: statusValue,
  });
  res.forEach((item) => (item.selected = false));
  flowList.value = res;
  isLoading.value = false;
};

const onClick = (index: number) => {
  flowList.value.forEach((item, itemIndex) => {
    if (itemIndex === index) {
      item.selected = !item.selected;
    } else {
      item.selected = false;
    }
  });
};

const submit = async () => {
  const fieldArr: IncidentPostFields[] = [];
  const titleField = fieldList.value.find((item) => item.fieldName === '标题');
  for (const key in form) {
    const fieldId = Number(key);
    if (fieldId === titleField?.fieldID) continue;
    const formValue = form[key];
    let fieldDataValue: string | number;
    if (Array.isArray(formValue)) {
      fieldDataValue = formValue.join(',');
    } else {
      fieldDataValue = formValue;
    }
    const fieldData: IncidentPostFields = {
      FieldID: fieldId,
      Value: fieldDataValue,
    };
    fieldArr.push(fieldData);
  }
  let name = '';
  if (titleField) {
    const titleValue = form[titleField.fieldID];
    if (typeof titleValue === 'string') {
      name = titleValue;
    }
  }
  const findFlow = flowList.value.find((item) => item.selected);
  const lastTransitionId = findFlow === undefined ? 0 : findFlow.transitionId;
  const params: AddEventParams = {
    ProjectID: projectId,
    TemplateID: templateId,
    OperationType: 1,
    Name: name,
    LastTransitionID: lastTransitionId,
    Fields: fieldArr,
  };

  await addEventApi(params);
  router.push({ path: '/ep/event' }).then(() => {
    tagsViewStore.addTagsViewList({
      title: t('layout.event_list'),
      name: '/ep/event',
      group: MenuGroupEnum.MODULE,
      meta: route.meta,
    });
  });
};

const initData = () => {
  getEventAddFields();
};

onMounted(() => {
  initData();
});
</script>

<style lang="scss" scoped></style>
