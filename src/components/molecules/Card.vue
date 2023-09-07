<template>
  <v-card max-width="344" variant="outlined" rounded>
    <v-card-item class="center-Elements-Flex" style="display: unset">
      <v-text-field
        style="text-align: center"
        placeholder="Question"
        v-model="this.question"
        variant="tonal"
      >
      </v-text-field>
      <v-text-field placeholder="Answer" variant="tonal" v-model="this.answer">
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
    id: Int16Array,
    question: String,
    answer: String,
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
