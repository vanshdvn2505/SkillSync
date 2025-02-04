import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Star } from "lucide-react"

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
  {
    id: 2,
    name: "Data Science Explorers",
    description: "Dive into the world of data science and machine learning",
    members: 987,
    upcomingMeetings: 1,
    tags: ["Python", "Machine Learning", "Data Visualization"],
    rating: 4.5,
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 3,
    name: "UX/UI Design Hub",
    description: "Crafting beautiful and user-friendly interfaces",
    members: 567,
    upcomingMeetings: 3,
    tags: ["UI Design", "User Research", "Prototyping"],
    rating: 4.8,
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 4,
    name: "Mobile App Innovators",
    description: "Creating cutting-edge mobile applications",
    members: 789,
    upcomingMeetings: 2,
    tags: ["iOS", "Android", "React Native"],
    rating: 4.6,
    profileImage: "https://github.com/shadcn.png",
  },
  {
    id: 5,
    name: "Cybersecurity Guardians",
    description: "Protecting digital assets and learning about cybersecurity",
    members: 456,
    upcomingMeetings: 1,
    tags: ["Network Security", "Ethical Hacking", "Cryptography"],
    rating: 4.9,
    profileImage: "https://github.com/shadcn.png",
  },
]

export default function ExploreCommunities() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {communities.map((community) => (
        <Card key={community.id} className="flex flex-col bg-foreground text-primary-foreground border-none shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <img
                src={community.profileImage || "/placeholder.svg"}
                alt={community.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <CardTitle>{community.name}</CardTitle>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-muted">{community.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted mb-4">{community.description}</p>
            <div className="flex items-center space-x-4 text-sm text-muted mb-4">
              <span className="flex items-center">
                <Users size={16} className="mr-1" />
                {community.members} members
              </span>
              <span className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {community.upcomingMeetings} upcoming
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {community.tags.map((tag) => (
                <Badge key={tag} className="bg-primary/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/explore-communities/community/${community.id}`} className="w-full">
              <Button className="w-full">View Community</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

