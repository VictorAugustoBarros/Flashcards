import { gql } from "graphql-request";

const LOGIN_USER = gql`
  query login($email: String!, $password: String!){
    login(email: $email,  password:$password) {
        jwt_token
        response{
            success
            message
            error
        }
    }
  }
`;

export { LOGIN_USER };
