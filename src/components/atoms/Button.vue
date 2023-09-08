<template>
  <div class="center-Elements-Flex" style="height: 100%;">
    <v-col cols="auto">
      <v-btn :prepend-icon="icon" :color="color" :size="size" :style="'background-color: ' + backgroundColor + ';'"
        :variant="variant" v-bind="props" :text="text">
      </v-btn>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
    },
    variant: {
      type: String,
      default: "outlined"
    },
    size: {
      type: String,
      default: "default",
    },
    color: {
      type: String,
      default: "black",
    },
    backgroundColor: {
      type: String,
      default: "white",
    },
    icon: {
      type: String
    }
  }
};
</script>

<style>
.v-btn__prepend {
  margin: auto;
}
</style>