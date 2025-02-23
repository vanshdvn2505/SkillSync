"use client";

import { Suspense, use } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CommunityTabs from "./components/community-tabs";
import CommunityHeader from "./components/community-header";
import { Navbar } from "@/components/Navbar";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@apollo/client";
import { GET_COMMUNITY_BY_ID } from "@/graphql/queries/communityQueries";

export default function CommunityPage({
  params,
}: {
  params: Promise<{ id: string; joined: boolean }>;
}) {
  return (
    <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
      <CommunityPageContent params={params} />
    </Suspense>
  );
}

function CommunityPageContent({
  params,
}: {
  params: Promise<{ id: string; joined: boolean }>;
}) {
  const unwrappedParams = use(params);

  const { user, loading: userLoading } = useAuth();
  console.log(user);

  const { data, loading: communityLoading } = useQuery(GET_COMMUNITY_BY_ID, {
    variables: { communityId: unwrappedParams.id },
    skip: !user,
    fetchPolicy: "cache-first",
  });

  if (!data) return <div className="text-primary-foreground">Error</div>;
  const community = data.getCommunityById;
  // console.log(community);

  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar />
      <CommunityHeader
        community={community}
        isJoined={unwrappedParams.joined}
        userId={user.id}
      />
      <main className="container mx-auto px-4 py-8">
        <CommunityTabs community={community} />
      </main>
    </div>
  );
}
