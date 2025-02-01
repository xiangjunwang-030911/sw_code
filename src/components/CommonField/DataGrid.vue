<template>
  <el-form-item :label="label">
    <div class="w-full">
      <Table
        class="w-full"
        :columns="tableColumns"
        :data="tableData"
        :header-row-style="{ lineHeight: '17px' }"
        :header-cell-style="{
          padding: '8px 11px',
        }"
        :row-style="{ fontWeight: 400, lineHeight: '17px' }"
        :cell-style="cellStyle"
      ></Table>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  tableColumns?: Table.Column[];
  tableData?: any[];
}

defineProps<Props>();

const cellStyle = ({ columnIndex }: { columnIndex: number }) => {
  if (columnIndex === 0) {
    return { padding: '8px 0', textAlign: 'center' };
  } else if (columnIndex === 5) {
    return { padding: '8px 6px' };
  } else {
    return { padding: '0' };
  }
};
</script>

<style scoped lang="scss"></style>
