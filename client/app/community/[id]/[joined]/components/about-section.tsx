import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const AboutSection = ( { about } : { about : string}) => {
  return (
    <Card className='bg-foreground text-primary-foreground border-none shadow-md'>
        <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">About Our Community</h2>
            <p>{about}</p>
        </CardContent>
    </Card>
  )
}

export default AboutSection