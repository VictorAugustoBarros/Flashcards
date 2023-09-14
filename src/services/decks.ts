import { GET_USER_DECKS } from "@/graphql/querys/deckQuerys";
import { ADD_DECK, EDIT_DECK, DELETE_DECK } from "@/graphql/mutations/deckMutations";
import { graphqlClient } from "@/store/constants";
import { useAuthStore } from "@/store/app";

async function getUserDecks() {
  const headers = {
    authorization: useAuthStore().getToken,
  };

  const data = await graphqlClient.request(GET_USER_DECKS, {}, headers);
  return data.get_user_deck;

}

async function addDeck(name: string, description: string) {
  const headers = {
    authorization: useAuthStore().getToken,
  };
  const variables = {
    name: name,
    description: description,
  };

  const data = await graphqlClient.request(ADD_DECK, variables, headers);
  return data.add_deck;
}

async function editDeck(deck_id: Int16Array, name: string, description: string) {
  const headers = {
    authorization: useAuthStore().getToken,
  };
  const variables = {
    deck_id: deck_id,
    name: name,
    description: description,
  };

  const data = await graphqlClient.request(EDIT_DECK, variables, headers);
  return data.edit_deck;
}

async function deleteDeck(deck_id: Int16Array) {
  const headers = {
    authorization: useAuthStore().getToken,
  };

  const variables = {
    deck_id: deck_id,
  };

  const data = await graphqlClient.request(DELETE_DECK, variables, headers);
  return data.delete_deck;
}

export { getUserDecks, addDeck, editDeck, deleteDeck };
