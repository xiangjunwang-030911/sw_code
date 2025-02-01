<template>
  <el-form-item :label="label">
    <div class="w-full font-normal">
      <el-select
        class="w-full"
        v-model="value"
        placeholder="请选择"
        :filterable="true"
        :allow-create="true"
        :default-first-option="true"
        :reserve-keyword="false"
        :fit-input-width="true"
      >
        <el-option
          v-for="choice in listChoice"
          :key="choice.id"
          :label="choice.name"
          :value="choice.id"
        >
        </el-option>
      </el-select>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { ChoiceItem } from '@/api/ep/userInfo/userInfoModel';

interface Props {
  modelValue: any;
  label: string;
  fieldTypeId: number;
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
