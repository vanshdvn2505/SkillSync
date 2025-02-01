import { Box } from '@/components/Box'
import React from 'react'
import UserCard from './left-box/UserCard'
import { Separator } from '@/components/ui/separator'
import Stats from './left-box/Stats'


const user = {
  name: "Vansh Dhawan",
  username: "vanshdvn2505",
  email: "vanshdhawan2505@gmail.com",
  location: "India",
  github: "vanshdvn3040",
  linkedin: "vanshdvn3040",
  website: "kjfweofw",
  skills: ["react", "nodeJs", "typescript"],
}

const LeftBox = () => {
  return (
    <Box className="flex flex-col gap-2 backdrop-blur-sm rounded-lg p-4 bg-foreground shadow-xl">
        <UserCard user={user} />
        <Separator className='bg-[#464646]' />
        <Stats />
    </Box>
  )
}

export default LeftBox