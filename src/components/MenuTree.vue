<template>
  <div ref="tree" class="tree-main" :style="{ width: initWidth + 'px' }">
    <slot name="title" class="enter-x"></slot>
    <div v-if="isNeedHeader" class="filter-wrapper flex items-center enter-x">
      <el-input v-model="searchValue" placeholder="搜索" class="w-full">
        <template #suffix>
          <IEpSearch size="14"></IEpSearch>
        </template>
      </el-input>
      <div class="action-wrapper flex items-center ml-3">
        <svg-icon
          iconClass="filter_icon"
          size="24"
          class="ml-1 cursor-pointer"
        ></svg-icon>
        <svg-icon
          v-if="isNeedConstruction"
          iconClass="construction_icon"
          size="24"
          class="cursor-pointer"
        ></svg-icon>
        <svg-icon
          iconClass="add_icon"
          size="24"
          class="cursor-pointer"
        ></svg-icon>
        <svg-icon
          iconClass="tree_collapse_icon"
          size="24"
          class="cursor-pointer"
        ></svg-icon>
      </div>
    </div>
    <el-tree
      :data="treeList"
      class="mt-5 w-full tree-wrapper enter-x"
      :render-content="renderContent"
      :default-expand-all="true"
      v-bind="$attrs"
    ></el-tree>
    <div
      ref="resizeLine"
      class="resize-line"
      :style="{ right: resizeLineRight + 'px' }"
      @mousedown="handleMousedown"
    ></div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from './globalComponents/SvgIcon.vue';
import { debounce } from 'lodash-es';
import {
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  h as createElement,
} from 'vue';
import { useEventListener } from '@/hooks/events/useEventListener';
import type Node from 'element-plus/es/components/tree/src/model/node';

interface Props {
  isNeedConstruction?: boolean;
  isNeedHeader?: boolean;
  treeList?: TreeItem[];
  initWidth?: string | number;
}

interface TreeItem {
  label: string;
  folderTypeId: number;
  children: ChildrenItem[];
}

interface ChildrenItem {
  label: string;
  class?: string;
  selected?: boolean;
  folderTypeId?: number;
  children?: ChildrenItem[];
}

