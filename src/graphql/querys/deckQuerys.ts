import { gql } from "graphql-request";

const GET_USER_DECKS = gql`
  query {
    get_user_deck{
      decks {
          id
          name
          description
          sub_deck {
              id
              name
              cards {
                  id
                  question
                  answer
              }
          }
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
