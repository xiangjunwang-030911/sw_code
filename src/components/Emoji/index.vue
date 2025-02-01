<template>
  <el-popover
    :visible="isShowPopover"
    placement="top"
    :width="320"
    :show-arrow="false"
    :popper-style="{ padding: 0, borderRadius: '8px' }"
    trigger="click"
  >
    <template #reference>
      <svg-icon
        ref="ignoreElRef"
        iconClass="emoji"
        class="cursor-pointer"
        @click="isShowPopover = !isShowPopover"
      ></svg-icon>
    </template>
    <div role="dialog" class="emoji-dialog" ref="popoverWrapperRef">
      <header class="emoji-dialog--header" role="menu">
        <ul>
          <li
            v-for="category in Object.keys(emojis)"
            :key="category"
            :class="{ active: selectedKey === category }"
            @click="changeCategory(category as Key)"
          >
            <span
              class="emoji--item"
              @click="changeCategory(category as Key)"
              >{{ emojis[category as Key][0] }}</span
            >
          </li>
        </ul>
      </header>
      <div class="emoji--row">
        <h5 class="emoji-category--title">
          {{ selectedKey }}
        </h5>
        <span
          v-for="emoji in emojis[selectedKey]"
          :key="emoji"
          class="emoji--item cursor-pointer"
          track-by="$index"
          @click="handleClick(emoji)"
          >{{ emoji }}</span
        >
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
import emojis from './emojis.json';

type Key =
  | 'Smileys & Emotion'
  | 'People & Body'
  | 'Animals & Nature'
  | 'Food & Drink'
  | 'Travel & Places';

const ignoreElRef = ref(null);
const popoverWrapperRef = ref(null);

const selectedKey = ref<Key>('Smileys & Emotion');
const isShowPopover = ref(false);

const emit = defineEmits(['select']);
const changeCategory = (category: Key) => {
  selectedKey.value = category;
};
const handleClick = (emoji: string) => {
  emit('select', emoji);
  isShowPopover.value = false;
};
onClickOutside(popoverWrapperRef, () => (isShowPopover.value = false), {
  ignore: [ignoreElRef],
});
</script>
<style lang="scss" scoped>
.emoji-dialog {
  $space-smaller: 4px;
  $space-small: 8px;
  $space-one: 10px;
  $space-slab: 12px;
  $space-normal: 16px;
  $space-two: 20px;
  $space-medium: 24px;

  $font-size-small: 14px;
  $font-size-default: 16px;
  $font-size-medium: 18px;
  background: #fff;
  border-radius: $space-small;
  box-sizing: content-box;
  /* position: absolute;
  right: 0; */
  top: -22 * $space-one;
  width: 32 * $space-one;
  z-index: 1;

  &::before {
    bottom: -$space-slab;
    position: absolute;
    right: $space-two;
  }

  .emoji--item {
    cursor: pointer;
    background: transparent;
    border: 0;
    font-size: $font-size-medium;
    margin: 0;
    padding: 0;
  }

  .emoji--row {
    box-sizing: border-box;
    height: $space-one * 18;
    overflow-y: auto;
    padding: $space-smaller $space-normal;

    .emoji--item {
      float: left;
      margin: $space-smaller;
      line-height: 1.5;
    }
  }

  .emoji-category--title {
    color: #000;
    font-size: $font-size-small;
    font-weight: 500;
    line-height: 1.5;
    margin: 0;
    text-transform: capitalize;
  }

  .emoji-dialog--header {
    background-color: #3c4858;
    border-top-left-radius: $space-small;
    border-top-right-radius: $space-small;
    padding: 0 $space-smaller;

    ul {
      display: flex;
      list-style: none;
      overflow: hidden;
      margin: 0;
      padding: $space-smaller 0 0;

      > li {
        align-items: center;
        cursor: pointer;
        display: flex;
        height: 2.4 * $space-one;
        justify-content: center;
        padding: $space-smaller $space-small;
      }

      > .active {
        background: #fff;
        border-top-left-radius: $space-smaller;
        border-top-right-radius: $space-smaller;
      }
    }
  }
}
</style>
