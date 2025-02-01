<template>
  <el-form-item :label="label">
    <div class="w-full font-normal">
      <el-date-picker
        v-model="value"
        type="date"
        placeholder="选择日期"
        class="!w-full"
      />
    </div>
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
