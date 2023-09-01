<template>
  <v-row>
    <v-col>
      <CreateCardExpander :cardTypes="this.card.types" />
    </v-col>
  </v-row>

  <CardPreview :cards="userCards" />
</template>

<script>
import { addCard } from "@/services/cards";

import CardPreview from "@/components/organisms/CardPreview.vue";
import CreateCardExpander from "@/components/molecules/CreateCardExpander.vue";
import DropdownList from "@/components/atoms/DropdownList.vue";
import DeckSubdeckDropdownList from "@/components/molecules/DeckSubdeckDropdownList.vue";

export default {
  name: "CardsPage",
  components: {
    CreateCardExpander,
    CardPreview,
    DropdownList,
    DeckSubdeckDropdownList,
  },

  data() {
    return {
      card: {
        types: ["Basic"],
        question: "",
        answer: "",
      },
    };
  },

  methods: {
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
