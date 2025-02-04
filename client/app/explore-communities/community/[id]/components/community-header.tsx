import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Star } from "lucide-react"

export default function CommunityHeader({ community }: { community: any }) {
  return (
    <header className="bg-foreground shadow text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={community.profileImage || "/placeholder.svg"}
              alt={community.name}
              width={96}
              height={96}
              className="rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold">{community.name}</h1>
              <div className="flex items-center mt-2">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="text-lg font-semibold">{community.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <Button>Join Community</Button>
        </div>
        <p className="text-muted mb-4">{community.description}</p>
        <div className="flex items-center space-x-4 text-sm text-muted mb-4">
          <span className="flex items-center">
            <Users size={16} className="mr-1" />
            {community.members} members
          </span>
          <span className="flex items-center">
            <Calendar size={16} className="mr-1" />
            {community.upcomingMeetings} upcoming meetings
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {community.tags.map((tag: string) => (
            <Badge key={tag} className="bg-primary/30">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </header>
  )
}

