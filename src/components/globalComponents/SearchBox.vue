<template>
  <div :class="`flex ${minWidth} ${responsiveWidth} ${extraClass}`">
    <div class="relative w-full">
      <el-input
        v-model="searchValue"
        :size="searchSize"
        :placeholder="placeholder"
        class="w-full"
        @input="handleChange"
        @keydown.enter="enter"
      >
        <template #suffix>
          <div
            class="min-w-[32px] leading-[32px] flex justify-center items-center cursor-pointer select-none text-gray-400 pr-[8px]"
          >
            |&nbsp;<span
              v-if="!searchIcon"
              @click="search"
              :class="`hover:text-${
                $route.path.match(/\/([a-zA-Z]+)\//)?.[1] === 'ep' ? 'ep' : ''
              }-theme`"
              >{{ searchBtn }}</span
            >
            <svg-icon
              v-if="searchIcon"
              @click="search"
              :iconClass="searchBtn"
              class="inline-box cursor-pointer"
            ></svg-icon>
          </div>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface Props {
  modelValue?: any;
  minWidth?: string;
  responsiveWidth?: string;
  extraClass: string;
  placeholder?: string;
  searchIcon?: boolean;
  searchBtn?: string;
  searchSize?: 'default' | 'small' | 'large';
}
defineOptions({
  name: 'SearchBox',
});

withDefaults(defineProps<Props>(), {
  minWidth: '',
  responsiveWidth: 'md-[340px]',
  extraClass: '',
  placeholder: '',
  searchIcon: false,
  searchBtn: '搜索',
  searchSize: 'default',
});

interface Emit {
  (e: 'update:modelValue', value: string): void;
  (e: 'search', data: string): void;
  (e: 'enter', data: string): void;
}
const emit = defineEmits<Emit>();

const searchValue = ref('');

const search = () => {
  emit('search', searchValue.value);
};
const handleChange = (value: string) => {
  emit('update:modelValue', value);
};
const enter = () => {
  emit('enter', searchValue.value);
};
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  padding-right: 0 !important;
}
:deep(.el-input__suffix) {
  width: auto;
}
</style>
