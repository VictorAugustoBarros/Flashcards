import { gql } from 'graphql-request'

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

export { ADD_USER, LOGIN_USER };