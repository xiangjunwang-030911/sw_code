<template>
  <div>Loading...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
onMounted(() => {
  window.open(location.origin + '/#/admin');
  router.back();
});
</script>

<style></style>
