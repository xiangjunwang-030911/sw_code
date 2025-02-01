<template>
  <el-card class="h-full" shadow="hover" :body-style="{ padding: '11px' }">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <el-input
          v-model="search"
          placeholder="搜索知识..."
          class="mr-2"
          @keyup.enter="handleSearch"
        >
          <template #suffix>
            <svg-icon
              @click="handleSearch"
              icon-class="search_icon"
              class="text-primary cursor-pointer"
            ></svg-icon>
          </template>
        </el-input>
        <el-checkbox label="全文"></el-checkbox>
      </div>
      <div class="flex">
        <svg-icon
          icon-class="ep-common-icon_refresh"
          class="mr-4 cursor-pointer"
          :size="16"
          @click="handleRefresh"
        ></svg-icon>
        <svg-icon
          icon-class="ep-common-icon_grid_set"
          class="mr-4 cursor-pointer"
          :size="16"
        ></svg-icon>
        <svg-icon
          icon-class="ep-common-icon_list"
          class="mr-4 cursor-pointer"
          :size="16"
        ></svg-icon>
        <svg-icon
          icon-class="ep-common-icon_grid"
          class="mr-4 cursor-pointer text-theme"
          :size="16"
        ></svg-icon>
      </div>
    </div>
    <ListView ref="listViewRef" :search="search"></ListView>
  </el-card>
</template>

<script setup lang="ts">
const ListView = defineAsyncComponent(
  () => import('./components/ListView.vue'),
);

const search = ref('');
const listViewRef = ref<InstanceType<typeof ListView>>();

const handleSearch = () => {
  listViewRef.value!.getKnowledgeList();
};

const handleRefresh = () => {
  listViewRef.value!.getKnowledgeList();
};
</script>

<style lang="scss" scoped></style>
