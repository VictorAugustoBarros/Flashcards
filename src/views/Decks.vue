<template>
  <v-row>
    <v-col>
      <CreateDeckExpander />
    </v-col>
  </v-row>

  <v-row>
    <Deck />
  </v-row>
</template>

<script>
import { useAuthStore } from "@/store/app";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { getUserDecks, addDeck } from "@/services/decks";
import { addSubDeck } from "@/services/subdecks";

import CreateDeckExpander from "@/components/molecules/CreateDeckExpander.vue"
import CreateSubDeckExpander from "@/components/molecules/CreateSubDeckExpander.vue"
import Deck from "@/components/molecules/Deck.vue"

export default {
  name: "DecksPage",
  components: {
    CreateDeckExpander,
    CreateSubDeckExpander,
    Deck,
  },
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
