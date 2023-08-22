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

    <v-btn class="me-4" @click="login()"> login </v-btn>
  </form>
</template>

<script>
import router from "@/router";

import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { GraphQLClient } from "graphql-request";
import { useAuthStore } from "@/store/app";
import { LOGIN_USER } from "@/graphql/users";
import { graphqlUrl } from "@/store/constants";
const client = new GraphQLClient(graphqlUrl);

export default {
  name: "LoginPage",
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

      const variables = {
        email: this.email,
        username: this.username,
        password: this.password,
      };
      const data = await client.request(LOGIN_USER, variables);
      const response = data.login.response;

      if (response.success) {
        const jwt_token = data.login.jwt_token;
        this.authStore.setToken(jwt_token);
        router.push("/");
      }
    },
  },
};
</script>
