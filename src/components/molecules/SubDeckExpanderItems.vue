<template>
  <v-sheet :elevation="5">
    <v-row justify="center" class="pb-5">
      <v-col cols="8">
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="3">
            <DropdownList class="card-padding" label="Decks" :items="decks" v-model="subdeck.selectedDeckId" title="name"
              value="id" :error-messages="v$.subdeck.selectedDeckId.$errors.map((e) => e.$message)" />
          </v-col>

          <v-col cols="3">
            <v-text-field class="card-padding" placeholder="Name" variant="outlined" v-model="subdeck.name" maxlength="30"
              counter :error-messages="v$.subdeck.name.$errors.map((e) => e.$message)"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field class="card-padding" placeholder="Description" variant="outlined" v-model="subdeck.description"
              maxlength="30" counter
              :error-messages="v$.subdeck.description.$errors.map((e) => e.$message)"></v-text-field>
          </v-col>
          <v-col cols="2">
            <Button text="Criar" color="blue" size="large" @click="createSubDeck()"></Button>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-sheet>
</template>

<script>
import Button from "@/components/atoms/Button.vue";
import DropdownList from "@/components/atoms/DropdownList.vue";
import DeckSubdeckDropdownList from "@/components/molecules/DeckSubdeckDropdownList.vue";

import { useAuthStore } from "@/store/app";
import { useDecksStore } from "@/store/decks";
import { addDeck } from "@/services/decks";
import { addSubDeck } from "@/services/subdecks";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  name: "CreateSubDeckExpander",
  components: {
    Button,
    DropdownList,
    DeckSubdeckDropdownList,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      deck: {
        name: {
          required: helpers.withMessage('Valor Obrigatório', required)
        },
        description: {
          required: helpers.withMessage('Valor Obrigatório', required)
        }
      },

      subdeck: {
        name: { required: helpers.withMessage('Valor Obrigatório', required) },
        description: { required: helpers.withMessage('Valor Obrigatório', required) },
        selectedDeckId: { required: helpers.withMessage('Valor Obrigatório', required) }
      },
    };
  },
  data() {
    return {
      authStore: useAuthStore(),
      deckStore: useDecksStore(),
      decks: [],
      elevationDeck: 0,
      isExpandedDeck: false,
      elevationSubDeck: 0,
      isExpandedSubDeck: false,

      deck: {
        name: null,
        description: "",
      },

      subdeck: {
        selectedDeckId: null,
        name: "",
        description: "",
      },
    };
  },
  created() {
    this.decks = this.deckStore.getDecks
  },
  methods: {
    async createDeck() {
      this.v$.deck.$touch();

      const isFormCorrect = await this.v$.deck.$validate();
      if (!isFormCorrect) return;

      const deckData = await addDeck(this.deck.name, this.deck.description);

      if (deckData.response.success) {
        this.emitter.emit("alertBox", { title: "Deck", message: "Deck criado com sucesso!", type: "success" });
        this.$emit("loadDecks")

      } else {
        this.emitter.emit("alertBox", { title: "Deck", message: "Falha ao criar Deck!", type: "error" });
      }
    },
    async createSubDeck() {
      const isFormCorrect = await this.v$.subdeck.$validate();
      if (!isFormCorrect) return;

      const subdeckData = await addSubDeck(
        this.subdeck.selectedDeckId,
        this.subdeck.name,
        this.subdeck.description
      );
      if (subdeckData.response.success) {
        this.emitter.emit("alertBox", { title: "SubDeck", message: "SubDeck criado com sucesso!", type: "success" });

      } else {
        this.emitter.emit("alertBox", { title: "SubDeck", message: "Falha ao criar SubDeck!", type: "error" });
      }
    }
  },
};
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>


