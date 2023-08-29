import { gql } from "graphql-request";


const ADD_USER = gql`
  mutation add_user($email: String!, $username: String!, $password: String!){
    add_user(email: $email, username: $username, password:$password) {
        user{
            id
            creation_date
        }
        response{
            success
            message
        }
    }
  }
`;

export { ADD_USER };
