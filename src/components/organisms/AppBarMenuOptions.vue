<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-dots-vertical" v-bind="props"> </v-btn>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            title="Victor Augusto"
            subtitle="teste@gmail.com"
          >
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-switch
              v-model="message"
              color="purple"
              label="Dark Mode"
              hide-details
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="text" @click="logout">
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/app";

export default {
  name: "AppBarMenuOptions",
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    
    hints: true,
    authStore: useAuthStore(),
  }),
  methods: {
    logout() {
      this.authStore.logout();
    },
  },
};
</script>
