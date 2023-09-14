<template>
  <v-row>
    <v-col :cols="cols">
      <DropdownList
        label="Decks"
        :items="userDecks"
        title="name"
        value="id"
        v-model="selectedDeckId"
        :error-messages="v$.selectedDeckId.$errors.map((e) => e.$message)"
      />
    </v-col>

    <v-col :cols="cols">
      <DropdownList
        label="SubDecks"
        :items="userSubDecks"
        title="name"
        value="id"
        v-model="selectedSubDeckId"
        :error-messages="v$.selectedSubDeckId.$errors.map((e) => e.$message)"
      />
    </v-col>
  </v-row>
</template>

<script>
import DropdownList from "@/components/atoms/DropdownList.vue";
import { getUserDecks } from "@/services/decks";
import { getDeckSubDecks } from "@/services/subdecks";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  name: "DeckSubdeckDropdownList",
  components: {
    DropdownList,
  },
  props: {
    cols: String,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      selectedDeckId: { required: helpers.withMessage('Valor Obrigatório', required) },
      selectedSubDeckId: { required: helpers.withMessage('Valor Obrigatório', required) },
    };
  },
  data() {
    return {
      userDecks: [],
      userSubDecks: [],
      selectedDeckId: null,
      selectedSubDeckId: null,
    };
  },
  async mounted() {
    const userDecksResponse = await getUserDecks();
    if (userDecksResponse.response.success) {
      this.userDecks = userDecksResponse.decks ? userDecksResponse.decks : [];
    }
  },
  watch: {
    async selectedDeckId() {
      const isFormCorrect = await this.v$.selectedDeckId.$validate();
      if (!isFormCorrect) return;

      this.userSubDecks = [];
      this.selectedSubDeckId = null;
      this.loadDeckSubDecks();
      this.$emit("changeDeck", this.selectedDeckId);
    },
    async selectedSubDeckId() {
      this.$emit("changeSubDeck", this.selectedSubDeckId);
      this.$emit("loadSubDeckCards", this.selectedSubDeckId);
    },
  },
  methods: {
    async loadDeckSubDecks() {
      const deckSubDecksResponse = await getDeckSubDecks(this.selectedDeckId);
      if (deckSubDecksResponse.response.success) {
        this.userSubDecks = deckSubDecksResponse.subdecks
          ? deckSubDecksResponse.subdecks
          : [];
      }
    },
  },
};
</script>
