<template>
  <h1>Cards</h1>
  <!-- Criar um mini modal interno na pagina ao criar um novo Deck, abrindo as opções para novo cadastro -->
  <v-btn @click="createDeck()">Novo Card</v-btn>
</template>

<script>

export default {
  name: "CardsPage"
};
</script>
