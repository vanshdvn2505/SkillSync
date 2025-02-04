"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, User } from "lucide-react"
import { ChatSection } from "./chat-section"
import { ResourcesSection } from "./resources-section"
import { PostsSection } from "./posts-section"
import AboutSection from "./about-section"
import MeetingsSection from "./meetings-section"
import { ReviewsSection } from "./reviews-section"


export default function CommunityTabs({ communityId }: { communityId: number }) {
  const [activeTab, setActiveTab] = useState("about")

  return (
    <Tabs defaultValue="about" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-6 bg-foreground text-muted">
        <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary-foreground" value="about">About</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary-foreground" value="meetings">Meetings</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary-foreground" value="chat">Chat</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary-foreground" value="resources">Resources</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary-foreground" value="posts">Posts</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:text-primary-foreground" value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="about">
        <AboutSection />
      </TabsContent>
      <TabsContent value="meetings">
        <MeetingsSection />
      </TabsContent>
      <TabsContent value="chat">
        <ChatSection />
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
    </Tabs>
  )
}