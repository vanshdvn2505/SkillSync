import { gql } from '@apollo/client';

export const UPLOAD_FILE = gql`
  mutation UploadFile($title: String!, $fileUrl: String!, $tags: [String!]!, $communityId: String!, $mentorId: String!) {
    uploadFile(title: $title, fileUrl: $fileUrl, tags: $tags, communityId: $communityId, mentorId: $mentorId) {
      id
      title
      fileUrl
      tags
      mentor {
        firstName
        lastName    
      }
    }
  }
`;

export const DELETE_RESOURCE = gql`
  mutation DeleteResource($resourceId: String!, $mentorId: String!) {
    deleteResource(resourceId: $resourceId, mentorId: $mentorId)
  }
`;
