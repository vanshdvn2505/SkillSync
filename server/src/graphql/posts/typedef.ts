export const typeDefs = `#graphql
        type Post {
            id: String!
            title: String!
            content: String!
            imageUrl: String
            author: User!
            likes: [Like!]
            comments: [Comment!]
            tags: [Tag!]!
        }
            
        type Like {
            id: String!
            user: User!
        }

        type Comment {
            id: String!
            content: String!
            author: User!
        }

        type Tag {
            id: String!
            name: String!
        }
    `;