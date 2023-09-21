<template>
  <v-card style="overflow: auto;height: 100%;" rounded="xl">
    <v-text-field class="fixed-search" style="text-align: center;" v-model="search" label="Pesquisar" outlined
      @click:clear="clearSearch" @input="filterItems"></v-text-field>

    <v-list lines="two" class="item-list" style="max-height: 500px; overflow-y: auto;">
      <v-list-item v-for="card in this.cards" :key="card.id" :active="card.id === activeId" rounded="xl"
        style="align-items: center;text-align: center;justify-content: center;" :value="card" :title="card.question"
        :subtitle="card.answer" color="primary" @click="$emit('loadCard', card.id)">
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { useDecksStore } from "@/store/decks";

export default {
  name: "CardUserList",
  props: {
    deckId: Int16Array,
    subdeckId: Int16Array,
    activeId: Int16Array
  },
  data: () => ({
    deckStore: useDecksStore(),
    selected: [2],
    cards: [],
    items: [],
    search: '',
  }),
  unmounted() {
    this.$emit("removeCard");
  },
  created() {
    this.cards = this.deckStore.getCards(this.deckId, this.subdeckId);

    this.emitter.on("reloadCardUserList", () => {
      this.cards = this.deckStore.getCards(this.deckId, this.subdeckId)
    });
  },
  updated(){
    this.cards = this.deckStore.getCards(this.deckId, this.subdeckId)
  },
  computed: {
    items() {
      return this.items.filter(item => {
        return item.title.toLowerCase().includes(this.search.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(this.search.toLowerCase())
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
