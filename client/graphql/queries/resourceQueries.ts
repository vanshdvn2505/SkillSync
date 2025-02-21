import { gql } from "@apollo/client";

export const GET_RESOURCES = gql`
  query GetResources($communityId: String!) {
    getResources(communityId: $communityId) {
      id
      title
      fileUrl
      tags
      mentor {
        id
        firstName
        lastName
      }
    }
  }
`;
