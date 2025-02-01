<template>
  <el-form-item :label="label">
    <el-input
      v-model="value"
      class="indent-1 font-normal"
      :placeholder="'请输入'"
    ></el-input>
  </el-form-item>
</template>

<script setup lang="ts">
interface Props {
  modelValue: any;
  label: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style scoped lang="scss"></style>
