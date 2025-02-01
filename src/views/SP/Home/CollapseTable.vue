<template>
  <el-card
    class="h-[511px] overflow-hidden mt-2 mr-2 c3 card"
    shadow="hover"
    :bordered="false"
  >
    <template #header>
      <p
        class="h-[34px] text-[14px] font-bold text-left border-b border-solid border-light"
      >
        {{ t('home.work_item') }}
        <el-select
          v-model="model1"
          class="member ml-[20px]"
          :placeholder="t('home.select_member')"
        >
          <el-option
            v-for="(item, index) in cityList"
            :value="item"
            :key="index"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="model1"
          class="head ml-[20px]"
          :placeholder="t('home.responsible_person')"
        >
          <el-option
            v-for="(item, index) in cityList"
            :value="item"
            :key="index"
          >
          </el-option>
        </el-select>
        <svg-icon
          iconClass="ep-common-icon_refresh"
          class="absolute right-[22px] top-[20px] cursor-pointer"
          size="16"
        />
        <svg-icon
          iconClass="common-icon_setting"
          class="absolute right-[47px] top-[20px] cursor-pointer"
          size="16"
        />
      </p>
    </template>

    <el-collapse
      accordion
      v-for="(item, index) in table.list"
      :key="index"
      v-model="collapseValue"
    >
      <el-collapse-item :name="index + ''">
        <template #title>
          <div class="w-full flex justify-between ml-4">
            <div class="flex items-center">
              <svg-icon :iconClass="item.icon" size="12" class="mr-2" />
              0{{ index + 1 }}.{{ item.name }}（{{
                item.data.length
              }}）&nbsp;&nbsp;&nbsp;&nbsp;
              <div @click.stop="addItem" class="flex items-center">
                <svg-icon
                  iconClass="Engineer_home_add"
                  size="16"
                  class="add mr-2"
                  alt=""
                />
                {{ t('home.new') }}
              </div>
            </div>
            <el-pagination
              ref="pagination"
              small
              layout="prev, pager, next"
              :total="50"
              @click.stop="() => {}"
              @current-change="handlePageChange"
            />
          </div>
        </template>
        <Table :columns="item.columns" :data="item.data"></Table>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const collapseValue = ref('0');
const model1 = ref('');
const cityList = reactive([1, 2, 3]);

interface CollapseItem {
  list: ListItem[];
  cityList: {}[];
}

