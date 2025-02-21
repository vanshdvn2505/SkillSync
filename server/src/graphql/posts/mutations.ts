export const mutations = `#graphql
    createPost(title: String!, content: String!, imageUrl: String, authorId: String!): Post!
    deletePost(id: String!): Post!
    likePost(postId: String!, userId: String!): Post!
    unlikePost(postId: String!, userId: String!): Post!
    commentOnPost(postId: String!, userId: String!, content: String!): Post!
    deleteComment(commentId: String!): Post!
    sharePost(postId: String!, userId: String!): Post!
`;
