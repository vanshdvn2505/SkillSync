import { gql } from "@apollo/client";

export const JOIN_COMMUNITY = gql`
  mutation JoinCommunity($userId: String!, $communityId: String!) {
    joinCommunity(userId: $userId, communityId: $communityId)
  }
`;

export const LEAVE_COMMUNITY = gql`
  mutation LeaveCommunity($userId: String!, $communityId: String!) {
    leaveCommunity(userId: $userId, communityId: $communityId)
  }
`;
