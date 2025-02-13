"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import CreateCommunityForm from "./createCommunityForm"

export default function CreateCommunityButton() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>Create Community</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px]">
        <CreateCommunityForm onSuccess={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  )
}

