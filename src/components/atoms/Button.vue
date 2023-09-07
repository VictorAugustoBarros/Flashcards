<template>
  <v-btn
    :prepend-icon="icon"
    :color="color"
    :size="size"
    :style="'background-color: ' + backgroundColor + ';'"
    :variant="variant"
  >
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: {
    variant: {
      type: String,
      default: "outlined"
    },
    size: {
      type: String,
      default: "large",
    },
    text: String,
    color: {
      type: String,
      default: "black",
    },
    backgroundColor: {
      type: String,
      default: "white",
    },
    icon: {
      type: String,
      default: null,
    },
  },
};
</script>
