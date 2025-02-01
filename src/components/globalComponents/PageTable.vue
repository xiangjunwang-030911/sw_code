<template>
  <div>
    <Table
      ref="tableRef"
      :loading="loading"
      v-bind="$attrs"
      :data="tableData"
      :height="tableHeight ? tableHeight : 'auto'"
      class="mt-3 enter-x"
    >
    </Table>
    <div class="mt-3 flex items-center justify-center">
      <el-pagination
        v-model:current-page="pageNumber"
        v-model:page-size="pageSize"
        :page-sizes="[25, 50, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { request } from '@/utils/axios';
import { useEventListener } from '@/hooks/events/useEventListener';
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
defineOptions({
  name: 'PageTable',
});
const props = defineProps({
  api: {
    type: String,
    default: '',
  },
  apiParams: {
    type: Object,
    default: () => ({}),
  },
  autoHeight: {
    type: Boolean,
    default: false,
  },
});

const tableRef = ref(null);
const tableHeight = ref(null);
const loading = ref(false);
const pageNumber = ref(1);
const pageSize = ref(25);
const total = ref(0);
let tableData = [];

const handleTableHeight = async () => {
  await nextTick();
  const el = tableRef.value.$el ? tableRef.value.$el : tableRef.value;
  const { top } = el.getBoundingClientRect();
  tableHeight.value = window.innerHeight - top - 70;
};

const getList = async (params = {}) => {
  if (props.api) {
    loading.value = true;
    const res = await request.post(
      {
        url: props.api,
        params: {
          ...props.apiParams,
          ...params,
          pageNumber: pageNumber.value,
          pageSize: pageSize.value,
        },
      },
      {
        errorMessageMode: 'modal',
      },
    );
    tableData = res.data || [];
    loading.value = false;
  }
};

watch(
  () => props.apiParams,
  () => getList(),
  { deep: true },
);

const handleCurrentChange = (page) => {
  getList({
    ...props.apiParams,
    pagination: {
      page: page,
      pageSize: pagination.pageSize,
    },
  });
};

const handleSizeChange = (size) => {
  getList({
    ...props.apiParams,
    pagination: {
      page: 1,
      pageSize: size,
    },
  });
};

onMounted(async () => {
  props.autoHeight &&
    useEventListener({
      name: 'resize',
      listener: () => {
        handleTableHeight();
      },
      immediate: true,
    });
  await getList();
});

defineExpose({
  getList,
});
</script>

<style lang="scss" scoped></style>
