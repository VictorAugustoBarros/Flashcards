<template>
  <div>
    <v-card style="overflow: auto;width: 800px;height: 600px;" rounded="xl">
      <v-text-field class="fixed-search" style="text-align: center;" v-model="search" label="Pesquisar" outlined
        @click:clear="clearSearch" @input="filterItems"></v-text-field>

      <v-list class="item-list" style="max-height: 500px; overflow-y: auto;">

        <v-card v-for="item in items" :key="item.id" width="100" height="100">
          <template v-slot:title>
            {{ item.name }}
          </template>

          <template v-slot:subtitle>
            {{ item.description }}
          </template>
        </v-card>

      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CardUserList",
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
          title: deck.name,
          subtitle: deck.description,
          value: deck.id,
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
