<template>
  <div class="list">
    <ul>
      <li v-for="(item, index) in noticeTitle" :key="index">{{ item }}</li>
    </ul>
    <div class="flex flex-wrap pl-[12px]">
      <el-button class="mt-3">{{ t('ep_home.install_printer') }}</el-button>
      <el-button class="mt-3">{{ t('ep_home.cannot_print_file') }}</el-button>
      <el-button class="mt-3">{{
        t('ep_home.email_expansion_application')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const noticeTitle = reactive([
  t('ep_home.emergency_situation'),
  t('ep_home.it_hotline'),
  t('ep_home.hr_hotline'),
  t('ep_home.work_time'),
  t('ep_home.common_issues'),
]);
</script>

<style lang="scss" scoped>
.list {
  ul {
    padding: 0 0 2px 12px;
    li {
      font-weight: 400;
      padding: 8px 0;
    }
  }
  :deep(.el-button) {
    margin-left: 0;
    margin-right: 12px;
  }
}
</style>
