<template>
  <ReCard>
    <template #title>
      <div class="flex justify-between w-full">
        <span>知识库自动搜索结果</span>
        <el-button-group class="mr-4">
          <el-button type="default">
            <svg-icon
              icon-class="ep-event-icon_knowledge"
              :size="12"
              class="mr-1"
            ></svg-icon>
            <span class="text-xs">Search Knowledge</span>
          </el-button>
          <el-button type="default">
            <svg-icon
              icon-class="ep-event-icon_search"
              :size="12"
              class="mr-1"
            ></svg-icon>
            <span class="text-xs">Auto Search</span>
          </el-button>
        </el-button-group>
      </div>
    </template>
    <Table :columns="columns" :data="tableData" class="mt-4"></Table>
  </ReCard>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/globalComponents/SvgIcon.vue';

const tableData = ref([
  {
    ID: 'INC-649',
    title: 'Have your finger on',
    desc: 'TechExcel公司ServiceWi',
  },
]);
const columns: Table.Column[] = [
  {
    prop: 'ID',
    label: 'ID',
    sortable: true,
    render: ({ row }) => {
      return h('div', { class: 'flex items-center' }, [
        h(SvgIcon, { iconClass: 'ep-event-icon_knowledge_g', class: 'mr-1' }),
        h('span', null, row.ID),
      ]);
    },
  },
  {
    prop: 'title',
    label: '标题',
    sortable: true,
  },
  {
    prop: 'desc',
    label: '描述',
  },
];
</script>

<style lang="scss" scoped></style>
