import { defineStore } from 'pinia';
import store from '@/store/pinia';
import { GroupedConversationItem } from '@/components/Chat/ConversationBox/typing';

interface ConversationState {
  groupedConversation: GroupedConversationItem[];
}

export const useConversationStore = defineStore({
  id: 'store-Conversation',
  state: (): ConversationState => ({
    groupedConversation: [],
  }),
  getters: {},
  actions: {
    async getConversation() {},
  },
});

// Need to be used outside the setup
export function useConversationStoreWithOut() {
  return useConversationStore(store);
}
