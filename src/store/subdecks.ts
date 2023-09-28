// Utilities
import { defineStore } from "pinia";

export const useSubDecksStore = defineStore("subdecks", {
  state: () => ({
    subdeckId: null
  }),
  getters: {
    getSubdeckId: (state) => state.subdeckId,
  },
  actions: {
    async setSubdeckId(subdeckId: any) {
      this.subdeckId = subdeckId
    },
  },
  persist: {
    enabled: true,
  },
});

