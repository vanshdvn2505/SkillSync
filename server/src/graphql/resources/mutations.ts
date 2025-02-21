export const mutations = `#graphql
    uploadFile(
        title: String!,
        fileUrl: String!,
        tags: [String!]!,
        communityId: String!,
        mentorId: String!,

    ) : Resource!

    deleteResource(resourceId: String!, mentorId: String!) : Boolean!

    
`;