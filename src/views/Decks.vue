<template>
  <v-row>
    <v-col>
      <CreateDeckExpander :decks="decks" @load-decks="loadDecks()" />
    </v-col>
  </v-row>

  <v-row>
    <DeckPreview :decks="decks"/>
  </v-row>
</template>

<script>
import CreateDeckExpander from "@/components/molecules/CreateDeckExpander.vue"
import DeckPreview from "@/components/molecules/DeckPreview.vue"
import { getUserDecks } from "@/services/decks";

export default {
  name: "DecksPage",
  components: {
    CreateDeckExpander,
    DeckPreview,
  },
  data() {
    return {
      decks: [],
    }
  },
  mounted() {
    this.loadDecks();
  },
  methods: {
    async loadDecks() {
      const deckData = await getUserDecks();

      if (deckData.response.success) {
        this.decks = deckData.decks;
        return;
      }
    },
  }
};
</script>
