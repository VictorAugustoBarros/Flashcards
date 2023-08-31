// Utilities
import { defineStore } from "pinia";
import router from "@/router";
import jwtDecode from "jwt-decode";

export const useAuthStore = defineStore("app", {
  state: () => ({
    token: "",
  }),
  getters: {
    getToken: (state) => state.token,
    hasToken: (state) => (state.token ? true : false),
  },
  actions: {
    setToken(newToken: string) {
      this.token = newToken;
    },
    logout() {
      sessionStorage.clear();
      router.push("Login");
    },
    validateToken() {
      try {
        const decodedToken = jwtDecode(this.token);

        const expirationTime = decodedToken.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        if (expirationTime < currentTime) {
          alert("Sessão expirada.");
          this.token = ""
          return false;
        }
        return true;

      } catch (error) {
        this.token = ""
        return false;
      }
    },
  },
  persist: {
    enabled: true,
  },
});
