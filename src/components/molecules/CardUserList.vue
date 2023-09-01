<template>
  <v-card class="mx-auto">
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        :title="item.title"
        :subtitle="item.subtitle"
        :color="item.props.color"
        @click="$emit('loadCard', item.id)"
      >
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "CardUserList",
  props: {
    cards: Array,
  },
  data: () => ({
    items: [],
  }),
  unmounted(){
    this.$emit("removeCard")
  },
  watch: {
    cards: {
      handler(newCards) {
        this.items = newCards.map((card) => ({
          id: card.id,
          title: card.question,
          subtitle: card.answer,
          value: card.id,
          props: {
            color: "primary",
          },
        }));
      },
      immediate: true,
    },
  },
};
</script>
