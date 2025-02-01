<template>
  <el-form-item :label="label">
    <div class="w-full font-normal">
      <el-checkbox-group v-model="value">
        <el-checkbox
          v-for="choice in listChoice"
          :key="choice.id"
          :label="choice.name"
        />
      </el-checkbox-group>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { ChoiceItem } from '@/api/ep/userInfo/userInfoModel';

interface Props {
  modelValue: any;
  label: string;
  listChoice?: ChoiceItem[];
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

<style lang="scss" scoped></style>
