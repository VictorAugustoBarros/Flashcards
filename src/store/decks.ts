// Utilities
import { defineStore } from "pinia";
import { getUserDecks } from "@/services/decks";

export const useDecksStore = defineStore("decks", {
  state: () => ({
    decks: []
  }),
  getters: {
    getDecks: (state) => state.decks,
    getDeck: (state) => (deckId) => {
      return state.decks.find(deck => deck.id === deckId);
    },
    getSubDecks: (state) => (deckId) => {
      const decks = state.decks.find(deck => deck.id === deckId);
      return decks.sub_deck
    },
    getCards: (state) => (deckId, subdeckId) => {
      const deck = state.decks.find(deck => deck.id === deckId);
      const subdecks = deck.sub_deck.find(subdeck => subdeck.id === subdeckId);
      return subdecks.cards
    },
    getCard: (state) => (deckId, subdeckId, cardId) => {
      const deck = state.decks.find(deck => deck.id === deckId);
      const subdecks = deck.sub_deck.find(subdeck => subdeck.id === subdeckId);
      const card = subdecks.cards.find(card => card.id === cardId);
      return card
    }
  },
  actions: {
    async loadDecks() {
      const userDecksResponse = await getUserDecks();
      if (userDecksResponse.response.success) {
        this.decks = userDecksResponse.decks;
      }
    },
    async insertCard(deckId, subdeckId, card) {
      const deck = this.decks.find(deck => deck.id === deckId);
      if (!deck) {
        return false;
      }
    
      const subdeck = deck.sub_deck.find(subdeck => subdeck.id === subdeckId);
      if (!subdeck) {
        return false;
      }

      subdeck.cards.push(card);
      return true;
    },
    async updateCard(deckId, subdeckId, cardId, updatedCard) {
      const deck = this.decks.find(deck => deck.id === deckId);
      if (!deck) {
        return false;
      }
    
      const subdeck = deck.sub_deck.find(subdeck => subdeck.id === subdeckId);
      if (!subdeck) {
        return false;
      }
    
      const cardIndex = subdeck.cards.findIndex(card => card.id === cardId);
      if (cardIndex === -1) {
        return false;
      }
    
      subdeck.cards[cardIndex] = updatedCard;
      return true;
    },
    async deleteCard(deckId, subdeckId, cardId) {
      const deck = this.decks.find(deck => deck.id === deckId);
      if (!deck) {
        return false;
      }
    
      const subdeck = deck.sub_deck.find(subdeck => subdeck.id === subdeckId);
      if (!subdeck) {
        return false;
      }
    
      const cardIndex = subdeck.cards.findIndex(card => card.id === cardId);
      if (cardIndex === -1) {
        return false;
      }
    
      subdeck.cards = subdeck.cards.filter(card => card.id !== cardId);
      return true;
    }
  },
  persist: {
    enabled: true,
  },
});
