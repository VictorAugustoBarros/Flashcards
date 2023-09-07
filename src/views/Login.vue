<template>
  <v-container>
    <v-row style="height: 90vh" class="center-Elements-Flex">
      <v-spacer></v-spacer>
      <v-col cols="4">
        <LoginForm />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from "@/components/organisms/LoginForm.vue";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
};
</script>
