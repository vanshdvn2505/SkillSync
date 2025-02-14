import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
    query getCurrentLoggedInUser {
        getCurrentLoggedInUser{
            id
            firstName
            lastName
            profileImageURL
            email
            gender
            role
        }
    }
`