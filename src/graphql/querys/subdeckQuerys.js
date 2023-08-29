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

export { GET_SUBDECKS };
