export const mutations = `#graphql
    createUser(firstName: String!, lastName: String, email: String!, password: String!, role: String): String
    verifyEmail(token: String!): String
    userLogin(email: String!, password: String!): String
    createCommunity(name: String!, description: String, capacity: Int!, profileImageURL: String, skills: [String!]!, createdBy: String!): String
    joinCommunity(userId: String!, communityId: String!): String
    leaveCommunity(userId: String, communityId: String): String
`;