export const typeDefs = `#graphql
    type ChatMessage {
        id: ID!,
        content: String!,
        createdAt: String!,
        sender: User,
        community: Community
    }
`;
  