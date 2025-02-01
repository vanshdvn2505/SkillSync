"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card-ui";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { PostPopup } from "./ui/post-popup-ui";

const mentorPosts = [
  {
    id: 1,
    title: "New React Hooks Library Released",
    subtitle: "Simplify your React development",
    author: "Alice Johnson",
    community: "React Enthusiasts",
    content:
      "I'm excited to announce the release of our new React hooks library! This library aims to simplify common patterns and reduce boilerplate in your React applications. It includes hooks for state management, API calls, form handling, and more. We've focused on performance and ease of use, making it suitable for both small projects and large-scale applications. Check out the documentation and let me know your thoughts. We're open to feedback and contributions!",
    image: "https://picsum.photos/seed/react/600/400",
    upvotes: 42,
    date: "2023-05-15T14:30:00Z",
  },
  {
    id: 2,
    title: "Preparing for PyCon",
    subtitle: "Let's organize a community meetup",
    author: "Bob Smith",
    community: "Python Developers",
    content:
      "PyCon is just around the corner, and I couldn't be more excited! This year's lineup of speakers and workshops looks incredible. I think it would be great if we could organize a meetup for our community members who are attending. We could share our expectations, plan which sessions to attend, and maybe even prepare some questions for the Q&A sessions. If you're interested in joining, please comment below with your availability. I'm thinking we could meet up the evening before the conference starts. Looking forward to seeing many of you there and learning together!",
    image: "https://picsum.photos/seed/python/600/400",
    upvotes: 38,
    date: "2023-05-14T09:15:00Z",
  },
  {
    id: 3,
    title: "Breakthrough in Natural Language Processing",
    subtitle: "Implications for AI projects",
    author: "Carol Williams",
    community: "AI/ML Experts",
    content:
      "I'm thrilled to share a recent breakthrough in natural language processing that could have significant implications for many AI projects. Researchers have developed a new model that demonstrates unprecedented accuracy in understanding context and nuance in human language. This advancement could revolutionize chatbots, translation services, and even AI-assisted writing tools. In this post, I'll break down the key aspects of this new model and discuss how it might impact various industries. I'll also share some ideas on how we can start incorporating these advancements into our own projects. If you're working on anything related to NLP, I'd love to hear your thoughts on this development!",
    image: "https://picsum.photos/seed/ai/600/400",
    upvotes: 56,
    date: "2023-05-13T11:45:00Z",
  },
];

export function MentorPosts() {
  const [selectedPost, setSelectedPost] = useState(null);

  const handleUpvote = (postId: number) => {
    console.log(`Upvoted post ${postId}`);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 mb-5">
      <h2 className="text-2xl font-bold mb-4">Mentor Posts</h2>
      <div className="space-y-4">
        {mentorPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: index * 0.5, // Stagger the animation for each post
            }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between px-1">
                  <div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {post.subtitle}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex w-full items-center space-x-2 mb-3 px-1">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`}
                    />
                    <AvatarFallback>
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      {post.author} • {post.community}
                    </p>
                    <p>{new Date(post.date).toLocaleString()}</p>
                  </div>
                </div>
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <p className="mb-2">{post.content.slice(0, 150)}...</p>
                <Button variant="link" onClick={() => setSelectedPost(post)}>
                  Read more
                </Button>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpvote(post.id)}
                    >
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      {post.upvotes}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      {selectedPost && (
        <PostPopup post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}