interface ListItem {
  name: string;
  icon: string;
  columns: Table.Column[];
  data: WorkData[];
}
interface WorkData {
  name: string;
  age: number;
  address: string;
}
const table: CollapseItem = reactive({
  list: [
    {
      name: '服务台&事件管理',
      icon: 'Engineer_home_tableicon1',
      columns: [
        {
          label: t('home.event_id'),
          prop: 'name',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          renderHeader() {
            return t('home.title');
          },
          prop: 'age',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          renderHeader() {
            return t('home.three_level_classification');
          },
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          renderHeader() {
            return t('home.date_of_submission');
          },
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          renderHeader: () => {
            return t('home.predicted_response');
          },
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          renderHeader: () => {
            return t('home.anticipated_settlement');
          },
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          renderHeader: () => {
            return t('home.current_state');
          },
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 160,
        },
        {
          renderHeader: () => {
            return t('home.assigner');
          },
          prop: 'address',
          sortable: true,
          resizable: true,
          minWidth: 200,
        },
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
        },
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
        },
      ],
    },
    {
      name: t('home.problem_management'),
      icon: 'Engineer_home_tableicon2',
      columns: [
        {
          renderHeader: () => {
            return t('home.event_id');
          },
          prop: 'name',
          sortable: true,
          resizable: true,
          width: 100,
        },
        {
          renderHeader: () => {
            return t('home.title');
          },
          prop: 'age',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          renderHeader: () => {
            return t('home.three_level_classification');
          },
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          renderHeader: () => {
            return t('home.date_of_submission');
          },
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          renderHeader: () => {
            return t('home.predicted_response');
          },
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          renderHeader: () => {
            return t('home.anticipated_settlement');
          },
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          renderHeader: () => {
            return t('home.current_state');
          },
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 160,
        },
        {
          renderHeader: () => {
            return t('home.assigner');
          },
          prop: 'address',
          sortable: true,
          resizable: true,
          minWidth: 200,
        },
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
        },
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
        },
      ],
    },
    {
      name: t('home.change_management'),
      icon: 'Engineer_home_tableicon3',
      columns: [
        {
          label: t('home.event_id'),
          prop: 'name',
          sortable: true,
          resizable: true,
          width: 100,
        },
        {
          label: t('home.title'),
          prop: 'age',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.three_level_classification'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.date_of_submission'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.predicted_response'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.anticipated_settlement'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.current_state'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 160,
        },
        {
          label: t('home.assigner'),
          prop: 'address',
          sortable: true,
          resizable: true,
          minWidth: 200,
        },
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
        },
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
        },
      ],
    },
    {
      name: t('home.application_requirement_management'),
      icon: 'Engineer_home_tableicon4',
      columns: [
        {
          label: t('home.event_id'),
          prop: 'name',
          sortable: true,
          resizable: true,
          width: 100,
        },
        {
          label: t('home.title'),
          prop: 'age',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.three_level_classification'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.date_of_submission'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.predicted_response'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.anticipated_settlement'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.current_state'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 160,
        },
        {
          label: t('home.assigner'),
          prop: 'address',
          sortable: true,
          resizable: true,
          minWidth: 200,
        },
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
        },
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
        },
      ],
    },
    {
      name: t('home.finance_share_work_order'),
      icon: 'Engineer_home_tableicon5',
      columns: [
        {
          label: t('home.event_id'),
          prop: 'name',
          sortable: true,
          resizable: true,
          width: 100,
        },
        {
          label: t('home.title'),
          prop: 'age',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.three_level_classification'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.date_of_submission'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.predicted_response'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.anticipated_settlement'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 200,
        },
        {
          label: t('home.current_state'),
          prop: 'address',
          sortable: true,
          resizable: true,
          width: 160,
        },
        {
          label: t('home.assigner'),
          prop: 'address',
          sortable: true,
          resizable: true,
          minWidth: 200,
        },
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
        },
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
        },
      ],
    },
  ],
  cityList: [{}],
});

const handlePageChange = (page: number) => {
  console.log(page);
};

const addItem = () => {};
</script>

<style lang="scss" scoped>
.card {
  :deep(.el-card__header) {
    padding: 16px 14px;
    height: 50px;
    // border-bottom: none;
  }
}
.c3 {
  min-width: calc(100% - 8px);
  .el-card__header {
    position: relative;

    .member {
      width: 123px;
      position: absolute;
      right: 204px;
      :deep(.el-input__wrapper) {
        height: 26px;
        border-radius: 4px;
        // border: 1px solid #eeeff2;
        text-align: center;
        span {
          font-weight: 400;
          color: #505050;
          line-height: 26px;
        }
      }
    }

    .head {
      width: 123px;
      position: absolute;
      right: 73px;
      :deep(.el-input__wrapper) {
        height: 26px;
        border-radius: 4px;
        // border: 1px solid #eeeff2;
        text-align: center;
        span {
          font-weight: 400;
          color: #505050;
          line-height: 26px;
        }
      }
    }
  }
  :deep(.el-card__body) {
    padding-top: 0;
    .el-collapse {
      border: none;

      .el-collapse-item {
        .el-collapse-item__header {
          border-bottom: none !important;
          text-align: left;
          font-weight: 400;
          // color: #131313;
          // background-color: #fff;
          display: flex;
          align-items: center;
          height: 38px;
          .el-collapse-item__arrow {
            position: absolute;
          }
        }

        .el-collapse-item__content {
          padding: 0;

          .el-table__body {
            .cell {
              span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
  }
}
</style>
