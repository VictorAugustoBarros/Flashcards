<template>
  <v-app class="app">
    <AlertBox />

    <div style="height: 15vh;">
      <v-row>
        <AppBar />
      </v-row>
    </div>

    <div style="height: 100%;">
      <v-row style="height: 100%;">
        <v-col cols="2">
          <NavigationBar />
        </v-col>
        <v-col cols="10">
          <router-view />
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
import AlertBox from "@/components/atoms/AlertBox.vue";
import NavigationBar from "@/components/molecules/NavigationBar.vue";

</script>
