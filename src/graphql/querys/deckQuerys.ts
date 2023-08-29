import { gql } from "graphql-request";

const GET_USER_DECKS = gql`
  query {
    get_user_deck {
      decks {
        id
        name
      }
      response {
        success
        message
        error
      }
    }
  }
`;

export { GET_USER_DECKS };
