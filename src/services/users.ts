import { LOGIN_USER } from "@/graphql/querys/userQuerys";
import { ADD_USER } from "@/graphql/mutations/userMutations";
import { graphqlClient } from "@/store/constants";

async function loginUser(email: string, password: string) {
  const variables = {
    email: email,
    password: password,
  };

  const data = await graphqlClient.request(LOGIN_USER, variables);
  return data.login;
}

async function addUser(email: string, username: string, password: string) {
  const variables = {
    email: email,
    username: username,
    password: password,
  };
  const data = await graphqlClient.request(ADD_USER, variables);
  return data.add_user;
}

export { loginUser, addUser };
