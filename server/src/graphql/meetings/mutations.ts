export const mutations = `#graphql
    getAccessToken(roomName: String!, userName: String!): GraphQLJSONObject

    createMeeting(
        title: String!,
        description: String!,
        scheduledAt: String!,
        userId: String!,
        communityId: String!,
        duration: Float!
        tags: [String!]!
        maxAttendees: Int!,
        level: MeetingLevel!
    ): Meeting!

    startMeeting(meetingId: String!, userId: String!): Meeting!

    registerMeeting(meetingId: String!, userId: String!): Meeting!

    joinMeeting(meetingId: String!, userId: String!): String!
`;