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
  import { useDecksStore } from "@/store/decks";
  import { loginUser } from "@/services/users";
  


  export default {
    name: "LoginForm",
    setup() {
      return { v$: useVuelidate() };
    },
    data() {
      return {
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
          useAuthStore().setToken(jwt_token);

          await useDecksStore().loadDecks()

          router.push("/");
        }
      },
    },
  };
  </script>
  