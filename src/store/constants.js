import { GraphQLClient } from "graphql-request";

const graphqlUrl = "http://localhost:8000/graphql";

const graphqlClient = new GraphQLClient(graphqlUrl);

export { graphqlUrl, graphqlClient };
