export interface Community {
    id: string;
    name: string;
    description: string;
    capacity: number;
    maxCapacity: number;
    profileImageURL?: string;
    skills: string[];
    rating: number;
    createdById: string;
    createdAt: string;
    members: {
        id: string;
        firstName: string;
        lastName?: string;
        email: string;
        profileImageURL?: string;
    }[];
    membersCount: number;
    creator: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        profileImageURL?: string;
    };
    upcomingMeetings?: number;
    isJoined: boolean;
    chat: {
        id: string;
        content: string;
        createdAt: string;
        sender: {
            id: string;
            firstName: string;
            lastName?: string;
            email: string;
            profileImageURL?: string;
        };
    }[];
}
