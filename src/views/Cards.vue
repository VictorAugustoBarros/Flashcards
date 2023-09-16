<template>
  <div class="center-Elements-Flex" style="height: 100vh;overflow: auto;">
    <v-sheet rounded="xl" width="95%" height="100%" class="sheet">
      <CreateCardExpander :cardTypes="this.card.types" />

      <div style="height: 100%;padding-top: 50px;">
        <CardPreview :cards="userCards" />
      </div>
    </v-sheet>
  </div>
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