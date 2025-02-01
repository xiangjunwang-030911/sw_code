<template>
  <ReCard>
    <template #title> 历史 </template>
    <div class="p-5 flex flex-wrap">
      <template v-for="item in historyList" :key="item.sequenceNo">
        <div
          class="flex flex-col items-center justify-center h-[127px] mr-5 w-[151px] mt-2"
        >
          <img :src="getArrowImg(item.transitionType)" class="mb-1" />
          <div class="font-semibold">{{ item.transition }}</div>
          <div class="text-secondary">{{ item.assignedByPerson }}</div>
        </div>
        <div>
          <div
            class="rounded-xl h-[127px] mr-5 w-[151px] p-1 mt-2"
            :class="`history-item-${getBg(item.transitionType)}`"
          >
            <div class="font-semibold text-center py-3">
              {{ item.progressStatus }}
            </div>
            <div
              class="rounded-t-lg rounded-b-xl flex flex-col items-center py-2"
              :class="`history-item-${getBg(item.transitionType)}-child`"
            >
              <div class="text-secondary mb-4 text-xs">
                {{
                  moment(Number(item.dateAssigned)).format(
                    'YYYY/MM/DD HH:mm:ss',
                  )
                }}
              </div>
              <div class="text-primary">负责人</div>
              <div class="text-secondary text-xs">
                {{ item.personAssigned }}
              </div>
            </div>
          </div>
          <!-- 分支 -->
          <div class="h-[125px] relative" v-if="item.sequenceNo == 2">
            <img
              class="w-[65px] h-[58px] absolute left-20 top-2"
              :src="getArrowImg(3)"
              alt=""
            />
            <div
              class="history-item-purple w-[201px] h-[106px] rounded-xl p-1 absolute left-40 top-5"
            >
              <div class="font-semibold text-center py-2">服务台受理</div>
              <div
                class="history-item-purple-child rounded-t-lg rounded-b-xl flex flex-col items-center text-center px-4 py-5"
              >
                <span class="text-xs">在项目: 01.服务台&事件管理 作为参考</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <el-divider>
      <span class="text-regular">事件 #522</span>
      <span class="mx-1">作为参考</span>
      <span class="text-regular">在项目: 01.服务台</span>
    </el-divider>
    <div class="p-5 flex items-center flex-wrap">
      <div
        class="flex flex-col items-center mr-5 justify-center h-[127px] w-[151px] mt-2"
      >
        <img :src="getArrowImg(0)" class="mb-1" />
        <div class="font-semibold">提交由</div>
        <div class="text-secondary">zhoujiajie 周佳杰</div>
      </div>
      <div
        class="history-item-blue rounded-xl h-[127px] mr-5 w-[151px] p-1 mt-2"
      >
        <div class="font-semibold text-center py-3">服务台受理</div>
        <div
          class="history-item-blue-child rounded-t-lg rounded-b-xl flex flex-col items-center py-2"
        >
          <div class="text-secondary mb-4 text-xs">2023/03/23 09:46:00</div>
          <div class="text-primary">负责人</div>
          <div class="text-secondary text-xs">服务台 周铁人</div>
        </div>
      </div>
      <div
        class="flex flex-col items-center mr-5 justify-center h-[127px] w-[151px] mt-2"
      >
        <img :src="getArrowImg(2)" class="mb-1" />
        <div class="font-semibold">确认已解决，关闭由</div>
        <div class="text-secondary">zhoujiajie 周佳杰</div>
      </div>
      <div
        class="history-item-green rounded-xl h-[127px] mr-5 w-[151px] p-1 mt-2"
      >
        <div class="font-semibold text-center py-3">服务台受理</div>
        <div
          class="history-item-green-child rounded-t-lg rounded-b-xl flex flex-col items-center py-2"
        >
          <div class="text-secondary mb-4 text-xs">2023/03/23 09:46:00</div>
          <div class="text-primary">负责人</div>
          <div class="text-secondary text-xs">服务台 周铁人</div>
        </div>
      </div>
    </div>
  </ReCard>
</template>

<script setup lang="ts">
import arrow_o from '@/assets/images/ep/arrow_o.png';
import arrow_b from '@/assets/images/ep/arrow_b.png';
import arrow_g from '@/assets/images/ep/arrow_g.png';
import arrow_p from '@/assets/images/ep/arrow_p.png';
import { getEventHistoryApi } from '@/api/ep/event';
import { EventHistoryApiResult } from '@/api/ep/event/eventModel';
import moment from 'moment';

const route = useRoute();

const historyList = ref<EventHistoryApiResult[]>([]);

const getArrowImg = (type: Number) => {
  switch (type) {
    case 0:
      return arrow_o;
    case 1:
      return arrow_b;
    case 2:
      return arrow_g;
    case 3:
      return arrow_p;
    default:
      break;
  }
};

const getBg = (type: number) => {
  switch (type) {
    case 0:
      return 'blue';
    case 1:
      return 'blue';
    case 2:
      return 'green';
    case 3:
      return 'purple';
    default:
      break;
  }
};

const getEventHistory = async () => {
  const res = await getEventHistoryApi({
    projectId: Number(route.query.projectId),
    itemId: Number(route.query.id),
  });
  historyList.value = res;
};

onMounted(() => {
  getEventHistory();
});
</script>

<style lang="scss" scoped>
@import '@/common/css/theme.scss';

.history-item-blue {
  @include Theme('background', 'event_history_blue_bg');
  .history-item-blue-child {
    @include Theme('background', 'event_history_blue_bg2');
  }
}

.history-item-green {
  @include Theme('background', 'event_history_green_bg');
  .history-item-green-child {
    @include Theme('background', 'event_history_green_bg2');
  }
}

.history-item-purple {
  @include Theme('background', 'event_history_purple_bg');
  .history-item-purple-child {
    @include Theme('background', 'event_history_purple_bg2');
  }
}
</style>
