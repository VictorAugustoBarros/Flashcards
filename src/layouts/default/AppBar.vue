<template>
  <v-app-bar :elevation="0" color="transparent" class="app-bar">
    <div class="title-container">
      <router-link to="/" class="title">Home</router-link>
      <router-link to="/decks" class="title">Decks</router-link>
      <router-link to="/cards" class="title">Cards</router-link>
    </div>
    <template v-slot:append>
      <UserMenuList />
    </template>
  </v-app-bar>
</template>

<script>
import UserMenuList from "@/components/organisms/UserMenuList.vue";

export default {
  name: "AppBar",
  components: {
    UserMenuList,
  },
};
</script>

<style>
.title-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  margin: 0 100px;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
}

.title:hover {
  color: #42b983; /* Cor de destaque ao passar o mouse */
}
</style>
