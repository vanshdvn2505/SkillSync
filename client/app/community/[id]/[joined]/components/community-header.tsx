"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Star } from "lucide-react";
import { Community } from "@/types/community";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { JOIN_COMMUNITY, LEAVE_COMMUNITY } from "@/graphql/mutations/communityMutations";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function CommunityHeader({ community, isJoined, userId }: { community: Community, isJoined: boolean, userId: string }) {
  const [joined, setJoined] = useState<boolean>(isJoined);
  const communityId = community.id;
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    setJoined(isJoined); 
  }, [isJoined]);

  const updateURL = (newJoinedState: boolean) => {
    setJoined(newJoinedState)
    const updatedPath = pathname.replace(/(true|false)$/, String(newJoinedState));
    router.replace(updatedPath, { scroll: false });        
  };

  const [joinCommunity, { loading: joining }] = useMutation(JOIN_COMMUNITY);
  const [leaveCommunity, { loading: leaving }] = useMutation(LEAVE_COMMUNITY);

  const handleJoin = async () => {
    try {
      await joinCommunity({ variables: { userId, communityId } });
      setJoined(true);
      updateURL(true);
      router.refresh();
      toast({
        title: "Joined Community",
        description: `You have successfully joined ${community.name}`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error joining community:", error);
      toast({
        title: "Error",
        description: "Failed to join the community. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLeave = async () => {
    try {
      await leaveCommunity({ variables: { userId, communityId } });
      setJoined(false);
      updateURL(false);
      router.refresh();
      toast({
        title: "Left Community",
        description: `You have successfully left ${community.name}`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error leaving community:", error);
      toast({
        title: "Error",
        description: "Failed to leave the community. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-foreground shadow text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={community.profileImageURL || "https://github.com/shadcn.png"}
              alt={community.name}
              width={96}
              height={96}
              className="rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold">{community.name}</h1>
              <div className="flex items-center mt-2">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="text-lg font-semibold">{community.rating && community.rating > 0
                  ? community.rating.toFixed(1)
                  : "Not Rated"}
                </span>
              </div>
            </div>
          </div>
          {joined == true ? (
            <Button variant={"destructive"} onClick={handleLeave}>
              Leave Community
            </Button>

          ) : (
            <Button onClick={handleJoin}>
              Join Community
            </Button>
          )}
        </div>
        <p className="text-muted mb-4">{community.description}</p>
        <div className="flex items-center space-x-4 text-sm text-muted mb-4">
          <span className="flex items-center">
            <Users size={16} className="mr-1" />
            {community.members.length || 0} members
          </span>
          <span className="flex items-center">
            <Calendar size={16} className="mr-1" />
            {community.meetings.length || 0} upcoming meetings
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {community.skills && community.skills.map((tag: string) => (
            <Badge key={tag} className="bg-primary/30">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </header>
  );
}
