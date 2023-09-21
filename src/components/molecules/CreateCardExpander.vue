<template>
  <v-expansion-panels v-model="this.panel">
    <v-expansion-panel bg-color="transparent" elevation="0" rounded="True" value="cardExpander">
      <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
        <v-spacer />
        <v-col cols="1" class="center-Elements-Flex">
          Card
        </v-col>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <div>
          <v-row>
            <v-col cols="2" class="center-Elements-Flex">
              <DropdownList class="card-padding" label="Tipo" :items="cardTypes" v-model="cardTypes[0]" disabled="true" />
            </v-col>

            <v-col cols="4" class="center-Elements-Flex">
              <DeckSubdeckDropdownList class="card-padding" @change-deck="changeDeck" @change-subdeck="changeSubDeck"
                cols="6" :selectedDeckId="this.card.deckId" :selectedsubdeckId="this.card.subdeckId" />
                
            </v-col>
            <v-col cols="2" class="center-Elements-Flex">
              <v-text-field counter maxlength="30" class="card-padding" placeholder="Question" variant="outlined"
                v-model="card.question" :error-messages="v$.card.question.$errors.map((e) => e.$message)"></v-text-field>
            </v-col>
            <v-col cols="2" class="center-Elements-Flex">
              <v-text-field counter maxlength="30" class="card-padding" placeholder="Answer" variant="outlined"
                v-model="card.answer" :error-messages="v$.card.answer.$errors.map((e) => e.$message)"></v-text-field>
            </v-col>
            <v-col cols="2" class="center-Elements-Flex">
              <Button text="Criar" color="green" size="large" @click="addCard()"></Button>
            </v-col>
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
import { addCard } from "@/services/cards";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useDecksStore } from "@/store/decks";

export default {
  name: "CreateCardExpander",
  components: {
    Button,
    DropdownList,
    DeckSubdeckDropdownList,
  },
  data() {
    return {
      decksStore: useDecksStore(),
      cardTypes: ["Basic"],
      panel: null,
      elevation: 0,
      card: {
        deckId: null,
        subdeckId: null,
        question: null,
        answer: null,
      },
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      card: {
        question: { required: helpers.withMessage('Valor Obrigatório', required) },
        answer: { required: helpers.withMessage('Valor Obrigatório', required) },
      },
    };
  },
  async created() {
    this.emitter.on("openExpander", (values) => {
      this.card.deckId = values.deckId;
      this.card.subdeckId = values.subdeckId;

      this.panel = "cardExpander"
    });
  },
  methods: {
    changeDeck(deckId) {
      this.card.deckId = deckId;
    },
    changeSubDeck(subdeckId) {
      this.card.subdeckId = subdeckId;
    },
    async addCard() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      const cardResponse = await addCard(
        this.card.subdeckId,
        this.card.question,
        this.card.answer
      );

      if (cardResponse.response.success) {
        const card = {
          id: cardResponse.card.id,
          question: this.card.question,
          answer: this.card.answer,
        }
        this.decksStore.insertCard(this.card.deckId, this.card.subdeckId, card)
        this.emitter.emit("reloadCards");
        this.emitter.emit("alertBox", { title: "Card", message: "Criado com sucesso!", type: "success" });

      } else {
        this.emitter.emit("alertBox", { title: "Card", message: "Falha ao criar Card!", type: "error" });
      }
    }
  }
};
</script>
