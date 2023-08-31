<template>
  <v-card max-width="344" variant="outlined" rounded>
    <v-card-item class="centerElements" style="display: unset">
      <v-text-field
        placeholder="Question"
        v-model="localQuestion"
        variant="tonal"
        style="width: 100%"
      >
      </v-text-field>
      <v-text-field
        placeholder="Answer"
        variant="tonal"
        v-model="localAnswer"
        style="width: 100%"
      >
      </v-text-field>
    </v-card-item>
    <v-card-actions class="centerElements">
      <Button color="green" text="Editar"></Button>
      <Button color="red" text="Excluir"></Button>
    </v-card-actions>
  </v-card>
</template>

<script>
import Button from "@/components/atoms/Button.vue";

export default {
  name: "Card",
  components: {
    Button,
  },
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
