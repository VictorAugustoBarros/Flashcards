<template>
  <v-btn :prepend-icon="icon" variant="outlined" :color="color">
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    color: String,
    icon: String,
  },
};
</script>
