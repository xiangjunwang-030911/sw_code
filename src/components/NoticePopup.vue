<template>
  <el-popover
    placement="bottom"
    width="auto"
    :show-arrow="false"
    trigger="click"
  >
    <template #reference>
      <div class="ml-2 mr-4">
        <el-badge :value="2" :max="99" class="item">
          <svg-icon
            iconClass="common-notification"
            className="cursor-pointer"
            size="19"
          />
        </el-badge>
      </div>
    </template>
    <template #default>
      <div class="w-[248px]">
        <div class="flex justify-between items-center w-[248px] px-[4px] my-2">
          <p class="cursor-default font-[600] text-[#131313]">工作条目</p>
          <p class="cursor-pointer text-[12px] text-[#505050]">全部标为已读</p>
        </div>
        <SearchBox
          :minWidth="''"
          :responsiveWidth="''"
          :extraClass="'w-full px-[4px] mb-[16px]'"
          :placeholder="'输入关键字'"
          :searchIcon="true"
          searchBtn="search_icon"
          @search="searchEntry"
        ></SearchBox>
        <div class="entry-list max-h-[220px] pb-[4px] px-[4px] overflow-y-auto">
          <template v-if="noticeData.length > 0">
            <template v-for="item in noticeData" :key="item.no">
              <div
                :class="
                  'entry flex flex-col p-[8px] mb-[12px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.14)] rounded-sm cursor-pointer hover:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.34)] relative ' +
                  (item.newNotice ? 'new-notice' : '')
                "
              >
                <div class="flex justify-between text-[12px]">
                  <div class="flex items-center">
                    <svg-icon
                      iconClass="Engineer_home_tableicon2"
                      className="cursor-pointer"
                      size="12"
                    />
                    <span class="ml-[3px]">{{ item.no }}</span>
                  </div>
                  <div>{{ item.date }}</div>
                  <div>{{ item.classify }}</div>
                </div>
                <div
                  class="flex justify-between items-center pt-[18px] pb-[8px]"
                >
                  <p
                    class="flex-1 overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {{ item.desc }}
                  </p>
                  <span
                    class="w-[68px] h-[20px] leading-[20px] primary text-center rounded-[3px] ml-[8px]"
                    >{{ item.level }}</span
                  >
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <div
              class="w-full h-[30px] leading-[30px] text-center text-[#505050]"
            >
              暂无通知
            </div>
          </template>
        </div>
        <div class="flex justify-between items-center px-[4px] mt-[4px]">
          <svg-icon iconClass="setIcon" className="cursor-pointer" size="24" />
          <span class="cursor-pointer text-[12px] text-[#505050]"
            >查看全部通知></span
          >
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
interface Props {
  noticeData?: NoticeDataItem[];
}

interface NoticeDataItem {
  no: string;
  date: string;
  classify: string;
  desc: string;
  level: string;
  newNotice: boolean;
}

withDefaults(defineProps<Props>(), {
  noticeData: () => [
    {
      no: '31671',
      date: '5月24日 15:32:00',
      classify: '事件管理',
      desc: '申请邮箱',
      level: '一线支持',
      newNotice: true,
    },
    {
      no: '31672',
      date: '5月24日 15:32:00',
      classify: '事件管理',
      desc: '申请邮箱',
      level: '一线支持',
      newNotice: false,
    },
    {
      no: '31673',
      date: '5月24日 15:32:00',
      classify: '事件管理',
      desc: '申请邮箱',
      level: '一线支持',
      newNotice: false,
    },
    {
      no: '31674',
      date: '5月24日 15:32:00',
      classify: '事件管理',
      desc: '申请邮箱',
      level: '一线支持',
      newNotice: false,
    },
  ],
});

const searchEntry = (key: string) => {
  console.log(key);
};
</script>

<style lang="scss" scoped>
:deep(.ivu-poptip) {
  display: flex !important;
}
:deep(.ivu-poptip-popper) {
  top: 44px !important;
}
:deep(.ivu-poptip-title:after) {
  width: 0;
}

.entry-list {
  &::-webkit-scrollbar-track-piece {
    background: #fafafa;
  }

  &::-webkit-scrollbar-track {
    background: #fafafa;
  }

  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 20px;
    &:hover {
      background: #7c7d7d;
    }
  }
}
.entry {
  .primary {
    background-color: #d2ecfd;
  }
}

.entry.new-notice:before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #fd6a6a;
  position: absolute;
  top: 3px;
  left: 3px;
}
</style>
