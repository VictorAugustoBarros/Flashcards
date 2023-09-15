<template>
  <v-row>
    <v-col>
      <CreateCardExpander :cardTypes="this.card.types" />
    </v-col>
  </v-row>

  <v-row justify="center" style="height: 100%;">
    <v-sheet rounded="xl" width="95%">
      <div style="height: 100%;padding-top: 50px;">
        <CardPreview :cards="userCards" />
      </div>
    </v-sheet>
  </v-row>
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