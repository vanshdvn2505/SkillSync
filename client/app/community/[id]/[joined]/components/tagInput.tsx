import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {  X } from "lucide-react";
import { useState } from "react";

export const TagInput = ({ tags, setTags }: { tags: string[]; setTags: (tags: string[]) => void }) => {
    const [input, setInput] = useState("")
  
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && input.trim()) {
        e.preventDefault()
        if (!tags.includes(input.trim())) {
          setTags([...tags, input.trim()])
        }
        setInput("")
      }
    }
  
    const removeTag = (tagToRemove: string) => {
      setTags(tags.filter((tag) => tag !== tagToRemove))
    }
  
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} className="flex items-center gap-1 bg-primary/30">
              {tag}
              <button onClick={() => removeTag(tag)} className="hover:text-red-400">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <Input
          placeholder="Type a tag and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    )
  }