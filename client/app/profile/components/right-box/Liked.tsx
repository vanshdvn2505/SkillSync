import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartIcon, MessageCircleIcon, ShareIcon } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'

interface Post{
  id: string;
  mentorName: string;
  mentorAvatar: string;
  communityId: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  savedAt: string;
}

const likedPosts : Post[] = [
  {
    id: "1",
    mentorName: "Dr. Jane Smith",
    mentorAvatar: "https://github.com/shadcn.png",
    communityId: "1",
    content:
      "Just finished giving a lecture on the latest advancements in AI. Here's a snapshot of the key points we covered.",
    image: "https://github.com/shadcn.png",
    likes: 156,
    comments: 23,
    shares: 7,
    tags: ["AI", "Technology", "Future"],
    savedAt: "2023-06-10T14:30:00Z",
  },
  {
    id: "2",
    mentorName: "John Doe",
    mentorAvatar: "https://github.com/shadcn.png",
    communityId: "1",
    content: "Check out this visualization of our new algorithm in action!",
    image: "https://github.com/shadcn.png",
    likes: 89,
    comments: 15,
    shares: 5,
    tags: ["Algorithms", "Coding", "Visualization"],
    savedAt: "2023-06-09T10:15:00Z",
  },
  {
    id: "3",
    mentorName: "Sarah Johnson",
    mentorAvatar: "https://github.com/shadcn.png",
    communityId: "2",
    content: "Just published my new book on effective communication strategies! Here's a sneak peek at the cover.",
    image: "https://github.com/shadcn.png",
    likes: 210,
    comments: 45,
    shares: 18,
    tags: ["Communication", "Books", "Self-Improvement"],
    savedAt: "2023-06-08T09:00:00Z",
  },
  {
    id: "4",
    mentorName: "Mike Brown",
    mentorAvatar: "https://github.com/shadcn.png",
    communityId: "3",
    content: "Here's a quick and healthy breakfast recipe I swear by. Perfect for busy mornings!",
    image: "https://github.com/shadcn.png",
    likes: 132,
    comments: 28,
    shares: 12,
    tags: ["Health", "Nutrition", "Recipes"],
    savedAt: "2023-06-07T07:45:00Z",
  },
]

const sortedLikedPosts = likedPosts.length > 0 ? [...likedPosts].sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()) : [];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}


const Liked = () => {

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {sortedLikedPosts.length > 0 ? (
            sortedLikedPosts.map((post, index) => (
              <div key={index} className='relative aspect-square cursor-pointer overflow-hidden rounded-lg'
              onClick={() => setSelectedPost(post)}>
                  <img
                      src={post.image || "/placeholder.svg"}
                      alt={`Post by ${post.mentorName}`}
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-end">
                      <div className="p-2 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-semibold">{post.mentorName}</p>
                        <p className="text-xs">{formatDate(post.savedAt)}</p>
                      </div>
                  </div>
              </div>
            ))
        ) : (
          <div className="flex w-full items-center justify-center min-h-48">
            <p className="text-lg text-muted">No Liked Posts</p>
          </div>
        )}
      </div>

      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-x-4">
              <div className='flex justify-evenly items-center gap-2'>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedPost.mentorAvatar} alt={selectedPost.mentorName} />
                  <AvatarFallback>{selectedPost.mentorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedPost.mentorName}</CardTitle>
                  <CardDescription>{formatDate(selectedPost.savedAt)}</CardDescription>
                </div>
              </div>
              <div>
                <Button variant="ghost" className="ml-auto">
                  View
                </Button>
                <Button variant="ghost" className="ml-auto" onClick={() => setSelectedPost(null)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>{selectedPost.content}</p>
                <div className="relative h-64 w-full flex justify-center items-center">
                  <img
                    src={selectedPost.image || "/placeholder.svg"}
                    alt="Post image"
                    style={{ objectFit: "cover" }}
                    className="rounded-md object-fill h-full w-auto"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, index) => (
                    <Badge key={index}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center">
                    <HeartIcon className="h-4 w-4 mr-1" /> {selectedPost.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageCircleIcon className="h-4 w-4 mr-1" /> {selectedPost.comments}
                  </span>
                  <span className="flex items-center">
                    <ShareIcon className="h-4 w-4 mr-1" /> {selectedPost.shares}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default Liked