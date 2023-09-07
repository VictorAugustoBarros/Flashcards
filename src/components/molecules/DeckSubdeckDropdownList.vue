<template>
  <v-row>
    <v-col :cols="cols">
      <DropdownList
        label="Decks"
        :items="userDecks"
        title="name"
        value="id"
        v-model="selectedDeckId"
      />
    </v-col>

    <v-col :cols="cols">
      <DropdownList
        label="SubDecks"
        :items="userSubDecks"
        title="name"
        value="id"
        v-model="selectedSubDeckId"
      />
    </v-col>
  </v-row>
</template>

<script>
import DropdownList from "@/components/atoms/DropdownList.vue";
import { getUserDecks } from "@/services/decks";
import { getDeckSubDecks } from "@/services/subdecks";

export default {
  name: "DeckSubdeckDropdownList",
  components: {
    DropdownList,
  },
  props: {
    cols: String,
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
    selectedDeckId() {
      this.userSubDecks = [];
      this.selectedSubDeckId = null;
      this.loadDeckSubDecks();
      this.$emit("changeDeck", this.selectedDeckId);
    },
    selectedSubDeckId() {
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
