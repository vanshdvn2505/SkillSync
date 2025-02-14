import { gql } from "@apollo/client";

export const SEND_CHAT_MESSAGE = gql`
  mutation SendMessage($content: String!, $senderId: String!, $communityId: String!) {
    sendMessage(content: $content, senderId: $senderId, communityId: $communityId) {
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
