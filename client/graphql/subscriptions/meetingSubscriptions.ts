import { gql } from "@apollo/client";

export const MEETING_STARTED_SUBSCRIPTION = gql`
  subscription MeetingStarted($meetingId: String!) {
  meetingStarted(meetingId: $meetingId) {
    id
    title
    isStarted
    mentor {
      id
      firstName
      lastName
    }
    community {
      id
      name
    }
  }
}

`;