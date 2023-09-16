<template>
  <v-app>
    <html>
      <body>
        <AppBarWelcome />

        <router-view />
      </body>
    </html>
  </v-app>
</template>

<script setup>
import AppBarWelcome from "@/layouts/default/AppBarWelcome.vue";

</script>
