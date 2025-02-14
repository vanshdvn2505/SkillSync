export const typeDefs = `#graphql

    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        profileImageURL: String
        role: String
        gender: String
    }

    type Community {
        id: ID!
        name: String!
        description: String
        capacity: Int!
        maxCapacity: Int!
        profileImageURL: String
        skills: [String]!
        rating: Float!
        createdAt: String!
        members: [User!]!
        chat: [ChatMessage!]!
        creator: User! 
        membersCount: Int,
        isJoined: Boolean,
    }
`;
  