import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'
import React from 'react'


export interface Member {
  id: string;
  firstName: string;
  lastName?: string;
  username?: string;
  email?: string;
  role?: string;
  profileImageURL?: string;
  joinedDate?: string;
}

const MembersList = ({ members, onRemove }: { members: Member[]; onRemove: (id: string) => void }) => { 
  
  return (
    <Card className='bg-foreground border-none text-primary-foreground'>
      <CardHeader>
        <CardTitle>Community Members</CardTitle>
        <CardDescription>View and manage community members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <Card key={member.id} className="bg-popover border-none text-primary-foreground">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.profileImageURL} alt={member.firstName} />
                    <AvatarFallback>
                      {member.firstName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{member.firstName + " " + member.lastName}</h3>
                      <Badge className='bg-primary/30'>{member.role}</Badge>
                    </div>
                    <p className="text-sm text-muted">@{member.username}</p>
                    <p className="text-sm text-muted">{member.email}</p>
                    <p className="text-xs text-muted">Joined {new Date(member?.joinedDate || "").toLocaleDateString()}</p>
                  </div>
                </div>
                {member.role === "Learner" && (
                  <Button variant="destructive" size="icon" onClick={() => onRemove(member.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default MembersList