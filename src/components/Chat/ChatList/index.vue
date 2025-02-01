<template>
  <div>
    <el-input v-model="search" placeholder="搜索...">
      <template #suffix>
        <svg-icon
          icon-class="search_icon"
          class="text-primary cursor-pointer"
        ></svg-icon>
      </template>
    </el-input>
    <Filter class="my-4"></Filter>
    <div>
      <ConversationCard
        class="mb-2"
        v-for="item in conversationList"
        :avator="item.avator"
        :time="item.time"
        :content="item.content"
        :name="item.name"
        :is-active="item.isActive"
      ></ConversationCard>
    </div>
    <div class="mt-6">
      <div class="flex justify-between mb-3">
        <span class="text-secondary font-xs">支持团队组</span>
        <i-ep-circle-plus class="cursor-pointer"></i-ep-circle-plus>
      </div>
      <TeamCard
        class="mb-2"
        v-for="item in teamList"
        :avatorColor="item.avatorColor"
        :shortName="item.shortName"
        :time="item.time"
        :content="item.content"
        :name="item.name"
      ></TeamCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import temp_avator1 from '@/assets/images/temp_avator1.png';
import temp_avator2 from '@/assets/images/temp_avator2.png';
import temp_avator3 from '@/assets/images/temp_avator3.png';
import temp_avator4 from '@/assets/images/temp_avator4.png';
const search = ref('');
const Filter = defineAsyncComponent(() => import('./components/Filter.vue'));
const ConversationCard = defineAsyncComponent(
  () => import('./components/ConversationCard.vue'),
);
const TeamCard = defineAsyncComponent(
  () => import('./components/TeamCard.vue'),
);

const conversationList = ref([
  {
    avator: temp_avator1,
    name: 'Delia Swanson',
    time: '10:30 am',
    content: '等待加入实时音想会议',
    isActive: false,
  },
  {
    avator: temp_avator2,
    name: 'Jeremiah Barnett',
    time: '10:30 am',
    content: '新的人工支持请求',
    isActive: true,
  },
  {
    avator: temp_avator3,
    name: '穆建',
    time: '10:30 am',
    content: 'Jack的新视频音想',
    isActive: false,
  },
  {
    avator: temp_avator4,
    name: 'Max Fuller',
    time: '10:30 am',
    content: '等待加入Jack的实时音想会议,会议开始时间10:30',
    isActive: false,
  },
]);

const teamList = ref([
  {
    name: '团队名称1',
    shortName: 'TD',
    time: '10:30 am',
    content: '客户要求产品升级明天完成！',
    isActive: false,
    avatorColor: '#ebf5e9',
  },
  {
    name: '二次开发',
    shortName: 'EC',
    time: '10:30 am',
    content: '立项开始了。',
    isActive: false,
    avatorColor: '#d9f9e6',
  },
]);
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  box-shadow: none !important;
  border-radius: 15px;
}
</style>
