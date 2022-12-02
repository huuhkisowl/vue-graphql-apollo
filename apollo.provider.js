import { InMemoryCache, createHttpLink, ApolloClient } from "@apollo/client";
import { createApolloProvider } from "@vue/apollo-option";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
   link: httpLink,
   cache,
 })

export const provider = createApolloProvider({
  defaultClient: apolloClient,
});