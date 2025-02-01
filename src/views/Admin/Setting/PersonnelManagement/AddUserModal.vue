<template>
  <ModalWrapper
    :show.sync="show"
    title="新增"
    width="580"
    @close="close"
    @ok="ok"
    @init="init('123456')"
  >
    <div class="pt-[24px] flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <p class="w-[70px] font-[600] text-right pr-2 whitespace-nowrap">
            登录名:
          </p>
          <el-input
            class="w-[160px]"
            v-model="loginName"
            placeholder="登录名"
          ></el-input>
        </div>
        <div class="flex items-center">
          <p class="w-[70px] font-[600] text-right pr-2 whitespace-nowrap">
            用户名称:
          </p>
          <el-input
            class="w-[160px]"
            v-model="userName"
            placeholder="用户名称"
          ></el-input>
        </div>
      </div>
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <p class="w-[70px] font-[600] text-right pr-2 whitespace-nowrap">
            部门:
          </p>
          <el-select v-model="department" class="w-[160px]" placeholder="部门">
            <el-option
              v-for="item in departmentList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </div>
        <div class="flex items-center">
          <p class="w-[70px] font-[600] text-right pr-2 whitespace-nowrap">
            手机号码:
          </p>
          <el-input
            class="w-[160px]"
            v-model="phone"
            placeholder="手机号码"
          ></el-input>
        </div>
      </div>
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <p class="w-[70px] font-[600] text-right pr-2 whitespace-nowrap">
            状态:
          </p>
          <CustomSwitch v-model="status"></CustomSwitch>
          <p class="font-[600] pl-2 whitespace-nowrap">激活/停用</p>
        </div>
        <div class="flex items-center">
          <p class="w-[70px] font-[600] text-right pr-2 whitespace-nowrap">
            邮箱:
          </p>
          <el-input
            class="w-[160px]"
            v-model="email"
            placeholder="邮箱"
            autocomplete="new-password"
          ></el-input>
        </div>
      </div>
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <p class="w-[70px] font-[600] text-right pr-2 whitespace-nowrap">
            密码:
          </p>
          <el-input
            class="w-[160px]"
            type="password"
            v-model="password"
            placeholder="输入密码"
            autocomplete="new-password"
          ></el-input>
        </div>
        <div class="flex items-center">
          <p class="w-[70px] font-[600] text-right pr-2 whitespace-nowrap">
            性别:
          </p>
          <el-select v-model="sex" class="w-[160px]" placeholder="选择性别">
            <el-option
              v-for="item in sexList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="flex mb-6">
        <p class="w-[70px] font-[600] text-right pr-2 whitespace-nowrap">
          备注:
        </p>
        <el-input type="textarea" v-model="notes" placeholder="备注"></el-input>
      </div>
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <p class="w-[70px] font-[600] text-right pr-2 whitespace-nowrap">
            角色:
          </p>
          <el-select v-model="roles" multiple class="w-[160px]" placeholder="">
            <el-option
              v-for="item in rolesList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </div>
        <div class="flex items-center">
          <p class="w-[70px] font-[600] text-right pr-2 whitespace-nowrap">
            其他:
          </p>
          <el-input class="w-[160px]" v-model="other" placeholder=""></el-input>
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { ref, reactive, defineAsyncComponent } from 'vue';
const CustomSwitch = defineAsyncComponent(
  () => import('@/components/globalComponents/CustomSwitch.vue'),
);

interface Props {
  show: boolean;
}
withDefaults(defineProps<Props>(), {
  show: false,
});

interface Emits {
  (e: 'close', value: boolean): void;
}
const emit = defineEmits<Emits>();

const loginName = ref('');
const userName = ref('');
const department = ref('');
const phone = ref('');
const status = ref(false);
const email = ref('');
const password = ref('');
const sex = ref('');
const notes = ref('');
const roles = ref([]);
const other = ref('');

interface DepartmentItem {
  value: string;
  label: string;
}
const departmentList: DepartmentItem[] = reactive([
  {
    value: '0',
    label: '部门1',
  },
  {
    value: '1',
    label: '部门2',
  },
  {
    value: '2',
    label: '部门3',
  },
]);

interface SexItem {
  value: string;
  label: string;
}
const sexList: SexItem[] = reactive([
  {
    value: '0',
    label: '男',
  },
  {
    value: '1',
    label: '女',
  },
]);

interface RoleItem {
  value: string;
  label: string;
}
const rolesList: RoleItem[] = reactive([
  {
    value: '0',
    label: '角色1',
  },
  {
    value: '1',
    label: '角色2',
  },
]);
const close = () => {
  emit('close', false);
};

const ok = () => {
  emit('close', false);
};
const init = (params: string) => {
  console.log(params);
};
</script>

<style lang="scss" scoped></style>
