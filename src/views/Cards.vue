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
      <CardListItems />
    </v-col>
    <v-col>
      <div style="height: 80vh">
        <CardUser question="Teste" answer="Teste" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { useAuthStore } from "@/store/app";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { getUserDecks } from "@/services/decks";
import { addCard } from "@/services/cards";
import { getUserSubDecks } from "@/services/subdecks";

import CardUser from "@/components/CardUser.vue";
import CreateCardExpander from "@/components/CreateCardExpander.vue";
import CardListItems from "@/components/CardListItems.vue";

export default {
  name: "CardsPage",
  components: {
    CardUser,
    CreateCardExpander,
    CardListItems,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      authStore: useAuthStore(),
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
  async mounted() {
    // Rever o tempo de busca na API
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
      // console.log(userDecksResponse);
      if (userDecksResponse.response.success) {
        this.userDecks = userDecksResponse.decks;
      }

      const userSubDecksResponse = await getUserSubDecks();
      // console.log(userSubDecksResponse);
      if (userSubDecksResponse.response.success) {
        this.userSubDecks = userSubDecksResponse.subdecks;
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
