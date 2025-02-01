<template>
  <ReCard>
    <template #title> 附件 </template>
    <div class="p-6 flex items-center flex-wrap" v-auto-animate>
      <div
        v-for="item in fileList"
        class="flex flex-col items-center w-[140px] mr-3"
      >
        <div class="w-full h-[108px] rounded-md overflow-hidden">
          <img :src="item.url" :alt="item.name" class="w-full" />
        </div>
        <span class="text-theme text-xs mt-2 w-[130px] text-center truncate">{{
          item.name
        }}</span>
      </div>
      <div class="flex flex-col items-center w-[140px]">
        <el-upload
          class="w-full h-[108px]"
          drag
          multiple
          :before-upload="handleBeforeUpload"
        >
          <div class="flex items-center justify-center">
            <i-ep-top class="text-placeholder text-2xl"></i-ep-top>
          </div>
        </el-upload>
        <span class="text-secondary text-xs mt-2">拖动或粘贴附件进行上传</span>
      </div>
    </div>
  </ReCard>
</template>

<script setup lang="ts">
interface fileItem {
  name: string;
  file: File;
  url: string;
}

const fileList = ref<fileItem[]>([]);

const getBase64 = (file: File) => {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();
    let imgResult: string | ArrayBuffer | null = '';
    reader.readAsDataURL(file);
    reader.onload = function () {
      imgResult = reader.result;
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.onloadend = function () {
      resolve(imgResult);
    };
  });
};

const handleBeforeUpload = async (file: File) => {
  const url = (await getBase64(file)) as string;
  fileList.value.push({
    url,
    name: file.name,
    file,
  });
};
</script>

<style lang="scss" scoped></style>
