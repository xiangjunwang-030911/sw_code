<template>
  <div :class="isActive ? 'pr-[35px]' : 'pr-5'">
    <div class="search-wrapper">
      <div class="input-holder">
        <input
          :value="modelValue"
          @input="
            (e) =>
              emit('update:modelValue', (e.target as HTMLInputElement).value)
          "
          @keyup.enter="emit('search')"
          type="text"
          class="search-input"
          placeholder="输入关键字"
        />
        <el-tooltip
          v-if="explain && !isActive"
          :content="explain"
          placement="top"
        >
          <button class="search-icon" @click="searchToggle($event)">
            <span></span>
          </button>
        </el-tooltip>
        <button v-else class="search-icon" @click="searchToggle($event)">
          <span></span>
        </button>
      </div>
      <span class="close" @click="searchToggle($event)"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  modelValue?: string | number;
  explain?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  explain: '',
});

interface Emits {
  (e: 'update:modelValue', value: string): void;
  (e: 'search'): void;
}
const emit = defineEmits<Emits>();

const isActive = ref(false);

const searchToggle = (evt: MouseEvent) => {
  if (typeof props.modelValue === 'string') {
    if (isActive.value && props.modelValue.trim()) {
      emit('search');
    }
  }

  const container = (evt.target as HTMLElement).closest('.search-wrapper');
  if (!container) return;
  if (!container.classList.contains('active')) {
    container.classList.add('active');
    isActive.value = true;
    evt.preventDefault();
  } else if (
    container.classList.contains('active') &&
    !(evt.target as HTMLElement).closest('.input-holder')
  ) {
    isActive.value = false;
    container.classList.remove('active');
    // clear input
    if (props.modelValue) {
      emit('update:modelValue', '');
      emit('search');
    }
  }
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  position: relative;
}

.search-wrapper .input-holder {
  height: 32px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0);
  border-radius: 6px;
  position: relative;
  transition: all 0.3s ease-in-out;
}
.search-wrapper.active .input-holder {
  width: 200px;
  border-radius: 50px;
  /* background: rgba(0, 0, 0, 0.5); */
  border: 1px solid #dcdfe6;
  transition: all 0.5s cubic-bezier(0, 0.105, 0.035, 1.57);
}
.search-wrapper .input-holder .search-input {
  width: 100%;
  height: 15px;
  padding: 0px 70px 0 15px;
  opacity: 0;
  position: absolute;
  top: -2px;
  left: 0px;
  background: transparent;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-family: 'Open Sans', Arial, Verdana;
  font-size: 14px;
  line-height: 32px;
  color: #606266;
  transform: translate(0, 60px);
  transition: all 0.3s cubic-bezier(0, 0.105, 0.035, 1.57);
  transition-delay: 0.3s;
}
.search-wrapper.active .input-holder .search-input {
  opacity: 1;
  transform: translate(0, 10px);
}
.search-wrapper .input-holder .search-icon {
  /* border: 1px solid #ddd; */
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: var(--el-bg-color);
  padding: 0px;
  outline: none;
  position: relative;
  z-index: 2;
  float: right;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.search-wrapper.active .input-holder .search-icon {
  border: none;
  width: 45px;
  height: 30px;
}
.search-wrapper .input-holder .search-icon span {
  width: 18px;
  height: 22px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  transform: rotate(45deg);
  transition: all 0.4s cubic-bezier(0.65, -0.6, 0.24, 1.65);
}
.search-wrapper.active .input-holder .search-icon span {
  transform: rotate(-45deg);
}
.search-wrapper .input-holder .search-icon span::before,
.search-wrapper .input-holder .search-icon span::after {
  position: absolute;
  content: '';
}
.search-wrapper .input-holder .search-icon span::before {
  width: 2px;
  height: 7px;
  left: 8px;
  top: 15px;
  border-radius: 2px;
  background: var(--el-color-primary);
}
.search-wrapper .input-holder .search-icon span::after {
  width: 15px;
  height: 15px;
  left: 2px;
  top: 2px;
  border-radius: 16px;
  border: 2px solid var(--el-color-primary);
}
.search-wrapper .close {
  position: absolute;
  opacity: 0;
  z-index: 1;
  top: 5px;
  right: 20px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  transform: rotate(-180deg);
  transition: all 0.3s cubic-bezier(0.285, -0.45, 0.935, 0.11);
  transition-delay: 0.2s;
}
.search-wrapper.active .close {
  opacity: 1;
  right: -30px;
  transform: rotate(45deg);
  transition: all 0.6s cubic-bezier(0, 0.105, 0.035, 1.57);
  transition-delay: 0.5s;
}
.search-wrapper .close::before,
.search-wrapper .close::after {
  position: absolute;
  content: '';
  background: var(--el-color-primary);
  border-radius: 2px;
}
.search-wrapper .close::before {
  width: 3px;
  height: 17px;
  left: 10px;
  top: 4px;
}
.search-wrapper .close::after {
  width: 17px;
  height: 3px;
  left: 3px;
  top: 11px;
}
</style>
