'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";
import { TagInput } from "./tagInput";
import { UPLOAD_FILE } from "@/graphql/mutations/resourceMutations";
import { useMutation } from "@apollo/client";
import { supabase } from "@/lib/supabaseConfig";

export const ResourceUpload = ({ communityId, mentorId } : { communityId: string, mentorId: string }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileUpload, setIsFileUpload] = useState<boolean>(true);
  const [resourceLink, setResourceLink] = useState<string>("");
  const [uploadResourceMutation] = useMutation(UPLOAD_FILE);

  const handleFileUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;
    
    const fileExt = selectedFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, selectedFile);
    
    if (error) {
      console.error("Error uploading file to Supabase:", error);
      return;
    }

    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${data?.path}`;
    
    try {
      await uploadResourceMutation({
        variables: {
          title,
          fileUrl,
          tags,
          communityId,
          mentorId,
        },
      });
      alert("File uploaded successfully");
      resetForm();
    } catch (err) {
      console.error("Error saving file info to GraphQL:", err);
    }
  };

  const handleLinkSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!resourceLink.trim()) return;

    try {
      await uploadResourceMutation({
        variables: {
          title,
          fileUrl: resourceLink,
          tags,
          communityId,
          mentorId,
        },
      });
      alert("Resource link saved successfully");
      resetForm();
    } catch (err) {
      console.error("Error saving resource link:", err);
    }
  };

  const handleToggleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsFileUpload((prevState) => !prevState);
  };

  const resetForm = () => {
    setTitle("");
    setTags([]);
    setSelectedFile(null);
    setResourceLink("");
  };

  return (
    <Card className="bg-foreground text-primary-foreground border-[1px] border-muted">
      <CardHeader>
        <CardTitle>Share a Resource</CardTitle>
        <CardDescription>Share links or upload files to help others learn</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={isFileUpload ? handleFileUpload : handleLinkSubmit}>
          <Input placeholder="Resource title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Resource Link or File Upload</label>
              <div className="flex gap-2">
                <Button variant={isFileUpload ? "default" : "outline"} onClick={handleToggleClick}>
                  File Upload
                </Button>
                <Button variant={!isFileUpload ? "default" : "outline"} onClick={handleToggleClick}>
                  Resource Link
                </Button>
              </div>
            </div>

            {isFileUpload ? (
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload File</label>
                <div className="flex items-center gap-2">
                  <Input type="file" 
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                  {selectedFile && (
                    <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium">Resource Link</label>
                <Input value={resourceLink} onChange={(e) => setResourceLink(e.target.value)} placeholder="https://" />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <TagInput tags={tags} setTags={setTags} />
            </div>

            <Button className="w-full" type="submit">
              Share Resource
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
