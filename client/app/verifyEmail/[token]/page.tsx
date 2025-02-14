"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { VERIFY_EMAIL_MUTATION } from "@/graphql/mutations/authMutations";


export default function Verify() {
  const { token } = useParams();
  const router = useRouter();
  const [verifyEmail, { data, loading, error }] = useMutation(VERIFY_EMAIL_MUTATION);

  useEffect(() => {
    if (token) {
      verifyEmail({ variables: { token } })
        .then(() => {
          toast.success("Email verified! Please sign in.");
          setTimeout(() => {
            router.push("/login"); // Redirect to sign-in page
          }, 2000);
        })
        .catch(() => toast.error("Verification failed. Please try again."));
    }
  }, [token]);

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen bg-background text-primary-foreground">
      {loading ? (
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <p className="mt-4 text-lg">Verifying your email...</p>
        </div>
      ) : error ? (
        <p className="text-red-500 text-lg">Error: {error.message}</p>
      ) : (
        <p className="text-green-500 text-lg">Email Verified Successfully! Redirecting...</p>
      )}
    </div>
  );
}
