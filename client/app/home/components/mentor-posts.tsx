"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card-ui";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share2, ThumbsUp, Search } from "lucide-react";
import { PostPopup } from "./ui/post-popup-ui";
import CommentPopup from "./ui/comment-popup";
import { Input } from "./ui/input";
import { Badge } from "@/components/ui/badge";
import { GET_ALL_POSTS } from "@/graphql/queries/postQueries";
import { Post } from "@/app/types";

export function MentorPosts() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentPost, setCommentPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Fetch posts from GraphQL
  const { data, loading, error } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>Loading posts...</p>;
  if (error) {
    console.error("Error fetching posts:", error);
    return <p>Error loading posts: {error.message}</p>;
  }

  console.log("GraphQL Data:", data);

  // Ensure `getAllPosts` is an array
  const posts: Post[] = Array.isArray(data?.getAllPosts)
    ? data.getAllPosts
    : [];

  console.log("Posts Array:", posts);

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
        <Button variant="default" size="sm">
          Add New Post
        </Button>
      </div>

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
            className={`cursor-pointer ${
              selectedTag === tag ? "bg-primary text-white" : "bg-primary/30"
            }`}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts found.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post, index) => {
            const matchesSearchQuery = searchQuery
              ? post.title?.toLowerCase().includes(searchQuery.toLowerCase())
              : true;
            const matchesTag = selectedTag
              ? (post.tags ?? []).some((tag) =>
                  typeof tag === "string"
                    ? tag === selectedTag
                    : tag.name === selectedTag
                )
              : true;

            if (!matchesSearchQuery || !matchesTag) return null; // Skip if post doesn't match filters

            return (
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
                <Card className="bg-foreground border-none cursor-pointer hover:shadow-lg transition-all">
                  <CardHeader onClick={() => setSelectedPost(post)}>
                    <div className="flex items-center justify-between px-1">
                      <div>
                        <CardTitle className="text-xl text-accent">
                          {post.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {post.subtitle}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <span className="text-accent">
                            {post.author?.firstName} {post.author?.lastName}
                          </span>{" "}
                          •{" "}
                          {typeof post.community === "string"
                            ? post.community
                            : post.community?.name ?? "Unknown"}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex w-full items-center space-x-2 mb-3 px-1">
                      <Avatar>
                        <AvatarImage
                          src={
                            post.author?.profileImageURL ||
                            `https://api.dicebear.com/6.x/initials/svg?seed=${post.author.firstName} ${post.author.lastName}`
                          }
                        />
                        <AvatarFallback>
                          {post.author?.firstName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-muted-foreground">
                        <p>{new Date(post.date).toLocaleString()}</p>
                      </div>
                    </div>
                    <img
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-fill mb-4 rounded-md"
                    />
                    <p className="mb-2 text-accent">
                      {post.content.slice(0, 300)}...
                      <Button
                        variant="link"
                        onClick={() => setSelectedPost(post)}
                      >
                        Read more
                      </Button>
                    </p>

                    <div className="mt-3 space-x-2">
                      {post.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          className="bg-primary/30 cursor-pointer"
                          onClick={() =>
                            handleTagClick(
                              typeof tag === "string" ? tag : tag.name
                            )
                          }
                        >
                          {typeof tag === "string"
                            ? tag
                            : tag.name ?? "Unknown"}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{post.likes.length}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCommentPost(post);
                        }}
                      >
                        <MessageCircle className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Comment</span>
                      </Button>
                      <Button variant="default" size="sm">
                        <Share2 className="mr-1 h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {selectedPost && (
        <PostPopup post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
      {commentPost && (
        <CommentPopup post={commentPost} onClose={() => setCommentPost(null)} />
      )}
    </div>
  );
}
