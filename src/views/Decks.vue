<template>
  <h1>Decks</h1>
  <!-- Criar um mini modal interno na pagina ao criar um novo Deck, abrindo as opções para novo cadastro -->

  <div>
    <v-text-field
      v-model="v$.deck.name.$model"
      :error-messages="v$.deck.name.$errors.map((e) => e.$message)"
      label="Deck Name"
      required
      @input="v$.deck.name.$touch"
      @blur="v$.deck.name.$touch"
    ></v-text-field>

    <v-text-field
      v-model="v$.deck.description.$model"
      :error-messages="v$.deck.description.$errors.map((e) => e.$message)"
      label="Description"
      required
      @input="v$.deck.description.$touch"
      @blur="v$.deck.description.$touch"
    ></v-text-field>

    <v-btn @click="createDeck()">Cadastrar Deck</v-btn>
  </div>

  <Alert v-if="!alert"></Alert>

  <div>
    <v-autocomplete
      v-model="selectedDeckId"
      :items="userDecks"
      item-title="name"
      item-value="id"
    >
    </v-autocomplete>

    <v-text-field
      v-model="v$.subdeck.name.$model"
      :error-messages="v$.subdeck.name.$errors.map((e) => e.$message)"
      label="SubDeck Name"
      required
      @input="v$.subdeck.name.$touch"
      @blur="v$.subdeck.name.$touch"
    ></v-text-field>

    <v-text-field
      v-model="v$.subdeck.description.$model"
      :error-messages="
        v$.subdeck.description.$errors.map((e) => e.$message)
      "
      label="SubDeck Description"
      required
      @input="v$.subdeck.description.$touch"
      @blur="v$.subdeck.description.$touch"
    ></v-text-field>

    <v-btn @click="createSubDeck()">Cadastrar SubDeck</v-btn>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/app";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { getUserDecks, addDeck } from "@/services/decks";
import { addSubDeck } from "@/services/subdecks";

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
        name: "",
        description: "",
      },

      subdeck: {
        name: "",
        description: "",
      },
    };
  },
  validations() {
    return {
      deck: {
        name: { required },
        description: { required },
      },
      subdeck: {
        name: { required },
        description: { required },
      },
    };
  },
  mounted() {
    this.loadDecks();
  },
  methods: {
    async loadDecks() {
      const deckData = await getUserDecks();
      
      if (deckData.response.success) {
        this.userDecks = deckData.decks;
        return;
      }

      // TODO -> Adicionar tratamento de erro
    },
    async createDeck() {
      const isFormCorrect = await this.v$.deck.$validate();
      if (!isFormCorrect) return;

      const deckData = await addDeck(this.deck.name, this.deck.description);

      if (deckData.response.success) {
        console.log("[Alerta] Deck criado com sucesso!");
      }
    },
    async createSubDeck() {
      const isFormCorrect = await this.v$.subdeck.$validate();
      if (!isFormCorrect) return;

      const subdeckData = await addSubDeck(
        this.selectedDeckId,
        this.subdeck.name,
        this.subdeck.description
      );
      if (subdeckData.response.success) {
        console.log("[Alerta] SubDeck criado com sucesso!");
      }
    },
  },
};
</script>
