import { gql } from "@apollo/client";

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription MessageAdded($communityId: ID!) {
    messageAdded(communityId: $communityId) {
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
