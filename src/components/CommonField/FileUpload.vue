<template>
  <el-form-item :label="label">
    <div class="w-full border border-solid border-[#E9E9E9]">
      <FileUpload
        v-model="value"
        class="w-full pl-[29px] py-[27px]"
      ></FileUpload>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import FileUpload from '@/components/Upload/index.vue';

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
