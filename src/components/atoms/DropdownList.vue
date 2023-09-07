<template>
  <v-autocomplete
    filled
    dense
    hide-details
    :label="label"
    :items="items"
    :item-title="title"
    :item-value="value"
    variant="outlined"
    :disable="disable"
  >
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
    disable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
