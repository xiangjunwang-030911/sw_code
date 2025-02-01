<template>
  <el-menu
    @select="handleClick"
    :collapse="true"
    placement="bottom-end"
    class="w-full menu"
    transfer
    transfer-class-name="max-h-none"
  >
    <el-sub-menu>
      <template #title>
        <div
          class="w-full drop-menu-span flex items-center justify-center pb-[10px] pt-[10px]"
          :style="titleStyle"
        >
          <svg-icon
            size="18"
            v-if="!parent.noNeedIcon"
            :iconClass="parent.icon"
            className="cursor-pointer text-[20px]"
          />
          <span color="#515a6e" v-if="showTitle">{{ parent.title }}</span>
        </div>
      </template>
      <template v-for="item in parent.children">
        <re-dropdown
          v-if="item.children"
          :key="`drop_${item.name}`"
          :parent="item"
          @select="(_, name) => emit('on-select', 1, name)"
        ></re-dropdown>

        <el-menu-item
          v-else
          :key="`drop_${item.name}1`"
          :command="item.name"
          :index="item.name"
          class="flex items-center"
        >
          <svg-icon
            size="18"
            v-if="!item.noNeedIcon"
            :iconClass="item.icon"
            className="cursor-pointer text-[20px] mr-3"
          />
          <span>{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { defineAsyncComponent, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const { t: $t, locale } = useI18n();
const emit = defineEmits(['on-select']);

const props = defineProps({
  parent: {
    type: Object,
    default: () => ({}),
  },
  iconColor: {
    type: String,
    default: '#515a6e',
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
});
const titleStyle = computed(() => ({
  textAlign: props.showTitle ? 'left' : 'center',
  paddingLeft: props.showTitle ? '16px' : '',
}));
const handleClick = (name) => {
  if (route.path != name) {
    router.push(name);
  }
  emit('on-select', 1, name);
};
</script>
<style lang="scss" scoped>
.menu {
  width: 100%;
  :deep(.el-sub-menu) {
    width: 100%;
    margin-top: 2px;
    .el-sub-menu__title {
      width: 100%;
      padding: 0 !important;
    }
  }
}
</style>
