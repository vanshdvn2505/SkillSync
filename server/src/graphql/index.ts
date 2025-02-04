import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { User } from "./user/index.ts";

const createApolloGraphQLServer = async () => {
    const typeDefs = gql`
    
        ${User.typeDefs}

        type Query {
            ${User.queries}
        }

        type Mutation {
            ${User.mutations}
        }
    `;

    const resolvers = {
        Query: User.resolvers.queries,
        Mutation: User.resolvers.mutations
    };

    const gqlServer = new ApolloServer({ typeDefs, resolvers });

    await gqlServer.start();
    return gqlServer;
};

export default createApolloGraphQLServer;
