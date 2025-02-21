import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { User } from "./user/index.ts";
import { Chat } from "./chat/index.ts";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { useServer } from "graphql-ws/lib/use/ws";
import { Meeting } from "./meetings/index.ts";
import { Post } from "./posts/index.ts";

const createApolloGraphQLServer = async (httpServer: any) => {
    const typeDefs = gql`
    
        ${User.typeDefs}
        ${Chat.typeDefs}
        ${Meeting.typeDefs}
        ${Post.typeDefs}
        
        type Query {
            ${User.queries}
            ${Chat.queries}
            ${Meeting.queries}
            ${Post.queries}
        }

        type Mutation {
            ${User.mutations}
            ${Chat.mutations}
            ${Meeting.mutations}
            ${Post.mutations}
        }

        type Subscription {
            ${Chat.subscriptions}
            ${Meeting.subscriptions}
        }
    `;

    const resolvers = {
        Query: {
            ...User.resolvers.queries,
            ...Chat.resolvers.queries,
            ...Meeting.resolvers.queries,
            ...Post.resolvers.Query,
        },
        Mutation: {
            ...User.resolvers.mutations,
            ...Chat.resolvers.mutations,
            ...Meeting.resolvers.mutations,
            ...Post.resolvers.Mutation
        },
        Subscription: {
            ...Chat.resolvers.subscriptions,
            ...Meeting.resolvers.subscriptions,
        },
    };

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql'
    })

    const serverCleanup = useServer({ schema }, wsServer);

    const gqlServer = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    }
                }
            }
        ]
    });

    await gqlServer.start();
    return { gqlServer };
};

export default createApolloGraphQLServer;
