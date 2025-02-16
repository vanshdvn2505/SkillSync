import { gql } from "@apollo/client";

export const GET_ACCESS_TOKEN = gql`
  mutation GetAccessToken($roomName: String!, $userName: String!) {
    getAccessToken(roomName: $roomName, userName: $userName)
  }
`;


export const START_MEETING = gql`
  mutation StartMeeting($meetingId: String!, $userId: String!) {
    startMeeting(meetingId: $meetingId, userId: $userId){
      id
      isStarted
    }
  }
`;

export const CREATE_MEETING = gql`
  mutation CreateMeeting(
    $title: String!
    $description: String!
    $scheduledAt: String!
    $userId: String!
    $communityId: String!
    $duration: Float!
    $tags: [String!]!
    $maxAttendees: Int!
  ) {
    createMeeting(
      title: $title
      description: $description
      scheduledAt: $scheduledAt
      userId: $userId
      communityId: $communityId
      duration: $duration
      tags: $tags
      maxAttendees: $maxAttendees
    ) {
      id
      title
      scheduledAt
      duration
      tags
      maxAttendees
    }
  }
`;

export const REGISTER_MEETING = gql`
  mutation RegisterMeeting($meetingId: String!, $userId: String!) {
    registerMeeting(meetingId: $meetingId, userId: $userId){
      id
      attendees {
        id
      }
    }
  }
`;

export const JOIN_MEETING = gql`
  mutation JoinMeeting($meetingId: String!, $userId: String!) {
    joinMeeting(meetingId: $meetingId, userId: $userId)
  }
`;