<template>
  <div>
    <div
      class="flex items-center justify-between border-b border-[#EEEFF2] pb-[12px]"
    >
      <div class="text-[#131313] font-[600]">常用设置</div>
    </div>
    <div
      class="pt-[24px] pb-[8px] grid gap-x-[8px] gap-y-[24px] grid-cols-2 grid-rows-6 md:grid-cols-3 md:grid-rows-4 xl:grid-cols-4 xl:grid-rows-3"
    >
      <template v-for="item in settings" :key="item.icon">
        <div class="border border-[#eeeff2] flex flex-col p-4">
          <div class="flex">
            <svg-icon
              :iconClass="item.icon"
              size="24"
              class="cursor-pointer"
            ></svg-icon>
            <p class="pl-[8px] cursor-pointer">{{ item.title }}</p>
          </div>
          <div class="pt-4 flex justify-between">
            <p class="cursor-default">{{ item.desc }}</p>
            <svg-icon
              v-if="item.extrFun"
              :iconClass="item?.extrIcon"
              size="24"
              class="cursor-pointer"
            ></svg-icon>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  settings: {
    icon: string;
    title: string;
    desc: string;
    extrFun: boolean;
    extrIcon: string;
  }[];
}
withDefaults(defineProps<Props>(), {
  settings: () => [
    {
      icon: 'admin_setting',
      title: '系统设置',
      desc: '备份、聊天、安全等系统各要素配置。',
      extrFun: false,
      extrIcon: '',
    },
    {
      icon: 'admin_doc',
      title: '文档服务',
      desc: '打开、关闭。',
      extrFun: false,
      extrIcon: '',
    },
    {
      icon: 'admin_personal',
      title: '人员管理',
      desc: '维护部门、添加人员。',
      extrFun: false,
      extrIcon: '',
    },
    {
      icon: 'admin_modle',
      title: '模型配置',
      desc: '备份、聊天、安全等系统各要素配置。',
      extrFun: false,
      extrIcon: '',
    },
    {
      icon: 'admin_notice',
      title: '通知设置',
      desc: '配置通知路径，自定义需要通知的动作。',
      extrFun: false,
      extrIcon: '',
    },
    {
      icon: 'admin_plugins',
      title: '插件管理',
      desc: '浏览、安装插件。',
      extrFun: false,
      extrIcon: '',
    },
    {
      icon: 'admin_dev',
      title: '开发管理',
      desc: '支持对系统进行二次开发。',
      extrFun: false,
      extrIcon: '',
    },
    {
      icon: 'admin_import',
      title: '数据导入',
      desc: '第三方系统的数据导入。',
      extrFun: false,
      extrIcon: '',
    },
    {
      icon: 'admin_lang',
      title: '翻译',
      desc: '请通过此处导入语言包。',
      extrFun: true,
      extrIcon: 'admin_download',
    },
    {
      icon: 'admin_openAI',
      title: 'OpenAI集成',
      desc: '请通过此处测试API。',
      extrFun: true,
      extrIcon: 'admin_download',
    },
  ],
});
</script>

<style lang="scss" scoped></style>
