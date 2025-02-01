import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardDescription, CardTitle } from '@/components/ui/card'
import React from 'react'

interface CardProps {
    title: string;
    description: string;
    link: any; 
}


const CustomCard: React.FC<CardProps> = ({title, description, link}) => {
  return (
    <Card className='max-w-96 bg-muted border-none flex-shrink-0 mx-2'>
        <CardHeader>
            <img src={link} alt="card" />
        </CardHeader>
        <CardContent>
            <CardTitle className='text-white'><p>{title}</p></CardTitle>
            <CardDescription className='whitespace-normal break-words'><p>{description}</p></CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button variant="default" className='border-border border-2'>Get Started</Button>
      </CardFooter>
    </Card>
  )
}

export default CustomCard