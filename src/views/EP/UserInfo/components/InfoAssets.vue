<template>
  <el-card
    class="w-full mb-2 overflow-hidden mt-3 enter-x"
    :body-style="{
      padding: 0,
      margin: '0 16px 16px',
    }"
    shadow="hover"
  >
    <template #header>
      <div class="flex items-center justify-between pl-3 py-3.5 h-12">
        <div class="h-9 text-[14px] font-bold text-left">资产</div>
        <div class="flex flex-wrap items-center">
          <SearchBox
            v-model="searchValue"
            @update:modelValue="(value) => (searchValue = value)"
            @search="searchKey"
            @enter="searchKey"
            :minWidth="'w-[214px]'"
          />
          <!-- <svg-icon iconClass="common-icon_setting" alt="" /> -->
        </div>
      </div>
    </template>
    <el-skeleton :loading="tableLoading" :rows="4" :throttle="500">
      <Table
        class="pb-3"
        :header-cell-style="{
          height: '32px',
          padding: 0,
          lineHeight: '16px',
          textAlign: 'center',
          fontWeight: 600,
          border: 'none',
        }"
        :cell-style="{
          textAlign: 'center',
          borderBottomWidth: '0px',
          padding: '10px 0',
        }"
        :columns="columns"
        :data="assetInfoList"
        :max-height="269"
        @sort-change="handleSortChange"
      ></Table>

      <div class="flex justify-center items-center">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[5, 10, 15, 20]"
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
import { reactive, ref } from 'vue';
import { getAssetInfoListApi } from '@/api/ep/userInfo';
import { DataItem, AssetInfoListParam } from '@/api/ep/userInfo/userInfoModel';
import { useI18n } from 'vue-i18n';
const { t: $t } = useI18n();

interface Pagination {
  page: number;
  pageSize: number;
  total?: number;
}

const searchValue = ref('');
const pagination = ref<Pagination>({ page: 1, pageSize: 5 });

const columns: Table.Column[] = reactive([
  {
    label: $t('ep_home.asset_no'),
    prop: 'assetNo',
    sortable: 'custom',
    resizable: true,
  },
  {
    label: $t('ep_home.asset_name'),
    prop: 'assetName',
    sortable: 'custom',
    resizable: true,
  },
  {
    label: $t('ep_home.category'),
    prop: 'categoryName',
    sortable: 'custom',
    resizable: true,
  },
  {
    label: $t('ep_home.template'),
    prop: 'templateName',
    sortable: 'custom',
    resizable: true,
  },
  {
    label: $t('ep_home.inventory_status'),
    prop: 'inventoryStatus',
    sortable: 'custom',
    resizable: true,
  },
  {
    label: $t('ep_home.service_status'),
    prop: 'serviceStatus',
    sortable: 'custom',
    resizable: true,
  },
]);
const tableLoading = ref(false);
const assetInfoList = ref<DataItem[]>([]); //资产表格数据
let orderBy: string | null = null;

const searchKey = () => {
  if (searchValue.value.trim() !== '') {
    getAssetInfoList();
  }
};

const handleSortChange = ({
  prop,
  order,
}: {
  prop: string;
  order: 'ascending' | 'descending' | null;
}) => {
  orderBy =
    order === null
      ? null
      : order === 'ascending'
      ? prop + ' asc'
      : prop + ' desc';
  getAssetInfoList();
};

const handleSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  getAssetInfoList();
};

const handleCurrentChange = (page: number) => {
  pagination.value.page = page;
  getAssetInfoList();
};

const getAssetInfoList = async () => {
  tableLoading.value = true;
  const skip = (pagination.value.page - 1) * pagination.value.pageSize;
  const params: AssetInfoListParam = {
    $top: pagination.value.pageSize,
    $skip: skip,
    $count: true,
  };
  if (orderBy) {
    params.$orderby = orderBy;
  }

  if (searchValue.value) {
    params.$filter = `contains(assetName,'${searchValue.value.trim()}')`;
  }

  const result = await getAssetInfoListApi(params);
  tableLoading.value = false;
  pagination.value.total = result.count;
  assetInfoList.value = result.data;
};

watch(
  () => searchValue.value,
  (newValue) => {
    if (newValue.trim().length === 0) {
      getAssetInfoList();
    }
  },
);

onMounted(() => {
  getAssetInfoList();
});
</script>

<style scoped></style>
