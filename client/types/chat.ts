export interface ChatMessage {
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
}

export interface CommunityChat {
    communityId: string;
    chat: ChatMessage[];
}
