<template>
  <div class="flex items-center">
    <el-popover
      :visible="visible"
      placement="bottom-start"
      :show-arrow="false"
      width="auto"
    >
      <template #reference>
        <el-button
          @click.stop="visible = !visible"
          :icon="Filter"
          class="w-[80px]"
          ref="ignoreElRef"
        >
          <span>过滤器</span>
        </el-button>
      </template>
      <div class="flex flex-col" ref="popoverWrapperRef">
        <!-- field -->
        <el-select
          v-model="field"
          :teleported="false"
          value-key="value"
          placeholder=""
          filterable
          @change="handleChangeField"
        >
          <el-option
            v-for="item in fields"
            :key="item.value"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>

        <!-- operator -->
        <el-select
          v-model="operator"
          placeholder=""
          :teleported="false"
          class="my-3"
          filterable
        >
          <el-option
            v-for="item in operators"
            :key="item.value"
            value-key="value"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>

        <!-- string -->
        <el-input
          v-if="isShowKeyWord && (field.type == String || field.type == Object)"
          v-model="keyword"
          placeholder=""
        ></el-input>
        <!-- number -->
        <el-input-number
          v-else-if="isShowKeyWord && field.type == Number"
          class="w-full"
          v-model.number="keyword"
          placeholder=""
        ></el-input-number>
        <!-- date -->
        <el-date-picker
          v-else-if="isShowKeyWord && field.type == Date"
          class="w-full"
          type="datetime"
          clearable
          v-model="keyword"
          :teleported="false"
          placeholder=""
        />
        <!-- select for id -->
        <el-select
          v-else-if="isShowKeyWord && field.type == Array"
          clearable
          :teleported="false"
          v-model="keyword"
          placeholder=""
        >
          <el-option
            v-for="item in field.list"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
        <el-button
          class="mt-3"
          type="primary"
          :icon="Plus"
          @click="handleAddFilter"
          >添加过滤器</el-button
        >
      </div>
    </el-popover>
    <el-tag
      v-for="tag in filterTags"
      :key="tag.value"
      size="large"
      class="mx-1"
      closable
      type=""
      @close="handleClose(tag)"
    >
      {{ `${tag.fieldLabel} ${tag.operatorLabel} ${formatValue(tag)}` }}
    </el-tag>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { Plus, Filter } from '@element-plus/icons-vue';
import { useMessage } from '@/hooks/components/useMessage';
import moment from 'moment';
import { onClickOutside } from '@vueuse/core';
import { cloneDeep } from 'lodash-es';

const props = defineProps({
  fields: {
    required: true,
    type: Array,
  },
});

const { createMessage } = useMessage();
const emit = defineEmits(['change']);

const popoverWrapperRef = ref(null);
const ignoreElRef = ref(null);
const visible = ref(false);

const operators = ref([
  {
    label: '等于',
    value: '$eq',
  },
  {
    label: '等于(大小写敏感)',
    value: '$eqi',
  },
  {
    label: '不等于',
    value: '$ne',
  },
  {
    label: '不等于(大小写敏感)',
    value: '$nei',
  },
  {
    label: '为空',
    value: '$null',
  },
  {
    label: '不为空',
    value: '$notNull',
  },
  {
    label: '小于',
    value: '$lt',
  },
  {
    label: '小于等于',
    value: '$lte',
  },
  {
    label: '大于',
    value: '$gt',
  },
  {
    label: '大于等于',
    value: '$gte',
  },
  {
    label: '包含',
    value: '$contains',
  },
  {
    label: '包含(大小写敏感)',
    value: '$containsi',
  },
  {
    label: '不包含',
    value: '$notContains',
  },
  {
    label: '不包含(大小写敏感)',
    value: '$notContainsi',
  },
  {
    label: '开始于',
    value: '$startsWith',
  },
  {
    label: '开始于(大小写敏感)',
    value: '$startsWithi',
  },
  {
    label: '结束于',
    value: '$endsWith',
  },
  {
    label: '结束于(大小写敏感)',
    value: '$endsWithi',
  },
]);
const operatorsClone = cloneDeep(operators.value);
const operator = ref(operators.value[0]);

const field = ref(props.fields[0]);

const keyword = ref('');

const filterTags = ref([]);

const isShowKeyWord = computed(() => {
  const flag = ['$null', '$notNull'].includes(operator.value.value);
  if (flag) {
    keyword.value = '';
  }
  return !flag;
});

const handleAddFilter = () => {
  if (!(field.value?.value && operator.value?.value)) {
    createMessage.error('字段和条件不能为空');
    return;
  }
  filterTags.value.push({
    fieldLabel: field.value.label,
    fieldValue: field.value.value,
    fieldType: field.value.type,
    operatorLabel: operator.value.label,
    operatorValue: operator.value.value,
    keyword: keyword.value,
    list: field.value.list,
    renderKeyword: field.value.render
      ? field.value.render(keyword.value, field.value.value)
      : null,
    isRelation: field.value.isRelation,
    id: new Date().getTime(),
  });
  visible.value = false;
  keyword.value = '';
};

const handleClose = (tag) => {
  filterTags.value = filterTags.value.filter((item) => item.id !== tag.id);
};

const formatValue = (tag) => {
  if (tag.fieldType == Date) {
    return moment(tag.keyword).format('YYYY-MM-DD HH:mm:ss');
  } else if (tag.fieldType == Array) {
    return tag.list.find((item) => item.value == tag.keyword).label;
  } else {
    return tag.keyword;
  }
};

//控制条件
watch(
  () => field.value,
  () => {
    if (field.value.type == Date || field.value.type == Number) {
      const filterList = [
        '$startsWith',
        '$startsWithi',
        '$endsWith',
        '$endsWithi',
        '$contains',
        '$containsi',
        '$notContains',
        '$notContainsi',
      ];
      operators.value = operatorsClone.filter(
        (item) => !filterList.includes(item.value),
      );
    } else if (field.value.type == Array) {
      operators.value = [
        {
          label: '等于',
          value: '$eq',
        },
      ];
    } else if (field.value.customOperators?.length) {
      operators.value = operatorsClone.filter((item) =>
        field.value.customOperators.includes(item.value),
      );
    } else {
      operators.value = [...operatorsClone];
    }
    keyword.value = '';
  },
  { deep: true, immediate: true },
);

watch(
  () => filterTags.value,
  () => {
    emit(
      'change',
      filterTags.value.map((item) => ({
        ...item,
        keyword: item.renderKeyword ? item.renderKeyword : item.keyword,
      })),
    );
  },
  { deep: true },
);

onClickOutside(popoverWrapperRef, (event) => (visible.value = false), {
  ignore: [ignoreElRef],
});
</script>

<style lang="scss" scoped></style>
