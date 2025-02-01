<template>
  <div class="bg-white">
    <header class="w-full h-20 pt-8 pb-0 px-12 sm:h-28 sm:pb-8">
      <a href="javascript:;" class="inline-block">
        <img
          src="../../assets/images/engineerLogin/engineer_login_logo.png"
          alt="engineer_login_logo"
        />
      </a>
    </header>
    <div class="wrap flex justify-evenly items-center pt-0 lg:pt-14">
      <div class="hidden lg:block enter-x">
        <img
          src="../../assets/images/engineerLogin/engineer_login_banner.png"
          alt="engineer_login_logo"
        />
      </div>
      <div class="login-form w-[calc(100% - 20px)] pb-11 text-center enter-x">
        <h2 class="my-6 text-2xl font-pingfang font-semibold text-black">
          {{ $t('login.it_service_platform') }}
        </h2>
        <div class="shadow-login px-9 w-[422px]">
          <el-form
             :model="formItem"
            :label-width="100"
            class="pt-12 rounded-sm"
          >
            <el-form-item
              v-if="languageList.length"
              :label="$t('login.language')"
              prop="languageId"
              class="mb-9 enter-x"
            >
              <el-select
                :model-value="authStore.getLanguageId"
                class="w-full"
                @change="handleChangeLang"
              >
                <el-option
                  v-for="item in languageList"
                  :key="item.languageID"
                  :value="item.languageID"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              :label="$t('login.login_name')"
              prop="username"
              class="mb-9 enter-x"
            >
              <el-input
                class="w-full"
                v-model="formItem.username"
                :placeholder="$t('login.input_login_name')"
              >
              </el-input>
            </el-form-item>   
            <el-form-item
              :label="$t('login.password')"
              prop="password"
              class="mb-9 enter-x"
            >
              <el-input
                class="w-full"
                type="password"
                v-model="formItem.password"
                :placeholder="$t('login.input_password')"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="client == 'sp'"
              :label="$t('login.project')"
              prop="projectId"
              class="mb-9 enter-x"
            >
              <el-select v-model="formItem.projectId" class="w-full">
                <el-option
                  :value="0"
                  :label="$t('login.event_management')"
                ></el-option>
                <el-option
                  :value="1"
                  :label="$t('login.project_management')"
                ></el-option>
              </el-select>
            </el-form-item>  

            <el-button
              ref="LoginButton"
              class="mb-9 w-40"
              :disabled="!enableLogin"
              type="primary"
              @click="handleLogin"
              >{{ $t('login.login') }}</el-button
            >         
          </el-form>
        </div>
      </div>
    </div>


    <footer
      class="fixed bottom-0 flex justify-center w-full h-28 bg-login-footer bg-cover"
    >
      <!-- 背景 -->
      <p
        class="license flex flex-col justify-center items-center absolute bottom-2 font-pingfang text-xs font-weight text-white lg:block"
      >
        <span class="leading-5">{{
          $t('login.corporate_copyright_notice')
        }}</span>
        <span class="leading-5"
          >&nbsp;{{ $t('login.company_record_number') }}</span
        >
        <span class="leading-5"
          >&nbsp;{{ $t('login.presentation_of_consent_terms') }}</span
        >
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
//import { ref, reactive, watch, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
//import { LocationQueryValue, useRoute, useRouter } from 'vue-router';
import { getLanguageListApi } from '@/api/auth';
import { GetLanguageListApiResult } from '@/api/auth/authModel';
//import { useAuthStore } from '@/store/modules/auth';
import { get } from 'lodash-es';

import {ref,reactive,watch,onMounted,computed} from 'vue';
import { LocationQueryValue,useRoute,useRouter } from 'vue-router';
import { useAuthStore } from '@/store/modules/auth';



interface IFormItem {
  projectId: number;
  username: string;
  password: string;
}

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const authStore = useAuthStore();

const client = ref('ep');

const LoginButton=ref(null);



let languageList = ref<GetLanguageListApiResult[]>([]);

let formItem: IFormItem = reactive({
  projectId: 0,
  username: '',
  password: '',
});


const handleChangeLang = (languageId: number) => {
  authStore.setLanguage(languageId);
  if (languageId === 1) {
    locale.value = 'en';
  } else if (languageId === 2) {
    locale.value = 'zh';
  }
};

watch(
  () => client.value,
  (nVal) => {
    Object.assign(formItem, {
      username: '',
      password: '',
      ...(nVal === 'sp' ? { projectId: 0 } : {}),
    });
  },
);

const enableLogin = computed(() => {
  return !!(formItem.username && formItem.password);
});


const getClient = () => {
  client.value = route.path.match(/\/([a-zA-Z]+)\//)?.[1] as string;
};

const handleLogin = async () => {
  await authStore.login({
    client: client.value,
    username: formItem.username,
    password: formItem.password,
  });
  let redirect = route.query.redirect as LocationQueryValue;
  if (!redirect) {
    router.push({
      path: `/${client.value}/home`,
    });
    return;
  }
  router.push(redirect);
};

const getLanguageList = async () => {
  const res = await getLanguageListApi();
  languageList.value = res;
  authStore.setLanguageList(res);
};

onMounted(() => {
  getClient();
  getLanguageList();
  console.log(LoginButton.value);
});
</script>

<style lang="scss" scoped></style>
