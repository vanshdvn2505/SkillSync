import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import CommunityTabs from "./components/community-tabs"
import CommunityHeader from "./components/community-header"
import { Navbar } from "@/components/Navbar"

const communities = [
  {
    id: 1,
    name: "Web Development Wizards",
    description: "Learn and share web development skills",
    members: 1234,
    upcomingMeetings: 2,
    tags: ["JavaScript", "React", "Node.js"],
    rating: 4.7,
    profileImage: "https://github.com/shadcn.png",
  },
  // ... (other communities)
]

export default function CommunityPage({ params }: { params: { id: string } }) {
  const community = communities.find((c) => c.id === Number.parseInt(params.id))

  if (!community) {
    notFound()
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar />
      <CommunityHeader community={community} />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
          <CommunityTabs communityId={community.id} />
        </Suspense>
      </main>
    </div>
  )
}

