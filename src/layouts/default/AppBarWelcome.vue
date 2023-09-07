<template>
  <v-row class="welcomeItems" style="height: 10vh">
    <v-col cols="3" style="display: flex; justify-content: right; align-items: center"
    >
      <h1>Flashcards</h1>
    </v-col>

    <v-col cols="4" class="welcomebar-title-container" style="font-size: 20px">
      <router-link to="/how-it-works" class="welcomebar-title">How it works</router-link>
      <router-link to="/about" class="welcomebar-title">About</router-link>
    </v-col>

    <v-col cols="5" class="center-Elements-Flex">
      <router-link to="/login">
        <Button text="Login" color="blue" variant="text"></Button>
      </router-link>
      <router-link to="/register">
        <Button text="Register" color="white" background-color="blue"></Button>
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
import Button from "@/components/atoms/Button.vue";

export default {
  name: "AppBarWelcome",
  components: {
    Button,
  },
};
</script>

<style>
.welcomebar-title-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcomebar-title {
  margin: 0 50px;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  color: gray;
}
</style>
