<template>
  <div class="main">
    <el-table
      ref="tableRef"
      :data="tableData"
      :highlight-current-row="true"
      v-bind="$attrs"
      :border="true"
      @row-contextmenu="handleContextMenu"
    >
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :min-width="item.type ? 60 : minWidth"
        v-bind="item"
      >
        <template v-if="!item.type" #default="scope">
          <!-- 当有loading的显示骨架屏 -->
          <el-skeleton animated :loading="loading" :throttle="500">
            <template #template>
              <el-skeleton-item></el-skeleton-item>
            </template>

            <template #default>
              <RenderColumn
                v-if="item.render"
                :render="item.render"
                :scope="scope"
              />
              <span v-else>{{ scope.row[item.prop as string] }}</span>
            </template>
          </el-skeleton>
        </template>
      </el-table-column>
    </el-table>
    <ContextMenu
      ref="contextMenuRef"
      v-model="isShowContextMenu"
      :position="position"
      :width="menuWidth"
      :menuList="menuList"
      :scope="contextMenuScope"
    ></ContextMenu>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted } from 'vue';
import RenderColumn from './RenderColumn.vue';
import { onClickOutside } from '@vueuse/core';
import { MenuListItem } from './typing';
import { TableInstance } from 'element-plus';
defineOptions({
  name: 'Table',
});
const ContextMenu = defineAsyncComponent(
  () => import('@/components/ContextMenu.vue'),
);

interface Props {
  data: any[];
  columns: any[];
  minWidth?: string | number;
  loading?: boolean;
  menuList?: (param?: any) => MenuListItem[][] | ((param?: any) => []);
  enableContextMenu?: boolean;
  menuWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  columns: () => [],
  minWidth: 80,
  loading: false,
  menuList: () => [],
  enableContextMenu: false,
  menuWidth: 120,
});

const isShowContextMenu = ref(false);
const position = ref({ x: 0, y: 0 });
const loadingData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
const tableData = computed(() => {
  return props.loading
    ? props.data.length
      ? props.data
      : loadingData
    : props.data;
});
const contextMenuRef = ref(null);
const tableRef = ref<TableInstance>();
const contextMenuScope = ref({});

const calcContextMenuHeight = (list: MenuListItem[][]) => {
  let item = 0;
  list.forEach((element) => {
    item += element.length;
  });
  return item;
};

const handleContextMenu = async (row: any, column: any, event: MouseEvent) => {
  if (!props.enableContextMenu) {
    return;
  }
  event.preventDefault();
  tableRef.value!.setCurrentRow(row); //高亮行
  contextMenuScope.value = { row, column, event };
  isShowContextMenu.value = true;
  await nextTick();
  let { width, height } = document
    .getElementById('contextMenu')!
    .getBoundingClientRect();

  //解决因为动画无法获取高度
  const list = (
    typeof props.menuList === 'function'
      ? props.menuList({ row: {} })
      : props.menuList
  ) as MenuListItem[][];
  if (!height) {
    height = calcContextMenuHeight(list) * 37 + 30;
  }

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const x = event.x;
  const y = event.y;
  const menuX = x + width > screenWidth ? x - width : x;
  const menuY = y + height > screenHeight ? y - height : y;

  position.value = { x: menuX, y: menuY };
};

onMounted(() => {
  onClickOutside(contextMenuRef, () => {
    isShowContextMenu.value = false;
  });
});
</script>

<style lang="scss" scoped>
.main {
  :deep(.el-table__inner-wrapper) {
    .el-table__cell {
      border-right: none !important;
    }
    .el-table__header {
      .el-table__cell {
        &:not(:last-child):after {
          content: '';
          display: block;
          position: absolute;
          right: 0;
          width: 2px !important;
          height: 34% !important;
          cursor: col-resize;
          background-color: var(--el-border-color) !important;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }

  :deep(.el-table--border .el-table__inner-wrapper::after) {
    display: none;
  }
  :deep(.el-table th) {
    background: var(--el-fill-color-light) !important;
    .cell {
      font-size: 13px !important;
      color: var(--el-text-color-primary) !important;
    }
  }
}
</style>
