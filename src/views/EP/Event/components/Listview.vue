<template>
  <el-card
    class="card mb-4 !mr-0"
    shadow="hover"
    v-if="!isHome ? true : tabledata.length"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <p class="border-b-0 font-semibold">{{ projectName }}</p>
        <div class="flex">
          <div class="flex justify-center items-center">
            <svg-icon
              iconClass="ep-home-EP_home_inProgress"
              className="ml-[27px] mr-[6px]"
              size="18"
            />
            <span class="pr-[7px] c-secondary">进行中</span>
            <countTo
              :class="'text-[28px] oppo-font'"
              :startVal="0"
              :endVal="openTotal"
              :duration="duration"
              :separator="separator"
              ref="CountToPower"
            ></countTo>
          </div>
          <div class="flex justify-center items-center">
            <svg-icon
              iconClass="ep-home-EP_home_finished"
              className="ml-[27px] mr-[6px]"
              size="18"
            />
            <span class="pr-[7px] c-secondary">已完成</span>
            <countTo
              :class="'text-[28px] oppo-font'"
              :startVal="0"
              :endVal="closeTotal"
              :duration="duration"
              :separator="separator"
              ref="CountToPower"
            ></countTo>
          </div>
        </div>
      </div>
    </template>
    <el-skeleton :loading="tableLoading" :rows="4" :throttle="500">
      <Table
        class="scrollBar-light2 mb-3"
        :columns="columns"
        :data="tabledata"
        :max-height="400"
        @row-click="handleRowClick"
        @sort-change="handleSortChange"
      ></Table>
      <div class="flex justify-center items-center" v-if="!isHome">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 25, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-skeleton>
  </el-card>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/globalComponents/SvgIcon.vue';
import { ref } from 'vue';
import { getListColumnsApi, getListDataApi } from '@/api/ep/event';
import { FieldTypeEnum } from '@/enums/commonEnum';
import moment from 'moment';
import { useAuthStore } from '@/store/modules/auth';
import { ListColumnsApiResult } from '@/api/ep/event/eventModel';
import { useTagsViewStore } from '@/store/modules/tagsView';
// import type { TableColumnCtx } from 'element-plus'

interface Props {
  projectName: string;
  projectId: number;
  selectedStatus: number;
  isHome: boolean;
}
interface Pagination {
  page?: number;
  pageSize?: number;
  total?: number;
}

const props = withDefaults(defineProps<Props>(), {
  projectName: '',
  projectId: 0,
  isHome: false,
});

const authStore = useAuthStore();
const tagsViewStore = useTagsViewStore();
const router = useRouter();
const route = useRoute();

const duration = 1000;
const openTotal = ref(60);
const closeTotal = ref(60);
const separator = ref('');
const columns = ref<Table.Column[]>([]);
const pagination = ref<Pagination>({ page: 1, pageSize: 10 });
const tabledata = ref<any[]>([]);
const tableLoading = ref(false);
let sortBy = 401;
let orderBy = 1;

const handleRowClick = (row: any) => {
  router
    .push({
      path: '/ep/event/details',
      query: { id: row[401], projectId: props.projectId },
    })
    .then(() => {
      tagsViewStore.addTagsViewList({
        title: `事件-${row[401]}`,
        name: `/ep/event/details?id=${row[401]}&projectId=${props.projectId}`,
        meta: route.meta,
      });
    });
};

const handleSortChange = ({
  prop,
  order,
}: {
  prop: string;
  order: 'ascending' | 'descending' | null;
}) => {
  sortBy = order ? +prop : 401;
  orderBy = order === null ? 1 : order === 'ascending' ? 1 : 0;
  getTableData();
};

const handleSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  getTableData();
};

const handleCurrentChange = (page: number) => {
  pagination.value.page = page;
  getTableData();
};

const renderDict = (row: any, column: any, item: ListColumnsApiResult) => {
  if (item.fieldType == FieldTypeEnum.DATE_TIME_FIELD && row[column.property]) {
    return h(
      'span',
      null,
      moment(Number(row[column.property])).format('YYYY-MM-DD HH:mm'),
    );
  } else if (item.fieldID == 401) {
    return h('div', { class: 'flex items-center' }, [
      h(SvgIcon, { iconClass: 'ep-common-event', class: 'mr-2 text-white' }),
      h('span', null, row[column.property] || null),
    ]);
  }

  return h('span', null, row[column.property] || null);
};

const getListColumns = async () => {
  const res = await getListColumnsApi({
    projectId: props.projectId,
    userId: authStore.getUserId,
  });
  columns.value = res.map((item) => ({
    prop: item.fieldID.toString(),
    label: item.fieldName,
    sortable: 'custom',
    render: ({ row, column }) => renderDict(row, column, item),
  }));
};

const getTableData = async () => {
  tableLoading.value = true;
  const res = await getListDataApi({
    projectId: props.projectId,
    userIds: '80',
    sortBy,
    orderBy,
    statusId: props.selectedStatus,
    pageNumber: pagination.value.page,
    pageSize: pagination.value.pageSize,
  });
  openTotal.value = res.opentotal;
  closeTotal.value = res.closetotal;
  pagination.value.total = res.total;
  tabledata.value =
    res.items?.map((item) => {
      let map: any = {};
      item.values.forEach((el) => (map[el.id] = el.value));
      return map;
    }) || [];
  tableLoading.value = false;
};

watch(
  () => props.selectedStatus,
  () => {
    getTableData();
  },
);

onMounted(() => {
  getListColumns();
  getTableData();
});
</script>

<style lang="scss" scoped>
.card {
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
.oppo-font {
  line-height: 1 !important;
}
</style>
