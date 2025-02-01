<template>
  <div class="h-full border-none px-3 pt-3 bg-default">
    <div class="px-4">
      <div
        class="flex justify-between items-center pb-4 border-b border-normal enter-x"
      >
        <div class="flex items-center">
          <el-select
            v-model="type"
            placeholder="类型"
            class="w-[130px] mr-[24px]"
          >
            <el-option
              v-for="item in typeList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</el-option
            >
          </el-select>
          <el-select
            v-model="staff"
            placeholder="*所有员工"
            class="w-[130px] mr-[24px]"
          >
            <el-option
              v-for="item in staffList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</el-option
            >
          </el-select>
          <el-select
            v-model="type"
            placeholder="{打开&关闭}"
            class="w-[130px] mr-[24px]"
          >
            <el-option
              v-for="item in typeList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</el-option
            >
          </el-select>
          <svg-icon
            iconClass="sp-team-timeIcon"
            size="16"
            className="mr-[8px]"
          ></svg-icon>
          <p class="mr-[24px]">预估工时</p>
          <p>0个工作项</p>
        </div>
        <div class="flex items-center">
          <CustomTab
            v-model="dateFormat"
            class="w-[100px] mr-4"
            :list="rangeList"
            bg="var(--el-bg-color)"
            tabBg="#f0faf1"
            @change="handleDateFormatChange"
          ></CustomTab>
          <div>
            <el-date-picker
              v-model="selectedDateStr"
              type="daterange"
              unlink-panels
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
              :shortcuts="shortcuts"
              @change="handleOk"
            />
          </div>
        </div>
      </div>
      <div class="pt-4 flex enter-x">
        <div class="mr-[40px] enter-x">
          <SearchBox
            :minWidth="''"
            :responsiveWidth="''"
            :extraClass="'w-[200px] mb-4'"
            :placeholder="'搜索'"
            :searchIcon="true"
            searchBtn="search_icon"
            @search="search"
          ></SearchBox>
          <template v-for="item in taskHoursList" :key="item.name">
            <div
              class="flex justify-between items-center h-[48px] leading-[48px] border-b border-light"
            >
              <span class="text-[#505050]">{{ item.name }}</span>
              <span class="text-[rgba(0,0,0,.45)]"
                >{{ item.realHours }}/{{ item.allHours }}</span
              >
            </div>
          </template>
        </div>
        <Table
          class="calc-width scrollBar-light2 enter-x"
          :data="taskHoursTableData"
          :columns="taskHoursTableCol"
        ></Table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, defineAsyncComponent } from 'vue';
const SearchBox = defineAsyncComponent(
  () => import('@/components/globalComponents/SearchBox.vue'),
);
const CustomTab = defineAsyncComponent(
  () => import('@/components/CustomTab.vue'),
);
const type = ref('');
const typeList = reactive([
  {
    value: 0,
    label: '类型1',
  },
  {
    value: 1,
    label: '类型2',
  },
  {
    value: 2,
    label: '类型3',
  },
]);
const staff = ref('');
const staffList = reactive([
  {
    value: 0,
    label: '员工1',
  },
  {
    value: 1,
    label: '员工2',
  },
  {
    value: 2,
    label: '员工3',
  },
]);
const rangeList = reactive([
  {
    id: 0,
    name: '日',
  },
  {
    id: 1,
    name: '工作日',
  },
  {
    id: 2,
    name: '周',
  },
  {
    id: 3,
    name: '月',
  },
]);
const selectedDateStr = ref<[Date, Date]>();
const dateFormat = ref(0);

const taskHoursTableCol = ref<Table.Column[]>([]);
const taskHoursTableData = ref<Record<string, number>[]>([]);
const taskHoursList = reactive([
  {
    name: '周佳杰',
    realHours: '0',
    allHours: '0',
  },
  {
    name: 'Tieren Zhou',
    realHours: '0',
    allHours: '0',
  },
  {
    name: 'Frank Zeng',
    realHours: '0',
    allHours: '0',
  },
  {
    name: '董挺宇',
    realHours: '0',
    allHours: '0',
  },
  {
    name: '周佳杰',
    realHours: '0',
    allHours: '0',
  },
  {
    name: 'Tieren Zhou',
    realHours: '0',
    allHours: '0',
  },
  {
    name: 'Frank Zeng',
    realHours: '0',
    allHours: '0',
  },
  {
    name: '董挺宇',
    realHours: '0',
    allHours: '0',
  },
]);
const shortcuts = ref([
  {
    text: 'Last week',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
]);

interface HeaderObj {
  week: string;
  month: number;
  day: number;
}

const initColumns = () => {
  let dateRange;
  if (selectedDateStr.value?.length !== 2) {
    const currentDate = new Date();
    const lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    selectedDateStr.value = [lastWeekDate, currentDate];
    dateRange = [lastWeekDate, currentDate];
  } else {
    dateRange = selectedDateStr.value;
  }
  let headerText: HeaderObj[] = [];
  let weekDist = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  for (let i = 0; ; i++) {
    let date = new Date(
      new Date(dateRange[0]).setDate(new Date(dateRange[0]).getDate() + i),
    );
    if (date.getTime() > new Date(dateRange[1]).getTime()) break;
    let week = weekDist[date.getDay()];
    let month = date.getMonth() + 1;
    let day = date.getDate();
    headerText.push({ week, month, day });
  }

  taskHoursTableCol.value = headerText.map((item) => {
    return {
      label: `${item.month}/${item.day}`,

      prop: `${item.month}/${item.day}`,
      minWidth: 100,
      resizable: true,
      tooltip: true,
    };
  });

  taskHoursTableData.value = taskHoursList.map(() => {
    return headerText.reduce((acc: Record<string, number>, item) => {
      acc[`${item.month}/${item.day}`] = 0;
      return acc;
    }, {});
  });
};
// const getDefaultDate = () => {
//   const currentDate = new Date();
//   const lastWeekDate = new Date();
//   lastWeekDate.setDate(lastWeekDate.getDate() - 13);
// };

const search = (key: string) => {
  console.log(`搜索 ${key}`);
};

const handleDateFormatChange = () => {};

const handleOk = () => {
  initColumns();
};

onMounted(() => {
  initColumns();
});
</script>

<style lang="scss" scoped>
.date {
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    cursor: pointer;
    &.selected {
      background: var(--el-color-primary);
    }
  }
}
:deep(th .cell) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-table__header thead tr th) {
  padding: 0;
  height: 50px;
}

:deep(.el-table td) {
  padding: 0;
  height: 48px;
}

.calc-width {
  width: 100%;
}
</style>
