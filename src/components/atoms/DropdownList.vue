<template>
  <v-autocomplete filled dense :label="label" :items="items" :item-title="title" :item-value="value"
    variant="outlined" :disabled="disableComponent">
  </v-autocomplete>
</template>

<script>
export default {
  name: "DropdownList",
  props: {
    label: String,
    items: Array,
    title: String,
    value: String,
    disableComponent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
