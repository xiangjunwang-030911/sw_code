<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <!-- 折叠前 -->
    <el-menu
      ref="menuRef"
      width="auto"
      class="!px-2"
      :default-active="activeName"
      :collapse="collapsed"
      :default-openeds="['module']"
      v-show="!collapsed"
      :collapse-transition="false"
    >
      <template
        v-for="item in menuList"
        :key="`menu_${item.name}1`"
      >
        <re-submenu
          v-if="item.children"
          key="`menu_${item.name}`"
          :parent="item"
          @select="handleSelect"
          @closeMenu="handleCloseMenu"
        >
        </re-submenu>

        <el-menu-item
          v-else
          :index="item.name"
          @click="handleSelect($event, item.name)"
          class="flex items-center group"
        >
          <svg-icon
            size="18"
            v-if="!item.noNeedIcon"
            :iconClass="item.icon"
            :className="`cursor-pointer text-[18px] mr-2 group-hover:hidden ${item.icon}`"
          />
          <svg-icon
            size="18"
            v-if="!item.noNeedIcon && item.activeIcon"
            :iconClass="item.activeIcon"
            :className="`cursor-pointer text-[18px] mr-2 group-hover:block hidden ${item.activeIcon}`"
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
    </el-menu>
    <!-- 折叠后 -->
    <div
      class="drop-wrapper px-[3px]"
      v-show="collapsed"
    >
      <template v-if="currentProject == 'sp'">
        <!-- eslint-disable -->
        <template
          v-for="item in SwCollapsedList"
          :key="`drop_${item.title}`"
        >
          <el-tooltip
            transfer
            :content="item.title"
            placement="right"
            class="w-full pb-[10px] pt-[10px]"
          >
            <div
              @click="handleClick(item.name)"
              class="drop-menu-span flex items-center justify-center w-full py-3"
              :class="{ isActive: item.name == route.path }"
            >
              <svg-icon
                size="18"
                :iconClass="item.name == route.path ? item.icon + '2' : item.icon"
                className="cursor-pointer text-[20px]"
              />
            </div>
          </el-tooltip>
        </template>
      </template>
      <template v-else>
        <template v-for="item in menuList">
          <re-dropdown
            @on-select="handleSelect"
            v-if="item.children"
            icon-color="#fff"
            :show-title="false"
            :key="`drop_${item.title}`"
            :parent="item"
          ></re-dropdown>
          <el-tooltip
            v-else
            transfer
            :content="item.title"
            placement="right"
            :key="`drop_${item.title}1`"
            class="w-full pb-[10px] pt-[10px]"
          >
            <div
              @click="handleClick(item.name)"
              class="drop-menu-span flex items-center justify-center w-full py-3"
              :class="{ isActive: item.name == route.path }"
            >
              <svg-icon
                size="18"
                :iconClass="
                  item.name == route.path ? item.icon + '2' : item.icon
                "
                className="cursor-pointer text-[20px]"
              />
            </div>
          </el-tooltip>
        </template>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { storeToRefs } from 'pinia';
import { useServiceStore } from '@/store/modules/service';
import { MenuItem } from './typing';
import { MenuGroupEnum } from '@/enums/projectEnum';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const tagsViewStore = useTagsViewStore();
const menuRef = ref();
const { currentProject } = storeToRefs(tagsViewStore);
const serviceStore = useServiceStore();
const { getKnowledgeProjectId } = storeToRefs(serviceStore);

const ReSubmenu = defineAsyncComponent(() => import('./ReSubmenu.vue'));
const ReDropdown = defineAsyncComponent(() => import('./ReDropdown.vue'));

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const epMenuList = computed<MenuItem[]>(() => {
  const serviceGroupList = serviceStore.serviceGroupList || [];
  const serviceCatalogMenu =
    serviceStore.serviceCatalogList?.map((item) => ({
      title: item.projectName,
      name: `/ep/service/counter/${item.projectId}`,
      noNeedIcon: true,
      children: serviceGroupList.map((item) => ({
        title: item.groupName,
        name: `/ep/service/counter/${item.projectID}/${item.groupID}`,
        noNeedIcon: true,
      })),
    })) || [];
  return [
    {
      title: t('layout.home'),
      name: '/ep/home',
      icon: 'ep-common-ep_home',
      activeIcon: 'ep-common-ep_home2',
      group: MenuGroupEnum.MODULE,
    },
    {
      title: t('layout.service_directory'),
      name: '/ep/service',
      icon: 'ep-common-ep_service',
      activeIcon: 'ep-common-ep_service2',
      children: serviceCatalogMenu,
    },
    {
      title: t('layout.event_list'),
      name: '/ep/event',
      icon: 'ep-common-ep_event',
      activeIcon: 'ep-common-ep_event2',
      group: MenuGroupEnum.MODULE,
    },
    {
      title: serviceStore.getCustomerAs as string,
      name: '/ep/userinfo',
      icon: 'ep-common-ep_userinfo',
      activeIcon: 'ep-common-ep_userinfo2',
      group: MenuGroupEnum.MODULE,
    },
    // {
    //   title: '员工信息',
    //   name: '/ep/customerinfo',
    //   icon: 'ep-common-ep_customerInfo',
    //   activeIcon: 'ep-common-ep_customerInfo2',
    //   group: MenuGroupEnum.MODULE,
    // },
    {
      title: t('layout.knowledge_base'),
      name: '/ep/knowledge',
      icon: 'ep-common-ep_knowledge',
      activeIcon: 'ep-common-ep_knowledge2',
      group: MenuGroupEnum.MODULE,
      disabled: getKnowledgeProjectId.value == null,
    },
    {
      title: t('layout.meeting_list'),
      name: '/ep/meeting',
      icon: 'ep-common-ep_meeting',
      activeIcon: 'ep-common-ep_meeting2',
      group: MenuGroupEnum.MODULE,
    },
    {
      title: '智能AI客服',
      name: '/ep/chat',
      icon: 'ep-common-icon_livesync',
      activeIcon: 'ep-common-icon_livesync2',
      group: MenuGroupEnum.MODULE,
    },
  ];
});

