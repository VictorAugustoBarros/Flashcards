<template>
  <v-container>
    <v-row style="height: 90vh" class="center-Elements-Flex">
      <v-spacer></v-spacer>
      <v-col cols="4">
        <RegisterForm />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import RegisterForm from "@/components/organisms/RegisterForm.vue";

export default {
  name: "RegisterPage",
  components: {
    RegisterForm,
  },
};
</script>
