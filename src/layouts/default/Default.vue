<template>
  <v-app>
      <AlertBox />
      <AppBar />

      <default-view/>
  </v-app>
</template>

<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
import AlertBox from "@/components/atoms/AlertBox.vue";
import DefaultView from "@/layouts/default/View.vue";
</script>
