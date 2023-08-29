import { LOGIN_USER } from "@/graphql/querys/userQuerys";
import { graphqlClient } from "@/store/constants";

async function loginUser(email:String, username, password) {
  const variables = {
    email: email,
    username: username,
    password: password,
  };

  const data = await graphqlClient.request(LOGIN_USER, variables);
  return data.login;
}

export { loginUser };
