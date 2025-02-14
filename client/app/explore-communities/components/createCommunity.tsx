"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ACCEPTED_IMAGE_TYPES, communitySchema } from "@/types/createCommunity-zod"


type CommunityFormValues = z.infer<typeof communitySchema>

export function CreateCommunityForm() {
  const [skillInput, setSkillInput] = useState("")

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CommunityFormValues>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      name: "",
      description: "",
      imageType: "file",
      profileImage: { file: null },
      skills: [],
    },
  })

  const onSubmit = (data: CommunityFormValues) => {
    console.log(data)
    setIsOpen(false);
  }

  const addSkill = () => {
    if (skillInput && form.getValues("skills").length < 5) {
      form.setValue("skills", [...form.getValues("skills"), skillInput])
      setSkillInput("")
    }
  }

  const removeSkill = (index: number) => {
    const currentSkills = form.getValues("skills")
    form.setValue(
      "skills",
      currentSkills.filter((_, i) => i !== index),
    )
  }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button>Create Community</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Community</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Community Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter community name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter community description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="file" id="file" />
                        <Label htmlFor="file">Upload File</Label>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="url" id="url" />
                        <Label htmlFor="url">Provide URL</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("imageType") === "file" ? (
              <FormField
                control={form.control}
                name="profileImage.file"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                        onChange={(e) => onChange(e.target.files?.[0])}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="profileImage.url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills (Max 5)</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {field.value.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-primary text-primary-foreground px-2 py-1 rounded-full flex items-center"
                        >
                          {skill}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-4 w-4 p-0"
                            onClick={() => removeSkill(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      />
                      <Button type="button" onClick={addSkill} disabled={field.value.length >= 5}>
                        Add
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>Press Enter or click Add to add a skill (max 5)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create Community
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