withDefaults(defineProps<Props>(), {
  isNeedConstruction: true,
  isNeedHeader: true,
  treeList: () => [
    {
      label: 'CW-SW Development Project(All)',
      folderTypeId: 1,
      children: [
        {
          label: 'CW/SW-11.0',
          folderTypeId: 2,
          children: [
            {
              label: 'leaf 1-1-1',
            },
            {
              label: 'leaf 1-1-2',
            },
          ],
        },
        {
          label: 'Model Project4',
          folderTypeId: 2,
          children: [
            {
              label: 'leaf 1-1-1',
            },
            {
              label: 'leaf 1-1-2',
            },
          ],
        },
        {
          label: '9.2-special patch for China银联',
          folderTypeId: 3,
          children: [
            {
              folderTypeId: 4,
              label: 'Beta Release',

              children: [
                {
                  label: '7009-1:Add Submit Botton',
                  folderTypeId: 5,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  initWidth: 300,
});

interface Emits {
  (e: 'onResize'): void;
}
const emit = defineEmits<Emits>();

const searchValue = ref('');
const titleMaxWidth = ref(999999);
const resizeLineRight = ref(0);
const resizeStart = ref(false);
const elWidth = ref(0);
const startX = ref(0);

const folderIconDict = (folderTypeId: number) => {
  switch (folderTypeId) {
    case 1:
      return 'folder_base';
    case 2:
      return 'folder_catalogue';
    case 3:
      return 'folder_catalogue2';
    case 4:
      return 'folder_release';
    case 5:
      return 'folder_task';
    default:
      return '';
  }
};

const renderContent = (
  h: typeof createElement,
  { node, data }: { node: Node; data: TreeItem },
) => {
  const { level } = node;
  return h(
    'div',
    {
      class: 'w-full my-2',
    },
    [
      h(
        'div',
        {
          class: 'flex items-center',
        },
        [
          h(SvgIcon, {
            iconClass: folderIconDict(data.folderTypeId),
            class: 'mr-1',
          }),
          h(
            'span',
            {
              style: {
                maxWidth: titleMaxWidth.value - level * 18 + 'px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              },
              title: data.label,
            },
            data.label,
          ),
        ],
      ),
    ],
  );
};

let instance = getCurrentInstance();

const proxy = () => {
  if (instance) {
    const { proxy } = instance;
    return proxy;
  }
  return null;
};

const enableTextSelect = () => {
  document.documentElement.style.setProperty('-webkit-user-select', 'text');
  document.documentElement.style.setProperty('-moz-user-select', 'text');
  document.documentElement.style.setProperty('-ms-user-select', 'text');
  document.documentElement.style.setProperty('user-select', 'text');
};
const disableTextSelect = () => {
  document.documentElement.style.setProperty('-webkit-user-select', 'none');
  document.documentElement.style.setProperty('-moz-user-select', 'none');
  document.documentElement.style.setProperty('-ms-user-select', 'none');
  document.documentElement.style.setProperty('user-select', 'none');
};

const handleMouseUp = () => {
  if (resizeStart.value) {
    resizeStart.value = false;
    const body: HTMLBodyElement | null = document.querySelector('body');
    if (body) {
      body.style.cursor = 'default';
    }
    enableTextSelect();
    nextTick(() => {
      elWidth.value = proxy()?.$el.clientWidth;
    });
  }
};

const handleMousedown = (e: MouseEvent) => {
  resizeStart.value = true;
  startX.value = e.x;
  disableTextSelect();
};

const handleMousemove = (e: Event) => {
  if (resizeStart.value) {
    const body: HTMLBodyElement | null = document.querySelector('body');
    if (body) {
      body.style.cursor = 'col-resize';
    }
    const moveX = startX.value - (e as MouseEvent).x;
    const instanceProxy = proxy();
    if (instanceProxy && instanceProxy.$el) {
      instanceProxy.$el.style.width = elWidth.value - Number(moveX) + 'px';
    }
    emit('onResize');
  }
};
const handleWidthChange = (width: number) => {
  titleMaxWidth.value = width - 40;
};

let resizeObserver: ResizeObserver | null = null;

const tree = ref(null);

const initResizeObserver = () => {
  elWidth.value = proxy()?.$el.clientWidth;
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const width = entry.contentRect.width;
      const debouncedHandleWidthChange = debounce(
        (newWidth) => handleWidthChange(newWidth),
        200,
      );
      debouncedHandleWidthChange(width);
    }
  });
  nextTick(() => {
    if (tree.value) {
      resizeObserver?.observe(tree.value);
    }
  });
};

onMounted(() => {
  initResizeObserver();
  useEventListener({
    name: 'mousemove',
    wait: 0,
    listener: handleMousemove,
  });
  useEventListener({
    name: 'mouseup',
    wait: 0,
    listener: handleMouseUp,
  });
});

const cleanupResizeObserver = () => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
};

onUnmounted(() => {
  cleanupResizeObserver();
});
</script>

<style lang="scss" scoped>
.tree-main {
  height: 100%;
  padding-right: 10px;
  position: relative;
  .resize-line {
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: var(--el-border-color);
    z-index: 4;
    cursor: col-resize;
    -ms-transition: background-color 0.3s ease-in;
    -o-transition: background-color 0.3s ease-in;
    -moz-transition: background-color 0.3s ease-in;
    -webkit-transition: background-color 0.3s ease-in;
    transition: background-color 0.3s ease-in;
    &:hover {
      width: 2px;
      background-color: var(--el-color-primary);
    }
  }
  .tree-wrapper {
    :deep(.ivu-tree-arrow) {
      padding-top: 3px;
    }
  }
  :deep(.module-item) {
    height: 30px;
    line-height: 30px;
    margin-bottom: 8px;
    padding: 0 12px;
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
  }
  :deep(.module-item.selected) {
    background-color: #fafafa;
    color: var(--el-color-primary);
  }
}
</style>
