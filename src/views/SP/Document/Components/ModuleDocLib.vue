<template>
  <DocWrapper title="模块文档库" @moreInfo="moreInfo">
    <template #btn>
      <div>
        <el-button type="primary" @click="createDoc">{{ `+ 新建` }}</el-button>
      </div>
    </template>
    <template #content>
      <div class="flex h-full pt-[10px] relative">
        <MenuTree
          :isNeedConstruction="false"
          :isNeedHeader="false"
          :tree-list="allModules"
          initWidth="200"
          ref="tree"
          @onResize="onResize"
          class="enter-x h-full"
        >
        </MenuTree>
        <DocumentList
          class="pl-4 absolute right-0"
          :style="{ width: rightWidth }"
        ></DocumentList>
      </div>
    </template>
  </DocWrapper>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  reactive,
  defineAsyncComponent,
  getCurrentInstance,
  nextTick,
} from 'vue';
import { useEventListener } from '@/hooks/events/useEventListener';
const DocWrapper = defineAsyncComponent(() => import('./DocWrapper.vue'));
const MenuTree = defineAsyncComponent(
  () => import('@/components/MenuTree.vue'),
);
const DocumentList = defineAsyncComponent(() => import('./DocmentList.vue'));

const tree = ref<InstanceType<typeof MenuTree> | null>(null);
const rightWidth = ref('');

const app = getCurrentInstance();

interface ModaleItem {
  label: string;
  folderTypeId: number;
  children: ChildrenItem[];
}

interface ChildrenItem {
  label: string;
  class: string;
  selected: boolean;
  folderTypeId: number;
}

const allModules: ModaleItem[] = reactive([
  {
    label: '所有模块',
    folderTypeId: 1,
    children: [
      {
        label: '事件管理',
        class: 'module-item',
        selected: false,
        folderTypeId: 2,
      },
      {
        label: '问题管理',
        class: 'module-item',
        selected: false,
        folderTypeId: 2,
      },
      {
        label: '变更管理',
        class: 'module-item',
        selected: false,
        folderTypeId: 2,
      },
      {
        label: '发布管理',
        class: 'module-item',
        selected: false,
        folderTypeId: 2,
      },
      {
        label: '项目管理',
        class: 'module-item',
        selected: false,
        folderTypeId: 2,
      },
      {
        label: '连续性管理',
        class: 'module-item',
        selected: false,
        folderTypeId: 2,
      },
      {
        label: '知识管理',
        class: 'module-item',
        selected: false,
        folderTypeId: 2,
      },
    ],
  },
]);

const createDoc = () => {
  console.log('新建');
};

const moreInfo = () => {
  console.log('模块文档库 更多');
};

const onResize = () => {
  nextTick(() => {
    if (app && app.proxy && tree.value) {
      rightWidth.value =
        app.proxy.$el.clientWidth - tree.value.$el.clientWidth - 50 + 'px';
    }
  });
};

const setRightWidth = () => {
  let interval: number | null = setInterval(() => {
    if (tree.value?.$el) {
      if (interval) clearInterval(interval);
      interval = null;
      onResize();
    }
  }, 200);
};

onMounted(() => {
  setRightWidth();
  useEventListener({
    name: 'resize',
    listener: onResize,
  });
});
</script>

<style lang="scss" scoped>
.module-item {
  height: 30px;
  line-height: 30px;
  margin-bottom: 8px;
  padding: 0 12px;
  cursor: pointer;
  &:hover {
    color: var(--el-color-primary);
  }
}
.module-item.selected {
  background-color: #fafafa;
  color: var(--el-color-primary);
}

:deep(.el-table th) {
  background-color: #fff;
}
</style>
