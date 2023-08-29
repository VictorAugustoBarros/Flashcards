import { gql } from "graphql-request";

const ADD_SUBDECK = gql`
    mutation add_subdeck($deck_id: Int!, $name: String!, $description: String!){
        add_subdeck (deck_id: $deck_id, name:$name, description:$description) {
            subdeck {
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

export { ADD_SUBDECK };
