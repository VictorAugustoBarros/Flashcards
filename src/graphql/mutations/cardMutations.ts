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

export { ADD_CARD };
