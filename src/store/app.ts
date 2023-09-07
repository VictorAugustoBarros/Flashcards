// Utilities
import { defineStore } from "pinia";
import router from "@/router";
import jwtDecode from "jwt-decode";

export const useAuthStore = defineStore("app", {
  state: () => ({
    token: "",
    firstAcess: true
  }),
  getters: {
    getFirstAccess: (state) => state.firstAcess,
    getToken: (state) => state.token,
    hasToken: (state) => (state.token ? true : false),
  },
  actions: {
    setFirstAccess() {
      this.firstAcess = false;
    },
    setToken(newToken: string) {
      this.token = newToken;
    },
    logout() {
      this.token = "";
      sessionStorage.clear();
      router.push("/how-it-works");
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
