import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpenIcon, FileIcon, LinkIcon } from 'lucide-react';
import React, { useState } from 'react';

interface Resources {
  id: string;
  title: string;
  type: string;
  url: string;
  mentorName: string;
  mentorAvatar: string;
  communityId: string;
  tags: string[];
  savedDate: string;
}

const initialSavedResources: Resources[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    type: "article",
    url: "https://example.com/intro-ml",
    mentorName: "Dr. Jane Smith",
    mentorAvatar: "https://github.com/shadcn.png",
    communityId: "1",
    tags: ["AI", "Machine Learning", "Beginner"],
    savedDate: "2025-01-20",
  },
  {
    id: "2",
    title: "Advanced JavaScript Techniques",
    type: "video",
    url: "https://example.com/adv-js",
    mentorName: "John Doe",
    mentorAvatar: "https://github.com/shadcn.png",
    communityId: "1",
    tags: ["JavaScript", "Web Development", "Advanced"],
    savedDate: "2025-01-22",
  },
  {
    id: "3",
    title: "Effective Public Speaking",
    type: "pdf",
    url: "https://example.com/public-speaking.pdf",
    mentorName: "Sarah Johnson",
    mentorAvatar: "https://github.com/shadcn.png",
    communityId: "2",
    tags: ["Communication", "Soft Skills"],
    savedDate: "2025-01-25",
  },
  {
    id: "4",
    title: "Healthy Eating Habits",
    type: "article",
    url: "https://example.com/healthy-eating",
    mentorName: "Mike Brown",
    mentorAvatar: "https://github.com/shadcn.png",
    communityId: "3",
    tags: ["Health", "Nutrition"],
    savedDate: "2025-01-23",
  },
];

const getResourceIcon = (type: string) => {
  switch (type) {
    case "article":
      return <FileIcon className="h-4 w-4 mr-2" />;
    case "video":
      return <BookOpenIcon className="h-4 w-4 mr-2" />;
    case "pdf":
      return <FileIcon className="h-4 w-4 mr-2" />;
    default:
      return <LinkIcon className="h-4 w-4 mr-2" />;
  }
};

const Resources = () => {
  const [savedResources, setSavedResources] = useState<Resources[]>(initialSavedResources);

  const sortedResources = savedResources.sort((a, b) => {
    const dateA = new Date(a.savedDate);
    const dateB = new Date(b.savedDate);
    return dateB.getTime() - dateA.getTime();
  });

  const handleUnsave = (resourceId: string) => {
    setSavedResources(prevResources =>
      prevResources.filter(resource => resource.id !== resourceId)
    );
  };

  return (
    <div className="flex flex-col flex-grow w-full">
      {sortedResources.length > 0 ? (
        sortedResources.map((res, index) => (
          <div key={index} className="flex justify-between items-center w-full text-primary-foreground p-5 my-3 bg-popover rounded-md">
            <div className="flex justify-center items-center gap-4">
              <Avatar className="h-16 w-16 rounded-full">
                <AvatarImage
                  src={res.mentorAvatar}
                  alt={res.mentorName}
                />
                <AvatarFallback>{res.mentorName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-start items-start">
                <p className="font-semibold flex items-center justify-center">
                  {getResourceIcon(res.type)} {res.title}
                </p>
                <p className="text-sm text-muted">Shared By {res.mentorName}</p>
                <div className="w-full flex flex-wrap justify-start gap-4 mt-2">
                  {res.tags.map((tag, index) => (
                    <Badge key={index} className="bg-primary/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted mt-2">Saved on: {new Date(res.savedDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Button onClick={() => window.open(res.url, "_blank")}>View Resource</Button>
              <Button variant="secondary" onClick={() => handleUnsave(res.id)}>
                Unsave
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center min-h-48">
          <p className="text-lg text-muted">No Saved Resources</p>
        </div>
      )}
    </div>
  );
};

export default Resources;
