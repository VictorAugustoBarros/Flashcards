<template>
  <v-row>
    <CreateDeckExpander :decks="decks" @load-decks="loadDecks()" />
  </v-row>

  <v-row justify="center" style="height: 100%;">
    <v-sheet rounded="xl" width="95%">
      <div style="height: 100%;padding-top: 50px;">
        <DeckPreview :decks="decks" />
      </div>
    </v-sheet>
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
