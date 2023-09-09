import { gql } from "graphql-request";

const ADD_CARD = gql`
    mutation add_card($subdeck_id: Int!, $question: String!, $answer: String!){
        add_card (subdeck_id: $subdeck_id, question: $question, answer: $answer) {    
            card{
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

const EDIT_CARD = gql`
    mutation edit_card($card_id: Int!, $question: String!, $answer: String!){
        edit_card (card_id: $card_id, question: $question, answer: $answer) {    
            success
            message
            error
    }
    }
`;

const DELETE_CARD = gql`
    mutation delete_card($card_id: Int!){
        delete_card (card_id: $card_id) {    
            success
            message
            error
        }
    }
`;

export { ADD_CARD, DELETE_CARD, EDIT_CARD };
