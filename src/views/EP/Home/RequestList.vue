<template>
  <div class="requestBox">
    <div class="horizontalwarp" v-for="(item, index) in reqList" :key="index">
      <div @click="createReq(item.value)">
        <svg-icon :iconClass="item.icon" size="40" className="mr-[17px]" />
        <div class="warpper">
          <p>{{ item.title }}</p>
          <span class="c-secondary">{{ item.desc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { useRoute } from 'vue-router';
import { ButtonClickEnum } from '@/enums/projectEnum';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const tagsViewStore = useTagsViewStore();
const reqList = reactive([
  {
    title: t('ep_home.install_printer'),
    desc: t('ep_home.install_printer_desc'),
    icon: 'ep-home-EP_home_installingPrinter',
    value: 'install_printer',
  },
  {
    title: t('ep_home.oa_system'),
    desc: t('ep_home.oa_system_desc'),
    icon: 'ep-home-EP_home_OA',
    value: 'oa_system',
  },
  {
    title: t('ep_home.phone_failure'),
    desc: t('ep_home.phone_failure_desc'),
    icon: 'ep-home-EP_home_phoneFailure',
    value: 'phone_failure',
  },
  {
    title: t('ep_home.sap_system'),
    desc: t('ep_home.sap_system_desc'),
    icon: 'ep-home-EP_home_SAP',
    value: 'sap_system',
  },
  {
    title: t('ep_home.email_failure'),
    desc: t('ep_home.email_failure_desc'),
    icon: 'ep-home-EP_home_emailFailure',
    value: 'email_failure',
  },
  {
    title: t('ep_home.nailing'),
    desc: t('ep_home.nailing_desc'),
    icon: 'ep-home-EP_home_DINGDING',
    value: 'nailing',
  },
  {
    title: t('ep_home.network_failure'),
    desc: t('ep_home.network_failure_desc'),
    icon: 'ep-home-EP_home_networkFailure',
    value: 'network_failure',
  },
]);

const createReq = (value) => {
  console.log('新建请求', value);
  const title = t(`ep_home.${value}`);
  const desc = t(`ep_home.${value}_desc`);
  router
    .push({
      path: '/ep/event/add',
      query: {
        currentTitle: title,
        currentDesc: desc,
        templateId: 15,
        projectId: 106,
      },
    })
    .then(() => {
      tagsViewStore.addTagsViewList({
        title: '事件添加',
        name: `/ep/event/add?currentTitle=${title}&currentDesc=${desc}&templateId=${15}&projectId=${106}`,
        group: ButtonClickEnum.EVENT_ADD,
        meta: route.meta,
      });
    });
};
</script>

<style lang="scss" scoped>
.requestBox {
  width: 100%;
  height: 381px;
  flex: 1;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;

  .horizontalwarp {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-left: 12px;

    > div {
      display: flex;
      align-items: center;
      font-weight: 600;
      margin-bottom: 32px;

      span {
        font-weight: 400;
      }
    }

    @media screen and (max-width: 1177px) {
      width: 354px;
    }
  }

  @media screen and (max-width: 1177px) {
    height: 597px;
  }
}
</style>
