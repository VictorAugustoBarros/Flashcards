import { gql } from "graphql-request";

const GET_SUBDECK_CARDS = gql`
query get_subdeck_cards($subdeck_id: Int!){
  get_subdeck_cards(subdeck_id: $subdeck_id){
        cards{
            id
            question
            answer
        }
        response {
            success
            message
            error
        }
  }
}
`;

export { GET_SUBDECK_CARDS };
