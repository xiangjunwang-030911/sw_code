<template>
  <RouterView v-if="!route.meta.keepIframeAlive">
    <template #default="{ Component, route }">
      <transition name="fade-slide" mode="out-in" appear>
        <keep-alive :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </template>
  </RouterView>
  <!-- 需要缓存的iframe -->
  <FrameLayout></FrameLayout>
</template>

<script setup lang="ts">
import { useTagsViewStore } from '@/store/modules/tagsView';

const FrameLayout = defineAsyncComponent(() => import('./FrameLayout.vue'));

const tagsViewStore = useTagsViewStore();
const route = useRoute();

const getCaches = computed((): string[] => {
  return tagsViewStore.getCachedTagList;
});
</script>

<style lang="scss" scoped></style>
