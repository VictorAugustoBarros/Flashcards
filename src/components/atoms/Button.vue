<template>
  <v-btn :prepend-icon="icon" variant="outlined" :color="color" :size="size">
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: {
    size: String,
    text: String,
    color: String,
    icon: String,
  },
};
</script>
