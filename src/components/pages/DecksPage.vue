<template>
  <div class="center-Elements-Flex" style="overflow: auto;">
    <v-sheet rounded="xl" width="95%" height="100%" class="sheet">
      <v-row>
        <v-col cols="6">
          <CreateDeckExpander :decks="decks" @load-decks="loadDecks()" />
        </v-col>
        <v-col cols="6">
          <CreateSubDeckExpander :decks="decks" @load-decks="loadDecks()" />
        </v-col>
      </v-row>

      <div style="height: 100%;padding-top: 50px;">
        <v-row justify="center">
          <v-breadcrumbs :items="items">
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>
        </v-row>
        <br>

        <DeckUserList :decks="decks" />
      </div>
    </v-sheet>
  </div>
</template>

<script>
import CreateDeckExpander from "@/components/molecules/CreateDeckExpander.vue"
import CreateSubDeckExpander from "@/components/molecules/CreateSubDeckExpander.vue"
import DeckUserList from "@/components/molecules/DeckUserList.vue";

import { getUserDecks } from "@/services/decks";

export default {
  name: "DecksPage",
  components: {
    CreateDeckExpander,
    CreateSubDeckExpander,
    DeckUserList,
  },
  data() {
    return {
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
