import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

export function PostPopup({
  post,
  onClose,
}: {
  post: any;
  onClose: () => void;
}) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px] border-none">
        <DialogHeader>
          <DialogTitle className="text-accent">{post.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">{post.subtitle}</p>
          <img
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-64 object-cover mb-4 rounded-md"
          />
          <p className="mb-4 text-accent">{post.content}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="mr-1 h-4 w-4" />
                {post.likes.length}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage
                  src={
                    post.author?.profileImageURL ||
                    `https://api.dicebear.com/6.x/initials/svg?seed=${post.author?.firstName} ${post.author?.lastName}`
                  }
                />
                <AvatarFallback>
                  {post.author?.firstName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-semibold text-accent">
                  {post.author?.firstName} {post.author?.lastName}
                </p>
                <p className="text-muted-foreground">
                  {typeof post.community === "string"
                    ? post.community
                    : post.community?.name ?? "Unknown"}
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Posted on {new Date(post.date).toLocaleString()}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
