"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

export function PostsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedTab, setSelectedTab] = useState<"community" | "liked">(
    "community"
  );
  const [isPostUploadOpen, setIsPostUploadOpen] = useState(false);
  const { user } = useAuth();

  const handleLike = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleNewPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setIsPostUploadOpen(false);
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
            {user?.role === "Mentor" && (
              <Button
                variant="outline"
                onClick={() => setIsPostUploadOpen(true)}
              >
                <PlusCircle className="mr-2" size={18} />
                Add Post
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {selectedTab === "community" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative cursor-pointer overflow-hidden rounded-lg"
              >
                <img
                  src={post.image}
                  alt={`Post by ${post.user}`}
                  className="object-cover w-full h-40"
                />
                <div className="p-3 bg-popover">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={post.mentorAvatar} />
                      <AvatarFallback>{post.user[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{post.user}</h3>
                  </div>
                  <p className="mt-1 text-sm">{post.content}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                    >
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
        )}
      </CardContent>

      {isPostUploadOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between w-full items-center px-2 py-3">
              <CardHeader>
                <h2 className="text-xl font-bold">Create a New Post</h2>
              </CardHeader>
              <Button
                className="mr-6"
                variant="destructive"
                onClick={() => setIsPostUploadOpen(false)}
              >
                X
              </Button>
            </div>
            <CardContent>
              <PostUpload onPostCreate={handleNewPost} />
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}
