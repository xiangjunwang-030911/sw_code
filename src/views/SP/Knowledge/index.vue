<template>
  <div class="bg-default p-4 h-full flex relative">
    <MenuTree
      :isNeedConstruction="false"
      ref="tree"
      @onResize="onResize"
      class="enter-x"
    >
      <template #title>
        <div class="text-primary font-semibold mb-5">TechExcel用户知识库</div>
      </template>
    </MenuTree>
    <div
      class="ml-4 absolute right-3 enter-x"
      ref="list"
      :style="{ width: rightWidth }"
    >
      <div class="action-wrapper flex items-center mb-5">
        <div class="member-wrapper flex-1 flex items-center mr-5">
          <el-select
            v-model="member"
            class="w-full"
            placeholder="{所有成员}"
            clearable
          >
            <el-option value="123">张三</el-option>
          </el-select>
        </div>
        <div class="status-wrapper flex-1 flex items-center mr-5">
          <el-select
            v-model="status"
            class="w-full"
            placeholder="{打开&关闭}"
            clearable
          >
            <el-option value="123">张三</el-option>
          </el-select>
        </div>
        <div class="search-wrapper flex-1 flex items-center">
          <el-input
            v-model="searchValue"
            placeholder="关键字搜索..."
            class="w-full"
          >
            <template #suffix>
              <IEpSearch size="14"></IEpSearch>
            </template>
          </el-input>
        </div>
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
          iconClass="arrange_group_icon2"
          className="cursor-pointer"
          size="23"
        ></svg-icon>
        <svg-icon
          iconClass="arrange_group_icon3"
          className="cursor-pointer"
          size="23"
        ></svg-icon>
        <div
          class="new-wrapper w-24 p-1 rounded-md text-center text-white cursor-pointer ml-4 bg-[#44b044] flex items-center justify-center"
        >
          <IEpPlus size="14" color="#fff"></IEpPlus>
          新建
        </div>
      </div>
      <ListView></ListView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, getCurrentInstance, onMounted, ref } from 'vue';
import { useEventListener } from '@/hooks/events/useEventListener';
const MenuTree = defineAsyncComponent(
  () => import('@/components/MenuTree.vue'),
);
const ListView = defineAsyncComponent(() => import('./ListView/index.vue'));

const member = ref('');
const status = ref('');
const searchValue = ref('');
const rightWidth = ref('');
const tree = ref<InstanceType<typeof MenuTree> | null>(null);

const app = getCurrentInstance();

const onResize = () => {
  if (app && app.proxy && tree.value) {
    rightWidth.value =
      app.proxy.$el.clientWidth - tree.value.$el.clientWidth - 50 + 'px';
  }
};

const setRightWidth = () => {
  let interval: number | null = setInterval(() => {
    if (tree.value?.$el) {
      if (interval) clearInterval(interval);
      interval = null;
      onResize();
    }
  }, 200);
};

onMounted(() => {
  setRightWidth();
  useEventListener({
    name: 'resize',
    listener: onResize,
  });
});
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
