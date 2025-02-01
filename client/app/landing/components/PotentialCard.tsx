import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import React from 'react'

interface CardProps{
    title?: string;
    description?: string;
    link?: string;
}

const PotentialCard: React.FC<CardProps> = ({title, description, link}) => {
  return (
    
    <Card className=' flex flex-col bg-muted border-none m-4 bg-gradient-to-tl from-[rgb(32,18,74)] to-black'>
        <div className="h-full dark:bg-black rounded-xl  bg-grid-white/[0.1] relative flex flex-col items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <CardHeader>
                <CardTitle><p className='text-white text-4xl text-center'>{title}</p></CardTitle>
                <CardDescription><p className='text-white text-center text-xl'>{description}</p></CardDescription>
            </CardHeader>
            <CardContent>
                <img src={link} alt="card" height={500} width={400}/>
            </CardContent>
        </div>
    </Card>
    
  )
}

export default PotentialCard