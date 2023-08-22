<template>
  <div id="main">
    <h1>Flashcards</h1>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/app";

export default {
  name: "HomePage",
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
  methods: {
    logout() {
      this.authStore.logout();
    },
  },
};
</script>
