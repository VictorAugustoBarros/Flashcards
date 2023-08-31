import { gql } from "graphql-request";

const GET_SUBDECKS = gql`
    query get_user_subdeck {
        get_user_subdeck{
            subdecks {
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

const GET_DECK_SUBDECKS = gql`
query get_deck_subdecks($deck_id: Int!){
    get_deck_subdecks(deck_id: $deck_id){
          subdecks {
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


export { GET_SUBDECKS, GET_DECK_SUBDECKS};
