import { gql } from "@apollo/client";

export const GET_MEETINGS = gql`
  query GetMeetings($communityId: String!) {
    getMeetings(communityId: $communityId) {
      id
      title
      description
      scheduledAt
      duration
      tags
      maxAttendees
      isStarted
      status
      level
      community {
        id
      }
      mentor {
        id
        firstName
      }
      attendees{
        id
      }
    }
  }
`;