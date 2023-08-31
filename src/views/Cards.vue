<template>
  <!-- Criar um mini modal interno na pagina ao criar um novo Deck, abrindo as opções para novo cadastro -->

  <v-row>
    <v-col>
      <CreateCardExpander :cardTypes="this.card.types" />
    </v-col>
  </v-row>

  <v-row>
    <v-spacer></v-spacer>
    <v-col cols="3">
      <v-autocomplete
        label="Decks"
        v-model="selectedDeckId"
        :items="userDecks"
        item-title="name"
        item-value="id"
        variant="outlined"
      >
      </v-autocomplete>
    </v-col>

    <v-col cols="3">
      <v-autocomplete
        label="SubDecks"
        v-model="selectedSubDeckId"
        :items="userSubDecks"
        item-title="name"
        item-value="id"
        variant="outlined"
        :error-messages="v$.selectedSubDeckId.$errors.map((e) => e.$message)"
      >
      </v-autocomplete>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>

  <v-row>
    <v-col>
      <CardUserList v-if="this.userCards.length" :cards="this.userCards" />
      <h1 v-else>Sem Cards</h1>
    </v-col>
    <v-col>
      <div style="height: 80vh">
        <Card question="Teste" answer="Teste" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { getUserDecks } from "@/services/decks";
import { addCard, getSubDeckCards } from "@/services/cards";
import { getDeckSubDecks } from "@/services/subdecks";

import Card from "@/components/molecules/Card.vue";
import CreateCardExpander from "@/components/molecules/CreateCardExpander.vue";
import CardUserList from "@/components/molecules/CardUserList.vue";

export default {
  name: "CardsPage",
  components: {
    Card,
    CreateCardExpander,
    CardUserList,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      userCards: [],
      userDecks: [],
      userSubDecks: [],
      selectedDeckId: null,
      selectedSubDeckId: null,

      card: {
        types: ["Basic"],
        question: "",
        answer: "",
      },
    };
  },
  watch: {
    selectedDeckId() {
      this.userSubDecks = []
      this.selectedSubDeckId = null
      this.loadDeckSubDecks()
    },
    selectedSubDeckId() {
      this.userCards = []
      if (this.selectedSubDeckId){
        this.loadSubDeckCards()
      }
    },
  },
  async mounted() {
    await this.loadData();
  },
  validations() {
    return {
      selectedSubDeckId: { required },
      card: {
        question: { required },
        answer: { required },
      },
    };
  },
  methods: {
    async loadData() {
      const userDecksResponse = await getUserDecks();
      if (userDecksResponse.response.success) {
        this.userDecks = userDecksResponse.decks ? userDecksResponse.decks : []
      }
    },
    async loadDeckSubDecks() {
      const deckSubDecksResponse = await getDeckSubDecks(this.selectedDeckId);
      if (deckSubDecksResponse.response.success) {   
        this.userSubDecks = deckSubDecksResponse.subdecks ? deckSubDecksResponse.subdecks : []
      }
    },
    async loadSubDeckCards() {
      const userSubDecksCardsResponse = await getSubDeckCards(this.selectedSubDeckId);
      if (userSubDecksCardsResponse.response.success) {
        this.userCards = userSubDecksCardsResponse.cards ? userSubDecksCardsResponse.cards : []
      }
    },
    async createCard() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      const cardData = await addCard(
        this.selectedSubDeckId,
        this.card.question,
        this.card.answer
      );
      if (cardData.response.success) {
        console.log("[Alerta] Card criado com sucesso!");
      }
    },
  },
};
</script>

<style>
.center-elements {
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
