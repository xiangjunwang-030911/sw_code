<template>
  <div>
    <el-input v-model="search" placeholder="搜索...">
      <template #prefix>
        <el-dropdown trigger="click">
          <div class="flex items-center">
            <span class="text-xs">状态</span>
            <i-ep-caret-bottom class="text-xs"></i-ep-caret-bottom>
            <el-divider direction="vertical" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>状态</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>

      <template #suffix>
        <svg-icon
          icon-class="search_icon"
          class="text-primary cursor-pointer"
        ></svg-icon>
      </template>
    </el-input>
    <draggable v-model="eventList" itemKey="id" ghost-class="ghost">
      <template #item="{ element }">
        <div>
          <EventItem class="mt-3 cursor-move" :event="element"></EventItem>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { EventItem } from './typing';

const EventItem = defineAsyncComponent(() => import('./EventItem.vue'));

const search = ref('');
const eventList = ref<EventItem[]>([
  {
    id: 439,
    time: '10:30 am',
    content: '笔记本无法识别WI-FI',
    master: 'SAP运维佳伟',
    status: '服务台受理',
  },
  {
    id: 440,
    time: '10:30 am',
    content: 'CTOS系统',
    master: '二线-吴元',
    status: '协同处理',
  },
  {
    id: 441,
    time: '10:30 am',
    content: '我希望有人来帮我看下服务器防火墙相关问题',
    master: '二线-吴元',
    status: '协同处理',
  },
]);
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  box-shadow: none !important;
  border-radius: 15px;
}
.ghost {
  opacity: 0.5;
}
</style>
