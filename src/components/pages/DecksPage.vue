<template>
  <div class="center-Elements-Flex" style=";height: 100%;">
    <v-sheet rounded="xl" width="95%" height="100%" class="sheet">
      <div style="display: grid;height: 100%;">
        <div style="position: sticky; top: 0px;" class="pb-7">
          <DeckExpander />
        </div>

        <v-row justify="center" style="overflow: auto;">
          <div v-for="deck in decks" style="display: inline-block;" class="px-5 py-8">
            <Deck :name="deck.name" :description="deck.description" />
          </div>
        </v-row>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import DeckExpander from "@/components/organisms/DeckExpander.vue"
import Deck from "@/components/molecules/Deck.vue"

import { getUserDecks } from "@/services/decks";

export default {
  name: "DecksPage",
  components: {
    DeckExpander,
    Deck
  },
  data() {
    return {
      tab: null,
      createDeck: false,
      decks: [],
      items: [
        {
          title: 'Decks',
          disabled: false,
          href: 'decks',
        },
        {
          title: 'SubDecks',
          disabled: true,
          href: 'breadcrumbs_link_1',
        }
      ],
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
