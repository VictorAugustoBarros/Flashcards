<template>
  <v-row>
    <v-col cols="4"></v-col>
    <v-col cols="4">
      <DeckSubdeckDropdownList @load-sub-deck-cards="loadSubDeckCards" @change-deck="changeDeck" cols="6" />
    </v-col>
    <v-col cols="4"></v-col>
  </v-row>

  <v-row v-if="userCards.length">
    <v-col cols="1" />
    <v-col cols="4">
      <div class="center-Elements-Flex" style="height: 100%;">
        <CardUserList :activeId="this.card.id"  :cards="userCards" @load-card="loadCard" @remove-card="removeCard" />        
      </div>
    </v-col>
    <v-col cols="1" />
    <v-col cols="6">
      <div class="center-Elements-Flex" style="height: 80vh;">
        <Card @card-removed="this.card.id = null" v-if="this.card.id" :cardId="this.card.id" :subdeckId="subDeckId" :question="this.card.question" :answer="this.card.answer" />
      </div>
    </v-col>
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
      deckId: null,
      subDeckId: null,
      userCards: [],
      card: {
        id: null
      },
    };
  },
  created() {
    this.emitter.on("reloadCardUserList", (subDeckId) => {
      if (this.subDeckId === subDeckId) {
        this.loadSubDeckCards(subDeckId)
      }
    });
  },
  methods: {
    async loadSubDeckCards(subDeckId) {
      this.subDeckId = subDeckId;

      if (subDeckId) {
        const userSubDecksCardsResponse = await getSubDeckCards(subDeckId);
        if (userSubDecksCardsResponse.response.success) {
          this.userCards = userSubDecksCardsResponse.cards
            ? userSubDecksCardsResponse.cards
            : [];
        }
      }
    },
    changeDeck(deckId) {
      this.deckId = deckId;
      this.userCards = [];
      this.card.id = null;
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
      this.card.id = null;
    },
  },
};
</script>
