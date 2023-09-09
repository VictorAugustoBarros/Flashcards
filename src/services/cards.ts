import { ADD_CARD,  EDIT_CARD, DELETE_CARD } from "@/graphql/mutations/cardMutations";
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

async function editCard(card_id: Int16Array, question:String, answer: String) {
  const headers = {
    authorization: useAuthStore().getToken,
  };

  const variables = {
    card_id: card_id,
    question: question,
    answer: answer
  };

  const data = await graphqlClient.request(EDIT_CARD, variables, headers);
  return data.edit_card;
}

async function deleteCard(card_id: Int16Array) {
  const headers = {
    authorization: useAuthStore().getToken,
  };

  const variables = {
    card_id: card_id
  };

  const data = await graphqlClient.request(DELETE_CARD, variables, headers);
  return data.delete_card;
}


export { addCard, getSubDeckCards, deleteCard, editCard};
