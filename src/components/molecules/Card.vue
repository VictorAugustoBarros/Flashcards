<template>
  <div style="display: flex;justify-content: center;">
    <v-card class="card" variant="text" rounded>
      <ConfirmModal v-model="deleteDialog" />
      <v-card-item class="center-Elements-Flex" style="display: unset">
        
        <v-text-field class="centered-input" style="text-align: center" placeholder="Question" v-model="this.question"
          variant="tonal">
        </v-text-field>

        <v-divider></v-divider>

        <v-text-field class="centered-input" placeholder="Answer" variant="tonal" v-model="this.answer" center-affix
          single-line>
        </v-text-field>

      </v-card-item>
      <v-card-actions class="center-Elements-Flex">        
        <Button color="green" text="Editar" :variant="ButtonVariant"></Button>
        <Button color="red" text="Excluir" :variant="ButtonVariant" @click="openDeleteModal"></Button>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script >
import ConfirmModal from "@/components/atoms/ConfirmModal.vue";
import Button from "@/components/atoms/Button.vue";

export default {
  name: "Card",
  components: {
    Button,
    ConfirmModal,
  },
  data() {
    return {
      deleteDialog: false,
    }
  },
  props: {
    id: Int16Array,
    question: String,
    answer: String,
    ButtonVariant: {
      type: String,
      default: "text"
    }
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
    openDeleteModal() {
      this.deleteDialog = true;
    }
  },
};
</script>


<style scoped>
:root {
  --blue: #1e90ff;
  --white: #ffffff;
}

.card {
  border-radius: 20px;
  width: 800px;
  height: 300px;
}

.centered-input>>>input {
  text-align: center;
  font-size: 20px;
}
</style>