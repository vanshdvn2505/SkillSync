"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react"; // Close icon

interface CommentPopupProps {
  post: any; // Post object containing details about the post
  onClose: () => void; // Function to close the popup
}

export default function CommentPopup({ post, onClose }: CommentPopupProps) {
  const [comment, setComment] = useState(""); // To manage the comment input
  const [comments, setComments] = useState<string[]>([]); // To hold the list of comments

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments((prevComments) => [...prevComments, comment]);
      setComment(""); // Clear the input field
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-transparent bg-opacity-5 flex items-center justify-center">
      <div className="bg-background p-6 rounded-lg w-1/3">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-accent">Comments</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-4">
          <div className="text-sm text-muted-foreground mb-4">
            <p>
              <span className="font-semibold">{post.author}</span> •{" "}
              {post.community}
            </p>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full h-24 p-2 border border-gray-300 rounded-md"
            />
            <div className="mt-2 flex justify-end">
              <Button type="submit" variant="default">
                Post Comment
              </Button>
            </div>
          </form>

          {/* Comments Section */}
          <div className="mt-4">
            <h3 className="font-semibold text-lg text-accent mb-2">Comments:</h3>
            {comments.length === 0 ? (
              <p className="text-muted-foreground text-center">
                <h1 className="font-bold text-accent p-3">No comments yet. </h1>
                Start a conversation.</p>
            ) : (
              <ul className="space-y-2">
                {comments.map((comment, index) => (
                  <li key={index} className="border-b pb-2">
                    <p>{comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
