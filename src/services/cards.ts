import { ADD_CARD } from "@/graphql/mutations/cardMutations";
import { GET_SUBDECK_CARDS } from "@/graphql/querys/cardQuerys";
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

async function getSubDeckCards(subdeck_id: Int16Array) {
  const headers = {
    authorization: useAuthStore().getToken,
  };

  const variables = {
    subdeck_id: subdeck_id
  };

  const data = await graphqlClient.request(GET_SUBDECK_CARDS, variables, headers);
  return data.get_subdeck_cards;
}

export { addCard, getSubDeckCards };
