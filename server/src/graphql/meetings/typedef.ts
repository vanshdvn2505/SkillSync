export const typeDefs = `#graphql
    
    enum MeetingStatus {
        SCHEDULED
        ACTIVE
        ENDED
    }

    enum MeetingLevel {
        Beginner
        Intermediate
        Advanced
    }
    
    type Meeting {
        id: String!
        title: String!
        description: String
        scheduledAt: String!
        isStarted: Boolean!
        mentor: User!
        community: Community!
        tags: [String!]
        attendees: [User!]
        maxAttendees: Int!
        status: MeetingStatus!
        duration: Float!
        level: MeetingLevel!
    }
`;
  