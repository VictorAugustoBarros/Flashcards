<template>
  <v-row>
    <v-col>
      <CreateCardExpander :cardTypes="this.card.types" />
    </v-col>
  </v-row>

  <CardPreview :cards="userCards" />
</template>

<script>
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
      },
    };
  },
};
</script>
