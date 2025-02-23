import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/graphql/mutations/postMutations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { TagInput } from "./tagInput";
import useAuth from "@/hooks/useAuth";

export const PostUpload = ({ onPostCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]); // Ensure it's always an array of strings
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const { user } = useAuth();

  if (!user) {
    return (
      <p className="text-red-500">You must be logged in to create a post.</p>
    );
  }

  const authorId = user.id;

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onCompleted: (data) => {
      alert("Post uploaded successfully!");
      setTitle("");
      setContent("");
      setTags([]);
      setSelectedImage(null);
      onPostCreate(data.createPost);
    },
    onError: (err) => {
      console.error("Error uploading post:", err);
    },
  });

  const handleImageUpload = async () => {
    if (!selectedImage) return null;

    setLoadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setLoadingImage(false);
      return data.imageUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      setLoadingImage(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();

    createPost({
      variables: {
        title,
        content,
        imageUrl,
        authorId,
        tags: tags.map((tag) => tag.trim()).filter((tag) => tag !== ""), // Ensure tags are cleaned up
      },
    });
  };

  return (
    <Card className="bg-foreground text-primary-foreground border border-muted">
      <CardHeader>
        <CardTitle>Create a Post</CardTitle>
        <CardDescription>
          Share your thoughts with the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage
                src={user.avatar || "/placeholder.svg"}
                alt="User avatar"
              />
              <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <Input
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Add Image</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSelectedImage(e.target.files?.[0] || null)
                    }
                  />
                  {selectedImage && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {selectedImage && (
                  <p className="text-sm text-muted-foreground">
                    {selectedImage.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <TagInput tags={tags} setTags={setTags} />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading || loadingImage}>
                  {loading || loadingImage ? "Posting..." : "Post"}
                </Button>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">
                  Error: {error.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
