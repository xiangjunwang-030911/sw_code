<template>
  <el-upload
    multiple
    :drag="true"
    action="//jsonplaceholder.typicode.com/posts/"
    :show-file-list="showFileList"
    :limit="limit"
    :on-success="successUpload"
  >
    <div
      class="flex flex-col items-center w-[148px] h-[148px] p-5 border border-solid border-normal text-center"
    >
      <IEpPlus size="30" color="#a0a0a0"></IEpPlus>
      <p>拖动或选择附件 进行上传</p>
    </div>
  </el-upload>
</template>

<script setup lang="ts">
import type { UploadFile, UploadFiles } from 'element-plus';
interface Props {
  modelValue: any;
  limit: number;
  showFileList: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  limit: 1,
  showFileList: true,
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const successUpload = (
  response: any,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles,
) => {
  value.value = uploadFile.name;
  console.log('successUpload', response);
  console.log('successUpload', uploadFile);
  console.log('successUpload', uploadFiles);
};
</script>

<style lang="scss" scoped>
:deep(.el-upload-dragger) {
  border: none;
  padding: 0;
}
</style>