const menuList = computed((): MenuItem[] => {
  if (route.path.indexOf('/ep') !== -1) {
    return epMenuList.value.filter((item) => !item.disabled);
  } else if (route.path.indexOf('/sp') !== -1 && t) {
    return [
      {
        title: t('layout.worktable'),
        name: '/sp/home',
        icon: 'home',
        activeIcon: 'home2',
      },
      {
        title: t('layout.module'),
        name: 'module',
        icon: 'moduleIcon',
        activeIcon: 'moduleIcon2',
        unReadMessage: 3,
        children: [
          {
            title: t('layout.event_management'),
            name: '/sp/event',
            icon: 'eventIcon',
            activeIcon: 'eventIcon2',
            group: MenuGroupEnum.MODULE,
          },
          {
            title: t('layout.problem_management'),
            name: '/sp/problem',
            icon: 'problemIcon',
            activeIcon: 'problemIcon2',
            unReadMessage: 3,
            group: MenuGroupEnum.MODULE,
          },
          {
            title: t('layout.release_management'),
            name: '/sp/publish',
            icon: 'publishIcon',
            activeIcon: 'publishIcon2',
            group: MenuGroupEnum.MODULE,
          },
          {
            title: t('layout.CMDB'),
            name: '/sp/cmdb',
            icon: 'CMDB',
            activeIcon: 'CMDB2',
            group: MenuGroupEnum.MODULE,
          },
          {
            title: t('layout.project_management'),
            name: '/sp/management',
            icon: 'manageIcon',
            activeIcon: 'manageIcon2',
            group: MenuGroupEnum.MODULE,
          },
          {
            title: '连续性管理',
            name: '/sp/continuity',
            icon: 'continuityIcon',
            activeIcon: 'continuityIcon2',
            group: MenuGroupEnum.MODULE,
          },
          {
            title: '可用性管理',
            name: '/sp/availability',
            icon: 'availabilityIcon',
            activeIcon: 'availabilityIcon2',
            group: MenuGroupEnum.MODULE,
          },
          {
            title: 'HRSCC工单',
            name: '/sp/hrscc',
            icon: 'hrsccIcon',
            activeIcon: 'hrsccIcon2',
            group: MenuGroupEnum.MODULE,
          },
          {
            title: '状态管理',
            name: '/sp/state',
            icon: 'availabilityIcon',
            activeIcon: 'availabilityIcon2',
            group: MenuGroupEnum.MODULE,
          },
        ],
      },
      {
        title: t('layout.performance_analysis'),
        name: '/sp/performance',
        icon: 'performanceIcon',
        activeIcon: 'performanceIcon2',
        group: MenuGroupEnum.MODULE,
      },
      {
        title: t('layout.knowledge_management'),
        name: '/sp/knowledge',
        icon: 'knowledgeIcon',
        activeIcon: 'knowledgeIcon2',
        group: MenuGroupEnum.MODULE,
      },
      {
        title: t('layout.team_management'),
        name: '/sp/team',
        icon: 'teamIcon',
        activeIcon: 'teamIcon2',
        group: MenuGroupEnum.MODULE,
      },
      {
        title: '文档管理',
        name: '/sp/document',
        icon: 'documentIcon',
        activeIcon: 'documentIcon2',
        group: MenuGroupEnum.MODULE,
      },
      {
        title: '智能AI客服',
        name: '/sp/chat',
        icon: 'liveSyncIcon',
        activeIcon: 'liveSyncIcon2',
        group: MenuGroupEnum.MODULE,
      },
      {
        title: t('layout.setting'),
        name: '/sp/setting',
        icon: 'setIcon',
        activeIcon: 'setIcon2',
      },
    ];
  } else if (route.path.indexOf('/admin') !== -1 && t) {
    return [
      {
        title: '首页',
        name: '/admin/home',
        icon: 'home',
        activeIcon: 'home2',
      },
      {
        title: '系统设置',
        name: '/admin/setting',
        icon: 'setIcon',
        activeIcon: 'setIcon2',
      },
      {
        title: '基础项目',
        name: 'baseProject',
        icon: 'moduleIcon',
        activeIcon: 'moduleIcon2',
        children: [
          {
            title: t('layout.event_management'),
            name: '/admin/event',
            icon: 'eventIcon',
            activeIcon: 'eventIcon2',
          },
          {
            title: t('layout.problem_management'),
            name: '/admin/problem',
            icon: 'problemIcon',
            activeIcon: 'problemIcon2',
          },
          {
            title: '变更管理',
            name: '/admin/change',
            icon: 'changeIcon',
            activeIcon: 'changeIcon2',
          },
          {
            title: t('layout.release_management'),
            name: '/admin/publish',
            icon: 'publishIcon',
            activeIcon: 'publishIcon2',
          },
          {
            title: t('layout.CMDB'),
            name: '/admin/cmdb',
            icon: 'CMDB',
            activeIcon: 'CMDB2',
          },
          {
            title: t('layout.project_management'),
            name: '/admin/management',
            icon: 'manageIcon',
            activeIcon: 'manageIcon2',
          },
          {
            title: t('layout.demand_management'),
            name: '/admin/requirement',
            icon: 'requirementIcon',
            activeIcon: 'requirementIcon2',
          },
          {
            title: t('layout.quality_control'),
            name: '/admin/quality',
            icon: 'qualityIcon',
            activeIcon: 'qualityIcon2',
          },
          {
            title: t('layout.defect_management'),
            name: '/admin/defect',
            icon: 'defectIcon',
            activeIcon: 'defectIcon2',
          },
        ],
      },
      {
        title: t('layout.knowledge_management'),
        name: '/admin/knowledge',
        icon: 'knowledgeIcon',
        activeIcon: 'knowledgeIcon2',
      },
    ];
  }
  return [];
});

