<template>
  <v-layout class="rounded rounded-md" full-height>
    <AlertBox />

    <AppBar />

    <NavigationBar style="padding-top: 20px;" />

    <v-main>
      <router-view style="padding-top: 20px;" />
    </v-main>
  </v-layout>
</template>

<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
import AlertBox from "@/components/atoms/AlertBox.vue";
import NavigationBar from "@/components/molecules/NavigationBar.vue";

</script>
