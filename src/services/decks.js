import { gql } from 'graphql-request'

const ADD_DECK = gql`
    mutation add_deck($name: String!, $description: String!) {
        add_deck (name:$name, description:$description){
            deck {
                id
            }
            response{
                success
                message
                error
            }
        }
    }
`;

const GET_USER_DECKS = gql`
    query {
        get_user_deck{
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

const DELETE_DECK = gql`
  
`;

export { ADD_DECK, DELETE_DECK, GET_USER_DECKS };