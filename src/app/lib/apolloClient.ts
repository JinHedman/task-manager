import { ApolloClient, InMemoryCache } from '@apollo/client';

// create a new apollo Client instance
const client = new ApolloClient({
  uri: '/api/graphql', // which nextjs API route GraphQL is connected to
  cache: new InMemoryCache(),
});

export default client;
