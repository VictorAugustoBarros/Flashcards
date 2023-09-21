<template>
  <div style="display: grid;grid-template-rows: auto 1fr;height: 100%;">
    <div>
      <v-row style="height: auto;">
        <v-spacer />
        <v-col cols="4">
          <DeckSubdeckDropdownList class="card-padding" @change-deck="changeDeck" @change-subdeck="changeSubDeck" cols="6"
            :deck-id="this.deckId" :subdeck-id="this.subdeckId" />
        </v-col>
        <v-spacer />
      </v-row>
    </div>

    <div>      
      <v-row v-if="this.cards.length && this.loadedCards" justify="center" style="height: 100%;">
        <v-col cols="6">
          <CardUserList :cards="this.cards" :activeId="this.selectedCard.id" :deck-id="this.deckId" :subdeck-id="this.subdeckId"
            @load-card="loadCard" @remove-card="removeCard" />
        </v-col>

        <v-spacer />
        <v-col cols="5" class="center-Elements-Flex">
          <Card v-if="this.selectedCard.id" :deck-id="this.deckId" :subdeck-id="this.subdeckId"
            :card="{ ...this.selectedCard }" @deleted-card="deletedCard" @updated-card=updatedCard />
        </v-col>
        <v-spacer />
      </v-row>
      
      <v-row v-else-if="this.deckId && this.subdeckId && !this.cards.length && this.loadedCards" style="height: 100%;">
        <v-spacer />
        <v-col cols="6" class="center-Elements-Flex">
          <Component404 description="Card não encontrado!" @click-create-card="openCardExpander" />
        </v-col>
        <v-spacer />
      </v-row>
    </div>
  </div>
</template>

<script>
import DeckSubdeckDropdownList from "@/components/molecules/DeckSubdeckDropdownList.vue";

import CardUserList from "@/components/molecules/CardUserList.vue";
import Card from "@/components/organisms/Card.vue";
import Component404 from "@/components/organisms/404.vue"
import { useDecksStore } from "@/store/decks";

export default {
  name: "CardTemplate",
  props: {
    decks: Array,
  },
  components: {
    DeckSubdeckDropdownList,
    CardUserList,
    Card,
    Component404
  },
  data() {
    return {
      decksStore: useDecksStore(),
      decks: [],
      subdecks: [],
      cards: [],
      loadedCards: false,

      // Componente DeckSubdeckDropdownList
      deckId: null,
      subdeckId: null,

      // Componente Card
      selectedCard: {
        id: null
      },
    }
  },
  created() {
    this.decks = this.decksStore.getDecks;

    this.emitter.on("reloadCards", () => {
      this.cards = this.decksStore.getCards(this.deckId, this.subdeckId)
    });
  },
  methods: {
    /**
     * Evento de atualização do ID do Deck emitido pelo componente Card
     * @param  {Integer} deckId ID do Deck
     */
    changeDeck(deckId) {
      this.deckId = deckId
    },
    /**
     * Evento de atualização do ID do SubDeck emitido pelo componente Card
     * @param  {Integer} subdeckId ID do SubDeck
     */
    changeSubDeck(subdeckId) {
      this.subdeckId = subdeckId
      this.selectedCard = {id: null};
      this.loadedCards = false
      this.cards = this.decksStore.getCards(this.deckId, this.subdeckId)
      this.emitter.emit("reloadCardUserList");
      this.loadedCards = true
    }, 
    updatedCard(newCard) {
      this.selectedCard = newCard;
    },
    deletedCard() {
      this.selectedCard = {id: null};
      this.cards = this.decksStore.getCards(this.deckId, this.subdeckId)
    },
    /**
     * Evento de atualização do componente CardUserList para renderizar o componente do Card
     * @param  {Integer} cardId ID do Card
     */
    loadCard(cardId) {
      this.selectedCard = this.decksStore.getCard(this.deckId, this.subdeckId, cardId)
    },
    openCardExpander() {
      this.emitter.emit("openExpander", { deckId: this.deckId, subdeckId: this.subdeckId });
      this.emitter.emit("reloadSubdeck", this.subdeckId);
      
    }
  }
}

</script>