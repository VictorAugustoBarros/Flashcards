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

    <v-text-field
      v-model="v$.username.$model"
      :error-messages="v$.username.$errors.map((e) => e.$message)"
      label="Username"
      required
      @input="v$.username.$touch"
      @blur="v$.username.$touch"
    ></v-text-field>

    <v-responsive class="mx-auto">
      <v-text-field
        v-model="v$.password.$model"
        :error-messages="v$.password.$errors.map((e) => e.$message)"
        label="Password"
        hint="Enter your password to access this website"
      ></v-text-field>
    </v-responsive>

    <v-btn class="me-4" @click="submitForm()"> submit </v-btn>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { GraphQLClient } from "graphql-request";

import { ADD_USER } from "@/graphql/users";

import { graphqlUrl } from "@/store/constants";

const client = new GraphQLClient(graphqlUrl);

export default {
  name: "RegisterForm",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "teste@teste.com",
      username: "teste123",
      password: "teste123",
    };
  },
  validations() {
    return {
      email: { required, email },
      username: { required },
      password: { required },
    };
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      const variables = {
        email: this.email,
        username: this.username,
        password: this.password,
      };
      const data = await client.request(ADD_USER, variables);
      const response = data.add_user.response;

      console.log(response);
    },
  },
};
</script>
