import { ADD_CARD } from "@/graphql/mutations/cardMutations";
import { graphqlClient } from "@/store/constants";
import { useAuthStore } from "@/store/app";

async function addCard(subdeck_id: Int16Array, question: string, answer: string) {
  const headers = {
    authorization: useAuthStore().getToken,
  };

  const variables = {
    subdeck_id: subdeck_id,
    question: question,
    answer: answer,
  };

  const data = await graphqlClient.request(ADD_CARD, variables, headers);
  return data.add_card;
}

export { addCard };
