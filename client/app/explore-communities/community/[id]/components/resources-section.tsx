"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, LinkIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type Resource = {
  id: number
  title: string
  url: string
  tags: string[]
}

const initialResources: Resource[] = [
  { id: 1, title: "React Hooks Tutorial", url: "https://reactjs.org/docs/hooks-intro.html", tags: ["React", "Hooks"] },
  {
    id: 2,
    title: "CSS Flexbox Guide",
    url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
    tags: ["CSS", "Flexbox"],
  },
  {
    id: 3,
    title: "JavaScript ES6 Features",
    url: "https://www.w3schools.com/js/js_es6.asp",
    tags: ["JavaScript", "ES6"],
  },
]

export function ResourcesSection() {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [newResource, setNewResource] = useState({ title: "", url: "" })
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleAddResource = () => {
    if (newResource.title && newResource.url) {
      setResources([...resources, { ...newResource, id: Date.now(), tags: [] }])
      setNewResource({ title: "", url: "" })
    }
  }

  const handleEditResource = (id: number) => {
    setEditingId(id)
    const resourceToEdit = resources.find((r) => r.id === id)
    if (resourceToEdit) {
      setNewResource({ title: resourceToEdit.title, url: resourceToEdit.url })
    }
  }

  const handleUpdateResource = () => {
    setResources(resources.map((r) => (r.id === editingId ? { ...r, ...newResource } : r)))
    setNewResource({ title: "", url: "" })
    setEditingId(null)
  }

  const handleDeleteResource = (id: number) => {
    setResources(resources.filter((r) => r.id !== id))
  }

  return (
    <Card className="bg-foreground border-none text-primary-foreground">
        <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Shared Resources</h2>
            <div className="space-y-6">
                <div className="flex space-x-2">
                    <Input
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                    placeholder="Resource title"
                    />
                    <Input
                    value={newResource.url}
                    onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                    placeholder="Resource URL"
                    />
                    <Button onClick={editingId !== null ? handleUpdateResource : handleAddResource}>
                    {editingId !== null ? "Update" : "Add"} Resource
                    </Button>
                </div>
                <div className="space-y-4">
                    {resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-4 bg-popover shadow-lg rounded-md">
                        <div>
                        <h3 className="font-semibold">{resource.title}</h3>
                        <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:underline flex items-center"
                        >
                            <LinkIcon size={14} className="mr-1" />
                            {resource.url}
                        </a>
                        <div className="mt-2">
                            {resource.tags.map((tag) => (
                            <Badge key={tag}  className="mr-1 bg-primary/30">
                                {tag}
                            </Badge>
                            ))}
                        </div>
                        </div>
                        <div>
                        <Button variant="ghost" size="icon" onClick={() => handleEditResource(resource.id)}>
                            <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteResource(resource.id)}>
                            <Trash2 size={16} />
                        </Button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
    
  )
}