const activeName = computed(() => {
  if (route.path.indexOf('/sp') > -1) {
    const result = route.path.replace(/^(\/[^\/]+\/[^\/]+)\/.*$/, '$1');
    return result;
  } else {
    return route.path;
  }
});

const SwCollapsedList = computed(() => {
  let newList: MenuItem[] = [];
  menuList.value!.map((item) => {
    if (item.children?.length) {
      newList.push(...item.children);
    } else {
      newList.push(item);
    }
  });
  return newList;
});

const handleCloseMenu = (path: string) => {
  menuRef.value!.close(path);
};

const handleSelect = (_arg1: any, name: string) => {
  let newMenuList: MenuItem[] = [];
  menuList.value!.map((item) => {
    if (item.children?.length) {
      newMenuList = [...newMenuList, ...item.children];
      item.children.map((item2) => {
        if (item2.children?.length) {
          newMenuList = [...newMenuList, ...item2.children];
        }
      });
    } else {
      newMenuList.push(item);
    }
  });

  //router.push({ path: name });

  router.push({ path: name }).then(() => {
    tagsViewStore.addTagsViewList({
      ...newMenuList.filter((item) => item.name == name)[0],
      group: MenuGroupEnum.MODULE,
      meta: route.meta,
    });
  });

  //暂时性解决三级菜单最后一个会自动展开的bug
  if (name.indexOf('/ep/service/counter/') !== -1 && route.params.id) {
    setTimeout(() => {
      serviceStore.serviceCatalogList!.forEach((item) => {
        if (item.projectId !== Number(route.params.id)) {
          handleCloseMenu(`/ep/service/counter/${item.projectId}`);
        }
      });
    }, 0);
  }
};

const handleClick = (name: string) => {
  if (route.path != name) {
    router.push(name);
  }
  handleSelect(1, name);
};
</script>
<style lang="scss" scoped>
.side-menu-wrapper {
  :deep(.el-menu) {
    border-right: none !important;
    .el-menu-item,
    .el-sub-menu__title {
      margin-bottom: 2px;
      &:hover {
        background: var(--el-menu-hover-bg-color);
        border-radius: 5px;
      }
    }
    .el-menu-item.is-active {
      background: var(--el-menu-hover-bg-color);
      border-radius: 5px;
      $icons: (
        home,
        eventIcon,
        problemIcon,
        publishIcon,
        CMDB,
        manageIcon,
        requirementIcon,
        qualityIcon,
        defectIcon,
        performanceIcon,
        knowledgeIcon,
        teamIcon,
        setIcon,
        ep-common-ep_home,
        ep-common-ep_service,
        ep-common-ep_event,
        ep-common-ep_meeting,
        ep-common-ep_userinfo,
        ep-common-ep_knowledge,
        ep-common-icon_livesync,
        ep-common-ep_customerInfo,
        meetingIcon,
        liveSyncIcon,
        changeIcon,
        continuityIcon,
        availabilityIcon,
        hrsccIcon,
        documentIcon,
        ep_customerInfo
      );
      @each $icon in $icons {
        .#{$icon}2 {
          display: block !important;
        }
        .#{$icon} {
          display: none !important;
        }
      }
    }
  }
  .drop-menu-span {
    &.isActive {
      background: var(--el-menu-hover-bg-color);
      border-radius: 5px;
    }
  }
}
</style>
