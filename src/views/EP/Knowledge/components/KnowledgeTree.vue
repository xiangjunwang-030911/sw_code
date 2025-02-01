<template>
  <el-card
    ref="cardRef"
    class="h-full"
    shadow="hover"
    :body-style="{ padding: '21px 11px' }"
  >
    <div class="border-b-light border-b flex justify-between items-center">
      <el-input v-model="search" placeholder="搜索目录" />
      <svg-icon
        v-if="!isSearchLoading && isExpand"
        icon-class="ep-tree-icon_collapse"
        class="cursor-pointer"
        :size="14"
        @click="handleExpand"
      ></svg-icon>
      <svg-icon
        v-if="!isSearchLoading && !isExpand"
        icon-class="ep-tree-icon_expand"
        class="cursor-pointer"
        :size="14"
        @click="handleExpand"
      ></svg-icon>
      <el-icon class="is-loading" v-if="isSearchLoading">
        <i-ep-loading />
      </el-icon>
    </div>
    <el-tree
      v-if="initTree"
      ref="treeRef"
      class="mt-4 overflow-y-auto overflow-x-hidden"
      :style="{ height: treeMaxHeight - 40 + 'px' }"
      node-key="id"
      :data="treeFolderList"
      :props="defaultProps"
      :load="loadNode"
      lazy
      :default-expand-all="isExpand"
      :default-expanded-keys="expandedKeyList"
      :render-content="renderContent"
      @node-click="handleNodeClick"
    >
      <template #default="{ data }">
        <div>{{ data.label }}</div>
      </template>
    </el-tree>
  </el-card>
</template>

<script setup lang="ts">
import { getKnowLedgeFolderTreeApi } from '@/api/ep/knowledge';
import { KnowledgeFolders } from '@/api/ep/knowledge/knowledgeModel';
import SvgIcon from '@/components/globalComponents/SvgIcon.vue';
import { useTableMaxHeight } from '@/hooks/tools/useTableMaxHeight';
import { useKnowledgeStore } from '@/store/modules/knowledge';
import { useServiceStore } from '@/store/modules/service';
import { useElementSize } from '@vueuse/core';
import { CardInstance, ElTree } from 'element-plus';
import Node from 'element-plus/es/components/tree/src/model/node';
import { debounce } from 'lodash-es';

const serviceStore = useServiceStore();
const knowledgeStore = useKnowledgeStore();

const search = ref('');
const cardRef = ref<CardInstance>();
const isExpand = ref(false);
const expandedKeyList = ref([1]);
const isSearchLoading = ref(false);
const treeRef = ref<InstanceType<typeof ElTree>>();
const initTree = ref(true);
const treeMaxHeight = ref(0);

const defaultProps = {
  children: 'childFolders',
  label: 'name',
};
interface Tree extends KnowledgeFolders {
  isLeaf: boolean;
}
const treeFolderList = ref<Tree[]>([]);

const size = reactive(useElementSize(cardRef));

const handleNodeClick = (data: Tree) => {
  knowledgeStore.changeCurrentFolderId(data.id);
};

const folderIconDict = (level: number) => {
  switch (true) {
    case level == 1:
      return 'ep-tree-icon_root';
    case level == 2:
      return 'ep-tree-icon_folder';
    case level >= 3:
      return 'ep-tree-icon_file';
    default:
      return '';
  }
};
const renderContent = (
  _arg1: string,
  {
    node,
    data,
  }: {
    node: Node;
    data: KnowledgeFolders;
  },
) => {
  const { level } = node;
  return h(
    'div',
    {
      class: 'w-full',
    },
    [
      h(
        'div',
        {
          class: 'flex items-center',
        },
        [
          h(SvgIcon, {
            iconClass: folderIconDict(level),
            class: 'mr-1',
            size: 15,
          }),
          h(
            'span',
            {
              style: {
                maxWidth: size.width - 20 - level * 24 + 'px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              },
              title: data.name,
            },
            data.name,
          ),
        ],
      ),
    ],
  );
};

const loadNode = async (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([
      {
        name: '知识库根目录',
        id: 1,
        childFolders: [],
        status: 'Open',
        childCount: 1,
        isLeaf: false,
      },
    ]);
  }
  const data = await getKnowLedgeFolderTree(node.data.id, '');
  resolve(data);
};

const getKnowLedgeFolderTree = async (
  ParentFolderID: number,
  keyWord: string = '',
) => {
  const res = await getKnowLedgeFolderTreeApi({
    ProjectID: serviceStore.getKnowledgeProjectId as number,
    ParentFolderID: ParentFolderID,
    keyWord: keyWord || '',
  });
  return (
    res?.knowledgeFolders.map((item) => ({
      ...item,
      isLeaf: item.childCount == 0,
    })) || []
  );
};

const handleExpand = () => {
  isExpand.value = !isExpand.value;
  initTree.value = false;
  setTimeout(() => {
    initTree.value = true;
  }, 300);
};

watch(
  () => search.value.trim(),
  debounce(async () => {
    isSearchLoading.value = true;
    const res = await getKnowLedgeFolderTree(1, search.value.trim());
    if (!search.value.trim()) {
      treeFolderList.value = [
        {
          name: '知识库根目录',
          id: 1,
          childFolders: res,
          status: 'Open',
          childCount: 1,
          isLeaf: false,
        },
      ];
    } else {
      treeFolderList.value = res;
    }
    isSearchLoading.value = false;
  }, 500),
);

onMounted(() => {
  nextTick(() => {
    useTableMaxHeight(treeMaxHeight, treeRef.value?.$el);
  });
});
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  box-shadow: none !important;
  padding-left: 0 !important;
}
:deep(.el-tree-node__content) {
  margin-bottom: 5px;
}
:deep(.el-tree-node__content:hover) {
  background-color: var(--el-menu-hover-bg-color) !important;
  border-radius: 5px;
  color: var(--el-color-primary);
}
:deep(.el-tree-node:focus > .el-tree-node__content) {
  background-color: var(--el-menu-hover-bg-color) !important;
  border-radius: 5px;
  color: var(--el-color-primary);
}
</style>
