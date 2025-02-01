<template>
  <div>
    <Table
      class="scrollBar-light2 w-full"
      :data="moduleData"
      :columns="moduleColumns"
      :height="375"
    ></Table>
    <div class="w-full flex justify-center">
      <el-pagination
        class="mt-[8px]"
        layout="total, prev, pager, next, sizes"
        :page-sizes="[10, 20, 30, 40]"
        :total="100"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, resolveComponent, h } from 'vue';

interface ModuleDataItem {
  no: number;
  annex: string;
  type: string;
  uploader: string;
  uploadDate: string;
  open: number;
  link: string;
  star: boolean;
}
const moduleData: ModuleDataItem[] = reactive([
  {
    no: 1,
    annex: '列表.doc',
    type: 'doc',
    uploader: '罗军',
    uploadDate: '2021-08-27',
    open: 12,
    link: '657:需要设置申请账号',
    star: true,
  },
  {
    no: 1,
    annex: '列表.doc',
    type: 'doc',
    uploader: '罗军',
    uploadDate: '2021-08-27',
    open: 12,
    link: '657:需要设置申请账号',
    star: true,
  },
  {
    no: 1,
    annex: '列表.doc',
    type: 'doc',
    uploader: '罗军',
    uploadDate: '2021-08-27',
    open: 12,
    link: '657:需要设置申请账号',
    star: true,
  },
  {
    no: 1,
    annex: '列表.doc',
    type: 'doc',
    uploader: '罗军',
    uploadDate: '2021-08-27',
    open: 12,
    link: '657:需要设置申请账号',
    star: true,
  },
  {
    no: 1,
    annex: '列表.doc',
    type: 'doc',
    uploader: '罗军',
    uploadDate: '2021-08-27',
    open: 12,
    link: '657:需要设置申请账号',
    star: true,
  },
  {
    no: 1,
    annex: '列表.doc',
    type: 'doc',
    uploader: '罗军',
    uploadDate: '2021-08-27',
    open: 12,
    link: '657:需要设置申请账号',
    star: true,
  },
  {
    no: 1,
    annex: '列表.doc',
    type: 'doc',
    uploader: '罗军',
    uploadDate: '2021-08-27',
    open: 12,
    link: '657:需要设置申请账号',
    star: true,
  },
  {
    no: 1,
    annex: '列表.doc',
    type: 'doc',
    uploader: '罗军',
    uploadDate: '2021-08-27',
    open: 12,
    link: '657:需要设置申请账号',
    star: true,
  },
  {
    no: 1,
    annex: '列表.doc',
    type: 'doc',
    uploader: '罗军',
    uploadDate: '2021-08-27',
    open: 12,
    link: '657:需要设置申请账号',
    star: true,
  },
  {
    no: 1,
    annex: '列表.doc',
    type: 'doc',
    uploader: '罗军',
    uploadDate: '2021-08-27',
    open: 12,
    link: '657:需要设置申请账号',
    star: true,
  },
]);

const downLoad = (row: ModuleDataItem) => {
  console.log(row, 'downLoad');
};
const changeFavourite = (row: ModuleDataItem) => {
  console.log(row, '改变收藏状态');
};
const moduleColumns: Table.Column[] = reactive([
  {
    type: 'selection',
    width: 60,
  },
  {
    label: '序号',
    prop: 'no',
    width: 100,
    resizable: true,
    sortable: true,
  },
  {
    label: '附件名称',
    prop: 'annex',
    width: 240,
    resizable: true,
    sortable: true,
    render: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex items-center',
        },
        [
          h(resolveComponent('SvgIcon'), {
            iconClass: 'document_doc_icon',
            size: '16',
            className: 'mr-[8px]',
          }),
          h('p', {}, row.annex),
        ],
      );
    },
  },
  {
    label: '上传人',
    prop: 'uploader',
    width: 160,
    resizable: true,
    sortable: true,
  },
  {
    label: '上传时间',
    prop: 'uploadDate',
    width: 220,
    resizable: true,
    sortable: true,
  },
  {
    label: '打开次数',
    prop: 'open',
    width: 140,
    resizable: true,
    sortable: true,
  },
  {
    label: '链接的事件',
    prop: 'link',
    width: 300,
    resizable: true,
    sortable: true,
  },
  {
    minWidth: 100,
    resizable: true,

    render: ({ row }) => {
      return h(
        'div',
        {
          class: 'flex justify-end items-center text-black',
        },
        [
          h(resolveComponent('SvgIcon'), {
            iconClass: row.star ? 'solid_star_icon' : 'hollow_star_icon',
            size: '12',
            className: 'mr-[24px] cursor-pointer',
            onClick: () => {
              changeFavourite(row);
            },
          }),
          h(resolveComponent('SvgIcon'), {
            iconClass: 'sp_doc_download_icon',
            size: '24',
            className: ' cursor-pointer',
            fill: '#070707',
            onClick: () => {
              downLoad(row);
            },
          }),
        ],
      );
    },
  },
]);
</script>

<style lang="scss" scoped></style>
