import { defineStore } from 'pinia';
import store from '@/store/pinia';

interface KnowledgeState {
  currentFolderId: number;
}

export const useKnowledgeStore = defineStore({
  id: 'store-knowledge',
  state: (): KnowledgeState => ({
    currentFolderId: 1,
  }),
  getters: {},
  actions: {
    changeCurrentFolderId(folderId: number) {
      this.currentFolderId = folderId;
    },
  },
});

// Need to be used outside the setup
export function useKnowledgeStoreWithOut() {
  return useKnowledgeStore(store);
}
