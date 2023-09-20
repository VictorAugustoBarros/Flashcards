// Utilities
import { defineStore } from "pinia";
import router from "@/router";
import jwtDecode from "jwt-decode";

export const decksStore = defineStore("decks", {
  state: () => ({
    decks: []
  }),
  getters: {
    getDecks: (state) => state.decks,
  },
  actions: {
    setDecks(decks: any) {
      this.decks = decks;
    },
  },
  persist: {
    enabled: true,
  },
});
