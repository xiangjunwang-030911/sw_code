import { defineStore } from 'pinia';
import store from '@/store/pinia';
import {
  ServiceGroupApiResult,
  ServiceListApiResult,
} from '@/api/ep/service/serviceModel';
import { useAuthStoreWithOut } from './auth';
import { getServiceGroupApi, getServiceListApi } from '@/api/ep/service';
import { getProjectTreeListApi } from '@/api/ep/event';
import { ProjectTreeListApiResult } from '@/api/ep/event/eventModel';
import { ProjectListItem } from '@/views/EP/Event/typing';
import { cloneDeep } from 'lodash-es';
import { CUSTOMER_AS_KEY, KNOWLEDGE_PROJECT_ID_KEY } from '@/enums/cacheEnum';

interface ServiceState {
  serviceCatalogList: ProjectListItem[] | null;
  serviceList: ServiceListApiResult[];
  serviceGroupList: ServiceGroupApiResult[] | null;
  selectedProject: ProjectListItem[] | null;
  knowLedgeProjectId: number | null;
  customerAs: string | null;
}

export const useServiceStore = defineStore({
  id: 'store-service',
  state: (): ServiceState => ({
    serviceCatalogList: null,
    serviceList: [],
    serviceGroupList: null,
    selectedProject: null,
    knowLedgeProjectId: null,
    customerAs: null,
  }),
  getters: {
    getKnowledgeProjectId(state): number | null {
      if (state.knowLedgeProjectId) {
        return state.knowLedgeProjectId;
      } else {
        return Number(localStorage.getItem(KNOWLEDGE_PROJECT_ID_KEY)) || null;
      }
    },
    getCustomerAs(state): string | null {
      if (state.customerAs) {
        return state.customerAs;
      } else {
        return localStorage.getItem(CUSTOMER_AS_KEY) || null;
      }
    },
  },
  actions: {
    async getServiceCatalogList() {
      const authStore = useAuthStoreWithOut();
      const res = await getProjectTreeListApi();
      const projectIdSet: Set<number> = new Set(authStore.getProjectId);
      this.serviceCatalogList = [];
      const recursion = (
        list: ProjectTreeListApiResult[],
        preItem?: ProjectTreeListApiResult,
      ) => {
        for (const element of list) {
          if (projectIdSet.has(element.value.projectID)) {
            element.value.isActiveProject &&
              !element.value.isTemplateProject &&
              this.serviceCatalogList!.push({
                projectId: element.value.projectID,
                projectName: element.value.projectName,
              });
          }
          if (
            this.serviceCatalogList!.length !== projectIdSet.size &&
            element.children.length
          ) {
            recursion(element.children, element);
          }
          if (
            element.value.projectID == authStore.getBaseProjectId &&
            preItem?.value.projectTypeID == 31
          ) {
            this.customerAs = element.value.customerAs as string;
            this.knowLedgeProjectId = preItem?.value.projectID;
            localStorage.setItem(
              KNOWLEDGE_PROJECT_ID_KEY,
              JSON.stringify(this.knowLedgeProjectId),
            );
            localStorage.setItem(CUSTOMER_AS_KEY, this.customerAs);
          }
        }
      };
      recursion(res);
      this.selectedProject = cloneDeep(this.serviceCatalogList);
    },
    async getServiceList(projectId: number, groupId?: number) {
      if (!groupId) {
        const res = await getServiceListApi({ projectId });
        this.serviceList = res;
      } else {
        if (!this.serviceGroupList) {
          await this.getServiceGroup(projectId);
        }
        this.serviceList = [];

        const selectedServiceItem = this.serviceGroupList!.filter(
          (item) => item.groupID == groupId,
        )[0];
        //递归获取childIncidentTemplate
        const recursion = (item: ServiceGroupApiResult) => {
          this.serviceList = [
            ...this.serviceList,
            ...item.childIncidentTemplate,
          ];
          if (item.childGroup.length) {
            item.childGroup.map((child) => recursion(child));
          }
        };
        recursion(selectedServiceItem);
        this.serviceList.sort(
          (a, b) => (a.displayOrder as number) - (b.displayOrder as number),
        );
      }
    },
    async getServiceGroup(projectId: number) {
      const res = await getServiceGroupApi({ projectId });
      this.serviceGroupList = res;
    },
    clearKnowLedgeProjectId() {
      this.knowLedgeProjectId = null;
    },
  },
});

// Need to be used outside the setup
export function useServiceStoreWithOut() {
  return useServiceStore(store);
}
