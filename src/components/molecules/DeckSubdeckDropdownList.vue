<template>
  <v-row>
    <v-col :cols="cols">
      <DropdownList label="Decks" :items="decks" title="name" value="id" v-model="this.deckId"
        :error-messages="v$.deckId.$errors.map((e) => e.$message)" />
    </v-col>

    <v-col :cols="cols">
      <DropdownList label="SubDecks" :items="subdecks" title="name" value="id" v-model="this.subdeckId"
        :error-messages="v$.subdeckId.$errors.map((e) => e.$message)" />
    </v-col>
  </v-row>
</template>

<script>
import DropdownList from "@/components/atoms/DropdownList.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  name: "DeckSubdeckDropdownList",
  components: {
    DropdownList,
  },
  props: {
    cols: String,
    decks: Array,
    subdecks: Array,
    selectedDeckId: Int16Array,
    selectedsubdeckId: Int16Array,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      decks: this.decks,
      subdecks: [],

      deckId: this.selectedDeckId,
      subdeckId: this.selectedsubdeckId
    };
  },
  validations() {
    return {
      deckId: { required: helpers.withMessage('Valor Obrigatório', required) },
      subdeckId: { required: helpers.withMessage('Valor Obrigatório', required) },
    };
  },
  watch: {
    async deckId() {
      const isFormCorrect = await this.v$.deckId.$validate();
      if (!isFormCorrect) return;

      this.subdeckId = null;
      const deck = this.decks.find(deck => deck.id === this.deckId);
      this.subdecks = deck.sub_deck ? deck.sub_deck : []

      this.$emit("changeDeck", this.deckId)
    },
    subdeckId() {
      if (this.subdeckId){
        this.$emit("changeSubdeck", this.subdeckId)
      }
    }
  }
};
</script>
