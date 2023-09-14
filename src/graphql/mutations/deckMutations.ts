import { gql } from "graphql-request";

const ADD_DECK = gql`
  mutation add_deck($name: String!, $description: String!) {
    add_deck(name: $name, description: $description) {
      deck {
        id
      }
      response {
        success
        message
        error
      }
    }
  }
`;

const EDIT_DECK = gql`

`;

const DELETE_DECK = gql`

`;

export { ADD_DECK, EDIT_DECK, DELETE_DECK };
