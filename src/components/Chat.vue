<template>
  <div class="flex flex-col justify-between p-3">
    <div class="flex-1">
      <div class="content-item flex justify-start">
        <div class="max-w-[60%]">
          <div class="flex items-center">
            <div class="w-6 h-6 rounded-full bg-slate-500 mr-3"></div>
            <span class="font-medium mr-4 text-[13px]">Mildred Miller</span>
            <span class="text-xs text-placeholder">02/09/2022 10:21:00</span>
          </div>
          <div
            class="bg-[#E0F2FE] rounded-md px-4 py-2 h-fit mt-4 text-[#2A2A2A] text-[13px] w-fit"
          >
            Hi, this is cool but I want to add a LiveSync, to record a new
            LiveSync to explain the problem, use LiveSync here.
          </div>
        </div>
      </div>
      <div class="content-item flex justify-end">
        <div class="max-w-[60%] flex flex-col items-end">
          <div class="flex items-center">
            <span class="text-xs text-placeholder mr-4"
              >02/09/2022 10:21:00</span
            >
            <span class="font-medium mr-3 text-[13px]">Danielle Hawkins</span>
            <div class="w-6 h-6 rounded-full bg-slate-500"></div>
          </div>
          <div
            class="bg-[#D1FAE5] rounded-md px-4 py-2 h-fit mt-4 text-[#2A2A2A] text-[13px] w-fit"
          >
            Hi, this is cool
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="flex items-center">
        <el-input
          v-model="message"
          placeholder="输入消息(Ctrl+Enter插入新行)"
          size="large"
        >
          <template #suffix>
            <emoji @select="handleSelectEmoji"></emoji>
            <svg-icon
              icon-class="common-icon-attach"
              class="mx-3 cursor-pointer"
            ></svg-icon>
          </template>
        </el-input>
        <el-button class="ml-6 w-24" type="primary" size="large" plain
          >发送</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const message = ref('');

const handleSelectEmoji = (emoji: string) => {
  message.value += emoji;
};
</script>

<style lang="scss" scoped>
.content-item + .content-item {
  margin-top: 40px;
}
</style>
