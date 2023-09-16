<template>
  <div class="center-Elements-Flex" style="height: 100vh;overflow: auto;">
    <v-sheet rounded="xl" width="95%" height="100%" class="sheet">
      <CreateDeckExpander :decks="decks" @load-decks="loadDecks()" />

      <div style="height: 100%;padding-top: 50px;">
        <DeckPreview :decks="decks" />
      </div>
    </v-sheet>
  </div>
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
