import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      author {
        firstName
        lastName
        profileImageURL
      }
      content
      imageUrl
      likes{
        id
      }
      comments{
        id
      }
      tags{
        name
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($id: String!) {
    getPostById(id: $id) {
      id
      author {
        firstName
        lastName
        avatar
      }
      content
      image
      timestamp
      likes
      comments
      shares
      tags
      savedAt
    }
  }
`;