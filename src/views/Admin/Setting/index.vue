<template>
  <div class="flex w-full h-full">
    <el-card shadow="hover" class="menu-list min-w-[170px] mr-1 enter-x h-full">
      <el-menu :default-active="activeItem" @select="handleSelect">
        <el-menu-item
          v-for="(item, index) in menuList"
          :key="index"
          :index="item.name"
        >
          <span>{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-card>
    <el-card shadow="hover" class="wrap h-full px-[8px] enter-x">
      <div>
        <span class="text-[#505050]">{{ '系统管理 / ' }}</span
        ><span>{{ showComponent.title }}</span>
      </div>
      <transition name="fade-transform" mode="out-in">
        <router-view class="h-full" ref="viewWrapper"></router-view>
      </transition>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const activeItem = ref('personnelManagement');

interface MenuItem {
  name: string;
  title: string;
}
const menuList: MenuItem[] = reactive([
  {
    name: 'basicParams',
    title: '基本参数设置',
  },
  {
    name: 'documentServer',
    title: '文档服务器设置',
  },
  {
    name: 'department',
    title: '部门管理',
  },
  {
    name: 'personnelManagement',
    title: '人员管理',
  },
  {
    name: 'licenseManagement',
    title: '许可证管理',
  },
  {
    name: 'announcementManagement',
    title: '公告管理',
  },
  {
    name: 'logManagement',
    title: '日志管理',
  },
  {
    name: 'languagePackImport',
    title: '语言包导入',
  },
]);

const showComponent = ref<{ name: string; title: string }>({
  name: 'personnelManagement',
  title: '人员管理',
});

const handleSelect = (index: string) => {
  showComponent.value = menuList.filter(
    (item: MenuItem) => item.name === index,
  )?.[0];
  router.push(`/admin/setting/${index}`);
};
</script>

<style lang="scss" scoped>
.menu-list :deep(.el-card-body) {
  padding: 0;
}

.menu-list :deep(.el-menu) {
  border-right: none;
}

.wrap {
  width: calc(100% - 174px);
  :deep(.el-card-body) {
    height: 100%;
    overflow: hidden;
  }
}
</style>
