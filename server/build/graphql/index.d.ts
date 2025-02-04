import { ApolloServer } from "@apollo/server";
declare const createApolloGraphQLServer: () => Promise<ApolloServer<import("@apollo/server").BaseContext>>;
export default createApolloGraphQLServer;
