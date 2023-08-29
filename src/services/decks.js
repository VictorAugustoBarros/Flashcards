import { GET_USER_DECKS } from "@/graphql/querys/deckQuerys";
import { graphqlClient } from "@/store/constants";
import { useAuthStore } from "@/store/app";

async function getUserDecks() {
  const headers = {
    authorization: useAuthStore().getToken,
  };

  return await graphqlClient.request(GET_USER_DECKS, {}, headers);
}

export { getUserDecks };
