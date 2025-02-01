<template>
  <teleport to="body">
    <transition name="el-zoom-in-top">
      <div
        id="contextMenu"
        class="menu fixed"
        v-if="modelValue"
        :style="{
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: `${width}px`,
        }"
      >
        <ul class="menu-list" v-for="(menu, index) in list" :key="index">
          <li class="menu-item" v-for="item in menu">
            <button
              class="menu-button menu-button--black group"
              @click="() => item.onClick(props.scope)"
              :style="{
                '--hoverColor': item.hoverColor ? item.hoverColor : '#3a3c42',
              }"
            >
              <svg-icon
                v-if="item.icon"
                class="text-[#898c94] mr-2 icon"
                :icon-class="item.icon"
                :size="18"
              ></svg-icon>
              <span class="title">{{ item.title }}</span>
              <svg-icon
                v-if="item.rightIcon"
                class="text-[#898c94] absolute right-2 icon"
                :icon-class="item.rightIcon"
                :size="18"
              ></svg-icon>
            </button>
            <ul
              class="menu-sub-list"
              :style="{ width: `${width}px` }"
              v-if="item.children?.length"
            >
              <li class="menu-item" v-for="child in item.children">
                <button
                  class="menu-button menu-button--black group"
                  @click="() => child.onClick(props.scope)"
                >
                  <svg-icon
                    v-if="child.icon"
                    class="text-[#898c94] mr-2 icon"
                    :icon-class="child.icon"
                    :size="18"
                  ></svg-icon>
                  <span class="title">{{ child.title }}</span>
                  <svg-icon
                    v-if="child.rightIcon"
                    class="text-[#898c94] absolute right-2 icon"
                    :icon-class="child.rightIcon"
                    :size="18"
                  ></svg-icon>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
const props = defineProps({
  width: {
    type: Number,
    default: 120,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Object,
    default: () => ({
      x: 0,
      y: 0,
    }),
  },
  menuList: {
    type: [Function, Array],
    default: () => [],
  },
  scope: {
    type: Object,
    default: () => ({}),
  },
});

const list = computed(() => {
  return typeof props.menuList === 'function'
    ? props.menuList(props.scope)
    : props.menuList;
});
</script>

<style lang="scss" scoped>
.menu {
  --color-bg-primary: #d0d6df;
  --color-bg-primary-offset: #f1f3f7;
  --color-bg-secondary: #fff;
  --color-text-primary: #3a3c42;
  --color-text-primary-offset: #898c94;
  --color-orange: #dc9960;
  --color-green: #1eb8b1;
  --color-purple: #657cc4;
  --color-black: var(--color-text-primary);
  --color-red: #d92027;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-secondary);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(#404040, 0.15);
  font-size: 14px;
  width: 100%;
}

.menu-list {
  margin: 0;
  display: block;
  padding: 8px;
  & + .menu-list {
    border-top: 1px solid #ddd;
  }
}
.menu-sub-list {
  display: none;
  padding: 8px;
  background-color: var(--color-bg-secondary);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(#404040, 0.15);
  position: absolute;
  left: 100%;
  right: 0;
  z-index: 100;
  width: 100%;
  top: 0;
  flex-direction: column;
  &:hover {
    display: flex;
  }
}

.menu-item {
  position: relative;
}

.menu-button {
  font: inherit;
  border: 0;
  padding: 8px 8px;
  padding-right: 36px;
  width: 100%;
  border-radius: 8px;
  text-align: left;
  display: flex;
  align-items: center;
  position: relative;
  background-color: var(--color-bg-secondary);
  &:hover {
    background-color: var(--color-bg-primary-offset);
    & + .menu-sub-list {
      display: flex;
    }
    .icon {
      color: var(--hoverColor);
    }
    .title {
      color: var(--hoverColor);
    }
  }
  /* svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    stroke: var(--color-text-primary-offset);
    &:nth-of-type(2) {
      margin-right: 0;
      position: absolute;
      right: 8px;
    }
  } */
}
</style>
