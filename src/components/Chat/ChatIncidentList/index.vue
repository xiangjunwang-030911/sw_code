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
    <div class="mt-4">
      <IncidentCard
        v-for="item in incidentList"
        class="mb-2"
        :is-active="item.isActive"
        :incident-id="item.incidentId"
        :time="item.time"
      ></IncidentCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const IncidentCard = defineAsyncComponent(
  () => import('./components/IncidentCard.vue'),
);

interface IncidentListItem {
  incidentId: number;
  time: string;
  isActive?: boolean;
}

const search = ref('');

const incidentList = ref<IncidentListItem[]>([
  {
    incidentId: 423,
    time: '10:30 am',
    isActive: true,
  },
  {
    incidentId: 424,
    time: '10:30 am',
    isActive: false,
  },
]);
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  box-shadow: none !important;
  border-radius: 15px;
}
</style>
