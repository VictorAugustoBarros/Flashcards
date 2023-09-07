<template>
  <v-app>
    <html>
      <body>
        <AppBarWelcome />

        <default-view />
      </body>
    </html>
  </v-app>
</template>

<script setup>
import AppBarWelcome from "@/layouts/default/AppBarWelcome.vue";

import DefaultView from "@/layouts/default/View.vue";
</script>
