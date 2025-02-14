export const queries = `#graphql
    getCurrentLoggedInUser: User
    getCommunityMembers(communityId: String!): [User]
    getJoinedCommunities(userId: String!): [Community!]!
    getCommunities(userId: String!): [Community!]!
    getCommunityById(communityId: String!): Community!
`;