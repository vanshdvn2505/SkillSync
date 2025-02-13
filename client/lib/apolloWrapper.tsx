'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import { ApolloClient, ApolloNextAppProvider, InMemoryCache, SSRMultipartLink } from '@apollo/experimental-nextjs-app-support'
import { client } from './apolloClient'

export function makeClient() {
  return client;
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient as () => ApolloClient<any>}>
      {children}
    </ApolloNextAppProvider>
  )
}