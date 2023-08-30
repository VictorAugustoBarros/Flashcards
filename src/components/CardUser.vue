<template>
  <v-card max-width="344" variant="outlined" rounded>
    <v-card-item class="centerElements" style="display: unset;">
      <v-text-field placeholder="Question" v-model="localQuestion" variant="tonal" style="width: 100%;">
      </v-text-field>
      <v-text-field placeholder="Answer" variant="tonal" v-model="localAnswer" style="width: 100%;">
      </v-text-field>
    </v-card-item>
    <v-card-actions class="centerElements">
      <v-btn variant="outlined" color="green" @click="editCard"> Editar </v-btn>
      <v-btn variant="outlined" color="red" @click="deleteCard"> Excluir </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CardUser",
  props: {
    question: String,
    answer: String,
  },
  data() {
    return {
      localQuestion: this.question,
      localAnswer: this.answer,
    };
  },
  methods: {
    editCard() {
      // Emit events to update the parent component's data
      this.$emit("update:question", this.localQuestion);
      this.$emit("update:answer", this.localAnswer);
    },
    deleteCard() {
      // Implement the delete functionality
    },
  },
};
</script>

<style>
.centerElements {
  justify-content: center;
  text-align: center;
}
</style>
