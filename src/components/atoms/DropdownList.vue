<template>
  <v-autocomplete
    :label="label"
    :items="items"
    :item-title="title"
    :item-value="value"
    variant="outlined"
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
  },
};
</script>
