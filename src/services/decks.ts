import { GET_USER_DECKS } from "@/graphql/querys/deckQuerys";
import { ADD_DECK } from "@/graphql/mutations/deckMutations";
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

export { getUserDecks, addDeck };
