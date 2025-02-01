<template>
  <el-form-item class="!items-start" :label="label">
    <div class="w-full font-normal">
      <el-input
        v-if="!attributes.SupportHTMLFormat"
        type="textarea"
        rows="2"
        class="indent-1"
        v-model="value"
        placeholder="请输入"
      ></el-input>
      <Tinymce v-else :value="value" @input="handleInput"></Tinymce>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { Attributes } from './typing';

interface Props {
  modelValue: any;
  label: string;
  attributes: Attributes;
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

const handleInput = (val: string) => {
  emit('update:modelValue', val);
};
</script>

<style scoped lang="scss"></style>
