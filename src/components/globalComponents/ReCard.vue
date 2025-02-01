<template>
  <el-card shadow="hover" :body-style="{ padding: 0 }">
    <div class="p-4">
      <div
        class="flex items-center justify-between cursor-pointer"
        :class="isShow && showBorder ? 'border-b pb-3 border-light' : ''"
        @click="handleCollapse"
      >
        <div class="text-primary font-semibold flex-1">
          <slot name="title"> </slot>
        </div>
        <IEpArrowUp v-if="isShow" />
        <IEpArrowDown v-else />
      </div>
      <el-collapse-transition>
        <div v-show="isShow">
          <slot> </slot>
        </div>
      </el-collapse-transition>
    </div>
  </el-card>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ReCard',
});

interface Props {
  showBorder?: boolean;
}

withDefaults(defineProps<Props>(), {
  showBorder: true,
});
const isShow = ref(true);
const handleCollapse = () => {
  isShow.value = !isShow.value;
};
</script>

<style lang="scss" scoped></style>
