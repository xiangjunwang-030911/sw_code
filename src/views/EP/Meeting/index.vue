<template>
  <div class="h-full border-none" v-loading="loading">
    <iframe
      ref="iframeRef"
      class="w-full h-full"
      :src="frameSrc"
      @load="hideLoading"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { LanguageIdEnum } from '@/enums/commonEnum';
import { IframePostMessageEnum, KloudLanguage } from '@/enums/iframeEnum';
import { useAuthStore } from '@/store/modules/auth';
import { useSysStore } from '@/store/modules/sys';
import { useIframe } from '@/utils/iframeHelper';

const { meetingListIframe } = useIframe();
const authStore = useAuthStore();
const sysStore = useSysStore();
const loading = ref(true);
const iframeRef = ref<HTMLIFrameElement>();

const frameSrc = ref(
  meetingListIframe({
    subsystemId: sysStore.getSubSystemId as number,
  }),
);
const hideLoading = () => {
  loading.value = false;
};
watch(
  () => authStore.getLanguageId,
  (languageId) => {
    iframeRef.value?.contentWindow?.postMessage(
      {
        type: IframePostMessageEnum.CHANGE_KLOUD_LANGUAGE,
        languageid:
          languageId == LanguageIdEnum.EN ? KloudLanguage.EN : KloudLanguage.CN,
      },
      '*',
    );
  },
);
</script>

<style lang="scss" scoped></style>
