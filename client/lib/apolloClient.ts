'use client';

import { HttpLink, ApolloLink, split } from '@apollo/client';
import { SSRMultipartLink, InMemoryCache, ApolloClient } from '@apollo/experimental-nextjs-app-support';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { DefinitionNode, DocumentNode, OperationDefinitionNode } from 'graphql';
const port = process.env.NEXT_PUBLIC_PORT;

const httpLink = new HttpLink({
  uri: `http://localhost:7001/graphql`,
  credentials: 'include'
})

const wsLink = typeof window !== 'undefined' ? new GraphQLWsLink(
  createClient({
    url: `ws://localhost:7001/graphql`,
    connectionParams: {
      credentials: 'include',
    }
  })
) : null;

const isSubscription = (query: DefinitionNode | null): query is OperationDefinitionNode => {
  return (
    query?.kind === 'OperationDefinition' && query.operation === 'subscription'
  )
}

const link = typeof window !== 'undefined' && wsLink ? split(
  ({ query }: { query: DocumentNode }) => {
    const definition = getMainDefinition(query);
    return (
      isSubscription(definition)
    );
  },
  wsLink,
  httpLink
) : httpLink;

export const client = new ApolloClient({
  link:
    typeof window === 'undefined'
      ? ApolloLink.from([
        new SSRMultipartLink({ stripDefer: true }).concat(httpLink)
      ])
      : link,
  cache: new InMemoryCache(),
});
