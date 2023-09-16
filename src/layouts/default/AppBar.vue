<template>
  <v-app-bar color="transparent" :elevation="0" :height="100">
    <v-col cols="2" style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
      <!-- <v-img cover aspect-ratio="16/9" src="logo.svg" width="100"></v-img> -->
      <h1>Flashcards</h1>
    </v-col>

    <template v-slot:append>
      <AppBarMenuOptions />
    </template>
  </v-app-bar>
</template>

<script>
import AppBarMenuOptions from "@/components/organisms/AppBarMenuOptions.vue";

export default {
  name: "AppBar",
  components: {
    AppBarMenuOptions,
  },
};
</script>
