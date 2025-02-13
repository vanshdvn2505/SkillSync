import { gql } from "@apollo/client";

export const SIGNUP = gql `
    mutation createUser($firstName: String!, $lastName: String, $email: String!, $password: String!, $role: String) {
        createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, role: $role)
    }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;


export const LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password)
  }
`;