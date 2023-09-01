<template>
  <v-row>
    <v-col cols="4"></v-col>
    <v-col cols="4">
      <DeckSubdeckDropdownList
        @load-sub-deck-cards="loadSubDeckCards"
        @change-deck="changeDeck"
        cols="6"
      />
    </v-col>
    <v-col cols="4"></v-col>
  </v-row>

  <v-row>
    <v-spacer></v-spacer>
    <v-col cols="4">
      <CardUserList
        v-if="userCards.length"
        :cards="userCards"
        @load-card="loadCard"
        @remove-card="removeCard"
      />
      <h1 v-else>Sem Cards</h1>
    </v-col>
    <v-col cols="4">
      <div style="height: 80vh">
        <Card
          v-if="this.card"
          :id="this.card.id"
          :question="this.card.question"
          :answer="this.card.answer"
        />
      </div>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import Card from "@/components/molecules/Card.vue";
import CardUserList from "@/components/molecules/CardUserList.vue";
import DeckSubdeckDropdownList from "@/components/molecules/DeckSubdeckDropdownList.vue";

import { getSubDeckCards } from "@/services/cards";

export default {
  name: "CardPreview",
  components: {
    Card,
    CardUserList,
    DeckSubdeckDropdownList,
  },
  data() {
    return {
      userCards: [],
      card: null,
    };
  },
  methods: {
    async loadSubDeckCards(subDeckId) {
      if (subDeckId) {
        const userSubDecksCardsResponse = await getSubDeckCards(subDeckId);
        if (userSubDecksCardsResponse.response.success) {
          this.userCards = userSubDecksCardsResponse.cards
            ? userSubDecksCardsResponse.cards
            : [];
        }
      }
    },
    changeDeck(){
      this.userCards = []
      this.card = null
    },
    loadCard(cardId) {
      for (const card of this.userCards) {
        if (card.id == cardId) {
          this.card = card;
          return;
        }
      }
    },
    removeCard() {
      this.card = null;
    },
  },
};
</script>
