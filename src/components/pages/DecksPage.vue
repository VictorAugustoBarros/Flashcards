<template>
  <div class="center-Elements-Flex" style=";height: 100%;">
    <v-sheet rounded="xl" width="95%" height="100%" class="sheet">
      <div style="display: grid;height: 100%;">
        <div style="position: sticky; top: 0px;">
          <DeckExpander />
        </div>

        <v-row justify="center">
          <v-breadcrumbs :items="items">
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>
        </v-row>

        <router-view />
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
          href: 'subdecks',
        }
      ],
    }
  },
  mounted() {
    this.loadDecks();
  },
  created() {
    this.emitter.on("reloadDeckList", () => {
      this.loadDecks()
    })
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
