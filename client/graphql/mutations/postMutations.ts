import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $imageUrl: String, $authorId: String!, $tags: [String!]!) {
    createPost(title: $title, content: $content, imageUrl: $imageUrl, authorId: $authorId, tags: $tags) {
      id
      title
      content
      imageUrl
      tags {
        name
      }
      author {
        id
        name
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: String!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($postId: String!, $userId: String!) {
    likePost(postId: $postId, userId: $userId) {
      id
      likes
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation UnlikePost($postId: String!, $userId: String!) {
    unlikePost(postId: $postId, userId: $userId) {
      id
      likes
    }
  }
`;

export const COMMENT_ON_POST = gql`
  mutation CommentOnPost($postId: String!, $userId: String!, $content: String!) {
    commentOnPost(postId: $postId, userId: $userId, content: $content) {
      id
      comments
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: String!) {
    deleteComment(commentId: $commentId) {
      id
    }
  }
`;

export const SHARE_POST = gql`
  mutation SharePost($postId: String!, $userId: String!) {
    sharePost(postId: $postId, userId: $userId) {
      id
      shares
    }
  }
`;