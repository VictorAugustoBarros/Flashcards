<template>
  <v-card class="mx-auto" max-width="300">
    <v-list :items="items"></v-list>
  </v-card>
</template>

<script>
export default {
  name: "CardListItems",
  data: () => ({
    items: [
      {
        title: "Question1",
        value: 1,
        props: {
          color: "primary",
        },
      },
      {
        title: "Question2",
        value: 2,
        props: {
          color: "primary",
        },
      },
      {
        title: "Question3",
        value: 3,
        props: {
          color: "primary",
        },
      },
      {
        title: "Question4",
        value: 4,
        props: {
          color: "primary",
        },
      },
      {
        title: "Question5",
        value: 5,
        props: {
          color: "primary",
        },
      }
    ],
  }),
};
</script>
