import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { getWithExpiry } from "../utils/localStorage";

const user = getWithExpiry("user");

const httpLink = createUploadLink({
  uri: `${process.env.REACT_APP_GRAPHQL_API}`,
});

const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_GRAPHQL_API_WS}`,
  options: {
    reconnect: true,
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: user ? `Bearer ${user.token}` : "",
    },
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache(),
  link: link,
  connectToDevTools: true,
});

export default client;
