<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <el-checkbox v-model="isShowFolderChildren"
        >显示子文件夹中的条目</el-checkbox
      >
    </div>
    <Table
      ref="tableRef"
      :columns="columns"
      :data="tableData"
      :max-height="tableHeight"
      class="scrollBar-light2"
    >
    </Table>
    <div class="flex justify-center items-center mt-4">
      <el-pagination
        layout="total, prev, pager, next, sizes"
        :page-sizes="[10, 20, 30, 40]"
        :total="100"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/globalComponents/SvgIcon.vue';
import { useEventListener } from '@/hooks/events/useEventListener';
import { nextTick, onMounted, reactive, ref, h } from 'vue';
import { TableInstance } from 'element-plus';

const isShowFolderChildren = ref(false);
interface TableData {
  digest: string;
  knowledgeId: string;
  publisher: string;
  knowledgeStatus: string;
  viewCount: string;
}
const tableData: TableData[] = reactive([
  {
    digest: '薪酬福利声明',
    knowledgeId: '141',
    publisher: 'Frank Zeng',
    knowledgeStatus: '知识发布',
    viewCount: '10',
  },
]);
const columns: Table.Column[] = reactive([
  {
    type: 'selection',
    width: 80,

    resizable: true,
  },
  {
    label: '',
    width: 80,
    prop: 'digest',

    resizable: true,
    render: () =>
      h(SvgIcon, {
        iconClass: 'knowledge_folder_normal',
      }),
  },
  {
    label: '知识ID',
    prop: 'knowledgeId',

    resizable: true,
    sortable: true,
    width: 180,
  },
  {
    label: '知识上传人',
    prop: 'publisher',

    resizable: true,
    sortable: true,
    width: 200,
  },
  {
    label: '知识状态',
    prop: 'knowledgeStatus',

    resizable: true,
    sortable: true,
    width: 200,
  },
  {
    label: '浏览次数',
    prop: 'viewCount',

    sortable: true,
    minWidth: 120,
  },
]);

const tableHeight = ref(0);
const tableRef = ref<TableInstance>();

function handleTableHeight() {
  nextTick(() => {
    const { top } = tableRef.value?.$el.getBoundingClientRect();
    tableHeight.value = window.innerHeight - top - 60;
  });
}

onMounted(() => {
  useEventListener({
    name: 'resize',
    listener: () => {
      handleTableHeight();
    },
    immediate: true,
  });
});
</script>

<style lang="scss" scoped></style>
