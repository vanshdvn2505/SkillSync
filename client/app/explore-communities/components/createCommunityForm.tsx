"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"
import { ACCEPTED_IMAGE_TYPES, communitySchema } from "@/types/zodSchema/createCommunity-zod"

const MAX_FILE_SIZE = 5000000

type FormData = z.infer<typeof communitySchema>

export default function CreateCommunityForm() {
  const [open, setOpen] = useState(false)
  const [skills, setSkills] = useState<string[]>([])
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      imageType: "file",
      skills: [],
    },
  })

  const imageType = watch("imageType")

  const onSubmit = async (data: FormData) => {
    console.log(data)
    // Here you would typically send the data to your API
    setOpen(false)
  }

  const addSkill = (skill: string) => {
    if (skill && skills.length < 5 && !skills.includes(skill)) {
      const newSkills = [...skills, skill]
      setSkills(newSkills)
      setValue("skills", newSkills)
    }
  }

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove)
    setSkills(newSkills)
    setValue("skills", newSkills)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Community</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] z-[80] bg-foreground text-primary-foreground border-[1px]">
        <DialogHeader>
          <DialogTitle>Create Community</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pr-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Community Name</Label>
              <Input id="name" {...register("name")} placeholder="Enter community name" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea id="description" {...register("description")} placeholder="Describe your community" />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div>
              <Label htmlFor="Capacity">Capacity (optional)</Label>
              <Input id="capacity" {...register("capacity")} placeholder="Enter community capacity" />
              {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>}
            </div>

            <div>
              <Label>Profile Image</Label>
              <Controller
                name="imageType"
                control={control}
                render={({ field }) => (
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="file" id="file" />
                      <Label htmlFor="file">Upload Image</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="url" id="url" />
                      <Label htmlFor="url">Image URL</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            <div>
              {imageType === "file" ? (
                <Input type="file" className="file:text-muted file:hover:text-primary-foreground" accept={ACCEPTED_IMAGE_TYPES.join(",")} {...register("profileImage.file")} />
              ) : (
                <Input type="url" placeholder="Enter image URL" {...register("profileImage.url")} />
              )}
              {errors.profileImage && (
                <p className="text-red-500 text-sm mt-1">{errors.profileImage.message || "Invalid image"}</p>
              )}
            </div>

            <div>
              <Label htmlFor="skill">Skills (max 5)</Label>
              <div className="flex space-x-2">
                <Input
                  id="skill"
                  placeholder="Add a skill"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addSkill((e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ""
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById("skill") as HTMLInputElement
                    addSkill(input.value)
                    input.value = ""
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <Badge key={skill} className="bg-primary/50 ">
                    {skill}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-auto p-0 text-muted hover:text-background"
                      onClick={() => removeSkill(skill)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>}
            </div>

            <Button type="submit" className="w-full">
              Create Community
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

