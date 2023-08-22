<template>
  <h1>Decks</h1>
  <!-- Criar um mini modal interno na pagina ao criar um novo Deck, abrindo as opções para novo cadastro -->
  <v-btn @click="createDeck()">Novo Deck</v-btn>
</template>

<script>

export default {
  name: "DecksPage",
  methods: {
    createDeck() {
      console.log("Criando deck...")
    }
  }
};
</script>
