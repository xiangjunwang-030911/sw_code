<template>
  <div class="action-wrapper flex items-center">
    <div class="choice-wrapper flex items-center mr-2">
      <span class="whitespace-nowrap mr-2">组合查询</span>
      <el-select class="w-full" placeholder="{没有查询方案}" clearable>
        <el-option value="123" :key="1">张三</el-option>
      </el-select>
    </div>
    <svg-icon
      iconClass="search_icon"
      className="cursor-pointer mr-1"
      size="23"
    ></svg-icon>
    <svg-icon
      iconClass="search_disable_icon"
      className="cursor-pointer mr-2"
      size="26"
    ></svg-icon>
    <SearchBox
      v-model="searchValue"
      :searchIcon="true"
      searchBtn="search_icon"
      placeholder="搜索"
    ></SearchBox>

    <svg-icon
      iconClass="refresh_icon"
      className="cursor-pointer ml-1"
      size="23"
    ></svg-icon>
    <svg-icon
      iconClass="clear_icon"
      className="cursor-pointer"
      size="23"
    ></svg-icon>
    <svg-icon
      iconClass="setting_icon"
      className="cursor-pointer"
      size="23"
    ></svg-icon>
    <span class="line ml-6 mr-6"></span>
    <svg-icon
      iconClass="arrange_group_icon1"
      className="cursor-pointer ml-1"
      size="23"
    ></svg-icon>
    <svg-icon
      iconClass="arrange_group_icon3"
      className="cursor-pointer"
      size="23"
    ></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'SearchFilter',
});

const searchValue = ref('');
</script>

<style lang="scss" scoped>
.line {
  &::after {
    display: block;
    content: '';
    width: 1px;
    border: 0.5px solid #eeeff2;
    height: 20px;
  }
}
</style>
