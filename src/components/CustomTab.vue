<template>
  <fieldset :style="styleVar">
    <label
      :for="'CustomTab' + item.name"
      v-for="(item, index) in list"
      :key="item.id"
    >
      <input
        type="radio"
        name="step"
        :id="'CustomTab' + item.name"
        :value="item.name"
        @click="setActive(item, index)"
      />
      <span class="whitespace-nowrap">{{ item.name }}</span>
    </label>

    <!-- The box that highlights the active selection -->
    <div class="selector">
      <!-- 
        made visible by 2 pseudo elements
        ::before
        ::after
      -->
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { ref, watch, computed, toRef, CSSProperties } from 'vue';

interface ListItem {
  name: string;
  id: number;
}

interface Props {
  bg: string;
  tabBg: string;
  list: Array<ListItem>;
  value: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  bg: 'rgba(0, 0, 0, 0.35)',
  tabBg: '#fff',
  list: () => [],
  value: 0,
});

const activeIndex = ref(0);

interface Emit {
  (e: 'change', item: ListItem): void;
  (e: 'update:value', id: number): void;
}
const emit = defineEmits<Emit>();

const valueRef = toRef(props, 'value');

watch(
  valueRef,
  (val) => {
    activeIndex.value = props.list.findIndex((item) => item.id == val);
  },
  { immediate: true },
);

interface Style extends CSSProperties {
  '--bg': string;
  '--tab-bg': string;
  '--count': number;
  '--active': number;
}

const styleVar = computed<Style>(() => {
  return {
    '--bg': props.bg,
    '--tab-bg': props.tabBg,
    '--count': props.list.length,
    '--active': activeIndex.value,
  };
});

function setActive(item: ListItem, index: number) {
  activeIndex.value = index;
  emit('change', item);
  emit('update:value', item.id);
}
</script>

<style lang="scss" scoped>
fieldset {
  border: none;
  /* display: flex; */
  display: grid;
  grid-template-columns: repeat(var(--count), 1fr);
  grid-template-rows: 100%;
  /* height: 55px; */
  width: fit-content;
  background-color: var(--bg);
  padding: 4px;
  border-radius: 7px;
  border: 1px solid var(--el-border-color);
  gap: 4px;

  // defines the location of the .selector

  .selector {
    // asign to the first column and first row
    grid-area: 1/1/2/2;

    height: 100%;
    width: 100%;
    border-radius: 6px;
    position: relative;
    pointer-events: none;

    // 2 pseudo elements visualize the selector
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--tab-bg);
      border-radius: inherit;
      transform: translateX(calc(var(--active) * (100% + 4px)));

      // ease-out-back
      transition: 0.4s transform cubic-bezier(0.28, 1.33, 0.64, 1);
    }

    // a delay on 1 of the pseudo elements creates the stretching effect
    &::before {
      transition-delay: 0.05s;
    }
  }
}

label {
  position: relative;
  z-index: 1;
  cursor: pointer;

  &:nth-child(1) {
    grid-area: 1/1/2/2;
  }
  &:nth-child(2) {
    grid-area: 1/2/2/3;
  }
  &:nth-child(3) {
    grid-area: 1/3/2/4;
  }
  &:nth-child(4) {
    grid-area: 1/4/2/4;
  }

  input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;

    &:checked ~ span {
      color: #000;
      opacity: 1;
    }

    &:not(:checked):hover {
      ~ span {
        opacity: 1;
      }
    }
  }

  span {
    padding: 5px 8px;
    height: 100%;
    border-radius: 4px;
    color: var(--el-text-color-primary);
    opacity: 0.6;
    font: 600 15px/1 'Inter';
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      0.1s opacity ease-in-out,
      0.1s color ease-in-out;
  }
}
</style>
