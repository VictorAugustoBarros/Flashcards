import { ADD_SUBDECK } from "@/graphql/mutations/subdeckMutations";
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

  console.log(variables);

  const data = await graphqlClient.request(ADD_SUBDECK, variables, headers);
  return data.add_subdeck;

}

export { addSubDeck };
