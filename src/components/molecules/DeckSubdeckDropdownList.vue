<template>
  <!-- TODO: Ajustar o carregamento dos dados created/updated, clicar no botão do fantasma com o expander aberto e fechado -->
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
import { required, helpers, not } from "@vuelidate/validators";
import { useDecksStore } from "@/store/decks";

export default {
  name: "DeckSubdeckDropdownList",
  components: {
    DropdownList,
  },
  props: {
    cols: String,
    selectedDeckId: Int16Array,
    selectedsubdeckId: Int16Array,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      deckStore: useDecksStore(),
      decks: [],
      subdecks: [],

      deckId: this.selectedDeckId,
      subdeckId: this.selectedsubdeckId
    };
  },
  created() {
    this.decks = this.deckStore.getDecks;
    
    if (this.selectedDeckId){
      this.deckId = this.selectedDeckId;
      this.subdecks = this.deckStore.getSubDecks(this.deckId)
    }
    
    if (this.selectedsubdeckId){
      this.subdeckId = this.selectedsubdeckId;
    }
  },
  async updated(){
    console.log("updated...")
    if (this.selectedDeckId){
      this.deckId = this.selectedDeckId;
      
      if (!this.subdecks.length){
        console.log("loadSubdecks...")
        this.subdecks = await this.deckStore.getSubDecks(this.deckId)
        console.log("loadSubdecks-ok...")
      }
    }

    if (this.selectedsubdeckId){
      console.log("subdeckId...")
      this.subdeckId = this.selectedDeckId
    }
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
      this.subdecks = this.deckStore.getSubDecks(this.deckId)

      console.log("changeDeck...")
      this.$emit("changeDeck", this.deckId)
    },
    subdeckId() {
      if (this.subdeckId){
        console.log("changeSubdeck...")
        this.$emit("changeSubdeck", this.subdeckId)
      }
    }
  }
};
</script>
