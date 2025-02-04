import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const AboutSection = () => {
  return (
    <Card className='bg-foreground text-primary-foreground border-none shadow-md'>
        <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">About Our Community</h2>
            <p>This is where you can add detailed information about the community, its goals, and guidelines.</p>
        </CardContent>
    </Card>
  )
}

export default AboutSection