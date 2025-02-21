"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, LinkIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import useAuth from "@/hooks/useAuth"
import { ResourceUpload } from "./resourceUpload"
import { GET_RESOURCES } from "@/graphql/queries/resourceQueries";
import { useMutation, useQuery } from "@apollo/client"
import { DELETE_RESOURCE } from "@/graphql/mutations/resourceMutations"
import { supabase } from "@/lib/supabaseConfig"

type Resource = {
  id: string,
  title: string,
  fileUrl: string,
  tags: string[],
  mentor: any,
  community: any,
}

// const initialResources: Resource[] = [
//   { id: 1, title: "React Hooks Tutorial", url: "https://reactjs.org/docs/hooks-intro.html", tags: ["React", "Hooks"] },
//   {
//     id: 2,
//     title: "CSS Flexbox Guide",
//     url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
//     tags: ["CSS", "Flexbox"],
//   },
//   {
//     id: 3,
//     title: "JavaScript ES6 Features",
//     url: "https://www.w3schools.com/js/js_es6.asp",
//     tags: ["JavaScript", "ES6"],
//   },
// ]


export function ResourcesSection({ mentorId, communityId }: { mentorId: string, communityId: string }) {
  const [resources, setResources] = useState<Resource[]>([])
  const [newResource, setNewResource] = useState({ title: "", url: "" })
  const [editingId, setEditingId] = useState<number | null>(null)
  const { user, loading } = useAuth();
  const { error, data, refetch } = useQuery(GET_RESOURCES, {
    variables: { communityId } ,
  });
  const [deleteResource] = useMutation(DELETE_RESOURCE, { onCompleted: () => refetch() });

  useEffect(() => {
    if(data && data.getResources){
      setResources(data.getResources)
    }
  }, [data])
  


  const handleDelete = async (resourceId: string, fileUrl: string) => {
    try {
      let filePath = null;
  
      if (fileUrl.startsWith(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/`)) {
        filePath = fileUrl.split(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/`)[1];
      }
  
      if (filePath) {
        const { error: storageError } = await supabase.storage.from("uploads").remove([filePath]);
        if (storageError) return alert("Error deleting file from Supabase: " + storageError.message);
      }
  
      await deleteResource({ variables: { resourceId, mentorId } });
  
      alert("Resource deleted successfully!");
    }
    catch (err: any) {
      alert("Error deleting resource: " + err.message);
    }
  };
  

  return (
    <Card className="bg-foreground border-none text-primary-foreground">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Shared Resources</h2>
        <div className="space-y-6">
          {user && user.role == "Mentor" && <ResourceUpload mentorId={mentorId} communityId={communityId} />}
          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-4 bg-popover shadow-lg rounded-md">
                <div>
                  <h3 className="font-semibold">{resource.title}</h3>
                  <a
                    href={resource.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline flex items-center"
                  >
                    <LinkIcon size={14} className="mr-1" />
                    {resource.fileUrl}
                  </a>
                  <div className="mt-2">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} className="mr-1 bg-primary/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  {(user && user.role == "Mentor") ? (<>
                    <Button variant="destructive" size="icon" onClick={() => { handleDelete(resource.id, resource.fileUrl)}}>
                      <Trash2 size={16} />
                    </Button>
                  </>
                  ) : (<><Button className="">View</Button></>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>

  )
}

