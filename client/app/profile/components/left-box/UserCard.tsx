import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Github, GraduationCap, Linkedin, MapPin, Tag } from 'lucide-react';
import React from 'react'

interface UserCardProps{
    name: string;
    username: string;
    email: string;
    skills?: string[];
    location?: string;
    github?: string;
    linkedin?: string;
    website?: string;
}

const UserCard = ({user} : {user: UserCardProps}) => {
  return (
    <div className='w-full flex flex-col text-accent'>
        <div className='flex items-center gap-4 justify-start pb-5'>
            <Avatar className='h-20 w-20 rounded-md'>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className='' />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
                <h2 className='font-bold text-xl'>{user.name}</h2>
                <p className='text-xs text-muted'>@{user.username}</p>
                <p className='mt-2 text-sm'>{user.email}</p>
            </div>
        </div>
        <Button variant={'default'} className='bg-[#283a2e] text-[#2cbb5d] hover:bg-[#283a2e]'>Edit Profile</Button>
        <div className='py-5 flex flex-col justify-start items-start text-muted'>
            {user.location && (
                <div className='flex items-center space-x-2 pb-4'>
                    <MapPin className="w-5 h-5" />
                    <p className='text-sm'>
                        {user.location}
                    </p>
                </div>
            )}
            {user.github && (
                <div className='flex items-center space-x-2 pb-4'>
                    <Github className="w-5 h-5" />
                    <a href={user.github} target="_blank" rel="noopener noreferrer" className='text-sm hover:underline'>
                        {user.github}
                    </a>
                </div>
            )}
            
            {user.linkedin && (
                <div className='flex items-center space-x-2 pb-4'>
                    <Linkedin className="w-5 h-5" />
                    <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className='text-sm hover:underline'>
                        {user.linkedin}
                    </a>
                </div>
            )}

            {user.website && (
                <div className='flex items-center space-x-2 pb-4'>
                    <GraduationCap className="w-5 h-5" />
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className='text-sm hover:underline'>
                        Website
                    </a>
                </div>
            )}

            {user.skills && (
                <div className='flex flex-wrap items-center space-x-2 pb-4'>
                    <Tag className="w-5 h-5" />
                    {user.skills.map((skill, index) => (
                        <Badge key={index} className='bg-primary/30 mb-2 rounded-xl flex justify-center items-center hover:bg-primary/30'>{skill}</Badge>
                    ))}
                </div>
            )}
        </div>

    </div>
  )
}

export default UserCard