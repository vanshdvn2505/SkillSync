export const mutations = `#graphql
    createUser(firstName: String!, lastName: String, email: String!, password: String!, role: String): String
    verifyEmail(token: String!): String
`;