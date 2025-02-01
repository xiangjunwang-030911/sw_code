<template>
  <el-form-item :label="label">
    <span class="w-full font-normal" v-html="modelValue || ''"> </span>
  </el-form-item>
</template>

<script setup lang="ts">
interface Props {
  modelValue: any;
  label: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss"></style>
