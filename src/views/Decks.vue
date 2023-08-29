<template>
  <h1>Decks</h1>
  <!-- Criar um mini modal interno na pagina ao criar um novo Deck, abrindo as opções para novo cadastro -->

  <div>
    <v-text-field
      v-model="v$.deck.deckName.$model"
      :error-messages="v$.deck.deckName.$errors.map((e) => e.$message)"
      label="Deck Name"
      required
      @input="v$.deck.deckName.$touch"
      @blur="v$.deck.deckName.$touch"
    ></v-text-field>

    <v-text-field
      v-model="v$.deck.deckDescription.$model"
      :error-messages="v$.deck.deckDescription.$errors.map((e) => e.$message)"
      label="Description"
      required
      @input="v$.deck.deckDescription.$touch"
      @blur="v$.deck.deckDescription.$touch"
    ></v-text-field>

    <v-btn @click="createDeck()">Cadastrar Deck</v-btn>
  </div>

  <Alert v-if="!alert"></Alert>

  <div>
    <v-autocomplete v-model="selectedDeckId" :items="userDecks" item-title="name" item-value="id"> </v-autocomplete>

    <v-text-field
      v-model="v$.subdeck.subDeckName.$model"
      :error-messages="v$.subdeck.subDeckName.$errors.map((e) => e.$message)"
      label="SubDeck Name"
      required
      @input="v$.subdeck.subDeckName.$touch"
      @blur="v$.subdeck.subDeckName.$touch"
    ></v-text-field>

    <v-text-field
      v-model="v$.subdeck.subDeckDescription.$model"
      :error-messages="
        v$.subdeck.subDeckDescription.$errors.map((e) => e.$message)
      "
      label="SubDeck Description"
      required
      @input="v$.subdeck.subDeckDescription.$touch"
      @blur="v$.subdeck.subDeckDescription.$touch"
    ></v-text-field>

    <v-btn @click="createSubDeck()">Cadastrar SubDeck</v-btn>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/app";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { ADD_DECK, GET_USER_DECKS } from "@/services/decks";
import { ADD_SUBDECK } from "@/services/subdecks";
import { graphqlClient } from "@/store/constants";

export default {
  name: "DecksPage",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      authStore: useAuthStore(),
      userDecks: [],
      selectedDeckId: null,
      deck: {
        deck: null,
        deckName: "Deck 1",
        deckDescription: "Deck Description 1",
      },

      subdeck: {
        subDeckName: "",
        subDeckDescription: "",
      },
    };
  },
  validations() {
    return {
      deck: {
        deckName: { required },
        deckDescription: { required },
      },
      subdeck: {
        subDeckName: { required },
        subDeckDescription: { required },
      },
    };
  },
  mounted() {
    this.loadDecks();
  },
  methods: {
    async loadDecks() {
      const headers = {
        authorization: this.authStore.getToken,
      };

      const data = await graphqlClient.request(GET_USER_DECKS, {}, headers);
      const response = data.get_user_deck.response;
      console.log(response)

      if (response) {
        this.userDecks = data.get_user_deck.decks;
        return;
      }
      
      // TODO -> Adicionar tratamento de erro
    },
    async createDeck() {
      console.log("Criando deck...");
      const isFormCorrect = await this.v$.deck.$validate();
      if (!isFormCorrect) return;

      const headers = {
        authorization: this.authStore.getToken,
      };
      const variables = {
        name: this.deck.deckName,
        description: this.deck.deckDescription,
      };

      const data = await graphqlClient.request(ADD_DECK, variables, headers);
      const response = data.add_deck.response;
      console.log(response);
      if (response) {
        console.log("[Alerta] Deck criado com sucesso!");
      }
    },
    async createSubDeck() {
      console.log("Criando subdeck...");
      const isFormCorrect = await this.v$.subdeck.$validate();
      if (!isFormCorrect) return;

      const headers = {
        authorization: this.authStore.getToken,
      };

      const variables = {
        deck_id: this.selectedDeckId,
        name: this.subdeck.subDeckName,
        description: this.subdeck.subDeckDescription,
      };

      const data = await graphqlClient.request(ADD_SUBDECK, variables, headers);
      const response = data.add_subdeck.response;
      console.log(response);
    },
  },
};
</script>
