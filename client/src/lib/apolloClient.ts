import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_GRAPHQL_HOST}:${process.env.NEXT_PUBLIC_MY_PORT}/graphql`, // my GraphQL endpoint
});

// WebSocket link for subscriptions using graphql-ws
const wsLink = new GraphQLWsLink(
  createClient({
    url: `${process.env.NEXT_PUBLIC_SUBSCRIPTION_HOST}:${process.env.NEXT_PUBLIC_MY_PORT}/subscriptions`,
    // Optional: pass authentication token
    /*connectionParams: {
      authentication: user.authToken,
    },*/
    retryAttempts: 5,
  }),
);

// Using split to send data to each link depending on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
