<template>
  <div style="display: flex;justify-content: center;">
    <v-card class="card" variant="text" rounded>
      <ConfirmModal v-model="deleteDialog" @close-modal="closeModal" @delete-item="deleteCard" />
      <v-card-item class="center-Elements-Flex" style="display: unset">

        <v-text-field class="centered-input" style="text-align: center" placeholder="Question" v-model="this.newQuestion"
          variant="tonal">
        </v-text-field>

        <v-divider></v-divider>

        <v-text-field class="centered-input" placeholder="Answer" variant="tonal" v-model="this.newAnswer" center-affix
          single-line>
        </v-text-field>

      </v-card-item>
      <v-card-actions class="center-Elements-Flex">
        <Button color="green" text="Editar" :variant="ButtonVariant" @click="editCard"></Button>
        <Button color="red" text="Excluir" :variant="ButtonVariant" @click="openDeleteModal"></Button>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script >
import ConfirmModal from "@/components/atoms/ConfirmModal.vue";
import Button from "@/components/atoms/Button.vue";
import { deleteCard, editCard } from "@/services/cards";

export default {
  name: "Card",
  components: {
    Button,
    ConfirmModal,
  },
  data() {
    return {
      deleteDialog: false,
      newQuestion: this.question,
      newAnswer: this.answer,
    }
  },
  props: {
    cardId: Int16Array,
    subdeckId: Int16Array,
    question: String,
    answer: String,
    ButtonVariant: {
      type: String,
      default: "text"
    }
  },
  updated(){
    this.newQuestion = this.question
    this.newAnswer = this.answer
  },
  methods: {
    async deleteCard() {
      const response = await deleteCard(this.cardId)
      if (response.success) {
        this.emitter.emit("alertBox", { title: "Card", message: "Card deletado com sucesso!", type: "success" });
        this.emitter.emit("reloadCardUserList", this.subdeckId);
        this.$emit("cardRemoved");
        this.deleteDialog = false;

      } else {
        this.emitter.emit("alertBox", { title: "Card", message: "Falha ao deletar card!", type: "error" });
      }
    },
    async editCard() {
      const response = await editCard(this.cardId, this.newQuestion, this.newAnswer)
      if (response.success) {
        this.emitter.emit("alertBox", { title: "Card", message: "Card atualizado com sucesso!", type: "success" });
        this.emitter.emit("reloadCardUserList", this.subdeckId, this.cardId);
        this.deleteDialog = false;

      } else {
        this.emitter.emit("alertBox", { title: "Card", message: "Falha ao atualizar card!", type: "error" });
      }
    },
    openDeleteModal() {
      this.deleteDialog = true;
    },
    closeModal() {
      this.deleteDialog = false;
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

.centered-input :deep(input) {
  text-align: center;
  font-size: 20px;
}
</style>