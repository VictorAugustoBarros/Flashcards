<template>
  <v-expansion-panels>
    <v-expansion-panel rounded="True">
      <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
        Novo Card
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <div>
          <v-row>
            <v-col cols="2">
              <DropdownList
                label="Tipo"
                :items="cardTypes"
                v-model="cardTypes[0]"
                disabled="true"
              />
            </v-col>

            <v-col cols="4">
              <DeckSubdeckDropdownList
                @changeSubDeck="changeSubDeck"
                cols="6"
              />
            </v-col>
            <v-col cols="2">
              <v-text-field
                hide-details
                placeholder="Question"
                variant="outlined"
                v-model="card.question"
                :error-messages="
                  v$.card.question.$errors.map((e) => e.$message)
                "
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                hide-details
                placeholder="Answer"
                variant="outlined"
                v-model="card.answer"
                :error-messages="v$.card.answer.$errors.map((e) => e.$message)"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <Button
                text="Criar Card"
                color="green"
                size="large"
                @click="addCard()"
              ></Button>
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
import { required } from "@vuelidate/validators";

export default {
  name: "CreateCardExpander",
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
      subdeckId: { required },
      card: {
        question: { required },
        answer: { required },
      },
    };
  },
  data() {
    return {
      deckId: null,
      subdeckId: null,
      card: {
        question: null,
        answer: null,
      },
    };
  },
  props: {
    cardTypes: {
      type: Array,
    },
    userDecks: Array,
    userSubDecks: Array,
  },
  methods: {
    // TODO -> Adicionar validações (vuelidate)
    changeSubDeck(subdeckId) {
      this.subdeckId = subdeckId;
    },
    async addCard() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      const cardResponse = await addCard(
        this.subdeckId,
        this.card.question,
        this.card.answer
      );
      if (cardResponse.response.success) {
        this.emitter.emit("alertBox", {title: "Card", message: "Criado com sucesso!", type: "success"});
        this.emitter.emit("reloadCardUserList", this.subdeckId);
      }
    },
  },
};
</script>
