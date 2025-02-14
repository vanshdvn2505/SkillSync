'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";
import { TagInput } from "./tagInput";

export const ResourceUpload = () => {
    const [tags, setTags] = useState<string[]>([])
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
  
    return (
      <Card className="bg-foreground text-primary-foreground border-[1px] border-muted">
        <CardHeader>
          <CardTitle>Share a Resource</CardTitle>
          <CardDescription>Share links or upload files to help others learn</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input placeholder="Resource title" />
  
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Resource Link (Optional)</label>
                <Input placeholder="https://" />
              </div>
  
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload File (Optional)</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {selectedFile && (
                    <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
  
            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <TagInput tags={tags} setTags={setTags} />
            </div>
  
            <Textarea placeholder="Add a description (optional)" />
            <Button className="w-full">Share Resource</Button>
          </form>
        </CardContent>
      </Card>
    )
  }