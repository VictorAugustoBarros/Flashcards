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
    text: String,
    variant: {
      type: String,
      default: "outlined"
    },
    size: {
      type: String,
      default: "large",
    },    
    color: {
      type: String,
      default: "black",
    },
    backgroundColor: {
      type: String,
      default: "white",
    }
  },
};
</script>
