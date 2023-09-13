<template>
  <v-expansion-panels>
    <v-expansion-panel rounded="True">
      <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
        Novo Deck
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <div>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="3" class="center-Elements-Flex">
              <v-text-field hide-details placeholder="Name" variant="outlined" v-model="deck.name"
                :error-messages="v$.deck.name.$errors.map((e) => e.$message)"></v-text-field>
            </v-col>
            <v-col cols="3" class="center-Elements-Flex">
              <v-text-field hide-details placeholder="Description" variant="outlined" v-model="deck.description"
                :error-messages="v$.deck.description.$errors.map((e) => e.$message)"></v-text-field>
            </v-col>
            <v-col cols="2" class="center-Elements-Flex">
              <Button text="Criar Deck" color="green" size="large" @click="addCard()"></Button>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row>
            <v-divider></v-divider>
          </v-row>

          <v-row>

            <v-spacer></v-spacer>
            <v-col cols="2" class="center-Elements-Flex">
              <DropdownList label="Decks" :items="['Deck1', 'Deck2', 'Deck3']" />
            </v-col>

            <v-col cols="2" class="center-Elements-Flex">
              <v-text-field hide-details placeholder="Name" variant="outlined" v-model="deck.name"
                :error-messages="v$.deck.name.$errors.map((e) => e.$message)"></v-text-field>
            </v-col>
            <v-col cols="2" class="center-Elements-Flex">
              <v-text-field hide-details placeholder="Description" variant="outlined" v-model="deck.description"
                :error-messages="v$.deck.description.$errors.map((e) => e.$message)"></v-text-field>
            </v-col>
            <v-col cols="2" class="center-Elements-Flex">
              <Button text="Criar SubDeck" color="blue" size="large" @click="addCard()"></Button>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Button from "@/components/atoms/Button.vue";
import DropdownList from "@/components/atoms/DropdownList.vue";
import DeckSubdeckDropdownList from "@/components/molecules/DeckSubdeckDropdownList.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "CreateDeckExpander",
  components: {
    Button,
    DropdownList,
    DeckSubdeckDropdownList,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      deck: {
        name: { required },
        description: { required }
      },

      subdeck: {
        name: { required },
        description: { required }
      },
    };
  },
  data() {
    return {
      deck: {
        name: "",
        description: "",
      },
      subdeck: {
        name: "",
        description: "",
      }
    };
  },
  props: {
    userDecks: Array,
    userSubDecks: Array,
  },
  methods: {

  },
};
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>