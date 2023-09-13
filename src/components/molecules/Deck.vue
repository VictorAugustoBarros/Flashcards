<template>
  <v-row>
    <v-col cols="6">
      <div class="center-Elements-Flex" style="height: 100%;">
        <DeckUserList :decks="decks" />
      </div>
    </v-col>

    <v-col cols="6">
    </v-col>
  </v-row>
</template>

<script>
import DeckUserList from "@/components/molecules/DeckUserList.vue";


export default {
  name: "Deck",
  components: {
    DeckUserList
  },
  data() {
    return {
      decks: [{
        name: "Deck1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non pharetra neque. Nulla in velit.",
        id: 1
      },
      {
        name: "Deck2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non pharetra neque. Nulla in velit.",
        id: 2
      }, {
        name: "Deck3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non pharetra neque. Nulla in velit.",
        id: 3
      }]
    }
  }
}
</script>