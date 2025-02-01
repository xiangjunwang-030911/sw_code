<template>
  <el-sub-menu :index="parent.name" @click="handleOpen(parent.name)">
    <template #title>
      <div class="flex items-center group">
        <svg-icon
          size="18"
          v-if="!parent.noNeedIcon"
          :iconClass="parent.icon"
          className="`cursor-pointer text-[18px] mr-2 group-hover:hidden ${parent.icon}`"
        />
        <svg-icon
          size="18"
          v-if="!parent.noNeedIcon && parent.activeIcon"
          :iconClass="parent.activeIcon"
          className="`cursor-pointer text-[18px] mr-2 group-hover:block hidden ${parent.activeIcon}`"
        />
        <span>{{ parent.title }}</span>        
        <div
          v-if="parent.unReadMessage"
          class="w-4 h-4 ml-2 text-white rounded-full bg-[#EC1616] flex items-center justify-center text-[13px]"
        >
          {{ parent.unReadMessage }}
        </div>
      </div>
    </template>
    <template v-for="item in parent.children">
      <re-submenu
        v-if="item.children"
        :key="`menu_${item.name}`"
        :name="item.name"
        :parent="item"
        class="second-menu-wrapper"
        @select="handleSelect"
        @closeMenu="(path: string) => emit('closeMenu', path)"
      >
      </re-submenu>
      <el-menu-item
        v-else
        :key="`menu_${item.name}1`"
        :index="item.name"
        class="flex items-center group"
        @click="handleSelect($event, item.name)"
      >
        <svg-icon
          size="18"
          v-if="!item.noNeedIcon"
          :iconClass="item.icon"
          :className="`cursor-pointer text-[20px] mr-3 group-hover:hidden ${item.icon}`"
        />
        <svg-icon
          size="18"
          v-if="!item.noNeedIcon && item.activeIcon"
          :iconClass="item.activeIcon"
          :className="`cursor-pointer text-[20px] mr-3 group-hover:block hidden ${item.activeIcon}`"
        />
        {{ item.title }}
        <div
          v-if="item.unReadMessage"
          class="w-4 h-4 ml-2 text-white rounded-full bg-[#EC1616] flex items-center justify-center text-[13px]"
        >
          {{ item.unReadMessage }}
        </div>
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>

<script setup lang="ts">
import { MenuGroupEnum } from '@/enums/projectEnum';
import { useServiceStore } from '@/store/modules/service';
import { useTagsViewStore } from '@/store/modules/tagsView';

defineProps({
  parent: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits<{
  select: [id: number, name: string];
  closeMenu: [path: string];
}>();

const serviceStore = useServiceStore();
const tagsViewStore = useTagsViewStore();
const router = useRouter();
const route = useRoute();

const handleSelect = (_: any, name: string) => {
  emit('select', 1, name);
};

const handleEpService = async (path: string) => {
  //如果store里面没有值的就api拿
  if (path == '/ep/service' && !serviceStore.serviceCatalogList) {
    await serviceStore.getServiceCatalogList();
  }
  if (path.indexOf('/ep/service/counter') !== -1) {
    router.push(path).then(() => {
      const projectId = Number(path.slice(path.lastIndexOf('/') + 1));
      serviceStore.serviceCatalogList!.forEach((item) => {
        if (item.projectId !== projectId) {
          emit('closeMenu', `/ep/service/counter/${item.projectId}`);
        }
      });
      const item = serviceStore.serviceCatalogList!.find(
        (item) => item.projectId == projectId,
      );
      tagsViewStore.addTagsViewList({
        name: path,
        title: item?.projectName,
        group: MenuGroupEnum.MODULE,
        meta: route.meta,
      });
      serviceStore.getServiceGroup(item!.projectId);
    });
  }
};

const handleOpen = (path: string) => {
  if (
    path != `/ep/service/counter/${route.params.id}` ||
    !serviceStore.serviceGroupList
  ) {
    handleEpService(path);
  }
};
</script>
<style lang="scss" scoped>
.second-menu-wrapper {
  :deep(.ivu-menu-submenu-title) {
    padding-left: 34px !important;
    .ivu-menu-submenu-title-icon {
      right: 0 !important;
    }
  }
}
</style>
