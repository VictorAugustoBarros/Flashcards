<template>
  <v-card style="overflow: auto;width: 90%;height: 700px;" rounded="xl">
    <v-text-field class="fixed-search" style="text-align: center;" v-model="search" label="Pesquisar" outlined
      @click:clear="clearSearch" @input="filterItems"></v-text-field>

    <v-list class="item-list" style="max-height: 500px; overflow-y: auto;">
      <Deck v-for="deck in decks" :name="deck.name" :description="deck.description"/>
    </v-list>
  </v-card>
</template>

<script>

import Deck from "@/components/molecules/Deck.vue"

export default {
  name: "DeckUserList",
  components: {
    Deck
  },
  props: {
    decks: Array,
  },
  data: () => ({
    selected: [2],
    search: '',
    items: [],
  }),
  watch: {
    decks: {
      handler(newCards) {
        this.items = newCards.map((deck) => ({          
          id: deck.id,
          name: deck.name,
          value: deck.id,
          description: deck.description,
          props: {
            color: "primary",
          },
        }));
      },
      immediate: true,
    }
  },
  computed: {
    items() {
      return this.items.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase()) ||
          item.description.toLowerCase().includes(this.search.toLowerCase())
      });
    }
  },
  methods: {
    clearSearch() {
      this.search = "";
    },
    toggle(index) {
      const i = this.selected.indexOf(index)

      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    }
  }
};
</script>

<style scoped>
.fixed-search :deep(input) {
  text-align: center;
  justify-content: center;
}
</style>

<style>
.fixed-search {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
}

.fixed-search.v-text-field .v-label {
  left: 45% !important;
  transform: translateX(-50%);
  transform: translateY(-30%);
  transform-origin: top 50%;

  &.v-label--active {
    transform: translateY(-18px) scale(.75) translateX(-50%);
  }
}

.item-list {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
</style>
