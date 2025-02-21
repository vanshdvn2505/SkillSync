"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card-ui";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share2, ThumbsUp, Search } from "lucide-react";
import { PostPopup } from "./ui/post-popup-ui";
import CommentPopup from "./ui/comment-popup";
import { Input } from "./ui/input";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/app/types";

export function MentorPosts() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [currentPostForComment, setCurrentPostForComment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Fetch posts from the backend

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:7001/posts");
        const data: Post[] = await response.json();
        setPosts(data); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts by search query and selected tag
  const filteredPosts = posts.filter((post: any) => {
    const matchesSearchQuery = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearchQuery && matchesTag;
  });

  const handleUpvote = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:7001/api/posts/${postId}/upvote`, {
        method: "POST",
      });
      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === Number(postId) ? { ...post, upvotes: post.upvotes + 1 } : post
          )
        );
      }
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const handleCommentClick = (post: any) => {
    setCurrentPostForComment(post);
    setShowCommentPopup(true);
  };

  const closeCommentPopup = () => {
    setShowCommentPopup(false);
    setCurrentPostForComment(null);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 mb-5">
      <div className="flex justify-between mb-4 w-full items-center space-x-3 bg-foreground rounded-md p-2">
        <Input
          type="search"
          className="block w-full p-4 text-sm text-accent border-none rounded-lg bg-transparent"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="text-accent" />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-accent">Home</h2>
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            /* Add your action here */
          }}
        >
          Add New Post
        </Button>
      </div>

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
        ].map((tag) => (
          <Badge
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="bg-primary/30"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post: any, index: number) => (
          <motion.div
            key={post.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: index * 0.2,
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
                        .map((n: any) => n[0])
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
                  {post.tags.map((tag: string) => (
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
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      <span>{post.upvotes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCommentClick(post)}
                      className="hover:text-accent hover:bg-transparent text-muted"
                    >
                      <MessageCircle className="mr-1 h-4 w-4" />
                      <span>Comment</span>
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