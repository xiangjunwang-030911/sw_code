<template>
  <div class="py-4">
    <div class="text-[18px] font-medium">参数设置</div>
    <div class="mt-4">
      <div class="form-item flex items-center mt-4">
        <div class="w-[120px] text-right">服务器地址：</div>
        <div class="w-full">
          <el-input v-model="address" placeholder="127.0.0.1"></el-input>
        </div>
      </div>
      <div class="form-item flex items-center mt-4">
        <div class="w-[120px] text-right">系统默认语言：</div>
        <el-select class="w-full" v-model="language">
          <el-option value="中文"></el-option>
          <el-option value="英文"></el-option>
        </el-select>
      </div>
      <div class="form-item flex items-center mt-4">
        <div class="w-[120px] text-right">默认时区：</div>
        <el-select
          class="w-full"
          v-model="timezone"
          placeholder="（GMT+08:00），Beijing，"
        >
          <el-option value="1"></el-option>
          <el-option value="2"></el-option>
        </el-select>
      </div>
      <div class="form-item flex items-center mt-4">
        <div class="w-[120px] text-right">日期格式：</div>
        <div class="w-full flex items-center">
          <el-select
            v-model="timeFormat"
            placeholder="YYYY/MM/DD"
            class="w-1/2"
          >
            <el-option value="中文"></el-option>
            <el-option value="英文"></el-option>
          </el-select>
          <div class="form-item flex items-center flex-1">
            <div class="w-[120px] text-right">时间格式：</div>
            <el-select
              class="w-full"
              v-model="timeFormat"
              placeholder="hh:mm:ss"
            >
              <el-option value="中文"></el-option>
              <el-option value="英文"></el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const address = ref('');
const language = ref('');
const timezone = ref('');
const timeFormat = ref('');
</script>

<style></style>
