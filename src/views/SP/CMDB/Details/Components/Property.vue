<template>
  <div>
    <div class="pb-[24px] flex justify-between items-center">
      <el-checkbox v-model="onlyShowLink">只显示链接的资产</el-checkbox>
      <div class="flex items-center">
        <el-button class="mr-[8px]">新建</el-button>
        <el-button class="mr-[8px]">分派</el-button>
        <el-button class="mr-[8px]">新建链接</el-button>
        <svg-icon
          iconClass="settingIcon"
          size="24"
          className="cursor-pointer"
        ></svg-icon>
      </div>
    </div>
    <Table
      :columns="propertyColumns"
      :data="propertyData"
      class="scrollBar-light2"
    ></Table>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/globalComponents/SvgIcon.vue';
import { onMounted, reactive, ref, watch, h } from 'vue';
import { cloneDeep } from 'lodash-es';
const onlyShowLink = ref(false);
const propertyColumns: Table.Column[] = reactive([
  {
    label: '资产编号',
    prop: 'assetNo',
    width: 140,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center',
        },
        [
          h(SvgIcon, {
            iconClass: row.link ? 'link_icon' : 'setting_icon_2',
            size: '16',
            className: 'mr-2 cursor-pointer',
          }),
          h(
            'p',
            {
              class: {
                'text-[#CA9200]': row.link,
              },
            },
            row.assetNo,
          ),
        ],
      );
    },
  },
  {
    label: '名称',
    prop: 'name',
    minWidth: 200,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'p',
        {
          class: {
            'text-[#CA9200]': row.link,
          },
        },
        row.name,
      );
    },
  },
  {
    label: '状态',
    prop: 'status',
    width: 140,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'p',
        {
          class: {
            'text-[#CA9200]': row.link,
          },
        },
        row.status,
      );
    },
  },
  {
    label: '序列号',
    prop: 'serialNo',
    minWidth: 160,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'p',
        {
          class: {
            'text-[#CA9200]': row.link,
          },
        },
        row.serialNo,
      );
    },
  },
  {
    label: '存放位置',
    prop: 'position',
    minWidth: 140,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'p',
        {
          class: {
            'text-[#CA9200]': row.link,
          },
        },
        row.position,
      );
    },
  },
  {
    label: '资产模板名称',
    prop: 'assetTemplateName',
    minWidth: 120,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'p',
        {
          class: {
            'text-[#CA9200]': row.link,
          },
        },
        row.assetTemplateName,
      );
    },
  },
]);
let clonePropertyData: Property[] = [];
interface Property {
  assetNo: string;
  name: string;
  status: string;
  serialNo: string;
  position: string;
  assetTemplateName: string;
  link: boolean;
}
let propertyData: Property[] = reactive([
  {
    assetNo: '1532',
    name: '[1532]笔记本ThinkPad',
    status: '公用',
    serialNo: 'E90KBCV55456',
    position: '-',
    assetTemplateName: '笔记本',
    link: true,
  },
  {
    assetNo: '1532',
    name: '[1532]笔记本ThinkPad',
    status: '公用',
    serialNo: 'E90KBCV55456',
    position: '-',
    assetTemplateName: '笔记本',
    link: false,
  },
  {
    assetNo: '1532',
    name: '[1532]笔记本ThinkPad',
    status: '公用',
    serialNo: 'E90KBCV55456',
    position: '-',
    assetTemplateName: '笔记本',
    link: false,
  },
  {
    assetNo: '1532',
    name: '[1532]笔记本ThinkPad',
    status: '公用',
    serialNo: 'E90KBCV55456',
    position: '-',
    assetTemplateName: '笔记本',
    link: false,
  },
  {
    assetNo: '1532',
    name: '[1532]笔记本ThinkPad',
    status: '公用',
    serialNo: 'E90KBCV55456',
    position: '-',
    assetTemplateName: '笔记本',
    link: false,
  },
  {
    assetNo: '1532',
    name: '[1532]笔记本ThinkPad',
    status: '公用',
    serialNo: 'E90KBCV55456',
    position: '-',
    assetTemplateName: '笔记本',
    link: false,
  },
  {
    assetNo: '1532',
    name: '[1532]笔记本ThinkPad',
    status: '公用',
    serialNo: 'E90KBCV55456',
    position: '-',
    assetTemplateName: '笔记本',
    link: false,
  },
  {
    assetNo: '1532',
    name: '[1532]笔记本ThinkPad',
    status: '公用',
    serialNo: 'E90KBCV55456',
    position: '-',
    assetTemplateName: '笔记本',
    link: false,
  },
  {
    assetNo: '1532',
    name: '[1532]笔记本ThinkPad',
    status: '公用',
    serialNo: 'E90KBCV55456',
    position: '-',
    assetTemplateName: '笔记本',
    link: true,
  },
  {
    assetNo: '1532',
    name: '[1532]笔记本ThinkPad',
    status: '公用',
    serialNo: 'E90KBCV55456',
    position: '-',
    assetTemplateName: '笔记本',
    link: false,
  },
  {
    assetNo: '1532',
    name: '[1532]笔记本ThinkPad',
    status: '公用',
    serialNo: 'E90KBCV55456',
    position: '-',
    assetTemplateName: '笔记本',
    link: false,
  },
  {
    assetNo: '1532',
    name: '[1532]笔记本ThinkPad',
    status: '公用',
    serialNo: 'E90KBCV55456',
    position: '-',
    assetTemplateName: '笔记本',
    link: false,
  },
]);
watch(onlyShowLink, (val) => {
  if (val === false) propertyData = clonePropertyData;
  if (val === true)
    propertyData = clonePropertyData.filter((item) => item.link);
});
onMounted(() => {
  clonePropertyData = cloneDeep(propertyData);
});
</script>

<style lang="scss" scoped>
:deep(.el-table td) {
  height: 58px;
}
</style>
