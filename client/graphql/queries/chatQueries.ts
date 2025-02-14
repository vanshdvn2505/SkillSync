import { gql } from "@apollo/client";

export const GET_COMMUNITY_CHAT = gql`
  query GetCommunityChat($communityId: String!) {
    getCommunityChat(communityId: $communityId) {
      id
      content
      createdAt
      sender {
        id
        firstName
        lastName
        profileImageURL
      }
    }
  }
`;
