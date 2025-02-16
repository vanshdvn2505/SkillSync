"use client";

import { useState, useRef, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, ChevronLeft, ChevronRight, HeartIcon, MessageCircleIcon, ShareIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { PostUpload } from "./postUpload";

interface Post {
  id: number;
  user: string;
  content: string;
  image: string;
  timestamp: string;
  likes: number;
  tags: string[];
  comments: number;
  mentorAvatar: string;
  mentorName: string;
  shares: number;
  savedAt: string;
}

interface LikedPost {
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

const initialPosts: Post[] = [
  {
    id: 1,
    user: "Alice",
    content: "Just finished the React course. It was amazing!",
    image: "https://source.unsplash.com/400x300/?technology",
    timestamp: "2 hours ago",
    tags: ["AI", "Technology", "Future"],
    likes: 5,
    comments: 2,
    shares: 5,
    mentorAvatar: "https://source.unsplash.com/400x300/?technology",
    mentorName: "Dr. Jane Smith",
    savedAt: "2023-06-09T10:15:00Z",
  },
  {
    id: 2,
    user: "Bob",
    content: "Has anyone used Next.js? Thoughts?",
    image: "https://github.com/shadcn.png",
    timestamp: "4 hours ago",
    tags: ["AI", "Technology", "Future"],
    likes: 3,
      mentorAvatar: "https://source.unsplash.com/400x300/?technology",
    comments: 1,
    shares: 5,
    mentorName: "Dr. Jane Smith",
    savedAt: "2023-06-09T10:15:00Z",
  },
  {
    id: 3,
    user: "Charlie",
    content: "Working on a new project using TypeScript. Loving it so far!",
    image: "https://github.com/shadcn.png",
    timestamp: "1 day ago",
    tags: ["AI", "Technology", "Future"],
    likes: 7,
    comments: 4,
    shares: 5,
      mentorAvatar: "https://source.unsplash.com/400x300/?technology",
      mentorName: "Dr. Jane Smith",
      savedAt: "2023-06-09T10:15:00Z",
      
  },
];

const likedPosts: LikedPost[] = [
  {
    id: "1",
    mentorName: "Dr. Jane Smith",
    mentorAvatar: "https://github.com/shadcn.png",
    communityId: "1",
    content:
      "Just finished giving a lecture on the latest advancements in AI. Here's a snapshot of the key points we covered.",
    image: "https://source.unsplash.com/400x300/?AI",
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
];

export function PostsSection() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedTab, setSelectedTab] = useState<"community" | "liked">("community");
  const [selectedPost, setSelectedPost] = useState<Post | LikedPost | null>(null);
  const { user } = useAuth();

  const communityScrollRef = useRef<HTMLDivElement | null>(null);
  const likedScrollRef = useRef<HTMLDivElement | null>(null);

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

  const handleScroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const handleLike = (id: number) => {
    setPosts(posts.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post)));
  };

  return (
    <Card className="bg-foreground border-none text-primary-foreground">
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Community & Liked Posts</h2>
          <div className="flex gap-2">
            <Button
              variant={selectedTab === "community" ? "default" : "outline"}
              onClick={() => setSelectedTab("community")}
            >
              Community
            </Button>
            <Button
              variant={selectedTab === "liked" ? "default" : "outline"}
              onClick={() => setSelectedTab("liked")}
            >
              Liked
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        {/* Scroll Buttons for Community */}
        {selectedTab === "community" && (
          <>
            <Button
              variant="ghost"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
              onClick={() => handleScroll(communityScrollRef as RefObject<HTMLDivElement>, "left")}
            >
              <ChevronLeft size={24} />
            </Button>

            <div ref={communityScrollRef} className="overflow-x-auto flex gap-4 p-2 no-scrollbar">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="relative w-64 cursor-pointer rounded-lg overflow-hidden shadow-lg"
                  onClick={() => setSelectedPost(post)}
                >
                  <img src={post.image} alt={`Post by ${post.user}`} className="w-full h-40 object-cover" />
                  <div className="p-3 bg-popover">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={`https://github.com/shadcn.png`} />
                        <AvatarFallback>{post.user[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold">{post.user}</h3>
                    </div>
                    <p className="mt-1 text-sm">{post.content}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                        <ThumbsUp size={16} className="mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare size={16} className="mr-1" />
                        {post.comments}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
              onClick={() => handleScroll(communityScrollRef as RefObject<HTMLDivElement>, "right")}
            >
              <ChevronRight size={24} />
            </Button>
          </>
        )}

        {/* Liked Posts */}
        {selectedTab === "liked" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {likedPosts.map((post) => (
              <div
                key={post.id}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedPost(post)}
              >
                <img src={post.image} alt={`Post by ${post.mentorName}`} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Post Modal */}
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
    </Card>
  );
}