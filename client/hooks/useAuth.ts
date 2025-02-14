'use client'

import { CURRENT_USER } from "@/graphql/queries/authQueries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "./use-toast";
import { client } from "@/lib/apolloClient";

const useAuth = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cachedUser = client.readQuery({ query: CURRENT_USER });

  const { data, loading } = useQuery(CURRENT_USER, {
    skip: !isClient || !!cachedUser,
    fetchPolicy: "cache-first",
  });

  const user = cachedUser?.getCurrentLoggedInUser || data?.getCurrentLoggedInUser;

  useEffect(() => {
    if (isClient && !loading && !user) {
      setTimeout(() => {
        toast({
          title: "Session Expired",
          description: "Please Login Again",
        });
      }, 2000);
      router.replace("/login");
    }
  }, [user, loading, router, isClient]);

  return { user, loading };
};

export default useAuth;
