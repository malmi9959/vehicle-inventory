import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { getWithExpiry } from "../utils/localStorage";

const httpLink = createUploadLink({
  uri: `${process.env.REACT_APP_GRAPHQL_API}`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const user = getWithExpiry("user");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: user ? `Bearer ${user.token}` : "",
    },
  };
});

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  connectToDevTools: true,
});

export default client;
