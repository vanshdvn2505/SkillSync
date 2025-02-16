"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatSection } from "./chat-section"
import { ResourcesSection } from "./resources-section"
import { PostsSection } from "./posts-section"
import AboutSection from "./about-section"
import MeetingsSection from "./meetings-section"
import { ReviewsSection } from "./reviews-section"
import useAuth from "@/hooks/useAuth"
import MembersList, { Member } from "./membersList"
import { Community } from "@/types/community"
import { useQuery, useSubscription } from "@apollo/client"
import { GET_COMMUNITY_CHAT } from "@/graphql/queries/chatQueries"
import { MESSAGE_ADDED_SUBSCRIPTION } from "@/graphql/subscriptions/chatSubscriptions"



export default function CommunityTabs({ community }: { community: Community }) {
  const [activeTab, setActiveTab] = useState("about")
  const { user, loading } = useAuth();
  console.log("User", user);
  const [members, setMembers] = useState<Member[]>(community.members)

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id))
  }
  
  const { data: chatData, loading: chatLoading, subscribeToMore } = useQuery(GET_COMMUNITY_CHAT, {
    variables: { communityId: community.id },
    skip: !user || !community,
    fetchPolicy: "cache-and-network",
  });


  useEffect(() => {
    if (!community.id) return;

    const unsubscribe = subscribeToMore({
      document: MESSAGE_ADDED_SUBSCRIPTION,
      variables: { communityId: community.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const newMessage = subscriptionData.data.messageAdded

        return {
          getCommunityChat: [...prev.getCommunityChat, newMessage],
        }
      },
    })

    return () => unsubscribe()
  }, [community.id, subscribeToMore])

  return (
    <Tabs defaultValue="about" onValueChange={setActiveTab}>
      <TabsList className={`grid w-full ${user.role === "Learner" ? "grid-cols-6": "grid-cols-7"} bg-foreground text-muted`}>
        <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary-foreground" value="about">About</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary-foreground" value="meetings">Meetings</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary-foreground" value="chat">Chat</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary-foreground" value="resources">Resources</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary-foreground" value="posts">Posts</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary-foreground" value="reviews">Reviews</TabsTrigger>
        {user && user.role == "Mentor" && (<TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary-foreground" value="members">Members</TabsTrigger>)}
      </TabsList>
      <TabsContent value="about">
        <AboutSection about = {community.description} />
      </TabsContent>
      <TabsContent value="meetings">
        <MeetingsSection />
      </TabsContent>
      <TabsContent value="chat">
        <ChatSection chat = { chatData?.getCommunityChat } user = { user } communityId = {community.id} />
      </TabsContent>
      <TabsContent value="resources">
        <ResourcesSection />
      </TabsContent>
      <TabsContent value="posts">
        <PostsSection />
      </TabsContent>
      <TabsContent value="reviews">
        <ReviewsSection />
      </TabsContent>
      <TabsContent value="members">
        <MembersList members={members} onRemove={handleRemoveMember} />
      </TabsContent>
    </Tabs>
  )
}