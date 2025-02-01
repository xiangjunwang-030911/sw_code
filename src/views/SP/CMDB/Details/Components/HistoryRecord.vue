<template>
  <div>
    <p class="pr-[8px]">负责人及状态变更历史：</p>
    <div class="history flex py-[24px] mb-[24px]">
      <template v-for="item in statuChange" :key="item.progress.date">
        <div class="flex-1 flex justify-around">
          <div
            class="allocation w-[114px] flex flex-col justify-center items-center"
          >
            <svg-icon
              :iconClass="`history_${item.allocation.type}`"
              size="24"
              className=""
            ></svg-icon>
            <p class="pt-4 pb-2">{{ item.allocation.operate }}</p>
            <p>{{ item.allocation.name }}</p>
          </div>
          <div
            class="progress w-[158px] h-[124px] flex flex-col items-center border border-normal"
          >
            <p class="w-full flex-1 flex justify-center items-center bg-page">
              In Progress
            </p>
            <p class="w-full flex-1 flex justify-center items-center">
              {{ item.progress.date }}
            </p>
            <p class="w-full flex flex-col justify-center items-center bg-page">
              <span>负责人</span>
              <span>{{ item.progress.name }}</span>
            </p>
          </div>
        </div>
      </template>
    </div>
    <div class="log">
      <el-collapse model-value="1">
        <el-collapse-item name="1">
          <template #title>
            <div class="flex items-center">
              <p class="pr-[8px]">变更日志</p>
            </div>
          </template>

          <div>
            <template v-for="item in changeLog" :key="item.date">
              <div
                class="flex items-center h-[50px] border-b border-normal mb-[4px] pb-[4px]"
              >
                <p class="flex-1">{{ item.date }}</p>
                <p class="flex-1">{{ item.name }}</p>
                <p class="flex-[2_2_0%]">{{ item.operate }}</p>
              </div>
            </template>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  statuChange: {
    allocation: {
      type: string;
      operate: string;
      name: string;
    };
    progress: {
      date: string;
      name: string;
    };
  }[];
  changeLog: {
    date: string;
    name: string;
    operate: string;
  }[];
}

withDefaults(defineProps<Props>(), {
  statuChange: () => [
    {
      allocation: {
        type: 'submit',
        operate: 'Submitted by',
        name: 'Hui Zhang',
      },
      progress: {
        date: '2023-05-05 14:22:21',
        name: 'David He',
      },
    },
    {
      allocation: {
        type: 'assign',
        operate: 'Forwarded by',
        name: 'Hui Zhang',
      },
      progress: {
        date: '2023-05-05 14:22:21',
        name: 'David He',
      },
    },
    {
      allocation: {
        type: 'assign',
        operate: 'QA Verify by',
        name: 'Hui Zhang',
      },
      progress: {
        date: '2023-05-05 14:22:21',
        name: 'David He',
      },
    },
    {
      allocation: {
        type: 'close',
        operate: 'Closed by',
        name: 'Hui Zhang',
      },
      progress: {
        date: '2023-05-05 14:22:21',
        name: 'David He',
      },
    },
  ],
  changeLog: () => [
    {
      date: '2023-05-31 09:23:57',
      name: 'Hui Zhang',
      operate: 'Transition Performed - - Verify Successfully',
    },
    {
      date: '2023-05-31 09:23:56',
      name: 'Hui Zhang',
      operate:
        'Change Progress Status from‘QA Floater Verify’ to ‘Closed Done’.',
    },
    {
      date: '2023-05-31 09:23:49',
      name: 'Hui Zhang',
      operate: 'Transition Performed - - Verify Successfully',
    },
    {
      date: '2023-05-31 09:23:48',
      name: 'Hui Zhang',
      operate:
        'Change Progress Status from‘In Progress’ to ‘QA Floater Verify’.',
    },
    {
      date: '2023-05-31 09:23:47',
      name: 'Hui Zhang',
      operate: 'Change Points from ‘8’ to ‘7’.',
    },
    {
      date: '2023-05-31 09:23:40',
      name: 'Hui Zhang',
      operate: 'Change Time Remaining from ‘1h’ to ‘0h’.',
    },
    {
      date: '2023-05-31 09:23:20',
      name: 'Hui Zhang',
      operate: 'Change Points from ‘8’ to ‘7’.',
    },
    {
      date: '2023-05-31 09:23:17',
      name: 'Hui Zhang',
      operate: 'Change Time Remaining from ‘1h’ to ‘0h’.',
    },
  ],
});
</script>

<style lang="scss" scoped>
:deep(.el-collapse) {
  border: none;
}
// :deep(.el-collapse > .el-collapse-item > .el-collapse-item__header > i) {
//   display: none;
// }
</style>
