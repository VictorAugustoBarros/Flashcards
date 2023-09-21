<template>
  <v-card class="card" variant="text" rounded>
    <ConfirmModal v-model="deleteDialog" @close-modal="closeModal" @delete-item="deleteCard" />
    <v-card-item class="center-Elements-Flex" style="display: unset">

      <v-text-field class="centered-input" style="text-align: center" placeholder="Question" v-model="this.newCard.question"
        variant="tonal">
      </v-text-field>

      <v-divider></v-divider>

      <v-text-field class="centered-input" placeholder="Answer" variant="tonal" v-model="this.newCard.answer" center-affix
        single-line>
      </v-text-field>

    </v-card-item>
    <v-card-actions class="center-Elements-Flex">
      <Button color="green" text="Editar" :variant="ButtonVariant" @click="editCard"></Button>
      <Button color="red" text="Excluir" :variant="ButtonVariant" @click="openDeleteModal"></Button>
    </v-card-actions>
  </v-card>
</template>

<script >
import ConfirmModal from "@/components/organisms/ConfirmModal.vue";
import Button from "@/components/atoms/Button.vue";
import { deleteCard, editCard } from "@/services/cards";
import { useDecksStore } from "@/store/decks";

export default {
  name: "Card",
  components: {
    Button,
    ConfirmModal,
  },
  data() {
    return {
      decksStore: useDecksStore(),
      deleteDialog: false,
      newCard: this.card
    }
  },
  props: {
    deckId: Int16Array,
    subdeckId: Int16Array,
    card: Object,
    ButtonVariant: {
      type: String,
      default: "text"
    }
  },
  updated() {
    this.newCard = this.card;
  },
  methods: {
    async editCard() {
      const response = await editCard(this.newCard.id, this.newCard.question, this.newCard.answer)
      if (response.success) {
        await this.decksStore.updateCard(this.deckId, this.subdeckId, this.newCard.id, this.newCard)

        this.emitter.emit("alertBox", { title: "Card", message: "Card atualizado com sucesso!", type: "success" });
        this.emitter.emit("reloadCardUserList");
        this.$emit("updatedCard", {...this.newCard})
        this.deleteDialog = false;

      } else {
        this.emitter.emit("alertBox", { title: "Card", message: "Falha ao atualizar card!", type: "error" });
      }
    },
    async deleteCard() {
      const response = await deleteCard(this.newCard.id)
      if (response.success) {
        this.decksStore.deleteCard(this.deckId, this.subdeckId, this.newCard.id)

        this.emitter.emit("alertBox", { title: "Card", message: "Card deletado com sucesso!", type: "success" });
        this.emitter.emit("reloadCardUserList");
        this.$emit("deletedCard")

        this.deleteDialog = false;

      } else {
        console.log(response)
        this.emitter.emit("alertBox", { title: "Card", message: "Falha ao deletar card!", type: "error" });
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