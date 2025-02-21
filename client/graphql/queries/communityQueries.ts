import { gql } from "@apollo/client";

export const GET_JOINED_COMMUNITIES = gql `
    query getJoinedCommunities($userId: String!) {
        getJoinedCommunities(userId: $userId){
            id
            name
            description
            capacity
            maxCapacity
            profileImageURL
            skills
            rating
            createdAt
        }
    }
`;

export const GET_COMMUNITIES = gql`
    query getCommunities($userId: String!) {
        getCommunities(userId: $userId) {
            id
            name
            description
            capacity
            maxCapacity
            profileImageURL
            skills
            rating
            createdAt
            membersCount
            creator {
                id
                firstName
                lastName
                email
                profileImageURL
            }
            isJoined
            meetings {
                attendees {
                    id
                }
            }
        }
    }
`

export const GET_COMMUNITY_BY_ID = gql`
    query getCommunityById($communityId: String!) {
        getCommunityById(communityId: $communityId) {
            id
            name
            description
            capacity
            maxCapacity
            profileImageURL
            skills
            rating
            createdAt
            creator {
                id
                firstName
                lastName
                email
                profileImageURL
            }
            members {
                id
                firstName
                lastName
                profileImageURL
                role
            }
            meetings {
                attendees {
                    id
                }
            }
        }
    }
`
