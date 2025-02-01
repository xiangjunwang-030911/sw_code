<template>
  <section class="layout relative">
    <section
      class="siderbar-container fixed flex flex-col h-screen"
      :class="!isCollapsed ? '!w-[206px]' : '!w-[52px]'"
    >
      <div
        class="sidebar-logo-container flex items-center justify-center w-full h-[64px]"
      >
        <div v-if="logoType == 'sp'" class="flex items-center justify-center">
          <img src="@/assets/images/sw-logo.svg" class="!h-[34px]" alt="" />
          <img
            v-show="!isCollapsed"
            src="@/assets/images/sw-txt.svg"
            class="pl-2 h-[17px]"
            alt=""
          />       
        </div>

        <div
          v-if="logoType == 'ep'"
          class="ep-logo flex items-center justify-center"
        >
          <img src="@/assets/images/ep-logo.svg" class="!h-[34px]" alt="" />
          <div class="txt-logo ml-2" v-show="!isCollapsed"></div>
        </div>
        <div
          v-if="logoType == 'admin'"
          class="logo pl-[24px] pr-[24px] w-[224px] flex items-center"
        >
          <img
            class="pb-[5px] pr-[8px]"
            src="@/assets/images/adminlogo.png"
            alt=""
          />
          <img class="" src="@/assets/images/admin.png" alt="" />
        </div>
      </div>
      <div class="flex-1 h-0 overflow-hidden">
        <el-scrollbar>
          <div class="px-1 relative transition-all">
            <SideMenu :collapsed="isCollapsed"></SideMenu>
          </div>
        </el-scrollbar>
      </div>
      <div
        class="sidebar-footer pb-[10px] pl-[24px] pr-[24px]"
        :class="
          isCollapsed ? '!pl-0 !pr-0 flex items-center justify-center' : ''
        "
      >
        <div
          class="flex items-center cursor-pointer relative pt-[10px] pb-[10px]"
          @click="collapsedSider"
        >
          <div
            class="transition-transform"
            :class="isCollapsed ? 'rotate-180' : ''"
          >
            <svg-icon
              iconClass="common-rightDoubleArrow"
              :className="`cursor-pointer text-[18px] rightDoubleArrow`"
            />
          </div>
          <span
            class="text-sm text-ellipsis overflow-hidden ml-2 colspan-txt"
            :class="isCollapsed ? 'colspan-txt-hide' : ''"
            >折叠侧边栏</span
          >
        </div>
      </div>
    </section>
    <section
      :class="isCollapsed ? 'ml-[52px]' : 'ml-[206px]'"
      class="main-container pr-[0px] h-full overflow-x-hidden"
    >
      <div class="header-bar h-[50px] flex justify-between items-center">
        <div class="flex items-center h-full">
          <div class="tabs-wrapper pl-6 flex-1 pr-5 h-full">
            <TagsView></TagsView>
          </div>
        </div>
        <div class="pr-6 flex items-center">
          <el-popover
            placement="bottom"
            title=""
            :width="300"
            :show-arrow="false"
            trigger="hover"
          >
            <template #reference>
              <svg-icon
                iconClass="common-search"
                className="cursor-pointer ml-2 mr-2"
                size="16"
                @click="changeLang"
              />
            </template>
            <SearchBox
              minWidth=""
              :responsiveWidth="''"
              extraClass="mr-3"
              :placeholder="$t('layout.input_keyword')"
              :searchIcon="true"
              searchBtn="search_icon"
              @search="handleSearch"
            ></SearchBox>
          </el-popover>
          <svg-icon
            iconClass="common-multilingual"
            className="cursor-pointer ml-2 mr-2"
            size="18"
            @click="changeLang"
          />
          <NoticePopup></NoticePopup>
          <el-divider direction="vertical" class="!ml-[14px] !mr-[20px]" />
          <InfoPopup></InfoPopup>
        </div>
      </div>
      <el-scrollbar view-class="h-full">
        <Content></Content>
      </el-scrollbar>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { defineAsyncComponent, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/store/modules/auth';
import { LanguageIdEnum } from '@/enums/commonEnum';

const SideMenu = defineAsyncComponent(() => import('./SideMenu/index.vue'));
const TagsView = defineAsyncComponent(() => import('./TagsView/index.vue'));
const InfoPopup = defineAsyncComponent(
  () => import('@/components/InfoPopup.vue'),
);
const NoticePopup = defineAsyncComponent(
  () => import('@/components/NoticePopup.vue'),
);
const Content = defineAsyncComponent(() => import('./Content/index.vue'));

const route = useRoute();
const authStore = useAuthStore();
const { locale } = useI18n();

const isCollapsed = ref(false);

const logoType = computed(() => {
  if (route.path.indexOf('/admin') !== -1) {
    return 'admin';
  } else if (route.path.indexOf('/ep') !== -1) {
    return 'ep';
  } else {
    return 'sp';
  }
});

// const isShowIframe = computed(
//   () =>
//     route.meta.keepIframeAlive &&
//     route.fullPath.indexOf(route.meta.iframeRoute as string) !== -1,
// );

const handleSearch = () => {};
const collapsedSider = () => {
  isCollapsed.value = !isCollapsed.value;
};
const changeLang = () => {
  authStore.setLanguage(
    locale.value == 'zh' ? LanguageIdEnum.EN : LanguageIdEnum.CN,
  );
  if (locale.value == 'zh') {
    locale.value = 'en';
  } else {
    locale.value = 'zh';
  }
};
</script>

<style lang="scss" scoped>
/* @import "@/common/css/theme.scss"; */

.layout {
  height: 100vh;
  background: var(--sw-light-bg-color);
  border-radius: 4px;
  overflow: hidden;

  .ep-logo .txt-logo {
    background: url(../assets/images/ep-txt.svg) no-repeat;
    background-size: auto 17px;
    width: 128px;
    height: 17px;
  }
  .siderbar-container {
    background: var(--el-bg-color);
    z-index: 20;
    transition: width 200ms;
    box-shadow: 2px 0px 8px 0px rgba(29, 35, 41, 0.1);
  }
  .main-container {
    position: relative;
    padding-top: 50px;
    transition: margin-left 200ms;
  }
  .colspan-txt {
    position: absolute;
    width: 62px;
    left: 20px;
    transition: all 200ms;
  }
  .colspan-txt-hide {
    display: none;
  }
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.header-bar {
  background: var(--el-bg-color);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  box-shadow: 0px 1px 3px 0px var(--el-border-color);
  .search {
    position: relative;
    &::before {
      display: block;
      content: '';
      width: 1px;
      border: 0.5px solid #ddd;
      height: 15px;
      position: absolute;
      left: 3px;
      top: -7px;
    }
  }
  .line {
    &::after {
      display: block;
      content: '';
      width: 1px;
      border: 0.5px solid #eeeff2;
      height: 20px;
    }
  }
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition:
    font-size 0.2s ease,
    transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition:
    font-size 0.2s ease 0.2s,
    transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.dark {
  .layout {
    background: var(--sw-dark-bg-color);
    .ep-logo .txt-logo {
      background: url(../assets/images/ep-txt-dark.svg) no-repeat;
      background-size: auto 17px;
    }
  }
}
</style>
