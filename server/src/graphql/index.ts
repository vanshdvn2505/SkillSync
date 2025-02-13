import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { User } from "./user/index.ts";
import { Chat } from "./chat/index.ts";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { useServer } from "graphql-ws/lib/use/ws";

const createApolloGraphQLServer = async (httpServer: any) => {
    const typeDefs = gql`
    
        ${User.typeDefs}
        ${Chat.typeDefs}
        
        type Query {
            ${User.queries}
            ${Chat.queries}
        }

        type Mutation {
            ${User.mutations}
            ${Chat.mutations}
        }

        type Subscription {
            ${Chat.subscriptions}
        }
    `;
    
    const resolvers = {
        Query: {
            ...User.resolvers.queries,
            ...Chat.resolvers.queries
        },
        Mutation: {
            ...User.resolvers.mutations,
            ...Chat.resolvers.mutations
        },
        Subscription: {
            ...Chat.resolvers.subscriptions
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
