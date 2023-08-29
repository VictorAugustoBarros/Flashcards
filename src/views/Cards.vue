<template>
  <h1>Cards</h1>
  <!-- Criar um mini modal interno na pagina ao criar um novo Deck, abrindo as opções para novo cadastro -->

  <v-row>
    <v-col cols="2"></v-col>
    <v-col cols="4">
      <v-autocomplete
        label="Decks"
        v-model="selectedSubDeckId"
        :items="userSubDecks"
        item-title="name"
        item-value="id"
        variant="outlined"
      >
      </v-autocomplete>
    </v-col>

    <v-col cols="4">
      <v-autocomplete
        label="SubDecks"
        v-model="selectedSubDeckId"
        :items="userSubDecks"
        item-title="name"
        item-value="id"
        variant="outlined"
      >
      </v-autocomplete>
    </v-col>
    <v-col cols="2"></v-col>
  </v-row>

  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
        Novo Card
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-text-field hide-details placeholder="Subdeck"></v-text-field>
        <v-text-field hide-details placeholder="Question"></v-text-field>
        <v-text-field hide-details placeholder="Answer"></v-text-field>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-autocomplete
    v-model="selectedSubDeckId"
    :items="userSubDecks"
    item-title="name"
    item-value="id"
  >
  </v-autocomplete>

  <v-text-field
    v-model="v$.card.cardQuestion.$model"
    :error-messages="v$.card.cardQuestion.$errors.map((e) => e.$message)"
    label="Card Question"
    required
    @input="v$.card.cardQuestion.$touch"
    @blur="v$.card.cardQuestion.$touch"
  ></v-text-field>

  <v-text-field
    v-model="v$.card.cardAnswer.$model"
    :error-messages="v$.card.cardAnswer.$errors.map((e) => e.$message)"
    label="Card Answer"
    required
    @input="v$.card.cardAnswer.$touch"
    @blur="v$.card.cardAnswer.$touch"
  ></v-text-field>

  <v-btn @click="createCard()">Novo Card</v-btn>
</template>

<script>
import { useAuthStore } from "@/store/app";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { getUserDecks } from "@/services/decks";

export default {
  name: "CardsPage",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      userDecks: [],
      userSubDecks: [],
      authStore: useAuthStore(),
      selectedSubDeckId: null,
      card: {
        cardQuestion: "",
        cardAnswer: "",
      }
    };
  },
  mounted() {
    this.loadSubDecks();
  },
  validations() {
    return {
      selectedSubDeckId: { required },
      card: {
        cardQuestion: { required },
        cardAnswer: { required },
      },
    };
  },
  methods: {
    async loadData() {
      const userDecksResponse = await getUserDecks()
      console.log(userDecksResponse)
      
      // if (userDecksResponse.response.success) {
      //   console.log(decksResponse)
      //   this.userDecks = decksResponse.get_user_subdeck.response
      //   return;
      // }

    },
    async loadSubDecks() {
      const headers = {
        authorization: this.authStore.getToken,
      };

      const data = await graphqlClient.request(GET_SUBDECKS, {}, headers);
      const response = data.get_user_subdeck.response;

      if (response) {
        this.userSubDecks = data.get_user_subdeck.subdecks;
        return;
      }
    },
    async createCard() {
      const isFormCorrect = await this.v$.card.$validate();
      if (!isFormCorrect) return;

      const headers = {
        authorization: this.authStore.getToken,
      };
      const variables = {
        subdeck_id: this.selectedSubDeckId,
        question: this.card.cardQuestion,
        answer: this.card.cardAnswer,
      };

      const data = await graphqlClient.request(ADD_CARD, variables, headers);
      const response = data.add_card.response;
      console.log(response);
      if (response) {
        console.log("[Alerta] Deck criado com sucesso!");
      }
    },
  },
};
</script>
