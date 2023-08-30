import { ADD_SUBDECK } from "@/graphql/mutations/subdeckMutations";
import { GET_SUBDECKS } from "@/graphql/querys/subdeckQuerys"
import { graphqlClient } from "@/store/constants";
import { useAuthStore } from "@/store/app";

async function addSubDeck(deck_id: Int16Array, name: string, description: string) {
  const headers = {
    authorization: useAuthStore().getToken,
  };

  const variables = {
    deck_id: deck_id,
    name: name,
    description: description,
  };

  const data = await graphqlClient.request(ADD_SUBDECK, variables, headers);
  return data.add_subdeck;
}

async function getUserSubDecks() {
  const headers = {
    authorization: useAuthStore().getToken,
  };

  const data = await graphqlClient.request(GET_SUBDECKS, {}, headers);
  return data.get_user_subdeck;
}

export { addSubDeck, getUserSubDecks };
