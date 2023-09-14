<template>
  <v-row>
    <v-col cols="6">
      <div class="center-Elements-Flex" style="height: 100%;">
        <DeckUserList :decks="decks" />
      </div>
    </v-col>

    <v-col cols="6">
      <v-row>
        <v-col class="center-Elements-Flex">
          <h1>Deck1</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="center-Elements-Flex">
          <h1>Descrição</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h2>SubDecks</h2>
        </v-col>
      </v-row>

      <v-row style="height: auto;">
        <v-col cols="4">
          <v-row v-for="i in 10">
            <h3>- SubDeck {{ i }} </h3>
          </v-row>
        </v-col>

        <v-col cols="8" style="background-color: blue;">
          <div ></div>
        </v-col>
      </v-row>

    </v-col>
  </v-row>
</template>

<script>
import DeckUserList from "@/components/molecules/DeckUserList.vue";


export default {
  name: "DeckPreview",
  components: {
    DeckUserList
  },
  props: {
    decks: Array
  },
  data() {
    return {

    }
  }
}
</script>