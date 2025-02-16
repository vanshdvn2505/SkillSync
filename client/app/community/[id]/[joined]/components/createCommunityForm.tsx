"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { meetingSchema } from "@/types/zodSchema/createMeeting-zod";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { CREATE_MEETING } from "@/graphql/mutations/meetingMutations";
import { useToast } from "@/hooks/use-toast";


type FormData = z.infer<typeof meetingSchema>;

export default function CreateMeetingForm({ communityId, userId } : { communityId: string, userId: string }) {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      tags: [],
    },
  });

  const [createMeeting, { loading }] = useMutation(CREATE_MEETING, {
    onCompleted: () => {
        setTimeout(() => {
            toast({
                title: "Meeting created successfully!"
            })
        }, 1000)
      setOpen(false);
      reset();
      setTags([]); // Clear tags after submission
    },
    onError: (error) => {
        setTimeout(() => {
            toast({
                title: error.message || "Failed to create meeting"
            })
        }, 1000)
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    await createMeeting({
        variables: {
          title: data.title,
          description: data.description || "",
          scheduledAt: data.scheduledAt,
          duration: data.duration,
          maxAttendees: data.maxAttendees,
          tags: data.tags,
          userId: userId,
          communityId: communityId,
        },
    });
    setOpen(false);
  };

  const addTag = (tag: string) => {
    if (tag && tags.length < 5 && !tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      setValue("tags", newTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue("tags", newTags);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Meeting</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] z-[80] bg-foreground text-primary-foreground border-[1px]">
        <DialogHeader>
          <DialogTitle>Schedule a New Meeting</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pr-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Meeting Title */}
            <div>
              <Label htmlFor="title">Meeting Title</Label>
              <Input id="title" {...register("title")} placeholder="Enter meeting title" />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Meeting Description */}
            <div>
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea id="description" {...register("description")} placeholder="Describe the meeting" />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Scheduled Time */}
            <div>
              <Label htmlFor="scheduledAt">Scheduled Time</Label>
              <Input id="scheduledAt" type="datetime-local" {...register("scheduledAt")} />
              {errors.scheduledAt && <p className="text-red-500 text-sm mt-1">{errors.scheduledAt.message}</p>}
            </div>

            {/* Meeting Duration */}
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input id="duration" type="number" {...register("duration", { valueAsNumber: true })} placeholder="e.g., 30" />
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
            </div>

            {/* Maximum Attendees */}
            <div>
              <Label htmlFor="maxAttendees">Max Attendees</Label>
              <Input id="maxAttendees" type="number" {...register("maxAttendees", { valueAsNumber: true })} placeholder="e.g., 50" />
              {errors.maxAttendees && <p className="text-red-500 text-sm mt-1">{errors.maxAttendees.message}</p>}
            </div>

            {/* Tags (e.g., React, WebRTC) */}
            <div>
              <Label htmlFor="tags">Tags (max 5)</Label>
              <div className="flex space-x-2">
                <Input
                  id="tags"
                  placeholder="Add a tag"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById("tags") as HTMLInputElement;
                    addTag(input.value);
                    input.value = "";
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} className="bg-primary/50">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-auto p-0 text-muted hover:text-background"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Schedule Meeting
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
