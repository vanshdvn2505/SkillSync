export const typeDefs = `#graphql
    
    type Resource {
        id: String!,
        title: String!,
        resourceLink: String,
        fileUrl: String,
        tags: [String!]!,
        mentor: User,
        community: Community,        
    }
`;
  