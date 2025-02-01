<template>
  <el-form-item :label="label">
    <div class="w-full font-normal">
      <el-select
        class="w-full"
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="2"
        v-model="value"
        value-key="id"
        placeholder="请选择"
      >
        <el-option
          v-for="choice in listChoice"
          :key="choice.id"
          :label="choice.name"
          :value="choice.id"
        />
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
