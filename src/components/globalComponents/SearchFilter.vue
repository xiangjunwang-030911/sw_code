<template>
  <div class="action-wrapper flex items-center justify-between">
    <div class="flex items-center enter-x">
      <slot name="common"></slot>
      <SearchInput
        class="ml-5"
        v-model="searchValue"
        @search="handleSearch"
      ></SearchInput>
      <CustomFilter
        :fields="fields"
        @change="handleFilterChange"
      ></CustomFilter>
    </div>
    <!-- 占位元素 -->
    <div class="w-1 h-[32px]"></div>
    <div class="flex items-center enter-x">
      <svg-icon
        iconClass="arrange_group_icon1"
        className="cursor-pointer ml-1 enter-x"
        size="23"
      ></svg-icon>
      <svg-icon
        iconClass="arrange_group_icon2"
        className="cursor-pointer enter-x"
        size="23"
      ></svg-icon>
      <svg-icon
        iconClass="arrange_group_icon3"
        className="cursor-pointer enter-x"
        size="23"
      ></svg-icon>
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineAsyncComponent } from 'vue';
defineOptions({
  name: 'SearchFilter',
});

const SearchInput = defineAsyncComponent(() => import('../SearchInput.vue'));
const CustomFilter = defineAsyncComponent(() => import('../CustomFilter.vue'));

const props = defineProps({
  fields: {
    type: Array,
    default: () => [{}],
  },
  explain: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['add', 'change']);

const organization = ref('');
const principal = ref('');
const status = ref('');
const searchValue = ref('');

const filters = ref({});

const handleAdd = () => {
  emit('add');
};

const handleSearch = () => {
  emit('change', {
    _q: searchValue.value,
    filters: filters.value,
  });
};

const formatKeyword = (item) => {
  if (item.isRelation) {
    return {
      [item.isRelation]: {
        [item.operatorValue]: item.keyword,
      },
    };
  } else if (item.fieldType == Object) {
    return item.keyword;
  } else {
    return {
      [item.operatorValue]: item.keyword,
    };
  }
};

const handleFilterChange = (filterList) => {
  if (filterList.length) {
    filters.value.$and = [
      ...filterList.map((item) => ({
        [item.fieldValue]: formatKeyword(item),
      })),
    ];
  } else {
    filters.value = {};
  }
  emit('change', {
    _q: searchValue.value,
    filters: filters.value,
  });
};
</script>

<style lang="scss" scoped>
.line {
  &::after {
    display: block;
    content: '';
    width: 1px;
    border: 0.5px solid #eeeff2;
    height: 20px;
  }
}
</style>
