import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageSquare, Share2, X } from "lucide-react";
import { useState } from "react";
import { TagInput } from "./tagInput";
import { Input } from "@/components/ui/input";

export const PostUpload = () => {
    const [tags, setTags] = useState<string[]>([])
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
  
    return (
      <Card className="bg-foreground text-primary-foreground border-[1px] border-muted">
        <CardHeader>
          <CardTitle>Create a Post</CardTitle>
          <CardDescription>Share your thoughts with the community</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                <AvatarFallback>YA</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <Textarea placeholder="What's on your mind?" className="mb-2" />
  
                <div className="space-y-2">
                  <label className="text-sm font-medium">Add Image</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {selectedImage && (
                      <Button variant="ghost" size="icon" onClick={() => setSelectedImage(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {selectedImage && (
                    <div className="mt-2 text-sm text-muted-foreground">Selected: {selectedImage.name}</div>
                  )}
                </div>
  
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <TagInput tags={tags} setTags={setTags} />
                </div>
  
                <div className="flex justify-end">
                  <Button>Post</Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }