<template>
    <form>
      <v-text-field
        v-model="v$.email.$model"
        :error-messages="v$.email.$errors.map((e) => e.$message)"
        label="Email"
        required
        @input="v$.email.$touch"
        @blur="v$.email.$touch"
      ></v-text-field>
  
      <v-responsive class="mx-auto">
        <v-text-field
          v-model="v$.password.$model"
          :error-messages="v$.password.$errors.map((e) => e.$message)"
          label="Password"
          hint="Enter your password to access this website"
        ></v-text-field>
      </v-responsive>
  
      <div class="center-Elements-Flex">
        <v-btn class="me-4" @click="login()"> login </v-btn>
      </div>
    </form>
  </template>
  
  <script>
  import router from "@/router";
  
  import { useVuelidate } from "@vuelidate/core";
  import { email, required } from "@vuelidate/validators";
  import { useAuthStore } from "@/store/app";
  import { decksStore } from "@/store/decks";
  import { loginUser } from "@/services/users";
  
  import { getUserDecks } from "@/services/decks";


  export default {
    name: "LoginForm",
    setup() {
      return { v$: useVuelidate() };
    },
    data() {
      return {
        authStore: useAuthStore(),
        email: "teste@teste.com",
        password: "teste123",
      };
    },
    validations() {
      return {
        email: { required, email },
        password: { required },
      };
    },
  
    methods: {
      async login() {
        const isFormCorrect = await this.v$.$validate();
        if (!isFormCorrect) return;
  
        const loginResponse = await loginUser(this.email, this.password)
  
        if (loginResponse.response.success) {
          const jwt_token = loginResponse.jwt_token;
          this.authStore.setToken(jwt_token);

          const userDecksResponse = await getUserDecks();
          if (userDecksResponse.response.success) {
            decksStore().setDecks(userDecksResponse.decks)
          }

          router.push("/");
        }
      },
    },
  };
  </script>
  