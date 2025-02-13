"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import useAuth from "@/hooks/useAuth"
import { PostUpload } from "./postUpload"

type Post = {
  id: number
  user: string
  content: string
  timestamp: string
  likes: number
  comments: number
}

const initialPosts: Post[] = [
  {
    id: 1,
    user: "Alice",
    content: "Just finished the React course. It was amazing!",
    timestamp: "2 hours ago",
    likes: 5,
    comments: 2,
  },
  {
    id: 2,
    user: "Bob",
    content: "Has anyone used Next.js? Thoughts?",
    timestamp: "4 hours ago",
    likes: 3,
    comments: 1,
  },
  {
    id: 3,
    user: "Charlie",
    content: "Working on a new project using TypeScript. Loving it so far!",
    timestamp: "1 day ago",
    likes: 7,
    comments: 4,
  },
]

export function PostsSection() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState("")
  const { user, loading } = useAuth();

  const handleAddPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now(),
        user: "You",
        content: newPost.trim(),
        timestamp: "Just now",
        likes: 0,
        comments: 0,
      }
      setPosts([post, ...posts])
      setNewPost("")
    }
  }

  const handleLike = (id: number) => {
    setPosts(posts.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post)))
  }

  return (
      <Card className="bg-foreground border-none text-primary-foreground">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Community Posts</h2>
            <div className="space-y-6">
              { user && user.role == 'Mentor' && <PostUpload />}
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="p-4 bg-popover shadow-lg rounded-md">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.user}`} />
                        <AvatarFallback>{post.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{post.user}</h3>
                          <span className="text-sm text-muted">{post.timestamp}</span>
                        </div>
                        <p className="mt-2">{post.content}</p>
                        <div className="mt-4 flex items-center space-x-4">
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
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
      </Card> 
  )
}

