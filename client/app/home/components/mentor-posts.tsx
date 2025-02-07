"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card-ui";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share2, ThumbsUp, Search } from "lucide-react";
import { PostPopup } from "./ui/post-popup-ui";
import CommentPopup from "./ui/comment-popup";
import { Input } from "./ui/input";
import { Badge } from "@/components/ui/badge";

// Updated post data with tags
const mentorPosts = [
  {
    id: 1,
    title: "New React Hooks Library Released",
    subtitle: "Simplify your React development",
    author: "Alice Johnson",
    community: "React Enthusiasts",
    content:
      "I'm excited to announce the release of our new React hooks library! This library aims to simplify common patterns and reduce boilerplate in your React applications. It includes hooks for state management, API calls, form handling, and more.",
    image: "https://picsum.photos/seed/react/600/400",
    upvotes: 42,
    date: "2023-05-15T14:30:00Z",
    tags: ["React", "Hooks", "JavaScript"], // Added tags
  },
  {
    id: 2,
    title: "Preparing for PyCon",
    subtitle: "Let's organize a community meetup",
    author: "Bob Smith",
    community: "Python Developers",
    content:
      "PyCon is just around the corner, and I couldn't be more excited! This year's lineup of speakers and workshops looks incredible. I think it would be great if we could organize a meetup for our community members who are attending.",
    image: "https://picsum.photos/seed/python/600/400",
    upvotes: 38,
    date: "2023-05-14T09:15:00Z",
    tags: ["Python", "PyCon", "Community"], // Added tags
  },
  {
    id: 3,
    title: "Breakthrough in Natural Language Processing",
    subtitle: "Implications for AI projects",
    author: "Carol Williams",
    community: "AI/ML Experts",
    content:
      "I'm thrilled to share a recent breakthrough in natural language processing that could have significant implications for many AI projects. Researchers have developed a new model that demonstrates unprecedented accuracy in understanding context and nuance in human language.",
    image: "https://picsum.photos/seed/ai/600/400",
    upvotes: 56,
    date: "2023-05-13T11:45:00Z",
    tags: ["AI", "NLP", "Machine Learning"], // Added tags
  },
];

export function MentorPosts() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [currentPostForComment, setCurrentPostForComment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null); // Track selected tag for filtering

  // Filter posts by title and selected tag
  const filteredPosts = mentorPosts.filter((post) => {
    const matchesSearchQuery = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearchQuery && matchesTag;
  });

  const handleUpvote = (postId: number) => {
    console.log(`Upvoted post ${postId}`);
  };

  const handleCommentClick = (post) => {
    setCurrentPostForComment(post);
    setShowCommentPopup(true);
  };

  const closeCommentPopup = () => {
    setShowCommentPopup(false);
    setCurrentPostForComment(null);
  };

  // Handle tag selection for filtering
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null); // Deselect if the same tag is clicked again
    } else {
      setSelectedTag(tag); // Set selected tag for filtering
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 mb-5">
      <div className="flex justify-between mb-4 w-full items-center space-x-3 bg-foreground rounded-md p-2">
        <Input
          type="search"
          id="default-search"
          className="block w-full p-4 text-sm text-accent border-none rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="text-accent" />
      </div>

      <h2 className="text-2xl font-bold mb-4 text-accent">Home</h2>

      {/* Tags Filter Section */}
      <div className="flex space-x-2 mb-4 items-center">
        <p className="text-sm text-muted-foreground">Filter by Tags:</p>
        {[
          "React",
          "Python",
          "AI",
          "JavaScript",
          "Machine Learning",
          "NLP",
          "Community",
          "Hooks",
          "PyCon",
        ].map((tag) => (
          <Badge
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="bg-primary/30 "
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            <Card className="bg-foreground border-none">
              <CardHeader>
                <div className="flex items-center justify-between px-1">
                  <div>
                    <CardTitle className="text-xl text-accent">
                      {post.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {post.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-accent">{post.author}</span> •{" "}
                      {post.community}
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
                    <p>{new Date(post.date).toLocaleString()}</p>
                  </div>
                </div>
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-fill mb-4 rounded-md"
                />
                <p className="mb-2 text-accent">
                  {post.content.slice(0, 300)}...
                  <Button variant="link" onClick={() => setSelectedPost(post)}>
                    Read more
                  </Button>
                </p>

                {/* Display Tags */}
                <div className="mt-3 space-x-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-primary/30"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center w-full justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpvote(post.id)}
                      className="hover:text-accent hover:bg-transparent text-muted"
                    >
                      <ThumbsUp className="mr-1 h-4 w-4   " />
                      <span className=" ">{post.upvotes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCommentClick(post)}
                      className="hover:text-accent hover:bg-transparent text-muted"
                    >
                      <MessageCircle className="mr-1 h-4 w-4  " />
                      <span className=" ">Comment</span>
                    </Button>
                    <Button variant="default" size="sm">
                      <Share2 className="mr-1 h-4 w-4 text-accent" />
                      <span className="text-accent">Share</span>
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
      {showCommentPopup && currentPostForComment && (
        <CommentPopup
          post={currentPostForComment}
          onClose={closeCommentPopup}
        />
      )}
    </div>
  );
}
