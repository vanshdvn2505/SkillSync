"use client"; // This ensures the code runs only on the client side

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;

export default function Verify() {
  const { token } = useParams();
  const [verifyEmail, { data, loading, error }] = useMutation(VERIFY_EMAIL_MUTATION, {
    variables: { token },
  });

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div className="text-primary-foreground absolute bottom-80">{data ? <p>Email Verified Successfully</p> : <p>Verification Failed</p>}</div>;
}
