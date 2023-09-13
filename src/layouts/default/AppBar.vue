<template>
  <v-app-bar color="blue" :elevation="1" class="app-bar center-Elements-Flex">
    <div class="title-container">
      <router-link to="/" class="title">Dashboard</router-link>
      <router-link to="/decks" class="title">Decks</router-link>
      <router-link to="/cards" class="title">Cards</router-link>
    </div>
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
