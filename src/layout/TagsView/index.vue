<template>
  <el-tabs
    :model-value="activeName"
    class="el-tabs-wrapper"
    closable
    @tab-remove="handleRemove"
    @tab-click="handleClick"
  >
    <el-tab-pane
      v-for="item in tagsViewList"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    ></el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { storeToRefs } from 'pinia';
import type { TabsPaneContext, TabPaneName } from 'element-plus';

const route = useRoute();
const router = useRouter();
const tagsViewStore = useTagsViewStore();

const { tagsViewList, activeName, currentProject } = storeToRefs(tagsViewStore);

watch(
  () => currentProject.value,
  (val) => {
    tagsViewStore.initTagsViewList(val);
  },
);

const handleRemove = (name: TabPaneName) => {
  if (typeof name === 'string') {
    tagsViewStore.deleteTagsViewList({
      name,
      route: route,
    });
  }
};

const handleClick = (pane: TabsPaneContext) => {
  if (typeof pane.paneName === 'string') {
    router.push(pane.paneName);
  }
};
</script>
<style lang="scss" scoped>
.el-tabs-wrapper {
  height: 100%;

  :deep(.el-tabs__header) {
    border-bottom: none;
    margin: 0;
    height: 100%;
    .el-tabs__nav-wrap {
      height: 100%;
      .el-tabs__nav-scroll {
        height: 100%;
        display: flex;
        align-items: center;
        max-width: calc(100vw - 850px);
        min-width: 125px;
        .el-tabs__nav {
          border: none;
          height: 100%;
          display: flex;
          align-items: center;
          .el-tabs__active-bar {
            + .el-tabs__item {
              .is-icon-close {
                display: none !important;
              }
            }
          }
          .el-tabs__item {
            height: 100%;
            display: flex;
            align-items: center;
            border: none !important;
            .is-icon-close {
              display: none;
            }
            &.is-active {
              .is-icon-close {
                display: block;
              }
            }
            &:hover {
              .is-icon-close {
                display: block;
              }
            }
          }
        }
      }
      .el-tabs__nav-prev {
        height: 100%;
        display: flex;
        align-items: center;
      }
      .el-tabs__nav-next {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
